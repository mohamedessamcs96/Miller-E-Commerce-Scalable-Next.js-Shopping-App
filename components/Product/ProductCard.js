// /components/ProductCard.js
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow-md p-4">
     
      <img src={`/uploads/${product.image}`} 
       alt={product.name} className="w-full h-48 object-cover" />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-700">${product.price}</p>
      <Link href={`/product/${product.slug}`} className="text-blue-500 underline mt-2 inline-block">
        View Details
      </Link>
    </div>
  );
}