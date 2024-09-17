import React, { useState } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { LuRectangleHorizontal, LuTriangle } from 'react-icons/lu';
import { GiStraightPipe } from 'react-icons/gi';
import { AiOutlineLine } from 'react-icons/ai'; // Import an icon for reference lines
import { fabric } from 'fabric';

interface ShapeButtonsProps {
  addRectangle: () => void;
  addTriangle: () => void;
  addCircle: () => void;
  addLine: () => void;
  addVerticalReferenceLine: () => void; // Add this prop
  addHorizontalReferenceLine: () => void; // Add this prop
  setCanvasWidth: (width: number) => void;
  setCanvasHeight: (height: number) => void;
  canvasRef: React.RefObject<fabric.Canvas>;
}

const ShapeButtons: React.FC<ShapeButtonsProps> = ({
  addRectangle,
  addTriangle,
  addCircle,
  addLine,
  addVerticalReferenceLine, // Use this prop
  addHorizontalReferenceLine, // Use this prop
  setCanvasWidth,
  setCanvasHeight,
  canvasRef,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasWidth(parseInt(e.target.value, 10));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasHeight(parseInt(e.target.value, 10));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <div className="relative inline-block">
        <button
          onClick={toggleDropdown}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Shapes
        </button>
        {isDropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
            <button
              onClick={addRectangle}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              <LuRectangleHorizontal className="inline-block mr-2" /> 
            </button>
            <button
              onClick={addVerticalReferenceLine}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              <AiOutlineLine className="inline-block mr-2" />
            </button>
            <button
              onClick={addHorizontalReferenceLine}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              <AiOutlineLine className="inline-block mr-2 transform rotate-90" />
            </button>
            <button
              onClick={addTriangle}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              <LuTriangle className="inline-block mr-2" /> 
            </button>
            <button
              onClick={addCircle}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              <FaRegCircle className="inline-block mr-2" /> 
            </button>
            <button
              onClick={addLine}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              <GiStraightPipe className="inline-block mr-2" /> 
            </button>
           
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <label className="flex items-center space-x-1">
          <span>W</span>
          <input
            type="number"
            onChange={handleWidthChange}
            className="w-20 border rounded-md px-2 py-1"
          />
        </label>
        <label className="flex items-center space-x-1">
          <span>H</span>
          <input
            type="number"
            onChange={handleHeightChange}
            className="w-20 border rounded-md px-2 py-1"
          />
        </label>
      </div>
    </div>
  );
};

export default ShapeButtons;
