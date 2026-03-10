/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  rating: number;
  location: string;
  bio: string;
}

export interface Clinic {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  image: string;
}

export interface Treatment {
  id: string;
  title: string;
  description: string;
  icon: string;
  successRate: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  clinicId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  treatmentType: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  medicalHistory: string[];
  currentTreatment?: string;
  nextSteps: string[];
}
