import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faq";
import { cn } from "@/lib/utils";

interface FaqSectionProps {
  /** Show the section heading. The FAQ page has its own page heading. */
  showHeading?: boolean;
  /** Limit how many questions are shown (e.g. on the home page) */
  limit?: number;
}

const FaqSection = ({ showHeading = true, limit }: FaqSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className={cn("px-4", showHeading && "py-16 md:py-24")}>
      <div className="container mx-auto">
        {showHeading && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Got questions? We've got answers.</p>
          </div>
        )}

        <div className="mx-auto max-w-3xl space-y-3">
          {items.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className="card-surface overflow-hidden shadow-sm">
                <h3>
                  <button
                    className="flex w-full items-center justify-between gap-4 p-5 text-left hover:bg-muted/60 dark:hover:bg-mawaddah-green"
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="text-lg font-semibold text-primary dark:text-mawaddah-gold">{faq.question}</span>
                    <ChevronDown
                      className={cn("h-5 w-5 flex-shrink-0 text-primary transition-transform dark:text-mawaddah-gold", open && "rotate-180")}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={cn("grid transition-all duration-300", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-muted p-5 leading-relaxed text-muted-foreground dark:border-mawaddah-green-light/20 dark:text-mawaddah-gold/80">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
