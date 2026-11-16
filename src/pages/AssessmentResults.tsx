
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentResults from '@/components/assessment/AssessmentResults';

const AssessmentResultsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 bg-muted dark:bg-mawaddah-green-dark/40 islamic-pattern">
        <div className="container mx-auto">
          <AssessmentResults />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AssessmentResultsPage;
