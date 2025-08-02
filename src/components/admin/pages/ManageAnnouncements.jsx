import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import AnnouncementTable from "../announcements/AnnouncementTable";

const baseUrl = import.meta.env.VITE_APP_URL;

const ManageAnnouncements = () => {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    sendEmail: false,
  });

  // Handle form submission
  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/add-announcements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnnouncement),
      });

      if (response.ok) {
        setNewAnnouncement({ title: "", content: "", sendEmail: false });
        setIsFormOpen(false);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Announcement created successfully!",
          confirmButtonColor: "#000",
          customClass: {
            confirmButton:
              "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
          },
          buttonsStyling: false,
        });
      } else {
        throw new Error("Failed to create announcement");
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to create announcement. Please try again.",
        confirmButtonColor: "#000",
        customClass: {
          confirmButton:
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-y-auto text-gray-800 sm:mx-8 px-4 md:px-6 2xl:mx-16 mt-6 md:mt-36 w-full">
      <div className="flex items-center flex-wrap gap-6 justify-between py-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Announcements
          </h2>
          <p className="text-base text-gray-600">
            Manage and send announcements to sub-brokers
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex w-full md:w-fit items-center gap-2 bg-gray-50 px-4 py-3 rounded-lg border-[1px] border-gray-300 shadow-sm hover:shadow-md transition">
            <CiSearch className="text-2xl text-gray-700" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search announcements..."
              className="w-48 outline-none text-base text-gray-700 placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition text-base font-medium"
          >
            <FaPlus className="text-lg" />
            New Announcement
          </button>
        </div>
      </div>

      {/* Create Announcement Form */}
      {isFormOpen && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 z-[9999] relative">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Create New Announcement
          </h3>
          <form onSubmit={handleCreateAnnouncement} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-800">
                Title
              </label>
              <input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    title: e.target.value,
                  })
                }
                placeholder="Enter announcement title"
                className="border-[1px] border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-800">
                Content
              </label>
              <textarea
                value={newAnnouncement.content}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    content: e.target.value,
                  })
                }
                placeholder="Enter announcement content"
                className="border-[1px] border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none h-32"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newAnnouncement.sendEmail}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    sendEmail: e.target.checked,
                  })
                }
                className="w-5 h-5 text-purple-600 focus:ring-purple-500"
              />
              <label className="text-base text-gray-700">
                Send as email to sub-brokers
              </label>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                className="px-6 py-2.5 bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition text-base font-medium"
              >
                Send Announcement
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

      <AnnouncementTable searchValue={search} isFormOpen={isFormOpen} />
    </div>
  );
};

export default ManageAnnouncements;