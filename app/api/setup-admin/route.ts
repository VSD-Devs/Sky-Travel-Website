import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// This is a temporary route to create an initial admin user
// You should DELETE this file after creating your admin user for security
export async function GET() {
  try {
    // Check if we already have users to prevent creating duplicates
    const existingUser = await prisma.user.findFirst({
      where: {
        email: 'admin@skylimittravels.co.uk',
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Admin user already exists' },
        { status: 200 }
      );
    }

    // Create a secure password
    const hashedPassword = await bcrypt.hash('Password123!', 10);

    // Create the admin user
    const user = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@skylimittravels.co.uk',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    return NextResponse.json(
      { 
        message: 'Admin user created successfully!',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 