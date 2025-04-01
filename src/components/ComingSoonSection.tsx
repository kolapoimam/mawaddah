
const ComingSoonSection = () => {
  const upcomingFeatures = [
    { 
      title: "Verified Counselors", 
      description: "Connect with Islamic counselors for personalized support." 
    },
    { 
      title: "Shared Activity Tracker", 
      description: "Log activities to rekindle your love and earn badges." 
    },
    { 
      title: "Islamic Resource Library", 
      description: "Access articles, videos, and hadiths on marriage." 
    },
    { 
      title: "Private Community Forum", 
      description: "Join a halal space to connect with other couples." 
    },
    { 
      title: "Dua and Reflection Journal", 
      description: "Log daily duas and reflections for your relationship." 
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-mawaddah-green text-white islamic-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="calligraphy-heading text-3xl md:text-4xl mb-4 text-mawaddah-gold">
            More Features Coming Soon!
          </h2>
          <p className="text-lg text-mawaddah-pink">
            We're working on new ways to support your marriage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10 relative overflow-hidden group"
            >
              {/* Pulse effect in the background */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-mawaddah-gold/20 rounded-full animate-ping"></div>
              
              <h3 className="text-lg font-semibold mb-3 text-mawaddah-gold relative z-10">
                {feature.title}
              </h3>
              <p className="text-mawaddah-pink-light relative z-10">
                {feature.description}
              </p>
              
              {/* Coming Soon Badge */}
              <div className="absolute top-2 right-2 bg-mawaddah-gold text-mawaddah-dark text-xs font-bold px-2 py-1 rounded-full transform rotate-12">
                Coming Soon
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block bg-mawaddah-gold/20 rounded-lg p-4 max-w-md">
            <p className="text-mawaddah-gold font-semibold mb-1">Stay Tuned!</p>
            <p className="text-sm text-mawaddah-pink-light">
              We're continuously developing new features to help strengthen your marriage. 
              Check back often or subscribe to our newsletter for updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
