
export enum Category {
  CAR = 'Carro (B)',
  MOTORCYCLE = 'Moto (A)',
  TRUCK = 'Caminhão (C)',
  BUS = 'Ônibus (D)',
}

export interface Instructor {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  categories: Category[];
  city: string;
  bio: string;
  pricePerHour: number;
  verified: boolean;
}

export interface VideoLesson {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  description: string;
  url: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor';
}

export interface LessonBooking {
  id: string;
  instructorId: string;
  instructorName: string;
  studentId: string;
  date: string;
  hours: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed';
}
