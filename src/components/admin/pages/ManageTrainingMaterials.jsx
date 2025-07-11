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
  const [fileSizeError, setFileSizeError] = useState(""); // New state for file size error

  // File size limit for images (200 KB in bytes)
  const imageSizeLimit = 200 * 1024; // 200 KB

  // Format file size for display
  const formatFileSize = (bytes) => {
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  // Handle file selection with size validation for images
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileSizeError(""); // Clear previous error
    if (selectedFile) {
      if (selectedFile.size > imageSizeLimit) {
        toast.error(
          `Image size exceeds limit of ${formatFileSize(imageSizeLimit)}.`,
          { position: "top-left" }
        );
        setFileSizeError(
          `Selected file is too large. Maximum size allowed is ${formatFileSize(imageSizeLimit)}.`
        );
        setFile(null);
        e.target.value = ""; // Clear the input
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
        position: "top-left",
      });
      return;
    }

    if (fileType === "image" && !file) {
      toast.error("Please select an image file.", { position: "top-left" });
      return;
    }

    if ((fileType === "video" || fileType === "pdf") && !newMaterial.link) {
      toast.error("Please provide a valid URL for the video or PDF.", {
        position: "top-left",
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
        position: "top-left",
      });
      setNewMaterial({ title: "", description: "", sendEmail: "false", link: "" });
      setFile(null);
      setFileType("");
      setFileSizeError(""); // Clear error on successful submission
      setIsFormOpen(false);
    } catch (error) {
      console.error(
        "Error creating training material:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.error || error.message, {
        position: "top-left",
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
    <>
      <div className="bg-gray-100 overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full">
        <div className="flex items-center flex-wrap gap-4 justify-between">
          <div className="space-y-1">
            <p className="text-[30px] font-semibold leading-[45px]">
              Training Materials
            </p>
            <p className="text-sm leading-[25.9px]">
              Manage and share training materials with sub-brokers
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex md:w-fit w-full items-center gap-1 bg-white px-2 md:px-5 rounded-lg py-4 border-[1px] border-gray-300">
              <CiSearch className="text-xl" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search training materials"
                className="w-40 outline-none text-sm"
              />
            </div>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              <FaPlus /> New Material
            </button>
          </div>
        </div>

        {/* Create Training Material Form */}
        {isFormOpen && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Create New Training Material
            </h3>
            <form onSubmit={handleCreateMaterial} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newMaterial.title}
                  onChange={(e) =>
                    setNewMaterial({ ...newMaterial, title: e.target.value })
                  }
                  placeholder="Enter material title"
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
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
                  className="w-full px-3 py-2 border rounded-lg outline-none h-32"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  File Type
                </label>
                <select
                  value={fileType}
                  onChange={(e) => {
                    setFileType(e.target.value);
                    setFile(null); // Reset file
                    setNewMaterial({ ...newMaterial, link: "" }); // Reset link
                    setFileSizeError(""); // Clear file size error
                  }}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                  required
                >
                  <option value="">Select file type</option>
                  <option value="image">Image ({formatFileSize(imageSizeLimit)} limit)</option>
                  <option value="video">Video (URL)</option>
                  <option value="pdf">PDF (URL)</option>
                </select>
              </div>
              {fileType === "image" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Image File (Max Size: {formatFileSize(imageSizeLimit)})
                  </label>
                  <input
                    type="file"
                    accept={getAcceptAttribute()}
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                  {fileSizeError && (
                    <p className="text-red-500 text-sm mt-1">{fileSizeError}</p>
                  )}
                </div>
              )}
              {(fileType === "video" || fileType === "pdf") && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {fileType === "video" ? "Video URL" : "PDF URL"}
                  </label>
                  <input
                    type="url"
                    value={newMaterial.link}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, link: e.target.value })
                    }
                    placeholder={`Enter ${fileType} URL (e.g., YouTube, Google Drive)`}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
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
                  className="h-4 w-4"
                />
                <label className="text-sm">Send as email to sub-brokers</label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className={`bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition ${
                    uploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {uploading ? "Uploading..." : "Upload Material"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <TrainingMaterialsTable searchValue={search}  uploading={uploading}/>
      </div>
    </>
  );
};

export default ManageTrainingMaterials;