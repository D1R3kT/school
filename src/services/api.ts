const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return this.handleResponse(response);
  }

  async register(name: string, email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    return this.handleResponse(response);
  }

  // Courses endpoints
  async getCourses() {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getCourse(id: string) {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getCoursesByLevel(level: string) {
    const response = await fetch(`${API_BASE_URL}/courses/level/${level}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // User endpoints
  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Payment endpoints
  async createPayment(courseId: string, amount: number, returnUrl?: string) {
    const response = await fetch(`${API_BASE_URL}/payments/create`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        courseId: parseInt(courseId),
        amount,
        returnUrl: returnUrl || `${window.location.origin}/payment/success`,
      }),
    });
    return this.handleResponse(response);
  }

  async getUserPayments() {
    const response = await fetch(`${API_BASE_URL}/payments/user`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getPayment(yookassaPaymentId: string) {
    const response = await fetch(`${API_BASE_URL}/payments/${yookassaPaymentId}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();