import React from 'react';
import { fabric } from 'fabric';

interface SidebarProps {
  elements: fabric.Object[];
  onSelectElement: (element: fabric.Object) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ elements, onSelectElement }) => {
  return (
    <div className="w-64 bg-gray-800 p-4">
      <h3 className="text-lg font-bold mb-4">Elements</h3>
      <ul>
        {elements.map((element, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-300 p-2"
            onClick={() => onSelectElement(element)}
          >
            {element.type} - {element.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
