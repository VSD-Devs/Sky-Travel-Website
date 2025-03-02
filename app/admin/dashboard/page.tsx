'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Mail,
  Map, 
  Plus, 
  Calendar,
  MapPin,
  User,
  PlaneTakeoff
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type DashboardStats = {
  totalEnquiries: number;
  newEnquiries: number;
  totalHolidays: number;
  totalTripPlans: number;
  pendingTripPlans: number;
};

type Enquiry = {
  id: string;
  customerName: string;
  email: string;
  subject: string;
  status: string;
  date: Date;
};

type TripPlan = {
  id: string;
  destination: string;
  customerName: string;
  customerEmail: string;
  departureDate: Date;
  status: string;
  createdAt: Date;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalEnquiries: 0,
    newEnquiries: 0,
    totalHolidays: 0,
    totalTripPlans: 0,
    pendingTripPlans: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [recentTripPlans, setRecentTripPlans] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch stats
        const statsResponse = await fetch('/api/admin/stats');
        const statsData = await statsResponse.json();
        
        // Fetch trip plan stats
        const tripPlanStatsResponse = await fetch('/api/admin/trip-plans/stats');
        const tripPlanStatsData = await tripPlanStatsResponse.json();
        
        // Fetch recent enquiries
        const enquiriesResponse = await fetch('/api/admin/enquiries/recent');
        const enquiriesData = await enquiriesResponse.json();
        
        // Fetch recent trip plans
        const tripPlansResponse = await fetch('/api/admin/trip-plans/recent');
        const tripPlansData = await tripPlansResponse.json();
        
        setStats({
          ...statsData,
          totalTripPlans: tripPlanStatsData.totalTripPlans || 0,
          pendingTripPlans: tripPlanStatsData.pendingTripPlans || 0
        });
        setRecentEnquiries(enquiriesData || []);
        setRecentTripPlans(tripPlansData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'NEW':
      case 'PENDING':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'RESOLVED':
      case 'COMPLETED':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'CANCELLED':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/admin/holidays/new')}>
              <Plus className="mr-2 h-4 w-4" />
              New Holiday
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Enquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">
                  {loading ? '...' : stats.totalEnquiries}
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-blue-500"
                onClick={() => router.push('/admin/enquiries')}
              >
                View all enquiries
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                New Enquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold">
                  {loading ? '...' : stats.newEnquiries}
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-blue-500"
                onClick={() => router.push('/admin/enquiries?status=new')}
              >
                View new enquiries
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Holidays
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Package className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">
                  {loading ? '...' : stats.totalHolidays}
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-blue-500"
                onClick={() => router.push('/admin/holidays')}
              >
                View all holidays
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Trip Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PlaneTakeoff className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-2xl font-bold">
                  {loading ? '...' : stats.totalTripPlans}
                </span>
                <span className="text-sm ml-2 text-yellow-600">
                  ({loading ? '...' : stats.pendingTripPlans} pending)
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-blue-500"
                onClick={() => router.push('/admin/trip-plans')}
              >
                View trip plans
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center justify-center"
            onClick={() => router.push('/admin/enquiries')}
          >
            <Mail className="h-8 w-8 mb-2" />
            <span>View Enquiries</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center justify-center"
            onClick={() => router.push('/admin/holidays')}
          >
            <Package className="h-8 w-8 mb-2" />
            <span>Manage Holidays</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center justify-center"
            onClick={() => router.push('/admin/trip-plans')}
          >
            <PlaneTakeoff className="h-8 w-8 mb-2" />
            <span>Manage Trip Plans</span>
          </Button>
        </div>
        
        {/* Recent Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Enquiries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Enquiries</CardTitle>
              <CardDescription>Latest customer enquiries</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : recentEnquiries.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No recent enquiries</div>
              ) : (
                <div className="space-y-4">
                  {recentEnquiries.map((enquiry) => (
                    <div key={enquiry.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{enquiry.customerName}</div>
                          <div className="text-sm text-gray-500 mt-1">{enquiry.subject}</div>
                        </div>
                        <div>{getStatusBadge(enquiry.status)}</div>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(enquiry.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => router.push('/admin/enquiries')}
              >
                View All Enquiries
              </Button>
            </CardFooter>
          </Card>
          
          {/* Recent Trip Plans */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Trip Plans</CardTitle>
              <CardDescription>Latest trip planning requests</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : recentTripPlans.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No recent trip plans</div>
              ) : (
                <div className="space-y-4">
                  {recentTripPlans.map((plan) => (
                    <div key={plan.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{plan.customerName}</div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {plan.destination}
                          </div>
                        </div>
                        <div>{getStatusBadge(plan.status)}</div>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Travel date: {formatDate(plan.departureDate)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => router.push('/admin/trip-plans')}
              >
                View All Trip Plans
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
} 