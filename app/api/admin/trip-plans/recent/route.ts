import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get 5 most recent trip plans
    const recentTripPlans = await prisma.tripPlan.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        destination: true,
        customerName: true,
        customerEmail: true,
        departureDate: true,
        returnDate: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(recentTripPlans);
  } catch (error) {
    console.error('Error fetching recent trip plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent trip plans' },
      { status: 500 }
    );
  }
} 