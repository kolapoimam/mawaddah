import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { AssessmentQuestion } from "@/data/assessmentQuestions";
import { categories, CategoryId } from "@/data/categories";
import { Answer, calculateResult, RESULT_STORAGE_KEY, visibleQuestions } from "@/lib/scoring";
import { cn } from "@/lib/utils";

// Kept for backwards compatibility with older imports
export type { AssessmentResult } from "@/lib/scoring";

const scaleOptions = [
  { value: "always", text: "Always" },
  { value: "sometimes", text: "Sometimes" },
  { value: "rarely", text: "Rarely" },
];

const AssessmentForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();

  const questions = useMemo(() => visibleQuestions(answers), [answers]);
  const totalSteps = questions.length;
  const question = questions[Math.min(currentStep, totalSteps - 1)];
  const currentAnswer = answers.find((a) => a.questionId === question.id);

  const finish = (finalAnswers: Answer[]) => {
    const result = calculateResult(finalAnswers);
    sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
    navigate("/assessment/results");
  };

  const handleAnswer = (q: AssessmentQuestion, value: string) => {
    // Replace any previous answer to this question
    let next = [...answers.filter((a) => a.questionId !== q.id), { questionId: q.id, value }];
    // Drop answers to questions that are no longer shown (e.g. children count after answering "No")
    const stillVisible = new Set(visibleQuestions(next).map((v) => v.id));
    next = next.filter((a) => stillVisible.has(a.questionId));
    setAnswers(next);

    const nextQuestions = visibleQuestions(next);
    const index = nextQuestions.findIndex((v) => v.id === q.id);
    if (index < nextQuestions.length - 1) {
      // Small delay so the selected state is visible before moving on
      setTimeout(() => setCurrentStep(index + 1), 180);
    } else {
      finish(next);
    }
  };

  const goBack = () => setCurrentStep((s) => Math.max(0, s - 1));

  const options =
    question.answerType === "options"
      ? (question.options ?? []).map((o) => ({ value: o.value, text: o.text }))
      : scaleOptions;

  const category = question.category in categories ? categories[question.category as CategoryId] : null;
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="card-surface mx-auto max-w-2xl p-6 md:p-8">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground dark:text-mawaddah-gold/70">
            Question {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm font-semibold text-primary dark:text-mawaddah-gold">{progress}%</span>
        </div>
        <div
          className="h-2 w-full rounded-full bg-muted dark:bg-mawaddah-green-light/20"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-2 rounded-full bg-mawaddah-gold transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div key={question.id} className="animate-fade-in">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-mawaddah-pink-light px-3 py-1 text-xs font-semibold text-primary dark:bg-mawaddah-green dark:text-mawaddah-gold">
          {category ? (
            <>
              <span aria-hidden="true">{category.emoji}</span> {category.label}
            </>
          ) : (
            "About you"
          )}
        </span>
        <h2 className="mb-2 text-xl font-semibold text-primary dark:text-mawaddah-gold md:text-2xl" id="question-title">
          {question.question}
        </h2>
        <p className="text-sm text-muted-foreground dark:text-mawaddah-gold/70">Select the option that best applies to you.</p>

        <div className="mt-6 space-y-3" role="radiogroup" aria-labelledby="question-title">
          {options.map((option) => {
            const selected = currentAnswer?.value === option.value;
            return (
              <button
                key={option.value}
                role="radio"
                aria-checked={selected}
                onClick={() => handleAnswer(question, option.value)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                  selected
                    ? "border-mawaddah-gold bg-mawaddah-gold font-semibold text-mawaddah-dark"
                    : "border-muted bg-white hover:border-mawaddah-gold hover:bg-mawaddah-pink-light dark:border-mawaddah-green-light/20 dark:bg-mawaddah-green-dark dark:hover:bg-mawaddah-green"
                )}
              >
                {option.text}
                {selected && <Check size={18} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={goBack}
          disabled={currentStep === 0}
          className="inline-flex items-center rounded-full px-4 py-2 font-medium text-primary hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 dark:text-mawaddah-gold dark:hover:bg-mawaddah-green"
        >
          <ArrowLeft size={16} className="mr-1.5" />
          Back
        </button>
        {currentStep === totalSteps - 1 && currentAnswer && (
          <button onClick={() => finish(answers)} className="btn-primary py-2">
            See My Results
          </button>
        )}
      </div>
    </div>
  );
};

export default AssessmentForm;
