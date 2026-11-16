import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { images } from "@/data/images";
import SafeImage from "./SafeImage";

const slides = [
  {
    id: 1,
    title: "Discover Your Couple Health",
    subtitle: "Take Our Free Assessment!",
    image: images.heroGroceries,
    alt: "Muslim couple shopping for groceries together",
    cta: { text: "Start Now", link: "/assessment" },
  },
  {
    id: 2,
    title: "Get Personalized Tips",
    subtitle: "To Rekindle Your Love",
    image: images.heroBride,
    alt: "Bride in a wedding dress holding a bouquet of flowers",
    cta: { text: "Learn More", link: "/about" },
  },
  {
    id: 3,
    title: "Get Your Full Report",
    subtitle: "To Deepen Your Connection",
    image: images.heroPraying,
    alt: "Couple making dua together at the table before eating",
    cta: { text: "See How", link: "/faq" },
  },
];

const HeroCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveSlide((index + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => setActiveSlide((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      className="relative h-[520px] w-full overflow-hidden bg-mawaddah-dark md:h-[620px]"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, index) => {
        const active = activeSlide === index;
        return (
          <div
            key={slide.id}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            aria-hidden={!active}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              active ? "z-10 opacity-100" : "z-0 opacity-0"
            )}
          >
            <SafeImage
              src={slide.image}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-cover"
              showMark={false}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
            <div className="absolute inset-0 bg-mawaddah-dark/60" />

            <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
              {active && (
                <div className="animate-fade-in">
                  <h2 className="calligraphy-heading mb-2 text-4xl text-white md:text-5xl lg:text-6xl">{slide.title}</h2>
                  <p className="mb-6 text-xl text-mawaddah-gold md:text-2xl">{slide.subtitle}</p>
                  {slide.id === 1 && (
                    <div className="mb-6">
                      <Heart className="inline-block animate-heartbeat text-mawaddah-pink" size={40} fill="currentColor" />
                    </div>
                  )}
                  <Link to={slide.cta.link} tabIndex={active ? 0 : -1} className="btn-primary inline-flex items-center">
                    {slide.cta.text}
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <button
        onClick={() => goTo(activeSlide - 1)}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => goTo(activeSlide + 1)}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              "h-3 rounded-full transition-all",
              activeSlide === index ? "w-8 bg-mawaddah-gold" : "w-3 bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeSlide === index}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
