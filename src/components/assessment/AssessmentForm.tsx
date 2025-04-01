
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { assessmentQuestions, AssessmentQuestion } from '@/data/assessmentQuestions';

interface Answer {
  questionId: number;
  value: string;
  points?: number;
}

export interface AssessmentResult {
  score: number;
  percentage: number;
  answers: Answer[];
  categoriesScore: {
    [key: string]: {
      score: number;
      total: number;
      percentage: number;
    }
  };
  timestamp: number;
}

const AssessmentForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const totalSteps = assessmentQuestions.length;
  const question = assessmentQuestions[currentStep];
  
  const handleAnswer = (questionId: number, value: string, points?: number) => {
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
    
    if (existingAnswerIndex > -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = { questionId, value, points };
      setAnswers(updatedAnswers);
    } else {
      setAnswers([...answers, { questionId, value, points }]);
    }
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateAndNavigate();
    }
  };
  
  const calculateAndNavigate = () => {
    // Skip demographic questions for scoring (first 7 questions)
    const scoringQuestions = assessmentQuestions.slice(7);
    const scoringAnswers = answers.filter(a => a.questionId > 7);
    
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    const categoriesScore: AssessmentResult['categoriesScore'] = {};
    
    // Initialize categories
    scoringQuestions.forEach(q => {
      if (!categoriesScore[q.category]) {
        categoriesScore[q.category] = { score: 0, total: 0, percentage: 0 };
      }
    });
    
    // Calculate scores for each answer
    scoringAnswers.forEach(answer => {
      const question = assessmentQuestions.find(q => q.id === answer.questionId);
      if (!question) return;
      
      let points = 0;
      let questionMaxPoints = 5; // Default max points per question
      
      if (question.answerType === 'options' && question.options) {
        const option = question.options.find(o => o.value === answer.value);
        points = option?.points || 0;
      } else if (question.answerType === 'scale' && question.scalePoints) {
        points = question.scalePoints[answer.value as keyof typeof question.scalePoints] || 0;
      }
      
      totalScore += points;
      maxPossibleScore += questionMaxPoints;
      
      // Add to category score
      if (categoriesScore[question.category]) {
        categoriesScore[question.category].score += points;
        categoriesScore[question.category].total += questionMaxPoints;
      }
    });
    
    // Calculate percentages for each category
    Object.keys(categoriesScore).forEach(category => {
      if (categoriesScore[category].total > 0) {
        categoriesScore[category].percentage = Math.round((categoriesScore[category].score / categoriesScore[category].total) * 100);
      }
    });
    
    // Calculate overall percentage
    const percentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
    
    const result: AssessmentResult = {
      score: totalScore,
      percentage,
      answers,
      categoriesScore,
      timestamp: Date.now()
    };
    
    // Store result in session storage
    sessionStorage.setItem('assessmentResult', JSON.stringify(result));
    
    // Navigate to results page
    navigate('/assessment/results');
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const renderOptions = (question: AssessmentQuestion) => {
    const answer = answers.find(a => a.questionId === question.id);
    
    if (question.answerType === 'options' && question.options) {
      return (
        <div className="mt-4 space-y-3">
          {question.options.map(option => (
            <button
              key={option.value}
              onClick={() => handleAnswer(question.id, option.value, option.points)}
              className={`w-full py-3 px-4 text-left rounded-lg border ${
                answer?.value === option.value 
                  ? 'bg-mawaddah-gold text-mawaddah-dark border-mawaddah-gold' 
                  : 'bg-white dark:bg-mawaddah-green-dark border-muted dark:border-mawaddah-green-light/20 hover:bg-muted dark:hover:bg-mawaddah-green'
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
      );
    }
    
    if (question.answerType === 'scale') {
      return (
        <div className="mt-6 space-y-4">
          {['always', 'sometimes', 'rarely'].map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(question.id, value, question.scalePoints?.[value as keyof typeof question.scalePoints])}
              className={`w-full py-3 px-4 text-left rounded-lg border ${
                answer?.value === value 
                  ? 'bg-mawaddah-gold text-mawaddah-dark border-mawaddah-gold' 
                  : 'bg-white dark:bg-mawaddah-green-dark border-muted dark:border-mawaddah-green-light/20 hover:bg-muted dark:hover:bg-mawaddah-green'
              }`}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </button>
          ))}
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-mawaddah-green-dark shadow-lg rounded-xl p-6 md:p-8 border border-muted dark:border-mawaddah-green-light/20">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground dark:text-mawaddah-gold/70">
            Question {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm font-semibold text-primary dark:text-mawaddah-gold">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted dark:bg-mawaddah-green-light/20 rounded-full h-2">
          <div 
            className="bg-mawaddah-gold h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 text-primary dark:text-mawaddah-gold">
          {question.question}
        </h2>
        <p className="text-sm text-muted-foreground dark:text-mawaddah-gold/70">
          Select the option that best applies to you.
        </p>
      </div>
      
      {renderOptions(question)}
      
      <div className="mt-8 flex justify-between">
        <button
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded ${
            currentStep === 0 
              ? 'text-muted-foreground bg-muted cursor-not-allowed' 
              : 'text-primary dark:text-mawaddah-gold bg-white dark:bg-mawaddah-green hover:bg-muted'
          }`}
        >
          Back
        </button>
        
        {currentStep === totalSteps - 1 && (
          <button
            onClick={calculateAndNavigate}
            className="px-6 py-2 bg-mawaddah-gold hover:bg-mawaddah-gold-dark text-mawaddah-dark font-semibold rounded"
          >
            Complete Assessment
          </button>
        )}
      </div>
    </div>
  );
};

export default AssessmentForm;
