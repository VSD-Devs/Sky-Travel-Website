/**
 * Direct admin password reset for production
 * This script takes the Supabase database URL as a command line argument
 */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function resetAdminPasswordOnProd(connectionString) {
  if (!connectionString) {
    console.error('Usage: node production-reset-admin.js "postgresql://YOUR_SUPABASE_CONNECTION_STRING"');
    process.exit(1);
  }

  console.log('Resetting admin password directly on production database...');
  
  const password = 'Admin123!'; // Default admin password
  const email = 'admin@skylimittravels.co.uk';
  
  // Generate a fresh bcrypt hash
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Generated hash:', hashedPassword);
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: connectionString
      }
    }
  });
  
  try {
    await prisma.$connect();
    console.log('Connected to database ✓');
    
    // Check if admin user exists
    const adminUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (adminUser) {
      // Update existing admin
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword }
      });
      console.log(`Updated password for user: ${email}`);
    } else {
      // Create admin if doesn't exist
      await prisma.user.create({
        data: {
          name: 'Admin',
          email,
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      console.log(`Created new admin user: ${email}`);
    }
    
    console.log('');
    console.log('🎉 Admin password reset successfully!');
    console.log('Login with:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  } catch (error) {
    console.error('Error resetting admin password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get the connection string from command line argument
const connectionString = process.argv[2];
resetAdminPasswordOnProd(connectionString); 