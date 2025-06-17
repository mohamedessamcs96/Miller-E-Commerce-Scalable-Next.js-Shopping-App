import ProductCard from '@/components/Product/ProductCard';
import CartDrawer from '@/components/Product/CartDrawer';  // correct casing
import Layout from '../components/Layout/Layout';
import Stats from '@/components/Layout/Stats';

import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import AboutSection from '@/components/Layout/AboutSection';

export default function Home({ products }) {


  return (
    <Layout showStats={true}>
      <AboutSection />
      <Stats />
    </Layout>
  );
}
