import { forwardRef } from "react";
import { bandColor, bandFor, bandLabel, categories, CategoryId } from "@/data/categories";
import { AssessmentResult } from "@/lib/scoring";
import { SITE_URL } from "@/lib/site";

const C = {
  green: "#1A5D1A",
  greenDark: "#0D2E0D",
  gold: "#D1B000",
  pink: "#FFDEE2",
  pinkLight: "#FFF0F2",
  ink: "#222222",
  muted: "#5F6B5F",
  border: "#EDE3E5",
};
const sans = 'Montserrat, system-ui, sans-serif';
const serif = '"Scheherazade New", Georgia, serif';

/**
 * Fixed layout copy of the results used for PNG and PDF downloads.
 * Uses inline styles and fixed colours so exports look the same everywhere, including dark mode.
 * Elements with data-pdf-block are safe page break points.
 */
const ReportCard = forwardRef<HTMLDivElement, { result: AssessmentResult; overallLabel: string; summary: string }>(
  ({ result, overallLabel, summary }, ref) => {
    const band = bandFor(result.percentage);
    const ids = (Object.keys(categories) as CategoryId[]).filter((id) => result.categoriesScore[id]);
    const size = 180;
    const stroke = 16;
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;

    return (
      <div ref={ref} style={{ width: 820, background: "#FFFFFF", color: C.ink, fontFamily: sans, textAlign: "left" }}>
        <div data-pdf-block style={{ background: C.green, color: "#FFFFFF", padding: "36px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width="44" height="44" viewBox="0 0 64 64">
              <rect width="64" height="64" rx="16" fill={C.greenDark} />
              <path d="M30.8 53.2 C17.5 43.6 8.5 35 8.5 23.8 C8.5 16.2 14.5 10.5 21.8 10.5 C25.9 10.5 29 12.6 30.8 15.6 Z" fill={C.gold} />
              <path d="M33.2 53.2 C46.5 43.6 55.5 35 55.5 23.8 C55.5 16.2 49.5 10.5 42.2 10.5 C38.1 10.5 35 12.6 33.2 15.6 Z" fill={C.pink} />
              <path d="M30.8 42.5 C23.5 36.8 18.2 31.2 18.2 25.2 C18.2 21.6 20.8 19 24 19 C27 19 29.3 21 30.2 24.5 Z" fill={C.greenDark} />
              <path d="M33.2 42.5 C40.5 36.8 45.8 31.2 45.8 25.2 C45.8 21.6 43.2 19 40 19 C37 19 34.7 21 33.8 24.5 Z" fill={C.greenDark} />
            </svg>
            <span style={{ fontSize: 26, fontWeight: 700 }}>Mawaddah</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 700, color: C.gold }}>Couple Health Report</div>
            <div style={{ fontSize: 13, color: C.pink }}>{new Date(result.timestamp).toLocaleDateString(undefined, { dateStyle: "long" })}</div>
          </div>
        </div>

        <div data-pdf-block style={{ padding: "36px 48px 8px", display: "flex", gap: 36, alignItems: "center" }}>
          <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
              <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.pinkLight} strokeWidth={stroke} />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={bandColor[band]}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - result.percentage / 100)}
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 46, fontWeight: 700, lineHeight: 1 }}>{result.percentage}%</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: bandColor[band], marginTop: 6 }}>{overallLabel}</span>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: serif, fontSize: 30, fontWeight: 700, color: C.green, lineHeight: 1.2 }}>
              Your Relationship Strength: {overallLabel}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: C.muted, marginTop: 10 }}>{summary}</p>
          </div>
        </div>

        <div style={{ padding: "20px 48px" }}>
          <div data-pdf-block style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, color: C.green, marginBottom: 12 }}>
            Area by area
          </div>
          {ids.map((id) => {
            const cat = categories[id];
            const pct = result.categoriesScore[id].percentage;
            const b = bandFor(pct);
            return (
              <div
                key={id}
                data-pdf-block
                style={{ border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, marginBottom: 14, background: "#FFFFFF" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 17, fontWeight: 700 }}>
                    {cat.emoji} {cat.label}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: bandColor[b] }}>
                    {pct}% · {bandLabel[b]}
                  </span>
                </div>
                <div style={{ height: 8, borderRadius: 8, background: C.pinkLight, marginTop: 10, overflow: "hidden" }}>
                  <div style={{ width: `${Math.max(pct, 3)}%`, height: "100%", background: bandColor[b], borderRadius: 8 }} />
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.55, marginTop: 12 }}>{cat.insight[b]}</p>
                {cat.actions[b].map((a) => (
                  <div key={a} style={{ display: "flex", gap: 8, fontSize: 14, lineHeight: 1.5, marginTop: 4 }}>
                    <span style={{ color: C.gold, fontWeight: 700 }}>•</span>
                    <span>{a}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12, background: C.pinkLight, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.green }}>
                  <em>"{cat.reminder.text}"</em> <strong>{cat.reminder.source}</strong>
                </div>
              </div>
            );
          })}
        </div>

        <div data-pdf-block style={{ background: C.green, color: C.pink, padding: "18px 48px", display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <span>A guidance tool. Seek advice from scholars or a counselor for serious concerns.</span>
          <span style={{ color: C.gold, fontWeight: 700 }}>{SITE_URL.replace("https://", "")}</span>
        </div>
      </div>
    );
  }
);

ReportCard.displayName = "ReportCard";
export default ReportCard;
