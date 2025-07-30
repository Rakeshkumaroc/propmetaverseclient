import  { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import axios from "axios";
import Swal from "sweetalert2";

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

  // Set ratings from parent prop and reverse them for newest first
  useEffect(() => {
    if (propertyRatings && Array.isArray(propertyRatings)) {
      setRatings(propertyRatings.reverse());
    }
  }, [propertyRatings]);

  const handleSubmitRating = async (e) => {
    e.preventDefault();

    // Validate star rating
    if (newRating.star < 1 || newRating.star > 5) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a rating between 1-5 stars",
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });
      return;
    }

    try {
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
      // Send rating data to the backend API
      const response = await axios.post(
        `${baseUrl}/add-rating/${propertyId}`,
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
      // Add the new rating to the top of the list
      setRatings([addedRating, ...ratings]);
      setNewRating({ star: 0, ratingDescription: "" }); // Reset form
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Rating submitted successfully!",
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });
    } catch (err) {
      // Handle API errors and display messages
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to submit rating. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });
    } finally {
      getFunc(); // Call parent function to refresh data, if provided
    }
  };

  const handleDeleteRating = async (ratingId) => {
    try {
      const customerAuth = JSON.parse(localStorage.getItem("customerAuth"));
      // Ensure user is authenticated before attempting to delete
      if (!customerAuth?.token || !customerAuth?.user?._id) {
        throw new Error("Authentication token or user ID not found. Please log in again.");
      }

      // Send delete request to the backend API
      const response = await axios.delete(`${baseUrl}/delete-rating/${propertyId}/${ratingId}`, {
        headers: { Authorization: `Bearer ${customerAuth.token}` },
        data: { userId: customerAuth.user._id }, // Send userId in the request body for verification
      });

      // Optimistically update the state by filtering out the deleted rating
      setRatings((prevRatings) => prevRatings.filter((rating) => rating._id !== ratingId));
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Rating deleted successfully!",
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });

      await getFunc(); // Refetch ratings to ensure consistency with backend
    } catch (err) {
      console.error("Delete rating error:", err); // Log error for debugging
      // Display error using Swal
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to delete rating. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f",
      });
    }
  };

  // Render message if user is not authenticated
  if (!isAuthenticated) {
    return (
      // Responsive padding and margin-top for the unauthenticated message
      <div className="w-full mt-8 sm:mt-10 md:mt-12 lg:mt-16 2xl:mt-10 ">
        {/* Responsive font size for the title */}
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[40px] font-semibold mb-3 sm:mb-4 text-gray-800 text-start">
          Ratings & Reviews
        </h3>
        {/* Responsive font size for the message */}
        <p className="text-sm sm:text-base md:text-lg text-gray-700">
          Please log in to view or add ratings.
        </p>
      </div>
    );
  }

  return (
    // Main container for the rating system
    // Responsive padding and margin-top
    <div className="w-full mt-8 sm:mt-10 md:mt-12 lg:mt-16 2xl:mt-10 ">
      {/* Ratings & Reviews section title */}
      {/* Responsive font size and margin-bottom */}
      <h3 className="text-xl sm:text-2xl md:text-3xl 2xl:text-2xl font-semibold text-gray-800 mb-4 sm:mb-5 2xl:mb-4">
        Ratings & Reviews
      </h3>

      {/* Add Rating Form */}
      {/* Responsive padding and margin-bottom */}
      <div className="bg-logoBlue/10 p-4 sm:p-5 2xl:p-4 rounded-lg shadow-sm border border-gray-200 mb-6 sm:mb-8 2xl:mb-6">
        {/* Responsive font size for the form title */}
        <h4 className="font-semibold text-base sm:text-lg 2xl:text-base text-gray-800 mb-2 sm:mb-3">
          Add Your Rating, {username}
        </h4>
        <form onSubmit={handleSubmitRating}>
          <div className="flex items-center mb-3 sm:mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewRating({ ...newRating, star })}
                className="group focus:outline-none p-1 sm:p-1.5" // Responsive padding for star buttons
                aria-label={`Rate ${star} star`}
              >
                {star <= newRating.star ? (
                  <FaStar className="h-5 w-5 sm:h-6 sm:w-6 text-logoBlue bg-logoBlue/10 rounded group-hover:bg-logoBlue group-hover:text-white transition-all duration-300" />
                ) : (
                  <FaRegStar className="h-5 w-5 sm:h-6 sm:w-6 text-logoBlue bg-logoBlue/10 rounded group-hover:bg-logoBlue group-hover:text-white transition-all duration-300" />
                )}
              </button>
            ))}
            {/* Responsive font size for star count */}
            <span className="ml-2 text-sm sm:text-base text-gray-700">
              {newRating.star || "0"} / 5
            </span>
          </div>

          <textarea
            placeholder="Share your experience..."
            value={newRating.ratingDescription}
            onChange={(e) =>
              setNewRating({ ...newRating, ratingDescription: e.target.value })
            }
            // Responsive padding, font size, and height for textarea
            className="w-full p-2 sm:p-3 border border-gray-200 rounded-md text-sm sm:text-base text-gray-800 focus:ring-2 focus:ring-logoBlue focus:border-logoBlue transition-all duration-200 resize-y"
            rows="3"
            required
          />

          <button
            type="submit"
            // Responsive padding and font size for submit button
            className="mt-3 flex items-center gap-1 text-logoColor border border-logoColor py-2 px-3 rounded-md font-medium hover:bg-logoColor hover:text-white transition duration-200 text-sm sm:text-base"
          >
            Submit
            <GoArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" /> {/* Responsive icon size */}
          </button>
        </form>
      </div>

      {/* Display Ratings */}
      <div className="space-y-4 sm:space-y-5"> {/* Responsive vertical spacing */}
        {ratings.length === 0 ? (
          // Responsive font size for no ratings message
          <p className="text-gray-700 text-sm sm:text-base">
            No ratings yet. Be the first to review!
          </p>
        ) : (
          ratings.slice(0, showMore ? 3 : ratings.length).map((rating) => (
            <div key={rating._id} className="border-b border-gray-200 pb-4 sm:pb-5"> {/* Responsive padding-bottom */}
              <div className="flex items-center mb-1 sm:mb-2"> {/* Responsive margin-bottom */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="group p-0.5"> {/* Small padding for individual stars */}
                      {i < rating.star ? (
                        <FaStar className="h-5 w-5 sm:h-6 sm:w-6 text-logoBlue bg-logoBlue/10 rounded group-hover:bg-logoBlue group-hover:text-white transition-all duration-300" />
                      ) : (
                        <FaRegStar className="h-5 w-5 sm:h-6 sm:w-6 text-logoBlue bg-logoBlue/10 rounded group-hover:bg-logoBlue group-hover:text-white transition-all duration-300" />
                      )}
                    </div>
                  ))}
                </div>
                {/* Responsive font size for user name */}
                <span className="ml-2 text-sm sm:text-base text-gray-700">
                  by {rating.user || "Anonymous"}
                </span>
              </div>
              {/* Responsive font size for rating description */}
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                {rating.ratingDescription}
              </p>
              {/* Delete button (only for the user who posted the rating) */}
              {rating.userId === userId && (
                <button
                  onClick={() => handleDeleteRating(rating._id)}
                  // Responsive padding and font size for delete button
                  className="mt-2 text-red-500 border border-red-500 py-1 px-2 rounded-md text-xs sm:text-sm hover:bg-red-500 hover:text-white transition duration-200"
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
          // Responsive margin-top and font size
          className="mt-3 sm:mt-4 cursor-pointer text-logoColor font-medium hover:underline transition duration-200 text-sm sm:text-base"
        >
          {showMore ? "See More" : "See Less"}
        </button>
      )}
    </div>
  );
};

export default RatingSystem;
