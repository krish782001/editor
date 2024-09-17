import React from "react";

interface TextDrawerProps {
  handleAddText: (type: "heading" | "subheading" | "text") => void;
  closeDrawer: () => void;
}

const TextDrawer: React.FC<TextDrawerProps> = ({
  handleAddText,
  closeDrawer,
}) => {
  return (
    <>
      <div >
        <button className="text-3xl" onClick={() => handleAddText("heading")}>
          Add Heading
        </button>
        <button
          className="text-3xl"
          onClick={() => handleAddText("subheading")}
        >
          Add Subheading
        </button>
        <button className="text-2xl" onClick={() => handleAddText("text")}>
          Add Text
        </button>
      </div>
      <div>
        <button
          onClick={closeDrawer}
          type="button"
          className="text-gray-300 bg-black border border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Close
        </button>
      </div>
    </>
  );
};

export default TextDrawer;
