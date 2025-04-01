
import { useState } from 'react';

const faqs = [
  {
    question: "What is Mawaddah?",
    answer: "Mawaddah is a free tool for Muslim couples to assess their relationship health and receive Islamically grounded advice."
  },
  {
    question: "Do I need to sign up?",
    answer: "No! You can take the assessment without signing up. Just provide an email to receive the full report if you choose to unlock it."
  },
  {
    question: "Is the assessment really free?",
    answer: "Yes! The assessment and basic report are free. You can unlock a detailed report for a small fee."
  },
  {
    question: "How is my data protected?",
    answer: "We don't store sensitive data. The assessment runs locally in your browser, and we only collect your email if you opt for the full report."
  },
  {
    question: "What if my score is low?",
    answer: "You'll get tips to improve your relationship. More support features, like counselor connections, are coming soon!"
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="calligraphy-heading text-3xl md:text-4xl mb-4 text-primary dark:text-mawaddah-gold">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground dark:text-mawaddah-gold/70">
            Got questions? We've got answers.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border border-muted dark:border-mawaddah-green-light/20 rounded-lg overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full p-5 text-left bg-white dark:bg-mawaddah-green-dark hover:bg-muted dark:hover:bg-mawaddah-green"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-primary dark:text-mawaddah-gold">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-primary dark:text-mawaddah-gold transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <p className="p-5 bg-muted/50 dark:bg-mawaddah-green text-muted-foreground dark:text-mawaddah-gold/80">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
