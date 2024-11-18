import formidable from 'formidable';
import fs from 'fs';
import clientPromise from '@/lib/mongodb';

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser as we're using Formidable for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        return res.status(500).json({ success: false, message: 'Error parsing form data' });
      }

      const { email, companyName, phone, contactMethod, description, services } = fields;
      const pdfFile = files.pdfFile ? files.pdfFile[0] : null; // Ensure pdfFile exists

      if (!pdfFile) {
        return res.status(400).json({ success: false, message: 'Please upload a PDF file.' });
      }

      const data = {
        email,
        companyName,
        phone,
        contactMethod,
        description,
        services: services ? services.join(", ") : "", // Ensure services are an array
        pdfFile: {
          filename: pdfFile.originalFilename,
          path: pdfFile.filepath,
        },
      };

      try {
        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db('mydatabase'); // Replace with your DB name
        const collection = db.collection('formdata');

        // Insert the form data into the database
        const result = await collection.insertOne(data);
        console.log("Form data inserted:", result);

        // Respond with success
        res.status(200).json({ success: true, message: 'Form submitted successfully!' });
      } catch (error) {
        console.error('Database error:', error); // More detailed logging
        res.status(500).json({ success: false, message: 'Database error' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
