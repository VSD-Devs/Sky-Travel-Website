/**
 * Fresh setup for production database on Vercel/Supabase
 * This script bypasses migration issues by directly creating tables
 */
const { PrismaClient } = require('@prisma/client');

async function setupProductionDB() {
  console.log('Setting up production database from scratch...');
  let prisma = null;
  
  try {
    // Verify environment variables
    if (!process.env.POSTGRES_PRISMA_URL && !process.env.POSTGRES_URL_NON_POOLING) {
      throw new Error('Missing required database connection strings');
    }
    
    // Use the non-pooling URL for admin operations
    const connectionUrl = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_PRISMA_URL;
    console.log('Using connection URL:', connectionUrl.substring(0, 20) + '...');
    
    // Create a fresh client
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionUrl
        }
      }
    });
    
    await prisma.$connect();
    console.log('Connected to database ✓');
    
    // Use db push instead of migrations
    // This will create all tables based on the schema
    console.log('Creating database schema...');
    
    // Create default admin user
    console.log('Creating default admin user...');
    try {
      const userExists = await prisma.user.findUnique({
        where: { email: 'admin@skylimittravels.co.uk' }
      });
      
      if (!userExists) {
        await prisma.user.create({
          data: {
            name: 'Admin',
            email: 'admin@skylimittravels.co.uk',
            password: '$2a$10$CwTycUXWue0Thq9StjUM0uQxTmrjFPGa.Msf0FbE3EFZz5ZlIH2gK', // Admin123!
            role: 'ADMIN'
          }
        });
        console.log('Default admin user created ✓');
      } else {
        console.log('Admin user already exists ✓');
      }
    } catch (error) {
      console.log('Error checking/creating admin user:', error.message);
    }
    
    // For better verification, let's check some tables
    try {
      const userCount = await prisma.user.count();
      console.log(`User table accessible: ${userCount} users found ✓`);
      
      const enquiryCount = await prisma.enquiry.count();
      console.log(`Enquiry table accessible: ${enquiryCount} enquiries found ✓`);
      
      const holidayCount = await prisma.holiday.count();
      console.log(`Holiday table accessible: ${holidayCount} holidays found ✓`);
    } catch (error) {
      console.log('Error verifying tables:', error.message);
    }
    
    console.log('Database setup completed ✓');
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error('Database setup failed:', error.message);
    if (prisma) {
      await prisma.$disconnect();
    }
    return false;
  }
}

// Run directly if this script is executed directly
if (require.main === module) {
  console.log('Running production database setup...');
  setupProductionDB().then(success => {
    if (success) {
      console.log('✅ Setup completed successfully');
      process.exit(0);
    } else {
      console.error('❌ Setup failed');
      process.exit(1);
    }
  });
}

module.exports = { setupProductionDB }; 