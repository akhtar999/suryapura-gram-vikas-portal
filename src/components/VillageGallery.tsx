"use client";

import { Gallery6 } from "@/components/ui/gallery6";

const galleryData = {
  heading: "सूर्यपुरा की झलकियाँ · Life in Suryapura",
  eyebrow: "हमारा गाँव",
  items: [
    {
      id: "gallery-1",
      title: "भोर का उजाला · Dawn Over the Fields",
      summary:
        "सुनहरी सुबह, हरे-भरे खेत — यही है सूर्यपुरा की पहचान। किसानों का दिन सूरज के साथ शुरू होता है।",
      url: "#pillars",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=75",
    },
    {
      id: "gallery-2",
      title: "विद्या का दीप · Light of Education",
      summary:
        "हर शनिवार पंचायत भवन में डिजिटल साक्षरता शिविर — बच्चे और बड़े, सब सीख रहे हैं।",
      url: "#education",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=75",
    },
    {
      id: "gallery-3",
      title: "सोलर ऊर्जा · Solar Power",
      summary:
        "सोलर स्ट्रीट लाइट और पंप — गाँव अब ऊर्जा में आत्मनिर्भर बन रहा है।",
      url: "#infrastructure",
      image:
        "https://images.unsplash.com/photo-1509391111256-d961e6d0e990?auto=format&fit=crop&w=900&q=75",
    },
    {
      id: "gallery-4",
      title: "सामुदायिक बैठक · Community Gathering",
      summary:
        "ग्राम सभा में हर आवाज़ सुनी जाती है — पारदर्शिता और भागीदारी, यही लोकतंत्र है।",
      url: "#panchayat",
      image:
        "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=900&q=75",
    },
    {
      id: "gallery-5",
      title: "हरे-भरे खेत · Lush Green Fields",
      summary:
        "सरसों और गेहूँ की फसलें लहलहाती हैं — मंडी भाव अब एक टैप दूर।",
      url: "#agriculture",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=75",
    },
  ],
};

const VillageGallery = () => {
  return <Gallery6 {...galleryData} />;
};

export default VillageGallery;
