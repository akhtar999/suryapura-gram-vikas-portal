"use client";

import { Fragment, useEffect, useState } from "react";
import SunMark from "./SunMark";
import ThemeToggle from "./ThemeToggle";
import { navItems } from "@/lib/content";
import { support } from "@/lib/content";
import {
  ArrowRightIcon,
  LandmarkIcon,
  PhoneIcon,
  RoadIcon,
  SproutIcon,
  WhatsappIcon,
} from "./icons";

const telHref = (n: string) => `tel:${n.replace(/[^0-9+]/g, "")}`;
const waHref = (n: string) => `https://wa.me/${n.replace(/[^0-9]/g, "")}`;

const navIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  "#pillars": SproutIcon,
  "#infrastructure": RoadIcon,
  "#panchayat": LandmarkIcon,
  "#support": PhoneIcon,
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-line/80 bg-surface/80 shadow-[0_8px_30px_-18px_oklch(0.31_0.072_152/0.5)]"
            : "border-b border-transparent bg-surface/55"
        } backdrop-blur-md`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem]">
          <a
            href="#top"
            className="flex min-w-0 items-center gap-2.5 rounded-xl py-1 pr-2"
            aria-label="Suryapura Gram Vikas Portal — home"
          >
            <SunMark className="h-9 w-9 shrink-0" />
            <span className="min-w-0 leading-tight">
              <span className="block whitespace-nowrap font-display text-[0.95rem] font-semibold tracking-tight text-ink-strong sm:text-base">
                Suryapura
                <span className="text-ink-soft"> Gram Vikas Portal</span>
              </span>
              <span className="block truncate text-[0.7rem] font-medium text-primary">
                सूर्यपुरा ग्राम विकास पोर्टल
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {navItems.map((item, i) => {
              const Icon = navIcon[item.href];
              return (
                <Fragment key={item.href}>
                  {i > 0 && (
                    <span aria-hidden className="h-4 w-px shrink-0 bg-line-strong dark:bg-white/25" />
                  )}
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-2xl px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-primary-soft hover:text-primary-deep"
                  >
                    {Icon && <Icon className="h-4 w-4 shrink-0 text-primary" />}
                    {item.label}
                    <span className="hidden text-[0.7rem] text-ink-soft group-hover:text-primary xl:inline">
                      {item.hi}
                    </span>
                  </a>
                </Fragment>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* Dark mode — desktop only; mobile has it in the bottom nav */}
            <ThemeToggle className="hidden lg:inline-flex" />

            {/* WhatsApp — mobile only */}
            <a
              href={waHref(support.whatsapp)}
              aria-label={`WhatsApp support — ${support.whatsapp}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-on-primary shadow-[0_4px_16px_-4px_var(--glow-green)] transition-transform active:scale-95 lg:hidden"
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-deep))",
              }}
            >
              <WhatsappIcon className="h-5 w-5" />
            </a>

            {/* Emergency call — mobile only */}
            <a
              href={telHref(support.emergency)}
              aria-label={`Emergency call — ${support.emergency}`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-danger text-white shadow-[0_4px_16px_-4px_oklch(0.55_0.19_27/0.6)] transition-transform active:scale-95 lg:hidden"
            >
              <span className="absolute inset-0 animate-ping rounded-2xl bg-danger/30" />
              <PhoneIcon className="relative h-4.5 w-4.5" />
            </a>

            {/* Desktop CTA */}
            <a
              href="#support"
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-transform hover:bg-primary-deep active:scale-[0.98] lg:inline-flex"
            >
              Report an issue
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
