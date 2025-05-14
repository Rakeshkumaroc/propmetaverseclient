import React from "react";
import { FileText, Video, ImageIcon, Mail } from "lucide-react";

const getFileType = (fileName) => {
  const ext = fileName.split(".").pop().toLowerCase();
  if (["mp4", "webm"].includes(ext)) return "video";
  if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "image";
  if (["pdf"].includes(ext)) return "pdf";
  return "unknown";
};

const TrainingMaterialCard = ({ data }) => {
  const fileType = getFileType(data.fileName);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3">
      <div className="h-48 overflow-hidden flex items-center justify-center rounded-md border">
        {fileType === "video" ? (
          <video src={data.filePath} controls className="h-full w-full object-cover" />
        ) : fileType === "image" ? (
          <img src={data.filePath} alt={data.title} className="h-full w-full object-cover" />
        ) : fileType === "pdf" ? (
          <div className="flex flex-col items-center">
            <img src="/assets/pdf-icon.png" alt="PDF" className="h-16 mb-2" />
            <FileText size={32} />
          </div>
        ) : (
          <p className="text-gray-500">Preview not available</p>
        )}
      </div>

      <h2 className="text-xl font-semibold">{data.title}</h2>
      {data.description && <p className="text-gray-600">{data.description}</p>}
      <p className="text-sm text-gray-500">Uploaded by: {data.uploadedBy}</p>
      <p className="text-sm text-gray-400">Date: {data.createdAt}</p>

      <div className="flex items-center justify-between mt-2">
        <a
          href={data.filePath}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          View / Download
        </a>

        {data.sendEmail && (
          <div className="flex items-center gap-1 text-sm text-green-600">
            <Mail size={16} />
            Emailed
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingMaterialCard;
