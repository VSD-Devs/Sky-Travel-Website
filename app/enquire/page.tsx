'use client';

import { Mail, Phone, MapPin, Clock, ArrowRight, Calendar, Plane, CalendarClock, User, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';

// Define the form schema with Zod
const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

// Define the form data type from the schema
type FormData = z.infer<typeof formSchema>;

// Flight details interface
interface FlightDetails {
  flightId: string;
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  departureDate: string;
  returnDate?: string;
  price: string;
  airline: string;
  flightNumber: string;
}

// Holiday details interface
interface HolidayDetails {
  holidayId: string;
  title: string;
  destination: string;
  price: string;
  duration: string;
  departureDate?: string;
  travelers?: string;
}

// Package details interface
interface PackageDetails {
  packageId: string;
  title: string;
  destination: string;
  price: string;
  duration: string;
}

// Add airline mapping function to display full airline names
const getAirlineName = (code: string): string => {
  const airlineMap: Record<string, string> = {
    'BA': 'British Airways',
    'AA': 'American Airlines',
    'LH': 'Lufthansa',
    'AF': 'Air France',
    'KL': 'KLM Royal Dutch Airlines',
    'DL': 'Delta Air Lines',
    'UA': 'United Airlines',
    'EK': 'Emirates',
    'QR': 'Qatar Airways',
    'SQ': 'Singapore Airlines',
    'CX': 'Cathay Pacific',
    'EY': 'Etihad Airways',
    'TK': 'Turkish Airlines',
    'VS': 'Virgin Atlantic',
    'IB': 'Iberia',
    'FR': 'Ryanair',
    'U2': 'easyJet',
    'LX': 'SWISS',
    'OS': 'Austrian Airlines',
    'AY': 'Finnair',
  };
  return airlineMap[code] || code;
};

export default function EnquiryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formResponse, setFormResponse] = useState<{
    status: 'success' | 'error';
    message: string;
  } | null>(null);
  
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);
  const [holidayDetails, setHolidayDetails] = useState<HolidayDetails | null>(null);
  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);
  const [enquiryType, setEnquiryType] = useState<'flight' | 'holiday' | 'package' | null>(null);

  useEffect(() => {
    if (searchParams) {
      // Check which type of enquiry this is based on URL parameters
      if (searchParams.get('flightId')) {
        // Extract flight details from URL parameters
        const details: FlightDetails = {
          flightId: searchParams.get('flightId') || '',
          origin: searchParams.get('origin') || '',
          originCity: searchParams.get('originCity') || '',
          destination: searchParams.get('destination') || '',
          destinationCity: searchParams.get('destinationCity') || '',
          departureDate: searchParams.get('departureDate') || '',
          returnDate: searchParams.get('returnDate') || '',
          price: searchParams.get('price') || '',
          airline: searchParams.get('airline') || '',
          flightNumber: searchParams.get('flightNumber') || ''
        };
        
        setFlightDetails(details);
        setEnquiryType('flight');
      } 
      else if (searchParams.get('holidayId')) {
        // Extract holiday details from URL parameters
        const details: HolidayDetails = {
          holidayId: searchParams.get('holidayId') || '',
          title: searchParams.get('title') || '',
          destination: searchParams.get('destination') || '',
          price: searchParams.get('price') || '',
          duration: searchParams.get('duration') || '',
          departureDate: searchParams.get('departureDate') || '',
          travelers: searchParams.get('travelers') || '2'
        };
        
        setHolidayDetails(details);
        setEnquiryType('holiday');
      }
      else if (searchParams.get('packageId')) {
        // Extract package details from URL parameters
        const details: PackageDetails = {
          packageId: searchParams.get('packageId') || '',
          title: searchParams.get('title') || '',
          destination: searchParams.get('destination') || '',
          price: searchParams.get('price') || '',
          duration: searchParams.get('duration') || ''
        };
        
        setPackageDetails(details);
        setEnquiryType('package');
      }
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ''
    }
  });

  // Update the message when details change
  useEffect(() => {
    if (flightDetails) {
      try {
        const departureDate = new Date(flightDetails.departureDate);
        const formattedDepartureDate = format(departureDate, 'PPP');
        
        let message = `I'm interested in booking the following flight:\n\n` +
          `From: ${flightDetails.originCity} to ${flightDetails.destinationCity}\n` +
          `Route: ${flightDetails.origin} to ${flightDetails.destination}\n` +
          `Date: ${formattedDepartureDate}\n`;
        
        if (flightDetails.returnDate) {
          const returnDate = new Date(flightDetails.returnDate);
          const formattedReturnDate = format(returnDate, 'PPP');
          message += `Return: ${formattedReturnDate}\n`;
        }
        
        message += `Airline: ${getAirlineName(flightDetails.airline)} (${flightDetails.airline} ${flightDetails.flightNumber})\n` +
          `Price: £${parseFloat(flightDetails.price).toFixed(2)}\n\n` +
          `Please contact me with more information about booking this flight.`;
        
        setValue('message', message);
      } catch (error) {
        console.error('Error formatting flight details:', error);
        setValue('message', 'I would like to enquire about booking a flight.');
      }
    } 
    else if (holidayDetails) {
      let message = `I'm interested in booking the following holiday package:\n\n` +
        `Destination: ${holidayDetails.destination}\n` +
        `Package: ${holidayDetails.title}\n` +
        `Duration: ${holidayDetails.duration}\n` +
        `Price: £${holidayDetails.price}\n`;
      
      if (holidayDetails.departureDate) {
        message += `Preferred Departure Date: ${holidayDetails.departureDate}\n`;
      }
      
      message += `Number of Travelers: ${holidayDetails.travelers || '2'}\n\n` +
        `Please contact me with more information about booking this holiday.`;
      
      setValue('message', message);
    }
    else if (packageDetails) {
      let message = `I'm interested in the following tour package:\n\n` +
        `Package: ${packageDetails.title}\n` +
        `Destination: ${packageDetails.destination}\n` +
        `Duration: ${packageDetails.duration}\n` +
        `Price: £${packageDetails.price}\n\n` +
        `Please contact me with more information about this package.`;
      
      setValue('message', message);
    } else {
      setValue('message', 'I would like to enquire about travel options.');
    }
  }, [flightDetails, holidayDetails, packageDetails, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setFormResponse(null);
  
    console.log('Submitting enquiry form with data:', { 
      ...data, 
      message: data.message.substring(0, 30) + '...',
      enquiryType,
      flightDetails: flightDetails ? '...' : null,
      holidayDetails: holidayDetails ? '...' : null,
      packageDetails: packageDetails ? '...' : null
    });
  
    // Try up to 3 times to submit the form
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Attempt ${attempt}/3 to submit enquiry form`);
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            // Include the details based on enquiry type
            enquiryType,
            flightDetails: enquiryType === 'flight' ? flightDetails : null,
            holidayDetails: enquiryType === 'holiday' ? holidayDetails : null,
            packageDetails: enquiryType === 'package' ? packageDetails : null
          }),
        });
  
        const result = await response.json();
        console.log('Form submission response:', result);
  
        if (!response.ok) {
          throw new Error(result.error || 'Failed to submit the form');
        }
  
        // Form submitted successfully
        setFormResponse({
          status: 'success',
          message: result.message || 'Thank you for your enquiry. We will be in touch shortly!',
        });
  
        // Reset the form
        reset();
        
        // Exit the retry loop on success
        break;
      } catch (error) {
        console.error(`Error submitting form (attempt ${attempt}/3):`, error);
        
        // Only set error response on final attempt
        if (attempt === 3) {
          setFormResponse({
            status: 'error',
            message: error instanceof Error 
              ? error.message 
              : 'Our system is currently experiencing difficulties. Please try again later or contact us by phone.'
          });
        } else {
          // Small delay before retrying
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }
    
    setIsSubmitting(false);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'PPP');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Enquire with us</h1>
          
          {enquiryType === 'flight' && flightDetails && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">Flight Enquiry</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">{flightDetails.originCity} ({flightDetails.origin})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-medium">{flightDetails.destinationCity} ({flightDetails.destination})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Departure Date</p>
                  <p className="font-medium">{formatDate(flightDetails.departureDate)}</p>
                </div>
                {flightDetails.returnDate && (
                  <div>
                    <p className="text-sm text-gray-500">Return Date</p>
                    <p className="font-medium">{formatDate(flightDetails.returnDate)}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Airline</p>
                  <p className="font-medium">{getAirlineName(flightDetails.airline)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">£{parseFloat(flightDetails.price).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
          
          {enquiryType === 'holiday' && holidayDetails && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-green-900 mb-3">Holiday Enquiry</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium">{holidayDetails.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Package</p>
                  <p className="font-medium">{holidayDetails.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{holidayDetails.duration}</p>
                </div>
                {holidayDetails.departureDate && (
                  <div>
                    <p className="text-sm text-gray-500">Preferred Departure</p>
                    <p className="font-medium">{holidayDetails.departureDate}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">£{holidayDetails.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Travelers</p>
                  <p className="font-medium">{holidayDetails.travelers || '2'}</p>
                </div>
              </div>
            </div>
          )}
          
          {enquiryType === 'package' && packageDetails && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-purple-900 mb-3">Package Enquiry</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Package</p>
                  <p className="font-medium">{packageDetails.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium">{packageDetails.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{packageDetails.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">£{packageDetails.price}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Form response message */}
          {formResponse && (
            <div 
              className={`mb-6 p-4 rounded-md ${
                formResponse.status === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              <p>{formResponse.message}</p>
              {formResponse.status === 'success' && (
                <button
                  onClick={() => router.push('/')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Return to Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          )}
          
          {/* Contact Form */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className={`block w-full rounded-md shadow-sm ${
                        errors.firstName 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className={`block w-full rounded-md shadow-sm ${
                        errors.lastName 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`block w-full rounded-md shadow-sm ${
                        errors.email 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      {...register('phone')}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className={`block w-full rounded-md shadow-sm ${
                      errors.message 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      isSubmitting 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="mt-8 bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Our Contact Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <a href="mailto:info@skylimittravels.co.uk" className="text-blue-600 hover:text-blue-800">
                      info@skylimittravels.co.uk
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <a href="tel:+441234567890" className="text-blue-600 hover:text-blue-800">
                      +44 (0) 123 456 7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">
                      123 Travel Street<br />
                      London, EC1A 1AA<br />
                      United Kingdom
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Business Hours</p>
                    <p className="text-gray-600">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 4pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 