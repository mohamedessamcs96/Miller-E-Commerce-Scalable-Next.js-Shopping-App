// components/CheckoutForm.js
import React, { useState, useContext } from 'react';
import { CartContext } from '@/lib/cart';

const CheckoutForm = () => {
  const { cartItems } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    paymentMethod: 'cash',
    screenshot: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'screenshot') {
      setFormData({ ...formData, screenshot: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('phone', formData.phone);
    data.append('paymentMethod', formData.paymentMethod);
    data.append('cartItems', JSON.stringify(cartItems));
    if (formData.paymentMethod === 'instapay' && formData.screenshot) {
      data.append('screenshot', formData.screenshot);
    }

    const res = await fetch('/api/orders', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    alert(result.message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required className="w-full p-2 border rounded" />

      <select name="paymentMethod" onChange={handleChange} value={formData.paymentMethod} className="w-full p-2 border rounded">
        <option value="cash">Cash on Delivery</option>
        <option value="instapay">Instapay</option>
      </select>

      {formData.paymentMethod === 'instapay' && (
        <input type="file" name="screenshot" accept="image/*" onChange={handleChange} className="w-full" />
      )}

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;
