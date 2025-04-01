
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    title: "Discover Your Couple Health",
    subtitle: "Take Our Free Assessment!",
    image: "https://images.unsplash.com/photo-1606333259602-77e7b4bb39e6?auto=format&fit=crop&q=80&w=1470",
    cta: {
      text: "Start Now",
      link: "/assessment"
    }
  },
  {
    id: 2,
    title: "Get Personalized Tips",
    subtitle: "To Rekindle Your Love",
    image: "https://images.unsplash.com/photo-1492176273113-2d51f47b23b0?auto=format&fit=crop&q=80&w=1633",
    cta: {
      text: "Learn More",
      link: "/about"
    }
  },
  {
    id: 3,
    title: "Unlock a Full Report",
    subtitle: "To Deepen Your Connection",
    image: "https://images.unsplash.com/photo-1629615140233-276a5fb7b6f7?auto=format&fit=crop&q=80&w=1587",
    cta: {
      text: "See How",
      link: "/faq"
    }
  }
];

const HeroCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  useEffect(() => {
    // Auto-rotate slides
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };
  
  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };
  
  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 bg-mawaddah-dark",
            activeSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Image with overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mawaddah-dark/80 to-mawaddah-dark/30"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
            <div className="animate-fade-in">
              <h2 className="calligraphy-heading text-4xl md:text-5xl lg:text-6xl text-white mb-2">
                {slide.title}
              </h2>
              <p className="text-xl md:text-2xl text-mawaddah-gold mb-6">{slide.subtitle}</p>
              
              {slide.id === 1 && (
                <div className="mb-6 relative">
                  <Heart className="text-mawaddah-pink inline-block animate-heartbeat" size={40} />
                </div>
              )}
              
              <Link
                to={slide.cta.link}
                className="btn-primary inline-flex items-center"
              >
                {slide.cta.text}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 focus:outline-none"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 focus:outline-none"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      
      {/* Navigation dots */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full focus:outline-none ${
              activeSlide === index ? "bg-mawaddah-gold" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
