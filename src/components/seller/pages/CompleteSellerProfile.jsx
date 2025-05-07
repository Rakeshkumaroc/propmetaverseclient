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
} from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";

export default function CompleteSellerProfile() {
  const [activeTab, setActiveTab] = useState("basic");
  const [completedSteps, setCompletedSteps] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    number: "",
    fullAddress:"",
    pincode:"",
    district:"",
    state:""
  });
  const [sellerType, setSellerType] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const tabs = [
    { id: "basic", label: "Basic Details", icon: <FiUser /> },
    { id: "document", label: "Documents", icon: <FiFile /> },
    { id: "verification", label: "Verification", icon: <FiMail /> },
    { id: "dashboard", label: "Dashboard", icon: <FiLock /> },
  ];

  const currentActiveIndex = tabs.findIndex((t) => t.id === activeTab);

  const handleVerification = (type) => {
    alert(`${type} verification initiated!`);
    setCompletedSteps((prev) => [...new Set([...prev, "verification"])]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const baseUrl = import.meta.env.VITE_APP_URL;
  // get data By Id
  // const fetchSellerDataById = () => {
  //   const sellerId = localStorage.getItem("sellerId");
  //   const token = localStorage.getItem("token");
  //   if (sellerId) {
  //     axios
  //       .get(`${baseUrl}/get-seller-data/${sellerId}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((result) => {
  //         console.log(result.data.sellerData);
  //         setFormData(result.data.sellerData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     console.log("seller id is not here ");
  //   }
  // };

  // useEffect(() => {
  //   fetchSellerDataById();
  // }, []);

  const updateProfileHandler = (e) => {
    // setLoading(true);
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
                <label className="block text-sm font-medium text-gray-700">
                  Seller Type
                </label>
                <div className="flex flex-col md:flex-row gap-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sellerType"
                      value="subBroker"
                      checked={sellerType === "subBroker"}
                      onChange={(e) => setSellerType(e.target.value)}
                      className="w-4 h-4 accent-green-600"
                    />
                    <span className="text-sm">Sub Broker</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sellerType"
                      value="individualSeller"
                      checked={sellerType === "individualSeller"}
                      onChange={(e) => setSellerType(e.target.value)}
                      className="w-4 h-4 accent-green-600"
                    />
                    <span className="text-sm">Individual Seller</span>
                  </label>
                </div>
              </div>

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
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-semibold leading-[26px]">
                  Number
                </label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                  placeholder="Enter your Number"
                />
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

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Address
                </label>
                <textarea
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                  placeholder="Enter your complete address (street, locality, etc.)"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <label className="text-[14px] font-semibold leading-[26px]">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                    placeholder="Enter your area pincode"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[14px] font-semibold leading-[26px]">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                    placeholder="Enter your district"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[14px] font-semibold leading-[26px]">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                    placeholder="Enter your state"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="text-[15px] px-2 md:px-5 py-2 flex mt-7 items-center bg-black rounded-lg text-white"
                >
                  Upload
                  <GoArrowUpRight className="text-xl" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (formData.fullName && sellerType) {
                      setCompletedSteps((prev) => [...prev, "basic"]);
                      setActiveTab("document");
                    }
                  }}
                  className="text-[15px] px-2 md:px-5 py-2 flex mt-7 items-center bg-black rounded-lg text-white"
                >
                  Continue <FiChevronRight className="ml-1" />
                </button>
              </div>
            </form>
          </div>
        );

      // case "document":
      //   return (
      //     <div className="space-y-4 md:space-y-6 mt-4 md:mt-8 ">
      //       <h3 className="text-lg md:text-xl font-semibold">
      //         Upload Documents
      //       </h3>
      //       <form>
      //         <div className="grid grid-cols-3 gap-4">
      //           {/* Aadhar Card Upload */}
      //           <label className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-6 block hover:border-blue-500 transition-colors cursor-pointer h-[8rem]">
      //             <div className="flex flex-col items-center justify-center h-full space-y-3">
      //               <FiUpload className="w-8 h-8 text-gray-400" />
      //               <div className="text-center">
      //                 <p className="text-sm md:text-base font-medium">
      //                   {formData.aadhar
      //                     ? formData.aadhar.name
      //                     : "Click to upload Aadhar Card"}
      //                 </p>
      //                 <p className="text-xs md:text-sm text-gray-500 mt-1">
      //                   PDF, JPG, up to 10MB
      //                 </p>
      //               </div>
      //               <input
      //                 type="file"
      //                 name="aadhar"
      //                 onChange={handleInputChange}
      //                 className="hidden"
      //                 accept=".pdf,.jpg,.jpeg"
      //               />
      //             </div>
      //           </label>{" "}
      //           {/* Added closing label tag */}
      //           {/* Document 1 Upload */}
      //           <label className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-6 block hover:border-blue-500 transition-colors cursor-pointer h-[8rem]">
      //             <div className="flex flex-col items-center justify-center h-full space-y-3">
      //               <FiUpload className="w-8 h-8 text-gray-400" />
      //               <div className="text-center">
      //                 <p className="text-sm md:text-base font-medium">
      //                   {formData.document1
      //                     ? formData.document1.name
      //                     : "Click to upload Document 1"}
      //                 </p>
      //                 <p className="text-xs md:text-sm text-gray-500 mt-1">
      //                   PDF, DOC, up to 10MB
      //                 </p>
      //               </div>
      //               <input
      //                 type="file"
      //                 name="document1"
      //                 onChange={handleInputChange}
      //                 className="hidden"
      //                 accept=".pdf,.doc,.docx"
      //               />
      //             </div>
      //           </label>
      //           {/* Document 2 Upload */}
      //           <label className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-6 block hover:border-blue-500 transition-colors cursor-pointer h-[8rem]">
      //             <div className="flex flex-col items-center justify-center h-full space-y-3">
      //               <FiUpload className="w-8 h-8 text-gray-400" />
      //               <div className="text-center">
      //                 <p className="text-sm md:text-base font-medium">
      //                   {formData.document2
      //                     ? formData.document2.name
      //                     : "Click to upload Document 2"}
      //                 </p>
      //                 <p className="text-xs md:text-sm text-gray-500 mt-1">
      //                   PDF, DOC, up to 10MB
      //                 </p>
      //               </div>
      //               <input
      //                 type="file"
      //                 name="document2"
      //                 onChange={handleInputChange}
      //                 className="hidden"
      //                 accept=".pdf,.doc,.docx"
      //               />
      //             </div>
      //           </label>
      //         </div>

      //         <button
      //           onClick={() => {
      //             if (formData.document) {
      //               setCompletedSteps((prev) => [...prev, "document"]);
      //               setActiveTab("verification");
      //             }
      //           }}
      //           className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center text-sm md:text-base"
      //         >
      //           Continue to Verification <FiChevronRight className="ml-1" />
      //         </button>
      //       </form>
      //     </div>
      //   );

      // case "verification":
      //   return (
      //     <div className="space-y-4 md:space-y-6 mt-4 md:mt-8">
      //       <h3 className="text-lg md:text-xl font-semibold">
      //         Contact Verification
      //       </h3>

      //       <div className="space-y-3">
      //         <div className="p-3 md:p-4 border rounded-lg">
      //           <div className="flex flex-col md:flex-row items-center justify-between gap-3">
      //             <div className="flex items-center gap-2">
      //               <FiMail className="w-5 h-5 text-gray-600" />
      //               <span className="text-sm md:text-base">
      //                 Email Verification
      //               </span>
      //             </div>
      //             <button
      //               onClick={() => handleVerification("email")}
      //               className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
      //             >
      //               Verify Email
      //             </button>
      //           </div>
      //         </div>

      //         <div className="p-3 md:p-4 border rounded-lg">
      //           <div className="flex flex-col md:flex-row items-center justify-between gap-3">
      //             <div className="flex items-center gap-2">
      //               <FiPhone className="w-5 h-5 text-gray-600" />
      //               <span className="text-sm md:text-base">
      //                 Phone Verification
      //               </span>
      //             </div>
      //             <button
      //               onClick={() => handleVerification("phone")}
      //               className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
      //             >
      //               Verify Phone
      //             </button>
      //           </div>
      //         </div>
      //       </div>

      //       <div className="space-y-2">
      //         <label className="block text-sm font-medium text-gray-700">
      //           Verification Code
      //         </label>
      //         <input
      //           type="text"
      //           value={verificationCode}
      //           onChange={(e) => setVerificationCode(e.target.value)}
      //           className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
      //           placeholder="Enter 6-digit code"
      //         />
      //       </div>

      //       <button
      //         onClick={() => {
      //           if (verificationCode.length === 6) {
      //             setCompletedSteps((prev) => [...prev, "verification"]);
      //             setActiveTab("dashboard");
      //           }
      //         }}
      //         className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center text-sm md:text-base"
      //       >
      //         Complete Verification <FiChevronRight className="ml-1" />
      //       </button>
      //     </div>
      //   );

      // case "dashboard":
      //   return (
      //     <div className="text-center space-y-4 md:space-y-6 mt-4 md:mt-8">
      //       <div className="inline-flex bg-green-100 p-3 md:p-4 rounded-full">
      //         <FiCheck className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
      //       </div>
      //       <h3 className="text-lg md:text-xl font-semibold text-gray-900">
      //         Profile Complete!
      //       </h3>
      //       <p className="text-sm md:text-base text-gray-600">
      //         You can now access your professional dashboard
      //       </p>
      //       <button
      //         className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-lg font-medium hover:bg-blue-700 transition text-sm md:text-base"
      //         onClick={() => alert("Redirecting to dashboard...")}
      //       >
      //         Launch Dashboard
      //       </button>
      //     </div>
      //   );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-4 md:mx-auto mt-4 md:mt-8 p-4 md:p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Complete Your Profile
        </h1>
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
