import React, { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;
import profilePlaceHolder from "../../../assets/image/prifilePlaceHolder.jpg";
import axios from "axios";

//hhhhhhhhhhhhhhhh
const SellerProfileFrom = () => {
  // const [data, setData] = useState(null);
  const [sellerType, setSellerType] = useState("");
  const [verifyBtn, setVerifyBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwordValue, setPasswordValue] = useState({
    oldpassword: "",
    newpassword: "",
    password: "",
  });
  const [data, setData] = useState({
    fullName: "",
    number: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Upload logic here (Cloudinary or server API)
      console.log("Selected File:", file);
    }
  };

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

  // get data By Id
  const fetchSellerDataById = () => {
    const sellerId = localStorage.getItem("sellerId");
    const token = localStorage.getItem("token");
    if (sellerId) {
      axios
        .get(`${baseUrl}/get-seller-data/${sellerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          // console.log(result.data.sellerData);
          setData(result.data.sellerData);
          if (result.data.sellerData.number) {
            setVerifyBtn(true);
          } else {
            setVerifyBtn(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("seller id is not here ");
    }
  };

  useEffect(() => {
    fetchSellerDataById();
  }, []);
  // console.log("data", data);

  const profileInputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate the input dynamically
    validateInput(name, value);
  };

  const updateProfileHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    const sellerUpdateData = {
      fullName: data.fullName,
      sellerType: sellerType,
      bio: data.bio,
      number: data.number,
    };
    console.log("userdata", sellerType);
    const sellerId = localStorage.getItem("sellerId");
    const token = localStorage.getItem("token");
    if (sellerId) {
      axios
        .put(`${baseUrl}/update-seller/${sellerId}`, sellerUpdateData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          console.log(result);
          setLoading(false);
          Swal.fire({
            title: "Success!",
            text: "Profile updated successfully!",
            confirmButtonColor: "#000",
            icon: "success",
            customClass: {
              confirmButton:
                "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
            },
            buttonsStyling: false,
          });
          // console.log(result.data.sellerData);
          // setData(result.data.sellerData);
          fetchSellerDataById();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      console.log("seller id is not here ");
    }
  };

  // Fetch user data on component mount
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const user = JSON.parse(localStorage.getItem("user"));
  //       if (!user || !user._id) {
  //         alert("User not found in localStorage.");
  //         return;
  //       }

  //       const response = await fetch(`${baseUrl}/single-user/${user._id}`);
  //       if (response.ok) {
  //         const result = await response.json();
  //         setData(result);
  //       } else {
  //         alert("Failed to fetch user data.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       alert("An error occurred. Please try again.");
  //     }
  //   };

  //   fetchUserData();
  // }, [passwordValue]);

  return (
    <div className="w-full rounded-lg bg-white">
      <div className="p-8 mt-10">
        {/* User Info Section */}
        <div className="flex items-center justify-between mb-8 px-4">
          {/* Profile Image */}
          <img
            src={data?.profilePic || profilePlaceHolder}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
          />

          {/* Status Section */}
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold leading-[26px]">
              Status:
            </span>
            <span
              className={`text-sm font-medium px-3 py-0.5 rounded-full ${
                data?.approveStatus === "active"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {data?.approveStatus === "active" ? "Active" : "Pending"}
            </span>
          </div>
        </div>

        {/* Form Start */}
        <form onSubmit={updateProfileHandler}>
          <div className="space-y-5">
            {/* User Type */}

            {data?.sellerType ? (
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold leading-[26px]">
                  Seller Type
                </span>
                <span
                  className={`text-sm font-medium px-3 py-0.5 rounded-full ${
                    data?.sellerType === "subBroker"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {data?.sellerType}
                </span>
              </div>
            ) : (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Choose Seller Type <span className="text-gray-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={sellerType === "subBroker"}
                      onChange={() =>
                        setSellerType(
                          sellerType === "subBroker" ? "" : "subBroker"
                        )
                      }
                      className="mr-2 h-4 w-4 accent-green-600"
                    />
                    Sub Broker
                  </label>
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={sellerType === "individualSeller"}
                      onChange={() =>
                        setSellerType(
                          sellerType === "individualSeller"
                            ? ""
                            : "individualSeller"
                        )
                      }
                      className="mr-2 h-4 w-4 accent-green-600"
                    />
                    Individual Seller
                  </label>
                </div>
              </div>
            )}

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                onChange={profileInputHandler}
                value={data?.fullName || ""}
                // disabled
                placeholder="Your Name"
                className="border px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  value={data?.email || ""}
                  disabled
                  placeholder="Your Email"
                  className="w-full border px-2 rounded-lg h-14 border-gray-300 text-sm py-3 pr-24"
                />
                <button
                  type="button"
                  onClick={() => handleVerify("email")}
                  className="absolute top-1/2 right-3 -translate-y-1/2 bg-green-600 text-white text-sm px-4 py-1 rounded-md hover:bg-green-700 transition"
                >
                  Verify
                </button>
              </div>
            </div>

            {/* Number */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="number"
                  value={data?.number || ""}
                  onChange={profileInputHandler}
                  disabled={verifyBtn}
                  placeholder="Your Number"
                  className="w-full border px-2 rounded-lg h-14 border-gray-300 text-sm py-3 pr-24"
                />
                {verifyBtn && (
                  <button
                    type="button"
                    // onClick={() => handleVerify("number")}

                    className="absolute top-1/2 right-3 -translate-y-1/2 bg-green-600 text-white text-sm px-4 py-1 rounded-md hover:bg-green-700 transition"
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Bio
              </label>
              <input
                type="text"
                name="bio"
                onChange={profileInputHandler}
                value={data?.bio || ""}
                // disabled
                placeholder="Your Bio"
                className="border px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
              />
            </div>

            {/* Profile Image Upload */}
            <div className="mt-10 flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Update Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                disabled
                onChange={handleProfileImageChange}
                className="border px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
              />
            </div>

            {/* Approved At Date */}
            <div className="mt-6">
              <label className="text-[14px] font-semibold leading-[26px] block mb-1">
                Approved At
              </label>
              <p className="text-sm text-gray-600">
                {data?.approvedAt
                  ? new Date(data.approvedAt).toLocaleDateString()
                  : "Not approved yet"}
              </p>
            </div>
          </div>
          <div className="flex ">
            <button
              type="submit"
              className="text-[15px] px-2 md:px-5 py-4 flex mt-7 items-center bg-black rounded-lg text-white"
            >
              {loading ? (
                <div className="flex justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-b-2 rounded-full animate-spin mr-2"></div>
                </div>
              ) : (
                <span className="flex items-center gap-1">
                  Update Profile <GoArrowUpRight className="text-xl" />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>

      {data && !data.isGoogleUser && (
        <div className="p-8 mt-10">
          <form onSubmit={handleSubmit}>
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex ">
              <button
                type="submit"
                className="text-[15px] px-2 md:px-5 py-4 flex mt-7 items-center bg-black rounded-lg text-white"
              >
                Update Password
                <GoArrowUpRight className="text-xl" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SellerProfileFrom;
