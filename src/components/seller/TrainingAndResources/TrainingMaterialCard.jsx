import React from "react";
import { FileText, Video, ImageIcon, Mail } from "lucide-react";

const getFileType = (fileName) => {
  const ext = fileName.split(".").pop().toLowerCase();
  if (["mp4", "webm", "ogg"].includes(ext)) return "video";
  if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  return "other";
};

const TrainingMaterialCard = ({ material }) => {
  const type = getFileType(material.filePath);

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-6 w-full">
      <h2 className="text-xl font-semibold mb-2"> Title: {material.title}</h2>
      <p className="text-gray-700 mt-4"> Description: {material.description}</p>

      <div className="mt-10">
        {type === "video" && (
          <video
            controls
            className="w-full h-[200px] md:h-[300px] object-cover rounded"
          >
            <source src={material.filePath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {type === "image" && (
          <img
            src={material.filePath}
            alt={material.title}
            className="w-full h-[200px] md:h-[300px] object-cover rounded"
          />
        )}
        {type === "pdf" && (
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
              alt="PDF Icon"
              className="w-12 h-12"
            />
            <p>{material.fileName}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-13  flex-wrap gap-2">
        <div className="text-sm text-gray-500">
          <b>Uploaded by:</b> {material.uploadedBy}
          <br /> <br />
          <span className="mt-12">
            {" "}
            <b>Date</b> {material.createdAt}
          </span>
        </div>
        <a
          href={material.filePath}
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
