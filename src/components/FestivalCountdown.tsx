"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

/** Demo events — the next upcoming village events */
const upcomingEvents = [
  {
    name: "ग्राम मेला",
    nameEn: "Village Fair",
    date: new Date(2026, 6, 1), // July 1, 2026
    icon: "🪔",
    color: "gold" as const,
  },
  {
    name: "ग्राम सभा बैठक",
    nameEn: "Gram Sabha Meeting",
    date: new Date(2026, 5, 22), // June 22, 2026
    icon: "🏛️",
    color: "green" as const,
  },
  {
    name: "फसल बीमा अंतिम तिथि",
    nameEn: "Crop Insurance Deadline",
    date: new Date(2026, 5, 25), // June 25, 2026
    icon: "📋",
    color: "green" as const,
  },
];

function getNextEvent() {
  const now = new Date();
  const future = upcomingEvents
    .filter((e) => e.date.getTime() > now.getTime())
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  return future[0] || upcomingEvents[0];
}

function getDaysRemaining(target: Date): number {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getHoursRemaining(target: Date): number {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
}

const FestivalCountdown = () => {
  const event = getNextEvent();
  const [days, setDays] = useState(getDaysRemaining(event.date));
  const [hours, setHours] = useState(getHoursRemaining(event.date));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    const interval = setInterval(() => {
      setDays(getDaysRemaining(event.date));
      setHours(getHoursRemaining(event.date));
    }, 60000); // update every minute
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [event.date]);

  const isGold = event.color === "gold";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
        isGold
          ? "border-gold-strong/30 bg-gradient-to-br from-gold-soft/40 to-surface hover:border-gold-strong/50 hover:shadow-[0_16px_40px_-16px_var(--glow-gold)]"
          : "border-primary/20 bg-gradient-to-br from-primary-soft/30 to-surface hover:border-primary/40 hover:shadow-[0_16px_40px_-16px_var(--glow-green)]"
      }`}
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-60 blur-2xl"
        style={{
          background: isGold
            ? "radial-gradient(closest-side, var(--glow-gold), transparent)"
            : "radial-gradient(closest-side, var(--glow-green), transparent)",
        }}
      />

      <div className="relative flex items-start gap-3">
        <span className="text-2xl" role="img" aria-label={event.nameEn}>
          {event.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-ink-strong leading-tight">
            {event.name}
          </p>
          <p className="text-[0.72rem] text-ink-soft mt-0.5">{event.nameEn}</p>
        </div>
        <div className="text-right shrink-0">
          {mounted ? (
            <div className="flex items-baseline gap-1.5">
              <div className="flex flex-col items-center">
                <span
                  className={`font-display text-2xl font-extrabold ${
                    isGold ? "text-ochre" : "text-primary"
                  }`}
                >
                  {days}
                </span>
                <span className="text-[0.6rem] font-bold text-ink-soft uppercase tracking-wide">
                  दिन
                </span>
              </div>
              <span className="text-ink-soft font-bold text-sm mb-3">:</span>
              <div className="flex flex-col items-center">
                <span
                  className={`font-display text-2xl font-extrabold ${
                    isGold ? "text-ochre" : "text-primary"
                  }`}
                >
                  {hours}
                </span>
                <span className="text-[0.6rem] font-bold text-ink-soft uppercase tracking-wide">
                  घंटे
                </span>
              </div>
            </div>
          ) : (
            <span className="font-display text-lg font-bold text-ink-soft">...</span>
          )}
        </div>
      </div>

      <div className="relative mt-3 flex items-center gap-1.5">
        <Calendar className="h-3 w-3 text-ink-soft" />
        <span className="text-[0.68rem] text-ink-soft">
          {event.date.toLocaleDateString("hi-IN", { day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>
    </div>
  );
};

export default FestivalCountdown;
