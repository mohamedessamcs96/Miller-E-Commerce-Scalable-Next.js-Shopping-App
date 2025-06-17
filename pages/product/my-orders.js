import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/orders`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error('Expected an array, got:', data);
        }
      })
      .catch((err) => console.error('Fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading your orders...</p>;

  return (
   <Layout >
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 p-4 rounded-xl mb-4 shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold text-green-700">
              Order #{order.id}
            </h2>
            <p className="text-gray-800">Name: {order.name}</p>
            <p className="text-gray-800">Phone: {order.phone}</p>
            <p className="text-gray-800">Payment: {order.paymentMethod}</p>

            <div className="mt-4">
              <h3 className="font-medium text-gray-700 mb-1">Items:</h3>
              <ul className="list-disc list-inside space-y-1">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity} — <span className="text-sm text-gray-500">EGP {item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
    </Layout>
  );
}
