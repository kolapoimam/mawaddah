
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending the message
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out! We'll get back to you soon.",
        duration: 5000,
      });
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="calligraphy-heading text-3xl md:text-4xl mb-4 text-primary dark:text-mawaddah-gold">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground dark:text-mawaddah-gold/70">
              We'd love to hear from you! Feel free to reach out with any questions or feedback.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto bg-white dark:bg-mawaddah-green-dark shadow-lg rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Contact Info */}
              <div className="lg:col-span-2 bg-mawaddah-green dark:bg-mawaddah-green-light/10 text-white p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-6 text-mawaddah-gold">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="flex-shrink-0 w-6 h-6 text-mawaddah-gold mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-mawaddah-pink-light">Email</h3>
                      <a href="mailto:mail@mawaddah.com" className="text-white hover:text-mawaddah-gold transition-colors">
                        mail@mawaddah.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="flex-shrink-0 w-6 h-6 text-mawaddah-gold mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-mawaddah-pink-light">Phone</h3>
                      <a href="tel:+2347000000000" className="text-white hover:text-mawaddah-gold transition-colors">
                        +234 700 000 0000
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="flex-shrink-0 w-6 h-6 text-mawaddah-gold mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-mawaddah-pink-light">Address</h3>
                      <address className="not-italic text-white">
                        Lagos, Nigeria
                      </address>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-white/10">
                  <h3 className="font-semibold text-mawaddah-pink-light mb-4">Working Hours</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 2:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-3 p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-6 text-primary dark:text-mawaddah-gold">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1 text-primary dark:text-mawaddah-gold">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 border border-muted dark:border-mawaddah-green-light/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mawaddah-gold"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1 text-primary dark:text-mawaddah-gold">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-muted dark:border-mawaddah-green-light/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mawaddah-gold"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-primary dark:text-mawaddah-gold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="w-full p-3 border border-muted dark:border-mawaddah-green-light/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mawaddah-gold"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary inline-flex items-center"
                  >
                    {sending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-mawaddah-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
