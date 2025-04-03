import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, deleteProduct } from "../services/api";
import { Link } from "react-router-dom";

const ProductList = () => {
  const queryClient = useQueryClient();
  const { data: products, isLoading } = useQuery(["products"], fetchProducts);

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/add-product" className="px-4 py-2 bg-blue-500 text-white rounded">Add Product</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <img src={`${import.meta.env.VITE_API_URL}/${product.image}`} alt={product.productName} className="w-full h-40 object-cover" />
            <h2 className="text-lg font-semibold mt-2">{product.productName}</h2>
            <p className="text-gray-600">Price: ${product.sellPrice}</p>
            <div className="flex justify-between mt-2">
              <Link to={`/edit-product/${product._id}`} className="text-blue-500">Edit</Link>
              <button className="text-red-500" onClick={() => deleteMutation.mutate(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
