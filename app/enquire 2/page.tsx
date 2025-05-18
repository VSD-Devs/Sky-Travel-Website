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
      message: flightDetails 
        ? `I'm interested in booking the following flight:\n\n` +
          `From: ${flightDetails.originCity} to ${flightDetails.destinationCity}\n` +
          `Route: ${flightDetails.origin} to ${flightDetails.destination}\n` +
          `Date: ${flightDetails.departureDate}\n` +
          `${flightDetails.returnDate ? `Return: ${flightDetails.returnDate}\n` : ''}` +
          `Airline: ${getAirlineName(flightDetails.airline)} (${flightDetails.airline} ${flightDetails.flightNumber})\n` +
          `Price: £${parseFloat(flightDetails.price).toFixed(2)}\n\n` +
          `Please contact me with more information about booking this flight.`
        : holidayDetails 
          ? `I'm interested in booking the following holiday package:\n\n` +
            `Destination: ${holidayDetails.destination}\n` +
            `Package: ${holidayDetails.title}\n` +
            `Duration: ${holidayDetails.duration}\n` +
            `Price: £${holidayDetails.price}\n` +
            `${holidayDetails.departureDate ? `Preferred Departure Date: ${holidayDetails.departureDate}\n` : ''}` +
            `Number of Travelers: ${holidayDetails.travelers || '2'}\n\n` +
            `Please contact me with more information about booking this holiday.`
          : packageDetails 
            ? `I'm interested in the following tour package:\n\n` +
              `Package: ${packageDetails.title}\n` +
              `Destination: ${packageDetails.destination}\n` +
              `Duration: ${packageDetails.duration}\n` +
              `Price: £${packageDetails.price}\n\n` +
              `Please contact me with more information about this package.`
            : 'I would like to enquire about booking a travel option.'
    }
  });

  // Update the message when flight details change
  useEffect(() => {
    if (flightDetails) {
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
    }
  }, [flightDetails, holidayDetails, packageDetails, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setFormResponse(null);

    // Try up to 3 times to submit the form
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            // Include the details based on enquiry type
            flightDetails: enquiryType === 'flight' ? flightDetails : null,
            holidayDetails: enquiryType === 'holiday' ? holidayDetails : null,
            packageDetails: enquiryType === 'package' ? packageDetails : null,
            enquiryType
          }),
        });

        const result = await response.json();

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
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'PPP');
  };

  return (
    <div className="min-h-screen bg-blue-50/80">
      {/* Hero Section */}
      <div className="relative h-[250px]">
        <div className="absolute inset-0 bg-[url('/contact.jpg')] bg-cover bg-[center_70%]"></div>
        <div className="absolute inset-0 bg-blue-600/40"></div>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {enquiryType === 'flight' && 'Flight Enquiry'}
            {enquiryType === 'holiday' && 'Holiday Enquiry'}
            {enquiryType === 'package' && 'Tour Package Enquiry'}
            {!enquiryType && 'Travel Enquiry'}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Let us help you plan your perfect journey. Fill out the form below to get in touch.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Flight Information */}
          <div className="space-y-8">
            {flightDetails && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Selected Flight</h2>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <Plane className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Route</h3>
                        <p className="text-gray-600 font-medium">
                          {flightDetails.originCity} ({flightDetails.origin})
                        </p>
                        <div className="flex items-center my-1">
                          <div className="h-px w-4 bg-gray-300"></div>
                          <ArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                          <div className="h-px w-4 bg-gray-300"></div>
                        </div>
                        <p className="text-gray-600 font-medium">
                          {flightDetails.destinationCity} ({flightDetails.destination})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Departure Date</h3>
                        <p className="text-gray-600">{formatDate(flightDetails.departureDate)}</p>
                      </div>
                    </div>
                    
                    {flightDetails.returnDate && (
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                          <CalendarClock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Return Date</h3>
                          <p className="text-gray-600">{formatDate(flightDetails.returnDate)}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Airline</h3>
                        <p className="text-gray-600">{getAirlineName(flightDetails.airline)} ({flightDetails.airline} {flightDetails.flightNumber})</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Price</h3>
                        <p className="text-2xl font-bold text-blue-700">£{parseFloat(flightDetails.price).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Phone</h3>
                        <p className="text-gray-600">03330384142</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Email</h3>
                        <p className="text-gray-600">Flightbookings@skylimittravels.co.uk</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {holidayDetails && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Selected Holiday</h2>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Destination</h3>
                        <p className="text-gray-600 font-medium">{holidayDetails.destination}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Duration</h3>
                        <p className="text-gray-600">{holidayDetails.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Travelers</h3>
                        <p className="text-gray-600">{holidayDetails.travelers || '2'} Adults</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Price</h3>
                        <p className="text-2xl font-bold text-blue-700">£{holidayDetails.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {packageDetails && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Selected Package</h2>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Package</h3>
                        <p className="text-gray-600 font-medium">{packageDetails.title}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Duration</h3>
                        <p className="text-gray-600">{packageDetails.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Destination</h3>
                        <p className="text-gray-600">{packageDetails.destination}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-lg">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Price</h3>
                        <p className="text-2xl font-bold text-blue-700">£{packageDetails.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!flightDetails && !holidayDetails && !packageDetails && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">No Travel Selection</h2>
                <p className="text-gray-600">
                  It appears you haven't selected a specific travel option. Please fill out the form with your travel requirements, or go back to select a flight, holiday, or package.
                </p>
                <button 
                  onClick={() => router.back()}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to search results
                </button>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
              
              {formResponse && (
                <div
                  className={`p-4 mb-6 rounded-lg ${
                    formResponse.status === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {formResponse.message}
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-800 mb-2">
                      First Name
                    </label>
                    <input
                      {...register('firstName')}
                      type="text"
                      id="firstName"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                        errors.firstName ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                      } focus:ring-2 focus:ring-blue-200 outline-none transition-colors`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-800 mb-2">
                      Last Name
                    </label>
                    <input
                      {...register('lastName')}
                      type="text"
                      id="lastName"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                        errors.lastName ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                      } focus:ring-2 focus:ring-blue-200 outline-none transition-colors`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                    Email Address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                      errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                    } focus:ring-2 focus:ring-blue-200 outline-none transition-colors`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                    placeholder="+44 7123 456789"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-2">
                    Your Message
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={8}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                      errors.message ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                    } focus:ring-2 focus:ring-blue-200 outline-none transition-colors resize-none`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 hover:shadow-lg ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 