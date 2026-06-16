"use client";

import { useEffect, useState } from "react";
import { Home, Sprout, Route, Landmark, Phone, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { LimelightNav, type NavItem } from "@/components/ui/limelight-nav";

const scrollToSection = (id: string) => () => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const navItems: NavItem[] = [
  { id: "top",            icon: <Home />,     label: "Home",      onClick: scrollToSection("top") },
  { id: "pillars",        icon: <Sprout />,   label: "Pillars",   onClick: scrollToSection("pillars") },
  { id: "infrastructure", icon: <Route />,    label: "Progress",  onClick: scrollToSection("infrastructure") },
  { id: "panchayat",      icon: <Landmark />, label: "Panchayat", onClick: scrollToSection("panchayat") },
  { id: "support",        icon: <Phone />,    label: "Support",   onClick: scrollToSection("support") },
];

const MobileBottomNav = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div
      className="fixed inset-x-0 z-[70] flex justify-center px-3 lg:hidden"
      style={{ bottom: "max(1.75rem, calc(env(safe-area-inset-bottom) + 1rem))" }}
    >
      {/* Unified bar — nav items on the left, theme toggle on the right */}
      <div className="flex h-16 w-full max-w-sm items-center overflow-hidden rounded-2xl border border-line bg-card text-foreground shadow-[0_18px_40px_-16px_var(--glow-green)]">
        {/* 5 nav items with limelight effect */}
        <LimelightNav
          bare
          items={navItems}
          className="flex-1 px-3"
          iconContainerClassName="flex-1 px-0"
        />

        {/* Separator */}
        <div className="h-8 w-px shrink-0 bg-border" />

        {/* Theme toggle — fills its section with gold gradient, rounded on the right to match the bar */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label={isDark ? "Switch to day mode" : "Switch to eye-care mode"}
          aria-pressed={isDark}
          className="flex h-full items-center justify-center rounded-r-2xl px-5 text-on-gold transition-all active:brightness-95"
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
