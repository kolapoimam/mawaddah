/**
 * The six areas the Couple Health Assessment scores.
 * Each one has a short description, guidance for three score bands, and a reminder
 * from the Quran or Sunnah. Please include a reference for any religious text you add.
 */
export type CategoryId = "communication" | "spiritual" | "conflict" | "goals" | "emotional" | "financial";

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  emoji: string;
  description: string;
  insight: { strong: string; growing: string; care: string };
  actions: { strong: string[]; growing: string[]; care: string[] };
  reminder: { text: string; source: string };
}

export const categories: Record<CategoryId, CategoryInfo> = {
  communication: {
    id: "communication",
    label: "Communication",
    emoji: "💬",
    description: "How openly you share feelings, listen, and talk about your future.",
    insight: {
      strong: "You talk openly and feel heard. This is the foundation everything else rests on.",
      growing: "You communicate well on good days, but some feelings and plans stay unspoken.",
      care: "Important thoughts are going unsaid or unheard. Small daily conversations can change this quickly.",
    },
    actions: {
      strong: ["Keep a weekly check in where each of you shares one high and one low.", "Plan one long term goal together this month."],
      growing: ["Try 10 minutes a day without phones to talk about your day.", "When your spouse speaks, repeat back what you heard before replying."],
      care: ["Start with one honest, gentle conversation this week about how you both feel.", "Agree on a calm signal for when either of you needs to pause and listen."],
    },
    reminder: {
      text: "And speak to people good words.",
      source: "Quran 2:83",
    },
  },
  spiritual: {
    id: "spiritual",
    label: "Spiritual Connection",
    emoji: "🕌",
    description: "Praying together, making dua for each other, and learning about the deen as a couple.",
    insight: {
      strong: "Your faith is something you share, not just something you each practise alone.",
      growing: "Faith is present in your home, but you could share more of it together.",
      care: "Your spiritual lives are running on separate tracks. Shared worship is a gentle place to reconnect.",
    },
    actions: {
      strong: ["Pick a short surah to memorise together this month.", "Make a habit of praying one sunnah prayer together."],
      growing: ["Pray at least one salah together each day.", "Make dua for each other by name, and tell each other you did."],
      care: ["Begin with one prayer together this week, even if it is short.", "Read a few ayat with translation together after Maghrib."],
    },
    reminder: {
      text: "May Allah have mercy on a man who gets up at night and prays, and wakes his wife.",
      source: "Sunan Abi Dawud 1308",
    },
  },
  conflict: {
    id: "conflict",
    label: "Conflict Resolution",
    emoji: "🤝",
    description: "How you handle disagreements and how quickly you return to peace.",
    insight: {
      strong: "You disagree without damaging the relationship and make peace quickly.",
      growing: "Most disagreements get resolved, but some leave tension that lingers.",
      care: "Conflicts are either heated or avoided. Learning to pause and listen will help you both feel safe.",
    },
    actions: {
      strong: ["Keep resolving issues the same day, before you sleep.", "Share what helped you through your last disagreement."],
      growing: ["Agree to take a short break when voices rise, then come back within the hour.", "Use 'I feel' sentences instead of 'you always'."],
      care: ["When angry, change your position, sit down, make wudu, then talk.", "If things feel stuck, involve a trusted elder or counselor from each side (Quran 4:35)."],
    },
    reminder: {
      text: "A man said to the Prophet ﷺ, advise me. He said: Do not become angry. He repeated it several times.",
      source: "Sahih al-Bukhari 6116",
    },
  },
  goals: {
    id: "goals",
    label: "Shared Goals",
    emoji: "🌱",
    description: "Whether your plans for the future line up and you spend quality time together.",
    insight: {
      strong: "You are building the same life and making time for each other along the way.",
      growing: "Your goals mostly overlap, but quality time or shared planning sometimes slips.",
      care: "You may be heading in different directions. Sitting down to plan together will bring you closer.",
    },
    actions: {
      strong: ["Write down three goals for the next year and review them together quarterly.", "Celebrate each other's wins, big and small."],
      growing: ["Set a regular halal date night and protect it.", "Ask each other: where do you see us in five years?"],
      care: ["Spend 30 minutes this week listing what each of you wants for your family.", "Find one activity you both enjoy and do it together weekly."],
    },
    reminder: {
      text: "They are clothing for you and you are clothing for them.",
      source: "Quran 2:187",
    },
  },
  emotional: {
    id: "emotional",
    label: "Emotional Intimacy",
    emoji: "❤️",
    description: "Feeling supported, appreciated and emotionally close.",
    insight: {
      strong: "You feel supported and appreciated. That warmth is a blessing to protect.",
      growing: "There is care between you, but it is not always expressed or felt.",
      care: "One or both of you may feel unseen. Simple, regular appreciation can make a big difference.",
    },
    actions: {
      strong: ["Keep thanking each other for the small things.", "Leave a short note or message of appreciation once a week."],
      growing: ["Tell your spouse one thing you appreciate about them every day.", "Ask: what is one thing I can do this week to support you?"],
      care: ["Start with a smile and a kind word each morning. Smiling at your brother is charity (Tirmidhi 1956).", "Set aside time to listen to each other without trying to fix anything."],
    },
    reminder: {
      text: "The best of you are those who are best to their families, and I am the best of you to my family.",
      source: "Jami at-Tirmidhi 3895",
    },
  },
  financial: {
    id: "financial",
    label: "Financial Harmony",
    emoji: "💰",
    description: "Agreeing on money decisions and talking about finances without conflict.",
    insight: {
      strong: "Money is a topic you handle as a team, not a source of tension.",
      growing: "You mostly agree on money, but some conversations still feel uncomfortable.",
      care: "Money is causing strain. A clear, shared plan will reduce worry for both of you.",
    },
    actions: {
      strong: ["Review your budget together once a month.", "Plan a shared sadaqah goal for the year."],
      growing: ["Agree on a spending limit that needs a joint decision.", "Set one savings goal you are both excited about."],
      care: ["Sit down together and write out your monthly income and expenses, without blame.", "Agree on the essentials first: rent, food, children, debts, then everything else."],
    },
    reminder: {
      text: "And those who, when they spend, are neither wasteful nor stingy, but hold a just balance between them.",
      source: "Quran 25:67",
    },
  },
};

export type Band = "strong" | "growing" | "care";

/** 80% and above is strong, 60 to 79 is growing, below 60 needs care */
export const bandFor = (percentage: number): Band =>
  percentage >= 80 ? "strong" : percentage >= 60 ? "growing" : "care";

export const bandLabel: Record<Band, string> = {
  strong: "Strong",
  growing: "Growing",
  care: "Needs care",
};

/** Solid colours for each band, safe to use in exported images */
export const bandColor: Record<Band, string> = {
  strong: "#1A5D1A",
  growing: "#9E8600",
  care: "#C2410C",
};
