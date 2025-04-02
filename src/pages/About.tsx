
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="calligraphy-heading text-3xl md:text-4xl mb-8 text-primary dark:text-mawaddah-gold text-center">
              About Mawaddah
            </h1>
            
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <img 
                src="https://www.pexels.com/photo/couple-holding-hands-over-table-4046987?w=1200&auto=format&fit=crop&q=80"
                alt="African Muslim couple" 
                className="w-full h-64 object-cover rounded-xl shadow-md mb-10"
              />
              
              <h2 className="text-primary dark:text-mawaddah-gold text-center mt-12 mb-6">Our Story</h2>
              <p className="text-justify mb-8">
                Mawaddah was born out of a desire to help Muslim couples strengthen their relationships through the beautiful guidance of Islam. The name "Mawaddah" comes from the Quranic verse (Ar-Rum 30:21) where Allah mentions that He places mawaddah (love) and rahmah (mercy) between spouses.
              </p>
              
              <h2 className="text-primary dark:text-mawaddah-gold text-center mt-12 mb-6">Our Mission</h2>
              <p className="text-justify mb-8">
                We aim to provide Muslim couples with the tools and resources they need to assess, understand, and strengthen their relationships in alignment with Islamic principles. Through our couple health assessment and personalized guidance, we hope to contribute to healthier, happier Muslim marriages.
              </p>
              
              <h2 className="text-primary dark:text-mawaddah-gold text-center mt-12 mb-6">Our Approach</h2>
              <p className="text-justify mb-6">
                Mawaddah combines psychological insights with Islamic teachings to offer a holistic approach to relationship health. Our assessments and recommendations are designed with the following principles in mind:
              </p>
              
              <ul className="space-y-4 mb-10">
                <li>Rooted in Islamic values and teachings</li>
                <li>Respectful of cultural diversity within the Muslim community</li>
                <li>Practical and applicable to everyday life</li>
                <li>Private and confidential</li>
                <li>Accessible to all Muslims regardless of background</li>
              </ul>
              
              <h2 className="text-primary dark:text-mawaddah-gold text-center mt-12 mb-6">Looking Forward</h2>
              <p className="text-justify mb-8">
                We're continuously working to expand our offerings to better serve the Muslim community. In the future, we plan to introduce more resources, including counseling services, community forums, and a mobile app to make our tools even more accessible.
              </p>
              
              <p className="text-justify mb-10">
                At Mawaddah, we believe that a strong marriage is a cornerstone of a healthy society. By helping couples nurture their relationships, we hope to contribute to stronger families and communities.
              </p>
              
              <div className="bg-mawaddah-pink/20 dark:bg-mawaddah-gold/10 p-6 rounded-lg mt-12">
                <p className="italic text-center">
                  "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought." <br />
                  <span className="font-semibold mt-2 block">- Quran 30:21</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
