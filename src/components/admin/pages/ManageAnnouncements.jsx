// components/ManageAnnouncements.js
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import AnnouncementTable from "../announcements/AnnouncementTable";
import { FaPlus } from "react-icons/fa";

const ManageAnnouncements = () => {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    sendEmail: false,
  });
  const baseUrl = import.meta.env.VITE_APP_URL;

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
        alert("Announcement created successfully!");
      } else {
        throw new Error("Failed to create announcement");
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Failed to create announcement. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full">
      <div className="flex items-center flex-wrap gap-4 justify-between">
        <div className="space-y-1">
          <p className="text-[30px] font-semibold leading-[45px]">
            Announcements
          </p>
          <p className="text-sm leading-[25.9px]">
            Manage and send announcements to sub-brokers
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex md:w-fit w-full items-center gap-1 bg-white px-2 md:px-5 rounded-lg py-4 border-[1px] border-gray-300">
            <CiSearch className="text-xl" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search announcements"
              className="w-40 outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <FaPlus /> New Announcement
          </button>
        </div>
      </div>

      {/* Create Announcement Form */}
      {isFormOpen && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Create New Announcement</h3>
          <form onSubmit={handleCreateAnnouncement} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
                }
                placeholder="Enter announcement title"
                className="w-full px-3 py-2 border rounded-lg outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                value={newAnnouncement.content}
                onChange={(e) =>
                  setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
                }
                placeholder="Enter announcement content"
                className="w-full px-3 py-2 border rounded-lg outline-none h-32"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newAnnouncement.sendEmail}
                onChange={(e) =>
                  setNewAnnouncement({ ...newAnnouncement, sendEmail: e.target.checked })
                }
                className="h-4 w-4"
              />
              <label className="text-sm">Send as email to sub-brokers</label>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Send Announcement
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

      <AnnouncementTable searchValue={search} />
    </div>
  );
};

export default ManageAnnouncements;