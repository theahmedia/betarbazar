import Logo from '../assets/tr/BetarBazarlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { registerUser } from "../services/authService";
import { useState } from 'react';

const SignUp = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    let { email, ...formData } = form;

    // Only add email if it has a valid value (not empty or spaces)
    if (email && email.trim() !== "") {
      formData.email = email;
    }

    try {
      const response = await registerUser(formData);
      console.log(response);

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-28">
      <div className="relative overflow-hidden bg-gray-100 w-full max-w-lg p-[4px] rounded-2xl shadow-lg before:absolute before:top-[-50%] before:right-[-50%] before:bottom-[-50%] before:left-[-50%] before:bg-gradient-to-t from-custom-orange via-transparent to-transparent before:animate-spin-slow">
        <div className="relative w-full h-full bg-slate-100 rounded-2xl shadow-slate-400 px-10 py-16">
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="flex-shrink-0 mb-4">
              <Link to="/" className="text-xl font-bold">
                <img className="w-16 h-10 xl:w-14 xl:h-10 sm:w-14 sm:h-10 cursor-pointer" src={Logo} alt="Logo" />
              </Link>
            </div>
            <h4 className="text-2xl">
              Sign Up into <span className="text-custom-orange font-medium">Betar Bazar</span>
            </h4>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-custom-black mb-2 ml-2">Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-5 py-3 border border-slate-700 rounded-full bg-transparent placeholder:text-gray-600"
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-custom-black mb-2 ml-2">Phone Number</label>
              <input
                type="text"
                className="mt-1 block w-full px-5 py-3 border border-slate-700 rounded-full bg-transparent placeholder:text-gray-600"
                placeholder="Enter your phone number"
                name="phone"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-custom-black mb-2 ml-2">Email (Optional)</label>
              <input
                type="email"
                className="mt-1 block w-full px-5 py-3 border border-slate-700 rounded-full bg-transparent placeholder:text-gray-600"
                placeholder="Enter your email (Optional)"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-custom-black mb-2 ml-2">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="mt-1 block w-full px-5 py-3 border border-slate-700 rounded-full bg-transparent placeholder:text-gray-600"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChange}
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-custom-black mb-2 ml-2">Re-enter Password</label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  className="mt-1 block w-full px-5 py-3 border border-slate-700 rounded-full bg-transparent placeholder:text-gray-600 mb-8"
                  placeholder="Re-enter password"
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  {confirmPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
            </div>
            <div>
              <button type="submit" className="w-full py-3 px-4 border border-slate-700 rounded-full bg-transparent transition-all duration-300 hover:text-white hover:bg-custom-orange hover:border-custom-orange mb-2">
                Sign Up
              </button>
              <p className="text-xs pl-2">
                Already have an account?{' '}
                <Link to="/login" className="text-xs underline transition-all duration-300 hover:no-underline hover:text-custom-orange">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};


export default SignUp;
