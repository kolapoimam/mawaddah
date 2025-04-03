import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-mawaddah-pink/50 to-white dark:from-mawaddah-green-dark/80 dark:to-mawaddah-green-dark">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="calligraphy-heading text-3xl md:text-4xl mb-4 text-primary dark:text-mawaddah-gold">
            Ready to Nurture Your Love?
          </h2>
          <p className="text-lg mb-8 text-muted-foreground dark:text-mawaddah-gold/70">
            Take the free couple health assessment today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/assessment" 
              className="btn-primary text-lg px-8 py-3"
            >
              Get Started Now
            </Link>
            <a 
              href="https://paystack.com/pay/mawaddah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-mawaddah-gold text-background font-medium rounded-md hover:bg-opacity-90 transition-colors duration-200 text-lg"
            >
              Donate
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

export default CallToAction;
