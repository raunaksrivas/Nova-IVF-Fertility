/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, Clinic, Treatment } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Anjali Sharma',
    specialty: 'Senior Fertility Specialist',
    experience: '15+ Years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.9,
    location: 'Mumbai, Colaba',
    bio: 'Expert in complex IVF cases and recurrent pregnancy loss.'
  },
  {
    id: '2',
    name: 'Dr. Vikram Malhotra',
    specialty: 'Reproductive Endocrinologist',
    experience: '12+ Years',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.8,
    location: 'Delhi, South Ex',
    bio: 'Specializes in male infertility and advanced andrology.'
  },
  {
    id: '3',
    name: 'Dr. Priya Iyer',
    specialty: 'Gynaecologist & IVF Expert',
    experience: '10+ Years',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.7,
    location: 'Bangalore, Indiranagar',
    bio: 'Passionate about patient-centric care and holistic fertility treatments.'
  }
];

export const CLINICS: Clinic[] = [
  {
    id: 'c1',
    name: 'Nova IVF Mumbai Central',
    city: 'Mumbai',
    address: '123, Marine Drive, Mumbai - 400001',
    phone: '+91 22 1234 5678',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
    id: 'c2',
    name: 'Nova IVF Delhi South',
    city: 'Delhi',
    address: '45, South Extension Part II, New Delhi - 110049',
    phone: '+91 11 8765 4321',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800&h=400'
  }
];

export const ASSETS = {
  BABY_HERO: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=1200&h=1000',
  BABY_CTA: 'https://images.unsplash.com/photo-1544126592-807daa2b565b?auto=format&fit=crop&q=80&w=2000&h=1200'
};

export const TREATMENTS: Treatment[] = [
  {
    id: 'ivf',
    title: 'In-Vitro Fertilisation (IVF)',
    description: 'The most effective form of assisted reproductive technology.',
    icon: 'Baby',
    successRate: '65-75%'
  },
  {
    id: 'icsi',
    title: 'ICSI Treatment',
    description: 'Specialized IVF for male factor infertility.',
    icon: 'Microscope',
    successRate: '70-80%'
  },
  {
    id: 'iui',
    title: 'IUI Treatment',
    description: 'Simple procedure that places sperm directly inside the uterus.',
    icon: 'Syringe',
    successRate: '15-20%'
  },
  {
    id: 'egg-freezing',
    title: 'Egg Freezing',
    description: 'Preserve your fertility for the future.',
    icon: 'Snowflake',
    successRate: 'N/A'
  }
];
