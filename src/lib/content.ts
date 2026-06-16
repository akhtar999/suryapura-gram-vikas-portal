/**
 * Static demo content for the Suryapura Gram Vikas Portal.
 * Bilingual (Devanagari + Latin). Values are illustrative demo data.
 */

export type NavItem = { label: string; hi: string; href: string };

export const navItems: NavItem[] = [
  { label: "Pillars", hi: "स्तंभ", href: "#pillars" },
  { label: "Progress", hi: "प्रगति", href: "#infrastructure" },
  { label: "Panchayat", hi: "पंचायत", href: "#panchayat" },
  { label: "Support", hi: "सहायता", href: "#support" },
];

export const leader = {
  name: "Smt. Kamla Devi Rathore",
  nameHi: "श्रीमती कमला देवी राठौड़",
  role: "Development Ambassador · Sarpanch, Suryapura",
  roleHi: "विकास दूत · सरपंच, सूर्यपुरा",
  quote:
    "When a farmer can check tomorrow's mandi price from her own courtyard, the village has already changed. The sun was always ours. Now the light reaches every home.",
  quoteHi: "जब हर घर तक रोशनी पहुँचे, तभी असली विकास है।",
  avatar:
    "https://images.unsplash.com/photo-1670110531916-41045e83cb0a?auto=format&fit=crop&w=320&q=75",
  avatarAlt:
    "Smt. Kamla Devi Rathore, Sarpanch of Suryapura, looking to camera in warm daylight",
};

export const heroImage = {
  src: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=1400&q=78",
  alt: "A woman harvesting a sunlit green paddy field at dawn in rural India",
};

export const trustStats: { value: string; label: string; hi: string }[] = [
  { value: "1,840", label: "households connected", hi: "घर जुड़े" },
  { value: "12", label: "schemes live", hi: "योजनाएँ सक्रिय" },
  { value: "94%", label: "digital ID coverage", hi: "डिजिटल पहचान" },
];

/* ---- Pillar: Agriculture ---- */
export const mandiPrices: {
  crop: string;
  hi: string;
  price: string;
  trend: "up" | "down" | "flat";
  delta: string;
}[] = [
    { crop: "Wheat", hi: "गेहूँ", price: "₹2,425/q", trend: "up", delta: "+3.1%" },
    { crop: "Mustard", hi: "सरसों", price: "₹5,650/q", trend: "up", delta: "+1.4%" },
    { crop: "Bajra", hi: "बाजरा", price: "₹2,500/q", trend: "flat", delta: "0.0%" },
  ];

export const weather = {
  tempC: 31,
  condition: "Clear morning",
  conditionHi: "साफ़ सवेरा",
  rainChance: "10%",
  advisory: "Good window for mustard sowing this week.",
  advisoryHi: "इस सप्ताह सरसों बुवाई के लिए अनुकूल।",
};

/* ---- Pillar: Infrastructure ---- */
export const projects: { name: string; hi: string; pct: number; status: string }[] = [
  { name: "Main Road Paving", hi: "मुख्य सड़क निर्माण", pct: 85, status: "On track" },
  { name: "Solar Street Lights", hi: "सोलर स्ट्रीट लाइट", pct: 62, status: "In progress" },
  { name: "Canal Lining", hi: "नहर लाइनिंग", pct: 40, status: "In progress" },
  { name: "Community Water Tank", hi: "सामुदायिक जल टंकी", pct: 100, status: "Completed" },
];

/* ---- Pillar: Education ---- */
export const education = {
  literacy: 78,
  smartClasses: 6,
  enrolled: "512 students",
  enrolledHi: "512 विद्यार्थी",
  note: "Digital literacy camp every Saturday at the Panchayat Bhawan.",
  noteHi: "हर शनिवार पंचायत भवन में डिजिटल साक्षरता शिविर।",
};

/* ---- Pillar: Panchayat ---- */
export const notices: { title: string; hi: string; date: string; tag: string }[] = [
  {
    title: "Gram Sabha meeting — new water budget",
    hi: "ग्राम सभा बैठक — नया जल बजट",
    date: "18 Jun",
    tag: "Meeting",
  },
  {
    title: "Ujjwala LPG refill camp",
    hi: "उज्ज्वला गैस रिफिल शिविर",
    date: "21 Jun",
    tag: "Scheme",
  },
  {
    title: "Crop insurance enrolment closes",
    hi: "फसल बीमा पंजीकरण अंतिम तिथि",
    date: "25 Jun",
    tag: "Deadline",
  },
];

/* ---- Pillar: Digital Identity ---- */
export const idServices: { label: string; hi: string }[] = [
  { label: "Income & caste certificate", hi: "आय / जाति प्रमाण पत्र" },
  { label: "Land record (Jamabandi)", hi: "भूमि रिकॉर्ड (जमाबंदी)" },
  { label: "Village directory", hi: "गाँव निर्देशिका" },
  { label: "New scheme registration", hi: "नई योजना पंजीकरण" },
];

/* ---- Education: community library workshops ---- */
export const workshops: { title: string; when: string }[] = [
  { title: "डिजिटल साक्षरता शिविर", when: "हर शनिवार · 4 बजे" },
  { title: "बाल पुस्तकालय — कहानी सत्र", when: "रविवार · 11 बजे" },
  { title: "महिला स्मार्टफ़ोन कक्षा", when: "मंगलवार · 5 बजे" },
];

/* ---- Panchayat Digital Ledger: recent decisions ---- */
export const ledger: { decision: string; detail: string; vote: string }[] = [
  {
    decision: "जल बजट स्वीकृत",
    detail: "₹2.4 लाख — नई पाइपलाइन व टंकी",
    vote: "सर्वसम्मति",
  },
  {
    decision: "नई आंगनबाड़ी हेतु भूमि",
    detail: "वार्ड 4 में 0.2 हेक्टेयर आवंटित",
    vote: "7 / 0 मत",
  },
  {
    decision: "मनरेगा तालाब गहरीकरण",
    detail: "120 श्रमिकों को रोज़गार",
    vote: "सर्वसम्मति",
  },
];

/* ---- Digital Chaupal: live community micro-updates ---- */
export const chaupal: { text: string; ago: string; tag: string }[] = [
  {
    text: "रामेश्वर जी के खेत में नया सोलर पंप चालू हुआ।",
    ago: "10 मिनट पहले",
    tag: "कृषि",
  },
  {
    text: "आज दूध संग्रह केंद्र पर 412 लीटर दूध जमा हुआ।",
    ago: "1 घंटा पहले",
    tag: "डेयरी",
  },
  {
    text: "नई गली में स्ट्रीट लाइट लग गई, धन्यवाद पंचायत!",
    ago: "3 घंटे पहले",
    tag: "विकास",
  },
  {
    text: "कल सुबह 10 बजे पंचायत भवन में ग्राम सभा।",
    ago: "आज",
    tag: "सूचना",
  },
];

/* ---- Testimonials: voices of the village (ग्रामीणों के विचार) ---- */
export const testimonials: {
  quote: string;
  name: string;
  role: string;
  initial: string;
  accent: "green" | "gold";
}[] = [
    {
      quote:
        "अब मंडी का भाव जानने के लिए शहर नहीं जाना पड़ता, सब कुछ मोबाइल पर ही मिल जाता है।",
      name: "रामशरण यादव",
      role: "प्रगतिशील किसान",
      initial: "रा",
      accent: "green",
    },
    {
      quote:
        "डिजिटल चौपाल की वजह से हमारी पंचायत में पूरी पारदर्शिता आ गई है।",
      name: "सुनीता देवी",
      role: "गृहणी एवं समाज सेविका",
      initial: "सु",
      accent: "gold",
    },
    {
      quote:
        "रात में आंखों की सुरक्षा वाला मोड लगाकर बच्चे आराम से पढ़ाई की जानकारी देखते हैं।",
      name: "मोहनलाल गुर्जर",
      role: "अभिभावक",
      initial: "मो",
      accent: "green",
    },
    {
      quote:
        "महिला स्मार्टफ़ोन कक्षा के बाद मैंने खुद अपना राशन कार्ड ऑनलाइन देखा।",
      name: "गीता बाई",
      role: "स्वयं सहायता समूह",
      initial: "गी",
      accent: "gold",
    },
    {
      quote:
        "सड़क का काम कहाँ तक पहुँचा, अब यह सब गाँव में बैठे-बैठे पता चल जाता है।",
      name: "बंशीधर शर्मा",
      role: "सेवानिवृत्त शिक्षक",
      initial: "बं",
      accent: "green",
    },
    {
      quote:
        "आपातकाल में एक टैप से एम्बुलेंस बुलाई — यह पोर्टल सच में हमारा साथी है।",
      name: "कैलाश मीना",
      role: "युवा स्वयंसेवक",
      initial: "कै",
      accent: "gold",
    },
  ];

/* ---- Support ---- */
export const support = {
  helpline: "1800-180-6127",
  whatsapp: "+91 90000 12345",
  panchayatPhone: "+91 90000 67890",
  emergency: "112",
};
