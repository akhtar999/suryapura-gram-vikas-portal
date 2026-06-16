import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Mukta } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Suryapura Gram Vikas Portal — सूर्यपुरा ग्राम विकास पोर्टल",
  description:
    "प्रगति का नया सवेरा, परंपरा के संग — live mandi prices, weather, school progress, the Digital Chaupal notice board, village voices, and one-tap support, in a warm eye-care theme.",
  keywords: [
    "Suryapura",
    "Gram Vikas",
    "rural development",
    "panchayat",
    "mandi prices",
    "digital chaupal",
  ],
  openGraph: {
    title: "Suryapura Gram Vikas Portal",
    description:
      "प्रगति का नया सवेरा, परंपरा के संग — a warm, emotional front door to your village's progress.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1A12" },
  ],
  width: "device-width",
  initialScale: 1,
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html
    lang="hi"
    suppressHydrationWarning
    className={`${bricolage.variable} ${mukta.variable} h-full antialiased`}
  >
    <body className="min-h-full">
      {/* Seasonal tint — set before paint to avoid flash */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var m=new Date().getMonth();var s=m>=5&&m<=8?"season-monsoon":m>=9||m<=1?"season-rabi":"season-harvest";document.documentElement.classList.add(s)})()`,
        }}
      />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <TooltipProvider delay={150}>{children}</TooltipProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
