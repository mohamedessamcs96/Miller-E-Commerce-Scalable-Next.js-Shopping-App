// components/Layout.js
import Footer from './Footer';
import Navbar from './Navbar';
import Stats from './Stats' 

export default function Layout({ children, showStats = false }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {showStats && <Stats />}
      <Footer />
    </>
  );
}
