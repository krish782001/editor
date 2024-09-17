/* eslint-disable react/no-deprecated */
import React, { useState } from "react";
import { fabric } from "fabric";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import ReactDOM from "react-dom"; // Import ReactDOM here

interface IconsDrawerProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
  closeDrawer: () => void;
}

const IconsDrawer: React.FC<IconsDrawerProps> = ({
  canvasRef,
  closeDrawer,
}) => {
  const [icons] = useState([
    { icon: IoIosArrowForward, name: "Arrow Forward" },
    { icon: IoIosArrowBack, name: "Arrow Back" },
    
  ]);

  const handleAddIcon = (icon: any) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const svgElement = document.createElement("div");
      const IconComponent = icon.icon;
      // Render the icon component into a div using ReactDOM
      ReactDOM.render(<IconComponent />, svgElement);
      // Extract the inner HTML as the SVG string
      const svgString = svgElement.innerHTML;

      fabric.loadSVGFromString(svgString, (objects, options) => {
        const loadedObjects = fabric.util.groupSVGElements(objects, options);
        loadedObjects.scaleToWidth(50); // Adjust size if necessary
        loadedObjects.scaleToHeight(50); // Adjust size if necessary
        loadedObjects.set({
          left: 50, // Set initial position
          top: 50,
        });
        canvas.add(loadedObjects);
        canvas.setActiveObject(loadedObjects);
        canvas.renderAll();
      });
      closeDrawer();
    }
  };

  return (
    <div>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {icons.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              marginBottom: "5px",
            }}
            onClick={() => handleAddIcon(item)}
          >
            <item.icon size={30} />
            <span style={{ marginLeft: "10px" }}>{item.name}</span>
          </div>
        ))}
      </div>
      <button
        onClick={closeDrawer}
        className="text-gray-300 bg-black border border-gray-900 focus:outline-none   focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Close
      </button>
    </div>
  );
};

export default IconsDrawer;
