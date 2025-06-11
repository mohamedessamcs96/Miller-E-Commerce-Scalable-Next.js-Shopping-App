import React, { useState, useContext } from 'react';
import { CartContext } from '@/lib/cart';
import { useRouter } from 'next/router';


const CheckoutForm = () => {
  const router = useRouter();

  const { cartItems, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    paymentMethod: 'cash',
    screenshot: null,
  });
  const [loading, setLoading] = useState(false);

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

    if (cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('phone', formData.phone);
    data.append('paymentMethod', formData.paymentMethod);
    data.append('cartItems', JSON.stringify(cartItems));

    if (formData.paymentMethod === 'instapay' && formData.screenshot) {
      data.append('screenshot', formData.screenshot);
    }

    setLoading(true);
    try {
          const res = await fetch('/api/products/order', {
      method: 'POST',
      body: data,
    });



      const result = await res.json();
      alert(result.message);

      if (res.ok) {
        // Clear form and cart if successful
        setFormData({
          name: '',
          location: '',
          phone: '',
          paymentMethod: 'cash',
          screenshot: null,
        });
        clearCart?.(); // if you have a clearCart function in context

        // setFormData({ ... });
        router.push('/product/success'); 


      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
 <form 
  onSubmit={handleSubmit}
  className="space-y-4 max-w-md mx-auto p-4 bg-white shadow rounded"
>
  <h2 className="text-xl font-bold mb-4">Checkout</h2>

  <input
    type="text"
    name="name"
    placeholder="Name"
    onChange={handleChange}
    value={formData.name}
    required
    className="w-full p-2 border rounded"
  />
  <input
    type="text"
    name="location"
    placeholder="Location"
    onChange={handleChange}
    value={formData.location}
    required
    className="w-full p-2 border rounded"
  />
  <input
    type="text"
    name="phone"
    placeholder="Phone"
    onChange={handleChange}
    value={formData.phone}
    required
    className="w-full p-2 border rounded"
  />

  <select
    name="paymentMethod"
    onChange={handleChange}
    value={formData.paymentMethod}
    className="w-full p-2 border rounded"
  >
    <option value="cash">Cash on Delivery</option>
    <option value="instapay">Instapay</option>
  </select>

  {formData.paymentMethod === 'instapay' && (
    <input
      type="file"
      name="screenshot"
      accept="image/*"
      onChange={handleChange}
      className="w-full"
    />
  )}

  <button  
    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    type="submit"
    disabled={loading}
  >
    {loading ? 'Placing Order...' : 'Place Order'}
  </button>
</form>

  );
};

export default CheckoutForm;
