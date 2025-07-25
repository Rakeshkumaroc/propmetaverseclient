import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import TrainingMaterialsTable from "../training/TrainingMaterialsTable";

const baseUrl = import.meta.env.VITE_APP_URL;

const ManageTrainingMaterials = () => {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    description: "",
    sendEmail: "false",
    link: "",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileType, setFileType] = useState("");
  const [fileSizeError, setFileSizeError] = useState("");

  // File size limit for images (200 KB in bytes)
  const imageSizeLimit = 200 * 1024; // 200 KB

  // Format file size for display
  const formatFileSize = (bytes) => {
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  // Handle file selection with size validation for images
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileSizeError("");
    if (selectedFile) {
      if (selectedFile.size > imageSizeLimit) {
        toast.error(
          `Image size exceeds limit of ${formatFileSize(imageSizeLimit)}.`,
          { position: "top-right", autoClose: 3000 }
        );
        setFileSizeError(
          `Selected file is too large. Maximum size allowed is ${formatFileSize(imageSizeLimit)}.`
        );
        setFile(null);
        e.target.value = "";
        return;
      }
      setFile(selectedFile);
    }
  };

  // Handle form submission
  const handleCreateMaterial = async (e) => {
    e.preventDefault();

    if (!newMaterial.title || !fileType) {
      toast.error("Please provide a title and select a file type.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (fileType === "image" && !file) {
      toast.error("Please select an image file.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if ((fileType === "video" || fileType === "pdf") && !newMaterial.link) {
      toast.error("Please provide a valid URL for the video or PDF.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", newMaterial.title);
    formData.append("description", newMaterial.description);
    formData.append("sendEmail", newMaterial.sendEmail);
    formData.append("fileType", fileType);
    if (fileType === "image") {
      formData.append("file", file);
    } else {
      formData.append("link", newMaterial.link);
    }

    setUploading(true);
    try {
      await axios.post(`${baseUrl}/add-training-materials`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Training material created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setNewMaterial({ title: "", description: "", sendEmail: "false", link: "" });
      setFile(null);
      setFileType("");
      setFileSizeError("");
      setIsFormOpen(false);
    } catch (error) {
      console.error(
        "Error creating training material:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.error || error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setUploading(false);
    }
  };

  // Define accepted file types for images
  const getAcceptAttribute = () => {
    return fileType === "image" ? ".jpg,.png" : "";
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-y-auto text-gray-800 sm:mx-8 px-4 md:px-6 2xl:mx-16 mt-6 md:mt-36 w-full">
      <div className="flex items-center flex-wrap gap-6 justify-between py-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Training Materials
          </h1>
          <p className="text-base text-gray-600">
            Manage and share training materials with sub-brokers
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex w-full md:w-fit items-center gap-2 bg-gray-50 px-4 py-3 rounded-lg border-[1px] border-gray-300 shadow-sm hover:shadow-md transition">
            <CiSearch className="text-2xl text-gray-700" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search training materials..."
              className="w-48 outline-none text-base text-gray-700 placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition text-base font-medium"
          >
            <FaPlus className="text-lg" />
            New Material
          </button>
        </div>
      </div>

      {/* Create Training Material Form */}
      {isFormOpen && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md z-[9999] relative">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
            Create New Training Material
          </h3>
          <form onSubmit={handleCreateMaterial} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-800">Title</label>
              <input
                type="text"
                value={newMaterial.title}
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, title: e.target.value })
                }
                placeholder="Enter material title"
                className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-800">
                Description
              </label>
              <textarea
                value={newMaterial.description}
                onChange={(e) =>
                  setNewMaterial({
                    ...newMaterial,
                    description: e.target.value,
                  })
                }
                placeholder="Enter material description"
                className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition h-32"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-800">
                File Type
              </label>
              <select
                value={fileType}
                onChange={(e) => {
                  setFileType(e.target.value);
                  setFile(null);
                  setNewMaterial({ ...newMaterial, link: "" });
                  setFileSizeError("");
                }}
                className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
                required
              >
                <option value="" className="text-gray-600">
                  Select file type
                </option>
                <option value="image">
                  Image ({formatFileSize(imageSizeLimit)} limit)
                </option>
                <option value="video">Video (URL)</option>
                <option value="pdf">PDF (URL)</option>
              </select>
            </div>
            {fileType === "image" && (
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium text-gray-800">
                  Image File (Max Size: {formatFileSize(imageSizeLimit)})
                </label>
                <input
                  type="file"
                  accept={getAcceptAttribute()}
                  onChange={handleFileChange}
                  className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 transition"
                  required
                />
                {fileSizeError && (
                  <p className="text-red-600 text-base mt-1">{fileSizeError}</p>
                )}
              </div>
            )}
            {(fileType === "video" || fileType === "pdf") && (
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium text-gray-800">
                  {fileType === "video" ? "Video URL" : "PDF URL"}
                </label>
                <input
                  type="url"
                  value={newMaterial.link}
                  onChange={(e) =>
                    setNewMaterial({ ...newMaterial, link: e.target.value })
                  }
                  placeholder={`Enter ${fileType} URL (e.g., YouTube, Google Drive)`}
                  className="w-full p-3 border-[1px] border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition"
                  required
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newMaterial.sendEmail === "true"}
                onChange={(e) =>
                  setNewMaterial({
                    ...newMaterial,
                    sendEmail: String(e.target.checked),
                  })
                }
                className="w-5 h-5 text-purple-600 focus:ring-purple-500"
              />
              <label className="text-base text-gray-800">
                Send as email to sub-brokers
              </label>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                disabled={uploading}
                className={`px-6 py-2.5 bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition text-base font-medium ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {uploading ? "Uploading..." : "Upload Material"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-2.5 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition text-base font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <TrainingMaterialsTable searchValue={search} uploading={uploading} />
    </div>
  );
};

export default ManageTrainingMaterials;