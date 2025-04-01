
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Share2, Download, Copy, Check } from 'lucide-react';
import { AssessmentResult } from './AssessmentForm';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const AssessmentResults = () => {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [email, setEmail] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Get result from session storage
    const storedResult = sessionStorage.getItem('assessmentResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);
  
  if (!result) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h2 className="calligraphy-heading text-3xl mb-4 text-primary dark:text-mawaddah-gold">No Results Found</h2>
        <p className="mb-6 text-muted-foreground dark:text-mawaddah-gold/70">
          You haven't completed the assessment yet, or your results have expired.
        </p>
        <Link to="/assessment" className="btn-primary">
          Take the Assessment
        </Link>
      </div>
    );
  }
  
  const { percentage } = result;
  
  let categoryText = '';
  let resultColor = '';
  let resultTips = [];
  
  // Expanded categories with more precise categorizations
  if (percentage >= 85) {
    categoryText = 'Exemplary';
    resultColor = 'bg-emerald-500';
    resultTips = [
      "MashaAllah! Your relationship exemplifies the beauty of Islamic marriage.",
      "Continue strengthening your bond by increasing your acts of worship together.",
      "Consider mentoring other couples in your community who may benefit from your experience."
    ];
  } else if (percentage >= 70 && percentage < 85) {
    categoryText = 'Strong';
    resultColor = 'bg-green-500';
    resultTips = [
      "Alhamdulillah, you have established a strong foundation in your marriage.",
      "Schedule regular quality time to maintain your emotional connection.",
      "Work together on deepening your spiritual bond through shared Islamic practices."
    ];
  } else if (percentage >= 50 && percentage < 70) {
    categoryText = 'Growing';
    resultColor = 'bg-yellow-500';
    resultTips = [
      "Your relationship has good potential but needs consistent nurturing.",
      "Focus on improving your communication patterns during disagreements.",
      "Implement a weekly check-in to discuss your relationship goals and challenges."
    ];
  } else {
    categoryText = 'Requires Attention';
    resultColor = 'bg-red-500';
    resultTips = [
      "Your relationship needs immediate care and dedicated attention.",
      "Start with small, consistent steps to rebuild trust and communication.",
      "Consider seeking guidance from an Islamic counselor to address underlying issues."
    ];
  }
  
  const handleUnlockFullReport = () => {
    setShowPaymentModal(true);
  };
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };
  
  const handleDownloadImage = async () => {
    if (!resultsRef.current) return;
    
    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        backgroundColor: null,
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `mawaddah-results-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  
  const handleDownloadPdf = async () => {
    if (!resultsRef.current) return;
    
    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        backgroundColor: null,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`mawaddah-results-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
  
  const shareText = `I scored ${percentage}% on Mawaddah's Couple Health Assessment! My relationship is in the "${categoryText}" category. Take the free assessment at https://usemawaddah.com #Mawaddah #CoupleHealth`;
  
  const handleCopyShareText = () => {
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy text:', err));
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div ref={resultsRef} className="bg-white dark:bg-mawaddah-green-dark shadow-lg rounded-xl overflow-hidden border border-muted dark:border-mawaddah-green-light/20">
        {/* Header */}
        <div className="bg-mawaddah-green dark:bg-mawaddah-green-light/10 text-white p-6 text-center">
          <h2 className="calligraphy-heading text-3xl mb-2">Your Couple Health Results</h2>
          <p className="text-mawaddah-pink-light">
            Assessment completed on {new Date(result.timestamp).toLocaleDateString()}
          </p>
        </div>
        
        {/* Score Section */}
        <div className="p-6 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-48 h-48 rounded-full border-8 border-muted dark:border-mawaddah-green-light/20 flex items-center justify-center">
              <div className={`w-40 h-40 rounded-full ${resultColor} flex items-center justify-center`}>
                <div className="text-white">
                  <span className="block text-4xl font-bold">{percentage}%</span>
                  <span className="text-lg">{categoryText}</span>
                </div>
              </div>
            </div>
            <Heart className="absolute top-0 right-0 text-mawaddah-pink" size={24} />
          </div>
          
          <h3 className="text-xl font-semibold mb-4 text-primary dark:text-mawaddah-gold">
            Your Relationship Strength: {categoryText}
          </h3>
          
          <p className="mb-6 text-muted-foreground dark:text-mawaddah-gold/70">
            Based on your responses, your relationship {
              percentage >= 85 ? 'demonstrates exemplary qualities that reflect true Islamic values' :
              percentage >= 70 ? 'has very strong foundations built on mutual respect and love' :
              percentage >= 50 ? 'shows good potential but needs consistent nurturing in key areas' :
              'has several areas that require immediate attention and care'
            }.
          </p>
        </div>
        
        {/* Tips Section */}
        <div className="px-6 pb-6">
          <h3 className="text-xl font-semibold mb-4 text-primary dark:text-mawaddah-gold">
            Recommendations for You:
          </h3>
          
          <ul className="space-y-3 mb-8">
            {resultTips.map((tip, index) => (
              <li key={index} className="flex">
                <span className="mr-3 text-mawaddah-gold">•</span>
                <span className="text-muted-foreground dark:text-mawaddah-gold/70">{tip}</span>
              </li>
            ))}
          </ul>
          
          <div className="p-6 bg-mawaddah-pink/20 dark:bg-mawaddah-gold/10 rounded-lg mb-6">
            <h4 className="text-lg font-semibold mb-2 text-primary dark:text-mawaddah-gold flex items-center">
              <Mail className="mr-2" size={20} />
              Unlock Your Full Detailed Report
            </h4>
            <p className="text-muted-foreground dark:text-mawaddah-gold/70 mb-4">
              Get personalized insights into all aspects of your relationship, including:
            </p>
            <ul className="space-y-2 mb-6 text-muted-foreground dark:text-mawaddah-gold/70">
              <li className="flex">
                <span className="mr-2">✓</span>
                <span>In-depth analysis of each category</span>
              </li>
              <li className="flex">
                <span className="mr-2">✓</span>
                <span>Personalized Islamic guidance tailored to your situation</span>
              </li>
              <li className="flex">
                <span className="mr-2">✓</span>
                <span>Specific actions and duas to strengthen your bond</span>
              </li>
            </ul>
            
            <button 
              onClick={handleUnlockFullReport}
              className="w-full btn-primary flex items-center justify-center"
            >
              Unlock Full Report - ₦5,000
            </button>
          </div>
          
          {/* Share and Download Section */}
          <div className="p-6 bg-mawaddah-green/10 dark:bg-mawaddah-green-light/10 rounded-lg mb-6">
            <h4 className="text-lg font-semibold mb-4 text-primary dark:text-mawaddah-gold flex items-center">
              <Share2 className="mr-2" size={20} />
              Share Your Results
            </h4>
            
            <div className="bg-white dark:bg-mawaddah-green-dark p-3 rounded border border-muted dark:border-mawaddah-green-light/20 mb-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground dark:text-mawaddah-gold/70 mr-2">
                {shareText}
              </p>
              <button 
                onClick={handleCopyShareText} 
                className="flex items-center justify-center p-2 hover:bg-muted dark:hover:bg-mawaddah-green rounded-full"
                aria-label="Copy share text"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-mawaddah-gold" />}
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleDownloadImage}
                className="flex-1 btn-secondary flex items-center justify-center"
              >
                <Download size={18} className="mr-2" />
                Download as Image
              </button>
              
              <button 
                onClick={handleDownloadPdf}
                className="flex-1 btn-secondary flex items-center justify-center"
              >
                <Download size={18} className="mr-2" />
                Download as PDF
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/assessment" className="text-mawaddah-gold hover:underline">
              Take the assessment again
            </Link>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-mawaddah-green-dark rounded-xl shadow-lg max-w-md w-full p-6">
            {paymentSuccess ? (
              <div className="text-center py-6">
                <div className="mb-4 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary dark:text-mawaddah-gold">Payment Successful!</h3>
                <p className="text-muted-foreground dark:text-mawaddah-gold/70 mb-6">
                  Your full report has been sent to {email}. Please check your inbox (and spam folder).
                </p>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4 text-primary dark:text-mawaddah-gold">
                  Unlock Your Full Report
                </h3>
                <form onSubmit={handlePayment}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-primary dark:text-mawaddah-gold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-2 border border-muted dark:border-mawaddah-green-light/20 rounded-md"
                      placeholder="Your email to receive the report"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground dark:text-mawaddah-gold/70">
                      The full report will be delivered to your email immediately after payment. We don't store any sensitive data beyond your email.
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowPaymentModal(false)}
                      className="flex-1 py-2 border border-muted dark:border-mawaddah-green-light/20 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={paymentProcessing || !email}
                      className="flex-1 btn-primary disabled:opacity-50"
                    >
                      {paymentProcessing ? 'Processing...' : 'Pay ₦5,000'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentResults;
