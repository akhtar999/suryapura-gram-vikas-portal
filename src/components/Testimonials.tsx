"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "डिजिटल चौपाल की वजह से हमारी पंचायत में पूरी पारदर्शिता आ गई है।",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "सुनीता देवी",
    role: "गृहणी एवं समाज सेविका",
  },
  {
    text: "अब मंडी का भाव जानने के लिए शहर नहीं जाना पड़ता, सब कुछ मोबाइल पर ही मिल जाता है।",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "रामशरण यादव",
    role: "प्रगतिशील किसान",
  },
  {
    text: "महिला स्मार्टफ़ोन कक्षा के बाद मैंने खुद अपना राशन कार्ड ऑनलाइन देखा।",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "गीता बाई",
    role: "स्वयं सहायता समूह",
  },
  {
    text: "रात में आंखों की सुरक्षा वाला मोड लगाकर बच्चे आराम से पढ़ाई की जानकारी देखते हैं।",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "मोहनलाल गुर्जर",
    role: "अभिभावक",
  },
  {
    text: "सोलर स्ट्रीट लाइट की वजह से अब हमारे बच्चे रात में भी सुरक्षित महसूस करते हैं।",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "कमला राठौड़",
    role: "वार्ड पंच",
  },
  {
    text: "सामुदायिक पुस्तकालय में डिजिटल साक्षरता कक्षाएं हर शनिवार को बहुत फायदेमंद साबित हो रही हैं।",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "सच्ची देवी",
    role: "आंगनबाड़ी कार्यकर्ता",
  },
  {
    text: "सड़क का काम कहाँ तक पहुँचा, अब यह सब गाँव में बैठे-बैठे पता चल जाता है।",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "बंशीधर शर्मा",
    role: "सेवानिवृत्त शिक्षक",
  },
  {
    text: "पोर्टल पर परीक्षा की जानकारी और स्कॉलरशिप फॉर्म भरने की तारीखें समय पर मिल जाती हैं।",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "संजू गुर्जर",
    role: "स्वयंसेवी छात्रा",
  },
  {
    text: "आपातकाल में एक टैप से एम्बुलेंस बुलाई — यह पोर्टल सच में हमारा साथी है।",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "कैलाश मीना",
    role: "युवा स्वयंसेवक",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

import { Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative overflow-hidden">
      {/* ambient field of light so the glass has something to blur */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-10 h-72 w-72 -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow-gold), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-10 h-72 w-72 translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow-green), transparent)" }}
      />

      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 mb-12"
        >
          <p className="flex items-center justify-center gap-2 text-base font-semibold text-primary">
            <Quote className="h-5 w-5 text-gold-strong" fill="currentColor" />
            ग्रामीणों के विचार
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold tracking-[-0.02em] text-ink-strong">
            Voices from the courtyard.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-soft">
            असली लोग, असली बदलाव — सूर्यपुरा के अपने शब्दों में।
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
