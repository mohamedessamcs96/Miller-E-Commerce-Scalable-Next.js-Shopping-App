import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/pages/products/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-2 mb-2">
            <h2 className="font-semibold">Order #{order.id}</h2>
            <p>Name: {order.name}</p>
            <p>Phone: {order.phone}</p>
            <p>Payment: {order.paymentMethod}</p>
            <p>Items:</p>
            <ul className="list-disc list-inside">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity} (${item.price})
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
