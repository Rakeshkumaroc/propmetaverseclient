import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_APP_URL;

const RatingSystem = ({ propertyRatings, propertyId, getFunc }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(""); // Store logged-in user's _id
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState({
    star: 0,
    ratingDescription: "",
  });
  const [showMore, setShowMore] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check customerAuth and get username and userId on mount
  useEffect(() => {
    const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
    if (
      customerAuth &&
      customerAuth.token &&
      customerAuth.user?.fullName &&
      customerAuth.user?._id
    ) {
      setIsAuthenticated(true);
      setUsername(customerAuth.user.fullName);
      setUserId(customerAuth.user._id);
    } else {
      setIsAuthenticated(false);
      setUsername("");
      setUserId("");
    }
  }, []);

  // Set ratings from parent prop
  useEffect(() => {
    if (propertyRatings && Array.isArray(propertyRatings)) {
      setRatings(propertyRatings.reverse());
    }
  }, [propertyRatings]);

  const handleSubmitRating = async (e) => {
    e.preventDefault();

    if (newRating.star < 1 || newRating.star > 5) {
      toast.error("Please select a rating between 1-5 stars", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    try {
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
      const response = await axios.post(
        `${baseUrl}/add-rating/` + propertyId,
        {
          user: customerAuth.user.fullName,
          star: newRating.star,
          userId: customerAuth.user._id,
          ratingDescription: newRating.ratingDescription,
        },
        {
          headers: { Authorization: `Bearer ${customerAuth.token}` },
        }
      );

      const addedRating = response.data;
      setRatings([...ratings, addedRating]);
      setNewRating({ star: 0, ratingDescription: "" });
      toast.success("Rating submitted successfully!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (err) {
      toast.error("Failed to submit rating. Please try again.", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      getFunc();
    }
  };

  const handleDeleteRating = async (ratingId) => {
    try {
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
      if (!customerAuth?.token || !customerAuth?.user?._id) {
        throw new Error("Authentication token or user ID not found. Please log in again.");
      }
  
      const response = await axios.delete(`${baseUrl}/delete-rating/${propertyId}/${ratingId}`, {
        headers: { Authorization: `Bearer ${customerAuth.token}` },
        data: { userId: customerAuth.user._id }, // Send userId in the request body
      });
  
      // Optimistically update the state
      setRatings((prevRatings) => prevRatings.filter((rating) => rating._id !== ratingId));
      toast.success("Rating deleted successfully!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
  
      // Refetch ratings to ensure consistency
      await getFunc();
    } catch (err) {
      console.error("Delete rating error:", err);
      toast.error(err.response?.data?.message || "Failed to delete rating. Please try again.", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full mt-10 px-4 md:px-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Ratings & Reviews
        </h3>
        <p className="text-gray-700 text-sm md:text-base">
          Please log in to view or add ratings.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mt-10 px-4 md:px-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Ratings & Reviews
      </h3>

      {/* Add Rating Form */}
      <div className="bg-logoBlue/10 p-4 rounded shadow-sm border border-gray-200 mb-6">
        <h4 className="font-semibold text-sm md:text-base text-gray-800 mb-2">
          Add Your Rating, {username}
        </h4>
        <form onSubmit={handleSubmitRating}>
          <div className="flex items-center mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewRating({ ...newRating, star })}
                className="group focus:outline-none"
              >
                {star <= newRating.star ? (
                  <FaStar className="h-6 w-6 text-logoBlue bg-logoBlue/10 rounded p-1 group-hover:bg-logoBlue group-hover:text-white transition-all duration-300" />
                ) : (
                  <FaRegStar className="h-6 w-6 text-logoBlue bg-logoBlue/10 rounded p-1 group-hover:bg-logoBlue group-hover:text-white transition-all duration-300" />
                )}
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-700">
              {newRating.star || "0"} / 5
            </span>
          </div>

          <textarea
            placeholder="Share your experience..."
            value={newRating.ratingDescription}
            onChange={(e) =>
              setNewRating({ ...newRating, ratingDescription: e.target.value })
            }
            className="w-full p-2 border border-gray-200 rounded text-sm md:text-base text-gray-800 focus:ring-2 focus:ring-logoBlue focus:border-logoBlue transition-all duration-200"
            rows="3"
            required
          />

          <button
            type="submit"
            className="mt-3 flex items-center gap-1 text-logoColor border border-logoColor py-2 px-3 rounded font-medium hover:bg-logoColor hover:text-white transition duration-200"
          >
            Submit
            <GoArrowUpRight className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* Display Ratings */}
      <div className="space-y-4">
        {ratings.length === 0 ? (
          <p className="text-gray-700 text-sm md:text-base">
            No ratings yet. Be the first to review!
          </p>
        ) : (
          ratings.slice(0, showMore ? 3 : ratings.length).map((rating) => (
            <div key={rating._id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="group">
                      {i < rating.star ? (
                        <FaStar className="h-6 w-6 text-logoBlue bg-logoBlue/10 rounded p-1 group-hover:bg-logoBlue group-hover:text-white transition-all duration-300" />
                      ) : (
                        <FaRegStar className="h-6 w-6 text-logoBlue bg-logoBlue/10 rounded p-1 group-hover:bg-logoBlue group-hover:text-white transition-all duration-300" />
                      )}
                    </div>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-700">
                  by {rating.user || "Anonymous"}
                </span>
              </div>
              <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                {rating.ratingDescription}
              </p>
              {rating.userId === userId && (
                <button
                  onClick={() => handleDeleteRating(rating._id)}
                  className="mt-2 text-red-500 border border-red-500 py-1 px-2 rounded text-sm hover:bg-red-500 hover:text-white transition duration-200"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* See More/Less Button */}
      {ratings.length > 3 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-3 cursor-pointer text-logoColor font-medium hover:underline transition duration-200"
        >
          {showMore ? "See More" : "See Less"}
        </button>
      )}
    </div>
  );
};

export default RatingSystem;
