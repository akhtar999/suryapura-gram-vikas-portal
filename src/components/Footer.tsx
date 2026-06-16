import SunMark from "./SunMark";
import { MapPinIcon } from "./icons";
import { navItems } from "@/lib/content";

const Footer = () => (
  <footer className="border-t border-line bg-surface-sunk">
    <div className="mx-auto max-w-6xl px-4 py-12 pb-28 sm:px-6 lg:pb-12">
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <SunMark className="h-9 w-9" />
            <span className="font-display text-base font-semibold text-ink-strong">
              Suryapura Gram Vikas Portal
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            सूर्यपुरा ग्राम पंचायत का आधिकारिक डिजिटल पोर्टल। हर घर तक रोशनी,
            हर हाथ में जानकारी।
          </p>
          <p className="mt-4 flex items-center gap-1.5 text-sm text-ink-soft">
            <MapPinIcon className="h-4 w-4 text-primary" />
            Gram Panchayat Suryapura, Tehsil Bhilwara, Rajasthan
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2.5">
          <span className="text-sm font-semibold text-ink-strong">Explore</span>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-primary"
            >
              {item.label} · {item.hi}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:items-center">
        <p>© 2026 Gram Panchayat Suryapura · A digital governance demo.</p>
        <p>Built for the village, in the village&apos;s language.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
