import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Clear the cookie by setting it to empty and expired
  res.setHeader('Set-Cookie', serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0), // Expire the cookie immediately
    sameSite: 'lax',
  }));

  res.status(200).json({ message: 'Logged out successfully' });
}
