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
      console.error(err);
      return res.status(500).json({ message: 'Form parse error' });
    }

    try {
      const { name, location, phone, paymentMethod, cartItems } = fields;
      let screenshotPath = null;

      // Only process screenshot if payment method is instapay
      if (paymentMethod === 'instapay' && files.screenshot) {
        const screenshotFile = files.screenshot;
        screenshotPath = `/uploads/${screenshotFile.newFilename}`;
      }

      const items = JSON.parse(cartItems);

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

      res.status(201).json({ message: 'Order created', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating order' });
    }
  });
}
