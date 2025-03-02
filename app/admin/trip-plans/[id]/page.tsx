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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  ArrowLeft,
  Calendar, 
  Mail, 
  MapPin, 
  User,
  Plane,
  Clock,
  PlaneTakeoff
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

export default function TripPlanDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    const fetchTripPlan = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/trip-plans/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch trip plan details');
        }
        
        const data = await response.json();
        setTripPlan(data);
        setNotes(data.notes || '');
        setStatus(data.status);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching trip plan details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchTripPlan();
    }
  }, [id]);
  
  const updateTripPlan = async () => {
    if (!tripPlan) return;
    
    try {
      setIsSaving(true);
      const response = await fetch(`/api/admin/trip-plans/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notes,
          status,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update trip plan');
      }
      
      const updatedTripPlan = await response.json();
      setTripPlan(updatedTripPlan);
      alert('Trip plan updated successfully');
    } catch (err) {
      console.error('Error updating trip plan:', err);
      alert('Failed to update trip plan. Please try again.');
    } finally {
      setIsSaving(false);
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
  
  const calculateDuration = (departureDate: Date, returnDate: Date) => {
    const start = new Date(departureDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  if (loading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-6">
          <div className="text-center py-8">Loading trip plan details...</div>
        </div>
      </AdminLayout>
    );
  }
  
  if (error || !tripPlan) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-6">
          <div className="text-center py-8 text-red-500">
            {error || 'Trip plan not found'}
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/admin/trip-plans')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Trip Plans
          </Button>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => router.push('/admin/trip-plans')}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Trip Plan Details</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{tripPlan.destination} Trip</CardTitle>
                    <CardDescription>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {tripPlan.destination}
                      </div>
                    </CardDescription>
                  </div>
                  <div>{getStatusBadge(tripPlan.status)}</div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Trip Details</TabsTrigger>
                    <TabsTrigger value="customer">Customer Info</TabsTrigger>
                    <TabsTrigger value="notes">Admin Notes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium text-gray-700 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Travel Dates
                        </h3>
                        <div className="mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Departure:</span>
                            <span>{formatDate(tripPlan.departureDate)}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-500">Return:</span>
                            <span>{formatDate(tripPlan.returnDate)}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-500">Duration:</span>
                            <span>
                              {calculateDuration(tripPlan.departureDate, tripPlan.returnDate)} days
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium text-gray-700 flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Travellers
                        </h3>
                        <div className="mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Adults:</span>
                            <span>{tripPlan.adults}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-500">Children:</span>
                            <span>{tripPlan.children}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-500">Infants:</span>
                            <span>{tripPlan.infants}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-500">Total Passengers:</span>
                            <span>
                              {tripPlan.adults + tripPlan.children + tripPlan.infants}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium text-gray-700 flex items-center">
                          <PlaneTakeoff className="h-4 w-4 mr-2" />
                          Trip Type
                        </h3>
                        <div className="mt-2">
                          <Badge variant="secondary">{tripPlan.tripType}</Badge>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium text-gray-700 flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Submission Info
                        </h3>
                        <div className="mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Submitted:</span>
                            <span>{formatDate(tripPlan.createdAt)}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-500">ID:</span>
                            <span className="text-xs font-mono">{tripPlan.id}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="customer">
                    <div className="bg-gray-50 p-6 rounded-md">
                      <h3 className="font-medium text-lg text-gray-700 mb-4">Customer Information</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm text-gray-500 block">Name:</span>
                          <span className="font-medium text-lg">{tripPlan.customerName}</span>
                        </div>
                        
                        <div>
                          <span className="text-sm text-gray-500 block">Email:</span>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            <a 
                              href={`mailto:${tripPlan.customerEmail}`}
                              className="text-blue-600 hover:underline"
                            >
                              {tripPlan.customerEmail}
                            </a>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            variant="outline"
                            onClick={() => window.location.href = `mailto:${tripPlan.customerEmail}?subject=Your Trip to ${tripPlan.destination}`}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Contact Customer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes">
                    <div className="bg-gray-50 p-6 rounded-md">
                      <h3 className="font-medium text-gray-700 mb-4">Admin Notes</h3>
                      <Textarea
                        placeholder="Add notes about this trip request..."
                        className="min-h-32"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                      <Button 
                        className="mt-4"
                        onClick={updateTripPlan}
                        disabled={isSaving}
                      >
                        {isSaving ? 'Saving...' : 'Save Notes'}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Status Management</CardTitle>
                <CardDescription>
                  Update and track the progress of this trip plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Current Status</label>
                    <div className="mt-1">
                      {getStatusBadge(tripPlan.status)}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <label className="text-sm font-medium">Update Status</label>
                    <Select 
                      value={status} 
                      onValueChange={setStatus}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={updateTripPlan}
                  disabled={isSaving || status === tripPlan.status}
                >
                  {isSaving ? 'Updating...' : 'Update Status'}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.location.href = `mailto:${tripPlan.customerEmail}?subject=Your Trip to ${tripPlan.destination}`}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email Customer
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this trip plan? This action cannot be undone.')) {
                        fetch(`/api/admin/trip-plans/${id}`, {
                          method: 'DELETE',
                        }).then(response => {
                          if (response.ok) {
                            router.push('/admin/trip-plans');
                          } else {
                            alert('Failed to delete trip plan');
                          }
                        });
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                    Delete Trip Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 