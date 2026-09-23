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

// ============================================================================
// 1. PONNANI FLAGSHIP CLINIC DOCTORS (Cards 1 to 9 in exact specified order)
// ============================================================================
export const ponnaniDoctors: DoctorProfile[] = [
  // Card 1: Dr. Abdulla Mufeed
  {
    id: "dr-mufeed-ponnani",
    name: "Dr. Abdulla Mufeed",
    role: "Professor & Head, Oral Medicine & Radiology • Co-Founder",
    specialization: "Oral Medicine & Radiology",
    experience: "23+ Years Clinical Experience",
    degrees: "BDS, MDS (Oral Medicine & Radiology)",
    rating: 5.0,
    reviewCount: 311,
    image: "/images/doctors/doctor-2.jpg",
    branch: "Ponnani Flagship Clinic",
    bio: "Senior dental clinician, academician, and co-founder with over 23 years of experience. Professor & HOD of Oral Medicine & Radiology at MES Dental College and founder of 3Di Scans, specializing in oral mucosal disorders, orofacial pain, oral malignancies, and advanced maxillofacial diagnostics.",
    fullTitle: "Dr. Abdulla Mufeed",
    designation: "Professor & Head, Department of Oral Medicine & Radiology, MES Dental College | Co-Founder, Dental Care Dental Clinic",
    aboutParagraphs: [
      "Professor Dr. Abdulla Mufeed is a senior dental clinician, academician, researcher, and mentor with over 23 years of experience in dental care and 18 years in dental education and research.",
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

  // Card 2: Dr. Lijeesh Kadambil
  {
    id: "dr-lijeesh-ponnani",
    name: "Dr. Lijeesh Kadambil",
    role: "Chief Dental Surgeon & Implantologist",
    specialization: "Aesthetic Dentistry & Oral Surgery",
    experience: "11+ Years Clinical Experience",
    degrees: "BDS",
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
      "Over 300+ Verified 5-Star Patient Reviews",
      "Pioneering digital smile workflow at Dento Care"
    ]
  },

  // Card 3: Dr. Jasmin TP
  {
    id: "dr-jasmine-ponnani",
    name: "Dr. Jasmin TP",
    role: "Dental Surgeon & Restorative Specialist",
    specialization: "Conservative Dentistry & Endodontics",
    experience: "Resident Dental Surgeon",
    degrees: "BDS",
    rating: 4.9,
    reviewCount: 98,
    image: "/images/doctors/doctor-6.jpg",
    branch: "Ponnani Flagship Clinic",
    bio: "Dedicated to gentle patient care, conservative restorative dentistry, and routine oral health maintenance, combining modern clinical techniques with compassionate patient guidance.",
    fullTitle: "Dr. Jasmin TP",
    designation: "Resident Dental Surgeon, Dento Care Dental Clinic",
    expertise: [
      "Conservative Restorative Dentistry",
      "Endodontic Consultations",
      "Gentle Patient Anxiety Management",
      "Oral Health Maintenance & Fluoride Therapy"
    ]
  },

  // Card 4: Dr. Akshaya Ashokan
  {
    id: "dr-akshaya-ponnani",
    name: "Dr. Akshaya Ashokan",
    role: "Dental Surgeon & Restorative Specialist",
    specialization: "Preventive & Restorative Dentistry",
    experience: "Resident Dental Surgeon",
    degrees: "BDS",
    rating: 4.9,
    reviewCount: 114,
    image: "/images/doctors/doctor-5.jpg",
    branch: "Ponnani Flagship Clinic",
    bio: "Dedicated to comprehensive preventive wellness and precise restorative care, emphasizing accurate diagnosis, personalized treatment planning, and uncompromising patient comfort for long-term oral health.",
    fullTitle: "Dr. Akshaya Ashokan",
    designation: "Resident Dental Surgeon, Dento Care Dental Clinic",
    expertise: [
      "Preventive Dentistry & Oral Wellness",
      "Tooth-Colored Restorations & Bonding",
      "Pediatric Care & Gentle Checkups",
      "Routine Scaling, Polishing & Gum Care"
    ]
  },

  // Card 5: Dr. Shoukath Ali PM
  {
    id: "dr-shoukathali-ponnani",
    name: "Dr. Shoukath Ali PM",
    role: "Consultant Orthodontist",
    specialization: "Orthodontics & Craniofacial Biology",
    experience: "Specialist Consultant",
    degrees: "BDS, MDS (Orthodontics & Craniofacial Biology)",
    rating: 4.9,
    reviewCount: 128,
    image: "/images/doctors/doctor-3.jpg",
    branch: "Ponnani Flagship Clinic",
    bio: "Specializing in craniofacial biology and advanced malocclusion management, blending specialized orthodontic science with comprehensive treatment planning to achieve stable, functional, and aesthetic harmony.",
    fullTitle: "Dr. Shoukath Ali PM",
    designation: "Consultant Orthodontist, Dento Care Dental Clinic",
    expertise: [
      "Orthodontics & Craniofacial Biology",
      "Clear Aligners & Invisible Braces",
      "Self-Ligating Braces for Adults & Teens",
      "Surgical Orthodontics & Complex Malocclusions"
    ]
  },

  // Card 6: Dr. Nidhash Saddik
  {
    id: "dr-nidhash-ponnani",
    name: "Dr. Nidhash Saddik",
    role: "Consultant Endodontist & Micro-Dentistry Specialist",
    specialization: "Endodontics & Restorative Dentistry",
    experience: "Specialist Consultant",
    degrees: "BDS, MDS (Conservative Dentistry & Endodontics)",
    rating: 4.9,
    reviewCount: 112,
    image: "/images/doctors/doctor-7.jpg",
    branch: "Ponnani Flagship Clinic",
    bio: "Specializing in loupes-assisted microscopic endodontics, single-sitting painless root canals, and conservative aesthetic tooth restorations, bringing modern instrumentation and gentle precision care to every treatment.",
    fullTitle: "Dr. Nidhash Saddik",
    designation: "Consultant Endodontist, Dento Care Dental Clinic",
    aboutParagraphs: [
      "Dr. Nidhash Saddik is a skilled specialist in Conservative Dentistry and Endodontics, dedicated to saving natural teeth through advanced microscopic techniques.",
      "His clinical expertise includes rotary endodontics, painless single-sitting root canals, complex retreatments, and biomimetic aesthetic tooth restorations using high-magnification loupes.",
      "He prioritizes patient comfort, minimally invasive interventions, and personalized dental care for lasting oral wellness."
    ],
    expertise: [
      "Painless Single-Sitting Root Canal Treatments",
      "Loupes-Assisted Micro-Endodontics",
      "Aesthetic Composite Restorations & Veneers",
      "Fiber Post & Core Tooth Reconstructions",
      "Pulp Therapy & Natural Tooth Preservation"
    ],
    achievements: [
      "MDS in Conservative Dentistry & Endodontics",
      "Presented scientific research at national dental conventions",
      "Specialist in rotary instrumentation and precision micro-dentistry"
    ]
  },

  // Card 7: Dr. Mohamed Aslif
  {
    id: "dr-aslif-ponnani",
    name: "Dr. Mohamed Aslif",
    role: "Consultant Oral & Maxillofacial Surgeon & Implantologist",
    specialization: "Maxillofacial Surgery & Implantology",
    experience: "Senior Specialist Consultant",
    degrees: "BDS, MDS (Oral & Maxillofacial Surgery), Fellow (NYU)",
    rating: 5.0,
    reviewCount: 156,
    image: "/images/doctors/doctor-8.jpg",
    branch: "Ponnani Flagship Clinic",
    bio: "Renowned Oral and Maxillofacial Surgeon and implantologist specializing in advanced dental implants, complex impacted wisdom tooth extractions, facial bone reconstructive procedures, and full-arch rehabilitations.",
    fullTitle: "Dr. Mohamed Aslif",
    designation: "Consultant Oral & Maxillofacial Surgeon, Dento Care Dental Clinic",
    aboutParagraphs: [
      "Dr. Mohamed Aslif is a distinguished Oral and Maxillofacial Surgeon and Implantologist with extensive clinical training in complex surgical and reconstructive oral procedures.",
      "Holding an MDS in Oral & Maxillofacial Surgery and advanced fellowship credentials from New York University (NYU), Dr. Aslif specializes in guided dental implants, sinus elevations, bone grafting, and surgical extractions.",
      "His surgical precision and patient-first protocols ensure smooth recoveries, optimal aesthetic integration, and high patient satisfaction."
    ],
    expertise: [
      "Guided Dental Implantology & Immediate Load Implants",
      "Impacted Third Molar (Wisdom Tooth) Surgery",
      "Sinus Augmentation & Bone Grafting Procedures",
      "Facial Reconstructive Surgery & TMJ Therapy",
      "Pre-Prosthetic Oral Surgical Rehabilitation"
    ],
    achievements: [
      "MDS in Oral & Maxillofacial Surgery",
      "Fellowship & Clinical Mastership in Implantology (NYU)",
      "Senior consultant surgeon across prominent dental centers in Kerala",
      "Over 10+ years of surgical and implant excellence"
    ]
  },

  // Card 8: Dr. Mohamed Haris PM
  {
    id: "dr-haris-ponnani",
    name: "Dr. Mohamed Haris PM",
    role: "Consultant Periodontist",
    specialization: "Periodontics & Gum Care",
    experience: "Specialist Consultant",
    degrees: "BDS, MDS (Periodontics)",
    rating: 4.9,
    reviewCount: 96,
    image: "/images/doctors/doctor-4.jpg",
    branch: "Ponnani Flagship Clinic",
    bio: "Experienced Periodontist specialising in the diagnosis, prevention, and management of gum conditions. Clinical expertise includes periodontal flap surgery, root planing, and advanced preventive treatments with a meticulous, evidence-based approach.",
    fullTitle: "Dr. Mohamed Haris PM",
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

  // Card 9: Dr. Ratheesh TK
  {
    id: "dr-ratheesh-ponnani",
    name: "Dr. Ratheesh TK",
    role: "Oral & Maxillofacial Surgeon",
    specialization: "Oral & Maxillofacial Surgery",
    experience: "Specialist Consultant",
    degrees: "BDS, MDS",
    rating: 4.9,
    reviewCount: 124,
    image: "/images/doctors/doctor-9.jpg",
    branch: "Ponnani Flagship Clinic",
    bio: "A dedicated Oral & Maxillofacial Surgeon (MDS) with advanced clinical training in oral and maxillofacial surgery, trauma management, oral implantology, surgical procedures, and emergency care. With extensive hands-on exposure across complex surgical disciplines, he provides precision-driven, evidence-based care with a strong focus on patient safety, comprehensive treatment planning, and optimal surgical outcomes.",
    fullTitle: "Dr. Ratheesh TK",
    designation: "Oral & Maxillofacial Surgeon, Dento Care Dental Clinic",
    aboutParagraphs: [
      "Dr. Ratheesh TK is a dedicated Oral & Maxillofacial Surgeon (MDS) with advanced clinical training in oral and maxillofacial surgery, trauma management, oral implantology, surgical procedures, and emergency care.",
      "With extensive hands-on exposure across complex surgical disciplines, he provides precision-driven, evidence-based care with a strong focus on patient safety, comprehensive treatment planning, and optimal surgical outcomes."
    ],
    expertise: [
      "Oral & Maxillofacial Surgery",
      "Trauma Management & Emergency Care",
      "Oral Implantology & Guided Surgeries",
      "Complex Surgical Extractions & Minor Oral Surgery",
      "Facial Trauma & Surgical Reconstruction"
    ],
    achievements: [
      "Master of Dental Surgery (MDS) in Oral & Maxillofacial Surgery",
      "Advanced clinical training in oral & maxillofacial surgery and trauma management",
      "Extensive hands-on exposure across complex surgical disciplines"
    ]
  }
];

// ============================================================================
// 2. VELIYANCODE CLINIC DOCTORS (Cards 1 to 8 in exact specified order)
// ============================================================================
export const veliyancodeDoctors: DoctorProfile[] = [
  // Card 1: Dr. Abdullah Mufeed
  {
    id: "dr-mufeed-veliyancode",
    name: "Dr. Abdullah Mufeed",
    role: "Professor & Head, Oral Medicine & Radiology • Co-Founder",
    specialization: "Oral Medicine & Radiology",
    experience: "23+ Years Clinical Experience",
    degrees: "BDS, MDS (Oral Medicine & Radiology)",
    rating: 5.0,
    reviewCount: 311,
    image: "/images/doctors/doctor-2.jpg",
    branch: "Veliyancode Clinic",
    bio: "Senior dental clinician, academician, and co-founder with over 23 years of experience. Professor & HOD of Oral Medicine & Radiology at MES Dental College and founder of 3Di Scans, specializing in oral mucosal disorders, orofacial pain, oral malignancies, and advanced maxillofacial diagnostics.",
    fullTitle: "Dr. Abdullah Mufeed",
    designation: "Professor & Head, Department of Oral Medicine & Radiology, MES Dental College | Co-Founder, Dental Care Dental Clinic",
    aboutParagraphs: [
      "Professor Dr. Abdullah Mufeed is a senior dental clinician, academician, researcher, and mentor with over 23 years of experience in dental care and 18 years in dental education and research.",
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

  // Card 2: Dr. Lijeesh Kadambil
  {
    id: "dr-lijeesh-veliyancode",
    name: "Dr. Lijeesh Kadambil",
    role: "Chief Dental Surgeon & Implantologist",
    specialization: "Aesthetic Dentistry & Oral Surgery",
    experience: "11+ Years Clinical Experience",
    degrees: "BDS",
    rating: 5.0,
    reviewCount: 311,
    image: "/images/doctors/doctor-1.jpg",
    branch: "Veliyancode Clinic",
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
      "Over 300+ Verified 5-Star Patient Reviews",
      "Pioneering digital smile workflow at Dento Care"
    ]
  },

  // Card 3: Dr. Nasreen Nazeer Hussain
  {
    id: "dr-nasreen-veliyancode",
    name: "Dr. Nasreen Nazeer Hussain",
    role: "Dental Surgeon & Restorative Specialist",
    specialization: "General & Restorative Dentistry",
    experience: "Resident Dental Surgeon",
    degrees: "BDS",
    rating: 4.9,
    reviewCount: 108,
    image: "/images/doctors/doctor-nasreen.jpg",
    branch: "Veliyancode Clinic",
    bio: "Dedicated to gentle patient care, conservative restorative dentistry, and routine oral health maintenance, combining modern clinical techniques with compassionate patient guidance for families in Veliyancode.",
    fullTitle: "Dr. Nasreen Nazeer Hussain",
    designation: "Resident Dental Surgeon, Dento Care Dental Clinic - Veliyancode",
    aboutParagraphs: [
      "Dr. Nasreen Nazeer Hussain is a dedicated Resident Dental Surgeon at Dento Care Veliyancode Clinic, committed to providing gentle, compassionate, and precise dental treatment.",
      "She emphasizes conservative tooth restorations, preventative oral hygiene, and pain-free routine treatments tailored to patients of all ages.",
      "Her friendly and patient-focused approach helps nervous patients and children feel comfortable and at ease during every appointment."
    ],
    expertise: [
      "Conservative Restorative Dentistry & Fillings",
      "Routine Dental Scaling & Gum Wellness",
      "Preventive Dentistry & Fluoride Treatments",
      "Painless Routine Extractions",
      "Patient Anxiety Management & Gentle Care"
    ],
    achievements: [
      "Bachelor of Dental Surgery (BDS)",
      "Resident Dental Surgeon at Dento Care Veliyancode Clinic",
      "Over 100+ positive patient reviews for gentle and compassionate care"
    ]
  },

  // Card 4: Dr. Nidhash Siddik
  {
    id: "dr-nidhash-veliyancode",
    name: "Dr. Nidhash Siddik",
    role: "Consultant Endodontist & Micro-Dentistry Specialist",
    specialization: "Endodontics & Restorative Dentistry",
    experience: "Specialist Consultant",
    degrees: "BDS, MDS (Conservative Dentistry & Endodontics)",
    rating: 4.9,
    reviewCount: 112,
    image: "/images/doctors/doctor-7.jpg",
    branch: "Veliyancode Clinic",
    bio: "Specializing in loupes-assisted microscopic endodontics, single-sitting painless root canals, and conservative aesthetic tooth restorations, bringing modern instrumentation and gentle precision care to every treatment.",
    fullTitle: "Dr. Nidhash Siddik",
    designation: "Consultant Endodontist, Dento Care Dental Clinic",
    aboutParagraphs: [
      "Dr. Nidhash Siddik is a skilled specialist in Conservative Dentistry and Endodontics, dedicated to saving natural teeth through advanced microscopic techniques.",
      "His clinical expertise includes rotary endodontics, painless single-sitting root canals, complex retreatments, and biomimetic aesthetic tooth restorations using high-magnification loupes.",
      "He prioritizes patient comfort, minimally invasive interventions, and personalized dental care for lasting oral wellness."
    ],
    expertise: [
      "Painless Single-Sitting Root Canal Treatments",
      "Loupes-Assisted Micro-Endodontics",
      "Aesthetic Composite Restorations & Veneers",
      "Fiber Post & Core Tooth Reconstructions",
      "Pulp Therapy & Natural Tooth Preservation"
    ],
    achievements: [
      "MDS in Conservative Dentistry & Endodontics",
      "Presented scientific research at national dental conventions",
      "Specialist in rotary instrumentation and precision micro-dentistry"
    ]
  },

  // Card 5: Dr. Shoukath Ali PH
  {
    id: "dr-shoukathali-veliyancode",
    name: "Dr. Shoukath Ali PH",
    role: "Consultant Orthodontist",
    specialization: "Orthodontics & Craniofacial Biology",
    experience: "Specialist Consultant",
    degrees: "BDS, MDS (Orthodontics & Craniofacial Biology)",
    rating: 4.9,
    reviewCount: 128,
    image: "/images/doctors/doctor-3.jpg",
    branch: "Veliyancode Clinic",
    bio: "Specializing in craniofacial biology and advanced malocclusion management, blending specialized orthodontic science with comprehensive treatment planning to achieve stable, functional, and aesthetic harmony.",
    fullTitle: "Dr. Shoukath Ali PH",
    designation: "Consultant Orthodontist, Dento Care Dental Clinic",
    expertise: [
      "Orthodontics & Craniofacial Biology",
      "Clear Aligners & Invisible Braces",
      "Self-Ligating Braces for Adults & Teens",
      "Surgical Orthodontics & Complex Malocclusions"
    ]
  },

  // Card 6: Dr. Mohammed Aslif
  {
    id: "dr-aslif-veliyancode",
    name: "Dr. Mohammed Aslif",
    role: "Consultant Oral & Maxillofacial Surgeon & Implantologist",
    specialization: "Maxillofacial Surgery & Implantology",
    experience: "Senior Specialist Consultant",
    degrees: "BDS, MDS (Oral & Maxillofacial Surgery), Fellow (NYU)",
    rating: 5.0,
    reviewCount: 156,
    image: "/images/doctors/doctor-8.jpg",
    branch: "Veliyancode Clinic",
    bio: "Renowned Oral and Maxillofacial Surgeon and implantologist specializing in advanced dental implants, complex impacted wisdom tooth extractions, facial bone reconstructive procedures, and full-arch rehabilitations.",
    fullTitle: "Dr. Mohammed Aslif",
    designation: "Consultant Oral & Maxillofacial Surgeon, Dento Care Dental Clinic",
    aboutParagraphs: [
      "Dr. Mohammed Aslif is a distinguished Oral and Maxillofacial Surgeon and Implantologist with extensive clinical training in complex surgical and reconstructive oral procedures.",
      "Holding an MDS in Oral & Maxillofacial Surgery and advanced fellowship credentials from New York University (NYU), Dr. Aslif specializes in guided dental implants, sinus elevations, bone grafting, and surgical extractions.",
      "His surgical precision and patient-first protocols ensure smooth recoveries, optimal aesthetic integration, and high patient satisfaction."
    ],
    expertise: [
      "Guided Dental Implantology & Immediate Load Implants",
      "Impacted Third Molar (Wisdom Tooth) Surgery",
      "Sinus Augmentation & Bone Grafting Procedures",
      "Facial Reconstructive Surgery & TMJ Therapy",
      "Pre-Prosthetic Oral Surgical Rehabilitation"
    ],
    achievements: [
      "MDS in Oral & Maxillofacial Surgery",
      "Fellowship & Clinical Mastership in Implantology (NYU)",
      "Senior consultant surgeon across prominent dental centers in Kerala",
      "Over 10+ years of surgical and implant excellence"
    ]
  },

  // Card 7: Dr. Mohammed Haris PM
  {
    id: "dr-haris-veliyancode",
    name: "Dr. Mohammed Haris PM",
    role: "Consultant Periodontist",
    specialization: "Periodontics & Gum Care",
    experience: "Specialist Consultant",
    degrees: "BDS, MDS (Periodontics)",
    rating: 4.9,
    reviewCount: 96,
    image: "/images/doctors/doctor-4.jpg",
    branch: "Veliyancode Clinic",
    bio: "Experienced Periodontist specialising in the diagnosis, prevention, and management of gum conditions. Clinical expertise includes periodontal flap surgery, root planing, and advanced preventive treatments with a meticulous, evidence-based approach.",
    fullTitle: "Dr. Mohammed Haris PM",
    designation: "Consultant Periodontist, Dento Care Dental Clinic",
    aboutParagraphs: [
      "Dr. Mohammed Haris PM is an experienced Periodontist specialising in the diagnosis, prevention, and management of gum and periodontal conditions.",
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

  // Card 8: Dr. Ratheesh TK
  {
    id: "dr-ratheesh-veliyancode",
    name: "Dr. Ratheesh TK",
    role: "Oral & Maxillofacial Surgeon",
    specialization: "Oral & Maxillofacial Surgery",
    experience: "Specialist Consultant",
    degrees: "BDS, MDS",
    rating: 4.9,
    reviewCount: 124,
    image: "/images/doctors/doctor-9.jpg",
    branch: "Veliyancode Clinic",
    bio: "A dedicated Oral & Maxillofacial Surgeon (MDS) with advanced clinical training in oral and maxillofacial surgery, trauma management, oral implantology, surgical procedures, and emergency care. With extensive hands-on exposure across complex surgical disciplines, he provides precision-driven, evidence-based care with a strong focus on patient safety, comprehensive treatment planning, and optimal surgical outcomes.",
    fullTitle: "Dr. Ratheesh TK",
    designation: "Oral & Maxillofacial Surgeon, Dento Care Dental Clinic",
    aboutParagraphs: [
      "Dr. Ratheesh TK is a dedicated Oral & Maxillofacial Surgeon (MDS) with advanced clinical training in oral and maxillofacial surgery, trauma management, oral implantology, surgical procedures, and emergency care.",
      "With extensive hands-on exposure across complex surgical disciplines, he provides precision-driven, evidence-based care with a strong focus on patient safety, comprehensive treatment planning, and optimal surgical outcomes."
    ],
    expertise: [
      "Oral & Maxillofacial Surgery",
      "Trauma Management & Emergency Care",
      "Oral Implantology & Guided Surgeries",
      "Complex Surgical Extractions & Minor Oral Surgery",
      "Facial Trauma & Surgical Reconstruction"
    ],
    achievements: [
      "Master of Dental Surgery (MDS) in Oral & Maxillofacial Surgery",
      "Advanced clinical training in oral & maxillofacial surgery and trauma management",
      "Extensive hands-on exposure across complex surgical disciplines"
    ]
  }
];

// ============================================================================
// 3. COMPLETE REPOSITORY OF ALL UNIQUE CLINIC DOCTORS
// (For global lookups, appointment dropdowns, and admin dashboard)
// ============================================================================
export const clinicDoctors: DoctorProfile[] = [
  ...ponnaniDoctors,
  // Include doctors unique to Veliyancode
  veliyancodeDoctors[2], // Dr. Nasreen Nazeer Hussain
  veliyancodeDoctors[4]  // Dr. Shoukath Ali PH
];

/**
 * Returns the exact list of doctors for the given branch.
 */
export function getDoctorsByBranch(branch: 'ponnani' | 'veliyancode'): DoctorProfile[] {
  return branch === 'veliyancode' ? veliyancodeDoctors : ponnaniDoctors;
}
