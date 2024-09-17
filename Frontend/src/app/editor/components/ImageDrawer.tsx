/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { fabric } from "fabric";

interface ImageDrawerProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
  closeDrawer: () => void;
}

const ImageDrawer: React.FC<ImageDrawerProps> = ({
  canvasRef,
  closeDrawer,
}) => {
  const [activeTab, setActiveTab] = useState<"upload" | "pixabay" | "unsplash">(
    "upload"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [pixabayImages, setPixabayImages] = useState<string[]>([]);
  const [unsplashImages, setUnsplashImages] = useState<string[]>([]);
  const pixabayApiKey = "44847675-0bf974f703004fca51bcd5e34"; // Replace with your Pixabay API key
  const unsplashApiKey = "RjEDKsal7dE00ZE1emZ9eia9yPMoy6uBgqsFF2hAYM4"; // Replace with your Unsplash API key

  const handleSearch = () => {
    if (!searchQuery) {
      console.error("Search query cannot be empty.");
      return;
    }

    if (activeTab === "pixabay") {
      // Fetch from Pixabay
      fetch(
        `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(
          searchQuery
        )}&image_type=photo`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.hits) {
            const images = data.hits.map((hit: any) => hit.previewURL);
            setPixabayImages(images);
          } else {
            console.error("Invalid response format from Pixabay API:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching Pixabay images:", error);
        });
    } else if (activeTab === "unsplash") {
      // Fetch from Unsplash
      fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          searchQuery
        )}&client_id=${unsplashApiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.results) {
            const images = data.results.map((result: any) => result.urls.thumb);
            setUnsplashImages(images);
          } else {
            console.error("Invalid response format from Unsplash API:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching Unsplash images:", error);
        });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const canvas = canvasRef.current;
    const file = event.target.files?.[0];
    if (canvas && file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        fabric.Image.fromURL(dataUrl, (img) => {
          img.scaleToWidth(200);
          canvas.add(img);
          canvas.renderAll();
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "10px", justifyContent: "space-between" }}>
        <div>
          <button
            onClick={() => setActiveTab("upload")}
            className="text-gray-300 bg-red-500 border border-gray-900 focus:outline-none   focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Upload
          </button>
          <button
            onClick={() => setActiveTab("pixabay")}
            className="text-gray-300 bg-red-500 border border-gray-900 focus:outline-none   focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Pixabay
          </button>
          <button
            onClick={() => setActiveTab("unsplash")}
            className="text-gray-300 bg-red-500 border border-gray-900 focus:outline-none   focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Unsplash
          </button>
        </div>
        <button
          onClick={closeDrawer}
          className="text-gray-300 bg-black border border-gray-900 focus:outline-none   focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Close
        </button>
      </div>
      {activeTab !== "upload" && (
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search images..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
      {activeTab === "upload" && (
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      )}
      {activeTab === "pixabay" && (
        <div>
          <h3>Pixabay Images</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {pixabayImages.map((imageUrl, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={imageUrl}
                alt={`Pixabay Image ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  fabric.Image.fromURL(imageUrl, (img) => {
                    img.scaleToWidth(200);
                    canvasRef.current?.add(img);
                    canvasRef.current?.renderAll();
                  });
                  closeDrawer();
                }}
              />
            ))}
          </div>
        </div>
      )}
      {activeTab === "unsplash" && (
        <div>
          <h3>Unsplash Images</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {unsplashImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Unsplash Image ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  fabric.Image.fromURL(imageUrl, (img) => {
                    img.scaleToWidth(200);
                    canvasRef.current?.add(img);
                    canvasRef.current?.renderAll();
                  });
                  closeDrawer();
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDrawer;
