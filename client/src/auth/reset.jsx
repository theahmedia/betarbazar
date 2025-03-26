import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { newPassword, confirmPassword });
      toast.success("Password reset successful!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <input type="password" placeholder="New Password" required onChange={(e) => setNewPassword(e.target.value)} />
      <input type="password" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
