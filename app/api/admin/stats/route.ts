import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

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

    // Get counts from database
    const [totalEnquiries, newEnquiries, totalHolidays] = await Promise.all([
      prisma.enquiry.count(),
      prisma.enquiry.count({
        where: {
          status: 'NEW'
        }
      }),
      prisma.holiday.count()
    ]);

    return NextResponse.json({
      totalEnquiries,
      newEnquiries,
      totalHolidays
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 