
import { Link } from 'react-router-dom';

const IntroSection = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="calligraphy-heading text-3xl md:text-4xl mb-6 text-primary dark:text-mawaddah-gold">
            Welcome to Mawaddah – Nurturing Muslim Marriages with Love
          </h2>
          <p className="text-lg mb-8 text-muted-foreground dark:text-mawaddah-gold/70">
            A free, Islamically grounded tool to help couples assess and strengthen their relationship.
          </p>
          
          <div className="relative mb-10">
            <div className="relative bg-mawaddah-pink/20 dark:bg-mawaddah-green-light/10 rounded-2xl p-8 shadow-inner">
              <p className="text-foreground dark:text-mawaddah-gold-light">
                Mawaddah is here to support Muslim couples in building a blessed marriage filled with love and mercy, as inspired by the Quran (Ar-Rum 30:21). Our free couple health assessment helps you understand your relationship's strengths and areas for growth. Get a basic report instantly, and unlock a detailed report for deeper insights—all without needing to sign up. Whether you're newlyweds or celebrating years together, Mawaddah guides you with Islamic principles and practical advice.
              </p>
              <div className="mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1604404157820-e90f6ff383e6?w=800&auto=format&fit=crop&q=80" 
                  alt="African Muslim couple smiling together" 
                  className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md"
                />
              </div>
            </div>
          </div>
          
          <Link to="/assessment" className="btn-accent inline-flex items-center">
            <svg
              className="mr-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Take the Free Assessment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
