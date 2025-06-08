import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async (e) => {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth/signin');
  };

  return (
    <nav className="bg-white-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Logo & Navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-10 w-auto"
                src="images/miller.png"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a href="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
                  Home
                </a>
                <a href="/product/my-orders" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                  My Orders
                </a>
                {session && (
                  <>
                    <a href="/product/latest-order" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      Latest Order
                    </a>
                    <a href="/product/history" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      My History
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {session ? (
              // When logged in
              <div className="relative ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="size-8 rounded-full"
                    src={session.user?.image || "https://via.placeholder.com/40"}
                    alt=""
                  />
                </button>
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
                  role="menu"
                >
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                    Your Profile
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                    Settings
                  </a>
                  <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem">
                    Sign out
                  </a>
                </div>
              </div>
            ) : (
              // When NOT logged in
              <>
                <a href="/product/cart" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                  Cart
                </a>
                <a href="/product/aboutme" className="text-sm px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
                  Aboutme
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
