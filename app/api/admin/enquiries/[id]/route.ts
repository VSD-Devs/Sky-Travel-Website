import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

// GET single enquiry by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorised' },
        { status: 401 }
      );
    }

    // Get the enquiry by ID
    const enquiry = await prisma.enquiry.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!enquiry) {
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(enquiry);
  } catch (error) {
    console.error('Error fetching enquiry details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enquiry details' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 