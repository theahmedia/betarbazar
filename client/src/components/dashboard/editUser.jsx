import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUser } from "../../services/userService.jsx";

const EditUser = ({ user = {}, onClose, fetchUsers }) => {
    const [updatedUser, setUpdatedUser] = useState(user);

    useEffect(() => {
        if (user) setUpdatedUser(user);
    }, [user]);

    const handleChange = (e) => {
        setUpdatedUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user._id) {
            toast.error("User data is missing!");
            return;
        }

        const updatedFields = Object.fromEntries(
            Object.entries(updatedUser).filter(([key, value]) => value !== user[key])
        );

        if (Object.keys(updatedFields).length === 0) {
            toast.info("No changes detected!");
            return;
        }

        try {
            await updateUser(user._id, updatedFields);
            toast.success("User updated successfully!");
            fetchUsers();
            onClose();
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update user.");
        }
    };

    if (!user) return <p className="text-center text-red-500">Error: User data not found.</p>;

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-3">
                <input 
                    type="text" 
                    name="name" 
                    value={updatedUser.name || ""}  
                    onChange={handleChange} 
                    placeholder="Name" 
                    className="border p-2 w-full rounded"  
                />
                <input 
                    type="text" 
                    name="phone" 
                    value={updatedUser.phone || ""}  
                    onChange={handleChange} 
                    placeholder="Phone" 
                    className="border p-2 w-full rounded"
                />
                <input 
                    type="email" 
                    name="email" 
                    value={updatedUser.email || ""}  
                    onChange={handleChange} 
                    placeholder="Email" 
                    className="border p-2 w-full rounded"
                />
                <input 
                    type="text" 
                    name="role" 
                    value={updatedUser.role || ""} 
                    onChange={handleChange} 
                    placeholder="Role" 
                    className="border p-2 w-full rounded"
                />
                <button 
                    type="submit" 
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full transition"
                >
                    Update User
                </button>
            </form>
        </div>
    );
};

EditUser.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        role: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
};

export default EditUser;