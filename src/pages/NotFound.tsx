import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MawaddahMark } from "@/components/MawaddahLogo";

const NotFound = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="islamic-pattern flex flex-grow items-center justify-center bg-muted px-4 py-24 dark:bg-mawaddah-green-dark/40">
      <div className="text-center">
        <MawaddahMark className="mx-auto mb-6 h-16 w-16" />
        <h1 className="calligraphy-heading mb-2 text-6xl text-primary dark:text-mawaddah-gold">404</h1>
        <p className="mb-8 text-xl text-muted-foreground dark:text-mawaddah-gold/70">We couldn't find that page.</p>
        <Link to="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;
