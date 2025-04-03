import { useEffect, useState } from "react";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../../services/categoryService";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { socket } from "../../utils/socket";



const CategoryCreate = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();

    // Manually connect the socket when the component mounts
    socket.connect();

    // Listen for category updates and handle them
    socket.on("updateCategories", (newCategory) => {
      setCategories((prev) => [...prev, newCategory]);
    });

    socket.on("removeCategory", (categoryId) => {
      setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
    });

    // Clean up on component unmount
    return () => {
      socket.off("updateCategories");
      socket.off("removeCategory");
      socket.disconnect();
    };
  }, []);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedFormats = ["image/png", "image/webp"];
    if (!allowedFormats.includes(file.type)) {
      setError("Only PNG and WEBP images are allowed.");
      return;
    }

    if (file.size > 100 * 1024) {
      setError("Image must be less than 100 KB.");
      return;
    }

    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim().toLowerCase();
    if (!trimmedName) {
      setError("Category name cannot be empty.");
      return;
    }

    const nameExists = categories.some(cat => cat.name.toLowerCase() === trimmedName && cat._id !== editingId);
    if (nameExists) {
      setError("This category name has already been used.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    if (editingId) {
      await updateCategory(editingId, formData);
    } else {
      await createCategory(formData);
    }

    socket.emit('categoryCreated', { name, image: preview }); // Emit category creation event

    resetForm();
    loadCategories();
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setName(category.name);
    setPreview(`${import.meta.env.VITE_API_URL}/${category.image}`);
    setError("");
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteCategory(deleteId);
      setCategories(categories.filter((cat) => cat._id !== deleteId));
      socket.emit('categoryDeleted', deleteId); // Emit category deletion event
    }
    setShowModal(false);
    setDeleteId(null);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const resetForm = () => {
    setName("");
    setImage(null);
    setPreview("");
    setEditingId(null);
    setError("");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">{editingId ? "Edit Category" : "Add Category"}</h2>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg shadow">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="border p-2 w-full rounded"
          required
        />
        <input type="file" accept="image/png, image/webp" onChange={handleImageChange} className="border p-2 w-full rounded" />
        {preview && <img src={preview} alt="Preview" className="h-24 w-24 object-cover rounded-lg mt-2" />}
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl text-center font-bold mt-6 mb-6">Categories</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-14">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-6 py-3 text-left text-gray-600">#</th>
            <th className="border px-6 py-3 text-left text-gray-600">Image</th>
            <th className="border px-6 py-3 text-left text-gray-600">Category</th>
            <th className="border px-6 py-3 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat._id} className="border-b">
              <td className="border px-6 py-3">{index + 1}</td>
              <td className="border px-6 py-3">
                <img src={`${import.meta.env.VITE_API_URL}/${cat.image}`} alt={cat.name} className="h-12 w-12 object-cover rounded" />
              </td>
              <td className="border px-6 py-3">{cat.name}</td>
              <td className="border px-6 py-3 space-x-2">
                <button onClick={() => handleEdit(cat)}>
                  <FaEdit className="text-blue-500 hover:text-blue-700" />
                </button>
                <button onClick={() => confirmDelete(cat._id)}>
                  <FaTrashAlt className="text-red-500 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-center">Confirm Deletion</h3>
            <p className="text-center text-gray-700 mb-4">Are you sure you want to delete this category?</p>
            <div className="flex justify-center space-x-4">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCreate;

