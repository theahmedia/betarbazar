import { useEffect, useState } from 'react';
import { getSuppliers, deleteSupplier } from '../api/supplierApi';
import { Link } from 'react-router-dom';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (err) {
      setError(`Failed to fetch suppliers: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this supplier?');
    if (!confirmDelete) return;

    try {
      await deleteSupplier(id);
      fetchSuppliers(); // Refresh list after delete
    } catch (err) {
      alert(`Failed to delete supplier: ${err.message}`);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Suppliers</h2>
      <Link to="/add-supplier" className="bg-blue-500 text-white px-4 py-2 rounded">Add Supplier</Link>

      {loading ? (
        <p className="mt-4 text-gray-500">Loading suppliers...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">{error}</p>
      ) : (
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Address</th>
              <th className="p-2">Products</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id} className="border-t">
                <td className="p-2">{supplier.name}</td>
                <td className="p-2">{supplier.email}</td>
                <td className="p-2">{supplier.phone}</td>
                <td className="p-2">{supplier.address}</td>
                <td className="p-2">{supplier.products?.length ? supplier.products.join(', ') : 'No Products'}</td>
                <td className="p-2">
                  <Link to={`/edit-supplier/${supplier._id}`} className="text-blue-500 hover:underline mr-2">Edit</Link>
                  <button 
                    onClick={() => handleDelete(supplier._id)} 
                    className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SupplierList;
