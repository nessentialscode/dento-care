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
    id: "dr-lijeesh",
    name: "Dr. Lijeesh Kadambil",
    role: "Chief Dental Surgeon & Implantologist",
    specialization: "Aesthetic Dentistry & Oral Surgery",
    experience: "11+ Years Clinical Experience",
    degrees: "BDS, Fellowship in Oral Implantology",
    rating: 5.0,
    reviewCount: 311,
    image: "/images/doctors/doctor-1.jpg",
    branch: "Ponnani Flagship Clinic",
    bio: "With 11 years of clinical excellence, Dr. Lijeesh combines loupes-assisted precision micro-dentistry and modern surgical technologies to deliver painless smile corrections, root canals, and comprehensive personalized care."
  },
  {
    id: "dr-mufeed",
    name: "Prof. Dr. Abdullah Mufeed",
    role: "Professor & Specialist Consultant",
    specialization: "Orthodontics & Clear Aligners",
    experience: "Prof. MES Dental College, Perinthalmanna",
    degrees: "BDS, MDS (Orthodontics)",
    rating: 4.9,
    reviewCount: 142,
    image: "/images/doctors/doctor-2.jpg",
    branch: "Ponnani & Consulting Clinics",
    bio: "Specializing in discreet smile realignment using modern clear aligner technology and self-ligating braces for teenagers and adults with natural facial aesthetics."
  },
  {
    id: "dr-shoukathali",
    name: "Dr. Shoukathali",
    role: "Consultant Orthodontist",
    specialization: "Orthodontics & Craniofacial Biology",
    experience: "Specialist Consultant",
    degrees: "BDS, MDS (Orthodontics & Craniofacial Biology)",
    rating: 4.9,
    reviewCount: 128,
    image: "/images/doctors/doctor-3.jpg",
    branch: "Ponnani & Veliyancode Clinics",
    bio: "Specializing in craniofacial biology and advanced malocclusion management, blending specialized orthodontic science with comprehensive treatment planning to achieve stable, functional, and aesthetic harmony."
  },
  {
    id: "dr-haris",
    name: "Dr. Haris",
    role: "Oral & Maxillofacial Surgeon",
    specialization: "Maxillofacial Surgery & Impactions",
    experience: "Consultant Oral Surgeon",
    degrees: "BDS, MDS (Oral & Maxillofacial Surgery)",
    rating: 4.9,
    reviewCount: 96,
    image: "/images/doctors/doctor-4.jpg",
    branch: "Veliyancode & Ponnani Clinics",
    bio: "Specializing in surgical extractions, wisdom tooth surgeries, dental implants, and minor facial trauma management with gentle care."
  },
  {
    id: "dr-akshaya",
    name: "Dr. Akshaya Asokan",
    role: "Dental Surgeon & Restorative Specialist",
    specialization: "Preventive & Restorative Dentistry",
    experience: "Resident Dental Surgeon",
    degrees: "BDS",
    rating: 4.9,
    reviewCount: 114,
    image: "/images/doctors/doctor-5.jpg",
    branch: "Ponnani & Veliyancode Clinics",
    bio: "Dedicated to comprehensive preventive wellness and precise restorative care, emphasizing accurate diagnosis, personalized treatment planning, and uncompromising patient comfort for long-term oral health."
  }
];
