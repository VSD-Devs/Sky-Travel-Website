import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a client with options
const createPrismaClient = () => {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  });
  
  // Add middleware for logging in development
  if (process.env.NODE_ENV === 'development') {
    client.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      console.log(`Prisma query ${params.model}.${params.action} took ${after - before}ms`);
      return result;
    });
  }
  
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
    return false;
  }
};

// Use existing client or create a new one
export const prisma = globalForPrisma.prisma || createPrismaClient();

// Save the client in global for reuse
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; 