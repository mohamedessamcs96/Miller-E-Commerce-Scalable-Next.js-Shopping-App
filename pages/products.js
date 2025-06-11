import ProductCard from '@/components/Product/ProductCard';
import CartDrawer from '@/components/Product/CartDrawer';  // correct casing

import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import AboutSection from '@/components/Layout/AboutSection';

export default function Products({ products }) {


  return (
  
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
     
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
       
      ))}
       <CartDrawer />
       
       </main>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token || '';

  try {
    // Verify JWT token, replace secret accordingly
    jwt.verify(token, process.env.JWT_SECRET || 'MHMD96essam');

    // Fetch products only if authenticated
    const res = await fetch('http://localhost:3000/api/products');
    if (!res.ok) {
      return { props: { products: [] } };
    }
    const products = await res.json();

    return { props: { products } };
  } catch (err) {
    // Redirect to login if token invalid or missing
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
}
