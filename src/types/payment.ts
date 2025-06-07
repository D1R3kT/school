export interface PaymentRequest {
  courseId: number;
  amount: number;
  returnUrl?: string;
}

export interface PaymentResponse {
  id: number;
  yookassaPaymentId: string;
  courseName: string;
  amount: number;
  status: 'PENDING' | 'WAITING_FOR_CAPTURE' | 'SUCCEEDED' | 'CANCELED' | 'FAILED';
  confirmationUrl?: string;
  createdAt: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  image: string;
  features: string[];
}

export interface PaymentStatus {
  id: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  course_id: string;
  amount: number;
  created_at: string;
  updated_at: string;
}