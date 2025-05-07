import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaBell, FaCheckCircle, FaTrash, FaEnvelopeOpen } from "react-icons/fa"; // Import icons

const baseUrl = import.meta.env.VITE_APP_URL;

const NotificationSection = ({
  notifications,
  setNotifications,
  token,
  fetchNotifications,
}) => {
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.post(
        `${baseUrl}/mark-notification-read`,
        { notificationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId ? { ...notif, read: true } : notif
        )
      );
      toast.success("Notification marked as read", { position: "top-left" });
    } catch (error) {
      toast.error("Failed to mark notification as read", {
        position: "top-left",
      });
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.post(
        `${baseUrl}/clear-notifications`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications([]);
      toast.success("All notifications cleared", { position: "top-left" });
    } catch (error) {
      toast.error("Failed to clear notifications", { position: "top-left" });
    }
  };

  return (
    <section
      className="bg-logoBlue/5 shadow  rounded p-6 mb-8  "
      aria-labelledby="notifications-heading"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <FaBell className="text-logoBlue text-2xl" aria-hidden="true" />
          <h2
            id="notifications-heading"
            className="text-2xl font-semibold "
          >
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
              {unreadCount}
            </span>
          )}
        </div>
        {notifications.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors duration-200"
            aria-label="Clear all notifications"
          >
            <FaTrash className="text-sm" />
            <span className="text-sm font-medium">Clear All</span>
          </button>
        )}
      </div>
      {notifications.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-gray-500">
          <FaEnvelopeOpen className="text-2xl mr-2" aria-hidden="true" />
          <p>No notifications available.</p>
        </div>
      ) : (
        <ul className="space-y-3" role="list" aria-label="Notification list">
          {notifications.map((notif) => (
            <li
              key={notif._id}
              className={`flex items-start p-4 rounded border transition-all duration-200 ${
                notif.read
                  ? "bg-gray-50 border-gray-200"
                  : "bg-blue-50 border-blue-200 hover:bg-blue-100"
              }`}
              role="listitem"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <FaBell
                    className={`text-sm ${
                      notif.read ? "text-gray-400" : "text-blue-500"
                    }`}
                    aria-hidden="true"
                  />
                  <p
                    className={`font-medium ${
                      notif.read ? "text-gray-600" : "text-gray-800"
                    }`}
                  >
                    {notif.message}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(notif.createdAt).toLocaleString()}
                </p>
              </div>
              {!notif.read && (
                <button
                  onClick={() => handleMarkAsRead(notif._id)}
                  className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                  aria-label={`Mark notification ${notif.message} as read`}
                >
                  <FaCheckCircle className="text-sm" />
                  <span className="text-sm font-medium">Mark as Read</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default NotificationSection;