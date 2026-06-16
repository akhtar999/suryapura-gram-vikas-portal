"use client";

import { useEffect, useRef } from "react";

/**
 * A custom React hook that adds a premium 3D tilt-on-hover effect to HTML elements.
 * Calculates cursor coordinates relative to the card's boundaries and applies
 * GPU-accelerated perspective transform styles.
 * 
 * @param maxTilt The maximum tilt angle in degrees.
 * @param scale The hover scale multiplier.
 */
export function use3DTilt<T extends HTMLElement>(maxTilt = 8, scale = 1.02) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Exit early if user prefers reduced motion, or on touch devices that can't
    // hover — there the listeners are pure overhead and never fire usefully.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const render = () => {
      frame = 0;
      if (!pending) return;
      const rect = element.getBoundingClientRect();
      const normalizedX = (pending.x - rect.left) / rect.width - 0.5;
      const normalizedY = (pending.y - rect.top) / rect.height - 0.5;
      // Up tilts forward (+rotateX); right tilts right (+rotateY).
      const rotateX = -normalizedY * maxTilt;
      const rotateY = normalizedX * maxTilt;
      element.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
    };

    // Coalesce mousemove bursts into one layout read + transform write per frame.
    const handleMouseMove = (e: MouseEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(render);
    };

    const handleMouseEnter = () => {
      // Promote to its own layer only while interacting, then release it.
      element.style.willChange = "transform";
      element.style.transition = "transform 100ms cubic-bezier(0.22, 1, 0.36, 1)";
    };

    const handleMouseLeave = () => {
      pending = null;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      element.style.transition = "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)";
      element.style.willChange = "auto";
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTilt, scale]);

  return ref;
}
