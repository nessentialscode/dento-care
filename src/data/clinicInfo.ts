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
  phone: "+91 7510355355",
  whatsapp: "917510355355",
  email: "dentocareponnani@gmail.com",
  mainAddress: "KK Junction, near ISS School, Ponnani, Kerala",
  workingHours: "Mon – Sat: 10:00 AM – 7:00 PM | Sunday: Closed",
};

/**
 * Official approved clinic appointment time slots.
 * Aligns strictly with clinic operating hours: Monday-Saturday: 10:00 AM - 7:00 PM.
 */
export const APPOINTMENT_TIME_SLOTS = [
  "Morning (10:00 AM - 1:00 PM)",
  "Afternoon (2:00 PM - 5:00 PM)",
  "Evening (5:00 PM - 7:00 PM)",
] as const;

export type AppointmentTimeSlot = typeof APPOINTMENT_TIME_SLOTS[number];

