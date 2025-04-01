
import { useState } from 'react';

const faqs = [
  {
    question: "What is Mawaddah?",
    answer: "Mawaddah is a free tool for Muslim couples to assess their relationship health and receive Islamically grounded advice. Named after the Arabic word for 'abundant love' mentioned in the Quran (30:21), our platform helps couples nurture their bond with love and mercy."
  },
  {
    question: "Do I need to sign up?",
    answer: "No! You can take the assessment without signing up. Just provide an email to receive the full report if you choose to unlock it. We believe in making relationship support accessible without barriers."
  },
  {
    question: "Is the assessment really free?",
    answer: "Yes! The assessment and basic report are completely free. You can unlock a detailed report for a small fee of ₦5,000, which provides in-depth analysis and personalized recommendations."
  },
  {
    question: "How is my data protected?",
    answer: "We prioritize your privacy. The assessment runs locally in your browser, and we don't store your responses on our servers. We only collect your email if you opt for the full report, and it's solely used for delivering the report to you."
  },
  {
    question: "What if my score is low?",
    answer: "A low score doesn't mean your relationship is doomed. You'll receive targeted tips to address specific areas that need improvement. We believe every relationship can grow with the right guidance and effort. More support features, like counselor connections, are coming soon!"
  },
  {
    question: "How long does the assessment take?",
    answer: "The assessment takes approximately 5-10 minutes to complete. We've designed it to be thorough yet concise, respecting your time while gathering meaningful insights about your relationship."
  },
  {
    question: "Can we take the assessment together as a couple?",
    answer: "Yes! In fact, we encourage couples to take the assessment together. It can open up valuable conversations and provide a shared understanding of your relationship dynamics."
  },
  {
    question: "Is Mawaddah only for married couples?",
    answer: "Mawaddah is designed for both married and engaged Muslim couples. If you're engaged, the assessment can help you identify areas to discuss before marriage. If you're married, it can help strengthen your existing bond."
  },
  {
    question: "What topics does the assessment cover?",
    answer: "The assessment covers key relationship areas including communication, spiritual connection, conflict resolution, shared goals, emotional intimacy, and financial harmony. These are fundamental aspects that contribute to a healthy Islamic marriage."
  },
  {
    question: "How often should we take the assessment?",
    answer: "We recommend taking the assessment every 3-6 months to track your progress and identify new areas for growth. Relationships evolve, and regular check-ins can help you stay connected and address emerging challenges."
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
                  openIndex === index ? 'max-h-96' : 'max-h-0'
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
