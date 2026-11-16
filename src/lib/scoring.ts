import { assessmentQuestions, AssessmentQuestion } from "@/data/assessmentQuestions";

export interface Answer {
  questionId: number;
  value: string;
  points?: number;
}

export interface CategoryScore {
  score: number;
  total: number;
  percentage: number;
}

export interface AssessmentResult {
  score: number;
  percentage: number;
  answers: Answer[];
  categoriesScore: Record<string, CategoryScore>;
  timestamp: number;
}

export const RESULT_STORAGE_KEY = "assessmentResult";

/** Questions that should be shown given the answers so far (handles `showIf`) */
export function visibleQuestions(answers: Answer[]): AssessmentQuestion[] {
  return assessmentQuestions.filter((q) => {
    if (!q.showIf) return true;
    return answers.some((a) => a.questionId === q.showIf!.questionId && a.value === q.showIf!.value);
  });
}

export const isScored = (q: AssessmentQuestion) => q.category !== "demographics";

function pointsFor(q: AssessmentQuestion, value: string): number {
  if (q.answerType === "options") return q.options?.find((o) => o.value === value)?.points ?? 0;
  return q.scalePoints?.[value as keyof NonNullable<AssessmentQuestion["scalePoints"]>] ?? 0;
}

function maxPointsFor(q: AssessmentQuestion): number {
  if (q.answerType === "options") return Math.max(0, ...(q.options ?? []).map((o) => o.points ?? 0));
  return Math.max(0, ...Object.values(q.scalePoints ?? {}));
}

/**
 * Overall and per category score. Demographic questions are not scored.
 * Each scored question is worth its highest option (5 points today).
 */
export function calculateResult(answers: Answer[]): AssessmentResult {
  const categoriesScore: Record<string, CategoryScore> = {};
  let score = 0;
  let total = 0;

  for (const q of assessmentQuestions.filter(isScored)) {
    const answer = answers.find((a) => a.questionId === q.id);
    if (!answer) continue;
    const points = pointsFor(q, answer.value);
    const max = maxPointsFor(q);
    score += points;
    total += max;
    categoriesScore[q.category] ??= { score: 0, total: 0, percentage: 0 };
    categoriesScore[q.category].score += points;
    categoriesScore[q.category].total += max;
  }

  for (const c of Object.values(categoriesScore)) {
    c.percentage = c.total ? Math.round((c.score / c.total) * 100) : 0;
  }

  return {
    score,
    percentage: total ? Math.round((score / total) * 100) : 0,
    answers,
    categoriesScore,
    timestamp: Date.now(),
  };
}
