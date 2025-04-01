
export type AssessmentQuestion = {
  id: number;
  category: string;
  question: string;
  answerType: 'scale' | 'options';
  options?: { 
    value: string; 
    text: string;
    points?: number;
  }[];
  scalePoints?: {
    always: number;
    sometimes: number;
    rarely: number;
  };
};

export const assessmentQuestions: AssessmentQuestion[] = [
  // Demographics
  {
    id: 1,
    category: "demographics",
    question: "What is your gender?",
    answerType: "options",
    options: [
      { value: "male", text: "Male" },
      { value: "female", text: "Female" }
    ]
  },
  {
    id: 2,
    category: "demographics",
    question: "How long have you been married/engaged?",
    answerType: "options",
    options: [
      { value: "less_than_1", text: "Less than 1 year" },
      { value: "1_to_5", text: "1-5 years" },
      { value: "5_to_10", text: "5-10 years" },
      { value: "10_plus", text: "10+ years" }
    ]
  },
  {
    id: 3,
    category: "demographics",
    question: "What is your age group?",
    answerType: "options",
    options: [
      { value: "18_to_25", text: "18-25" },
      { value: "26_to_35", text: "26-35" },
      { value: "36_to_45", text: "36-45" },
      { value: "46_plus", text: "46+" }
    ]
  },
  {
    id: 4,
    category: "demographics",
    question: "Do you have children?",
    answerType: "options",
    options: [
      { value: "yes", text: "Yes" },
      { value: "no", text: "No" }
    ]
  },
  {
    id: 5,
    category: "demographics",
    question: "If yes, how many children do you have?",
    answerType: "options",
    options: [
      { value: "none", text: "None" },
      { value: "1", text: "1" },
      { value: "2", text: "2" },
      { value: "3", text: "3" },
      { value: "4_plus", text: "4+" }
    ]
  },
  {
    id: 6,
    category: "demographics",
    question: "What are your living conditions?",
    answerType: "options",
    options: [
      { value: "together", text: "Living together" },
      { value: "apart", text: "Living apart due to work or family" },
      { value: "extended", text: "Living with extended family" }
    ]
  },
  {
    id: 7,
    category: "demographics",
    question: "What is your earning class?",
    answerType: "options",
    options: [
      { value: "low", text: "Low income" },
      { value: "middle", text: "Middle income" },
      { value: "upper", text: "Upper income" }
    ]
  },
  
  // Communication
  {
    id: 8,
    category: "communication",
    question: "How often do you discuss your feelings openly with your partner?",
    answerType: "scale",
    scalePoints: {
      always: 5,
      sometimes: 3,
      rarely: 1
    }
  },
  {
    id: 9,
    category: "communication",
    question: "Do you feel heard when you share your thoughts?",
    answerType: "scale",
    scalePoints: {
      always: 5,
      sometimes: 3,
      rarely: 1
    }
  },
  {
    id: 10,
    category: "communication",
    question: "How frequently do you and your partner discuss your future together?",
    answerType: "options",
    options: [
      { value: "often", text: "Often", points: 5 },
      { value: "occasionally", text: "Occasionally", points: 3 },
      { value: "rarely", text: "Rarely", points: 1 }
    ]
  },
  
  // Spiritual Connection
  {
    id: 11,
    category: "spiritual",
    question: "Do you pray together regularly?",
    answerType: "options",
    options: [
      { value: "yes", text: "Yes", points: 5 },
      { value: "sometimes", text: "Sometimes", points: 3 },
      { value: "no", text: "No", points: 1 }
    ]
  },
  {
    id: 12,
    category: "spiritual",
    question: "How often do you make dua for your relationship?",
    answerType: "options",
    options: [
      { value: "daily", text: "Daily", points: 5 },
      { value: "weekly", text: "Weekly", points: 3 },
      { value: "rarely", text: "Rarely", points: 1 }
    ]
  },
  {
    id: 13,
    category: "spiritual",
    question: "Do you study or discuss Islamic topics together?",
    answerType: "scale",
    scalePoints: {
      always: 5,
      sometimes: 3,
      rarely: 1
    }
  },
  
  // Conflict Resolution
  {
    id: 14,
    category: "conflict",
    question: "How do you handle disagreements?",
    answerType: "options",
    options: [
      { value: "calmly", text: "Calmly", points: 5 },
      { value: "tension", text: "With tension", points: 3 },
      { value: "avoid", text: "Avoid them", points: 1 }
    ]
  },
  {
    id: 15,
    category: "conflict",
    question: "Do you resolve conflicts within a day?",
    answerType: "scale",
    scalePoints: {
      always: 5,
      sometimes: 3,
      rarely: 1
    }
  },
  {
    id: 16,
    category: "conflict",
    question: "Do you approach conflicts with the intention to understand rather than win?",
    answerType: "scale",
    scalePoints: {
      always: 5,
      sometimes: 3,
      rarely: 1
    }
  },
  
  // Shared Goals and Lifestyle
  {
    id: 17,
    category: "goals",
    question: "Do you have aligned goals for your future?",
    answerType: "options",
    options: [
      { value: "yes", text: "Yes", points: 5 },
      { value: "somewhat", text: "Somewhat", points: 3 },
      { value: "no", text: "No", points: 1 }
    ]
  },
  {
    id: 18,
    category: "goals",
    question: "How often do you spend quality time together?",
    answerType: "options",
    options: [
      { value: "daily", text: "Daily", points: 5 },
      { value: "weekly", text: "Weekly", points: 3 },
      { value: "rarely", text: "Rarely", points: 1 }
    ]
  },
  {
    id: 19,
    category: "goals",
    question: "Do you support each other's personal growth and ambitions?",
    answerType: "scale",
    scalePoints: {
      always: 5,
      sometimes: 3,
      rarely: 1
    }
  },
  
  // Emotional Intimacy
  {
    id: 20,
    category: "emotional",
    question: "Do you feel emotionally supported by your partner?",
    answerType: "scale",
    scalePoints: {
      always: 5,
      sometimes: 3,
      rarely: 1
    }
  },
  {
    id: 21,
    category: "emotional",
    question: "Do you express appreciation and gratitude to each other regularly?",
    answerType: "scale",
    scalePoints: {
      always: 5,
      sometimes: 3,
      rarely: 1
    }
  },
  
  // Financial Harmony
  {
    id: 22,
    category: "financial",
    question: "Do you agree on financial decisions?",
    answerType: "scale",
    scalePoints: {
      always: 5,
      sometimes: 3,
      rarely: 1
    }
  },
  {
    id: 23,
    category: "financial",
    question: "Do you have open discussions about money without conflict?",
    answerType: "scale",
    scalePoints: {
      always: 5,
      sometimes: 3,
      rarely: 1
    }
  }
];
