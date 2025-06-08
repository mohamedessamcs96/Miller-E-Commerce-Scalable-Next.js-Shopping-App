// pages/cart.js
import { useContext } from 'react';
import { CartContext } from '@/lib/cart';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty 🛒</h1>
        <p className="text-gray-600">Add some products to see them here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-6">
        {cartItems.map((item, index) => (
          <div key={index} className="flex gap-6 items-center bg-white p-4 shadow-md rounded-lg">
            <Image src={item.image} alt={item.name} width={100} height={100} className="rounded" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
