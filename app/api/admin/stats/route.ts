import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorised' },
        { status: 401 }
      );
    }

    // Get enquiry stats
    let totalEnquiries = 0;
    let newEnquiries = 0;
    let totalHolidays = 0;

    try {
      // Count all enquiries
      totalEnquiries = await prisma.enquiry.count();
      
      // Count new enquiries
      newEnquiries = await prisma.enquiry.count({
        where: {
          status: 'NEW'
        }
      });
      
      // Count all holidays
      totalHolidays = await prisma.holiday.count();
    } catch (dbError) {
      console.error('Database error when fetching stats:', dbError);
      // Continue with zeros instead of failing completely
    }

    return NextResponse.json({
      totalEnquiries,
      newEnquiries,
      totalHolidays
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    // Return zeros instead of error to prevent frontend crashes
    return NextResponse.json({
      totalEnquiries: 0,
      newEnquiries: 0,
      totalHolidays: 0
    });
  }
} 