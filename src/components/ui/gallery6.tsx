"use client";

import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  eyebrow?: string;
  items?: GalleryItem[];
}

const Gallery6 = ({
  heading = "Gallery",
  eyebrow = "हमारा गाँव",
  items = [],
}: Gallery6Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [snapCount, setSnapCount] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setSelected(api.selectedScrollSnap());
    };
    // Initial sync from the embla API once it's ready.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSnapCount(api.scrollSnapList().length);
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      {/* Header — heading on the left, controls on the right */}
      <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
        <div>
          <p className="flex items-center gap-2 text-base font-semibold text-primary">
            <Camera className="h-5 w-5 text-gold-strong" />
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold tracking-[-0.02em] text-ink-strong leading-tight">
            {heading}
          </h2>
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <Button
            size="icon"
            variant="outline"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous"
            className="h-11 w-11 rounded-full border-line bg-surface text-ink-strong hover:border-primary hover:text-primary disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next"
            className="h-11 w-11 rounded-full border-line bg-surface text-ink-strong hover:border-primary hover:text-primary disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          breakpoints: {
            "(max-width: 768px)": { dragFree: true },
          },
        }}
      >
        <CarouselContent className="-ml-4">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-[82%] pl-4 sm:basis-1/2 lg:basis-1/3"
            >
              <a href={item.url} className="group flex h-full flex-col">
                <div className="relative aspect-[3/2] overflow-hidden rounded-3xl ring-1 ring-line/60">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 82vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.18 0.03 152 / 0.55), transparent 55%)",
                    }}
                  />
                </div>

                <h3 className="mt-4 line-clamp-2 font-display text-base font-bold leading-snug text-ink-strong sm:text-lg md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {item.summary}
                </p>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots */}
      {snapCount > 1 && (
        <div className="mt-7 flex justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selected ? "w-6 bg-primary" : "w-2 bg-line-strong hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export { Gallery6 };
