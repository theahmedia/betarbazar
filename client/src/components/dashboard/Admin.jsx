import { useState, useEffect } from "react";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../api/user.Api.js";
import UserForm from "./userForm.jsx";
import UserList from "./userList.jsx";
import { BiPencil, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";


const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [setDeleteUserId] = useState(null);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      console.log("Fetched Users:", data); // Debugging
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (error) {
      console.error("Error fetching users", error);
      toast.error("Failed to load users.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);  // Create user
      toast.success("User created successfully!");
  
      await Swal.fire("User created successfully!", "", "success"); // Wait for Swal to finish
  
      await loadUsers();  // Refresh user list
      setIsCreating(false);  // Close form
    } catch (error) {
      console.error("Failed to create user", error);
      toast.error("Failed to create user.");
    }
  };
  

  const handleUpdateUser = async (userData) => {
    try {
        const updatedUser = await updateUser(editingUser._id, userData);
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user._id === editingUser._id ? updatedUser : user))
        );

        toast.success("User updated successfully!"); // ✅ Success toast

        setEditingUser(null); // ✅ Close form
    } catch (error) {
        console.error("Failed to update user", error);
        toast.error("Failed to update user."); // ✅ Error toast
    }
};


const handleDeleteUser = async (userId) => {
  Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
      if (result.isConfirmed) {
          try {
              await deleteUser(userId);
              setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

              toast.success("User deleted successfully!"); // ✅ Success toast
          } catch (error) {
              console.error("Failed to delete user", error);
              toast.error("Failed to delete user."); // ✅ Error toast
          }
      }
  });
};




  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center text-custom-orange mb-4">Admin Panel</h1>

      {/* Create & Edit User Form */}
      {isCreating && (
        <UserForm
          onSubmit={handleCreateUser}
          onClose={() => setIsCreating(false)}
        />
      )}
      {editingUser && (
        <UserForm
          user={editingUser}
          onSubmit={handleUpdateUser}
          onClose={() => setEditingUser(null)}
        />
      )}

      {/* Confirmation Pop-up for Delete */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-between space-x-4">
              <button
                onClick={handleDeleteUser}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Button */}
      <div className="text-center mb-4">
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create User
        </button>
      </div>

      {/* User List with Icons */}
      <UserList
        users={users}
        onEdit={(user) => setEditingUser(user)}
        onDelete={(user) => {
          setDeleteUserId(user._id);
          setShowConfirmation(true);
        }}
        renderActions={(user) => (
          <div className="flex gap-2">
            {/* Edit Icon Button */}
            <button
              onClick={() => setEditingUser(user)}
              className="p-2 text-blue-500 hover:text-blue-700 transition"
            >
              <BiPencil size={20} />
            </button>

            {/* Delete Icon Button */}
            <button
              onClick={() => {
                setDeleteUserId(user._id);
                setShowConfirmation(true);
              }}
              className="p-2 text-red-500 hover:text-red-700 transition"
            >
              <BiTrash  size={20} />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default AdminPanel;
