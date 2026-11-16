import { useState } from "react";
import { Github, Mail, MapPin, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_EMAIL, REPO_URL } from "@/lib/site";

const inputClass =
  "w-full rounded-md border border-muted bg-white p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-mawaddah-gold dark:border-mawaddah-green-light/20 dark:bg-mawaddah-green dark:text-mawaddah-gold-light";

/**
 * There is no backend, so the form opens the visitor's email app with the message filled in.
 */
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Mawaddah message from ${name}`;
    const body = `${message}\n\nFrom: ${name} <${email}>`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast({
      title: "Opening your email app",
      description: `Your message is ready to send to ${CONTACT_EMAIL}.`,
      duration: 5000,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow px-4 py-12">
        <div className="container mx-auto">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="section-title">Contact Us</h1>
            <p className="section-subtitle">We'd love to hear from you! Feel free to reach out with any questions or feedback.</p>
          </div>

          <div className="card-surface mx-auto max-w-5xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="islamic-pattern bg-mawaddah-green p-6 text-white dark:bg-mawaddah-green-light/10 md:p-8 lg:col-span-2">
                <h2 className="mb-6 text-2xl font-semibold text-mawaddah-gold">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-mawaddah-gold" />
                    <div>
                      <h3 className="font-semibold text-mawaddah-pink-light">Email</h3>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-white transition-colors hover:text-mawaddah-gold">
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Github className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-mawaddah-gold" />
                    <div>
                      <h3 className="font-semibold text-mawaddah-pink-light">Feedback and ideas</h3>
                      <a
                        href={`${REPO_URL}/issues/new/choose`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white transition-colors hover:text-mawaddah-gold"
                      >
                        Open an issue on GitHub
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="mr-3 mt-0.5 h-6 w-6 flex-shrink-0 text-mawaddah-gold" />
                    <div>
                      <h3 className="font-semibold text-mawaddah-pink-light">Based in</h3>
                      <address className="not-italic text-white">Nigeria</address>
                    </div>
                  </div>
                </div>
                <p className="mt-10 border-t border-white/10 pt-6 text-sm text-mawaddah-pink-light">
                  We usually reply within a few days, in sha Allah. For urgent marriage concerns, please speak to a trusted
                  scholar or a qualified counselor near you.
                </p>
              </div>

              <div className="p-6 md:p-8 lg:col-span-3">
                <h2 className="mb-6 text-2xl font-semibold text-primary dark:text-mawaddah-gold">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1 block text-sm font-medium text-primary dark:text-mawaddah-gold">
                        Name
                      </label>
                      <input id="name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1 block text-sm font-medium text-primary dark:text-mawaddah-gold">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={inputClass}
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-primary dark:text-mawaddah-gold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={6}
                      className={inputClass}
                      placeholder="Your message"
                    />
                  </div>
                  <button type="submit" className="btn-primary inline-flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </button>
                  <p className="mt-3 text-xs text-muted-foreground dark:text-mawaddah-gold/60">This opens your email app with your message ready to send.</p>
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
