/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import FabricCanvas from "./FabricCanvas";
import TextDrawer from "./TextDrawer";
import BackgroundDrawer from "./BackgroundDrawer";
import IconsDrawer from "./IconsDrawer";
import ImageDrawer from "./ImageDrawer";
import FontFunctions from "./FontFunctions";
import { fabric } from "fabric";
import { BsFillPencilFill } from "react-icons/bs";
import LogCanvasJsonButton from "./LogCanvasJsonButton";
import { TbBackground, TbIcons } from "react-icons/tb";
import {
  FaImages,
  FaStopCircle,
  FaTrash,
  FaRedo,
  FaObjectGroup,
  FaObjectUngroup,
  FaShapes,
  FaPalette ,
} from "react-icons/fa";
import SaveModal from "./SaveModal";
import {  MdOutlineTextFields } from "react-icons/md";
import ScreenSizeDropdown, { ScreenSize } from "./ScreenSizeDropdown"; // Import ScreenSizeDropdown
import ShapeDrawer from "./ShapeDrawer";
import ColorPicker from './ColorPicker';
import GradientPicker from './GradientPicker';
import { v4 as uuidv4 } from 'uuid';


const CanvasWithControls: React.FC = () => {
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(960);
  const [canvasHeight, setCanvasHeight] = useState(540);
  const [isTextDrawerOpen, setIsTextDrawerOpen] = useState(false);
  const [isBackgroundDrawerOpen, setIsBackgroundDrawerOpen] = useState(false);
  const [isImagesDrawerOpen, setIsImagesDrawerOpen] = useState(false);
  const [isIconsDrawerOpen, setIsIconsDrawerOpen] = useState(false);
  const [isFreeDrawingMode, setIsFreeDrawingMode] = useState(false);
  const [cornerRadius, setCornerRadius] = useState<number>(0); // State for corner radius
  const [objectWidth, setObjectWidth] = useState<number>(0);
  const [objectHeight, setObjectHeight] = useState<number>(0);
  // Font-related state
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState("#000000");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textAlign, setTextAlign] = useState("left");
  const [charSpacing, setCharSpacing] = useState<number>(0);
  const [selectedElement, setSelectedElement] = useState<fabric.Object | null>(
    null
  );
  const [selectedElementColor, setSelectedElementColor] = useState<string>("#000000");
  const [selectedGroup, setSelectedGroup] = useState<fabric.Group | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false); // State for save modal
  const [isShapeDrawerOpen, setIsShapeDrawerOpen] = useState(false);
  const [gradient, setGradient] = useState('linear-gradient(90deg, #ff0000, #00ff00)');
  const [solidColor, setSolidColor] = useState('#ff0000');
  const [resetGradient, setResetGradient] = useState(false);
  const [resetColor, setResetColor] = useState(false);
  const [isGradientColorDrawerOpen, setIsGradientColorDrawerOpen] = useState(false);
  const [objects, setObjects] = useState<fabric.Object[]>([]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  

  useEffect(() => {
    const canvas = fabricCanvasRef.current;

    if (canvas) {
      const updateObjectsList = () => {
        const updatedObjects = canvas.getObjects();
        setObjects(updatedObjects);
      };

      const handleObjectSelected = (e: fabric.IEvent) => {
        const selectedObject = e.target;
        if (selectedObject) {
          const id = selectedObject.get("id");
          setSelectedObjectId(id); // Update the selectedObjectId state
        } else {
          setSelectedObjectId(null);
        }
      };

      // Add event listeners
      canvas.on("object:added", updateObjectsList);
      canvas.on("object:removed", updateObjectsList);
      canvas.on("object:modified", updateObjectsList);
      canvas.on("selection:created", handleObjectSelected);
      canvas.on("selection:updated", handleObjectSelected);
      canvas.on("selection:cleared", () => setSelectedObjectId(null));

      // Initialize the objects list and selection
      updateObjectsList();

      // Cleanup event listeners on component unmount
      return () => {
        canvas.off("object:added", updateObjectsList);
        canvas.off("object:removed", updateObjectsList);
        canvas.off("object:modified", updateObjectsList);
        canvas.off("selection:created", handleObjectSelected);
        canvas.off("selection:updated", handleObjectSelected);
        canvas.off("selection:cleared", () => setSelectedObjectId(null));
      };
    }
  }, [fabricCanvasRef.current]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    
    if (canvas) {
      // Attach event listeners
      canvas.on("selection:created", (e) => {
        updateSelectedElements(e);
        updateCornerRadius();
      });
      canvas.on("selection:updated", (e) => {
        updateSelectedElements(e);
        updateCornerRadius();
      });
      canvas.on("selection:cleared", clearSelectedElements);
    }
  
    return () => {
      if (canvas) {
        // Remove event listeners
        canvas.off("selection:created", updateSelectedElements);
        canvas.off("selection:updated", updateSelectedElements);
        canvas.off("selection:cleared", clearSelectedElements);
  
        // Check if the canvas element still exists before disposing
        if (canvas.lowerCanvasEl && canvas.lowerCanvasEl.parentNode) {
          canvas.dispose();
        }
      }
    };
  }, [updateSelectedElements, updateCornerRadius]);
  

  

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "rect") {
        (activeObject as fabric.Rect).set({
          rx: cornerRadius,
          ry: cornerRadius,
        });
        canvas.renderAll();
      }
    }
  }, [cornerRadius]);


  
  useEffect(() => {
    console.log("hii im working")
    updateActiveObject();
  }, [fontFamily, fontSize, textColor, isBold, isItalic, isUnderline, textAlign, charSpacing, selectedElement]);



  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    
    if (canvas) {
      const handleObjectChange = (e: fabric.IEvent) => {
        const activeObject = e.target as fabric.Textbox;
        if (activeObject && activeObject.type === 'textbox') {
          setSelectedElement(activeObject);
          setFontFamily(activeObject.fontFamily || 'Arial');
          setFontSize(activeObject.fontSize || 16);
          setTextColor((activeObject.fill as string) || '#000000');
          setIsBold(activeObject.fontWeight === 'bold');
          setIsItalic(activeObject.fontStyle === 'italic');
          setIsUnderline(activeObject.underline || false);
          setTextAlign(activeObject.textAlign || 'left');
          setCharSpacing(activeObject.charSpacing || 0);
        } else {
          setSelectedElement(null);
        }
      };

      canvas.on('object:selected', handleObjectChange);
      canvas.on('object:modified', handleObjectChange);

      return () => {
        canvas.off('object:selected', handleObjectChange);
        canvas.off('object:modified', handleObjectChange);
      };
    }
  }, []);

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCornerRadius(Number(event.target.value));
  };

  
  var updateSelectedElements:any = (e: fabric.IEvent) => {
    const selected = e.selected;
    if (selected && selected.length > 0) {
      const firstObject = selected[0];
      setSelectedElementColor(getElementColor(firstObject));
      setSelectedElement(firstObject);
      setObjectWidth(firstObject.width ?? 0);
      setObjectHeight(firstObject.height ?? 0);
    } else {
      setSelectedElement(null);
      setSelectedElementColor("#000000");
      setObjectWidth(0);
      setObjectHeight(0);
    }
  };

  const clearSelectedElements = () => {
    setSelectedElement(null);
    setSelectedGroup(null);
    setSelectedElementColor("#000000");
    setCornerRadius(0);
  };

  const handleAddRectangle = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const rect = new fabric.Rect({
        left: 50,
        top: 50,
        width: 100,
        height: 100,
        fill: "selectedElementColor",
        rx: cornerRadius,
        ry: cornerRadius,
        id: uuidv4(),
      });

      rect.on("scaling", function () {
        const newRx = this.rx * this.scaleX;
        const newRy = this.ry * this.scaleY;

        this.set({
          rx: newRx,
          ry: newRy,
          width: this.width * this.scaleX,
          height: this.height * this.scaleY,
          scaleX: 1,
          scaleY: 1,
        });

        canvas.renderAll();
      });

      rect.on("modified", function () {
        this.set({
          rx: this.rx * (this.width / this.getScaledWidth()),
          ry: this.ry * (this.height / this.getScaledHeight()),
        });
      });

      canvas.add(rect);
      canvas.setActiveObject(rect);
      canvas.renderAll();
    }
  };

  var updateCornerRadius:any = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "rect") {
        (activeObject as fabric.Rect).set({
          rx: cornerRadius,
          ry: cornerRadius,
        });
        canvas.renderAll();
      }
    }
  };

  const handleAddTriangle = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const triangle = new fabric.Triangle({
        left: 50,
        top: 50,
        fill: selectedElementColor,
        width: 100,
        height: 100,
        id: uuidv4(),
      });
      canvas.add(triangle);
      canvas.setActiveObject(triangle);
      canvas.renderAll();
    }
  };

  const handleAddCircle = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const circle = new fabric.Circle({
        left: 50,
        top: 50,
        fill: selectedElementColor,
        radius: 50,
        id: uuidv4(),
      });
      canvas.add(circle);
      canvas.setActiveObject(circle);
      canvas.renderAll();
    }
  };

  const addVerticalReferenceLine = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const line = new fabric.Line([canvas.width / 2, 0, canvas.width / 2, canvas.height], {
        stroke: 'red',
        selectable: true,
        evented: false,
        strokeWidth: 1,
        id: uuidv4(),
      });
      canvas.add(line);
      canvas.renderAll();
    }
  };
  
  const addHorizontalReferenceLine = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const line = new fabric.Line([0, canvas.height / 2, canvas.width, canvas.height / 2], {
        stroke: 'red',
        selectable: true,
        evented: false,
        strokeWidth: 1,
        id: uuidv4(),
      });
      canvas.add(line);
      canvas.renderAll();
    }
  };
  

  const handleAddLine = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const line = new fabric.Line([50, 100, 200, 200], {
        left: 50,
        top: 50,
        stroke: selectedElementColor,
        id: uuidv4(),
      });
      canvas.add(line);
      canvas.setActiveObject(line);
      canvas.renderAll();
      setSelectedElementColor(textColor);
    }
  };

 
  const updateCanvas = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.renderAll();
    }
  };
  
  const handleAddText = (type: "heading" | "subheading" | "text") => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const text = new fabric.Textbox(
        type === "heading" ? "Heading" : type === "subheading" ? "Subheading" : "Text",
        {
          left: 50,
          top: 50,
          width: 150,
          fontSize: fontSize,
          fontFamily: fontFamily,
          fill: textColor,
          fontWeight: isBold ? "bold" : "normal",
          fontStyle: isItalic ? "italic" : "normal",
          underline: isUnderline,
          textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
          charSpacing,
          id: uuidv4(),
        }
      );
      canvas.add(text);
      canvas.setActiveObject(text);
      updateCanvas();
    }
  };
  

  function updateActiveObject(){
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject() as fabric.Textbox;
      
      if (activeObject && activeObject.type === 'textbox') {
        // Log the current state values to debug
        console.log('Updating text properties:', {
          fontFamily,
          fontSize,
          textColor,
          isBold,
          isItalic,
          isUnderline,
          textAlign,
          charSpacing,
        });
        activeObject.set({
          fontFamily: fontFamily,
          fontSize: fontSize,
          fill: textColor,
          fontWeight: isBold ? 'bold' : 'normal',
          fontStyle: isItalic ? 'italic' : 'normal',
          underline: isUnderline,
          textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
          charSpacing: charSpacing,
        });
         console.log('Updated text properties:', {
          fontFamily: activeObject.fontFamily,
          fontSize: activeObject.fontSize,
          fill: activeObject.fill,
          fontWeight: activeObject.fontWeight,
          fontStyle: activeObject.fontStyle,
          underline: activeObject.underline,
          textAlign: activeObject.textAlign,
          charSpacing: activeObject.charSpacing,
        });
  canvas.renderAll();
      }
    }
  };
 

  const handleSetBackgroundColor = (color: string) => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      console.log("Previous Background Color:", canvas.backgroundColor);
  
      // Clear existing backgrounds
      const existingBackgrounds = canvas.getObjects().filter(obj => obj.type === 'rect' && !obj.selectable && !obj.evented);
      existingBackgrounds.forEach(obj => canvas.remove(obj));
  
      console.log("Number of objects after clear:", canvas.getObjects().length);
  if (color.startsWith('linear-gradient') || color.startsWith('radial-gradient')) {
        const colors = color.match(/(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3})/g);
        if (colors) {
          const gradient = new fabric.Rect({
            left: 0,
            top: 0,
            width: canvas.width,
            height: canvas.height,
            fill: new fabric.Gradient({
              type: color.startsWith('linear-gradient') ? 'linear' : 'radial',
              coords: color.startsWith('linear-gradient') ? { x1: 0, y1: 0, x2: canvas.width, y2: canvas.height } : { r1: 0, r2: Math.max(canvas.width, canvas.height) / 2 },
              colorStops: [
                { offset: 0, color: colors[0] },
                { offset: 1, color: colors[1] || colors[0] },
              ],
            }),
            selectable: false,
            evented: false,
          });
  
          canvas.add(gradient);
          canvas.sendToBack(gradient);
        }
      } else {
        canvas.backgroundColor = color;
      }
      console.log("New Background Color:", canvas.backgroundColor);
      canvas.renderAll();
    }
  };
  const handleSetBackgroundImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const canvas = fabricCanvasRef.current;
    if (canvas && event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          fabric.Image.fromURL(e.target.result as string, (img) => {
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
              scaleX: canvas.width / img.width,
              scaleY: canvas.height / img.height,
            });
          });
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const getElementColor = (element: fabric.Object) => {
    return (element as fabric.IObject).fill ?? "#000000";
  };

  const handleRemoveBackgroundImage = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
      const objects = canvas.getObjects();
      objects.forEach(obj => {
        if (obj.type === 'rect' && obj.fill && obj.fill.toString().startsWith('gradient')) {
          canvas.remove(obj);
        }
      });
      canvas.backgroundColor = '#ffffff';
      canvas.renderAll();
    }
  };
  
  const toggleFreeDrawingMode = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.isDrawingMode = !canvas.isDrawingMode;
      if (canvas.isDrawingMode) {
        canvas.freeDrawingBrush.color = selectedElementColor;
      }
      setIsFreeDrawingMode(canvas.isDrawingMode);
    }
  };

  const openIconsDrawer = () => {
    setIsIconsDrawerOpen(true);
  };

  const handleApplyGradient = (newGradient: string) => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const activeObjects = canvas.getActiveObjects();
      console.log('Selected objects:', activeObjects);

      activeObjects.forEach((object) => {
        if (
          object instanceof fabric.Rect ||
          object instanceof fabric.Circle ||
          object instanceof fabric.Triangle ||
          object instanceof fabric.Textbox
        ) {
          const newGradient = new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'percentage',
            coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
            colorStops: [
              { offset: 0, color: gradient.split(', ')[1] },
              { offset: 1, color: gradient.split(', ')[2].slice(0, -1) },
            ],
          });

          object.set({ fill: newGradient });
        }
      });

      canvas.renderAll();
    }
  };

  const handleGradientChange = (newGradient: string) => {
    console.log("new",newGradient);
    setGradient(newGradient);
    handleApplyGradient(newGradient);
  };

  const handleApplySolidColor = (c:any) => {
    console.log("solid color",c,solidColor);
    
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const activeObjects = canvas.getActiveObjects();
      console.log('Selected objects:', activeObjects);

      activeObjects.forEach((object) => {
        if (
          object instanceof fabric.Rect ||
          object instanceof fabric.Circle ||
          object instanceof fabric.Triangle ||
          object instanceof fabric.Textbox
        ) {
          object.set({ fill: c });
        }
      });

      canvas.renderAll();
    }
  };

  const handleColorChange = (newColor: string) => {
    setSolidColor(newColor);
    handleApplySolidColor(newColor);
  };

  const handleReset = () => {
    setResetGradient(true);
    setResetColor(true);
    setGradient('linear-gradient(90deg, #ff0000, #00ff00)');
    setSolidColor('#ff0000');
    handleApplyGradient();
    handleApplySolidColor();
  };

  const handleGroupObjects = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "activeSelection") {
        // Prompt for a name
        const name = prompt("Enter a name for the group:");
        
        if (name) {
          // Group the selected objects
          const group = (activeObject as fabric.ActiveSelection).toGroup() as fabric.Group;
          group.set({ id: uuidv4(), name: name });
          
          // Update the objects state
          const newObjects = canvas.getObjects().map(obj => ({
            id: obj.id || uuidv4(),
            type: obj.type,
            name: obj.name
          }));
          
          setObjects(newObjects);
          
          canvas.renderAll();
        }
      }
    }
  };
  

  const handleUngroupObjects = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "group") {
        (activeObject as fabric.Group).toActiveSelection();
        canvas.renderAll();
      }
    }
  };
  const openShapeDrawer = () => {
    setIsShapeDrawerOpen(true);
  };
  const handleDeleteSelectedElement = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const activeObjects = canvas.getActiveObjects();

      if (activeObjects.length) {
        activeObjects.forEach((object) => {
          canvas.remove(object);
        });
        canvas.discardActiveObject();
        canvas.renderAll();
        setSelectedElement(null);
      }
    }
  };

  const handleResetCanvas = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = "white";
      canvas.renderAll();
      setSelectedElement(null);
    }
  };

  const handleSidebarItemClick = (id: string) => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const object = canvas.getObjects().find(obj => obj.id === id);
      if (object) {
        canvas.setActiveObject(object);
        canvas.renderAll();
        setSelectedObjectId(id);
      }
    }
  };
  

  const handleScreenSizeChange = (screenSize: ScreenSize) => {
    setCanvasWidth(screenSize.width);
    setCanvasHeight(screenSize.height);

    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.setWidth(screenSize.width);
      canvas.setHeight(screenSize.height);
      canvas.renderAll();
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }} className="bg-gray-100">
     
      <div >

  <header className="flex justify-between drop-shadow-2xl bg-gray-200">
    <div className="flex items-center space-x-4">
    <button onClick={openShapeDrawer} className="text-2xl button-separator ml-10">
            <FaShapes />
          </button>
   
      <button
        onClick={() => setIsTextDrawerOpen(true)}
        className="text-2xl button-separator ml-10"
      >
        <MdOutlineTextFields />
      </button>
      <button
        onClick={() => setIsBackgroundDrawerOpen(true)}
        className="text-2xl button-separator"
      >
        <TbBackground />
      </button>
      <button
        onClick={() => setIsImagesDrawerOpen(true)}
        className="text-2xl button-separator"
      >
        <FaImages />
      </button>
      <button onClick={openIconsDrawer} className="text-2xl button-separator">
        <TbIcons />
      </button>
      <button onClick={toggleFreeDrawingMode} className="text-2xl button-separator">
        {isFreeDrawingMode ? <FaStopCircle /> : <BsFillPencilFill />}
      </button>
      <button onClick={handleDeleteSelectedElement} className="text-2xl button-separator">
        <FaTrash />
      </button>
      <button onClick={handleResetCanvas} className="text-2xl button-separator">
        <FaRedo />
      </button>
      <button onClick={handleGroupObjects} className="text-2xl button-separator">
        <FaObjectGroup />
      </button>
      <button onClick={handleUngroupObjects} className="text-2xl button-separator">
        <FaObjectUngroup />
      </button>
      <button onClick={() => setIsGradientColorDrawerOpen(!isGradientColorDrawerOpen)} className="text-2xl button-separator">
            <FaPalette />
          </button>
      
      <label>Corner Radius:</label>
      <input
        id="corner-radius"
        type="number"
        min="0"
        value={cornerRadius}
        onChange={handleRadiusChange}
        className="w-20 border rounded-md px-2 py-1 button-separator "
      />
     
    </div>
    <div className="flex items-center space-x-4 button-separator p-3">
      <ScreenSizeDropdown onScreenSizeChange={handleScreenSizeChange} />{" "}
      <LogCanvasJsonButton canvasRef={fabricCanvasRef} />
      <button
        onClick={() => setIsSaveModalOpen(true)}
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        Save
      </button>
    </div>
  </header>
</div> 
      <div className="justify-items-center relative items-center ml-48 bg-slate-200 mr-48 border rounded-md mt-2 mb-4 drop-shadow-lg pos">
      <FontFunctions
        fontFamily={fontFamily}
        setFontFamily={(value) => { setFontFamily(value)}}
        fontSize={fontSize}
        setFontSize={(value) => { setFontSize(value)}}
        textColor={textColor}
        setTextColor={(value) => { setTextColor(value)}}
        isBold={isBold}
        setIsBold={(value) => { setIsBold(value)}}
        isItalic={isItalic}
        setIsItalic={(value) => { setIsItalic(value)}}
        isUnderline={isUnderline}
        setIsUnderline={(value) => { setIsUnderline(value)}}
        textAlign={textAlign}
        setTextAlign={(value) => { setTextAlign(value)}}
        charSpacing={charSpacing}
        setCharSpacing={(value) => { setCharSpacing(value)}}
      />

        
      </div>
      <div style={{ display: "flex", flex: 1, position: "relative"}}>
        {isTextDrawerOpen && (
          <aside className="rounded-md"
          style={{
            width: "200px",
            background: "#eaeaea",
            padding: "10px",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "10"
          }}
          >
            <TextDrawer
              handleAddText={handleAddText}
              closeDrawer={() => setIsTextDrawerOpen(false)}
            />
          </aside>
        )}
         {isShapeDrawerOpen && (
        <ShapeDrawer
          addRectangle={handleAddRectangle}
          addTriangle={handleAddTriangle}
          addCircle={handleAddCircle}
          addVerticalReferenceLine={addVerticalReferenceLine}
          addHorizontalReferenceLine={addHorizontalReferenceLine}
          addLine={handleAddLine}
          closeDrawer={() => setIsShapeDrawerOpen(false)}
        />
      )}
        {isBackgroundDrawerOpen && (
          <aside
          className="rounded-md"
          style={{
            width: "200px",
            background: "#eaeaea",
            padding: "10px",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "10"
          }}
          >
            <BackgroundDrawer
              setBackgroundColor={handleSetBackgroundColor}
              setBackgroundImage={handleSetBackgroundImage}
              removeBackgroundImage={handleRemoveBackgroundImage}
              // Correctly passing the handler for patterns
              closeDrawer={() => setIsBackgroundDrawerOpen(false)}
            />
          </aside>
        )}
        {isImagesDrawerOpen && (
          <aside
            className="rounded-md"
          style={{
            width: "200px",
            background: "#eaeaea",
            padding: "10px",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "10"
          }}
          >
            <ImageDrawer
              canvasRef={fabricCanvasRef}
              closeDrawer={() => setIsImagesDrawerOpen(false)}
            />
          </aside>
        )}
        {isIconsDrawerOpen && (
          <aside
            className="rounded-md"
          style={{
            width: "200px",
            background: "#eaeaea",
            padding: "10px",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "10"
          }}
          >
            <IconsDrawer
              canvasRef={fabricCanvasRef}
              closeDrawer={() => setIsIconsDrawerOpen(false)}
            />
          </aside>
        )}
         {isGradientColorDrawerOpen && (
          <aside
          className="rounded-md"
        style={{
          width: "170px",
          background: "#eaeaea",
          padding: "10px",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "10"
        }}
        >
            <GradientPicker gradient={gradient} onChange={handleGradientChange} reset={resetGradient} />
            <ColorPicker color={solidColor} onChange={handleColorChange} />
            <button onClick={handleReset} className="ml-4 p-2 bg-red-500 text-white rounded">
              Reset
            </button>
          </aside>
        )}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
       <div
  className="w-40 bg-gray-400 p-4 ml-4"
  style={{
    position: "absolute", // Position it absolutely
    top: "0",            // Align to the top
    left: "0", 
    margin: "10px",          // Align to the left
    height: "auto",     // Full height to align with the viewport height
    overflowY: "auto",   // Add scroll if content exceeds the height
           // Ensure it's above other content
  }}
>
<h2 className="text-lg font-semibold mb-4 ml-8">Elements</h2>
  <ul>
    {objects.length > 0 ? (
      objects.map((obj) => (
        <li key={obj.id} className="mb-2 ml-8">
          <div
            className={`p-2 cursor-pointer bg-gray-300 rounded ${selectedObjectId === obj.id ? "bg-blue-200" : ""}`}
            onClick={() => handleSidebarItemClick(obj.id)}
          >
            {obj.type} {obj.name }
          </div>
        </li>
      ))
    ) : (
      <li>No element</li>
    )}
  </ul>
        
</div>
          <FabricCanvas
            ref={fabricCanvasRef}
            width={canvasWidth}
            height={canvasHeight}
          />
        
        </div>
      </div>
    </div>
  );
};

export default CanvasWithControls;
