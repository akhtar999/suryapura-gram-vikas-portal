import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps): IconProps => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const SproutIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 21v-7" />
    <path d="M12 14c0-3-2-5-6-5 0 3 2.5 5 6 5Z" />
    <path d="M12 12c0-3.2 2.2-5.6 6.5-5.6C18.5 9.8 16 12 12 12Z" />
  </svg>
);

export const BookIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 6.5C10.4 5.3 8.4 5 6 5a2 2 0 0 0-2 2v9.5a1.5 1.5 0 0 0 1.5 1.5c2.2 0 4.1.3 6.5 1.5" />
    <path d="M12 6.5C13.6 5.3 15.6 5 18 5a2 2 0 0 1 2 2v9.5a1.5 1.5 0 0 1-1.5 1.5c-2.2 0-4.1.3-6.5 1.5" />
    <path d="M12 6.5V20" />
  </svg>
);

export const RoadIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M8 4 4 20" />
    <path d="m16 4 4 16" />
    <path d="M12 4v2.5" />
    <path d="M12 11v2.5" />
    <path d="M12 17.5V20" />
  </svg>
);

export const LandmarkIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m4 9 8-5 8 5" />
    <path d="M4 9.5h16" />
    <path d="M6 9.5V18M10 9.5V18M14 9.5V18M18 9.5V18" />
    <path d="M3.5 18h17" />
  </svg>
);

export const IdCardIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="5" width="18" height="14" rx="2.4" />
    <circle cx="8.5" cy="11" r="2" />
    <path d="M5.5 16c.4-1.6 1.6-2.5 3-2.5s2.6.9 3 2.5" />
    <path d="M14.5 9.5H19M14.5 12.5H19M14.5 15.5h3" />
  </svg>
);

export const MicIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M6 11a6 6 0 0 0 12 0" />
    <path d="M12 17v4" />
    <path d="M9 21h6" />
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);

export const PhoneIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6.5 4h2.6l1.3 3.3-1.7 1.3a11 11 0 0 0 5.4 5.4l1.3-1.7L19 13.6V16a2 2 0 0 1-2.2 2A14 14 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
  </svg>
);

export const WhatsappIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 19l1.1-3.3A7.5 7.5 0 1 1 9 18.4L5 19Z" />
    <path d="M9.2 8.6c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.6 1.4c.1.2 0 .4-.1.6l-.4.5c-.1.2-.2.3 0 .6a5 5 0 0 0 2.3 2c.3.1.4 0 .6-.1l.6-.7c.2-.2.3-.2.6-.1l1.4.7c.3.1.4.2.4.4 0 .5-.2 1.2-.6 1.4-.5.3-1.2.5-2.6 0a7.3 7.3 0 0 1-4.4-4.4c-.3-.9-.2-1.6-.2-1.7Z" />
  </svg>
);

export const AlertIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 4.5 21 19.5H3L12 4.5Z" />
    <path d="M12 10v4" />
    <path d="M12 16.8h.01" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ChevronRightIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const WheatIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 21V9" />
    <path d="M12 9c0-2 1-3.2 3-3.2C15 7.8 14 9 12 9Z" />
    <path d="M12 9c0-2-1-3.2-3-3.2C9 7.8 10 9 12 9Z" />
    <path d="M12 14c0-1.8 1-3 3-3 0 1.8-1 3-3 3Z" />
    <path d="M12 14c0-1.8-1-3-3-3 0 1.8 1 3 3 3Z" />
  </svg>
);

export const SunIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
  </svg>
);

export const BellIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const CalendarIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="4" y="5.5" width="16" height="15" rx="2.2" />
    <path d="M4 9.5h16M8 3.5v3M16 3.5v3" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const MapPinIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 21s6.5-5.4 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.4" />
  </svg>
);

export const DropletIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 3.5c3 3.6 5.5 6.6 5.5 9.6a5.5 5.5 0 0 1-11 0c0-3 2.5-6 5.5-9.6Z" />
  </svg>
);

export const TrendUpIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m4 16 5-5 3 3 7-7" />
    <path d="M16 7h4v4" />
  </svg>
);
