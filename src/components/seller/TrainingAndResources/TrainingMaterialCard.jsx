import React from "react";
import { FileText, Video, Image as ImageIcon, Mail } from "lucide-react";

const TrainingMaterialCard = ({ material }) => {
  const { fileType, filePath, link, title, description, uploadedBy, createdAt } = material;

  // Format date for display (assuming createdAt is an ISO string or formatted string)
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-6 w-full">
      <h2 className="text-xl font-semibold mb-2">Title: {title}</h2>
      <p className="text-gray-700 mt-4">Description: {description || "No description"}</p>

      <div className="mt-10">
       
        {fileType === "image" && filePath && (
          <img
            src={filePath}
            alt={title}
            className="w-full h-[200px] md:h-[300px] object-cover rounded"
          />
        )}
        {fileType === "pdf" && link && (
          <div className="flex items-center space-x-4">
            <FileText className="w-12 h-12 text-red-500" />
            <p>{material.fileName || "Document"}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-12 flex-wrap gap-2">
        <div className="text-sm text-gray-500">
          <b>Uploaded by:</b> {uploadedBy}
          <br />
          <span>
            <b>Date:</b> {formattedDate}
          </span>
        </div>
        <a
          href={fileType === "image" ? filePath : link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          View
        </a>
      </div>
    </div>
  );
};

export default TrainingMaterialCard;