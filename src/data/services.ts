export interface ClinicService {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  image: string;
  isKeyService?: boolean;
}

export const clinicServices: ClinicService[] = [
  {
    id: "dental-implants",
    title: "Dental Implants",
    category: "Restorative Surgery",
    shortDesc: "Permanent, natural-feeling titanium implants to replace missing teeth with lifelong durability.",
    fullDesc: "Our computer-guided implantology ensures sub-millimeter precision, minimal discomfort, and rapid healing for seamless single, multiple, or full-arch restorations.",
    features: ["Titanium Grade V Posts", "Computer-Guided Surgery", "Same-Day Temporary Crowns", "Lifelong Stability"],
    image: "/images/dental-implant-3d.jpg",
    isKeyService: true
  },
  {
    id: "root-canal",
    title: "Root Canal Treatment",
    category: "Endodontics",
    shortDesc: "Gentle microscopic root canal therapy saving infected teeth in single comfortable sessions.",
    fullDesc: "Utilizing rotary endodontic instruments and apex locators to eliminate infection painlessly, preserving your natural tooth structure.",
    features: ["Single-Sitting RCT Available", "Digital Apex Locators", "Virtually Painless Anesthesia", "Crown Fitting"],
    image: "/images/hero-tooth-specialists.jpg"
  },
  {
    id: "braces-aligners",
    title: "Braces & Aligners",
    category: "Orthodontics",
    shortDesc: "Discreet clear aligners and modern ceramic braces to gently align your teeth into harmony.",
    fullDesc: "Custom 3D scanned treatment paths provide predictable tooth movement with nearly invisible aligners or precision ceramic brackets.",
    features: ["Custom 3D Digital Scans", "Invisible Clear Aligners", "Self-Ligating Ceramic Braces", "Teens & Adults"],
    image: "/images/hero-patient.jpg"
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening",
    category: "Cosmetic Dentistry",
    shortDesc: "In-office LED power whitening lifting deep stains by up to 8 shades in just 45 minutes.",
    fullDesc: "Enamel-safe, pH-balanced professional whitening gel activated with cold LED light gives you an instantly radiant smile without tooth sensitivity.",
    features: ["Up to 8 Shades Whiter", "Enamel-Safe Formula", "No Sensitivity Guarantee", "Custom Take-Home Trays"],
    image: "/images/hero-patient.jpg"
  },
  {
    id: "veneers-crowns",
    title: "Veneers & Crowns",
    category: "Aesthetic Restoration",
    shortDesc: "Handcrafted ultra-thin porcelain veneers and zirconia crowns for flawless symmetry.",
    fullDesc: "Custom designed to match your facial profile, correcting gaps, chips, uneven edges, and deep discoloration with lifelike translucency.",
    features: ["E-Max & Zirconia Porcelain", "Natural Light Translucency", "Stain Resistant", "Minimally Invasive"],
    image: "/images/dental-implant-3d.jpg"
  },
  {
    id: "pediatric-general",
    title: "Preventive & Family Care",
    category: "General Dentistry",
    shortDesc: "Comprehensive oral prophylaxis, fissure sealants, and caring pediatric dental visits.",
    fullDesc: "A warm, gentle clinic environment designed to make visits relaxed and positive for children and adults alike.",
    features: ["Gentle Ultrasonic Scaling", "Fluoride Treatments", "Cavity Prevention", "Family Wellness Plans"],
    image: "/images/clinic-treatment-room.jpg"
  }
];
