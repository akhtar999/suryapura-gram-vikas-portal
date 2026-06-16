"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";
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
  const [collapsed, setCollapsed] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Set time asynchronously after mount to avoid server/client mismatch
    const timer = setTimeout(() => {
      setTime(getTimeLeft(MEETING_DATE));
    }, 0);
    const interval = setInterval(() => setTime(getTimeLeft(MEETING_DATE)), 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Collapse while actively scrolling; reveal again shortly after it
      // stops. Always stay visible at the very top.
      if (y <= 12) {
        setCollapsed(false);
        return;
      }
      setCollapsed(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setCollapsed(false), 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <>
      <div
        className={`absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 z-40 w-fit max-w-[95vw] cursor-pointer transition-all duration-300 ease-out ${
          collapsed ? "-translate-y-[130%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
        onClick={() => setShowDrawer(true)}
      >
        {/* Left Fillet (curves meeting bar to navbar) */}
        <div
          className="absolute top-0 right-full w-5 h-5 transition-all duration-300 pointer-events-none backdrop-blur-md"
          style={{
            background: scrolled
              ? `radial-gradient(circle at 0% 100%, transparent 18.5px, color-mix(in oklab, var(--border) 80%, transparent) 19px, color-mix(in oklab, var(--border) 80%, transparent) 20px, color-mix(in oklab, var(--card) 80%, transparent) 20.5px)`
              : `radial-gradient(circle at 0% 100%, transparent 20px, color-mix(in oklab, var(--card) 55%, transparent) 20.5px)`
          }}
        >
          {scrolled && (
            <div className="absolute top-0 inset-x-0 h-[2px] bg-surface z-20 pointer-events-none" />
          )}
        </div>

        <div
          className={`relative overflow-hidden rounded-b-2xl border-x border-b transition-all duration-300 ${
            scrolled
              ? "border-line/80 bg-surface/80 shadow-[0_8px_30px_-18px_oklch(0.31_0.072_152/0.5)]"
              : "border-transparent bg-surface/55"
          } px-2.5 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md flex items-center gap-2 sm:gap-4 select-none`}
        >
          {/* Border mask to remove dividing line between navbar and tab */}
          {scrolled && (
            <div className="absolute top-0 inset-x-[1px] h-[2px] bg-surface z-20 pointer-events-none" />
          )}

          {/* Ambient gold glow */}
          <div
            aria-hidden
            className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-xl transition-opacity duration-300 ${
              scrolled ? "opacity-30" : "opacity-60"
            }`}
            style={{ background: "radial-gradient(closest-side, var(--glow-gold), transparent)" }}
          />

          {/* Identity */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
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

        {/* Right Fillet (curves meeting bar to navbar) */}
        <div
          className="absolute top-0 left-full w-5 h-5 transition-all duration-300 pointer-events-none backdrop-blur-md"
          style={{
            background: scrolled
              ? `radial-gradient(circle at 100% 100%, transparent 18.5px, color-mix(in oklab, var(--border) 80%, transparent) 19px, color-mix(in oklab, var(--border) 80%, transparent) 20px, color-mix(in oklab, var(--card) 80%, transparent) 20.5px)`
              : `radial-gradient(circle at 100% 100%, transparent 20px, color-mix(in oklab, var(--card) 55%, transparent) 20.5px)`
          }}
        >
          {scrolled && (
            <div className="absolute top-0 inset-x-0 h-[2px] bg-surface z-20 pointer-events-none" />
          )}
        </div>
      </div>

      {/* Meeting details — shadcn Drawer (Vaul) bottom sheet */}
      <Drawer open={showDrawer} onOpenChange={setShowDrawer}>
        <DrawerContent className="mx-auto max-w-lg select-none rounded-t-3xl border-line/60 bg-surface/95 pb-8">
          <DrawerHeader className="text-left">
            <div className="flex items-center gap-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-on-gold"
                style={{
                  background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-strong) 100%)",
                }}
              >
                <LandmarkIcon className="h-4.5 w-4.5" />
              </span>
              <div>
                <DrawerTitle className="font-display text-base font-extrabold text-ink-strong">
                  ग्राम सभा बैठक
                </DrawerTitle>
                <DrawerDescription className="text-[0.7rem] font-bold uppercase tracking-wider text-primary">
                  Gram Sabha Assembly Details
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          <hr className="mx-4 border-line" />

          {/* Info Details */}
          <div className="flex flex-col gap-4 px-4 pt-4 text-xs font-semibold leading-relaxed text-ink-strong">
            <div className="flex gap-3">
              <span className="text-xl shrink-0" role="img" aria-label="time">⏰</span>
              <div>
                <p className="text-ink-strong font-bold">22 जून 2026, सुबह 11:00 बजे</p>
                <p className="text-[0.65rem] text-ink-soft">Monday, 22 June 2026 · 11:00 AM</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-xl shrink-0" role="img" aria-label="venue">📍</span>
              <div>
                <p className="text-ink-strong font-bold">पंचायत भवन सभाकक्ष</p>
                <p className="text-[0.65rem] text-ink-soft">Panchayat Bhavan Assembly Hall</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-xl shrink-0" role="img" aria-label="agenda">📋</span>
              <div>
                <p className="text-ink-strong font-bold">एजेंडा: नया जल बजट और सड़क विकास प्रस्ताव</p>
                <p className="text-[0.65rem] text-ink-soft">Agenda: Water Budget & Rural Road Maintenance</p>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <button className="w-full cursor-pointer rounded-xl bg-primary py-2.5 text-center text-xs font-bold text-on-primary transition-transform hover:bg-primary-deep active:scale-[0.98]">
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
