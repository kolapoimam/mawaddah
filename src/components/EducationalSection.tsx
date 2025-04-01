
import { Heart, Moon, Lightbulb } from 'lucide-react';

const EducationalSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted dark:bg-mawaddah-green-dark/50 islamic-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="calligraphy-heading text-3xl md:text-4xl mb-4 text-primary dark:text-mawaddah-gold">
            Why Understanding Your Couple Health Matters
          </h2>
          <p className="text-lg text-muted-foreground dark:text-mawaddah-gold/70">
            Learn how Mawaddah helps you grow closer as a couple.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="bg-white dark:bg-mawaddah-green-dark rounded-xl p-6 shadow-lg text-center transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-mawaddah-pink/20 dark:bg-mawaddah-gold/20">
                <Heart className="w-8 h-8 text-primary dark:text-mawaddah-gold" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-primary dark:text-mawaddah-gold">Strengthen Your Bond</h3>
            <p className="text-muted-foreground dark:text-mawaddah-gold/70">
              A healthy marriage requires effort. Our assessment highlights what's working and where you can improve, so you can grow closer every day.
            </p>
          </div>
          
          {/* Column 2 */}
          <div className="bg-white dark:bg-mawaddah-green-dark rounded-xl p-6 shadow-lg text-center transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-mawaddah-pink/20 dark:bg-mawaddah-gold/20">
                <Moon className="w-8 h-8 text-primary dark:text-mawaddah-gold" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-primary dark:text-mawaddah-gold">Islamic Guidance</h3>
            <p className="text-muted-foreground dark:text-mawaddah-gold/70">
              All our insights are rooted in Islamic teachings, ensuring your journey is halal and blessed.
            </p>
          </div>
          
          {/* Column 3 */}
          <div className="bg-white dark:bg-mawaddah-green-dark rounded-xl p-6 shadow-lg text-center transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-mawaddah-pink/20 dark:bg-mawaddah-gold/20">
                <Lightbulb className="w-8 h-8 text-primary dark:text-mawaddah-gold" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-primary dark:text-mawaddah-gold">Practical Steps</h3>
            <p className="text-muted-foreground dark:text-mawaddah-gold/70">
              Get actionable tips to rekindle your love, from planning a halal date night to praying together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalSection;
