import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth'; // if using next-auth
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userEmail = session.user.email;

    // Find orders made by the logged-in user
    const orders = await prisma.order.findMany({
      where: { user: { email: userEmail } },
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });

    res.status(200).json(orders);
  } catch (err) {
    console.error('Order API Error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
