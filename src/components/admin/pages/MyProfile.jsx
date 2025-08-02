import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_APP_URL;

const MyProfile = () => {
  const [data, setData] = useState(null);
  const [passwordValue, setPasswordValue] = useState({
    oldpassword: "",
    newpassword: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(name, value);
  };

  // Validate inputs
  const validateInput = (name, value) => {
    const newErrors = { ...errors };
    if (name === "oldpassword") {
      if (value.trim() === "") {
        newErrors.oldpassword = "Old password is required.";
      } else {
        delete newErrors.oldpassword;
      }
    }

    if (name === "newpassword") {
      if (value.trim() === "") {
        newErrors.newpassword = "New password is required.";
      } else if (value.trim().length < 8) {
        newErrors.newpassword = "New password must be at least 8 characters.";
      } else {
        delete newErrors.newpassword;
      }
    }

    if (name === "password") {
      if (value.trim() !== passwordValue.newpassword) {
        newErrors.password = "Passwords do not match.";
      } else if (value.trim().length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldpassword, newpassword, password } = passwordValue;
    if (Object.keys(errors).length > 0 || !oldpassword || !newpassword || !password) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix the errors before submitting.",
        confirmButtonColor: "#000",
        customClass: {
          confirmButton:
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
      });
      return;
    }

    if (!data || !data.password) {
      Swal.fire({
        icon: "error",
        title: "Data Error",
        text: "User data not loaded properly.",
        confirmButtonColor: "#000",
        customClass: {
          confirmButton:
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
      });
      return;
    }

    setIsLoading(true);
    if (oldpassword === data.password) {
      if (newpassword === password) {
        try {
          const response = await fetch(`${baseUrl}/edit-user/${data._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
          });

          if (response.ok) {
            setPasswordValue({
              oldpassword: "",
              newpassword: "",
              password: "",
            });
            setErrors({});
            Swal.fire({
              title: "Success!",
              text: "Password updated successfully!",
              icon: "success",
              confirmButtonColor: "#000",
              customClass: {
                confirmButton:
                  "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
              },
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to update password.",
              confirmButtonColor: "#000",
              customClass: {
                confirmButton:
                  "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
              },
            });
          }
        } catch (error) {
          console.error("Error updating password:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error updating password.",
            confirmButtonColor: "#000",
            customClass: {
              confirmButton:
                "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
            },
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Passwords do not match!",
          confirmButtonColor: "#000",
          customClass: {
            confirmButton:
              "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
          },
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong old password!",
        confirmButtonColor: "#000",
        customClass: {
          confirmButton:
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
      });
    }
    setIsLoading(false);
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) {
          Swal.fire({
            icon: "error",
            title: "User Error",
            text: "User not found in localStorage.",
            confirmButtonColor: "#000",
            customClass: {
              confirmButton:
                "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
            },
          });
          return;
        }

        const response = await fetch(`${baseUrl}/single-user/${user._id}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
          setIsDataLoaded(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Fetch Error",
            text: "Failed to fetch user data.",
            confirmButtonColor: "#000",
            customClass: {
              confirmButton:
                "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again.",
          confirmButtonColor: "#000",
          customClass: {
            confirmButton:
              "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
          },
        });
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl   px-4 sm:px-6 md:px-20 py-10 mt-10 md:mt-28 relative ">
      <div className="flex items-center justify-between py-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              My Profile
            </h2>
            <p className="text-base text-gray-600">
              These details are linked to your account and cannot be edited from this section. Contact support for changes.
            </p>
          </div>
        </div>
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-xl">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-logoBlue rounded-full animate-spin"></div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10 animate-fade-in">
        {/* Profile Details */}
        <div>
          <h4 className="text-2xl font-semibold text-gray-800 mb-4 text-center border-b border-gray-200 pb-2">
            Your Information
          </h4>
          
          {isDataLoaded && (
            <p className="text-sm text-gray-600 flex items-center gap-2 mb-6">
              <FaUser className="text-logoBlue" /> Your profile information has been loaded successfully.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Username", value: data?.username, placeholder: "Your Username", icon: <FaUser className="text-logoBlue group-hover:scale-105 transition duration-200" /> },
              { label: "Email", value: data?.email, placeholder: "Your Email", icon: <FaEnvelope className="text-logoBlue group-hover:scale-105 transition duration-200" /> },
              { label: "Phone Number", value: data?.number, placeholder: "Your Phone Number", icon: <FaPhone className="text-logoBlue group-hover:scale-105 transition duration-200" /> },
            ].map((field, index) => (
              <div key={index} className="flex flex-col gap-2 group">
                <label className="text-base font-medium text-gray-800 flex items-center gap-2">
                  {field.icon}
                  {field.label}
                </label>
                <div
                  className="w-full p-3 bg-gray-50 rounded-lg text-base text-gray-700 font-medium border border-gray-200 shadow-sm"
                  aria-label={`${field.label}: ${field.value || field.placeholder}`}
                >
                  {field.value || <span className="text-gray-400">{field.placeholder}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Password Change Section */}
        <div>
          <h4 className="text-2xl font-semibold text-gray-800 mb-4 text-center border-b border-gray-200 pb-2">
            Change Password
          </h4>
          <p className="text-sm text-gray-600 mb-6">
            Update your password to maintain account security. Ensure your new password is at least 8 characters long.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "oldpassword", label: "Old Password" },
              { name: "newpassword", label: "New Password" },
              { name: "password", label: "Confirm New Password" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-2 group">
                <label className="text-base font-medium text-gray-800 flex items-center gap-2">
                  <FaLock className="text-logoBlue group-hover:scale-105 transition duration-200" />
                  {field.label}
                </label>
                <input
                  type="password"
                  name={field.name}
                  value={passwordValue[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.label}
                  className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none transition duration-200"
                  aria-invalid={errors[field.name] ? "true" : "false"}
                  aria-describedby={`${field.name}-error`}
                />
                {errors[field.name] && (
                  <p id={`${field.name}-error`} className="text-red-600 text-sm mt-1 flex items-center gap-2">
                    <span>⚠</span> {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center gap-2 px-8 py-3 bg-logoBlue text-white rounded-full shadow-md hover:bg-logoBlue/90 transition duration-200 text-base font-medium ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Updating..." : "Update Password"}
            {!isLoading && <GoArrowUpRight className="text-white group-hover:scale-105 transition duration-200" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;