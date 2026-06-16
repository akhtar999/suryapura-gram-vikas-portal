"use client";

import { useState, type ComponentType } from "react";
import {
  BookOpen,
  Calendar,
  Check,
  ChevronRight,
  Droplets,
  Fingerprint,
  GraduationCap,
  Route,
  ScrollText,
  Sprout,
  Sun,
  TrendingUp,
  Users,
  Volume2,
  Wheat,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  education,
  idServices,
  ledger,
  mandiPrices,
  projects,
  weather,
  workshops,
} from "@/lib/content";
import { use3DTilt } from "@/hooks/use3DTilt";
import FestivalCountdown from "./FestivalCountdown";

type IconType = ComponentType<{ className?: string }>;

const PillarIcon = ({ Icon, gradient }: { Icon: IconType; gradient: string }) => (
  <span
    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_10px_24px_-10px_var(--glow-green)]"
    style={{ backgroundImage: gradient }}
  >
    <Icon className="h-6 w-6" />
  </span>
);

const PillarHead = ({
  Icon,
  gradient,
  title,
  hi,
  aside,
  tightAside = false,
}: {
  Icon: IconType;
  gradient: string;
  title: string;
  hi: string;
  aside?: React.ReactNode;
  // Tuck the aside right beside the title instead of pushing it to the far edge.
  tightAside?: boolean;
}) => (
  <div className="flex items-center justify-between gap-3">
    <div className="flex items-center gap-3.5">
      <PillarIcon Icon={Icon} gradient={gradient} />
      <div className="leading-tight">
        <h3 className="font-display text-lg font-bold text-ink-strong">{title}</h3>
        <p className="text-sm font-semibold text-primary">{hi}</p>
      </div>
      {tightAside && aside}
    </div>
    {!tightAside && aside}
  </div>
);

const baseCard =
  "group relative gap-0 border border-line/45 bg-gradient-to-br from-surface/90 to-surface-sunk/65 px-5 py-5 sm:px-6 sm:py-6 backdrop-blur-lg transition-all duration-500 rounded-[2rem] shadow-[0_12px_36px_rgba(0,0,0,0.015)]";

const cardGreen =
  `${baseCard} hover:border-primary/35 hover:shadow-[0_30px_60px_-25px_var(--glow-green)]`;

const cardGold =
  `${baseCard} hover:border-gold-strong/40 hover:shadow-[0_30px_60px_-25px_var(--glow-gold)]`;

const G = {
  green: "linear-gradient(135deg, var(--color-primary), var(--color-gold-strong))",
  gold: "linear-gradient(135deg, var(--color-gold), var(--color-ochre))",
  route: "linear-gradient(135deg, var(--color-primary-deep), var(--color-primary))",
  ledger: "linear-gradient(135deg, var(--color-ochre), var(--color-primary))",
  id: "linear-gradient(135deg, var(--color-primary), var(--color-gold))",
};

const TiltCard = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  const ref = use3DTilt<HTMLDivElement>(5, 1.015);
  return (
    <Card ref={ref} className={className} id={id}>
      {children}
    </Card>
  );
};

const Pillars = () => {
  const [isPlayingWeather, setIsPlayingWeather] = useState(false);
  const [calcCrop, setCalcCrop] = useState("Wheat");
  const [calcWeight, setCalcWeight] = useState("");

  const cropPrices: { [key: string]: number } = {
    Wheat: 2425,
    Mustard: 5650,
    Bajra: 2500,
  };

  const getEstimatedValue = () => {
    const qty = parseFloat(calcWeight);
    if (isNaN(qty) || qty <= 0) return 0;
    return qty * cropPrices[calcCrop];
  };

  const speakWeather = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("आपके ब्राउज़र में आवाज की सुविधा उपलब्ध नहीं है।");
      return;
    }

    if (isPlayingWeather) {
      window.speechSynthesis.cancel();
      setIsPlayingWeather(false);
      return;
    }

    const textToSpeak = `${weather.conditionHi}। ${weather.advisoryHi}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "hi-IN";
    utterance.onend = () => setIsPlayingWeather(false);
    utterance.onerror = () => setIsPlayingWeather(false);

    setIsPlayingWeather(true);
    window.speechSynthesis.speak(utterance);
  };

  const [votes, setVotes] = useState<{ [key: number]: { agree: number; disagree: number; voted?: "agree" | "disagree" } }>({
    0: { agree: 14, disagree: 2 },
    1: { agree: 8, disagree: 1 },
    2: { agree: 22, disagree: 0 },
  });

  const handleVote = (idx: number, type: "agree" | "disagree") => {
    setVotes((prev) => {
      const current = prev[idx] || { agree: 0, disagree: 0 };
      if (current.voted) {
        if (current.voted === type) return prev;
        return {
          ...prev,
          [idx]: {
            agree: type === "agree" ? current.agree + 1 : current.agree - 1,
            disagree: type === "disagree" ? current.disagree + 1 : current.disagree - 1,
            voted: type,
          }
        };
      }
      return {
        ...prev,
        [idx]: {
          ...current,
          agree: type === "agree" ? current.agree + 1 : current.agree,
          disagree: type === "disagree" ? current.disagree + 1 : current.disagree,
          voted: type,
        }
      };
    });
  };

  return (
    <section
      id="pillars"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-24 overflow-hidden"
    >
      {/* Ambient background orbs for deep visual appeal */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full opacity-35 dark:opacity-20 blur-[130px]"
        style={{
          background: "radial-gradient(closest-side, var(--color-primary), transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-1/4 translate-x-1/2 translate-y-1/2 h-[34rem] w-[34rem] rounded-full opacity-25 dark:opacity-15 blur-[140px]"
        style={{
          background: "radial-gradient(closest-side, var(--color-gold), transparent 80%)",
        }}
      />

      <div className="max-w-2xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-soft/60 border border-primary/10 text-xs font-bold text-primary mb-3">
          सशक्त ग्रामीण जीवन · Supporting Rural Life
        </div>
        <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold tracking-[-0.025em] text-ink-strong leading-tight">
          Five Pillars Holding Up the Village.
        </h2>
        <p className="mt-3 text-lg text-ink-soft">
          गाँव के पाँच स्तंभ, हर एक जीवंत, पारदर्शी और एक टैप दूर।
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 relative z-10">
        {/* ── Agriculture · किसान समृद्धि ─────────────────── */}
        <TiltCard className={`${cardGreen} lg:col-span-7`} id="agriculture">
          <PillarHead
            Icon={Sprout}
            gradient={G.green}
            title="Agriculture & Farmers"
            hi="किसान समृद्धि"
          />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-line/30 bg-surface-sunk/40 p-4 flex flex-col justify-between hover:bg-surface-sunk/65 hover:border-line/65 transition-colors duration-300">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink-soft uppercase tracking-wider">मौसम · Today</span>
                  <Sun className="h-6 w-6 text-gold-strong animate-spin" style={{ animationDuration: "25s" }} />
                </div>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="font-display text-4xl font-extrabold tracking-tight text-ink-strong">
                    {weather.tempC}
                  </span>
                  <span className="text-xl font-bold text-ink-soft">°C</span>
                </div>
                <p className="text-sm font-semibold text-ink-strong mt-1">
                  {weather.condition} · {weather.conditionHi}
                </p>
                <p className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-primary bg-primary-soft/50 px-2.5 py-1 rounded-lg w-fit">
                  <Droplets className="h-3.5 w-3.5" />
                  वर्षा की संभावना: {weather.rainChance}
                </p>
              </div>
              <div className="mt-4 pt-3.5 border-t border-line/25 flex flex-col gap-2.5">
                <p className="text-[0.78rem] leading-relaxed text-ink-soft">
                  {weather.advisoryHi}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={speakWeather}
                    className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer w-fit active:scale-95 ${isPlayingWeather
                      ? "bg-gold-soft border-gold-strong text-ochre shadow-sm"
                      : "bg-surface border-line text-primary hover:border-primary hover:bg-primary-soft"
                      }`}
                    title="आवाज में सुनें (Listen in Hindi)"
                  >
                    <Volume2 className="h-3.5 w-3.5 shrink-0" />
                    {isPlayingWeather ? "रोकें (Stop)" : "आवाज में सुनें (Listen)"}
                  </button>
                  {isPlayingWeather && (
                    <div className="flex items-end gap-0.5 h-3 px-1 ml-1 shrink-0">
                      <span className="w-0.5 h-full bg-ochre rounded-full animate-soundwave" style={{ animationDelay: "0.1s", transformOrigin: "bottom" }} />
                      <span className="w-0.5 h-full bg-ochre rounded-full animate-soundwave" style={{ animationDelay: "0.3s", transformOrigin: "bottom" }} />
                      <span className="w-0.5 h-full bg-ochre rounded-full animate-soundwave" style={{ animationDelay: "0.2s", transformOrigin: "bottom" }} />
                      <span className="w-0.5 h-full bg-ochre rounded-full animate-soundwave" style={{ animationDelay: "0.4s", transformOrigin: "bottom" }} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-line/30 bg-surface-sunk/40 p-4 flex flex-col justify-between hover:bg-surface-sunk/65 hover:border-line/65 transition-colors duration-300">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-ink-soft uppercase tracking-wider">मंडी भाव · Mandi</span>
                  <Wheat className="h-5 w-5 text-ochre" />
                </div>
                {/* Last updated pulse */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  <span className="text-[0.65rem] text-primary font-semibold">12 मिनट पहले अपडेट · Updated 12 min ago</span>
                </div>
                <ul className="space-y-2">
                  {mandiPrices.map((m) => (
                    <li key={m.crop} className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl bg-surface/35 border border-line/20 hover:bg-surface/75 hover:border-line/45 transition-colors duration-200">
                      <span className="text-xs font-bold text-ink-strong">
                        {m.hi}
                        <span className="text-[0.7rem] font-normal text-ink-soft block sm:inline sm:ml-1 sm:before:content-['·_']">
                          {m.crop}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="font-display text-xs font-bold text-ink-strong">
                          {m.price}
                        </span>
                        <span
                          className={`inline-flex items-center gap-0.5 rounded-lg px-1.5 py-0.5 text-[0.65rem] font-bold ${m.trend === "up"
                            ? "bg-primary-soft text-primary"
                            : m.trend === "down"
                              ? "bg-gold-soft text-ochre"
                              : "bg-surface text-ink-soft"
                            }`}
                        >
                          {m.trend === "up" && <TrendingUp className="h-3 w-3" />}
                          {m.delta}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-line/25">
                <span className="block text-[0.7rem] font-bold text-ink-soft uppercase tracking-wider mb-2">
                  फसल मूल्य कैलकुलेटर · Harvest Calculator
                </span>
                <div className="flex items-center gap-2">
                  <select
                    value={calcCrop}
                    onChange={(e) => setCalcCrop(e.target.value)}
                    className="bg-surface border border-line rounded-lg px-2 py-1.5 text-xs text-ink-strong focus:outline-none focus:border-primary cursor-pointer transition-colors duration-200"
                  >
                    <option value="Wheat">गेहूँ (Wheat)</option>
                    <option value="Mustard">सरसों (Mustard)</option>
                    <option value="Bajra">बाजरा (Bajra)</option>
                  </select>
                  <input
                    type="number"
                    placeholder="वजन (quintal)"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(e.target.value)}
                    className="bg-surface border border-line rounded-lg px-2.5 py-1.5 text-xs text-ink-strong w-28 focus:outline-none focus:border-primary transition-colors duration-200"
                  />
                </div>
                {getEstimatedValue() > 0 && (
                  <div className="mt-3 flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-primary-soft/50 border border-primary/15 w-fit animate-rise">
                    <span className="text-[0.7rem] font-bold text-primary">अनुमानित दाम:</span>
                    <span className="font-display text-sm font-extrabold text-primary">
                      ₹{getEstimatedValue().toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TiltCard>

        {/* ── Education · विद्या दीप ───────────────────────── */}
        <TiltCard className={`${cardGold} lg:col-span-5`} id="education">
          <PillarHead
            Icon={GraduationCap}
            gradient={G.gold}
            title="Education"
            hi="विद्या दीप"
          />
          <div className="mt-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-ink-strong">डिजिटल साक्षरता दर</span>
              <span className="font-display text-2xl font-extrabold text-ink-strong">
                {education.literacy}%
              </span>
            </div>
            <div className="mt-2.5 h-3 w-full overflow-hidden rounded-full bg-surface-sunk relative">
              <div
                className="grow-bar h-full rounded-full relative overflow-hidden"
                style={{
                  width: `${education.literacy}%`,
                  backgroundImage:
                    "linear-gradient(90deg, var(--color-primary), var(--color-gold-strong))",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[200%] h-full animate-shimmer" />
              </div>
            </div>

            <p className="mt-6 flex items-center gap-1.5 text-xs font-bold text-ink-soft uppercase tracking-wider">
              <BookOpen className="h-4 w-4 text-primary" />
              सामुदायिक कार्यशालाएँ · Workshops
            </p>
            <ul className="mt-3 space-y-2.5">
              {workshops.map((w) => (
                <li
                  key={w.title}
                  className="group/item flex items-center justify-between gap-3 rounded-xl bg-surface-sunk/60 hover:bg-surface-sunk border-l-[3px] border-transparent hover:border-gold-strong px-3.5 py-3 transition-all duration-300 hover:translate-x-1 cursor-pointer"
                >
                  <span className="text-sm font-semibold text-ink group-hover/item:text-ink-strong transition-colors">{w.title}</span>
                  <span className="flex shrink-0 items-center gap-1 text-[0.7rem] font-bold text-ink-soft">
                    <Calendar className="h-3.5 w-3.5 text-gold-strong/70" />
                    {w.when}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </TiltCard>

        {/* ── Infrastructure · विकास की रफ़्तार ──────────────── */}
        <TiltCard className={`${cardGreen} lg:col-span-7`} id="infrastructure">
          <PillarHead
            Icon={Route}
            gradient={G.route}
            title="Gram Vikas & Infrastructure"
            hi="विकास की रफ़्तार"
            tightAside
            aside={
              <Badge className="hidden rounded-lg bg-primary-soft/80 border border-primary/10 text-[0.7rem] font-bold text-primary sm:inline-flex">
                live timeline
              </Badge>
            }
          />
          <ol className="relative mt-6 space-y-6 pl-5">
            <span
              aria-hidden
              className="absolute left-[7px] top-2 bottom-2 w-px bg-line"
            />
            {projects.map((p) => {
              const done = p.pct === 100;
              return (
                <li key={p.name} className="relative group/timeline">
                  <span
                    aria-hidden
                    className={`absolute -left-[18px] top-[6px] h-2.5 w-2.5 rounded-full border-2 border-surface transition-colors duration-300 ${done ? "bg-primary" : "bg-line-strong"
                      }`}
                  />
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-bold text-ink group-hover/timeline:text-ink-strong transition-colors">
                      {p.hi}
                      <span className="font-normal text-ink-soft block sm:inline sm:ml-1 sm:before:content-['·_'] text-xs">
                        {p.name}
                      </span>
                    </span>
                    <span
                      className={`flex shrink-0 items-center gap-1 font-display font-extrabold text-xs ${done ? "text-primary" : "text-gold-strong"
                        }`}
                    >
                      {done && <Check className="h-3.5 w-3.5 stroke-[3.5px] animate-pulse" />}
                      {p.pct}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-sunk relative">
                    <div
                      className="grow-bar h-full rounded-full relative overflow-hidden"
                      style={{
                        width: `${p.pct}%`,
                        backgroundImage: done
                          ? "linear-gradient(90deg, var(--color-primary-deep), var(--color-primary))"
                          : "linear-gradient(90deg, var(--color-gold-strong), var(--color-gold))",
                      }}
                    >
                      {!done && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[200%] h-full animate-shimmer" />
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </TiltCard>

        {/* ── Panchayat Digital Ledger · पंचायत बही-खाता ────── */}
        <TiltCard className={`${cardGold} lg:col-span-5`} id="panchayat">
          <PillarHead
            Icon={ScrollText}
            gradient={G.ledger}
            title="Panchayat Digital Ledger"
            hi="पंचायत बही-खाता"
          />
          <p className="mt-5 text-xs font-bold text-ink-soft uppercase tracking-wider">
            हाल के निर्णय · Recent Decisions
          </p>
          <ul className="mt-3 space-y-3">
            {ledger.map((d, idx) => {
              const voteData = votes[idx] || { agree: 0, disagree: 0 };
              return (
                <li
                  key={d.decision}
                  className="rounded-2xl border border-line/45 bg-surface-sunk/35 hover:bg-surface-sunk/65 transition-all duration-300 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-bold text-ink-strong leading-snug">{d.decision}</p>
                    <Badge className="shrink-0 gap-1 rounded-lg bg-primary-soft/80 border border-primary/10 px-2 py-0.5 text-[0.65rem] font-bold text-primary">
                      <Users className="h-3 w-3" />
                      {d.vote}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink-soft">{d.detail}</p>

                  {/* Community Mock Poll feedback */}
                  <div className="mt-4 pt-3 border-t border-line/20 flex items-center justify-between text-[0.72rem] text-ink-soft">
                    <span className="font-bold">सहमति मत (Do you agree?)</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVote(idx, "agree")}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${voteData.voted === "agree"
                          ? "bg-primary border-primary text-white shadow-sm"
                          : "bg-surface border-line text-ink-soft hover:text-primary hover:border-primary/50"
                          }`}
                      >
                        👍 {voteData.agree}
                      </button>
                      <button
                        onClick={() => handleVote(idx, "disagree")}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${voteData.voted === "disagree"
                          ? "bg-gold-strong border-gold-strong text-white shadow-sm"
                          : "bg-surface border-line text-ink-soft hover:text-ochre hover:border-gold-strong/50"
                          }`}
                      >
                        👎 {voteData.disagree}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </TiltCard>

        {/* ── Digital Identity · डिजिटल पहचान ────────────────── */}
        <TiltCard className={`${cardGreen} lg:col-span-12`} id="identity">
          <PillarHead
            Icon={Fingerprint}
            gradient={G.id}
            title="Digital Identity"
            hi="डिजिटल पहचान"
            aside={
              <p className="hidden text-sm font-semibold text-ink-soft sm:block">
                प्रमाण पत्र, रिकॉर्ड व पंजीकरण — एक टैप में
              </p>
            }
          />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {idServices.map((s) => (
              <li key={s.label}>
                <a
                  href="#support"
                  className="group/link flex h-full items-center justify-between gap-3 rounded-2xl bg-surface-sunk/50 hover:bg-primary border border-line/25 hover:border-primary px-4 py-4 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_12px_24px_-10px_var(--glow-green)]"
                >
                  <span>
                    <span className="block text-sm font-bold text-ink-strong group-hover/link:text-on-primary transition-colors">
                      {s.hi}
                    </span>
                    <span className="block text-[0.8rem] text-ink-soft group-hover/link:text-on-primary/80 transition-colors mt-0.5">
                      {s.label}
                    </span>
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface/50 group-hover/link:bg-white/10 transition-colors shrink-0">
                    <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover/link:translate-x-0.5 group-hover/link:text-on-primary" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </TiltCard>

        {/* ── Festival Countdown · आगामी कार्यक्रम ────────────────── */}
        <div className="lg:col-span-12">
          <div className="max-w-md">
            <FestivalCountdown />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pillars;
