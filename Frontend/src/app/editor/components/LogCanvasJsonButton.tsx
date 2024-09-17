import React from 'react';
import { fabric } from 'fabric';

interface LogCanvasJsonButtonProps {
  canvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const LogCanvasJsonButton: React.FC<LogCanvasJsonButtonProps> = ({ canvasRef }) => {
  const handleLogCanvasJson = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        // Convert canvas to JSON and format it for better readability
        const canvasJson = JSON.stringify(canvas.toJSON(), null, 2);
        console.log('Canvas JSON:', canvasJson);
      } catch (error) {
        console.error('Error logging canvas JSON:', error);
      }
    } else {
      console.warn('Canvas reference is not available.');
    }
  };

  return (
    <button onClick={handleLogCanvasJson} className='p-2 bg-blue-500 text-white rounded-md'>
      JSON
    </button>
  );
};

export default LogCanvasJsonButton;
