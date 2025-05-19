import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Log database connection info (sanitized)
const logDatabaseInfo = () => {
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    console.log('Database configuration check:');
    // Check if we have Supabase-specific environment variables
    const hasSupabase = !!(
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.SUPABASE_URL
    );
    
    console.log(`Using Supabase connection: ${hasSupabase ? 'Yes' : 'No'}`);
    
    // Verify database environment variables are present
    if (!process.env.POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
      console.error('ERROR: No database URL found. Set POSTGRES_PRISMA_URL for Supabase or DATABASE_URL for local development.');
    }
    
    if (process.env.POSTGRES_PRISMA_URL) {
      try {
        const url = new URL(process.env.POSTGRES_PRISMA_URL);
        console.log(`Connection URL Protocol: ${url.protocol}`);
        console.log(`Connection URL Host: ${url.host}`);
        console.log(`Connection URL Auth: ${url.username ? '[HAS USERNAME]' : '[NO USERNAME]'}:${url.password ? '[HAS PASSWORD]' : '[NO PASSWORD]'}`);
        console.log(`Connection URL Path: ${url.pathname}`);
      } catch (error) {
        console.error('Invalid POSTGRES_PRISMA_URL format:', error.message);
      }
    } else {
      console.log('POSTGRES_PRISMA_URL is not defined');
    }
  }
};

// Create a client with options
const createPrismaClient = () => {
  // Log connection info
  logDatabaseInfo();
  
  // Create the client with logging options
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error', 'warn'], // Also log warnings in production
    errorFormat: 'pretty',
  });
  
  // Add middleware for logging in all environments
  client.$use(async (params, next) => {
    const before = Date.now();
    try {
      const result = await next(params);
      const after = Date.now();
      if (process.env.NODE_ENV === 'development' || params.action === 'create') {
        console.log(`Prisma query ${params.model}.${params.action} took ${after - before}ms`);
      }
      return result;
    } catch (error) {
      const after = Date.now();
      console.error(`Prisma query ${params.model}.${params.action} failed after ${after - before}ms`);
      console.error('Query params:', JSON.stringify(params, null, 2));
      throw error;
    }
  });
  
  return client;
};

// Create a function that ensures database connection
export const connectPrisma = async () => {
  try {
    await prisma.$connect();
    console.log('Database connection established successfully');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    
    // Add more detailed diagnostics for Vercel environment
    if (process.env.VERCEL) {
      console.error('VERCEL DEPLOYMENT ERROR: Database connection failed');
      console.error('Check that your Supabase connection strings are correctly set in Vercel environment variables.');
      console.error('Required variables: POSTGRES_PRISMA_URL and POSTGRES_URL_NON_POOLING');
    }
    
    return false;
  }
};

// Use existing client or create a new one
export const prisma = globalForPrisma.prisma || createPrismaClient();

// Save the client in global for reuse
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; 