/**
 * Per page SEO metadata. Used at runtime by `useSeo` and at build time by
 * `scripts/seo-build.mjs`, which writes a static HTML file per route so search engines
 * and AI assistants that do not run JavaScript still see real content.
 */
export const SITE = {
  name: "Mawaddah",
  url: "https://mawaddah-beta.vercel.app",
  tagline: "Nurture Your Love, Islamically",
  description:
    "Mawaddah is a free couple health assessment for Muslim couples. Answer a few honest questions and get a score, a full report on communication, faith, conflict, goals, emotions and money, with Islamic guidance you can download as PNG or PDF. Private, no sign up.",
  ogImage: "/og-image.png",
  author: "Kolapo Imam",
  authorUrl: "https://kolapo.ng",
  repo: "https://github.com/kolapoimam/mawaddah",
};

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  /** Plain text summary for crawlers that do not run JavaScript */
  summary: string;
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
  /** Exclude from sitemap and ask search engines not to index */
  noindex?: boolean;
}

export const routes: RouteSeo[] = [
  {
    path: "/",
    title: "Mawaddah | Free Couple Health Assessment for Muslim Couples",
    description: SITE.description,
    summary:
      "Mawaddah helps Muslim couples, married or engaged, understand and strengthen their relationship. The free Couple Health Assessment scores six areas of marriage: communication, spiritual connection, conflict resolution, shared goals, emotional intimacy and financial harmony. You get an overall score, a full report with practical steps and a reminder from the Quran or Sunnah for each area, and downloads as PNG or PDF. It is named after Quran 30:21, where Allah places mawaddah (affection) and rahmah (mercy) between spouses.",
    priority: 1,
    changefreq: "weekly",
  },
  {
    path: "/assessment",
    title: "Muslim Couple Health Assessment (Free, 5 Minutes) | Mawaddah",
    description:
      "How healthy is our marriage? Take Mawaddah's free Islamic couple health assessment. About 20 questions on communication, praying together, conflict, shared goals, emotional support and money. No sign up.",
    summary:
      "The assessment starts with a few questions about you (gender, years married or engaged, age group, children, living situation, income group), which are not scored. It then asks 16 scored questions across six areas. Each answer scores 1, 3 or 5 points. Results show an overall percentage and a percentage for each area.",
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/about",
    title: "About Mawaddah | Love and Mercy in Muslim Marriage",
    description:
      "Why Mawaddah exists, the meaning of its name from Quran 30:21, and the principles behind its Islamic approach to couple health.",
    summary:
      "Mawaddah combines practical relationship insight with Islamic teaching. It is rooted in Islamic values, respectful of cultural diversity, practical, private, and accessible to all Muslims. It is open source under the MIT License.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/faq",
    title: "FAQ | Mawaddah Couple Health Assessment",
    description:
      "Is Mawaddah free? Is my data private? Can we take it together? Answers to common questions about the Mawaddah couple health assessment.",
    summary: "Answers to common questions about Mawaddah, its privacy, cost, scoring and who it is for.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/contact",
    title: "Contact Mawaddah",
    description: "Send a message, share feedback, or suggest a feature for Mawaddah.",
    summary: "Contact Mawaddah by email or open an issue on GitHub for feedback and ideas.",
    priority: 0.4,
    changefreq: "yearly",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Mawaddah",
    description: "Mawaddah runs in your browser. Your answers are never sent to or stored on a server.",
    summary:
      "Assessment answers stay on your device and are cleared when the tab closes. No account or email is needed. Anonymous page view analytics only.",
    priority: 0.3,
    changefreq: "yearly",
  },
  {
    path: "/assessment/results",
    title: "Your Couple Health Results | Mawaddah",
    description: "Your Mawaddah couple health score and full report.",
    summary: "Results of the Mawaddah couple health assessment. Take the assessment to see yours.",
    priority: 0,
    changefreq: "yearly",
    noindex: true,
  },
];

export const getRouteSeo = (path: string) => routes.find((r) => r.path === path);
