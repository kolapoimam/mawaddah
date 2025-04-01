
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "The assessment gave us a clear picture of our relationship. The tips were so practical and rooted in Islamic teachings!",
    author: "Fatima & Ahmed, Lagos",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsYWNrJTIwbXVzbGltJTIwY291cGxlfGVufDB8fDB8fHww"
  },
  {
    id: 2,
    quote: "We loved the Islamic focus of Mawaddah. It helped us reconnect through prayer and improved our spiritual bond.",
    author: "Zainab & Yusuf, Abuja",
    rating: 5,
    image: "https://images.unsplash.com/photo-1606216794074-735e91dafa5e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGFmcmljYW4lMjBjb3VwbGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    quote: "The full report was worth every Naira! The personalized Islamic guidance really helped us navigate our differences.",
    author: "Amina & Ibrahim, Kano",
    rating: 5,
    image: "https://images.unsplash.com/photo-1583975235603-b10252029af4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    quote: "After 7 years of marriage, we discovered new aspects of our relationship through the assessment. It was eye-opening!",
    author: "Aisha & Muhammad, Kaduna",
    rating: 4,
    image: "https://images.unsplash.com/photo-1621787279751-2525faa8559f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGFmcmljYW4lMjBjb3VwbGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 5,
    quote: "As newlyweds, this assessment helped us set healthy patterns from the beginning. The Islamic foundation makes it unique.",
    author: "Khadija & Hassan, Port Harcourt",
    rating: 5,
    image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWZyaWNhbiUyMGNvdXBsZXxlbnwwfHwwfHx8MA%3D%3D"
  }
];

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-mawaddah-gold' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };
  
  return (
    <section className="py-16 md:py-24 bg-mawaddah-pink/30 dark:bg-mawaddah-green-light/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="calligraphy-heading text-3xl md:text-4xl mb-4 text-primary dark:text-mawaddah-gold">
            What Couples Are Saying
          </h2>
          <p className="text-lg text-muted-foreground dark:text-mawaddah-gold/70">
            Hear from couples who've used Mawaddah to strengthen their love.
          </p>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="transition-transform duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white dark:bg-mawaddah-green-dark rounded-xl p-8 shadow-lg">
                    <div className="flex justify-center mb-4">
                      {renderRatingStars(testimonial.rating)}
                    </div>
                    
                    {testimonial.image && (
                      <div className="mb-6 flex justify-center">
                        <img 
                          src={testimonial.image} 
                          alt={`${testimonial.author}`}
                          className="w-24 h-24 object-cover rounded-full border-2 border-mawaddah-gold"
                        />
                      </div>
                    )}
                    
                    <blockquote className="text-xl italic text-center mb-6 text-primary dark:text-mawaddah-gold">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="text-center text-sm text-muted-foreground dark:text-mawaddah-gold/70">
                      — {testimonial.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full focus:outline-none transition-colors ${
                  activeTestimonial === index 
                    ? 'bg-mawaddah-gold' 
                    : 'bg-gray-300 dark:bg-mawaddah-green-light/30'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
