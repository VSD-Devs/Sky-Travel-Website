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

    // Get total count of trip plans
    const totalTripPlans = await prisma.tripPlan.count();

    // Get count of pending trip plans
    const pendingTripPlans = await prisma.tripPlan.count({
      where: {
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      totalTripPlans,
      pendingTripPlans,
    });
  } catch (error) {
    console.error('Error fetching trip plan stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trip plan statistics' },
      { status: 500 }
    );
  }
} 