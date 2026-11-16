import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import MawaddahLogo from "./MawaddahLogo";
import { AUTHOR, CONTACT_EMAIL, REPO_URL } from "@/lib/site";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/assessment", label: "Take Assessment" },
];

const resources = [
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy Policy" },
];

const comingSoon = ["Islamic Counseling", "Activity Tracker", "Mobile App"];

const linkClass = "text-sm text-mawaddah-pink hover:text-mawaddah-gold transition-colors";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="islamic-pattern bg-mawaddah-green pb-6 pt-12 text-white dark:bg-mawaddah-green-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-4 md:gap-8 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <MawaddahLogo inverted className="mb-4" />
            <p className="mb-4 text-sm text-mawaddah-pink-light">Nurture Your Love, Islamically. Mawaddah for Couples.</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mb-3 inline-flex items-center text-sm text-mawaddah-pink transition-colors hover:text-mawaddah-gold"
            >
              <Mail size={16} className="mr-2" />
              {CONTACT_EMAIL}
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-mawaddah-pink transition-colors hover:text-mawaddah-gold"
            >
              <Github size={16} className="mr-2" />
              Contribute on GitHub
            </a>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-mawaddah-gold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-mawaddah-gold">Resources</h4>
            <ul className="space-y-2">
              {resources.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-mawaddah-gold">Coming Soon</h4>
            <ul className="space-y-2">
              {comingSoon.map((item) => (
                <li key={item} className="flex items-center justify-center text-sm text-mawaddah-pink md:justify-start">
                  <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-mawaddah-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-mawaddah-green-light/30 pt-6 text-center text-sm text-mawaddah-pink">
          <p className="mx-auto max-w-2xl italic text-mawaddah-pink-light">
            "And of His signs is that He created for you from yourselves mates that you may find tranquility in them;
            and He placed between you affection and mercy." Quran 30:21
          </p>
          <p className="mt-4">
            © {currentYear} Mawaddah. Built by{" "}
            <a
              href={AUTHOR.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white transition-colors hover:text-mawaddah-gold"
            >
              {AUTHOR.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
