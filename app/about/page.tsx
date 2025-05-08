import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Us | Sky Limit Travels',
  description: 'Learn more about Sky Limit Travels, our mission, values, and the team dedicated to creating unforgettable travel experiences for you.',
};

// Team members data
const teamMembers = [
  {
    id: 'emma',
    name: 'Emma Thompson',
    role: 'Founder & Travel Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    bio: 'With over 15 years of experience in the travel industry, Emma founded Sky Limit Travels to share her passion for authentic travel experiences and cultural immersion.'
  },
  {
    id: 'james',
    name: 'James Wilson',
    role: 'Adventure Specialist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    bio: 'James specialises in crafting thrilling adventure holidays, drawing from his background as a former mountain guide and his travels to over 50 countries.'
  },
  {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Cultural Experience Designer',
    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    bio: 'Sarah brings destinations to life through her deep knowledge of global cultures, cuisines, and traditions, ensuring our travellers experience the authentic heart of each location.'
  },
  {
    id: 'david',
    name: 'David Okafor',
    role: 'Sustainability Coordinator',
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    bio: 'David ensures our travels positively impact the communities we visit, working with local partners to create experiences that benefit both travellers and destinations.'
  }
];

// Company values
const values = [
  {
    title: 'Authentic Experiences',
    description: 'We believe in travel that goes beyond tourist attractions to discover the true essence of a destination through local connections and immersive activities.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    title: 'Responsible Travel',
    description: 'We commit to practices that respect and preserve the environments, cultures, and communities we visit, for the benefit of both travellers and destinations.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Personal Touch',
    description: 'We take the time to understand your travel dreams and preferences to create journeys tailored specifically to you, with care and attention to every detail.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: 'Continuous Discovery',
    description: 'We constantly explore new destinations, experiences, and partners to offer you fresh and exciting travel opportunities that keep pace with evolving interests.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-950/80 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
          alt="Team exploring a destination" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About Sky Limit Travels</h1>
            <p className="text-xl text-white/90 mb-8">
              A passionate team dedicated to creating authentic travel experiences that transform and inspire.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg">
              Meet Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Travel planning session" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">How We Started</h3>
              <p className="text-gray-600 mb-6">
                Sky Limit Travels began in 2015 with a simple belief: travel should be transformative, authentic, and accessible. 
                Our founder, Emma Thompson, after years of working in traditional travel agencies, saw an opportunity to create 
                something different—a travel company that prioritised meaningful experiences over tourist checkboxes.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                We're on a mission to help travellers forge deeper connections with the world through journeys that respect 
                local cultures, support communities, and preserve natural environments. We believe travel has the power to 
                transform perspectives, challenge assumptions, and create lasting positive change.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Looking Forward</h3>
              <p className="text-gray-600">
                Today, we continue to expand our offerings while staying true to our founding principles. As travel evolves, 
                so do we—embracing new destinations, sustainable practices, and innovative ways to deliver unforgettable experiences 
                while maintaining the personal touch that sets us apart.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Meet Our Team</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Our diverse team of travel enthusiasts brings together expertise from across the globe to craft exceptional journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-gray-800">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Values</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              These core principles guide everything we do, from planning your journey to supporting you during your travels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">7+</p>
              <p className="text-xl opacity-80">Years of Experience</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">50+</p>
              <p className="text-xl opacity-80">Destinations</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">15,000+</p>
              <p className="text-xl opacity-80">Happy Travellers</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">4.9/5</p>
              <p className="text-xl opacity-80">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">What Our Travellers Say</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Sky Limit crafted the perfect family holiday to Japan for us. Their attention to detail and local knowledge made all the difference. The experiences they arranged were beyond our expectations!"
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" 
                    alt="Customer" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Samantha Rodriguez</p>
                    <p className="text-sm text-gray-500">Family trip to Japan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "My safari experience in Tanzania was life-changing. The team at Sky Limit thought of everything, from the perfect camps to the most knowledgeable guides. I'll never travel with anyone else!"
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" 
                    alt="Customer" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Michael Kendrick</p>
                    <p className="text-sm text-gray-500">Safari in Tanzania</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "I was nervous about solo travel, but Sky Limit made it seamless. Their support throughout my journey across Southeast Asia was exceptional, and the experiences they arranged connected me with amazing people."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" 
                    alt="Customer" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Emily Watson</p>
                    <p className="text-sm text-gray-500">Solo trip in Southeast Asia</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Journey With Us</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Ready to experience the Sky Limit difference? Get in touch with our team to start planning your next unforgettable adventure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full text-lg">
                Contact Us
              </Button>
            </Link>
            <Link href="/destinations">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 