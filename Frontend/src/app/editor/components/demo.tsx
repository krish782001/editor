import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';
import FabricCanvas from './FabricCanvas';

const CanvasWithControls = () => {
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [canvasJson, setCanvasJson] = useState<any[]>([]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [groups, setGroups] = useState<any[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});
 
  const canvasWidth = 800;
  const canvasHeight = 600;

  // Update the canvas JSON and group objects
  const updateCanvasJson = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const json = canvas.toJSON(['id', 'name']);
      const allObjects = json.objects;
      const groupObjects = allObjects.filter((obj: any) => obj.type === 'group');
      const allGroupIds = new Set(groupObjects.map((group: any) => group.id));

      const visibleObjects = allObjects.filter((obj: any) => obj.type === 'group' && obj.objects || !allGroupIds.has(obj.id));
      setGroups(groupObjects);
      setCanvasJson(visibleObjects);
    }
  };

  useEffect(() => {
    const canvas = fabricCanvasRef.current;

    if (canvas) {
      const handleObjectSelected = (e: fabric.IEvent) => {
        const selectedObject = e.target;
        if (selectedObject) {
          const id = selectedObject.get("id");
          setSelectedObjectId(id);
        } else {
          setSelectedObjectId(null);
        }
      };

      canvas.on("object:added", updateCanvasJson);
      canvas.on("object:removed", updateCanvasJson);
      canvas.on("object:modified", updateCanvasJson);
      canvas.on("selection:created", handleObjectSelected);
      canvas.on("selection:updated", handleObjectSelected);
      canvas.on("selection:cleared", () => setSelectedObjectId(null));

      updateCanvasJson();

      return () => {
        canvas.off("object:added", updateCanvasJson);
        canvas.off("object:removed", updateCanvasJson);
        canvas.off("object:modified", updateCanvasJson);
        canvas.off("selection:created", handleObjectSelected);
        canvas.off("selection:updated", handleObjectSelected);
        canvas.off("selection:cleared", () => setSelectedObjectId(null));
      };
    }
  }, [fabricCanvasRef.current]);

  const addRectangle = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "red",
        width: 100,
        height: 100,
        id: uuidv4(),
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
      canvas.renderAll();
    }
  };

  const addCircle = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const circle = new fabric.Circle({
        left: 150,
        top: 150,
        fill: "green",
        radius: 50,
        id: uuidv4(),
      });
      canvas.add(circle);
      canvas.setActiveObject(circle);
      canvas.renderAll();
    }
  };

  const addLine = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const line = new fabric.Line([50, 100, 200, 200], {
        left: 250,
        top: 150,
        stroke: "blue",
        id: uuidv4(),
      });
      canvas.add(line);
      canvas.setActiveObject(line);
      canvas.renderAll();
    }
  };

  const addText = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const text = new fabric.Text("Hello Fabric.js", {
        left: 100,
        top: 200,
        fill: "black",
        id: uuidv4(),
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    }
  };

  const handleGroupObjects = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const activeObjects = canvas.getActiveObjects();

      if (activeObjects.length > 1) {
        const boundingBox = canvas.getActiveObject().getBoundingRect();
        const group = new fabric.Group(activeObjects, {
          id: uuidv4(),
          name: prompt("Enter a name for this group:", "Group"),
          left: boundingBox.left,
          top: boundingBox.top,
        });

        group.getObjects().forEach(obj => {
          obj.set({
            left: obj.left - boundingBox.left,
            top: obj.top - boundingBox.top,
          });
          obj.setCoords();
        });

        canvas.discardActiveObject();
        activeObjects.forEach(obj => canvas.remove(obj));
        canvas.add(group);
        canvas.setActiveObject(group);

        canvas.requestRenderAll();

        updateCanvasJson(); // Update the canvas JSON structure
      } else {
        alert("Please select more than one object to group.");
      }
    }
  };

  const handleUngroupObjects = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();

      if (activeObject && activeObject.type === 'group') {
        const group = activeObject as fabric.Group;
        const items = group.getObjects();

        canvas.remove(group);

        items.forEach(item => {
          canvas.add(item);
          item.setCoords();
        });

        canvas.discardActiveObject();
        canvas.renderAll();
        updateCanvasJson();
      } else {
        alert("Please select a group to ungroup.");
      }
    }
  };

  const handleSidebarItemClick = (id: string) => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const object = canvas.getObjects().find((obj) => obj.get("id") === id);
      if (object) {
        canvas.setActiveObject(object);
        setSelectedObjectId(id);
        canvas.renderAll();
      }
    }
  };

  const toggleGroupExpansion = (groupId: string) => {
    setExpandedGroups(prevState => ({
      ...prevState,
      [groupId]: !prevState[groupId]
    }));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4 ml-8">
        <h2 className="text-lg font-semibold mb-4 ml-8">Elements</h2>
        <ul>
          {canvasJson.length > 0 ? (
            canvasJson.map((obj) => (
              <li key={obj.id} className="mb-2 ml-8">
                <div
                  className={`p-2 cursor-pointer bg-gray-300 rounded ${selectedObjectId === obj.id ? "bg-blue-200" : ""}`}
                  onClick={() => handleSidebarItemClick(obj.id)}
                >
                  {obj.type} {obj.name || `(ID: ${obj.id})`}
                </div>
              </li>
            ))
          ) : (
            <li>No elements</li>
          )}
        </ul>

        {/* Collapsible Group Sections */}
        <h2 className="text-lg font-semibold mb-4 ml-8">Groups</h2>
        <ul>
          {groups.length > 0 ? (
            groups.map((group) => (
              <li key={group.id} className="mb-2 ml-8">
                <div
                  className="p-2 cursor-pointer bg-gray-300 rounded"
                  onClick={() => toggleGroupExpansion(group.id)}
                >
                  {expandedGroups[group.id] ? "▼" : "►"} Group (ID: {group.id})
                </div>
                {expandedGroups[group.id] && (
                  <ul className="ml-4">
                    {(group.objects as fabric.Object[]).map((obj) => (
                      <li
                        key={obj.id}
                        className={`p-2 cursor-pointer ${selectedObjectId === obj.id ? "bg-blue-200" : ""}`}
                        onClick={() => handleSidebarItemClick(obj.id)}
                      >
                        {obj.type}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))
          ) : (
            <li>No groups to display</li>
          )}
        </ul>

        {/* Buttons to add shapes */}
        <div className="mt-4">
          <button
            onClick={addRectangle}
            className="block w-full mb-2 p-2 bg-blue-500 text-white rounded"
          >
            Add Rectangle
          </button>
          <button
            onClick={addCircle}
            className="block w-full mb-2 p-2 bg-green-500 text-white rounded"
          >
            Add Circle
          </button>
          <button
            onClick={addLine}
            className="block w-full mb-2 p-2 bg-yellow-500 text-white rounded"
          >
            Add Line
          </button>
          <button
            onClick={addText}
            className="block w-full mb-2 p-2 bg-purple-500 text-white rounded"
          >
            Add Text
          </button>
          <button
            onClick={handleGroupObjects}
            className="block w-full mb-2 p-2 bg-indigo-500 text-white rounded"
          >
            Group
          </button>
          <button
            onClick={handleUngroupObjects}
            className="block w-full mb-2 p-2 bg-red-500 text-white rounded"
          >
            Ungroup
          </button>
        </div>
      </div>

      {/* Fabric.js Canvas */}
      <div className="w-3/4 p-4">
        <FabricCanvas ref={fabricCanvasRef} width={canvasWidth} height={canvasHeight} />
      </div>
    </div>
  );
};

export default CanvasWithControls;
