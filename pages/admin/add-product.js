import { useState } from 'react';

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('image', formData.image);

    const res = await fetch('/api/admin/add-product', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    alert(result.message);
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center"> Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., Classic T-Shirt"
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price (EGP)</label>
          <input
            type="number"
            name="price"
            placeholder="e.g., 199.99"
            step="0.01"
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Write a short description of the product"
            onChange={handleChange}
            required
            rows={4}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded shadow-md transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
