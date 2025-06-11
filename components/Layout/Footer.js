export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} My Next App. All rights reserved.</p>
        <p className="text-sm mt-2">Built with ❤️ using Next.js and Stripe.</p>
      </div>
    </footer>
  );
}