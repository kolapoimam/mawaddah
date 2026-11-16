
import { Link } from 'react-router-dom';

const AssessmentOverview = () => {
  const steps = [
    {
      number: 1,
      title: "Answer 20+ Questions",
      description: "A short assessment covering communication, spirituality, conflict, goals, emotions and money.",
      icon: "📝"
    },
    {
      number: 2,
      title: "Get Your Score",
      description: "See your couple health percentage and a basic summary instantly.",
      icon: "❤️"
    },
    {
      number: 3,
      title: "Receive Tips",
      description: "Get practical, Islamically grounded tips to improve your relationship.",
      icon: "💡"
    },
    {
      number: 4,
      title: "Get the Full Report",
      description: "See every area of your marriage in detail, with actions, a Quranic reminder, and a PNG or PDF to keep.",
      icon: "📄"
    }
  ];
  
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="calligraphy-heading text-3xl md:text-4xl mb-4 text-primary dark:text-mawaddah-gold">
            How the Couple Health Assessment Works
          </h2>
          <p className="text-lg text-muted-foreground dark:text-mawaddah-gold/70">
            A simple, free tool to understand your relationship.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="card-surface p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-mawaddah-gold flex items-center justify-center text-mawaddah-dark text-xl font-semibold">
                  {step.number}
                </div>
              </div>
              <div className="text-center mb-2 text-4xl">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-center text-primary dark:text-mawaddah-gold">
                {step.title}
              </h3>
              <p className="text-muted-foreground dark:text-mawaddah-gold/70 text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/assessment" className="btn-primary">
            Start the Assessment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AssessmentOverview;
