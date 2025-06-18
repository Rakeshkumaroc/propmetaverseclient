import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;
import profilePlaceHolder from "../../../assets/image/prifilePlaceHolder.jpg";
import axios from "axios";
import { FiCheckCircle, FiEye, FiEyeOff } from "react-icons/fi";
import LocationDropdowns from "../global/LocationDropdowns";
import countries from "../../../utils/country.json";
const SellerProfileFrom = () => {
  // profile state variable start

  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    number: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    email: "",
    isGoogleUser: false,
    phonecode: "",
  });

  // profile state variable start End

  //password start

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({});

  // Validate inputs
  const validate = (name, value) => {
    const newErrors = { ...errors };

    if (name === "newPassword") {
      if (!value) newErrors.newPassword = "New password is required.";
      else if (value.length < 8)
        newErrors.newPassword = "Must be at least 8 characters.";
      else delete newErrors.newPassword;
    }

    if (name === "confirmPassword") {
      if (value !== form.newPassword)
        newErrors.confirmPassword = "Passwords do not match.";
      else delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  // Handle form submission password
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation check
    if (
      Object.keys(errors).length > 0 ||
      form.newPassword !== form.confirmPassword
    ) {
      Swal.fire("Error", "Please fix the form errors", "error");
      return;
    }

    try {
      const sellerId = localStorage.getItem("sellerId");
      const token = localStorage.getItem("token");

      if (sellerId && token) {
        const res = await fetch(`${baseUrl}/change-password/${sellerId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          Swal.fire("Success", data.message, "success");
          setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
          setErrors({});
        } else {
          const errorData = await res.json();
          Swal.fire(
            "Error",
            errorData.error || "Failed to update password",
            "error"
          );
        }
      }
    } catch (err) {
      console.error("error", err);
      Swal.fire("Error", "Server error. Try again.", "error");
    }
  };
  //password end

  //image start
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Upload logic here (Cloudinary or server API)
      setProfilePic(file);
    }
  };

  //image end

  //profile  start
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
          setFormData(result.data.sellerData);
          // setInitialSellerType(result.data.sellerData.sellerType || "");
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateProfileHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const UpdateFormData = new FormData();
    UpdateFormData.append("fullName", formData.fullName);
    UpdateFormData.append("bio", formData.bio);
    UpdateFormData.append("phonecode", formData.phonecode);
    UpdateFormData.append("pincode", formData.pincode);
    UpdateFormData.append("state", formData.state);
    UpdateFormData.append("number", formData.number);
    UpdateFormData.append("country", formData.country);
    UpdateFormData.append("city", formData.city);

   if (profilePic) {
  UpdateFormData.append("profilePic", profilePic);  
}

    const sellerId = localStorage.getItem("sellerId");
    const token = localStorage.getItem("token");
    if (sellerId) {
      axios
        .put(`${baseUrl}/update-seller/${sellerId}`, UpdateFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
  // profile  end
  console.log("fle", formData);
  return (
    <div className="w-full rounded-lg bg-white">
      <div className="p-8 mt-10">
        {/* User Info Section */}
        <div className="flex items-center justify-between mb-8 px-4">
          {/* Profile Image */}
          <img
            src={formData?.profilePic || profilePlaceHolder}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
          />

          {/* Status Section */}
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold leading-[26px]">
              Status:
            </span>
            <span
              className={`text-sm font-medium px-3 py-0.5 rounded-lg capitalize ${
                formData?.approveStatus === "approved"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {formData?.approveStatus}
            </span>
          </div>
        </div>

        {/* Form Start */}
        <form onSubmit={updateProfileHandler}>
          <div className="space-y-5">
            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                onChange={profileInputHandler}
                value={formData?.fullName || ""}
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
                  value={formData?.email || ""}
                  disabled
                  placeholder="Your Email"
                  className="w-full border px-2 rounded-lg h-14 border-gray-300 text-sm py-3 pr-24"
                />
                {formData.isEmailVerify && (
                  <FiCheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 text-xl" />
                )}
              </div>
            </div>

            {/* Number */}
            <div className="space-y-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Number
              </label>
              <div className="relative flex gap-2">
                {/* Country Code Selector */}
                <select
                  name="phonecode"
                  value={formData.phonecode}
                  onChange={profileInputHandler}
                  className="w-[30%] px-3 py-2 rounded-lg border border-gray-300 text-sm"
                  disabled={formData.isNumberVerify} // Optional: disable if verified
                >
                  <option value="" disabled>
                    {formData.phonecode ? formData.phonecode : "country code"}
                  </option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.phonecode}>
                      +{country.phonecode} ({country.sortname})
                    </option>
                  ))}
                </select>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  name="number"
                  value={formData.number || ""}
                  onChange={profileInputHandler}
                  className="w-[70%] px-3 py-2 rounded-lg border border-gray-300 text-sm pr-10"
                  placeholder="Enter your number"
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]*"
                  disabled={formData.isNumberVerify}
                />

                {/* Verified Tick Icon */}
                {formData.isNumberVerify && (
                  <FiCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 text-xl" />
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
                value={formData?.bio || ""}
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
                {formData?.approvedAt
                  ? new Date(formData.approvedAt).toLocaleDateString()
                  : "Not approved yet"}
              </p>
            </div>

            <LocationDropdowns formData={formData} setFormData={setFormData} />
            <div className="space-y-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Pincode
              </label>
              <input
                type="tel"
                name="pincode"
                value={formData.pincode || ""}
                onChange={profileInputHandler}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                placeholder="Enter pincode"
                required
                minLength={6}
                maxLength={6}
                pattern="[0-9]*"
              />
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

      {formData && !formData.isGoogleUser && (
        <div className="md:p-8 p-1 mt-1 ">
          <form onSubmit={handleSubmit} className="p-8 mt-10">
            <p className="text-center text-lg font-semibold mb-5">
              Change Password
            </p>
            <div className="space-y-5">
              {[
                { label: "Old Password", name: "oldPassword" },
                { label: "New Password", name: "newPassword" },
                { label: "Confirm New Password", name: "confirmPassword" },
              ].map(({ label, name }) => (
                <div key={name} className="flex flex-col gap-2">
                  <label htmlFor={name} className="text-sm font-medium">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword[name] ? "text" : "password"}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={label}
                      className="border px-3 py-3 rounded-lg text-sm w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(name)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword[name] ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors[name] && (
                    <p className="text-red-500 text-sm">{errors[name]}</p>
                  )}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 mt-6 bg-black text-white px-5 py-3 rounded-lg hover:scale-105 transition"
            >
              Update Password <GoArrowUpRight />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SellerProfileFrom;
