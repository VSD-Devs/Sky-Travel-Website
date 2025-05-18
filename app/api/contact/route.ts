import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { transporter, mailOptions } from '@/lib/nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Contact form submission received:', { ...data, message: data.message?.substring(0, 50) + '...' });
    
    // Validate the required fields
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    let savedEnquiry = null;
    let dbError = null;
    
    // Try to save to database but don't fail the whole request if this fails
    try {
      // Save to database
      savedEnquiry = await prisma.enquiry.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || null,
          message: data.message,
          type: data.enquiryType || 'GENERAL',
          flightDetails: data.flightDetails ? JSON.stringify(data.flightDetails) : null,
          holidayDetails: data.holidayDetails ? JSON.stringify(data.holidayDetails) : null,
          packageDetails: data.packageDetails ? JSON.stringify(data.packageDetails) : null,
          status: 'NEW'
        }
      });
      
      console.log('Enquiry saved to database with ID:', savedEnquiry.id);
    } catch (error) {
      console.error('Error saving enquiry to database:', error);
      dbError = error;
      // Continue with email sending even if database fails
    }
    
    // Prepare email content
    const emailContent = `
      New Enquiry from Website Contact Form
      -----------------------------------
      Name: ${data.firstName} ${data.lastName}
      Email: ${data.email}
      Phone: ${data.phone || 'Not provided'}
      Type: ${data.enquiryType || 'General Enquiry'}
      
      Message:
      ${data.message}
      
      ${data.flightDetails ? `Flight Details: ${JSON.stringify(data.flightDetails, null, 2)}` : ''}
      ${data.holidayDetails ? `Holiday Details: ${JSON.stringify(data.holidayDetails, null, 2)}` : ''}
      ${data.packageDetails ? `Package Details: ${JSON.stringify(data.packageDetails, null, 2)}` : ''}
    `;
    
    // Send email notification
    let emailError = null;
    try {
      if (process.env.NODE_ENV === 'production') {
        await transporter.sendMail({
          ...mailOptions,
          subject: `New Enquiry: ${data.enquiryType || 'General'} - ${data.firstName} ${data.lastName}`,
          text: emailContent,
        });
        console.log('Email notification sent successfully');
      } else {
        console.log('Development mode: Skipping email sending');
        console.log('Email would have contained:', emailContent.substring(0, 200) + '...');
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
      emailError = error;
      
      // If both database and email failed, return error
      if (dbError) {
        return NextResponse.json(
          { error: 'Failed to process your enquiry. Please try again later.' },
          { status: 500 }
        );
      }
      
      // If only email failed but database succeeded, we can continue
    }
    
    // Return success even if some parts failed but not all
    return NextResponse.json({
      success: true,
      message: 'Thank you for your enquiry. We will contact you shortly.',
      enquiryId: savedEnquiry?.id || 'not-saved',
      dbSuccess: !dbError,
      emailSuccess: !emailError
    });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process your enquiry. Please try again later.' },
      { status: 500 }
    );
  }
} 