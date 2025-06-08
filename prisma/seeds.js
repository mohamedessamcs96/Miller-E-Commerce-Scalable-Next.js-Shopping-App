const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'Shoes', slug: 'shoes', price: 49.99, image: '/images/shoes.jpg' },
      { name: 'Hat', slug: 'hat', price: 19.99, image: '/images/hat.jpg' },
      { name: 'Backpack', slug: 'backpack', price: 79.99, image: '/images/backpack.jpg' },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
