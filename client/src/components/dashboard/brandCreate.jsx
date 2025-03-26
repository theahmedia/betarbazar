import { useState, useEffect } from 'react';
import { fetchBrands, createBrand, updateBrand, deleteBrand } from '../../services/brandService.jsx';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const BrandCreate = () => {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const data = await fetchBrands();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setError('Failed to fetch brands.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim().toLowerCase();

    if (!trimmedName) {
      setError('Brand name cannot be empty.');
      return;
    }

    // Check for duplicate before submitting
    const nameExists = brands.some((brand) => brand.name.toLowerCase() === trimmedName.toLowerCase() && brand._id !== editingId);
    if (nameExists) {
      setError('Brand name already exists.');
      return;
    }

    try {
      if (editingId) {
        await updateBrand(editingId, { name });
      } else {
        await createBrand({ name });
      }
      resetForm();
      loadBrands();
    } catch {
      setError('Error occurred while saving the brand.');
    }
  };

  const handleEdit = (brand) => {
    setEditingId(brand._id);
    setName(brand.name);
    setError('');
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteBrand(deleteId);
        setBrands(brands.filter((brand) => brand._id !== deleteId));
        setShowModal(false);
        setDeleteId(null);
        alert('Brand deleted successfully');
      } catch (error) {
        console.error('Error deleting brand:', error);
        alert('Failed to delete brand: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setName('');
    setEditingId(null);
    setError('');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">{editingId ? 'Edit Brand' : 'Add Brand'}</h2>
      
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg shadow">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Brand Name"
          className="border p-2 w-full rounded"
          required
        />
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingId ? 'Update' : 'Create'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl text-center font-bold mt-6 mb-6">Brands</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-6 py-3 text-left text-gray-600">#</th>
            <th className="border px-6 py-3 text-left text-gray-600">Brand Name</th>
            <th className="border px-6 py-3 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <tr key={brand._id} className="border-b">
              <td className="border px-6 py-3">{index + 1}</td>
              <td className="border px-6 py-3">{brand.name}</td>
              <td className="border px-6 py-3 space-x-2">
                <button onClick={() => handleEdit(brand)}>
                  <FaEdit className="text-blue-500 hover:text-blue-700" />
                </button>
                <button onClick={() => { setDeleteId(brand._id); setShowModal(true); }}>
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
            <p className="text-center text-gray-700 mb-4">Are you sure you want to delete this brand?</p>
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

export default BrandCreate;