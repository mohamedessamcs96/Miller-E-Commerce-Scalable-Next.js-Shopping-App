import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '@/lib/cart';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    name: '',
    location: '',
    phone: '',
    paymentMethod: 'cash',
    screenshot: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, screenshot: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setLoading(true);

    const orderData = {
      name: form.name,
      location: form.location,
      phone: form.phone,
      paymentMethod: form.paymentMethod,
      screenshot: form.screenshot,
      items: cartItems,
    };

    try {
      const res = await fetch('/api/products/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        await router.push('/success');
        clearCart(); // Clear cart after successful redirect
      } else {
        const error = await res.json();
        alert(error.message || 'Failed to place order.');
        console.error(error);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            name="location"
            value={form.location}
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            name="phone"
            value={form.phone}
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Payment Method</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="cash">Cash</option>
            <option value="instapay">Instapay</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Screenshot (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
