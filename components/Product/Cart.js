// pages/cart.js
import { useContext } from 'react';
import { CartContext } from '@/lib/cart';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">🛒 Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link href="/product" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Browse Products
        </Link>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">🛍️ Your Cart</h1>

      <div className="space-y-6">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 bg-white p-4 shadow-md rounded-lg transition hover:shadow-lg"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
              <p className="text-gray-600">
                Price: <span className="font-medium">${item.price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-t pt-6">
        <div className="text-2xl font-semibold text-gray-800">Total: ${totalPrice.toFixed(2)}</div>
        <Link
          href="/product/checkout"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
