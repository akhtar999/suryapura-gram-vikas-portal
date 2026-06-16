"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `end` when the element scrolls into view.
 * Parses strings like "1,840", "94%", "12" and returns the formatted result.
 * Uses IntersectionObserver so it only fires once.
 */
export function useCountUp(target: string, duration = 1800) {
  // Parse: strip commas, strip %, extract the numeric part
  const suffix = target.includes("%") ? "%" : "";
  const prefix = target.startsWith("₹") ? "₹" : "";
  const cleanTarget = target.replace(/[₹,%+]/g, "").replace(/\s/g, "");
  const endValue = parseFloat(cleanTarget) || 0;
  const hasCommas = target.includes(",");

  const [display, setDisplay] = useState(target); // Show final value by default (SSR)
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setHasAnimated(true);

        const startTime = performance.now();

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out quint: 1 - (1 - t)^5
          const eased = 1 - Math.pow(1 - progress, 5);
          const current = Math.round(eased * endValue);

          const formatted = hasCommas
            ? current.toLocaleString("en-IN")
            : String(current);

          setDisplay(`${prefix}${formatted}${suffix}`);

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        // Start from 0
        setDisplay(`${prefix}0${suffix}`);
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [endValue, duration, hasCommas, suffix, prefix, hasAnimated]);

  return { ref, display };
}
