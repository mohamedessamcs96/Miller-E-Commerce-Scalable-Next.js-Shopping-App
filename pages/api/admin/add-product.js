import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

const generateSlug = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'public/uploads'),
    keepExtensions: true,
    multiples: false,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ message: 'Upload failed.' });

    try {
      const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
      const imagePath = imageFile.newFilename;
      const imageUrl = `/uploads/${imagePath}`;

      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const price = parseFloat(Array.isArray(fields.price) ? fields.price[0] : fields.price);
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const slug = generateSlug(name);

      await prisma.product.create({
        data: {
          name,
          slug,
          price,
          image: imageUrl,
          description,
        },
      });

      res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
}
