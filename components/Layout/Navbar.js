import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { CartContext } from '@/lib/cart';
import Image from 'next/image';
import Link from 'next/link';


export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const { cartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price), 0);


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
                src="/images/miller.png"
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
                <a onClick={() => setIsOpen(true)}   className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                              

                  Cart
                </a>
                <a href="/miller/contactus" className="text-sm px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
                  Contact Us
                </a>
                <a onClick={handleLogout} className="text-sm px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
                  logout
                </a>
              </>
              
            )}
          </div>
        </div>
      </div>
      {/* 
      
      Cart 

      
      */}
    <div className="relative">
      {isOpen && (
        <div className="relative z-10" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900" id="drawer-title">Shopping cart</h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Close panel</span>
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((item, index) => (
                              <li key={index} className="flex py-6">
                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{item.name}</h3>
                                      <p className="ml-4">${Number(item.price).toFixed(2)}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty 1</p>
                                    <div className="flex">
                                      <button className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Link
                          href="/product/checkout"
                          className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setIsOpen(false)}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
      
    </nav>
   
  );
 
}
