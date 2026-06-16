"use client";

import { Wheat, GraduationCap, Route, Sun, Radio } from "lucide-react";
import { mandiPrices, weather, projects } from "@/lib/content";

/**
 * A thin horizontal ticker bar showing bite-sized live updates.
 * The digital equivalent of a village bulletin board at the chaupal tree.
 * Uses pure CSS animation (marquee-track already in globals.css).
 */
const TickerBar = () => {
  const items = [
    {
      icon: <Wheat className="h-3.5 w-3.5 text-ochre" />,
      text: `${mandiPrices[0].hi} ${mandiPrices[0].price} ${mandiPrices[0].delta}`,
    },
    {
      icon: <Wheat className="h-3.5 w-3.5 text-ochre" />,
      text: `${mandiPrices[1].hi} ${mandiPrices[1].price} ${mandiPrices[1].delta}`,
    },
    {
      icon: <Sun className="h-3.5 w-3.5 text-gold-strong" />,
      text: `मौसम: ${weather.tempC}°C, ${weather.conditionHi}`,
    },
    {
      icon: <Route className="h-3.5 w-3.5 text-primary" />,
      text: `${projects[0].hi}: ${projects[0].pct}% पूर्ण`,
    },
    {
      icon: <GraduationCap className="h-3.5 w-3.5 text-gold-strong" />,
      text: "डिजिटल साक्षरता शिविर · हर शनिवार · 4 बजे",
    },
    {
      icon: <Radio className="h-3.5 w-3.5 text-primary" />,
      text: "ग्राम सभा कल सुबह 10 बजे · पंचायत भवन",
    },
  ];

  // Duplicate for seamless loop
  const allItems = [...items, ...items];

  return (
    <div className="relative border-b border-line bg-surface-sunk/60 backdrop-blur-sm overflow-hidden">
      <div className="mx-auto max-w-6xl flex items-center gap-2 px-4 sm:px-6">
        {/* Static label */}
        <span className="hidden sm:flex shrink-0 items-center gap-1.5 text-[0.7rem] font-bold text-primary uppercase tracking-wider py-2.5 pr-3 border-r border-line">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Live
        </span>

        {/* Scrolling marquee */}
        <div
          className="marquee-mask flex-1 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
          }}
        >
          <div
            className="marquee-track flex w-max gap-8 py-2.5"
            style={{ "--marquee-duration": "45s" } as React.CSSProperties}
          >
            {allItems.map((item, i) => (
              <span
                key={i}
                className="inline-flex shrink-0 items-center gap-1.5 text-[0.78rem] font-semibold text-ink whitespace-nowrap"
              >
                {item.icon}
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TickerBar;
