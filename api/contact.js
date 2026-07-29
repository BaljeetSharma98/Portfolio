import { MongoClient } from 'mongodb';
import { Resend } from 'resend';

const client = new MongoClient(process.env.MONGODB_URI);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Basic server-side validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Connect to MongoDB Atlas and save message
    await client.connect();
    const db = client.db('portfolio');
    const messagesCollection = db.collection('messages');

    const result = await messagesCollection.insertOne({
      name,
      email,
      subject: subject || 'No Subject',
      message,
      createdAt: new Date(),
    });

    // 2. Dispatch email notification via Resend
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Replace with your verified domain in production
      to: process.env.MY_EMAIL,
      subject: `New Transmission: ${subject || 'Contact Form'}`,
      html: `
        <h3>New Message Received from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <small>Database Record ID: ${result.insertedId}</small>
      `,
    });

    return res.status(200).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Transmission Error:', error);
    return res.status(500).json({ error: 'Failed to process transmission' });
  } finally {
    await client.close();
  }
}