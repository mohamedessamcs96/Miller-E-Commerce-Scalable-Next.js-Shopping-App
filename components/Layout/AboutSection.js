'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Welcome to <span className="text-blue-600">Miller</span> E-commerce
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Shop smarter, faster, and better. Miller is your all-in-one destination for modern online shopping
            experiences — secure, stylish, and seamless.
          </p>
          <p className="text-gray-500 mb-8">
            Built with cutting-edge tech like <strong>Next.js</strong>, <strong>Stripe</strong>, and{" "}
            <strong>Tailwind CSS</strong>, we deliver performance and reliability with every click.
          </p>
          <a
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-md"
          >
            Explore Our Products
          </a>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <img
            src="/images/mainimage.jpg"
            alt="Miller E-commerce Preview"
            className="rounded-3xl shadow-xl w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
