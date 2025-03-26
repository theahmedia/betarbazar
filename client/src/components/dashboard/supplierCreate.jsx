import { useState, useEffect } from "react";
import { createSupplier, getSuppliers, deleteSupplier, updateSupplier } from "../../api/supplier.Api.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // import the CSS for toastify

const CreateSupplier = () => {
  const [supplier, setSupplier] = useState({ name: "", email: "", phone: "", address: "", products: "" });
  const [suppliers, setSuppliers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuppliers();
    //toast.info("Component Mounted!", { position: "top-center" });
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.data || []); // Ensure suppliers is an array
    } catch (err) {
      setError(`Failed to fetch suppliers: ${err.message}`);
    }
  };

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isDuplicatePhone = suppliers.some(s => s.phone === supplier.phone && s._id !== editId);
      const isDuplicateEmail = suppliers.some(s => s.email === supplier.email && s._id !== editId);
  
      if (isDuplicatePhone) {
        toast.error("Phone number already exists!", { position: toast.POSITION.TOP_CENTER });
        return;
      }
      if (isDuplicateEmail) {
        toast.error("Email already exists!", { position: toast.POSITION.TOP_CENTER });
        return;
      }
  
      if (editId) {
        await updateSupplier(editId, { ...supplier, products: supplier.products.split(", ") });
        toast.success("Supplier updated successfully!", { position: "top-center" });
      } else {
        await createSupplier({ ...supplier, products: supplier.products.split(", ") });
        toast.success("Supplier added successfully!", { position: "top-center" });
      }
  
      fetchSuppliers();
      setSupplier({ name: "", email: "", phone: "", address: "", products: "" });
      setEditId(null);
    } catch (err) {
      toast.error(`Failed to save supplier: ${err.message}`, { position: "top-center" });
    }
  };
  

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await deleteSupplier(id);
        fetchSuppliers();
        toast.success("Supplier deleted successfully!", { position: "top-center" });
      } catch (err) {
        toast.error(`Failed to delete supplier: ${err.message}`, { position: "top-center" });
      }
    }
  };

  const handleEdit = (s) => {
    setSupplier({ ...s, products: s.products?.join(", ") || "" });
    setEditId(s._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center font-bold mb-4">{editId ? "Edit Supplier" : "Add Supplier"}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" className="border p-2 w-full" value={supplier.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="border p-2 w-full" value={supplier.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" className="border p-2 w-full" value={supplier.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" className="border p-2 w-full" value={supplier.address} onChange={handleChange} required />
        <input type="text" name="products" placeholder="Products (comma separated)" className="border p-2 w-full" value={supplier.products} onChange={handleChange} required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          {editId ? "Update" : "Save"}
        </button>
      </form>

      <h2 className="text-2xl text-center font-bold mt-6">Supplier List</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full border-collapse border border-gray-200 min-w-max">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-6 p-2 text-center">#</th> {/* Added serial number header */}
            <th className="border px-6 p-2 text-center">Name</th>
            <th className="border px-6 p-2 text-center">Email</th>
            <th className="border px-6 p-2 text-center">Phone</th>
            <th className="border px-6 p-2 text-center">Address</th>
            <th className="border px-6 p-2 text-center">Products</th>
            <th className="border px-6 p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((s, index) => ( // Added index for serial number
              <tr key={s._id} className="border-t">
                <td className="border px-6 p-2 text-center">{index + 1}</td> {/* Display serial number */}
                <td className="border px-6 p-2 text-center">{s.name}</td>
                <td className="border px-6 p-2 text-center">{s.email}</td>
                <td className="border px-6 p-2 text-center">{s.phone}</td>
                <td className="border px-6 p-2 text-center">{s.address}</td>
                <td className="border px-6 p-2 text-center">{s.products?.join(", ") || "No Products"}</td>
                <td className="border px-6 p-2 text-center flex space-x-2">
                  <button onClick={() => handleEdit(s)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4"> {/* Updated colspan to 7 */}
                No suppliers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      {/* ToastContainer for React Toastify */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default CreateSupplier;
