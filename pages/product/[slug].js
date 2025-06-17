import { useContext } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '@/lib/cart';
import { PrismaClient } from '@prisma/client';

export default function Product({ product }) {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    router.push('/product/cart');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="w-full">
          <img
            src={`/uploads/${product.image}`}
            alt={product.name}
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-6">${product.price}</p>
          <p className="text-gray-700 mb-6">
            {product.description || "No description available."}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const prisma = new PrismaClient();
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    return { notFound: true };
  }

  return { props: { product } };
}
