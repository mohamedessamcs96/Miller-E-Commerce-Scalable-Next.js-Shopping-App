// /pages/_app.js
import '@/styles/globals.css';
import { CartProvider } from '@/lib/cart';
import Layout from '../components/Layout/Layout';
import { SessionProvider } from 'next-auth/react';



//React Context
export default function App({ Component, pageProps: { session, ...pageProps } }) {
 return (
    <SessionProvider session={session}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </SessionProvider>
  );
}
