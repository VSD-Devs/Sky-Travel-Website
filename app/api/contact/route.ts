import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Validate request content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    let data;
    try {
      data = await request.json();
    } catch (error) {
      console.error('Error parsing request JSON:', error);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    console.log('Contact form submission received:', { 
      ...data, 
      message: data.message?.substring(0, 50) + '...',
      timestamp: new Date().toISOString()
    });
    
    // Validate the required fields
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Save to database
    try {
      // Create a base data object with fields that are definitely in the schema
      const baseData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        status: 'NEW'
      };

      // Try to create with all fields first
      try {
        const savedEnquiry = await prisma.enquiry.create({
          data: {
            ...baseData,
            type: data.enquiryType || 'GENERAL',
            flightDetails: data.flightDetails ? JSON.stringify(data.flightDetails) : null,
            holidayDetails: data.holidayDetails ? JSON.stringify(data.holidayDetails) : null,
            packageDetails: data.packageDetails ? JSON.stringify(data.packageDetails) : null,
          }
        });
        
        console.log('Enquiry saved to database with ID:', savedEnquiry.id);
        
        // Return success response
        return NextResponse.json({
          success: true,
          message: 'Thank you for your enquiry. We will contact you shortly.',
          enquiryId: savedEnquiry.id
        });
      } catch (error) {
        // If it fails, try with just the base fields
        console.error('Error with full schema, trying minimal schema:', error);
        
        const fallbackEnquiry = await prisma.enquiry.create({
          data: baseData
        });
        
        console.log('Enquiry saved with minimal schema, ID:', fallbackEnquiry.id);
        
        // Return success response
        return NextResponse.json({
          success: true,
          message: 'Thank you for your enquiry. We will contact you shortly.',
          enquiryId: fallbackEnquiry.id
        });
      }
    } catch (error) {
      console.error('Error saving enquiry to database:', error);
      return NextResponse.json(
        { 
          error: 'Failed to save your enquiry. Please try again later or contact us by phone.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }
  } catch (error) {
    // Ensure all errors are properly logged
    console.error('Error processing contact form submission:', error);
    
    // Always return a JSON response, even for unexpected errors
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later or contact us by phone.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
} 