"use client";

import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";

const SLIDES = [
  { id: "svc-agri", title: "agriculture", image: "/gallery_fields.png" },
  { id: "svc-edu", title: "education", image: "/gallery_education.png" },
  { id: "svc-solar", title: "solar energy", image: "/gallery_solar.png" },
  { id: "svc-panchayat", title: "panchayat", image: "/gallery_meeting.png" },
  { id: "svc-dawn", title: "new dawn", image: "/gallery_dawn.png" },
];

const VillageServices = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-background to-surface-sunk/30 py-16 sm:py-24"
    >
      {/* Ambient orb for depth, matching the site's other sections */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[28rem] w-[28rem] translate-x-1/3 rounded-full opacity-25 blur-[130px] dark:opacity-15"
        style={{ background: "radial-gradient(closest-side, var(--color-gold), transparent 80%)" }}
      />

      <HoverSlider className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-lg border border-primary/10 bg-primary-soft/60 px-3 py-1 text-xs font-bold text-primary">
          हमारी पहल · Our Initiatives
        </div>
        <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold leading-tight tracking-[-0.025em] text-ink-strong">
          गाँव की प्रगति, एक नज़र में।
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          हर सेवा पर मँडराएँ और झलक देखें — hover a service to bring it to life.
        </p>

        <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:justify-between md:gap-12">
          {/* Titles */}
          <div className="flex flex-col gap-2 md:gap-4">
            {SLIDES.map((slide, index) => (
              <TextStaggerHover
                key={slide.id}
                index={index}
                text={slide.title}
                className="cursor-pointer text-3xl font-extrabold uppercase tracking-tighter text-ink-strong sm:text-4xl md:text-5xl"
              />
            ))}
          </div>

          {/* Image reveal */}
          <HoverSliderImageWrap className="w-full max-w-md rounded-[2rem] ring-1 ring-line/60 shadow-[0_40px_80px_-40px_var(--glow-green)]">
            {SLIDES.map((slide, index) => (
              <HoverSliderImage
                key={slide.id}
                index={index}
                imageUrl={slide.image}
                alt={slide.title}
                width={1024}
                height={1024}
                sizes="(max-width: 768px) 92vw, 460px"
                priority={index === 0}
                className="h-full max-h-[26rem] w-full rounded-[2rem] object-cover"
              />
            ))}
          </HoverSliderImageWrap>
        </div>
      </HoverSlider>
    </section>
  );
};

export default VillageServices;
