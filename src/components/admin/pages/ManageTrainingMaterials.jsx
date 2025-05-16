// components/ManageTrainingMaterials.js
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import TrainingMaterialsTable from "../training/TrainingMaterialsTable";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_APP_URL;

const ManageTrainingMaterials = () => {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    description: "",
    sendEmail: "false",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle form submission
  const handleCreateMaterial = async (e) => {
    e.preventDefault();
    // const adminAuth = JSON.parse(localStorage.getItem("adminAuth"));
    // if (!adminAuth || !adminAuth.token) {
    //   toast.error("Please log in as admin.", { position: "top-left" });
    //   return;
    // }

    if (!file || !newMaterial.title) {
      toast.error("Please provide a title and select a file.", {
        position: "top-left",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", newMaterial.title);
    formData.append("description", newMaterial.description);
    // formData.append("sendEmail", newMaterial.sendEmail);

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
      setNewMaterial({ title: "", description: "", sendEmail: false });
      setFile(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error(
        "Error creating training material:",
        error.response?.data || error.message
      );
      toast.error("Failed to create training material.", {
        position: "top-left",
      });
    } finally {
      setUploading(false);
    }
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
                  File (Video, PDF, Webinar)
                </label>
                <input
                  type="file"
                  accept=".mp4,.pdf,.webm,.jpg ,.png "
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newMaterial.sendEmail === "true"}
                  onChange={(e) =>
                    setNewMaterial({
                      ...newMaterial,
                      sendEmail: String(e.target.checked), // true -> "true", false -> "false"
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

        <TrainingMaterialsTable searchValue={search} />
      </div>
    </>
  );
};

export default ManageTrainingMaterials;
