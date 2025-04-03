
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { createUser, updateUser } from "../../api/user.Api.js";

export const UserForm = ({ user = {}, onSubmit, onClose }) => {
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState(user.role || "customer");
  const [roles, setRoles] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/role")
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error("Error fetching roles:", err));
  }, []);

  useEffect(() => {
    console.log("Editing user:", user);
    if (user._id) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setRole(user.role || "customer");
    }
  }, [user]);


const handleClose = () => {
  setName("");
  setPhone("");
  setEmail("");
  setRole("customer");
  setPassword("");
  setConfirmPassword("");
  onClose(); // Ensure the parent updates state
};

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    // Validate starting digits
    if (value && !value.startsWith("01")) {
      setPhoneError("Phone number must start with '01'");
    } else {
      setPhoneError("");
    }

    setPhone(value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneError) return;
  
    try {
      let userData = { name, phone, email, role, password, confirmPassword };
      let response;
  
      if (user._id) {
        response = await updateUser(user._id, userData);
      } else {
        response = await createUser(userData);
      }
  
      if (response?.success) {
        toast.success(user._id ? "User updated successfully!" : "User created successfully!");
  
        onSubmit(response.data); // ✅ Ensure parent state updates
        handleClose(); // ✅ Reset form and close modal
  
        // ✅ Force a reload or refresh users list if needed
        window.location.reload(); // Temporary solution, replace with proper state update
      } else {
        toast.error(response?.message || "Failed to save user.");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user.");
    }
  };
  
  


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold text-center text-custom-orange mb-4">
          {user._id ? "Edit User" : "Create User"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-500 focus:border-orange-600 rounded mt-2"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block font-medium">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              required
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
            {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-medium">Email (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Enter your email (Optional)"
            />
          </div>

          {/* Role Dropdown */}
          <div className="mb-4">
            <label className="block font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-2 border border-orange-300 rounded mt-2"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-custom-black mb-2 ml-2">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                className="mt-1 block w-full px-5 py-3 pr-12 border border-slate-700 rounded-md bg-transparent placeholder:text-gray-600 mb-1"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Icon to toggle password visibility */}
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              >
                {passwordVisible ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </span>
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="block text-custom-black mb-2 ml-2">Confirm Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                className="mt-1 block w-full px-5 py-3 pr-12 border border-slate-700 rounded-md bg-transparent placeholder:text-gray-600 mb-1"
                placeholder="Re-type your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {/* Icon to toggle password visibility */}
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              >
                {passwordVisible ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              disabled={!!phoneError}
            >
              {user._id ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UserForm.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserForm;