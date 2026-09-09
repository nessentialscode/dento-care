export interface DoctorProfile {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  degrees: string;
  rating: number;
  reviewCount: number;
  image: string;
  branch: string;
  bio: string;
}

export const clinicDoctors: DoctorProfile[] = [
  {
    id: "dr-reed",
    name: "Dr. Lijeesh Kadambil",
    role: "Chief Dental Surgeon & Implantologist",
    specialization: "Oral Implantology & Micro-Dentistry",
    experience: "3+ Years Experience",
    degrees: "BDS, Fellowship in Oral Implantology",
    rating: 5.0,
    reviewCount: 311,
    image: "/images/doctor-lijeesh.jpg",
    branch: "Ponnani Flagship Clinic",
    bio: "Dedicated to precision oral implantology and compassionate patient care, combining magnification loupes with advanced digital scanning to make every procedure painless."
  },
  {
    id: "dr-ananya",
    name: "Dr. Abdullah Mufeed",
    role: "Professor & Specialist Consultant",
    specialization: "Orthodontics & Clear Aligners",
    experience: "Prof. MES Dental College, Perinthalmanna",
    degrees: "BDS, MDS",
    rating: 4.9,
    reviewCount: 142,
    image: "/images/doctor-specialist.jpg",
    branch: "Ponnani & Consulting Clinics",
    bio: "Specializing in discreet smile realignment using modern clear aligner technology and self-ligating braces for teenagers and adults."
  },
  {
    id: "dr-consultant-endo",
    name: "Dr. [Endodontist]",
    role: "Specialist Endodontist",
    specialization: "Conservative Dentistry & Root Canal Therapy",
    experience: "Senior Specialist",
    degrees: "BDS, MDS (Conservative Dentistry)",
    rating: 4.9,
    reviewCount: 98,
    image: "/images/hero-tooth-specialists.jpg",
    branch: "Ponnani Flagship Clinic",
    bio: "Expert in single-visit root canal treatments using dental operating microscopy and rotary titanium instrumentation."
  }
];
