import React from "react";

const trainingMaterials = [
  {
    title: "React Tu",
    description: "A complete guide to React basics.",
    fileName: "react-intro.mp4",
    filePath: "/assets/react-intro.mp4",
    sendEmail: true,
    uploadedBy: "John Doe",
    createdAt: "5/14/2025, 10:00:00 AM",
  },
  {
    title: "Company Brochure",
    description: "Our official brochure.",
    fileName: "brochure.pdf",
    filePath: "/assets/brochure.pdf",
    sendEmail: false,
    uploadedBy: "Jane Smith",
    createdAt: "5/10/2025, 3:30:00 PM",
  },
  {
    title: "Office Layout",
    description: "Layout of the office area.",
    fileName: "layout.jpg",
    filePath: "/assets/layout.jpg",
    sendEmail: true,
    uploadedBy: "Mike Johnson",
    createdAt: "5/12/2025, 1:15:00 PM",
  },
];

const getFileType = (fileName) => {
  const ext = fileName.split(".").pop().toLowerCase();
  if (["mp4", "webm", "ogg"].includes(ext)) return "video";
  if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  return "other";
};

const TrainingMaterialCard = ({ material }) => {
  const type = getFileType(material.fileName);

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-6 w-full">
      <h2 className="text-xl font-semibold mb-2">{material.title}</h2>
      <p className="text-gray-700 mb-2">{material.description}</p>

      <div className="mb-4">
        {type === "video" && (
          <video controls className="w-full rounded">
            <source src={material.filePath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {type === "image" && (
          <img
            src={material.filePath}
            alt={material.title}
            className="w-full h-auto rounded"
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

      <div className="flex justify-between items-center mt-2">
        <div className="text-sm text-gray-500">
          Uploaded by: <strong>{material.uploadedBy}</strong>
          <br />
          <span>{material.createdAt}</span>
        </div>
        <a
          href={material.filePath}
          download={material.fileName}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Download
        </a>
      </div>
    </div>
  );
};

const TrainingAndResources = () => {
  return (
    <div className="bg-gray-100 overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 lg:w-full">
      {trainingMaterials.map((material, index) => (
        <TrainingMaterialCard key={index} material={material} />
      ))}
    </div>
  );
};

export default TrainingAndResources


