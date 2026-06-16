type SunMarkProps = {
  className?: string;
  title?: string;
};

/** Saffron sun rising over green field furrows — the recurring brand motif. */
const SunMark = ({ className, title = "Suryapura" }: SunMarkProps) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    role="img"
    aria-label={title}
    fill="none"
  >
    <defs>
      <clipPath id="sunmark-horizon">
        <rect x="0" y="0" width="48" height="29" />
      </clipPath>
    </defs>

    {/* sun + rays, clipped to the sky above the horizon */}
    <g clipPath="url(#sunmark-horizon)">
      <circle cx="24" cy="25" r="8" fill="var(--color-gold)" />
      <g
        stroke="var(--color-gold-strong)"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M24 6.5v4" />
        <path d="M11.5 11.5l2.8 2.8" />
        <path d="M36.5 11.5l-2.8 2.8" />
        <path d="M5.5 24h4" />
        <path d="M38.5 24h4" />
      </g>
    </g>

    {/* horizon + field furrows */}
    <path d="M3 29h42" stroke="var(--color-primary)" strokeWidth="2.4" strokeLinecap="round" />
    <g stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" opacity="0.92">
      <path d="M8 35.5c4-1.6 7-1.6 8-1.6" />
      <path d="M22 33.9c2 0 5 0 9 1.6" />
      <path d="M6 41c6-2.4 10-2.4 12-2.4" />
      <path d="M24 38.6c2.5 0 6.5 0 14 2.4" />
    </g>
  </svg>
);

export default SunMark;
