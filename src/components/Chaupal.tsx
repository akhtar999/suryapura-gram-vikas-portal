import { Radio, Send, Sprout } from "lucide-react";
import { chaupal } from "@/lib/content";

const tagStyle: Record<string, string> = {
  कृषि: "bg-primary-soft text-primary",
  डेयरी: "bg-gold-soft text-ochre",
  विकास: "bg-primary-soft text-primary",
  सूचना: "bg-gold-soft text-ochre",
};

const Chaupal = () => (
  <section
    id="chaupal"
    className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-4 sm:px-6"
  >
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      {/* Intro */}
      <div className="max-w-md">
        <p className="flex items-center gap-2 text-base font-semibold text-primary">
          <Sprout className="h-5 w-5 text-gold-strong" />
          डिजिटल चौपाल
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-bold leading-tight tracking-[-0.02em] text-ink-strong">
          The village square, now live.
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">
          जैसे पुराने ज़माने में पेड़ के नीचे चौपाल लगती थी, वैसे ही अब हर ख़बर,
          हर अपडेट यहाँ सबके लिए, पल-पल।
        </p>
        <div className="mt-6 flex items-center gap-2.5 rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink-soft shadow-sm">
          <span className="text-ink-soft">अपनी बात कहें…</span>
          <span
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-xl text-on-primary"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--color-primary), var(--color-primary-deep))",
            }}
          >
            <Send className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Live feed card */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-surface to-surface-sunk/50 p-5 shadow-[0_30px_70px_-40px_var(--glow-green)] sm:p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--glow-gold), transparent)" }}
        />
        <div className="relative flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-strong">
            <Radio className="h-5 w-5 text-primary" />
            गाँव की ताज़ा हलचल
          </h3>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-danger-soft px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-danger">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
            </span>
            Live
          </span>
        </div>

        <ul className="relative mt-4 space-y-2.5">
          {chaupal.map((c) => (
            <li
              key={c.text}
              className="flex items-start gap-3 rounded-2xl border border-line bg-surface/70 p-3.5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span
                className={`mt-0.5 shrink-0 rounded-lg px-2 py-0.5 text-[0.7rem] font-semibold ${tagStyle[c.tag] ?? "bg-primary-soft text-primary"
                  }`}
              >
                {c.tag}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm leading-snug text-ink">{c.text}</span>
                <span className="mt-0.5 block text-[0.72rem] text-ink-soft">{c.ago}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Chaupal;
