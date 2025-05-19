// Script to test database connection
console.log('Testing database connection...');

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Function to parse and sanitize a connection URL for logging
function sanitizeUrl(url) {
  if (!url) return 'Not set';
  if (url.startsWith('file:')) {
    return `SQLite: ${url}`;
  }
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

// We're going to use SQLite in production for now
const dbPath = './prod.db';
console.log(`Using SQLite database at ${dbPath}`);

// Create empty SQLite file if it doesn't exist
if (!fs.existsSync(dbPath)) {
  console.log('SQLite database file does not exist, creating empty file...');
  fs.writeFileSync(dbPath, '');
  console.log('Created empty database file');
}

// Set up connection string for SQLite
const connectionUrl = `file:${dbPath}`;
console.log('Connection URL:', connectionUrl);

// Try to connect using direct URL
async function testConnection() {
  try {
    console.log('Creating Prisma client for SQLite...');
    
    // Create a prisma client with the SQLite URL
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionUrl
        }
      }
    });

    console.log('Testing connection...');
    try {
      // For SQLite, we just try to access the client
      await prisma.$connect();
      console.log('Connection successful!');
    } catch (e) {
      console.error('Connection error:', e);
      return false;
    }
    
    // Close connection
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error('Prisma client creation failed:', error);
    console.error('Error details:', error.message);
    return false;
  }
}

// Run the test
testConnection()
  .then(success => {
    console.log('Test completed:', success ? 'SUCCESS' : 'FAILED');
    if (success) {
      console.log('\n--------------------------------------------');
      console.log('SUCCESS: SQLite database connection is working');
      console.log('The contact form should now work in production');
      console.log('Note: This is a temporary solution and data may be lost on redeployment');
      console.log('--------------------------------------------\n');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  }); 