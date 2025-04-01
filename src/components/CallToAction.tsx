
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
          <Link to="/assessment" className="btn-primary text-lg px-8 py-3">
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
