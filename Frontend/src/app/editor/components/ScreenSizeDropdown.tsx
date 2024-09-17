
// ScreenSizeDropdown.tsx
import React from 'react';

export type ScreenSize = {
    name: string;
  width: number;
  height: number;
};

type ScreenSizeDropdownProps = {
  onScreenSizeChange: (screenSize: ScreenSize) => void; // Correct prop name
};

const SCREEN_SIZES: ScreenSize[] = [
      { name: 'default', width: 960, height: 540 },
      { name: 'iPhone 15 Pro', width: 393, height: 852 },
      { name: 'iPhone 15', width: 393, height: 852 },
      { name: 'iPhone 15 Pro Max', width: 430, height: 932 },
      { name: 'iPhone 15 Plus', width: 430, height: 932 },
      { name: 'iPhone 14 Plus', width: 428, height: 926 },
      { name: 'iPhone 14 Pro Max', width: 430, height: 932 },
      { name: 'iPhone 14 Pro', width: 393, height: 852 },
      { name: 'iPhone 14', width: 390, height: 844 },
      { name: 'iPhone 13 mini', width: 375, height: 812 },
      { name: 'iPhone SE', width: 320, height: 568 },
      { name: 'iPhone 8 Plus', width: 414, height: 736 },
      { name: 'iPhone 8', width: 375, height: 667 },
      { name: 'Android Small', width: 360, height: 640 },
      { name: 'Android Large', width: 360, height: 800 },
      { name: 'iPad mini 8.3', width: 744, height: 1133 },
      { name: 'Surface Pro 8', width: 1440, height: 960 },
      { name: 'iPad Pro 11"', width: 834, height: 1194 },
      { name: 'iPad Pro 12.9"', width: 1024, height: 1366 },
      { name: 'Apple Watch 45mm', width: 198, height: 242 },
      { name: 'Apple Watch 41mm', width: 176, height: 215 },
      { name: 'Apple Watch 44mm', width: 184, height: 224 },
];

const ScreenSizeDropdown: React.FC<ScreenSizeDropdownProps> = ({ onScreenSizeChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = SCREEN_SIZES[parseInt(event.target.value)];
    onScreenSizeChange(selectedSize); // Call the correct prop function
  };

  return (
    <select onChange={handleChange} className='bg-slate-200 w-20 h-10 text-black rounded-md'>
      {SCREEN_SIZES.map((size, index) => (
        <option key={index} value={index}>
         {size.name}: {size.width} x {size.height}
        </option>
      ))}
    </select>
  );
};

export default ScreenSizeDropdown;
