import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

// GET /api/admin/holidays
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

    // Get all holidays from the database
    const holidays = await prisma.holiday.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(holidays);
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return NextResponse.json(
      { error: 'Failed to fetch holidays' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/admin/holidays
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorised' },
        { status: 401 }
      );
    }

    // Get holiday data from request body
    const data = await request.json();
    
    // Create new holiday in the database
    const holiday = await prisma.holiday.create({
      data: {
        title: data.title,
        description: data.description,
        destination: data.destination,
        duration: data.duration,
        price: data.price,
        imageUrl: data.imageUrl || null,
        featured: data.featured || false,
        available: data.available || true
      }
    });

    return NextResponse.json(holiday, { status: 201 });
  } catch (error) {
    console.error('Error creating holiday:', error);
    return NextResponse.json(
      { error: 'Failed to create holiday' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 