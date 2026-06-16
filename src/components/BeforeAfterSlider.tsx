"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeftRight } from "lucide-react";

const beforeAfterData = {
  before: {
    src: "https://images.unsplash.com/photo-1515165616741-92e26e3a8b26?auto=format&fit=crop&w=900&q=75",
    alt: "An unpaved dirt village road before construction",
    label: "पहले · Before",
  },
  after: {
    src: "https://images.unsplash.com/photo-1515165616741-92e26e3a8b26?auto=format&fit=crop&w=900&q=75",
    alt: "A newly paved village road after construction",
    label: "अब · After",
  },
  title: "मुख्य सड़क निर्माण",
  titleEn: "Main Road Paving",
  status: "100% पूर्ण · Completed",
};

/**
 * Before/After comparison slider with draggable divider.
 * Shows the transformation achieved by infrastructure projects.
 */
const BeforeAfterSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <p className="flex items-center justify-center gap-2 text-base font-semibold text-primary">
          <ArrowLeftRight className="h-5 w-5 text-gold-strong" />
          परिवर्तन की तस्वीर
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold tracking-[-0.02em] text-ink-strong">
          See the change. Slide to compare.
        </h2>
        <p className="mt-3 mx-auto max-w-xl text-lg text-ink-soft">
          बदलाव देखो, स्लाइड करो — विकास के पहले और बाद की तस्वीर।
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl"
      >
        <div
          ref={containerRef}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-line shadow-[0_30px_60px_-30px_var(--glow-green)] cursor-col-resize select-none touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* After image (full background) */}
          <Image
            src={beforeAfterData.after.src}
            alt={beforeAfterData.after.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
            style={{ filter: "saturate(1.2) brightness(1.05)" }}
          />
          {/* Green tint overlay to simulate "after" improvement */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, oklch(0.45 0.1 150 / 0.12), oklch(0.8 0.15 73 / 0.08))",
            }}
          />

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <Image
              src={beforeAfterData.before.src}
              alt={beforeAfterData.before.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
              style={{ filter: "grayscale(0.6) brightness(0.85) contrast(1.1)" }}
            />
            {/* Dust/sepia overlay for "before" */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, oklch(0.5 0.08 60 / 0.2), transparent)",
              }}
            />
          </div>

          {/* Slider line */}
          <div
            className="absolute top-0 bottom-0 w-1 -translate-x-1/2 z-10"
            style={{ left: `${position}%` }}
          >
            <div className="h-full w-full bg-white shadow-[0_0_16px_rgba(0,0,0,0.3)]" />
            {/* Drag handle */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-primary shadow-[0_8px_24px_-8px_var(--glow-green)] transition-transform ${
                isDragging ? "scale-110" : "hover:scale-105"
              }`}
            >
              <ArrowLeftRight className="h-5 w-5 text-primary" />
            </div>
          </div>

          {/* Labels */}
          <span className="absolute top-4 left-4 z-20 inline-flex items-center rounded-xl bg-surface/85 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-ink-strong shadow">
            {beforeAfterData.before.label}
          </span>
          <span className="absolute top-4 right-4 z-20 inline-flex items-center rounded-xl bg-primary/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-on-primary shadow">
            {beforeAfterData.after.label}
          </span>
        </div>

        {/* Info bar below */}
        <div className="mt-4 flex items-center justify-between px-2">
          <div>
            <p className="font-display text-base font-bold text-ink-strong">{beforeAfterData.title}</p>
            <p className="text-sm text-ink-soft">{beforeAfterData.titleEn}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary-soft/80 border border-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
            ✓ {beforeAfterData.status}
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default BeforeAfterSlider;
