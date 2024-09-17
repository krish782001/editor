import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface ExportPdfButtonProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
}

const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({ canvasRef }) => {
  const handleExportPdf = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Capture the canvas using html2canvas
      html2canvas(canvas.getElement(), { useCORS: true }).then((canvasElement) => {
        const imgData = canvasElement.toDataURL("image/png");
        
        // Check the dimensions and image data for debugging
        console.log("Canvas Width:", canvas.width);
        console.log("Canvas Height:", canvas.height);
        console.log("Image Data:", imgData);

        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "pt",
          format: [canvas.width!, canvas.height!],
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width!, canvas.height!);
        pdf.save("canvas.pdf");
      }).catch((error) => {
        console.error("Error capturing canvas:", error);
      });
    } else {
      console.error("Canvas reference is null");
    }
  };

  return (
    <button
      onClick={handleExportPdf}
      className="text-2xl p-2 bg-blue-500 text-white rounded-md"
    >
      Export PDF
    </button>
  );
};

export default ExportPdfButton;
