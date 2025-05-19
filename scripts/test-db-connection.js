// Script to test Supabase database connection
console.log('Testing Supabase database connection...');

const { PrismaClient } = require('@prisma/client');

// Function to parse and sanitize a connection URL for logging
function sanitizeUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return {
      protocol: parsedUrl.protocol,
      host: parsedUrl.host,
      username: parsedUrl.username ? '[PRESENT]' : '[MISSING]',
      password: parsedUrl.password ? '[PRESENT]' : '[MISSING]',
      pathname: parsedUrl.pathname,
      search: parsedUrl.search
    };
  } catch (e) {
    return 'Invalid URL format';
  }
}

// Print environment information
console.log('Environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
if (process.env.POSTGRES_PRISMA_URL) {
  console.log('POSTGRES_PRISMA_URL:', sanitizeUrl(process.env.POSTGRES_PRISMA_URL));
} else {
  console.log('POSTGRES_PRISMA_URL: [NOT SET]');
}

if (process.env.POSTGRES_URL_NON_POOLING) {
  console.log('POSTGRES_URL_NON_POOLING:', sanitizeUrl(process.env.POSTGRES_URL_NON_POOLING));
} else {
  console.log('POSTGRES_URL_NON_POOLING: [NOT SET]');
}

if (process.env.DATABASE_URL) {
  console.log('DATABASE_URL:', sanitizeUrl(process.env.DATABASE_URL));
} else {
  console.log('DATABASE_URL: [NOT SET]');
}

// Map of available connection variables
const connectionVars = [
  'POSTGRES_PRISMA_URL',
  'POSTGRES_URL_NON_POOLING',
  'POSTGRES_URL',
  'DATABASE_URL',
  'SUPABASE_URL'
];

// Find first available connection string
let connectionUrl = null;
for (const varName of connectionVars) {
  if (process.env[varName]) {
    connectionUrl = process.env[varName];
    console.log(`Using ${varName} for connection`);
    break;
  }
}

if (!connectionUrl) {
  console.error('No database connection URL found in environment variables!');
  process.exit(1);
}

// Try to connect using direct URL
async function testConnection() {
  try {
    console.log('Creating Prisma client...');
    
    // Create a prisma client with the direct URL
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionUrl
        }
      }
    });

    console.log('Testing connection...');
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test;`;
    console.log('Connection successful! Result:', result);
    
    // Try to get table information
    try {
      console.log('Checking if Enquiry table exists...');
      const tables = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`;
      console.log('Tables in database:', tables);
      
      const hasEnquiryTable = tables.some(t => t.table_name === 'Enquiry');
      if (hasEnquiryTable) {
        console.log('Enquiry table exists');
      } else {
        console.log('Enquiry table does not exist, will need to be created');
      }
    } catch (tableError) {
      console.error('Error checking tables:', tableError);
    }
    
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error('Connection failed:', error);
    console.error('Error details:', error.message);
    
    if (error.message.includes('Tenant or user not found')) {
      console.error('\n--------------------------------------------');
      console.error('AUTHENTICATION ERROR: The database username/password is incorrect');
      console.error('Please check your Supabase credentials and update the environment variables');
      console.error('--------------------------------------------\n');
    }
    
    return false;
  }
}

// Run the test
testConnection()
  .then(success => {
    console.log('Test completed:', success ? 'SUCCESS' : 'FAILED');
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  }); 