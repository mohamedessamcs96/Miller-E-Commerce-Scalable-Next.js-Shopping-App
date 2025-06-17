// Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Call to Action */}
        <div className="text-center mb-16">
          <h2 className="text-white text-3xl font-bold mb-2">
            Boost your productivity. <br /> Start using our app today.
          </h2>
          <p className="mb-6">
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id
            veniam aliqua proident excepteur commodo do ea.
          </p>
          <button className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition">
            Get started
          </button>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div>
            <h3 className="text-white font-semibold mb-2">Solutions</h3>
            <ul>
              <li>Marketing</li>
              <li>Analytics</li>
              <li>Automation</li>
              <li>Commerce</li>
              <li>Insights</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Support</h3>
            <ul>
              <li>Submit ticket</li>
              <li>Documentation</li>
              <li>Guides</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Company</h3>
            <ul>
              <li>About</li>
              <li>Blog</li>
              <li>Jobs</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Legal</h3>
            <ul>
              <li>Terms of service</li>
              <li>Privacy policy</li>
              <li>License</li>
            </ul>
          </div>
          <div className="flex items-center">
            <span className="text-indigo-400 text-2xl">~</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs">&copy; 2024 Your Company, Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-x-twitter"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
