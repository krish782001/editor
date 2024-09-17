import React from 'react';
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";

interface FontFunctionsProps {
  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  isBold: boolean;
  setIsBold: (isBold: boolean) => void;
  isItalic: boolean;
  setIsItalic: (isItalic: boolean) => void;
  isUnderline: boolean;
  setIsUnderline: (isUnderline: boolean) => void;
  textAlign: string;
  setTextAlign: (textAlign: string) => void;
  charSpacing: number;
  setCharSpacing: (charSpacing: number) => void;
}

const fontFamilies = [
  'Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana', 
  'Roboto', 'Lobster', 'Comic Sans MS', 'Impact', 'Trebuchet MS',
  'Helvetica', 'Tahoma', 'Palatino', 'Garamond', 'Bookman',
  'Arial Black', 'Avant Garde', 'Comic Sans', 'Lucida Sans', 'Verdana Bold',
  'Century Gothic', 'Baskerville', 'Calibri', 'Cambria', 'Candara',
  'Franklin Gothic', 'Futura', 'Gill Sans', 'Geneva', 'Optima',
  'Segoe UI', 'Montserrat', 'Open Sans', 'Oswald', 'Pacifico',
  'Raleway', 'Quicksand', 'Slabo 27px', 'Ubuntu', 'Lora',
  'Merriweather', 'Nunito', 'Playfair Display', 'Rubik', 'Source Sans Pro',
  'Zilla Slab', 'Baloo', 'Bangers', 'Caveat', 'Courgette',
  'Dancing Script', 'EB Garamond', 'Fredoka One', 'Great Vibes', 'Indie Flower',
  'Josefin Sans', 'Kalam', 'Kaushan Script', 'Libre Baskerville', 'Lobster Two',
  'Maven Pro', 'Merienda', 'Muli', 'Neuton', 'Oleo Script',
  'Overpass', 'Patua One', 'Permanent Marker', 'PT Serif', 'Quattrocento',
  'Raleway Dots', 'Ranchers', 'Rationale', 'Satisfy', 'Shadows Into Light',
  'Signika', 'Sriracha', 'Tangerine', 'Titillium Web', 'Ultra',
  'Varela Round', 'Vollkorn', 'Yatra One', 'Yellowtail', 'Yeseva One',
  'Bebas Neue', 'Comfortaa', 'Dosis', 'Exo 2', 'Inconsolata',
  'Karla', 'Lato', 'Merriweather Sans', 'Oxygen', 'Poppins',
  'Questrial', 'Righteous', 'Sanchez', 'Spectral', 'Work Sans'
];

const FontFunctions: React.FC<FontFunctionsProps> = ({ 
  fontFamily, setFontFamily, fontSize, setFontSize, textColor, setTextColor, 
  isBold, setIsBold, isItalic, setIsItalic, isUnderline, setIsUnderline, 
  textAlign, setTextAlign ,charSpacing, setCharSpacing 
}) => {
  return (
    <div className="font-functions flex items-center space-x-4 p-2 rounded justify-items-center ml-10">
      <div className="font-functions__control flex items-center button-separator">
        <select 
          id="fontFamily"
          value={fontFamily} 
          onChange={(e) => setFontFamily(e.target.value)} 
          className="p-2 border rounded bg-gray-200"
        >
          {fontFamilies.map((family) => (
            <option key={family} value={family}>{family}</option>
          ))}
        </select>
      </div>
      <div className="font-functions__control flex items-center button-separator">
        <select 
          id="fontSize"
          value={fontSize} 
          onChange={(e) => setFontSize(Number(e.target.value))} 
          className="p-2 border rounded bg-gray-200"
        >
          {Array.from({ length: 36 }, (_, i) => i + 8).map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      <div className="font-functions__control flex items-center button-separator">
        <input 
          id="textColor"
          type="color" 
          value={textColor} 
          onChange={(e) => setTextColor(e.target.value)} 
          className="p-2 border rounded"
        />
      </div>
      <div className="font-functions__control flex items-center space-x-2 button-separator">
        <label className="flex items-center space-x-1">
          <input 
            type="checkbox" 
            checked={isBold} 
            onChange={(e) => setIsBold(e.target.checked)} 
          />
          <span><FaBold /></span>
        </label>
        <label className="flex items-center space-x-1">
          <input 
            type="checkbox" 
            checked={isItalic} 
            onChange={(e) => setIsItalic(e.target.checked)} 
          />
          <span><FaItalic /></span>
        </label>
        <label className="flex items-center space-x-1">
          <input 
            type="checkbox" 
            checked={isUnderline} 
            onChange={(e) => setIsUnderline(e.target.checked)} 
          />
          <span><FaUnderline /></span>
        </label>
      </div>
      <div className="font-functions__control flex items-center button-separator">
        <select 
          id="textAlign"
          value={textAlign} 
          onChange={(e) => setTextAlign(e.target.value)} 
          className="p-2 border rounded bg-gray-200"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>
      <div className="font-functions__control flex items-center button-separator">
        <span>Char Spacing</span>
        <input 
          id="charSpacing"
          type="number"
          value={charSpacing}
          onChange={(e) => setCharSpacing(Number(e.target.value))}
          className="p-2 border rounded w-20 bg-gray-200"
        />
      </div>
    </div>
  );
};

export default FontFunctions;
