import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";

const baseUrl = import.meta.env.VITE_APP_URL;

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [readMoreMap, setReadMoreMap] = useState({});

 useEffect(() => {
  const fetchAnnouncements = async () => {
    try {
      const createdAt = localStorage.getItem("createdAt");
      console.log('createdAt',createdAt);
      
      const response = await axios.get(
        `${baseUrl}/announcements/${createdAt}` // Matches new route
      );
      setAnnouncements(response.data);

      // Initialize readMore state for each announcement
      const initialMap = {};
      response.data.forEach((_, index) => {
        initialMap[index] = false;
      });
      setReadMoreMap(initialMap);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  fetchAnnouncements();
}, []);

  const toggleReadMore = (index) => {
    setReadMoreMap((prevMap) => ({
      ...prevMap,
      [index]: !prevMap[index],
    }));
  };

  return (
    <div className="bg-gray-100 overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 lg:w-full">
      <h1 className="text-2xl font-bold mb-6">Announcements</h1>

      {announcements.length === 0 ? (
        <p>No announcements found.</p>
      ) : (
        announcements.map((announcement, index) => (
          <div
            key={index}
            className="mt-6 bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title: {announcement.title}
              </h2>
              {announcement.sendEmail && (
                <div className="flex items-center text-blue-500">
                  <MdEmail className="text-lg" title="Email Sent" />
                  <span className="ml-1 text-sm font-medium hidden sm:inline">
                    Email Sent
                  </span>
                </div>
              )}
            </div>

            <p className="text-gray-700 mt-4 whitespace-pre-wrap">
              {readMoreMap[index]
                ? announcement.content
                : announcement.content.length > 150
                ? announcement.content.slice(0, 150) + "... "
                : announcement.content}
              {announcement.content.length > 150 && (
                <span
                  className="cursor-pointer underline text-blue-500"
                  onClick={() => toggleReadMore(index)}
                >
                  {readMoreMap[index] ? "Read Less" : "Read More"}
                </span>
              )}
            </p>

            <p className="text-sm text-gray-500 text-right mt-4">
              <b>Posted on:</b> {announcement.createdAt}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AnnouncementPage;
