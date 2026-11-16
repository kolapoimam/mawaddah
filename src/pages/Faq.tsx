
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import { Link } from 'react-router-dom';
import { REPO_URL } from '@/lib/site';

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
          
          <FaqSection showHeading={false} />

          <div className="card-surface max-w-2xl mx-auto mt-16 text-center p-8">
            <h2 className="text-xl font-semibold mb-4 text-primary dark:text-mawaddah-gold">
              Still have questions?
            </h2>
            <p className="text-muted-foreground dark:text-mawaddah-gold/70 mb-6">
              Feel free to reach out to us directly. We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Contact Us
              </Link>
              <a href={`${REPO_URL}/issues/new/choose`} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                Ask on GitHub
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
