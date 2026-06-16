"use client";

import { useEffect, useMemo, useState } from "react";
import { Home, Sprout, Sparkles, Landmark, Phone, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { LimelightNav, type NavItem } from "@/components/ui/limelight-nav";

const scrollToSection = (id: string) => () => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// On mobile the pillars render one-at-a-time behind a tab bar, so deep-linking
// to a specific pillar means activating its tab first, then scrolling to the
// (always-visible) pillars section. Indices match the tab order in Pillars.tsx.
const selectPillar = (index: number) => () => {
  window.dispatchEvent(new CustomEvent("pillar:select", { detail: index }));
  scrollToSection("pillars")();
};

// Full set of destinations (id === the section's DOM id). The bar renders only
// those whose section is actually present on the page — see MobileBottomNav.
const ALL_NAV: NavItem[] = [
  { id: "top",       icon: <Home />,     label: "Home",      onClick: scrollToSection("top") },
  { id: "pillars",   icon: <Sprout />,   label: "Pillars",   onClick: selectPillar(0) },
  { id: "services",  icon: <Sparkles />, label: "Services",  onClick: scrollToSection("services") },
  { id: "panchayat", icon: <Landmark />, label: "Panchayat", onClick: selectPillar(3) },
  { id: "support",   icon: <Phone />,    label: "Support",   onClick: scrollToSection("support") },
];

const MobileBottomNav = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Render only nav items whose target section exists, so the bar adapts as
  // sections are added or removed from the page.
  const navItems = useMemo(
    () =>
      mounted
        ? ALL_NAV.filter((item) => document.getElementById(String(item.id)))
        : ALL_NAV,
    [mounted]
  );

  // Scroll-spy: highlight the nav item whose section is currently in view.
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(String(item.id)));

    let frame = 0;
    const update = () => {
      frame = 0;
      // Reference line in the upper third of the viewport; the active section
      // is the last one whose top has scrolled above it.
      const line = window.innerHeight * 0.35;
      let next = 0;
      sections.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Skip cards hidden behind a mobile tab — they collapse to a 0×0 box
        // and would otherwise always register as "scrolled past".
        if (rect.width === 0 && rect.height === 0) return;
        if (rect.top <= line) next = index;
      });
      setActiveIndex(next);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [navItems]);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div
      className="fixed inset-x-0 z-[70] flex justify-center px-3 lg:hidden"
      style={{ bottom: "max(0.75rem, calc(env(safe-area-inset-bottom) + 0.5rem))" }}
    >
      {/* Unified bar — nav items on the left, theme toggle on the right */}
      <div className="flex h-16 w-full max-w-sm items-center overflow-hidden rounded-xl border border-border/40 bg-card/60 text-foreground backdrop-blur-md shadow-[0_18px_40px_-16px_var(--glow-green),inset_0_1px_0_oklch(1_0_0_/_0.18)]">
        {/* 5 nav items with limelight effect */}
        <LimelightNav
          bare
          items={navItems}
          activeIndex={activeIndex}
          className="flex-1 px-3"
          iconContainerClassName="flex-1 px-0"
        />

        {/* Separator */}
        <div className="h-8 w-px shrink-0 bg-border/50" />

        {/* Theme toggle — fills its section with gold gradient, rounded on the right to match the bar */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label={isDark ? "Switch to day mode" : "Switch to eye-care mode"}
          aria-pressed={isDark}
          className="flex h-full items-center justify-center rounded-r-xl px-5 text-on-gold transition-all active:brightness-95"
          style={{
            background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-strong) 100%)",
            boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.2)",
          }}
        >
          {!mounted ? (
            <Moon className="h-6 w-6" />
          ) : isDark ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;
