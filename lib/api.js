// /lib/api.js - Simulated backend API
const mockProducts = [
  { id: 1, name: 'Shoes', slug: 'shoes', price: 49.99, image: '/images/shoes.jpg' },
  { id: 2, name: 'Hat', slug: 'hat', price: 19.99, image: '/images/hat.jpg' },
  { id: 3, name: 'Backpack', slug: 'backpack', price: 79.99, image: '/images/backpack.jpg' },
];

export async function getAllProducts() {
  return mockProducts;
}

export async function getProductBySlug(slug) {
  return mockProducts.find((product) => product.slug === slug);
}
