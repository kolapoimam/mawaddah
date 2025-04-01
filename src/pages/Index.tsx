
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import IntroSection from '@/components/IntroSection';
import EducationalSection from '@/components/EducationalSection';
import AssessmentOverview from '@/components/AssessmentOverview';
import ComingSoonSection from '@/components/ComingSoonSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import CallToAction from '@/components/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroCarousel />
        <IntroSection />
        <EducationalSection />
        <AssessmentOverview />
        <ComingSoonSection />
        <TestimonialsSection />
        <FaqSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
