import { useState } from "react";
import Logo from "../assets/tr/BetarBazarlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { loginUser } from "../services/authService";
import { useTranslation } from 'react-i18next';  // Import i18n hook
import "../i18n"; // Import i18n configuration

const Login = () => {
  const [form, setForm] = useState({ phone: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const notifySuccess = (message) => toast.success(message, { position: "top-right" });
  const notifyError = (message) => toast.error(message, { position: "top-right" });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Only allow digits for phone number
    if (name === 'phone' && value !== '') {
      const digitsOnly = value.replace(/\D/g, '');
      setForm({ ...form, [name]: digitsOnly });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateForm = () => {
    if (!form.phone || !form.password) {
      notifyError(t("Please fill in all fields."));
      return false;
    }

    if (form.phone.length !== 11) {
      notifyError(t("Phone number must be exactly 11 digits."));
      return false;
    }

    if (form.password.length < 6) {
      notifyError(t("Password must be at least 6 characters long."));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await loginUser(form);
      if (response.token) {
        localStorage.setItem("token", response.token);
        notifySuccess(t("Login successful!"));
        navigate("/");
      } else {
        notifyError(t("Invalid credentials"));
      }
    } catch (error) {
      console.error("Login Error:", error);
      notifyError(error.response?.data?.message || t("Login failed!"));
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
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
              {t("Login into")} <span className="text-custom-orange font-medium">{t("Betar Bazar")}</span>
            </h4>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-custom-black mb-2 ml-2">
                {t("Phone Number")}
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                className="mt-1 block w-full px-5 py-3 border border-slate-700 rounded-full bg-transparent placeholder:text-gray-600"
                placeholder={t("Enter 11 digit phone number")}
                onChange={handleChange}
                pattern="[0-9]{11}"
                maxLength="11"
                title={t("Phone number must be exactly 11 digits")}
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-custom-black mb-2 ml-2">
                {t("Password")}
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={form.password}
                className="mt-1 block w-full px-5 py-3 border border-slate-700 rounded-full bg-transparent placeholder:text-gray-600"
                placeholder={t("Enter your password")}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                aria-label={t(passwordVisible ? "Hide password" : "Show password")}
              >
                {passwordVisible ? <AiOutlineEye size={24} /> : <AiOutlineEyeInvisible size={24} />}
              </button>
              <p className="pl-2">
                <Link to="/reset" className="text-xs underline transition-all duration-300 hover:no-underline hover:text-custom-orange">
                  {t("Forgot Password?")}
                </Link>
              </p>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 border border-slate-700 rounded-full bg-transparent transition-all duration-300 hover:text-white hover:bg-custom-orange hover:border-custom-orange mb-2"
              >
                {t("Log In")}
              </button>
              <p className="text-xs pl-2">
                {t("Do not have an account?")} {" "}
                <Link to="/register" className="text-xs underline transition-all duration-300 hover:no-underline hover:text-custom-orange">
                  {t("Sign up")}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
