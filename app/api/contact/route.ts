import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;

    // Validate the required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store the enquiry in the database
    const enquiry = await prisma.enquiry.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        message,
        status: 'NEW',
      },
    });

    // Configure email transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'website@skylimittravels.co.uk',
      to: process.env.EMAIL_TO || 'Flightbookings@skylimittravels.co.uk',
      subject: 'New Contact Form Enquiry',
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Enquiry from Sky Limit Travels Website</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    // Comment this out in development unless you have email credentials set up
    // await transporter.sendMail(mailOptions);

    // Return a success response
    return NextResponse.json({ 
      success: true,
      message: 'Thank you for your enquiry. We will contact you shortly.' 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your enquiry. Please try again later.' },
      { status: 500 }
    );
  }
} 