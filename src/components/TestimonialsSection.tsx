import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { avatarUrl, testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => setActive((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="bg-mawaddah-pink-light py-16 dark:bg-mawaddah-green-dark/60 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <h2 className="section-title">What Couples Are Saying</h2>
          <p className="section-subtitle">Hear from couples who've used Mawaddah to strengthen their love.</p>
        </div>

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {testimonials.map((t, index) => (
                <figure key={t.id} className="w-full flex-shrink-0 px-2 md:px-4" aria-hidden={index !== active}>
                  <div className="card-surface p-8">
                    <div className="mb-6 flex justify-center">
                      <div className="flex -space-x-4">
                        {t.couple.map((name) => (
                          <img
                            key={name}
                            src={avatarUrl(name)}
                            alt=""
                            width={80}
                            height={80}
                            className="h-20 w-20 rounded-full border-4 border-white dark:border-mawaddah-green-dark"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mb-4 flex justify-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < t.rating ? "text-mawaddah-gold" : "text-gray-300 dark:text-mawaddah-green-light"}
                          fill="currentColor"
                        />
                      ))}
                    </div>

                    <blockquote className="mb-6 text-center text-xl italic leading-relaxed text-primary dark:text-mawaddah-gold">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="text-center text-sm font-medium text-muted-foreground dark:text-mawaddah-gold/70">
                      {t.couple.join(" & ")}, {t.city}
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={cn(
                  "h-3 rounded-full transition-all",
                  active === index ? "w-8 bg-mawaddah-gold" : "w-3 bg-mawaddah-pink-dark dark:bg-mawaddah-green-light/40"
                )}
                aria-label={`View testimonial ${index + 1}`}
                aria-current={active === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
