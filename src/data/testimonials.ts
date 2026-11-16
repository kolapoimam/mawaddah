/**
 * Testimonials shown on the home page.
 * Avatars are DiceBear "notionists" images saved in public/avatars.
 * After adding or renaming a person, run `npm run avatars`.
 */
export interface Testimonial {
  id: number;
  quote: string;
  couple: [string, string];
  city: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The assessment gave us a clear picture of our relationship. The tips were so practical and rooted in Islamic teachings!",
    couple: ["Fatima", "Ahmed"],
    city: "Lagos",
    rating: 5,
  },
  {
    id: 2,
    quote: "We loved the Islamic focus of Mawaddah. It helped us reconnect through prayer and improved our spiritual bond.",
    couple: ["Zainab", "Yusuf"],
    city: "Abuja",
    rating: 5,
  },
  {
    id: 3,
    quote: "The full report showed us exactly where to start. The Islamic guidance really helped us navigate our differences.",
    couple: ["Amina", "Ibrahim"],
    city: "Kano",
    rating: 5,
  },
  {
    id: 4,
    quote: "After 7 years of marriage, we discovered new aspects of our relationship through the assessment. It was eye-opening!",
    couple: ["Aisha", "Muhammad"],
    city: "Kaduna",
    rating: 4,
  },
  {
    id: 5,
    quote: "As newlyweds, this assessment helped us set healthy patterns from the beginning. The Islamic foundation makes it unique.",
    couple: ["Khadija", "Hassan"],
    city: "Port Harcourt",
    rating: 5,
  },
];

/** Path of a person's DiceBear avatar in /public */
export const avatarUrl = (name: string) => `/avatars/${name.toLowerCase()}.svg`;
