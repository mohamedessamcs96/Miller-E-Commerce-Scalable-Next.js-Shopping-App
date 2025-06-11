import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), '/public/uploads');
  form.keepExtensions = true;

  if (!fs.existsSync(form.uploadDir)) {
    fs.mkdirSync(form.uploadDir, { recursive: true });
  }

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Formidable parse error:', err);
      return res.status(500).json({ message: 'Form parse error' });
    }

    try {
      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const location = Array.isArray(fields.location) ? fields.location[0] : fields.location;
      const phone = Array.isArray(fields.phone) ? fields.phone[0] : fields.phone;
      const paymentMethod = Array.isArray(fields.paymentMethod) ? fields.paymentMethod[0] : fields.paymentMethod;
      const cartItemsRaw = Array.isArray(fields.cartItems) ? fields.cartItems[0] : fields.cartItems;

      if (!cartItemsRaw) {
        return res.status(400).json({ message: 'Cart is empty or missing' });
      }

      const items = JSON.parse(cartItemsRaw);
      let screenshotPath = null;

      if (paymentMethod === 'instapay' && files.screenshot) {
        const screenshotFile = Array.isArray(files.screenshot) ? files.screenshot[0] : files.screenshot;
        screenshotPath = `/uploads/${screenshotFile.newFilename}`;
      }

      const order = await prisma.order.create({
        data: {
          name,
          location,
          phone,
          paymentMethod,
          screenshot: screenshotPath,
          items: {
            create: items.map((item) => ({
              productId: item.id,
              name: item.name,
              price: parseFloat(item.price),
              quantity: item.quantity || 1,
            })),
          },
        },
      });

      console.log(' Order created:', order);
      return res.status(201).json({ message: 'Order created', order });
    } catch (error) {
      console.error(' Error creating order:', error);
      return res.status(500).json({ message: 'Error creating order' });
    }
  });
}
