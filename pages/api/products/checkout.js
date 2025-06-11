// pages/api/checkout.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, location, phone, screenshot, paymentMethod, items } = req.body;

  //  Simple validation
  if (!name || !location || !phone || !paymentMethod || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Missing required fields or items' });
  }

  try {
    const order = await prisma.order.create({
      data: {
        name,
        location,
        phone,
        screenshot: screenshot || null, // Optional field
        paymentMethod,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity ?? 1, // Default quantity = 1
          })),
        },
      },
      include: { items: true }, // Optional: include items in response
    });

    res.status(200).json({
      message: 'Order created successfully',
      orderId: order.id,
      order,
    });
  } catch (error) {
    console.error(' Checkout error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
