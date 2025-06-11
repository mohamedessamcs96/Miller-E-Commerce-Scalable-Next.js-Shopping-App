// components/Success.js
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-600">Order Placed Successfully!</h1>
        <p className="mt-4 text-gray-700">Thank you for your purchase. Your items will be on their way shortly.</p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Success;
