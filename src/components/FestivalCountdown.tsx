"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

/** Demo events — the next upcoming village events */
const upcomingEvents = [
  {
    name: "ग्राम मेला",
    nameEn: "Village Fair",
    date: new Date(2026, 6, 1, 0, 0, 0), // July 1, 2026
    icon: "🪔",
    color: "gold" as const,
  },
  {
    name: "फसल बीमा अंतिम तिथि",
    nameEn: "Crop Insurance Deadline",
    date: new Date(2026, 5, 25, 23, 59, 59), // June 25, 2026
    icon: "📋",
    color: "green" as const,
  },
];

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

function getNextEvent() {
  const now = new Date();
  const future = upcomingEvents
    .filter((e) => e.date.getTime() > now.getTime())
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  return future[0] || upcomingEvents[0];
}

const pad = (n: number) => n.toString().padStart(2, "0");

const FestivalCountdown = () => {
  const event = getNextEvent();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ticks only while the tab is visible to avoid a backgrounded re-render loop.
    let interval: ReturnType<typeof setInterval> | undefined;
    const tick = () => {
      setTimeLeft(getTimeLeft(event.date));
      setMounted(true);
    };
    const start = () => {
      tick();
      interval = setInterval(tick, 1000);
    };
    const stop = () => {
      if (interval) clearInterval(interval);
      interval = undefined;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [event.date]);

  const isGold = event.color === "gold";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-0.5 ${
        isGold
          ? "border-gold-strong/30 bg-gradient-to-br from-gold-soft/40 to-surface hover:border-gold-strong/50 hover:shadow-[0_16px_40px_-16px_var(--glow-gold)]"
          : "border-primary/20 bg-gradient-to-br from-primary-soft/30 to-surface hover:border-primary/40 hover:shadow-[0_16px_40px_-16px_var(--glow-green)]"
      }`}
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -top-12 h-32 w-32 -translate-x-1/2 rounded-full opacity-60 blur-2xl"
        style={{
          background: isGold
            ? "radial-gradient(closest-side, var(--glow-gold), transparent)"
            : "radial-gradient(closest-side, var(--glow-green), transparent)",
        }}
      />

      <div className="relative flex flex-col items-center gap-5">
        {/* Event Header */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl shrink-0" role="img" aria-label={event.nameEn}>
            {event.icon}
          </span>
          <div>
            <p className="text-lg sm:text-xl font-bold text-ink-strong leading-tight">
              {event.name}
            </p>
            <p className="text-xs sm:text-sm text-ink-soft mt-1">{event.nameEn}</p>
          </div>
        </div>

        {/* Countdown Digits — fixed min-height so the placeholder→digits swap
            reserves the same space and never shifts layout (CLS). */}
        <div className="flex min-h-[3.25rem] shrink-0 items-center justify-center">
          {mounted && timeLeft ? (
            <div className="flex items-center gap-2.5 sm:gap-4 justify-center">
              {/* Days */}
              <div className="flex flex-col items-center min-w-[36px] sm:min-w-[48px]">
                <span className={`font-display text-2xl sm:text-3xl font-extrabold tabular-nums leading-none ${isGold ? "text-ochre" : "text-primary"}`}>
                  {timeLeft.days}
                </span>
                <span className="text-[0.65rem] sm:text-xs font-bold text-ink-soft uppercase mt-1.5">दिन</span>
              </div>
              <span className="text-ink-soft/40 font-bold text-lg sm:text-xl mb-5">:</span>

              {/* Hours */}
              <div className="flex flex-col items-center min-w-[36px] sm:min-w-[48px]">
                <span className={`font-display text-2xl sm:text-3xl font-extrabold tabular-nums leading-none ${isGold ? "text-ochre" : "text-primary"}`}>
                  {pad(timeLeft.hours)}
                </span>
                <span className="text-[0.65rem] sm:text-xs font-bold text-ink-soft uppercase mt-1.5">घंटे</span>
              </div>
              <span className="text-ink-soft/40 font-bold text-lg sm:text-xl mb-5">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center min-w-[36px] sm:min-w-[48px]">
                <span className={`font-display text-2xl sm:text-3xl font-extrabold tabular-nums leading-none ${isGold ? "text-ochre" : "text-primary"}`}>
                  {pad(timeLeft.minutes)}
                </span>
                <span className="text-[0.65rem] sm:text-xs font-bold text-ink-soft uppercase mt-1.5">मिनट</span>
              </div>
              <span className="text-ink-soft/40 font-bold text-lg sm:text-xl mb-5">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center min-w-[36px] sm:min-w-[48px]">
                <span className={`font-display text-2xl sm:text-3xl font-extrabold tabular-nums leading-none ${isGold ? "text-ochre" : "text-primary"}`}>
                  {pad(timeLeft.seconds)}
                </span>
                <span className="text-[0.65rem] sm:text-xs font-bold text-ink-soft uppercase mt-1.5">सेकंड</span>
              </div>
            </div>
          ) : (
            <span className="font-display text-lg font-bold text-ink-soft">...</span>
          )}
        </div>
      </div>

      {/* Date Footer */}
      <div className="relative mt-5 pt-3.5 border-t border-line/10 flex items-center justify-center gap-1.5">
        <Calendar className="h-3.5 w-3.5 text-ink-soft" />
        <span className="text-xs text-ink-soft">
          {event.date.toLocaleDateString("hi-IN", { day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>
    </div>
  );
};

export default FestivalCountdown;
