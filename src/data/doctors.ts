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
  fullTitle?: string;
  designation?: string;
  aboutParagraphs?: string[];
  expertise?: string[];
  achievements?: string[];
}

export const clinicDoctors: DoctorProfile[] = [
  {
    id: "dr-mufeed",
    name: "Prof. Dr. Abdul Mufeed",
    role: "Professor & Head, Oral Medicine & Radiology • Co-Founder",
    specialization: "Oral Medicine & Radiology",
    experience: "23+ Years Clinical Experience",
    degrees: "BDS, MDS (Oral Medicine & Radiology)",
    rating: 5.0,
    reviewCount: 311,
    image: "/images/doctors/doctor-2.jpg",
    branch: "Ponnani Flagship Clinic",
    bio: "Senior dental clinician, academician, and co-founder with over 23 years of experience. Professor & HOD of Oral Medicine & Radiology at MES Dental College and founder of 3Di Scans, specializing in oral mucosal disorders, orofacial pain, oral malignancies, and advanced maxillofacial diagnostics.",
    fullTitle: "Professor Dr. Abdul Mufeed",
    designation: "Professor & Head, Department of Oral Medicine & Radiology, MES Dental College | Co-Founder, Dental Care Dental Clinic",
    aboutParagraphs: [
      "Professor Dr. Abdul Mufeed is a senior dental clinician, academician, researcher, and mentor with over 23 years of experience in dental care and 18 years in dental education and research.",
      "As a Professor and Head of the Department of Oral Medicine & Radiology at MES Dental College, he brings extensive clinical and academic experience to the diagnosis and management of complex oral and dental conditions.",
      "Dr. Mufeed has authored 23 scientific publications in national and international journals and has regularly conducted continuing dental education programmes and professional training sessions for dental practitioners.",
      "A Passion for Teaching & Mentorship: Education has been an important part of Dr. Mufeed's professional journey. Over the years, he has trained approximately 1,000 dental graduates, many of whom are now practicing across India and the Middle East. His approach combines clinical experience, evidence-based practice, and mentorship, with a strong emphasis on helping the next generation of dental professionals provide compassionate and quality patient care.",
      "Beyond Clinical Practice: Dr. Mufeed is also one of the founders of 3Di Scans, a leading maxillofacial diagnostic imaging network in Kerala. Through 3Di Scans, he has contributed to making advanced CBCT and maxillofacial diagnostic imaging more accessible to dental professionals.",
      "At Dental Care Dental Clinic, his experience in oral medicine, diagnosis, education, and research contributes to the clinic's commitment to accurate diagnosis, evidence-based treatment, and comprehensive patient care."
    ],
    expertise: [
      "Oral mucosal disorders",
      "Orofacial pain conditions",
      "Oral malignancies & precancerous lesions",
      "Pediatric dental care",
      "Geriatric dental care",
      "Advanced CBCT & maxillofacial diagnostics"
    ],
    achievements: [
      "23+ Years in Dental Care & 18+ Years in Dental Education",
      "Professor & HOD, Oral Medicine & Radiology at MES Dental College",
      "Co-Founder of Dental Care Dental Clinic & Founder of 3Di Scans",
      "Authored 23 scientific publications in national & international journals",
      "Trained ~1,000 dental graduates across India & the Middle East"
    ]
  },
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
    bio: "With 11 years of clinical excellence, Dr. Lijeesh combines loupes-assisted precision micro-dentistry and modern surgical technologies to deliver painless smile corrections, root canals, and comprehensive personalized care.",
    fullTitle: "Dr. Lijeesh Kadambil",
    designation: "Chief Dental Surgeon & Implantologist, Dental Care Dental Clinic",
    aboutParagraphs: [
      "Dr. Lijeesh Kadambil is the Chief Dental Surgeon and Implantologist at Dental Care Dental Clinic. With 11 years of clinical excellence, he combines loupes-assisted precision micro-dentistry and modern surgical technologies.",
      "He delivers painless smile corrections, root canals, dental implants, and comprehensive personalized care with a gentle, patient-first approach."
    ],
    expertise: [
      "Oral Implantology & Guided Bone Regeneration",
      "Loupes-Assisted Precision Micro-Dentistry",
      "Painless Single-Sitting Root Canal Treatments",
      "Aesthetic Smile Makeovers & Ceramic Veneers",
      "Wisdom Tooth Surgery & Minor Oral Surgery"
    ],
    achievements: [
      "11+ Years of Clinical Excellence in Advanced Dentistry",
      "Fellowship in Oral Implantology from leading institutes",
      "Over 300+ Verified 5-Star Patient Reviews",
      "Pioneering digital smile workflow at Dento Care"
    ]
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
    bio: "Specializing in craniofacial biology and advanced malocclusion management, blending specialized orthodontic science with comprehensive treatment planning to achieve stable, functional, and aesthetic harmony.",
    fullTitle: "Dr. Shoukathali",
    designation: "Consultant Orthodontist, Dento Care Dental Clinic",
    expertise: [
      "Orthodontics & Craniofacial Biology",
      "Clear Aligners & Invisible Braces",
      "Self-Ligating Braces for Adults & Teens",
      "Surgical Orthodontics & Complex Malocclusions"
    ]
  },
  {
    id: "dr-haris",
    name: "Dr. Mohammed Haris PM",
    role: "Consultant Periodontist",
    specialization: "Periodontics & Gum Care",
    experience: "Specialist Consultant",
    degrees: "BDS, MDS (Periodontics)",
    rating: 4.9,
    reviewCount: 96,
    image: "/images/doctors/doctor-4.jpg",
    branch: "Veliyancode & Ponnani Clinics",
    bio: "Experienced Periodontist specialising in the diagnosis, prevention, and management of gum conditions. Clinical expertise includes periodontal flap surgery, root planing, and advanced preventive treatments with a meticulous, evidence-based approach.",
    fullTitle: "Dr. Mohammed Haris PM",
    designation: "Consultant Periodontist, Dento Care Dental Clinic",
    aboutParagraphs: [
      "Dr. Mohamed Haris PM is an experienced Periodontist specialising in the diagnosis, prevention, and management of gum and periodontal conditions.",
      "His clinical expertise includes flap surgery, root planing, and advanced periodontal surgical and preventive treatments, with a strong focus on preserving gum health and supporting long-term oral health.",
      "His meticulous, evidence-based approach ensures comprehensive and personalised periodontal care."
    ],
    expertise: [
      "Diagnosis & Management of Periodontal Disease",
      "Periodontal Flap Surgery",
      "Root Planing & Deep Periodontal Therapy",
      "Advanced Surgical & Preventive Gum Treatments",
      "Gingival Health & Long-Term Oral Maintenance"
    ]
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
    bio: "Dedicated to comprehensive preventive wellness and precise restorative care, emphasizing accurate diagnosis, personalized treatment planning, and uncompromising patient comfort for long-term oral health.",
    fullTitle: "Dr. Akshaya Asokan",
    designation: "Resident Dental Surgeon, Dento Care Dental Clinic",
    expertise: [
      "Preventive Dentistry & Oral Wellness",
      "Tooth-Colored Restorations & Bonding",
      "Pediatric Care & Gentle Checkups",
      "Routine Scaling, Polishing & Gum Care"
    ]
  },
  {
    id: "dr-jasmine",
    name: "Dr. Jasmine",
    role: "Dental Surgeon & Restorative Specialist",
    specialization: "Conservative Dentistry & Endodontics",
    experience: "Resident Dental Surgeon",
    degrees: "BDS",
    rating: 4.9,
    reviewCount: 98,
    image: "/images/doctors/doctor-6.jpg",
    branch: "Ponnani & Veliyancode Clinics",
    bio: "Dedicated to gentle patient care, conservative restorative dentistry, and routine oral health maintenance, combining modern clinical techniques with compassionate patient guidance.",
    fullTitle: "Dr. Jasmine",
    designation: "Resident Dental Surgeon, Dento Care Dental Clinic",
    expertise: [
      "Conservative Restorative Dentistry",
      "Endodontic Consultations",
      "Gentle Patient Anxiety Management",
      "Oral Health Maintenance & Fluoride Therapy"
    ]
  }
];
