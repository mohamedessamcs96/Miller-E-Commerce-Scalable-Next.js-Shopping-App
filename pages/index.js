import ProductCard from '@/components/Product/ProductCard';
import CartDrawer from '@/components/Product/CartDrawer';  // correct casing

import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import AboutSection from '@/components/Layout/AboutSection';

export default function Home({ products }) {


  return (
    <main>
    <AboutSection />
    </main>
  );
}
