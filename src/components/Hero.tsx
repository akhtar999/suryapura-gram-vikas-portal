"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import VoiceSearch from "./VoiceSearch";
import { ArrowRightIcon, PhoneIcon, SunIcon } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { heroImage, leader, trustStats } from "@/lib/content";
import { useCountUp } from "@/hooks/useCountUp";
import ShinyButton from "@/components/ui/shiny-button";

const SlidingTranslation = ({
  english,
  hindi,
  minWidthClass = "min-w-[190px]",
}: {
  english: string;
  hindi: string;
  minWidthClass?: string;
}) => {
  const [isEnglish, setIsEnglish] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEnglish((prev) => !prev);
    }, 4000); // 4 seconds interval for comfortable bilingual reading
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative overflow-hidden h-[24px] inline-flex items-center justify-center ${minWidthClass}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={isEnglish ? "en" : "hi"}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 text-center whitespace-nowrap"
        >
          {isEnglish ? english : hindi}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ── Animated count-up stat ─────────────────────────── */
const CountUpStat = ({ value, label, hi }: { value: string; label: string; hi: string }) => {
  const { ref, display } = useCountUp(value, 2000);
  return (
    <div className="flex flex-col">
      <dd
        ref={ref as React.Ref<HTMLElement>}
        className="order-1 font-display text-2xl font-bold text-ink-strong sm:text-[1.7rem]"
      >
        {display}
      </dd>
      <dt className="order-2 mt-0.5 text-[0.8rem] leading-snug text-ink-soft">
        {label}
        <span className="block text-primary/80">{hi}</span>
      </dt>
    </div>
  );
};

/* ── Time-aware greeting ───────────────────────────── */
const getTimeGreeting = (): { icon: string; hi: string; en: string } => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return { icon: "🌅", hi: "सुप्रभात, सूर्यपुरा!", en: "Good morning, Suryapura!" };
  if (h >= 12 && h < 17) return { icon: "☀️", hi: "नमस्कार, सूर्यपुरा!", en: "Good afternoon, Suryapura!" };
  if (h >= 17 && h < 21) return { icon: "🌇", hi: "शुभ संध्या, सूर्यपुरा!", en: "Good evening, Suryapura!" };
  return { icon: "🌙", hi: "शुभ रात्रि, सूर्यपुरा!", en: "Good night, Suryapura!" };
};

const TimeGreeting = () => {
  const [greeting, setGreeting] = useState({ icon: "🌅", hi: "प्रगति का नया सवेरा, परंपरा के संग", en: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGreeting(getTimeGreeting());
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-lg" role="img">{greeting.icon}</span>
      {mounted ? (
        <span>
          {greeting.hi}
          <span className="hidden sm:inline text-primary/60 ml-1.5">· {greeting.en}</span>
        </span>
      ) : (
        <span>प्रगति का नया सवेरा, परंपरा के संग</span>
      )}
    </span>
  );
};

const Hero = () => {
  useEffect(() => {
    // Check if browser has native support for scroll-driven animations
    if (
      typeof window !== "undefined" &&
      window.CSS &&
      window.CSS.supports &&
      window.CSS.supports("(animation-timeline: view()) and (animation-range: entry)")
    ) {
      return;
    }

    const hero = document.getElementById("top");
    const glow = document.querySelector(".parallax-glow") as HTMLElement;
    const photo = document.querySelector(".parallax-photo") as HTMLElement;
    const text = document.querySelector(".parallax-text") as HTMLElement;

    if (!hero) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const heroRect = hero.getBoundingClientRect();
      const heroHeight = heroRect.height;

      // Only perform parallax adjustments if Hero is in view
      if (scrollY <= heroHeight) {
        const progress = Math.max(0, Math.min(1, scrollY / heroHeight));

        if (glow) {
          glow.style.transform = `translate3d(${progress * 15}px, ${-progress * 15}px, 0) scale(${1 + progress * 0.05}) translateY(${progress * 100}px)`;
        }
        if (photo) {
          photo.style.transform = `translateY(${-progress * 70}px)`;
        }
        if (text) {
          text.style.transform = `translateY(${-progress * 30}px)`;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once to set initial positions
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-24 lg:pt-28 timeline-hero">
      {/* Paddy field backdrop — the whole hero sits over a rice-field photo. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/paddy.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Mobile scrim — single column, so the copy runs full width.
            A top-to-bottom fade keeps every line readable while the field
            still peeks through lower down behind the showcase card. */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--background) 92%, transparent) 0%, color-mix(in oklab, var(--background) 86%, transparent) 38%, color-mix(in oklab, var(--background) 60%, transparent) 100%)",
          }}
        />
        {/* Desktop scrim — heavy on the left where the copy lives,
            fading out to the right so the field stays visible beside the card. */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, color-mix(in oklab, var(--background) 94%, transparent) 0%, color-mix(in oklab, var(--background) 70%, transparent) 42%, color-mix(in oklab, var(--background) 32%, transparent) 100%)",
          }}
        />
      </div>

      {/* Dawn glow — saffron light bleeding in from the top-right. */}
      <div
        aria-hidden
        className="sun-drift parallax-glow pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full opacity-90 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--glow-gold), transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-40 h-[28rem] w-[28rem] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--glow-green), transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-24">
        {/* ---- Copy ---- */}
        <div className="max-w-xl parallax-text">
          <p className="rise reveal-delay-1 flex items-center gap-2 text-base font-semibold text-primary">
            <SunIcon className="h-5 w-5 text-gold-strong" />
            <TimeGreeting />
          </p>

          <h1 className="rise reveal-delay-2 mt-4 font-display text-[clamp(2rem,6vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.025em] text-ink-strong text-balance">
            The Dawn of Progress, Rooted in Tradition.
          </h1>

          <p className="rise reveal-delay-3 mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
            Mandi prices before you reach the field. School progress you can see.
            Roads you can track. The whole Panchayat in your pocket. In your
            language, on any phone, even on a slow morning signal.
          </p>

          <div className="rise reveal-delay-4 mt-7">
            <VoiceSearch />
            <p className="mt-2.5 pl-4 text-sm text-ink-soft">
              Tap the mic to search by voice | पढ़ना न आता हो, तो बोलकर खोजें।
            </p>
          </div>

          <div className="rise reveal-delay-5 mt-7 flex flex-col items-center gap-3 sm:flex-row sm:items-stretch">
            <ShinyButton
              href="#pillars"
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-1.5 sm:gap-2 rounded-2xl bg-primary px-4 sm:px-6 text-sm sm:text-base font-semibold text-on-primary shadow-[0_18px_40px_-16px_var(--glow-green)] transition-transform hover:bg-primary-deep active:scale-[0.98]"
            >
              <SlidingTranslation english="See the village dashboard" hindi="गाँव का डैशबोर्ड देखें" minWidthClass="min-w-[170px] sm:min-w-[215px]" />
              <ArrowRightIcon className="h-5 w-5 shrink-0" />
            </ShinyButton>
            <ShinyButton
              href="#support"
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-1.5 sm:gap-2 rounded-2xl border border-line-strong bg-surface px-4 sm:px-6 text-sm sm:text-base font-semibold text-ink-strong transition-colors hover:border-primary hover:text-primary"
            >
              <PhoneIcon className="h-5 w-5 text-primary shrink-0" />
              <SlidingTranslation english="Talk to the Panchayat" hindi="पंचायत से बात करें" minWidthClass="min-w-[140px] sm:min-w-[175px]" />
            </ShinyButton>
          </div>

          <dl className="rise reveal-delay-5 mt-9 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {trustStats.map((stat) => (
              <CountUpStat key={stat.label} value={stat.value} label={stat.label} hi={stat.hi} />
            ))}
          </dl>
        </div>

        {/* ---- Showcase + Ambassador spotlight ---- */}
        <div className="rise reveal-delay-3">
          <div className="relative mx-auto max-w-md overflow-hidden rounded-[1.75rem] bg-surface shadow-[0_40px_80px_-40px_var(--glow-green)] ring-1 ring-line/60 parallax-photo">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 460px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.22 0.05 152 / 0.7), transparent 48%)",
                }}
              />
              <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-surface/85 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
                Suryapura
              </span>
            </div>

            {/* Ambassador spotlight */}
            <figure className="relative px-5 pb-6 pt-14">
              <div className="absolute -top-11 left-5">
                <div
                  className="rounded-full p-[3px] shadow-[0_0_30px_-4px_var(--glow-gold)]"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-gold), var(--color-primary))",
                  }}
                >
                  <Avatar className="h-[5.25rem] w-[5.25rem] border-2 border-surface">
                    <AvatarImage
                      src={leader.avatar}
                      alt={leader.avatarAlt}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary-soft font-display text-lg font-bold text-primary">
                      कद
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <figcaption>
                <p className="font-display text-xl font-bold leading-tight text-ink-strong">
                  {leader.name}
                </p>
                <p className="text-sm font-semibold text-primary">{leader.nameHi}</p>
                <p className="mt-0.5 text-[0.8rem] text-ink-soft">{leader.role}</p>
              </figcaption>

              <blockquote className="mt-3.5 text-[0.95rem] italic leading-relaxed text-ink">
                <span className="mr-0.5 font-display text-2xl not-italic leading-none text-gold-strong align-[-0.35em]">
                  “
                </span>
                {leader.quote}
              </blockquote>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
