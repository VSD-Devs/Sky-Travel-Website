import Hero from '@/components/sections/home/Hero';
import PopularFlights from '@/components/sections/home/PopularFlights';
import FeaturedDestinations from '@/components/sections/home/FeaturedDestinations';
import TourPackages from '@/components/sections/home/TourPackages';
import WhyChooseUs from '@/components/sections/home/WhyChooseUs';
import Testimonials from '@/components/sections/home/Testimonials';
import Newsletter from '@/components/sections/home/Newsletter';

export default function Home() {
  return (
    <main>
      <Hero />
      <PopularFlights />
      <FeaturedDestinations />
      <TourPackages />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </main>
  );
}