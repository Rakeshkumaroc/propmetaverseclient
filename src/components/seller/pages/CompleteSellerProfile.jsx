import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiFile,
  FiLock,
  FiChevronRight,
  FiUpload,
  FiCheck,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import countries from "../../../utils/country.json";
import LocationDropdowns from "../global/LocationDropdowns";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_APP_URL;
export default function CompleteSellerProfile() {
  const [activeTab, setActiveTab] = useState("basic");
  const [completedSteps, setCompletedSteps] = useState([]);
  const navigate = useNavigate();
  //  basic form data state variable
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "", //ggggggggggggggggggggg ffffffff
    number: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    email: "",
    isGoogleUser: false,
    phonecode: "",
  });
  // const [initialSellerType, setInitialSellerType] = useState("");
  // Update the document form data state
  const [documentFormData, setDocumentFormData] = useState({
    aadhar: null,
    pan: null,
    // addressProof: null,
  });

  // console.log("startin form data ", formData);
  // const [sellerType, setSellerType] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [btnDisable, SetBtnDisable] = useState(false);
  const [btnDisableDoc, SetBtnDisableDoc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const tabs = [
    { id: "basic", label: "Basic Details", icon: <FiUser /> },
    { id: "document", label: "Documents", icon: <FiFile /> },
    { id: "verification", label: "Verification", icon: <FiMail /> },
    { id: "dashboard", label: "Dashboard", icon: <FiLock /> },
  ];

  const currentActiveIndex = tabs.findIndex((t) => t.id === activeTab);

  // const handleVerification = (type) => {
  //   alert(`${type} verification initiated!`);
  //   setCompletedSteps((prev) => [...new Set([...prev, "verification"])]);
  // };

  //basic details section start here
  // basic profile details handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          console.log(result.data.sellerData);
          setFormData(result.data.sellerData);
          // setInitialSellerType(result.data.sellerData.sellerType || "");
          // console.log("startin 2 form data ", formData);
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

  const updateProfileHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const sellerUpdateData = {
      fullName: formData.fullName,
      bio: formData.bio,
      number: formData.number,
      pincode: formData.pincode,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      phonecode: formData.phonecode,
    };

    console.log(sellerUpdateData, "j");
    // console.log("userdata", sellerUpdateData);
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
          // console.log(result);
          setLoading(false);
          SetBtnDisable(true);
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
          SetBtnDisable(false);
          const errMsg =
            err?.response?.data?.message ||
            "Something went wrong, please try again";
          Swal.fire({
            title: "Error !",
            text: errMsg,
            confirmButtonColor: "#000",
            icon: "error",
            customClass: {
              confirmButton:
                "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
            },
            buttonsStyling: false,
          });
          console.log(err);
        });
    } else {
      console.log("seller id is not here ");
    }
  };
  //basic details section end here

  //document section start here

  // Add file upload handler
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocumentFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // Add document upload function
  const uploadDocuments = async (e) => {
    e.preventDefault();
    setLoading(true);
    const sellerId = localStorage.getItem("sellerId");
    const token = localStorage.getItem("token");
    console.log(sellerId, token, "jjjjjjjjjjj");
    const formData = new FormData();
    if (documentFormData.aadhar) {
      formData.append("aadhar", documentFormData.aadhar);
    }

    if (documentFormData.pan) {
      formData.append("pan", documentFormData.pan);
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      const response = await axios.post(
        `${baseUrl}/upload-seller-doc/${sellerId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setLoading(false);
        SetBtnDisableDoc(true);
        Swal.fire({
          title: "Success!",
          text: "Document updated successfully!",
          confirmButtonColor: "#000",
          icon: "success",
          customClass: {
            confirmButton:
              "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      console.error("Document upload failed:", error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.error || "Document updated Failed!",
        confirmButtonColor: "#1b639f",
        icon: "error",
        customClass: {
          confirmButton:
            "bg-[#1b639f] shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
        },
        buttonsStyling: false,
      });

      SetBtnDisableDoc(false);
      setLoading(false);
    }
  };

  //document section end here

  //verification code start
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailCountdown, setEmailCountdown] = useState(0);
  const [phoneCountdown, setPhoneCountdown] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  useEffect(() => {
    if (emailCountdown > 0) {
      const timer = setInterval(() => {
        setEmailCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [emailCountdown]);

  useEffect(() => {
    if (phoneCountdown > 0) {
      const timer = setInterval(() => {
        setPhoneCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phoneCountdown]);

  const VerificationSubmitHandler = async (type) => {
    try {
      // setLoading(true);
      if (type === "email") {
        setEmailLoading(true);
        await axios.post(`${baseUrl}/send-otp`, {
          contact: formData.email,
          type: "email", // ✅
        });
        // setLoading(false);
        setEmailLoading(false);
        setEmailOtpSent(true);
        setEmailCountdown(60);
      } else if (type === "phone") {
        setPhoneLoading(true);
        await axios.post(`${baseUrl}/send-otp`, {
          contact: formData.number,
          type: "phone", // ✅
        });
        // setLoading(false);
        setPhoneLoading(false);
        setPhoneOtpSent(true);
        setPhoneCountdown(60);
      }
    } catch (error) {
      // setLoading(false);
      if (type === "email") {
        setEmailLoading(false);
      } else {
        setPhoneLoading(false);
      }
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP");
    }
  };

  const handleEmailVerification = async () => {
    try {
      const res = await axios.post(`${baseUrl}/verify-otp`, {
        contact: formData.email,
        otp: emailOtp,
        type: "email",
      });

      if (res.data.success) {
        fetchSellerDataById();
        setIsEmailVerified(true);
        Swal.fire({
          title: "Success!",
          text: "Email verified successfully!!",
          confirmButtonColor: "#000",
          icon: "success",
          customClass: {
            confirmButton:
              "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
          },
          buttonsStyling: false,
        });
      } else {
        Swal.fire("Error", "Invalid Email OTP", "error");
      }
    } catch (error) {
      console.error("Email verification failed:", error);

      Swal.fire("Error", "Email OTP verification failed", "error");
    }
  };

  const handlePhoneVerification = async () => {
    try {
      const res = await axios.post(`${baseUrl}/verify-otp`, {
        contact: formData.number,
        otp: phoneOtp,
        type: "phone",
      });

      if (res.data.success) {
        fetchSellerDataById();
        setIsPhoneVerified(true);

        Swal.fire({
          title: "Success!",
          text: "Otp Verify successfully!",
          confirmButtonColor: "#000",
          icon: "success",
          customClass: {
            confirmButton:
              "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
          },
          buttonsStyling: false,
        });
      } else {
        Swal.fire("Error", "Invalid Phone OTP", "error");
      }
    } catch (error) {
      console.error("Phone verification failed:", error);

      Swal.fire("Error", "Phone OTP verification failed", "error");
    }
  };

  //verification code end

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <div className="space-y-4 md:space-y-6 mt-4 md:mt-8">
            <form
              className="space-y-3 md:space-y-4"
              onSubmit={updateProfileHandler}
            >
              <div className="space-y-2">
                <label className="text-[14px] font-semibold leading-[26px]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-semibold leading-[26px]">
                  Email
                </label>
                {/* relative */}
                <div className="space-y-2">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    disabled
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm pr-10"
                    placeholder="Enter your email"
                  />
                  {/* {formData.isGoogleUser && (
                    <FiCheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 text-xl" />
                  )} */}
                </div>
              </div>

              {/* <div className="space-y-2">
                <label className="text-[14px] font-semibold leading-[26px]">
                  Number
                </label>
                <input
                  type="tel"
                  name="number"
                  value={formData.number || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                  placeholder="Enter your Number"
                  required
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]*"
                />
              </div> */}
              <div className="space-y-2">
                <label className="text-[14px] font-semibold leading-[26px]">
                  Number
                </label>
                <div className="flex gap-2">
                  {/* Country Code Selector */}
                  <select
                    name="phonecode"
                    value={formData.phonecode}
                    onChange={handleInputChange}
                    className="w-[30%] px-3 py-2 rounded-lg border border-gray-300 text-sm"
                    required
                  >
                    <option value="" disabled>
                      {" "}
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
                    onChange={handleInputChange}
                    className="w-[70%] px-3 py-2 rounded-lg border border-gray-300 text-sm"
                    placeholder="Enter your number"
                    required
                    minLength={10}
                    maxLength={10}
                    pattern="[0-9]*"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Professional Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                  placeholder="Describe your professional experience"
                ></textarea>
              </div>

              {/* ⬇️ Country/State/City Dropdowns (replacing full address textarea) */}
              <LocationDropdowns
                formData={formData}
                setFormData={setFormData}
              />

              {/* Grid: Pincode, District, State */}

              <div className="space-y-2">
                <label className="text-[14px] font-semibold leading-[26px]">
                  Pincode
                </label>
                <input
                  type="tel"
                  name="pincode"
                  value={formData.pincode || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                  placeholder="Enter pincode"
                  required
                  minLength={6}
                  maxLength={6}
                  pattern="[0-9]*"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="text-[15px] px-2 md:px-5 py-2 flex mt-7 items-center bg-black rounded-lg text-white"
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

                {btnDisable && (
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.fullName && formData.number) {
                        setCompletedSteps((prev) => [...prev, "basic"]);
                        setActiveTab("document");
                      }
                    }}
                    className="text-[15px] px-2 md:px-5 py-2 flex mt-7 items-center bg-black rounded-lg text-white"
                  >
                    Continue <FiChevronRight className="ml-1" />
                  </button>
                )}
              </div>
            </form>
          </div>
        );

      // Update the document tab JSX
      case "document":
        return (
          <div className="space-y-4 md:space-y-6 mt-4 md:mt-8 ">
            <h3 className="text-lg md:text-xl font-semibold">
              Upload Documents
            </h3>
            <form onSubmit={uploadDocuments}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <label className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-6 block hover:border-blue-500 transition-colors cursor-pointer h-[6rem]">
                  <div className="flex flex-col items-center justify-center h-full space-y-3">
                    <FiUpload className="w-8 h-8 text-gray-400" />
                    <div className="text-center">
                      <p className="text-sm md:text-base font-medium">
                        {documentFormData.aadhar
                          ? documentFormData.aadhar.name
                          : "Aadhar Card"}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        PNG, JPEG, JPG, MAX 200kb
                      </p>
                    </div>
                    <input
                      type="file"
                      name="aadhar"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                    />
                  </div>
                </label>

                <label className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-6 block hover:border-blue-500 transition-colors cursor-pointer h-[6rem]">
                  <div className="flex flex-col items-center justify-center h-full space-y-3">
                    <FiUpload className="w-8 h-8 text-gray-400" />
                    <div className="text-center">
                      <p className="text-sm md:text-base font-medium">
                        {documentFormData.pan
                          ? documentFormData.pan.name
                          : "PAN Card"}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        PNG, JPEG, JPG, MAX 200kb
                      </p>
                    </div>
                    <input
                      type="file"
                      name="pan"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                    />
                  </div>
                </label>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="text-[15px] px-2 md:px-5 py-2 flex mt-7 items-center bg-black rounded-lg text-white"
                >
                  {loading ? (
                    <div className="flex justify-center">
                      <div className="w-5 h-5 border-t-2 border-white border-b-2 rounded-full animate-spin mr-2"></div>
                    </div>
                  ) : (
                    <span className="flex items-center gap-1">
                      Update Doc <GoArrowUpRight className="text-xl" />
                    </span>
                  )}
                </button>

                {btnDisableDoc && (
                  <button
                    type="button"
                    onClick={() => {
                      if (documentFormData.aadhar && documentFormData.pan) {
                        setCompletedSteps((prev) => [...prev, "document"]);
                        setActiveTab("verification");
                      }
                    }}
                    className="text-[15px] px-2 md:px-5 py-2 flex mt-7 items-center bg-black rounded-lg text-white"
                  >
                    Continue <FiChevronRight className="ml-1" />
                  </button>
                )}
              </div>
            </form>
          </div>
        );
      case "verification":
        return (
          <div className="space-y-6 mt-8 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-8">
              Verify Your Contact Details
            </h3>

            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FiMail className="text-blue-600 w-5 h-5" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Email Address
                        </p>
                        <p className="text-gray-900 font-medium">
                          {formData.email}
                        </p>
                      </div>
                    </div>
                    {emailOtpSent && !isEmailVerified && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                        <FiClock className="w-4 h-4" />
                        <span>OTP sent ({emailCountdown}s)</span>
                      </div>
                    )}
                  </div>
                  {formData.isEmailVerify ? (
                    <FiCheckCircle className="text-green-600 w-6 h-6" />
                  ) : (
                    <button
                      onClick={() => VerificationSubmitHandler("email")}
                      disabled={emailCountdown > 0 || emailLoading}
                      className="w-full md:w-auto px-4 py-2 text-sm font-medium rounded-lg 
      bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors
      disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {emailLoading ? (
                        <div className="flex justify-center">
                          <div className="w-5 h-5 border-t-2 border-white border-b-2 rounded-full animate-spin mr-2"></div>
                        </div>
                      ) : emailOtpSent ? (
                        "Resend OTP"
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  )}
                </div>

                {emailOtpSent && !isEmailVerified && (
                  <div className="mt-4 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email OTP
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Enter email OTP"
                      />
                      <button
                        onClick={handleEmailVerification}
                        disabled={emailOtp.length !== 6}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm
                            hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FiPhone className="text-green-600 w-5 h-5" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Phone Number
                        </p>
                        <p className="text-gray-900 font-medium">
                          {formData.number}
                        </p>
                      </div>
                    </div>
                    {phoneOtpSent && !isPhoneVerified && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                        <FiClock className="w-4 h-4" />
                        <span>OTP sent ({phoneCountdown}s)</span>
                      </div>
                    )}
                  </div>
                  {formData.isNumberVerify ? (
                    <FiCheckCircle className="text-green-600 w-6 h-6" />
                  ) : (
                    <button
                      onClick={() => VerificationSubmitHandler("phone")}
                      disabled={phoneCountdown > 0 || phoneLoading}
                      className="w-full md:w-auto px-4 py-2 text-sm font-medium rounded-lg 
                        bg-green-100 text-green-800 hover:bg-green-200 transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {phoneLoading ? (
                        <div className="flex justify-center">
                          <div className="w-5 h-5 border-t-2 border-white border-b-2 rounded-full animate-spin mr-2"></div>
                        </div>
                      ) : phoneOtpSent ? (
                        "Resend OTP"
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  )}
                </div>

                {phoneOtpSent && !isPhoneVerified && (
                  <div className="mt-4 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      SMS OTP
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={phoneOtp}
                        onChange={(e) => setPhoneOtp(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Enter SMS OTP"
                      />
                      <button
                        onClick={handlePhoneVerification}
                        disabled={phoneOtp.length !== 6}
                        className="px-4 py-2 bg-green-600 text-white rounded-md text-sm
                            hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setCompletedSteps((prev) => [...prev, "verification"]);
                  setActiveTab("dashboard");
                }}
                className="w-full py-2.5 px-4 bg-black text-white rounded-lg font-medium
                    hover:bg-gray-800 transition-colors flex items-center justify-center
                    disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.isEmailVerify || !formData.isNumberVerify}
              >
                Continue to Dashboard
                <FiChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        );
      case "dashboard":
        return (
          <div className="text-center space-y-4 md:space-y-6 mt-4 md:mt-8">
            <div className="inline-flex bg-green-100 p-3 md:p-4 rounded-full">
              <FiCheck className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
              Profile Complete!
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              You can now access your professional dashboard
            </p>
            <button
              className="w-full bg-black text-white py-2 md:py-3 rounded-lg font-medium hover:bg-gray-800 transition text-sm md:text-base"
              onClick={() => navigate("/seller")}
            >
              Launch Dashboard
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-4 md:mx-auto mt-4 md:mt-8 p-4 md:p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Complete Your Profile
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Complete all 4 steps to activate your account
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-6">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center">
            <button
              onClick={() => {
                if (
                  index <= currentActiveIndex ||
                  completedSteps.includes(tab.id)
                ) {
                  setActiveTab(tab.id);
                }
              }}
              className={`h-6 w-6 md:h-8 md:w-8 rounded-full flex items-center justify-center text-xs md:text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white scale-110"
                  : completedSteps.includes(tab.id)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {completedSteps.includes(tab.id) ? <FiCheck /> : index + 1}
            </button>
            {index < tabs.length - 1 && (
              <div
                className={`w-8 md:w-16 h-1 ${
                  completedSteps.includes(tab.id)
                    ? "bg-blue-600"
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Responsive Tabs Navigation */}
      <div className="mb-4 border-b border-gray-200">
        <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => {
                if (
                  index <= currentActiveIndex ||
                  completedSteps.includes(tab.id)
                ) {
                  setActiveTab(tab.id);
                }
              }}
              className={`px-2 py-1 md:px-3 md:py-2 flex items-center text-xs md:text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : index <= currentActiveIndex ||
                    completedSteps.includes(tab.id)
                  ? "border-transparent text-gray-500 hover:text-gray-700"
                  : "border-transparent text-gray-300 cursor-not-allowed"
              }`}
              disabled={
                index > currentActiveIndex && !completedSteps.includes(tab.id)
              }
            >
              {React.cloneElement(tab.icon, {
                className: "w-3 h-3 md:w-4 md:h-4 mr-1",
              })}
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">Step {index + 1}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="pt-2 md:pt-4">{renderTabContent()}</div>
    </div>
  );
}