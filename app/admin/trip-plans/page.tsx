'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Table, 
  TableHead, 
  TableRow, 
  TableHeader, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  ArrowUpDown, 
  Calendar, 
  Mail, 
  MapPin, 
  User
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type TripPlan = {
  id: string;
  destination: string;
  tripType: string;
  departureDate: Date;
  returnDate: Date;
  adults: number;
  children: number;
  infants: number;
  customerName: string;
  customerEmail: string;
  status: string;
  createdAt: Date;
  notes?: string;
  assignedTo?: string;
};

export default function TripPlansPage() {
  const router = useRouter();
  const [tripPlans, setTripPlans] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchTripPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/trip-plans');
        
        if (!response.ok) {
          throw new Error('Failed to fetch trip plans');
        }
        
        const data = await response.json();
        setTripPlans(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching trip plans:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTripPlans();
  }, []);
  
  const updateTripPlanStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/trip-plans/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      
      // Update local state to reflect the change
      setTripPlans(
        tripPlans.map((plan) => 
          plan.id === id ? { ...plan, status } : plan
        )
      );
    } catch (err) {
      console.error('Error updating trip plan status:', err);
      alert('Failed to update status. Please try again.');
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'CANCELLED':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredTripPlans = tripPlans.filter(plan => {
    // Apply status filter
    if (statusFilter !== 'ALL' && plan.status !== statusFilter) {
      return false;
    }
    
    // Apply search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        plan.customerName.toLowerCase().includes(searchLower) ||
        plan.customerEmail.toLowerCase().includes(searchLower) ||
        plan.destination.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Trip Plans</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Trip Plans Management</CardTitle>
            <CardDescription>
              View and manage customer trip planning requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, email, or destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-48">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Statuses</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {loading ? (
          <div className="text-center py-8">Loading trip plans...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <div className="bg-white rounded-md shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center">
                      <span>Customer</span>
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      <span>Destination</span>
                      <MapPin className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      <span>Dates</span>
                      <Calendar className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      <span>Travellers</span>
                      <User className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTripPlans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No trip plans found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTripPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell>
                        <div className="font-medium">{plan.customerName}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {plan.customerEmail}
                        </div>
                      </TableCell>
                      <TableCell>{plan.destination}</TableCell>
                      <TableCell>
                        <div>{formatDate(plan.departureDate)}</div>
                        <div className="text-sm text-gray-500">
                          to {formatDate(plan.returnDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{plan.adults} adults</div>
                        {(plan.children > 0 || plan.infants > 0) && (
                          <div className="text-sm text-gray-500">
                            {plan.children > 0 && `${plan.children} children`}
                            {plan.children > 0 && plan.infants > 0 && ', '}
                            {plan.infants > 0 && `${plan.infants} infants`}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(plan.status)}
                      </TableCell>
                      <TableCell>{formatDate(plan.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/trip-plans/${plan.id}`)}
                          >
                            View
                          </Button>
                          <Select
                            value={plan.status}
                            onValueChange={(value) => 
                              updateTripPlanStatus(plan.id, value)
                            }
                          >
                            <SelectTrigger className="h-8 w-[110px]">
                              <SelectValue placeholder="Change Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PENDING">Pending</SelectItem>
                              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                              <SelectItem value="COMPLETED">Completed</SelectItem>
                              <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 