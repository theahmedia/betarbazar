import React, { useState, useEffect } from "react";
import Logo from "../assets/tr/BetarBazarlogo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // Import i18n hook
import "../i18n"; // Import i18n configuration

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Set the base API URL dynamically based on the environment
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch current user data when the component mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data) {
          // User data fetched successfully
          console.log("Current user data:", response.data);
        }
      } catch (error) {
        toast.error(t("Error fetching user data", { error: error.message }));
        console.error("Error fetching user data:", error);
      }
    };

    fetchCurrentUser();
  }, [t, API_URL]); // Empty dependency array to run only once on component mount

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(t("Passwords do not match"));
      return;
    }

    try {
      await axios.post(`${API_URL}/api/users/reset-password/${token}`, {
        newPassword,
        confirmPassword,
      });
      toast.success(t("Password reset successful!"));
      navigate("/login"); // Redirect to login page after reset
    } catch (error) {
      toast.error(error.response?.data?.message || t("Error resetting password"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-28">
      <div className="relative overflow-hidden bg-gray-100 w-full max-w-lg p-[4px] rounded-2xl shadow-lg before:absolute before:top-[-50%] before:right-[-50%] before:bottom-[-50%] before:left-[-50%] before:bg-gradient-to-t from-custom-orange via-transparent to-transparent before:animate-spin-slow">
        <div className="relative w-full h-full bg-slate-100 rounded-2xl shadow-slate-400 px-10 py-16">
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="flex-shrink-0 mb-4">
              <Link to="/" className="text-xl font-bold">
                <img
                  className="w-16 h-10 xl:w-14 xl:h-10 sm:w-14 sm:h-10 cursor-pointer"
                  src={Logo}
                  alt={t("Logo")}
                />
              </Link>
            </div>
            <h4 className="text-2xl">
              {t("Reset Password")} <span className="text-custom-orange font-medium">{t("Betar Bazar")}</span>
            </h4>
          </div>

          <form onSubmit={handleResetPassword}>
            {/* New Password Field */}
            <div>
              <label className="block text-custom-black mb-2 ml-2">{t("New Password")}</label>
              <input
                className="mt-1 mb-2 block w-full px-5 py-3 border border-slate-700 rounded-full bg-transparent placeholder:text-gray-600"
                type="password"
                placeholder={t("New Password")}
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            {/* Confirm Password Field */}
            <div>
              <label className="block text-custom-black mb-2 ml-2">{t("Confirm Password")}</label>
              <input
                className="mt-2 mb-4 block w-full px-5 py-3 border border-slate-700 rounded-full bg-transparent placeholder:text-gray-600"
                type="password"
                placeholder={t("Confirm Password")}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 border border-slate-700 rounded-full bg-transparent transition-all duration-300 hover:text-white hover:bg-custom-orange hover:border-custom-orange mb-2"
            >
              {t("Reset Password")}
            </button>
            <p className="pl-2">
              <Link to="/login" className="text-xs underline transition-all duration-300 hover:no-underline hover:text-custom-orange">
                {t("Back to login")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
