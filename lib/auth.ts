import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

// Create a function to get a fresh Prisma client for each auth request
// This prevents the "prepared statement already exists" error
function getFreshPrismaClient() {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_PRISMA_URL
      }
    }
  });
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing credentials');
          throw new Error('Email and password are required');
        }

        try {
          console.log(`Attempting to authenticate user: ${credentials.email}`);
          
          // Create a fresh client for this login attempt
          const prisma = getFreshPrismaClient();
          
          // Test database connection first
          try {
            await prisma.$connect();
            console.log('Database connection successful');
          } catch (connError) {
            console.error('Database connection error:', connError);
            await prisma.$disconnect();
            throw new Error(`Database connection failed: ${connError.message}`);
          }
          
          // Try to find the user
          let user;
          try {
            user = await prisma.user.findUnique({
              where: {
                email: credentials.email,
              },
            });
            console.log('User lookup result:', user ? 'User found' : 'User not found');
          } catch (lookupError) {
            console.error('User lookup error:', lookupError);
            await prisma.$disconnect();
            throw new Error(`User lookup failed: ${lookupError.message}`);
          }

          if (!user) {
            console.error('User not found');
            await prisma.$disconnect();
            throw new Error('User not found');
          }

          // Verify password
          let isPasswordValid;
          try {
            isPasswordValid = await compare(credentials.password, user.password);
            console.log('Password validation result:', isPasswordValid ? 'Valid' : 'Invalid');
          } catch (passwordError) {
            console.error('Password comparison error:', passwordError);
            await prisma.$disconnect();
            throw new Error(`Password validation failed: ${passwordError.message}`);
          }

          if (!isPasswordValid) {
            console.error('Invalid password');
            await prisma.$disconnect();
            throw new Error('Invalid password');
          }

          console.log('Authentication successful');
          
          // Always disconnect
          await prisma.$disconnect();
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw error;
        }
      }
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'your-fallback-secret-key',
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
}; 