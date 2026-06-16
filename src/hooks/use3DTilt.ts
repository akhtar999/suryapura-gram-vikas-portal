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

    // Exit early if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Set standard transition properties
    element.style.willChange = "transform";

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position relative to the element
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Normalize coordinates to ranges between -0.5 and 0.5
      const normalizedX = (mouseX / width) - 0.5;
      const normalizedY = (mouseY / height) - 0.5;

      // Calculate tilt rotation:
      // - Moving mouse up (negative Y) tilts the card forward (positive rotateX)
      // - Moving mouse right (positive X) tilts the card right (positive rotateY)
      const rotateX = -normalizedY * maxTilt;
      const rotateY = normalizedX * maxTilt;

      // Apply transforms
      element.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
      element.style.transition = "transform 100ms cubic-bezier(0.22, 1, 0.36, 1)";
    };

    const handleMouseLeave = () => {
      // Reset transform smoothly
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      element.style.transition = "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTilt, scale]);

  return ref;
}
