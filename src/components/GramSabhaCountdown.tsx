"use client";

import { useEffect, useState } from "react";
import { LandmarkIcon, CalendarIcon, MapPinIcon } from "./icons";

/** Next Gram Sabha (village assembly) meeting. */
const MEETING_DATE = new Date(2026, 5, 22, 11, 0, 0); // 22 June 2026, 11:00 AM
const MEETING_VENUE = "पंचायत भवन"; // Panchayat Bhavan

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

const units: { key: keyof TimeLeft; hi: string; en: string }[] = [
  { key: "days", hi: "दिन", en: "Days" },
  { key: "hours", hi: "घंटे", en: "Hrs" },
  { key: "minutes", hi: "मिनट", en: "Min" },
  { key: "seconds", hi: "सेकंड", en: "Sec" },
];

const GramSabhaCountdown = () => {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync real time after hydration
    setTime(getTimeLeft(MEETING_DATE));
    const interval = setInterval(() => setTime(getTimeLeft(MEETING_DATE)), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rise reveal-delay-1 mx-auto mb-8 w-full max-w-2xl px-1 sm:mb-12">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/25 bg-surface/45 px-3.5 py-3 backdrop-blur-xl shadow-[0_24px_60px_-24px_var(--glow-green),inset_0_1px_0_oklch(1_0_0_/_0.28)] sm:px-6 sm:py-5 dark:border-white/12"
      >
        {/* Ambient gold glow — premium dawn sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full opacity-70 blur-2xl"
          style={{ background: "radial-gradient(closest-side, var(--glow-gold), transparent)" }}
        />
        {/* Diagonal frost sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(120deg, oklch(1 0 0 / 0.12) 0%, transparent 38%, transparent 100%)",
          }}
        />

        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          {/* ---- Event identity ---- */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-on-gold shadow-[0_6px_18px_-8px_var(--glow-gold)] sm:h-11 sm:w-11 sm:rounded-xl"
              style={{
                background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-strong) 100%)",
              }}
            >
              <LandmarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-wide text-primary sm:text-[0.7rem]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                अगली बैठक · Next Meeting
              </p>
              <p className="font-display text-base font-extrabold leading-tight text-ink-strong sm:text-xl">
                ग्राम सभा बैठक
              </p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[0.68rem] text-ink-soft sm:text-[0.72rem]">
                <span className="inline-flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  {MEETING_DATE.toLocaleDateString("hi-IN", { day: "numeric", month: "long" })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPinIcon className="h-3 w-3" />
                  {MEETING_VENUE}
                </span>
              </p>
            </div>
          </div>

          {/* ---- Countdown D : H : M : S ---- */}
          <div className="flex w-full items-stretch gap-1.5 sm:w-auto sm:gap-2" aria-live="polite">
            {units.map((unit, i) => (
              <div key={unit.key} className="flex min-w-0 flex-1 items-stretch gap-1.5 sm:flex-none sm:gap-2">
                {i > 0 && (
                  <span className="hidden pt-2 font-display text-2xl font-bold text-ink-soft/50 sm:inline">:</span>
                )}
                <div className="flex w-full min-w-0 flex-col items-center rounded-lg border border-line/40 bg-foreground/[0.04] py-1 sm:w-12 sm:rounded-xl sm:py-1.5">
                  <span className="font-display text-lg font-extrabold tabular-nums leading-none text-ink-strong sm:text-2xl">
                    {time ? (unit.key === "days" ? time.days : pad(time[unit.key])) : "--"}
                  </span>
                  <span className="mt-0.5 text-[0.5rem] font-bold uppercase tracking-wide text-ink-soft sm:mt-1 sm:text-[0.55rem]">
                    {unit.hi}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GramSabhaCountdown;
