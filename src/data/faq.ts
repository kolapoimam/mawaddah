/** Frequently asked questions. Used on the home page, the FAQ page, structured data and llms-full.txt */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "What is Mawaddah?",
    answer: "Mawaddah is a free tool for Muslim couples to assess their relationship health and receive Islamically grounded advice. Named after the Arabic word for 'abundant love' mentioned in the Quran (30:21), our platform helps couples nurture their bond with love and mercy."
  },
  {
    question: "Do I need to sign up?",
    answer: "No. You can take the assessment and see your full report without signing up or sharing an email. We believe relationship support should be accessible without barriers."
  },
  {
    question: "Is the assessment really free?",
    answer: "Yes. The assessment and the full detailed report are completely free. If Mawaddah benefits you, you can support the project with a donation, but it is never required."
  },
  {
    question: "How is my data protected?",
    answer: "We prioritize your privacy. The assessment runs entirely in your browser and your answers are never sent to or stored on a server. Your result is kept only in your browser tab and disappears when you close it."
  },
  {
    question: "What if my score is low?",
    answer: "A low score doesn't mean your relationship is doomed. You'll receive targeted tips to address specific areas that need improvement. We believe every relationship can grow with the right guidance and effort. More support features, like counselor connections, are coming soon. If things feel serious, please speak to a trusted scholar or a qualified counselor."
  },
  {
    question: "How long does the assessment take?",
    answer: "The assessment takes about 5 minutes to complete. We've designed it to be thorough yet concise, respecting your time while gathering meaningful insights about your relationship."
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
  },
  {
    question: "Is Mawaddah open source?",
    answer: "Yes. Mawaddah is open source under the MIT License. Anyone can read the code, suggest better questions, or contribute features on GitHub at github.com/kolapoimam/mawaddah."
  }
];
