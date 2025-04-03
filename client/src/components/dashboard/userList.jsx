
import { useEffect, useState, Fragment } from "react";
import { deleteUser } from "../../services/userService.jsx";
import { X } from "lucide-react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { Dialog, Transition } from "@headlessui/react"; // Import modal components
import EditUserForm from "./editUser.jsx"; // Import the form component


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    

    const handleEdit = (user) => {
        setSelectedUser(user); // Set selected user data
        setIsOpen(true); // Open modal
    };

    return (
        <div className="w-full p-4">
            <div className="overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full border-collapse border border-gray-200 min-w-max">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border px-4 py-3 text-center text-xs md:text-sm font-semibold">S.No</th>
                            <th className="border px-4 py-3 text-center text-xs md:text-sm font-semibold">User ID</th>
                            <th className="border px-4 py-3 text-center text-xs md:text-sm font-semibold">Name</th>
                            <th className="border px-4 py-3 text-center text-xs md:text-sm font-semibold">Phone</th>
                            <th className="border px-4 py-3 text-center text-xs md:text-sm font-semibold">Email</th>
                            <th className="border px-4 py-3 text-center text-xs md:text-sm font-semibold sm:table-cell">Role</th>
                            <th className="border px-4 py-3 text-center text-xs md:text-sm font-semibold sm:table-cell">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id} className="border-t text-gray-900 hover:bg-gray-50 transition">
                                    <td className="border px-4 py-3 text-center text-xs md:text-sm font-normal">{index + 1}</td>
                                    <td className="border px-4 py-3 text-center text-xs md:text-sm font-normal">{user._id}</td>
                                    <td className="border px-4 py-3 text-center text-xs md:text-sm font-normal">{user.name}</td>
                                    <td className="border px-4 py-3 text-center text-xs md:text-sm font-normal">{user.phone}</td>
                                    <td className="border px-4 py-3 text-center text-xs md:text-sm font-normal break-words">{user.email}</td>
                                    <td className="border px-4 py-3 text-center text-xs md:text-sm font-normal sm:table-cell">{user.role}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button 
                                            onClick={() => handleEdit(user)}
                                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                        >
                                            <BiPencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                        >
                                            <BiTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-600">
                                    No users available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit User Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-96">
                            <div className="flex justify-between items-center mb-4">
                                <Dialog.Title className="text-lg font-bold">Edit User</Dialog.Title>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            {selectedUser && (
                                <EditUserForm user={selectedUser} onClose={() => setIsOpen(false)} fetchUsers={fetchUsers} />
                            )}
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default UserList;
