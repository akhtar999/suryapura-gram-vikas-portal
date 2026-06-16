"use client";

import { useEffect, useState } from "react";
import { PhoneIcon, WhatsappIcon } from "./icons";
import { support } from "@/lib/content";

const telHref = (n: string) => `tel:${n.replace(/[^0-9+]/g, "")}`;
const waHref = (n: string) => `https://wa.me/${n.replace(/[^0-9]/g, "")}`;

const QuickContact = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-[80] hidden flex-col items-end gap-3 transition-all duration-500 sm:flex ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <a
        href={waHref(support.whatsapp)}
        aria-label={`WhatsApp support — ${support.whatsapp}`}
        className="group inline-flex h-14 items-center gap-3 rounded-2xl pr-2 pl-2 text-on-primary shadow-[0_16px_36px_-14px_var(--glow-green)] transition-transform hover:scale-[1.03] active:scale-95 sm:pr-5"
        style={{
          backgroundImage:
            "linear-gradient(135deg, var(--color-primary), var(--color-primary-deep))",
        }}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <WhatsappIcon className="h-6 w-6" />
        </span>
        <span className="hidden pr-1 text-sm font-semibold sm:flex sm:flex-col sm:leading-tight">
          WhatsApp
          <span className="text-[0.7rem] font-medium opacity-80">सहायता</span>
        </span>
      </a>

      <a
        href={telHref(support.emergency)}
        aria-label={`Emergency — dial ${support.emergency}`}
        className="group inline-flex h-14 items-center gap-3 rounded-2xl bg-danger pr-2 pl-2 text-white shadow-[0_16px_36px_-14px_oklch(0.55_0.19_27/0.7)] transition-transform hover:scale-[1.03] active:scale-95 sm:pr-5"
      >
        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-xl bg-white/20" />
          <PhoneIcon className="relative h-5 w-5" />
        </span>
        <span className="hidden pr-1 text-sm font-semibold sm:flex sm:flex-col sm:leading-tight">
          Emergency
          <span className="text-[0.7rem] font-medium opacity-90">आपातकाल · {support.emergency}</span>
        </span>
      </a>
    </div>
  );
};

export default QuickContact;
