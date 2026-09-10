export interface PatientReview {
  id: string;
  author: string;
  source: string;
  rating: number;
  timeAgo: string;
  treatment: string;
  quote: string;
  verified: boolean;
}

export const clinicReviews: PatientReview[] = [
  {
    id: "rev-1",
    author: "Mohammed Fasil",
    source: "Google Verified Review • Ponnani",
    rating: 5,
    timeAgo: "2 weeks ago",
    treatment: "Dental Implant & Crown",
    quote: "Very professional dental clinic in Ponnani. The doctor explained each step clearly before starting the implant procedure. Zero pain during the treatment and the clinic hygiene is exceptional.",
    verified: true
  },
  {
    id: "rev-vel-1",
    author: "Patient Feedback",
    source: "Google Verified Review • Veliyancode",
    rating: 5,
    timeAgo: "Recently",
    treatment: "Dental Care & Treatment",
    quote: "Very good service and good doctors. The clinic at Aspel Medcity is well maintained with gentle, experienced specialists.",
    verified: true
  },
  {
    id: "rev-vel-2",
    author: "Verified Patient",
    source: "Google Verified Review • Veliyancode",
    rating: 5,
    timeAgo: "Recently",
    treatment: "General Consultation",
    quote: "Good treatment Good Experience. Highly recommend Dento Care Multispeciality Dental Clinic for family dental needs.",
    verified: true
  },
  {
    id: "rev-2",
    author: "Aysha R.",
    source: "Google Verified Review • Ponnani",
    rating: 5,
    timeAgo: "1 month ago",
    treatment: "Root Canal Treatment",
    quote: "I was extremely anxious about getting a root canal done, but the team at Dento Care made it so comfortable and gentle. Truly top-notch care and friendly staff!",
    verified: true
  },
  {
    id: "rev-3",
    author: "Sujith Kumar",
    source: "Google Verified Review • Ponnani",
    rating: 5,
    timeAgo: "2 months ago",
    treatment: "Teeth Whitening & Cleaning",
    quote: "State of the art dental equipment and very polite doctors. The whitening results were noticeable immediately. Definitely the best dental care in the area.",
    verified: true
  },
  {
    id: "rev-4",
    author: "Fathima Noor",
    source: "Google Verified Review • Ponnani",
    rating: 5,
    timeAgo: "3 months ago",
    treatment: "Orthodontic Consultation",
    quote: "Clean, calming clinic environment. The doctors take time to listen rather than rushing. Very happy with my consultation and treatment plan.",
    verified: true
  }
];

export const reviewStats = {
  averageRating: 4.9,
  totalCount: 48,
  platform: "Google Rating",
  recommendPercent: 98
};
