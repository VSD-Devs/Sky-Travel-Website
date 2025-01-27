import Hero from '@/components/sections/home/Hero';
import FeaturedDestinations from '@/components/sections/home/FeaturedDestinations';
import TourPackages from '@/components/sections/home/TourPackages';
import WhyChooseUs from '@/components/sections/home/WhyChooseUs';
import Testimonials from '@/components/sections/home/Testimonials';
import Newsletter from '@/components/sections/home/Newsletter';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedDestinations />
      <TourPackages />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </main>
  );
}