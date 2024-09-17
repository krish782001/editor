/* eslint-disable react/display-name */
// components/FabricCanvas.tsx
"use client"
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { fabric } from 'fabric';

interface FabricCanvasProps {
  width: number;
  height: number;
}

fabric.Group.prototype.toObject = (function(toObject) {
  return function() {
    return fabric.util.object.extend(toObject.call(this), {
      name: this.get('name'),
    });
  };
})(fabric.Group.prototype.toObject);
const FabricCanvas = forwardRef<fabric.Canvas | null, FabricCanvasProps>(({ width, height }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useImperativeHandle(ref, () => fabricCanvasRef.current);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current);
    fabricCanvasRef.current = canvas;

    // Set the background color to white
    canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas));

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null; // Clean up the reference
    };
  }, []);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.setWidth(width);
      fabricCanvasRef.current.setHeight(height);
      fabricCanvasRef.current.renderAll();
    }
  }, [width, height]);

  return (
    <div className='p-1 mb-4 border-2 border-gray-950 rounded-md'>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
});

export default FabricCanvas;
