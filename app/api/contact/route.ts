import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { 
      firstName, lastName, email, phone, message, 
      flightDetails, holidayDetails, packageDetails, enquiryType 
    } = body;

    // Validate the required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine enquiry type and prepare data
    let enquiryData: any = {
      firstName,
      lastName,
      email,
      phone: phone || null,
      message,
      status: 'NEW',
      type: 'GENERAL',
    };
    
    // Add specific details based on enquiry type
    if (enquiryType === 'flight' && flightDetails) {
      enquiryData.type = 'FLIGHT';
      enquiryData.flightDetails = JSON.stringify(flightDetails);
    } 
    else if (enquiryType === 'holiday' && holidayDetails) {
      enquiryData.type = 'HOLIDAY';
      enquiryData.holidayDetails = JSON.stringify(holidayDetails);
    }
    else if (enquiryType === 'package' && packageDetails) {
      enquiryData.type = 'PACKAGE';
      enquiryData.packageDetails = JSON.stringify(packageDetails);
    }

    // Store the enquiry in the database
    const enquiry = await prisma.enquiry.create({
      data: enquiryData,
    });

    // Prepare email content based on enquiry type
    let subjectLine = 'New Contact Form Enquiry';
    let detailsHtml = '';
    let detailsText = '';
    
    if (enquiryType === 'flight' && flightDetails) {
      subjectLine = 'New Flight Booking Enquiry';
      detailsHtml = `
        <h3>Flight Details:</h3>
        <table border="0" cellpadding="5" style="border-collapse: collapse;">
          <tr>
            <td><strong>Route:</strong></td>
            <td>${flightDetails.originCity} (${flightDetails.origin}) to ${flightDetails.destinationCity} (${flightDetails.destination})</td>
          </tr>
          <tr>
            <td><strong>Departure Date:</strong></td>
            <td>${new Date(flightDetails.departureDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
          </tr>
          ${flightDetails.returnDate ? `
          <tr>
            <td><strong>Return Date:</strong></td>
            <td>${new Date(flightDetails.returnDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
          </tr>
          ` : ''}
          <tr>
            <td><strong>Airline:</strong></td>
            <td>${flightDetails.airline} ${flightDetails.flightNumber}</td>
          </tr>
          <tr>
            <td><strong>Price:</strong></td>
            <td>£${parseFloat(flightDetails.price).toFixed(2)}</td>
          </tr>
        </table>
      `;
      
      detailsText = `
Flight Details:
Route: ${flightDetails.originCity} (${flightDetails.origin}) to ${flightDetails.destinationCity} (${flightDetails.destination})
Departure Date: ${new Date(flightDetails.departureDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
${flightDetails.returnDate ? `Return Date: ${new Date(flightDetails.returnDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}\n` : ''}
Airline: ${flightDetails.airline} ${flightDetails.flightNumber}
Price: £${parseFloat(flightDetails.price).toFixed(2)}
      `;
    }
    else if (enquiryType === 'holiday' && holidayDetails) {
      subjectLine = 'New Holiday Package Enquiry';
      detailsHtml = `
        <h3>Holiday Package Details:</h3>
        <table border="0" cellpadding="5" style="border-collapse: collapse;">
          <tr>
            <td><strong>Destination:</strong></td>
            <td>${holidayDetails.destination}</td>
          </tr>
          <tr>
            <td><strong>Package:</strong></td>
            <td>${holidayDetails.title}</td>
          </tr>
          <tr>
            <td><strong>Duration:</strong></td>
            <td>${holidayDetails.duration}</td>
          </tr>
          ${holidayDetails.departureDate ? `
          <tr>
            <td><strong>Preferred Departure:</strong></td>
            <td>${holidayDetails.departureDate}</td>
          </tr>
          ` : ''}
          <tr>
            <td><strong>Travelers:</strong></td>
            <td>${holidayDetails.travelers || '2'} Adults</td>
          </tr>
          <tr>
            <td><strong>Price:</strong></td>
            <td>£${holidayDetails.price}</td>
          </tr>
        </table>
      `;
      
      detailsText = `
Holiday Package Details:
Destination: ${holidayDetails.destination}
Package: ${holidayDetails.title}
Duration: ${holidayDetails.duration}
${holidayDetails.departureDate ? `Preferred Departure: ${holidayDetails.departureDate}\n` : ''}
Travelers: ${holidayDetails.travelers || '2'} Adults
Price: £${holidayDetails.price}
      `;
    }
    else if (enquiryType === 'package' && packageDetails) {
      subjectLine = 'New Tour Package Enquiry';
      detailsHtml = `
        <h3>Tour Package Details:</h3>
        <table border="0" cellpadding="5" style="border-collapse: collapse;">
          <tr>
            <td><strong>Package:</strong></td>
            <td>${packageDetails.title}</td>
          </tr>
          <tr>
            <td><strong>Destination:</strong></td>
            <td>${packageDetails.destination}</td>
          </tr>
          <tr>
            <td><strong>Duration:</strong></td>
            <td>${packageDetails.duration}</td>
          </tr>
          <tr>
            <td><strong>Price:</strong></td>
            <td>£${packageDetails.price}</td>
          </tr>
        </table>
      `;
      
      detailsText = `
Tour Package Details:
Package: ${packageDetails.title}
Destination: ${packageDetails.destination}
Duration: ${packageDetails.duration}
Price: £${packageDetails.price}
      `;
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'website@skylimittravels.co.uk',
      to: process.env.EMAIL_TO || 'Flightbookings@skylimittravels.co.uk',
      subject: subjectLine,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        ${detailsText}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New ${enquiryType ? enquiryType.charAt(0).toUpperCase() + enquiryType.slice(1) : ''} Enquiry from Sky Limit Travels Website</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        ${detailsHtml}
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
      message: enquiryType === 'flight' 
        ? 'Thank you for your flight enquiry. Our travel specialists will contact you shortly with more information.'
        : enquiryType === 'holiday'
        ? 'Thank you for your holiday package enquiry. Our travel specialists will contact you shortly with more information.'
        : enquiryType === 'package'
        ? 'Thank you for your tour package enquiry. Our travel specialists will contact you shortly with more information.'
        : 'Thank you for your enquiry. We will contact you shortly.' 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your enquiry. Please try again later.' },
      { status: 500 }
    );
  }
} 