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

    // Get 5 most recent enquiries
    const recentEnquiries = await prisma.enquiry.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(recentEnquiries);
  } catch (error) {
    console.error('Error fetching recent enquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent enquiries' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 