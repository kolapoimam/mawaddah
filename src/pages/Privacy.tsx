import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CONTACT_EMAIL, REPO_URL } from "@/lib/site";

const sections = [
  {
    title: "Your answers stay on your device",
    body: "The Couple Health Assessment runs entirely in your browser. Your answers and your result are never sent to or stored on a server. The result is kept in your browser tab (session storage) so the results page can show it, and it is removed when you close the tab.",
  },
  {
    title: "No accounts, no email required",
    body: "You do not need to sign up or share your email address to take the assessment or see your full report. Downloads (PNG and PDF) are created on your device.",
  },
  {
    title: "Analytics",
    body: "We use Vercel Web Analytics to count page views anonymously. It does not use cookies and does not collect your assessment answers.",
  },
  {
    title: "Theme preference",
    body: "If you switch between light and dark mode, that choice is saved in your browser so it is remembered next time. Nothing else is saved.",
  },
  {
    title: "Contacting us",
    body: `If you email us at ${CONTACT_EMAIL}, we only use your email address to reply to you.`,
  },
  {
    title: "Open source",
    body: "Mawaddah is open source, so anyone can check exactly what the app does with data by reading the code on GitHub.",
  },
];

const Privacy = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-grow px-4 py-12">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="section-title">Privacy Policy</h1>
          <p className="section-subtitle">Simple and short, because we collect almost nothing.</p>
        </div>
        <div className="space-y-4">
          {sections.map((s) => (
            <section key={s.title} className="card-surface p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold text-primary dark:text-mawaddah-gold">{s.title}</h2>
              <p className="leading-relaxed text-muted-foreground dark:text-mawaddah-gold/80">{s.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground dark:text-mawaddah-gold/70">
          Questions about privacy? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary dark:text-mawaddah-gold">
            {CONTACT_EMAIL}
          </a>{" "}
          or read the{" "}
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary dark:text-mawaddah-gold">
            source code
          </a>
          .
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;
