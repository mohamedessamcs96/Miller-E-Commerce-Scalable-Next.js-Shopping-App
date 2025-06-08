import React, { useContext, useState } from 'react';
import { CartContext } from '@/lib/cart';

export default function CheckoutForm() {
  const { cartItems } = useContext(CartContext);

  const [form, setForm] = useState({
    name: '',
    location: '',
    phone: '',
    screenshot: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, screenshot: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send form data + cartItems to your backend
    console.log('Submitting order:', { ...form, cartItems });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Instapay Screenshot</label>
          <input
            type="file"
            name="screenshot"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Cart Items:</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="list-disc list-inside">
              {cartItems.map((item, i) => (
                <li key={i}>
                  {item.name} - {item.price} EGP {/* adjust as per your product model */}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
