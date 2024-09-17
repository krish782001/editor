import React from "react";
import { FaSquare, FaTriangle, FaCircle, FaMinus, FaPlus, FaMinusSquare } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";

interface ShapeDrawerProps {
  addRectangle: () => void;
  addTriangle: () => void;
  addCircle: () => void;
  addVerticalReferenceLine: () => void;
  addHorizontalReferenceLine: () => void;
  addLine: () => void;
  closeDrawer: () => void;
}

const ShapeDrawer: React.FC<ShapeDrawerProps> = ({
  addRectangle,
  addTriangle,
  addCircle,
  addVerticalReferenceLine,
  addHorizontalReferenceLine,
  addLine,
  closeDrawer,
}) => {
  return (
    <aside
      className="rounded-md"
      style={{
        width: "200px",
        background: "#eaeaea",
        padding: "10px",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "10",
      }}
    >
      <h3 className="font-semibold text-lg mb-4">Shapes</h3>
      <div className="space-y-2">
        <button
          onClick={addRectangle}
          className="flex items-center w-full p-2 bg-blue-500 text-white rounded-md"
        >
          <FaSquare className="mr-2" /> Rectangle
        </button>
        <button
          onClick={addTriangle}
          className="flex items-center w-full p-2 bg-blue-500 text-white rounded-md"
        >
          <IoTriangle className="mr-2" /> Triangle
        </button>
        <button
          onClick={addCircle}
          className="flex items-center w-full p-2 bg-blue-500 text-white rounded-md"
        >
          <FaCircle className="mr-2" /> Circle
        </button>
        <button
          onClick={addVerticalReferenceLine}
          className="flex items-center w-full p-2 bg-blue-500 text-white rounded-md"
        >
          <FaMinus className="mr-2" /> Vertical Line
        </button>
        <button
          onClick={addHorizontalReferenceLine}
          className="flex items-center w-full p-2 bg-blue-500 text-white rounded-md"
        >
          <FaMinusSquare className="mr-2" /> Horizontal Line
        </button>
        <button
          onClick={addLine}
          className="flex items-center w-full p-2 bg-blue-500 text-white rounded-md"
        >
          <FaPlus className="mr-2" /> Line
        </button>
      </div>
      <button
        onClick={closeDrawer}
        className="w-full mt-4 p-2 bg-red-500 text-white rounded-md"
      >
        Close
      </button>
    </aside>
  );
};

export default ShapeDrawer;
