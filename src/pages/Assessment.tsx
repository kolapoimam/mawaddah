
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentForm from '@/components/assessment/AssessmentForm';

const Assessment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 bg-muted/30 dark:bg-mawaddah-green-dark/30 islamic-pattern">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="calligraphy-heading text-3xl md:text-4xl mb-4 text-primary dark:text-mawaddah-gold">
              Couple Health Assessment
            </h1>
            <p className="text-lg text-muted-foreground dark:text-mawaddah-gold/70 mb-6">
              Take our comprehensive assessment to understand your relationship's strengths and areas for growth.
            </p>
            <div className="bg-white/50 dark:bg-mawaddah-green-dark/50 backdrop-blur-sm p-4 rounded-lg inline-block mb-6">
              <p className="text-sm text-muted-foreground dark:text-mawaddah-gold/70">
                <span className="font-semibold text-primary dark:text-mawaddah-gold">Privacy Note:</span> This assessment runs entirely in your browser. Your answers are not stored on our servers.
              </p>
            </div>
          </div>
          
          <AssessmentForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
