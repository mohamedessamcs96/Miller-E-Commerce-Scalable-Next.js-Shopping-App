// pages/cart.js
import { useContext, useState } from 'react';
import { CartContext } from '@/lib/cart';
import axios from 'axios';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [checkoutStatus, setCheckoutStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/products/checkout', {
        name: 'Customer Name',
        location: 'Some Address',
        phone: '0123456789',
        screenshot: 'screenshot-url-or-null',
        paymentMethod: 'Cash',
        items: cartItems,
      });

      setCheckoutStatus(' Order placed successfully!');
      clearCart();
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutStatus(' Error placing order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">
              Total: ${cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2)}
            </p>
            <button
              onClick={clearCart}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            >
              Clear Cart
            </button>
          </div>

          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg"
              >
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  {item.quantity && (
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  )}
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full text-lg font-medium"
            >
              {loading ? 'Processing...' : 'Checkout'}
            </button>
            {checkoutStatus && (
              <p className="mt-3 text-center text-sm text-gray-700">{checkoutStatus}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
