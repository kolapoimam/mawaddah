import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import MawaddahLogo from "./MawaddahLogo";
import ThemeToggle from "./ThemeToggle";
import { DONATE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu after navigating
  useEffect(() => setMobileMenuOpen(false), [pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative py-1 font-medium transition-colors hover:text-mawaddah-gold",
      isActive
        ? "text-primary dark:text-mawaddah-gold after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-mawaddah-gold"
        : "text-foreground"
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex-shrink-0" aria-label="Mawaddah home">
          <MawaddahLogo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-mawaddah-gold px-4 py-2 font-medium text-primary transition-colors hover:bg-mawaddah-gold hover:text-mawaddah-dark dark:text-mawaddah-gold dark:hover:text-mawaddah-dark"
          >
            <Heart size={16} className="mr-1.5" />
            Donate
          </a>
          <Link to="/assessment" className="btn-primary py-2">
            Start Assessment
          </Link>
        </div>

        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            className="ml-3 rounded-full p-2 text-foreground hover:bg-muted"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="border-b bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-4 py-3 font-medium",
                    isActive ? "bg-mawaddah-pink-light text-primary dark:bg-mawaddah-green dark:text-mawaddah-gold" : "hover:bg-muted"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/assessment" className="btn-primary mt-3 text-center">
              Start Assessment
            </Link>
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full border border-mawaddah-gold px-4 py-3 text-center font-medium text-primary dark:text-mawaddah-gold"
            >
              Donate
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
