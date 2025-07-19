import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../assets/image/google-icon.svg";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_APP_URL;

const GoogleButton = ({
  endpoint,
  buttonName,
  navigatePathSuccess,
  navigatePathError,
}) => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      console.log("Google Auth Result:", authResult);
      if (authResult?.code) {
        const result = await axios.post(`${baseUrl}${endpoint}`, {
          code: authResult.code,
        });

        console.log("Full API Response:", JSON.stringify(result.data, null, 2));

        if (result.data.success) {
          // Determine storage key based on endpoint
          const storageKey = endpoint.includes("customer")
            ? "customerAuth"
            : "subBrokerAuth";
          if (storageKey === "customerAuth") {
            const authData = {
              token: result.data.token,
              user: result.data.user,
            };
            localStorage.setItem(storageKey, JSON.stringify(authData));
            console.log(
              "customerAuth saved:",
              localStorage.getItem("customerAuth")
            );
            // Show SweetAlert2 success modal with custom confirm button color
            await Swal.fire({
              icon: "success",
              title: "Success",
              text: result.data.message,
              confirmButtonText: "OK",
              confirmButtonColor: "#1b639f", // Set confirm button color
            });
            navigate(navigatePathSuccess); // Navigate after alert is closed
          } else {
            // Store seller credentials in localStorage
            localStorage.setItem("sellerId", result.data.sellerData.sellerId);
            localStorage.setItem(
              "sellerFullName",
              result.data.sellerData.sellerFullName
            );
            console.log("result.data.sellerData", result.data.sellerData);

            localStorage.setItem("token", result.data.sellerData.token);
            localStorage.setItem("createdAt", result.data.sellerData.createdAt);

            // Ensure verification fields are booleans
            const isEmailVerified =
              result.data.sellerData.sellerIsEmailVerify === true;
            const isNumberVerified =
              result.data.sellerData.sellerIsNumberVerify === true;

            console.log("Verification Status:", {
              sellerIsEmailVerify: isEmailVerified,
              sellerIsNumberVerify: isNumberVerified,
              rawEmailVerify: result.data.sellerData.sellerIsEmailVerify,
              rawNumberVerify: result.data.sellerData.sellerIsNumberVerify,
            });

            // Show SweetAlert2 success modal with custom confirm button color
            await Swal.fire({
              icon: "success",
              title: "Success",
              text: result.data.message,
              confirmButtonText: "OK",
              confirmButtonColor: "#1b639f", // Set confirm button color
            });

            // Strict redirect logic for sellers
            if (isEmailVerified && isNumberVerified) {
              console.log("Both verified, redirecting to /seller");
              navigate("/seller");
            } else {
              console.log(
                "Verification incomplete, redirecting to",
                navigatePathSuccess
              );
              navigate(navigatePathSuccess);
            }
          }
        } else {
          console.log("API success false:", result.data);
          // Show SweetAlert2 error modal with custom confirm button color
          await Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: result.data.message,
            confirmButtonText: "OK",
            confirmButtonColor: "#1b639f", // Set confirm button color
          });
          navigate(navigatePathError);
        }
      }
    } catch (error) {
      console.error("Google Login Error:", error.response?.data?.message);
      // Show SweetAlert2 error modal with custom confirm button color
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Google login failed",
        confirmButtonText: "OK",
        confirmButtonColor: "#1b639f", // Set confirm button color
      });
      navigate(navigatePathError);
    }
  };

  const googleSign = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div onClick={googleSign} className="flex gap-3 sm:gap-4 w-full">
      <button className="flex-1  border border-gray-300 py-2 sm:py-2.5 px-3 sm:px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition">
        <img
          src="https://img.icons8.com/color/24/000000/google-logo.png"
          alt="Google"
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
        {buttonName} 
      </button>
    </div>
  );
};

export default GoogleButton;

 