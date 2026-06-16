"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Eye, Moon, Sun } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  compact?: boolean;
};

const ThemeToggle = ({ className, compact = false }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes mount guard — read theme only after hydration to avoid mismatch
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={toggle}
        aria-label="आंखों की सुरक्षा — Eye Care mode toggle"
        aria-pressed={isDark}
        className={cn(
          "group inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl border border-line bg-surface/70 py-1.5 text-sm font-semibold text-ink-strong backdrop-blur-sm transition-all hover:border-gold-strong/50 hover:shadow-[0_0_24px_-8px_var(--glow-gold)] active:scale-[0.97]",
          compact ? "px-1.5" : "pr-3.5 pl-1.5",
          className,
        )}
      >
        <span
          className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl text-on-gold"
          style={{
            background:
              "linear-gradient(135deg, var(--color-gold), var(--color-gold-strong))",
          }}
        >
          {/* eye = the constant "eye-care" identity; sun/moon shows the action */}
          {!mounted ? (
            <Eye className="h-4 w-4" />
          ) : isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </span>
        {!compact && (
          <span className="flex flex-col items-start whitespace-nowrap leading-none">
            <span>आंखों की सुरक्षा</span>
            <span className="text-[0.65rem] font-medium text-ink-soft">
              {isDark ? "Day mode" : "Eye Care"}
            </span>
          </span>
        )}
      </TooltipTrigger>
      <TooltipContent side="bottom" className="block max-w-[15rem] px-3.5 py-2.5 text-left">
        <span className="block text-[0.8rem] font-semibold">
          रात के समय आंखों की सुरक्षा और बैटरी के लिए
        </span>
        <span className="mt-0.5 block text-[0.72rem] opacity-80">
          A warm low-light theme, made to protect your eyes and save battery.
        </span>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
