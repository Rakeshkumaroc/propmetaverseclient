import React, { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;

const ProfileFrom = () => {
  const [data, setData] = useState(null);
  const [passwordValue, setPasswordValue] = useState({
    oldpassword: "",
    newpassword: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordValue((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate the input dynamically
    validateInput(name, value);
  };

  // Validate inputs
  const validateInput = (name, value) => {
    const newErrors = { ...errors };

    if (name === "oldpassword" && value.trim() === "") {
      newErrors.oldpassword = "Old password is required.";
    } else if (name === "newpassword") {
      if (value.trim() === "") {
        newErrors.newpassword = "New password is required.";
      } else if (value.trim().length < 8) {
        newErrors.newpassword = "New password must be at least 8 characters.";
      } else {
        delete newErrors.newpassword;
      }
    } else if (name === "password") {
      if (value.trim() !== passwordValue.newpassword) {
        newErrors.password = "Passwords do not match.";
      } else if (value.trim().length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      } else {
        delete newErrors.password;
      }
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldpassword, newpassword, password } = passwordValue;

    if (Object.keys(errors).length > 0) {
      alert("Please fix the errors before submitting.");
      return;
    }

    if (!data || !data.password) {
      alert("User data not loaded properly.");
      return;
    }

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
              confirmButtonColor: "#000",
              icon: "success",
              customClass: {
                confirmButton:
                  "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
              },
              buttonsStyling: false,
            });
          } else {
            console.log("Failed to update password. Please try again.");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to update password",
              customClass: {
                confirmButton:
                  "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
              },
            });
          }
        } catch (error) {
          console.error("Error updating password:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error updating password",
            customClass: {
              confirmButton:
                "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
            },
          });
        }
      }
    } else {
      console.error("Wrong password");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong password!",
        customClass: {
          confirmButton:
            "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
        },
      });
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) {
          alert("User not found in localStorage.");
          return;
        }

        const response = await fetch(`${baseUrl}/single-user/${user._id}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          alert("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred. Please try again.");
      }
    };

    fetchUserData();
  }, [passwordValue]);

  return (
    <div className="w-full rounded-lg bg-white">
      <div className="p-8 mt-10">
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="flex flex-col gap-2 ">
              <label
                htmlFor="name"
                className="text-[14px] font-semibold leading-[26px]"
              >
                Username
              </label>
              <input
                type="text"
                name="name"
                value={data ? data.username : ""}
                disabled={true}
                placeholder="Your Name"
                className=" border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label
                htmlFor="email"
                className="text-[14px] font-semibold leading-[26px]"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                value={data ? data.email : ""}
                disabled={true}
                placeholder="Your Email"
                className=" border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label
                htmlFor="number"
                className="text-[14px] font-semibold leading-[26px]"
              >
                Number
              </label>
              <input
                type="text"
                name="number"
                value={data ? data.number : ""}
                disabled={true}
                placeholder="Your Number"
                className=" border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
              />
            </div>
          </div>
          {/* Password inputs with validation */}
          <div className="mt-10">
            <p className="text-[17px] text-center font-semibold mb-5 leading-[25.5px]">
              Change password
            </p>
            <div className="space-y-5">
              {["oldpassword", "newpassword", "password"].map((field) => (
                <div key={field} className="flex flex-col gap-2">
                  <label
                    htmlFor={field}
                    className="text-[14px] font-semibold leading-[26px]"
                  >
                    {field === "password"
                      ? "Confirm New Password"
                      : field.replace(/password/, " Password")}
                  </label>
                  <input
                    type="password"
                    name={field}
                    value={passwordValue[field]}
                    onChange={handleInputChange}
                    placeholder={
                      field === "password"
                        ? "Confirm New Password"
                        : `${field.replace(/password/, " Password")}`
                    }
                    className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-[15px] px-2 md:px-5 py-4 flex mt-7 items-center bg-black rounded-lg text-white"
            >
              Update Profile
              <GoArrowUpRight className="text-xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileFrom;
