import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Log all environment variables related to database (sanitized)
    console.log('Database Environment Variables Check:');
    Object.keys(process.env).forEach(key => {
      if (key.includes('DATABASE') || key.includes('POSTGRES')) {
        console.log(`${key}: ${key.includes('PASSWORD') ? '[REDACTED]' : (process.env[key]?.substring(0, 10) + '...')}`)
      }
    });

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
    
    // Test database connection first
    try {
      console.log('Testing database connection...');
      
      // Check if Prisma client is initialized
      if (!prisma) {
        throw new Error('Prisma client is not initialized');
      }
      
      // Try a simple query first
      const testQuery = await prisma.$queryRaw`SELECT 1 as test`;
      console.log('Database connection test result:', testQuery);
      
      // Check if the Enquiry table exists
      try {
        await prisma.$queryRaw`SELECT COUNT(*) FROM "Enquiry"`;
        console.log('Enquiry table exists');
      } catch (tableError) {
        console.error('Enquiry table may not exist:', tableError);
        // We'll continue and let Prisma try to create it
      }
    } catch (connectionError) {
      console.error('Database connection test failed:', connectionError);
      // We'll continue and see if the actual operation works
    }
    
    // Save to database
    try {
      console.log('Attempting to save enquiry...');
      
      // Create a base data object with minimal fields
      const baseData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        status: 'NEW',
        type: data.enquiryType || 'GENERAL'
      };

      // Try to create record
      const savedEnquiry = await prisma.enquiry.create({
        data: {
          ...baseData,
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
      console.error('Error saving enquiry to database:', error);
      console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
      
      return NextResponse.json(
        { 
          error: 'Failed to save your enquiry. Please try again later or contact us by phone.',
          details: error.message || 'Unknown database error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    // Ensure all errors are properly logged
    console.error('Error processing contact form submission:', error);
    console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    
    // Always return a JSON response, even for unexpected errors
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later or contact us by phone.',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 