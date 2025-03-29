import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/users/forgot-password` : "http://localhost:5000/api/users/forgot-password";

    try {
      await axios.post(API_URL, { email });
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <input type="email" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword;
