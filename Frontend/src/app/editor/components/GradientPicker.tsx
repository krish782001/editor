import React, { useState, useEffect } from 'react';

interface GradientPickerProps {
  gradient: string;
  onChange: (gradient: string) => void;
  reset: boolean; // Add reset prop
}

const GradientPicker: React.FC<GradientPickerProps> = ({ gradient, onChange, reset }) => {
  const [color1, setColor1] = useState('#ff0000');
  const [color2, setColor2] = useState('#00ff00');
  const [angle, setAngle] = useState(90);

  console.log("color1",color1);
  console.log("color2",color2);
  useEffect(() => {
    if (reset) {
      setColor1('#ff0000');
      setColor2('#00ff00');
      setAngle(90);
    }
  }, [reset]);

  const handleColorChange = (index: number, color: string) => {
    if (index === 1) setColor1(color);
    if (index === 2) setColor2(color);
  };

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAngle = parseInt(e.target.value, 10);
    setAngle(newAngle);
  };

  const updateGradient = () => {
    const newGradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    onChange(newGradient);
  };

  return (
    <div>
      <h3>Gradient Picker</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="color"
          value={color1}
          onChange={(e) => handleColorChange(1, e.target.value)}
        />
        <input
          type="color"
          value={color2}
          onChange={(e) => handleColorChange(2, e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Angle:</label>
        <input
          type="number"
          value={angle}
          onChange={handleAngleChange}
          min="0"
          max="360"
        />
      </div>
      <div
        style={{
          width: '100%',
          height: '100px',
          background: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
          marginBottom: '10px',
        }}
      ></div>
      <button onClick={updateGradient}>Apply Gradient</button>
    </div>
  );
};

export default GradientPicker;
