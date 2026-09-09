export interface ClinicLocation {
  id: string;
  tag: string;
  name: string;
  isFlagship: boolean;
  addressLine1: string;
  addressLine2: string;
  cityState: string;
  phone: string;
  whatsapp: string;
  hours: string;
  mapsUrl: string;
  status: "active" | "upcoming";
  features: string[];
}

export const clinicLocations: ClinicLocation[] = [
  {
    id: "ponnani",
    tag: "PONNANI",
    name: "Dento Care — Ponnani Clinic",
    isFlagship: true,
    addressLine1: "KK Junction, near ISS School",
    addressLine2: "Main Road",
    cityState: "Ponnani, Kerala 679577",
    phone: "+91 98470 12345",
    whatsapp: "919847012345",
    hours: "Monday – Saturday: 9:00 AM – 8:00 PM (Sunday By Prior Appointment)",
    mapsUrl: "https://maps.google.com/?q=KK+Junction+Ponnani+Kerala",
    status: "active",
    features: [
      "Digital 3D Dental Imaging",
      "Sterile Implant Operating Room",
      "Painless Laser Dentistry",
      "Child-Friendly Dental Corner"
    ]
  },
  {
    id: "branch-2",
    tag: "BRANCH 2",
    name: "Branch 2 — Expansion Centre",
    isFlagship: false,
    addressLine1: "Location announcement in progress",
    addressLine2: "Official address will be updated shortly",
    cityState: "Kerala",
    phone: "+91 98470 12345",
    whatsapp: "919847012345",
    hours: "Opening Q3 2026",
    mapsUrl: "#",
    status: "upcoming",
    features: [
      "Advanced Cosmetic Suite",
      "Dedicated Orthodontic Clinic"
    ]
  },
  {
    id: "branch-3",
    tag: "BRANCH 3",
    name: "Branch 3 — City Care Lounge",
    isFlagship: false,
    addressLine1: "Location announcement in progress",
    addressLine2: "Official address will be updated shortly",
    cityState: "Kerala",
    phone: "+91 98470 12345",
    whatsapp: "919847012345",
    hours: "Opening Q4 2026",
    mapsUrl: "#",
    status: "upcoming",
    features: [
      "Express Dental Checkups",
      "Clear Aligner Studio"
    ]
  }
];
