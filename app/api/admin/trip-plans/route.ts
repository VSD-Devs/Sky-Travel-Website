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

    // Get all trip plans, ordered by creation date (newest first)
    const tripPlans = await prisma.tripPlan.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(tripPlans);
  } catch (error) {
    console.error('Error fetching trip plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trip plans' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.destination || !data.customerName || !data.customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new trip plan
    const tripPlan = await prisma.tripPlan.create({
      data: {
        destination: data.destination,
        tripType: data.tripType || 'HOLIDAY',
        departureDate: new Date(data.departureDate),
        returnDate: new Date(data.returnDate),
        adults: data.adults || 1,
        children: data.children || 0,
        infants: data.infants || 0,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        status: data.status || 'PENDING',
        notes: data.notes,
        assignedTo: data.assignedTo,
      },
    });

    return NextResponse.json(tripPlan, { status: 201 });
  } catch (error) {
    console.error('Error creating trip plan:', error);
    return NextResponse.json(
      { error: 'Failed to create trip plan' },
      { status: 500 }
    );
  }
} 