export interface ClinicInfo {
  name: string;
  subname: string;
  tagline: string;
  subheadline: string;
  googleRating: number;
  totalReviews: number;
  loyalPatientsPercent: number;
  phone: string;
  whatsapp: string;
  email: string;
  mainAddress: string;
  workingHours: string;
}

export const clinicInfo: ClinicInfo = {
  name: "Dento Care",
  subname: "Dental Clinic",
  tagline: "Restore Your True Smile",
  subheadline: "Using advanced technology, we deliver comprehensive treatments for a healthy, confident smile.",
  googleRating: 4.9,
  totalReviews: 32,
  loyalPatientsPercent: 98,
  phone: "+91 98470 12345",
  whatsapp: "919847012345",
  email: "care@dentocaredental.com",
  mainAddress: "KK Junction, near ISS School, Ponnani, Kerala",
  workingHours: "Mon – Sat: 9:00 AM – 8:00 PM | Sunday: On Appointment",
};
