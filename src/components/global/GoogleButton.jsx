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
      console.log(authResult, "resultsss");
      if (authResult?.code) {
        const result = await axios.post(`${baseUrl}${endpoint}`, {
          code: authResult.code,
        });

        if (result.data.success) {
          // Determine storage key based on endpoint
          const storageKey = endpoint.includes("customer")
            ? "customerAuth"
            : "subBrokerAuth";
          if (storageKey === "customerAuth") {
            // Store credentials in localStorage
            const authData = {
              token: result.data.token, // JWT token
              user: result.data.user, // User details (e.g., _id, email, role)
            };
            localStorage.setItem(storageKey, JSON.stringify(authData));
          } else {
            console.log(result,"kkkkkkkkkkkkkkkkkkkk")
            localStorage.setItem("sellerId", result.data.sellerData.sellerId);
            localStorage.setItem(
              "sellerFullName",
              result.data.sellerData.sellerFullName
            );

            localStorage.setItem("token", result.data.sellerData.token);
          }

          toast(result.data.message, {
            position: "top-left",
            type: "success",
          });
          navigate(navigatePathSuccess);
          console.log(result, "result");
        }
      }
    } catch (error) {
      toast(error.response?.data?.message || "Google login failed", {
        position: "top-left",
        type: "error",
      });
      navigate(navigatePathError);
      console.log(error, "errorffff");
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
