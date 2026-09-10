export interface ClinicLocation {
  id: string;
  tag: string;
  name: string;
  shortName: string;
  badge: string;
  isFlagship: boolean;
  locatedIn?: string;
  locatedInUrl?: string;
  addressLine1: string;
  addressLine2: string;
  cityState: string;
  phone: string;
  displayPhone: string;
  whatsapp: string;
  hours: string;
  rating: number;
  reviewsCount: number;
  mapsUrl: string;
  directionsUrl: string;
  websiteUrl?: string;
  facebookUrl?: string;
  status: "active" | "upcoming";
  features: string[];
  reviewQuotes?: string[];
  photoCount?: number;
}

export const clinicLocations: ClinicLocation[] = [
  {
    id: "ponnani",
    tag: "PONNANI",
    name: "Dento Care — Ponnani Clinic",
    shortName: "Ponnani",
    badge: "Flagship Clinic",
    isFlagship: true,
    locatedIn: "KK Junction, near ISS School",
    addressLine1: "KK Junction, near ISS School",
    addressLine2: "Main Road",
    cityState: "Ponnani, Kerala 679577",
    phone: "+919847012345",
    displayPhone: "+91 98470 12345",
    whatsapp: "919847012345",
    hours: "Open · Closes 8:00 PM (Mon – Sat)",
    rating: 4.9,
    reviewsCount: 32,
    mapsUrl: "https://maps.google.com/?q=KK+Junction+Ponnani+Kerala",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=KK+Junction+Ponnani+Kerala+679577",
    websiteUrl: "https://m.facebook.com/dentocareponnani/",
    facebookUrl: "https://m.facebook.com/dentocareponnani/",
    status: "active",
    features: [
      "Digital 3D Dental Imaging",
      "Sterile Implant Operating Room",
      "Painless Laser Dentistry",
      "Child-Friendly Dental Corner"
    ],
    reviewQuotes: [
      "Very professional dental clinic in Ponnani. Zero pain during treatment.",
      "Clean, calming clinic environment and polite doctors."
    ],
    photoCount: 12
  },
  {
    id: "veliyancode",
    tag: "VELIYANCODE",
    name: "Dento Care Multispeciality Dental Clinic",
    shortName: "Veliyancode",
    badge: "Aspel Medcity Branch",
    isFlagship: false,
    locatedIn: "Aspel medcity",
    locatedInUrl: "https://www.google.com/search?client=safari&q=Aspel+medcity",
    addressLine1: "Medcity hospital, Veliyancode",
    addressLine2: "Ponnani",
    cityState: "Kerala 679579",
    phone: "07025215151",
    displayPhone: "070252 15151",
    whatsapp: "917025215151",
    hours: "Open · Closes 7:00 PM (Mon – Sat)",
    rating: 4.9,
    reviewsCount: 16,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Dento+Care+Multispeciality+Dental+Clinic+Medcity+hospital+Veliyancode+Ponnani+Kerala+679579",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Medcity+hospital+Veliyancode+Ponnani+Kerala+679579",
    websiteUrl: "https://m.facebook.com/dentocareponnani/",
    facebookUrl: "https://m.facebook.com/dentocareponnani/",
    status: "active",
    features: [
      "Located in Aspel Medcity Hospital",
      "Multispeciality Dental Surgery & Care",
      "Advanced Root Canal & Tooth Restorations",
      "Comprehensive Digital Dental Diagnostics"
    ],
    reviewQuotes: [
      "Very good service and good doctors",
      "Good treatment Good Experience"
    ],
    photoCount: 6
  }
];
