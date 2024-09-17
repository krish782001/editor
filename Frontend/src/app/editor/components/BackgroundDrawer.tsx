/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import GradientPicker from './GradientPicker';
import { GithubPicker } from 'react-color';

interface BackgroundDrawerProps {
  setBackgroundColor: (color: string) => void;
  setBackgroundImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeBackgroundImage: () => void;
  setPattern: (patternUrl: string) => void;
  closeDrawer: () => void;
}

const BackgroundDrawer: React.FC<BackgroundDrawerProps> = ({
  setBackgroundColor,
  setBackgroundImage,
  removeBackgroundImage,
  setPattern,
  closeDrawer,
}) => {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  const patterns = [
    'https://www.toptal.com/designers/subtlepatterns/patterns/memphis-mini.png',
    'https://www.toptal.com/designers/subtlepatterns/patterns/darkness.png',
  ];

  const [color, setColor] = useState('#ff0000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showGradientPicker, setShowGradientPicker] = useState(false);
  const [resetGradientPicker, setResetGradientPicker] = useState(false); // Add state for reset

  const handleColorChange = (color: any) => {
    setColor(color.hex);
    setBackgroundColor(color.hex);
  };

  const handleGradientChange = (gradient: string) => {
    setBackgroundColor(gradient); // Apply the gradient as background
  };

  const handleRemoveBackground = () => {
    removeBackgroundImage();
    setResetGradientPicker(true); // Reset the gradient picker
    setTimeout(() => setResetGradientPicker(false), 0); // Reset the state after the update
  };

  return (
    <div style={{ padding: '10px' }}>
      <h2>Background Options</h2>
      <div>
        <button
          onClick={() => document.getElementById('background-image-upload')?.click()}
          className="text-gray-300 bg-red-500 border border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Upload BG
        </button>
        <input
          type="file"
          id="background-image-upload"
          style={{ display: 'none' }}
          onChange={setBackgroundImage}
        />
        <button
          onClick={handleRemoveBackground}
          className="text-gray-300 bg-gray-900 border border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Remove BG
        </button>
      </div>
      <div>
        <h3>Solid Colors</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => setBackgroundColor(color)}
              style={{
                backgroundColor: color,
                width: '30px',
                height: '30px',
                margin: '5px',
                cursor: 'pointer',
              }}
            ></div>
          ))}
        </div>
      </div>
      <div>
        <h3>Pick a Color</h3>
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="text-gray-300 bg-blue-500 border border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Choose Color
        </button>
        {showColorPicker && (
          <GithubPicker color={color} onChange={handleColorChange} />
        )}
      </div>
      <div>
        <h3>Pick a Gradient</h3>
        <button
          onClick={() => setShowGradientPicker(!showGradientPicker)}
          className="text-gray-300 bg-purple-500 border border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Choose Gradient
        </button>
        {showGradientPicker && (
          <GradientPicker gradient="" onChange={handleGradientChange} reset={resetGradientPicker} />
        )}
      </div>
      <div>
        <h3>Patterns</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {patterns.map((pattern, index) => (
            <img
              key={index}
              src={pattern}
              alt={`Pattern ${index + 1}`}
              onClick={() => setPattern(pattern)}
              style={{
                width: '50px',
                height: '50px',
                margin: '5px',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>
      <button
        onClick={closeDrawer}
        className="text-gray-300 bg-black border border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Close
      </button>
    </div>
  );
};

export default BackgroundDrawer;
