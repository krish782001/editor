import React from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <div>
      <label>Solid Color:</label>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ColorPicker;
