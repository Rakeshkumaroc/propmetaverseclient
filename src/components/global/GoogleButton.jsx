import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../assets/image/google-icon.svg";
import { toast } from "react-toastify";

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
            console.log("customerAuth saved:", localStorage.getItem("customerAuth"));
            toast(result.data.message, {
              position: "top-left",
              type: "success",
            });
            navigate(navigatePathSuccess); // Explicitly navigate for customers
          } else {
            // Store seller credentials in localStorage
            localStorage.setItem("sellerId", result.data.sellerData.sellerId);
            localStorage.setItem(
              "sellerFullName",
              result.data.sellerData.sellerFullName
            );
            localStorage.setItem("token", result.data.sellerData.token);

            // Ensure verification fields are booleans
            const isEmailVerified = result.data.sellerData.sellerIsEmailVerify === true;
            const isNumberVerified = result.data.sellerData.sellerIsNumberVerify === true;

            console.log("Verification Status:", {
              sellerIsEmailVerify: isEmailVerified,
              sellerIsNumberVerify: isNumberVerified,
              rawEmailVerify: result.data.sellerData.sellerIsEmailVerify,
              rawNumberVerify: result.data.sellerData.sellerIsNumberVerify,
            });

            // Strict redirect logic for sellers
            if (isEmailVerified && isNumberVerified) {
              console.log("Both verified, redirecting to /seller");
              navigate("/seller");
            } else {
              console.log("Verification incomplete, redirecting to", navigatePathSuccess);
              navigate(navigatePathSuccess);
            }

            toast(result.data.message, {
              position: "top-left",
              type: "success",
            });
          }
        } else {
          console.log("API success false:", result.data);
          toast("Login failed: " + result.data.message, {
            position: "top-left",
            type: "error",
          });
          navigate(navigatePathError);
        }
      }
    } catch (error) {
      console.error("Google Login Error:", error.response?.data || error);
      toast(error.response?.data?.message || "Google login failed", {
        position: "top-left",
        type: "error",
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
    <div
      onClick={googleSign}
      className="bg-[#95acef61] flex justify-center gap-2 p-2 items-center cursor-pointer hover:bg-[#8ca4ed94] rounded-lg"
    >
      <img src={googleIcon} alt="google icon" className="h-5 w-5" />
      <button type="button" className="font-semibold">
        {buttonName}
      </button>
    </div>
  );
};

export default GoogleButton;