import {
  AlertIcon,
  ChevronRightIcon,
  LandmarkIcon,
  PhoneIcon,
  WhatsappIcon,
} from "./icons";
import { support } from "@/lib/content";
import GrievanceTracker from "./GrievanceTracker";

const telHref = (n: string) => `tel:${n.replace(/[^0-9+]/g, "")}`;
const waHref = (n: string) => `https://wa.me/${n.replace(/[^0-9]/g, "")}`;

const ActionBand = () => (
  <section
    id="support"
    className="relative scroll-mt-24 overflow-hidden bg-band py-16 lg:py-24"
  >
    {/* dawn glow over the dark green field */}
    <div
      aria-hidden
      className="pointer-events-none absolute -right-20 -top-24 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl"
      style={{
        background:
          "radial-gradient(closest-side, var(--color-gold), transparent 70%)",
      }}
    />

    <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
      {/* CTA */}
      <div>
        <p className="text-base font-semibold text-gold">
          सीधी कार्रवाई · Direct action
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-on-band">
          Something needs fixing? Fix it in two taps.
        </h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-on-band/75">
          A broken hand-pump, an unlit street, a pending certificate — tell the
          Panchayat directly. No queue, no paperwork, no waiting for office hours.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#"
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-2xl bg-gold px-6 text-base font-bold text-on-gold shadow-lg transition-transform hover:bg-gold-strong active:scale-[0.98]"
          >
            <AlertIcon className="h-5 w-5" />
            Report an issue
          </a>
          <a
            href={telHref(support.panchayatPhone)}
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-6 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/12"
          >
            <LandmarkIcon className="h-5 w-5" />
            Contact Panchayat
          </a>
        </div>
      </div>

      {/* Grievance tracker + Support widget */}
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl bg-surface p-5 shadow-2xl sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-ink-strong">
              Emergency & support
            </h3>
            <span className="text-sm font-medium text-primary">आपातकालीन सहायता</span>
          </div>

          <div className="mt-4 grid gap-3">
            {/* WhatsApp */}
            <a
              href={waHref(support.whatsapp)}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-3.5 transition-colors hover:border-primary/40 hover:bg-primary-soft"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-on-primary">
                <WhatsappIcon className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink-strong">
                  WhatsApp the Panchayat
                </span>
                <span className="block text-sm text-ink-soft">
                  व्हाट्सएप · {support.whatsapp}
                </span>
              </span>
              <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>

            {/* Helpline */}
            <a
              href={telHref(support.helpline)}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-3.5 transition-colors hover:border-primary/40 hover:bg-primary-soft"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-soft text-ochre">
                <PhoneIcon className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink-strong">
                  Citizen helpline
                </span>
                <span className="block text-sm text-ink-soft">
                  हेल्पलाइन · {support.helpline}
                </span>
              </span>
              <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>

            {/* Emergency */}
            <a
              href={telHref(support.emergency)}
              className="group flex items-center gap-4 rounded-2xl border border-danger/25 bg-danger-soft p-3.5 transition-colors hover:border-danger/50"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-danger text-white">
                <AlertIcon className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-danger">
                  Emergency services
                </span>
                <span className="block text-sm text-ink">
                  आपातकाल · Dial {support.emergency}
                </span>
              </span>
              <span className="font-display text-2xl font-bold text-danger">
                {support.emergency}
              </span>
            </a>
          </div>

          <p className="mt-4 text-center text-xs text-ink-soft">
            24×7 · हर दिन, हर समय आपके साथ
          </p>
        </div>

        {/* Grievance Tracker */}
        <GrievanceTracker />
      </div>
    </div>
  </section>
);

export default ActionBand;
