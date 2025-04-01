
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';

const Faq = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="calligraphy-heading text-3xl md:text-4xl mb-4 text-primary dark:text-mawaddah-gold">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground dark:text-mawaddah-gold/70">
              Find answers to commonly asked questions about Mawaddah.
            </p>
          </div>
          
          <FaqSection />
          
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4 text-primary dark:text-mawaddah-gold">
              Still have questions?
            </h2>
            <p className="text-muted-foreground dark:text-mawaddah-gold/70 mb-6">
              Feel free to reach out to us directly. We're here to help!
            </p>
            <a 
              href="mailto:info@usemawaddah.com" 
              className="btn-primary inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
