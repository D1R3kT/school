import { PaymentRequest, PaymentResponse, PaymentStatus } from '../types/payment';

const YOOKASSA_API_URL = 'https://api.yookassa.ru/v3';

// В реальном приложении эти данные должны храниться в переменных окружения на сервере
const SHOP_ID = import.meta.env.VITE_YOOKASSA_SHOP_ID || 'demo_shop_id';
const SECRET_KEY = import.meta.env.VITE_YOOKASSA_SECRET_KEY || 'demo_secret_key';

class PaymentService {
  private getAuthHeaders() {
    const credentials = btoa(`${SHOP_ID}:${SECRET_KEY}`);
    return {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
      'Idempotence-Key': this.generateIdempotenceKey(),
    };
  }

  private generateIdempotenceKey(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  async createPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${YOOKASSA_API_URL}/payments`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Payment creation failed: ${errorData.description || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${YOOKASSA_API_URL}/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${SHOP_ID}:${SECRET_KEY}`)}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get payment status: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting payment status:', error);
      throw error;
    }
  }

  async capturePayment(paymentId: string, amount?: { value: string; currency: string }): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${YOOKASSA_API_URL}/payments/${paymentId}/capture`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(amount ? { amount } : {}),
      });

      if (!response.ok) {
        throw new Error(`Failed to capture payment: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error capturing payment:', error);
      throw error;
    }
  }

  async cancelPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${YOOKASSA_API_URL}/payments/${paymentId}/cancel`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel payment: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error canceling payment:', error);
      throw error;
    }
  }

  // Симуляция для демо-версии (в реальном приложении это будет обрабатываться на сервере)
  async simulatePayment(courseId: string, amount: number): Promise<PaymentResponse> {
    // Имитация задержки API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const paymentId = 'demo_' + Date.now().toString();
    
    return {
      id: paymentId,
      status: 'pending',
      amount: {
        value: amount.toString(),
        currency: 'RUB'
      },
      confirmation: {
        type: 'redirect',
        confirmation_url: `${window.location.origin}/payment/success?payment_id=${paymentId}`
      },
      created_at: new Date().toISOString(),
      description: `Оплата курса ${courseId}`,
      metadata: {
        course_id: courseId,
        user_id: 'demo_user',
        user_email: 'demo@example.com'
      },
      paid: false,
      refundable: true,
      test: true
    };
  }
}

export const paymentService = new PaymentService();