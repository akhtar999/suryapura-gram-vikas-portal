"use client";

import { useEffect, useState } from "react";
import { ChevronUp, Clock, MapPin, FileText } from "lucide-react";
import { LandmarkIcon } from "./icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

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
  const [scrolled, setScrolled] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    // Ticks only while the tab is visible — no point re-rendering a backgrounded
    // page once a second. Time starts null so first paint is SSR-safe.
    let interval: ReturnType<typeof setInterval> | undefined;
    const tick = () => setTime(getTimeLeft(MEETING_DATE));
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
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-40 w-fit max-w-[95vw] cursor-pointer"
        onClick={() => setShowDrawer(true)}
      >
        <div
          className={`relative overflow-hidden transition-all duration-300 ${
            scrolled
              ? "border-line bg-surface/90 shadow-[0_12px_40px_-12px_oklch(0.31_0.072_152/0.4)] hover:shadow-[0_16px_40px_-10px_oklch(0.31_0.072_152/0.5)]"
              : "border-line/60 bg-surface/80 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.15)]"
          } rounded-full border px-3 py-1.5 sm:px-5 sm:py-2 backdrop-blur-lg flex items-center gap-2.5 sm:gap-4 select-none`}
        >
          {/* Ambient gold glow */}
          <div
            aria-hidden
            className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-xl transition-opacity duration-300 ${
              scrolled ? "opacity-30" : "opacity-60"
            }`}
            style={{ background: "radial-gradient(closest-side, var(--glow-gold), transparent)" }}
          />

          {/* Identity */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span
              className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full text-on-gold"
              style={{
                background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-strong) 100%)",
              }}
            >
              <LandmarkIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-xs font-bold leading-none text-ink-strong whitespace-nowrap">
                <span className="hidden sm:inline">ग्राम सभा बैठक</span>
                <span className="sm:hidden">ग्राम सभा</span>
                <span className="hidden sm:inline text-[0.65rem] text-primary/80 font-semibold ml-1.5">
                  Next Meeting
                </span>
              </p>
              <p className="text-[0.6rem] text-ink-soft leading-none mt-0.5 hidden sm:block">
                {MEETING_DATE.toLocaleDateString("hi-IN", { day: "numeric", month: "long" })} · {MEETING_VENUE}
              </p>
            </div>
          </div>

          {/* Divider */}
          <span className="hidden sm:block h-4 w-px bg-line-strong dark:bg-white/20 shrink-0" />

          {/* Countdown */}
          <div className="flex items-center gap-0.5 sm:gap-1.5" aria-live="polite">
            {units.map((unit, i) => (
              <div key={unit.key} className="flex items-center gap-0.5 sm:gap-1.5">
                {i > 0 && (
                  <span className="font-display text-xs font-bold text-ink-soft/40">:</span>
                )}
                <div className="flex items-baseline gap-0.5">
                  <span className="font-display text-xs sm:text-sm font-extrabold tabular-nums leading-none text-ink-strong">
                    {time ? (unit.key === "days" ? time.days : pad(time[unit.key])) : "--"}
                  </span>
                  <span className="text-[0.55rem] font-bold text-ink-soft lowercase">
                    {unit.en.substring(0, 1)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <span className="h-4 w-px bg-line-strong dark:bg-white/20 shrink-0" />

          {/* Agenda Button (styled div inside clickable wrapper) */}
          <div
            className="flex items-center gap-1 text-[0.62rem] sm:text-xs font-bold text-primary hover:text-primary-deep transition-all duration-300 bg-primary-soft/50 border border-primary/10 px-2 py-0.5 rounded-lg select-none hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <span className="hidden sm:inline">एजेंडा · Agenda</span>
            <span className="sm:hidden">एजेंडा</span>
            <ChevronUp className="h-3.5 w-3.5 shrink-0 text-primary" />
          </div>
        </div>
      </div>

      {/* Meeting details — shadcn Drawer (Vaul) bottom sheet */}
      <Drawer open={showDrawer} onOpenChange={setShowDrawer}>
        <DrawerContent className="mx-auto max-w-lg select-none rounded-t-[2.5rem] border-line/60 bg-gradient-to-b from-surface via-surface/95 to-surface-sunk/90 pb-8 backdrop-blur-xl shadow-2xl">
          <DrawerHeader className="text-left pt-6 pb-2">
            <div className="flex items-center gap-3.5">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-on-gold shadow-md"
                style={{
                  background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-strong) 100%)",
                }}
              >
                <LandmarkIcon className="h-5 w-5" />
              </span>
              <div>
                <DrawerTitle className="font-display text-lg font-extrabold text-ink-strong">
                  ग्राम सभा बैठक
                </DrawerTitle>
                <DrawerDescription className="text-[0.7rem] font-bold uppercase tracking-wider text-primary mt-0.5">
                  Gram Sabha Assembly Details
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          <div className="mx-4 my-2 border-t border-line/40" />

          {/* Info Details as premium card items */}
          <div className="flex flex-col gap-3.5 px-4 pt-2">
            {/* Time Card */}
            <div className="flex items-center gap-4 p-4 rounded-[1.5rem] border border-line/35 bg-surface-sunk/30 hover:bg-surface-sunk/55 hover:border-line/60 transition-all duration-300">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold-strong/15 text-ochre border border-gold-strong/10">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-ink-strong">22 जून 2026, सुबह 11:00 बजे</p>
                <p className="text-[0.7rem] text-ink-soft mt-0.5">Monday, 22 June 2026 · 11:00 AM</p>
              </div>
            </div>

            {/* Venue Card */}
            <div className="flex items-center gap-4 p-4 rounded-[1.5rem] border border-line/35 bg-surface-sunk/30 hover:bg-surface-sunk/55 hover:border-line/60 transition-all duration-300">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary-deep/15 text-primary border border-primary/10">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-ink-strong">पंचायत भवन सभाकक्ष</p>
                <p className="text-[0.7rem] text-ink-soft mt-0.5">Panchayat Bhavan Assembly Hall</p>
              </div>
            </div>

            {/* Agenda Card */}
            <div className="flex items-center gap-4 p-4 rounded-[1.5rem] border border-line/35 bg-surface-sunk/30 hover:bg-surface-sunk/55 hover:border-line/60 transition-all duration-300">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ochre/20 to-gold-strong/15 text-ochre border border-gold-strong/10">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-ink-strong">नया जल बजट और सड़क विकास प्रस्ताव</p>
                <p className="text-[0.7rem] text-ink-soft mt-0.5">Agenda: Water Budget & Rural Road Maintenance</p>
              </div>
            </div>
          </div>

          <DrawerFooter className="pt-6">
            <DrawerClose asChild>
              <button className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-primary to-primary-deep py-3.5 text-center text-sm font-bold text-on-primary transition-all duration-300 hover:brightness-105 active:scale-[0.98] shadow-md shadow-primary/20">
                बंद करें · Close
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default GramSabhaCountdown;
