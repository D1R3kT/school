import { apiService } from './api';
import { PaymentResponse } from '../types/payment';

class PaymentService {
  async createPayment(courseId: number, amount: number, returnUrl?: string): Promise<PaymentResponse> {
    try {
      return await apiService.createPayment(courseId.toString(), amount, returnUrl);
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  async getPaymentStatus(yookassaPaymentId: string): Promise<PaymentResponse> {
    try {
      return await apiService.getPayment(yookassaPaymentId);
    } catch (error) {
      console.error('Error getting payment status:', error);
      throw error;
    }
  }

  async getUserPayments(): Promise<PaymentResponse[]> {
    try {
      return await apiService.getUserPayments();
    } catch (error) {
      console.error('Error getting user payments:', error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService();