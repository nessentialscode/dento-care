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
    image: "/images/treatments/dental-implants.jpg",
    isKeyService: true
  },
  {
    id: "root-canal",
    title: "Root Canal Treatment",
    category: "Endodontics",
    shortDesc: "Gentle microscopic root canal therapy saving infected teeth in single comfortable sessions.",
    fullDesc: "Utilizing rotary endodontic instruments and apex locators to eliminate infection painlessly, preserving your natural tooth structure.",
    features: ["Single-Sitting RCT Available", "Digital Apex Locators", "Virtually Painless Anesthesia", "Crown Fitting"],
    image: "/images/treatments/root-canal.jpg"
  },
  {
    id: "braces-aligners",
    title: "Braces & Aligners",
    category: "Orthodontics",
    shortDesc: "Discreet clear aligners and modern ceramic braces to gently align your teeth into harmony.",
    fullDesc: "Custom 3D scanned treatment paths provide predictable tooth movement with nearly invisible aligners or precision ceramic brackets.",
    features: ["Custom 3D Digital Scans", "Invisible Clear Aligners", "Self-Ligating Ceramic Braces", "Teens & Adults"],
    image: "/images/treatments/braces-aligners.jpg"
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening",
    category: "Cosmetic Dentistry",
    shortDesc: "In-office LED power whitening lifting deep stains by up to 8 shades in just 45 minutes.",
    fullDesc: "Enamel-safe, pH-balanced professional whitening gel activated with cold LED light gives you an instantly radiant smile without tooth sensitivity.",
    features: ["Up to 8 Shades Whiter", "Enamel-Safe Formula", "No Sensitivity Guarantee", "Custom Take-Home Trays"],
    image: "/images/treatments/teeth-whitening.jpg"
  },
  {
    id: "veneers-crowns",
    title: "Veneers & Crowns",
    category: "Aesthetic Restoration",
    shortDesc: "Handcrafted ultra-thin porcelain veneers and zirconia crowns for flawless symmetry.",
    fullDesc: "Custom designed to match your facial profile, correcting gaps, chips, uneven edges, and deep discoloration with lifelike translucency.",
    features: ["E-Max & Zirconia Porcelain", "Natural Light Translucency", "Stain Resistant", "Minimally Invasive"],
    image: "/images/treatments/veneers-crowns.jpg"
  },
  {
    id: "pediatric-general",
    title: "Preventive & Family Care",
    category: "General Dentistry",
    shortDesc: "Comprehensive oral prophylaxis, fissure sealants, and caring pediatric dental visits.",
    fullDesc: "A warm, gentle clinic environment designed to make visits relaxed and positive for children and adults alike.",
    features: ["Gentle Ultrasonic Scaling", "Fluoride Treatments", "Cavity Prevention", "Family Wellness Plans"],
    image: "/images/treatments/preventive-family.jpg"
  },
  {
    id: "periodontal-therapy",
    title: "Periodontal Therapy & Gum Surgery",
    category: "Periodontics",
    shortDesc: "Specialized gum care, laser pocket disinfection, and regenerative gum surgeries to restore gingival health.",
    fullDesc: "Comprehensive clinical care for bleeding gums, bone loss, and periodontitis using minimally invasive ultrasonic cleaning, laser sterilization, and regenerative surgical grafting.",
    features: ["Laser Pocket Decontamination", "Deep Subgingival Scaling", "Flap Surgery & Bone Grafts", "Receding Gum Therapy"],
    image: "/images/treatments/periodontal-therapy.jpg"
  },
  {
    id: "maxillofacial-surgery",
    title: "Minor Maxillofacial Surgeries",
    category: "Oral Surgery",
    shortDesc: "Expert surgical extractions, impacted wisdom tooth removals, cyst enucleations, and minor oral surgeries.",
    fullDesc: "Painless in-office oral surgical procedures performed under profound local anesthesia in sterile operatory suites with fast-healing clinical protocols.",
    features: ["Impacted Wisdom Tooth Surgery", "Atraumatic Surgical Extractions", "Cyst & Benign Lesion Removal", "Frenectomy & Bone Contouring"],
    image: "/images/treatments/maxillofacial-surgery.jpg"
  },
  {
    id: "dentures-prosthetics",
    title: "Full Dentures & Partial Dentures",
    category: "Prosthodontics",
    shortDesc: "Precision-crafted complete, partial, and flexible dentures restoring natural chewing function and facial aesthetics.",
    fullDesc: "Custom-molded dental prosthetics engineered for exceptional comfort, secure retention, and natural aesthetics, restoring full chewing power and youthful contours.",
    features: ["BPS High-Impact Complete Dentures", "Flexible Valplast Partial Dentures", "Precision Cast Metal Dentures", "Implant-Supported Dentures"],
    image: "/images/treatments/full-dentures.jpg"
  },
  {
    id: "tmj-treatment",
    title: "TMJ Treatment & Splints",
    category: "TMJ & Facial Pain",
    shortDesc: "Therapeutic occlusal splints and clinical therapy for jaw joint pain, clicking, teeth grinding, and headaches.",
    fullDesc: "Targeted temporomandibular joint evaluation and custom-fabricated splints designed to decompress jaw joints, eliminate morning soreness, and protect teeth from grinding wear.",
    features: ["Custom Occlusal Splints", "Bruxism Nightguards", "Jaw Joint Decompression", "Chronic Facial Pain Relief"],
    image: "/images/treatments/tmj-treatment.jpg"
  },
  {
    id: "pediatric-dental-care",
    title: "Pediatric Dental Care",
    category: "Pediatric Dentistry",
    shortDesc: "Gentle, stress-free dental care for children and teens with painless fillings, fluoride care, and habit guidance.",
    fullDesc: "Compassionate dental care tailored for young smiles in a cheerful, fear-free atmosphere, focusing on cavity prevention, comfortable treatment, and healthy smile development.",
    features: ["Child-Friendly Gentle Care", "Milk Tooth Pulpectomies & Crowns", "Fluoride Varnish & Sealants", "Space Maintainers & Habit Correction"],
    image: "/images/treatments/pediatric-care.jpg"
  },
  {
    id: "mucosal-pathology",
    title: "Mucosal Pathology & Biopsy Procedures",
    category: "Oral Pathology",
    shortDesc: "Screening, diagnostic evaluations, and minor biopsy procedures for oral ulcers, lesions, and mucosal disorders.",
    fullDesc: "Precise clinical evaluations and minor soft-tissue biopsies for persistent mouth sores, white or red mucosal patches, and oral lesions with dedicated histopathological diagnosis.",
    features: ["Oral Premalignancy Screening", "Diagnostic Soft-Tissue Biopsy", "Oral Ulcer & Stomatitis Care", "Histopathological Laboratory Analysis"],
    image: "/images/treatments/mucosal-pathology.jpg"
  }
];
