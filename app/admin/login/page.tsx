'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@skylimittravels.co.uk');
  const [password, setPassword] = useState('Admin123!');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [debugInfo, setDebugInfo] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      console.log('Already authenticated, redirecting to dashboard');
      router.push('/admin/dashboard');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setDebugInfo('Starting login process...');
    
    // Increment login attempt counter
    setLoginAttempts(prev => prev + 1);

    try {
      setDebugInfo(prev => `${prev}\nAttempting to sign in with: ${email}`);
      
      // Add the login attempt counter to force a new request each time
      // This helps prevent prepared statement conflicts
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        attempt: loginAttempts.toString(), // Force unique requests
        callbackUrl: '/admin/dashboard'
      });

      setDebugInfo(prev => `${prev}\nSignIn result: ${JSON.stringify(result)}`);

      if (!result) {
        throw new Error('No response from authentication server');
      }

      if (result.error) {
        console.error('Auth error:', result.error);
        
        // Check for the specific prepared statement error
        if (result.error.includes('prepared statement') || result.error.includes('42P05')) {
          setError('Database connection issue. Please try again in a moment.');
          
          // Auto-retry once after a short delay
          setTimeout(() => {
            setDebugInfo(prev => `${prev}\nAuto-retrying login...`);
            handleSubmit(e);
          }, 1500);
          
          return;
        }
        
        setError(`Login failed: ${result.error}`);
        setIsLoading(false);
        return;
      }

      setDebugInfo(prev => `${prev}\nLogin successful, preparing to redirect...`);
      
      // Force a session refresh
      await fetch('/api/auth/session');
      
      if (result.url) {
        // Use the URL provided by NextAuth if available
        setDebugInfo(prev => `${prev}\nRedirecting to: ${result.url}`);
        router.push(result.url);
      } else {
        // Fallback to dashboard
        setDebugInfo(prev => `${prev}\nRedirecting to dashboard...`);
        router.push('/admin/dashboard');
      }
      
      // Additional delay to ensure the redirect happens
      setTimeout(() => {
        setDebugInfo(prev => `${prev}\nForce redirect after timeout`);
        window.location.href = '/admin/dashboard';
      }, 2000);
      
    } catch (error) {
      console.error('Login error:', error);
      setError(`Login error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <Image 
            src="/images/logo.png" 
            alt="Sky Limit Travels" 
            width={150} 
            height={50}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Login</h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded text-xs font-mono whitespace-pre-wrap">
            {debugInfo}
          </div>
        )}
      </div>
    </div>
  );
} 