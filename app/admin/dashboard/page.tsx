'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Users, Briefcase, LogOut, Menu, X, Phone, Mail } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Define types for our data
interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  totalHolidays: number;
}

interface Enquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED';
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalEnquiries: 0,
    newEnquiries: 0,
    totalHolidays: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }

    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback to dummy data if API fails
        setStats({
          totalEnquiries: 0,
          newEnquiries: 0,
          totalHolidays: 0,
        });
      }
    };

    // Fetch recent enquiries
    const fetchRecentEnquiries = async () => {
      try {
        const response = await fetch('/api/admin/enquiries/recent');
        if (!response.ok) throw new Error('Failed to fetch recent enquiries');
        const data = await response.json();
        setRecentEnquiries(data);
      } catch (error) {
        console.error('Error fetching recent enquiries:', error);
        setRecentEnquiries([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      Promise.all([fetchStats(), fetchRecentEnquiries()]);
    }
  }, [status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'RESPONDED':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-sm p-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="font-semibold text-lg">Sky Limit Travels</div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6">
          <div className="text-xl font-bold text-gray-800">Sky Limit Travels</div>
          <div className="text-sm text-gray-600">Admin Panel</div>
        </div>

        <nav className="mt-6">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main
          </div>
          <Link
            href="/admin/dashboard"
            className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-100"
          >
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            href="/admin/enquiries"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Users className="w-5 h-5 mr-3" />
            Enquiries
          </Link>
          <Link
            href="/admin/holidays"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Briefcase className="w-5 h-5 mr-3" />
            Holidays
          </Link>

          <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Account
          </div>
          <button
            onClick={() => {
              // Sign out logic will be implemented later
              router.push('/admin/login');
            }}
            className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100 text-left"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {session?.user?.name || 'Admin'}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-500 text-sm font-medium">Total Enquiries</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">{stats.totalEnquiries}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-500 text-sm font-medium">New Enquiries</div>
              <div className="mt-2 text-3xl font-bold text-blue-600">{stats.newEnquiries}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-500 text-sm font-medium">Total Holidays</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">{stats.totalHolidays}</div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/admin/enquiries"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                View Enquiries
              </Link>
              <Link
                href="/admin/holidays/new"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Add New Holiday
              </Link>
            </div>
          </div>

          {/* Recent enquiries */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Enquiries</h2>
            </div>
            <div className="p-6">
              {recentEnquiries.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {recentEnquiries.map((enquiry) => (
                    <div key={enquiry.id} className="py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {enquiry.firstName} {enquiry.lastName}
                          </h3>
                          <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {enquiry.email}
                            </div>
                            {enquiry.phone && (
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                {enquiry.phone}
                              </div>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {enquiry.message}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {formatDistanceToNow(new Date(enquiry.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                            enquiry.status
                          )}`}
                        >
                          {enquiry.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">
                  No recent enquiries found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 