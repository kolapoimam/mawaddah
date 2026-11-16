import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { DONATE_URL } from "@/lib/site";

const CallToAction = () => {
  return (
    <section className="bg-mawaddah-pink px-4 py-16 dark:bg-mawaddah-green-dark md:py-20">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <Heart className="mx-auto mb-4 animate-heartbeat text-primary dark:text-mawaddah-gold" size={36} fill="currentColor" />
          <h2 className="section-title">Ready to Nurture Your Love?</h2>
          <p className="section-subtitle mb-8">Take the free couple health assessment today.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/assessment" className="btn-primary px-8 text-lg">
              Get Started Now
            </Link>
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-8 text-lg"
            >
              Support with a Donation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
