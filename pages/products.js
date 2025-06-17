import ProductCard from '@/components/Product/ProductCard';
import CartDrawer from '@/components/Product/CartDrawer';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import AboutSection from '@/components/Layout/AboutSection';
import Layout from '../components/Layout/Layout';

export default function Products({ products }) {
  return (
   <Layout>
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <CartDrawer />
    </main>
    </Layout>

  );
}

export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token || '';

  try {
    jwt.verify(token, process.env.JWT_SECRET || 'MHMD96essam');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`);

    if (!res.ok) {
      console.error('Failed to fetch products:', res.statusText);
      return { props: { products: [] } };
    }

    const products = await res.json();
    return { props: { products } };
  } catch (err) {
    console.warn('JWT verification failed or error fetching products:', err.message);

    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
}
