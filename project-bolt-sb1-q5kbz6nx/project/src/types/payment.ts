export interface PaymentRequest {
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: 'redirect';
    return_url: string;
  };
  capture: boolean;
  description: string;
  metadata?: {
    course_id: string;
    user_id: string;
    user_email: string;
  };
}

export interface PaymentResponse {
  id: string;
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: 'redirect';
    confirmation_url: string;
  };
  created_at: string;
  description: string;
  metadata?: {
    course_id: string;
    user_id: string;
    user_email: string;
  };
  paid: boolean;
  refundable: boolean;
  test: boolean;
}

export interface Course {
  id: string;
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