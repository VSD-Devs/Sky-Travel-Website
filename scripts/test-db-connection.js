// Database connection test script for Vercel
const { PrismaClient } = require('@prisma/client');

// Display environment info
const logEnvironmentInfo = () => {
  console.log('=== Environment Information ===');
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`Vercel Env: ${process.env.VERCEL_ENV || 'Not on Vercel'}`);
  
  // Check database URLs (safely - don't log credentials)
  const dbUrlsPresent = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    POSTGRES_PRISMA_URL: !!process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: !!process.env.POSTGRES_URL_NON_POOLING,
  };
  
  console.log('\n=== Database Environment Variables ===');
  Object.entries(dbUrlsPresent).forEach(([key, exists]) => {
    console.log(`${key}: ${exists ? 'Present' : 'Missing'}`);
    
    if (exists) {
      try {
        const url = new URL(process.env[key]);
        console.log(`  - Protocol: ${url.protocol}`);
        console.log(`  - Host: ${url.host}`);
        console.log(`  - Has Username: ${!!url.username}`);
        console.log(`  - Has Password: ${!!url.password}`);
        console.log(`  - Path: ${url.pathname}`);
      } catch (error) {
        console.log(`  - Invalid URL format: ${error.message}`);
      }
    }
  });
};

// Test connecting to the database
const testConnection = async () => {
  try {
    console.log('\n=== Testing Database Connection ===');
    
    // Log the environment first
    logEnvironmentInfo();
    
    // Create a new Prisma client
    const prisma = new PrismaClient({
      errorFormat: 'pretty',
    });
    
    // Try to connect
    console.log('\nAttempting to connect to database...');
    await prisma.$connect();
    console.log('Successfully connected to database! ✓');
    
    // Test a simple query
    console.log('\nExecuting test query...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log(`Query result: ${JSON.stringify(result)}`);
    
    // Disconnect
    await prisma.$disconnect();
    console.log('Disconnected from database');
    
    return true;
  } catch (error) {
    console.error('\n=== DATABASE CONNECTION ERROR ===');
    console.error(`Error type: ${error.name}`);
    console.error(`Error message: ${error.message}`);
    console.error(`Error code: ${error.code}`);
    
    if (error.meta) {
      console.error('Error metadata:', error.meta);
    }
    
    console.error('\nStack trace:');
    console.error(error.stack);
    
    return false;
  }
};

// Run the test if this script is executed directly
if (require.main === module) {
  console.log('Running database connection test...');
  testConnection().then(success => {
    if (success) {
      console.log('\n✓ Database connection test passed!');
      process.exit(0);
    } else {
      console.error('\n✗ Database connection test failed!');
      process.exit(1);
    }
  });
}

module.exports = { testConnection }; 