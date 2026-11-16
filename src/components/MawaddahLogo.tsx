import { cn } from "@/lib/utils";

interface MawaddahLogoProps {
  className?: string;
  /** Hide the wordmark and show only the mark */
  iconOnly?: boolean;
  /** Light text for dark surfaces such as the footer */
  inverted?: boolean;
}

/**
 * Two halves, gold and pink, meeting as one heart.
 * Mawaddah (love) and rahmah (mercy) between two spouses, Quran 30:21.
 * Same artwork as public/favicon.svg
 */
export const MawaddahMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={cn("h-10 w-10", className)} aria-hidden="true">
    <rect width="64" height="64" rx="16" fill="#1A5D1A" />
    <path d="M30.8 53.2 C17.5 43.6 8.5 35 8.5 23.8 C8.5 16.2 14.5 10.5 21.8 10.5 C25.9 10.5 29 12.6 30.8 15.6 Z" fill="#D1B000" />
    <path d="M33.2 53.2 C46.5 43.6 55.5 35 55.5 23.8 C55.5 16.2 49.5 10.5 42.2 10.5 C38.1 10.5 35 12.6 33.2 15.6 Z" fill="#FFDEE2" />
    <path d="M30.8 42.5 C23.5 36.8 18.2 31.2 18.2 25.2 C18.2 21.6 20.8 19 24 19 C27 19 29.3 21 30.2 24.5 Z" fill="#1A5D1A" />
    <path d="M33.2 42.5 C40.5 36.8 45.8 31.2 45.8 25.2 C45.8 21.6 43.2 19 40 19 C37 19 34.7 21 33.8 24.5 Z" fill="#1A5D1A" />
  </svg>
);

const MawaddahLogo = ({ className, iconOnly, inverted }: MawaddahLogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <MawaddahMark />
      {!iconOnly && (
        <span
          className={cn(
            "ml-2.5 text-2xl font-montserrat font-bold tracking-tight",
            inverted ? "text-white" : "text-primary dark:text-mawaddah-gold"
          )}
        >
          Mawaddah
        </span>
      )}
    </div>
  );
};

export default MawaddahLogo;
