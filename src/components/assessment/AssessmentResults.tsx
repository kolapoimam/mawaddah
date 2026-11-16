import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, FileDown, Heart, ImageDown, Loader2, RotateCcw, Share2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AssessmentResult, RESULT_STORAGE_KEY } from "@/lib/scoring";
import { bandColor, bandFor, bandLabel, categories, CategoryId } from "@/data/categories";
import { downloadReportPdf, downloadReportPng } from "@/lib/exportReport";
import { SITE_URL } from "@/lib/site";
import ReportCard from "./ReportCard";

/** The strong band colour is dark green, so swap to gold on dark backgrounds */
const darkText = (b: string) => (b === "strong" ? "dark:!text-mawaddah-gold" : "");
const darkBg = (b: string) => (b === "strong" ? "dark:!bg-mawaddah-gold" : "");

function overallFor(percentage: number) {
  if (percentage >= 85) {
    return {
      label: "Exemplary",
      summary: "demonstrates exemplary qualities that reflect true Islamic values",
      tips: [
        "MashaAllah! Your relationship exemplifies the beauty of Islamic marriage.",
        "Continue strengthening your bond by increasing your acts of worship together.",
        "Consider mentoring other couples in your community who may benefit from your experience.",
      ],
    };
  }
  if (percentage >= 70) {
    return {
      label: "Strong",
      summary: "has very strong foundations built on mutual respect and love",
      tips: [
        "Alhamdulillah, you have established a strong foundation in your marriage.",
        "Schedule regular quality time to maintain your emotional connection.",
        "Work together on deepening your spiritual bond through shared Islamic practices.",
      ],
    };
  }
  if (percentage >= 50) {
    return {
      label: "Growing",
      summary: "shows good potential but needs consistent nurturing in key areas",
      tips: [
        "Your relationship has good potential but needs consistent nurturing.",
        "Focus on improving your communication patterns during disagreements.",
        "Implement a weekly check in to discuss your relationship goals and challenges.",
      ],
    };
  }
  return {
    label: "Requires Attention",
    summary: "has several areas that require immediate attention and care",
    tips: [
      "Your relationship needs immediate care and dedicated attention.",
      "Start with small, consistent steps to rebuild trust and communication.",
      "Consider seeking guidance from an Islamic counselor to address underlying issues.",
    ],
  };
}

const AssessmentResults = () => {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState<"png" | "pdf" | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const stored = sessionStorage.getItem(RESULT_STORAGE_KEY);
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem(RESULT_STORAGE_KEY);
      }
    }
  }, []);

  if (!result) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center">
        <h2 className="calligraphy-heading mb-4 text-3xl text-primary dark:text-mawaddah-gold">No Results Found</h2>
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
  const overall = overallFor(percentage);
  const band = bandFor(percentage);
  const summary = `Based on your responses, your relationship ${overall.summary}.`;

  const ids = (Object.keys(categories) as CategoryId[]).filter((id) => result.categoriesScore[id]);
  const weakest = [...ids].sort((a, b) => result.categoriesScore[a].percentage - result.categoriesScore[b].percentage)[0];

  const shareText = `I scored ${percentage}% on Mawaddah's Couple Health Assessment! My relationship is in the "${overall.label}" category. Take the free assessment at ${SITE_URL} #Mawaddah #CoupleHealth`;

  const copyShareText = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const download = async (kind: "png" | "pdf") => {
    if (!reportRef.current || busy) return;
    setBusy(kind);
    try {
      if (kind === "png") await downloadReportPng(reportRef.current, "couple health report");
      else await downloadReportPdf(reportRef.current, "couple health report");
      toast({ title: "Report downloaded", description: `Your ${kind.toUpperCase()} is ready. BarakAllahu feekum!` });
    } catch (error) {
      console.error(`Error creating ${kind}:`, error);
      toast({ title: "Download failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  const size = 192;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="card-surface overflow-hidden">
        <div className="bg-mawaddah-green p-6 text-center text-white dark:bg-mawaddah-green-light/20">
          <h2 className="calligraphy-heading mb-2 text-3xl md:text-4xl">Your Couple Health Results</h2>
          <p className="text-mawaddah-pink-light">
            Assessment completed on {new Date(result.timestamp).toLocaleDateString(undefined, { dateStyle: "long" })}
          </p>
        </div>

        <div className="p-6 text-center md:p-8">
          <div className="relative mx-auto mb-4" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
              <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-mawaddah-pink-light dark:stroke-mawaddah-green" />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={bandColor[band]}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - percentage / 100)}
                className={`transition-[stroke-dashoffset] duration-1000 ${band === "strong" ? "dark:stroke-mawaddah-gold" : ""}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-primary dark:text-mawaddah-gold">{percentage}%</span>
              <span className={`mt-1 text-sm font-semibold ${darkText(band)}`} style={{ color: bandColor[band] }}>
                {overall.label}
              </span>
            </div>
            <Heart className="absolute right-2 top-2 text-mawaddah-pink-dark" size={26} fill="currentColor" />
          </div>

          <h3 className="mb-3 text-xl font-semibold text-primary dark:text-mawaddah-gold">
            Your Relationship Strength: {overall.label}
          </h3>
          <p className="mx-auto max-w-xl text-muted-foreground dark:text-mawaddah-gold/70">{summary}</p>
        </div>

        <div className="px-6 pb-8 md:px-8">
          <h3 className="mb-4 text-xl font-semibold text-primary dark:text-mawaddah-gold">Recommendations for You</h3>
          <ul className="space-y-3">
            {overall.tips.map((tip) => (
              <li key={tip} className="flex">
                <span className="mr-3 text-mawaddah-gold">•</span>
                <span className="text-muted-foreground dark:text-mawaddah-gold/70">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full report */}
      <div className="card-surface p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="calligraphy-heading text-3xl text-primary dark:text-mawaddah-gold">Your Full Report</h3>
            <p className="text-sm text-muted-foreground dark:text-mawaddah-gold/70">Every area of your marriage, with steps to take this week.</p>
          </div>
          {weakest && result.categoriesScore[weakest].percentage < 80 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-mawaddah-gold px-3 py-1 text-xs font-bold text-mawaddah-dark">
              <Sparkles size={14} /> Start with {categories[weakest].label}
            </span>
          )}
        </div>

        <div className="space-y-4">
          {ids.map((id) => {
            const cat = categories[id];
            const pct = result.categoriesScore[id].percentage;
            const b = bandFor(pct);
            return (
              <article key={id} className="rounded-xl border border-muted p-5 dark:border-mawaddah-green-light/20">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-lg font-semibold text-primary dark:text-mawaddah-gold">
                    <span aria-hidden="true">{cat.emoji}</span> {cat.label}
                  </h4>
                  <span className={`text-sm font-bold ${darkText(b)}`} style={{ color: bandColor[b] }}>
                    {pct}% · {bandLabel[b]}
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-mawaddah-pink-light dark:bg-mawaddah-green">
                  <div className={`h-full rounded-full transition-all duration-700 ${darkBg(b)}`} style={{ width: `${Math.max(pct, 3)}%`, background: bandColor[b] }} />
                </div>
                <p className="mt-3 text-foreground dark:text-mawaddah-gold-light">{cat.insight[b]}</p>
                <ul className="mt-2 space-y-1.5">
                  {cat.actions[b].map((a) => (
                    <li key={a} className="flex text-sm text-muted-foreground dark:text-mawaddah-gold/70">
                      <span className="mr-2 text-mawaddah-gold">✓</span>
                      {a}
                    </li>
                  ))}
                </ul>
                <blockquote className="mt-4 rounded-lg bg-mawaddah-pink-light p-3 text-sm text-primary dark:bg-mawaddah-green dark:text-mawaddah-gold">
                  <span className="italic">"{cat.reminder.text}"</span> <span className="font-semibold">{cat.reminder.source}</span>
                </blockquote>
              </article>
            );
          })}
        </div>
      </div>

      {/* Share and download */}
      <div className="card-surface p-6 md:p-8">
        <h4 className="mb-4 flex items-center text-lg font-semibold text-primary dark:text-mawaddah-gold">
          <Share2 className="mr-2" size={20} />
          Save and Share Your Results
        </h4>

        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <button onClick={() => download("png")} disabled={!!busy} className="btn-primary disabled:opacity-60">
            {busy === "png" ? <Loader2 size={18} className="mr-2 animate-spin" /> : <ImageDown size={18} className="mr-2" />}
            Download as Image
          </button>
          <button onClick={() => download("pdf")} disabled={!!busy} className="btn-secondary disabled:opacity-60">
            {busy === "pdf" ? <Loader2 size={18} className="mr-2 animate-spin" /> : <FileDown size={18} className="mr-2" />}
            Download as PDF
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 rounded-lg border border-muted bg-muted/40 p-3 dark:border-mawaddah-green-light/20 dark:bg-mawaddah-green">
          <p className="text-sm text-muted-foreground dark:text-mawaddah-gold/70">{shareText}</p>
          <button
            onClick={copyShareText}
            className="flex-shrink-0 rounded-full p-2 hover:bg-muted dark:hover:bg-mawaddah-green-light/30"
            aria-label="Copy share text"
          >
            {copied ? <Check size={18} className="text-primary dark:text-mawaddah-gold" /> : <Copy size={18} className="text-mawaddah-gold-dark" />}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            WhatsApp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#0F1419] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            X
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Facebook
          </a>
        </div>
      </div>

      <div className="text-center">
        <Link to="/assessment" className="inline-flex items-center font-semibold text-mawaddah-gold-dark hover:underline dark:text-mawaddah-gold">
          <RotateCcw size={16} className="mr-1.5" /> Take the assessment again
        </Link>
      </div>

      {/* Off screen copy used for PNG and PDF export */}
      <div aria-hidden="true" style={{ position: "fixed", left: -10000, top: 0, pointerEvents: "none" }}>
        <ReportCard ref={reportRef} result={result} overallLabel={overall.label} summary={summary} />
      </div>
    </div>
  );
};

export default AssessmentResults;
