import { useState } from "react";
import { forgotPassword } from "./api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      alert("Check your email for reset link.");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Forgot Password</h2>
        <input type="email" placeholder="Enter your email" className="input" onChange={(e) => setEmail(e.target.value)} required />
        <button className="btn">Send Reset Link</button>
      </form>
    </div>
  );
}
