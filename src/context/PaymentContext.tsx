import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PaymentResponse } from '../types/payment';

interface PaymentContextType {
  payments: PaymentResponse[];
  isProcessing: boolean;
  addPayment: (payment: PaymentResponse) => void;
  updatePaymentStatus: (paymentId: string, status: PaymentResponse['status']) => void;
  getPaymentByCourse: (courseId: string) => PaymentResponse | undefined;
  clearPayments: () => void;
  setPayments: (payments: PaymentResponse[]) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [payments, setPaymentsState] = useState<PaymentResponse[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addPayment = (payment: PaymentResponse) => {
    setPaymentsState(prev => [...prev, payment]);
  };

  const updatePaymentStatus = (paymentId: string, status: PaymentResponse['status']) => {
    setPaymentsState(prev => 
      prev.map(payment => 
        payment.yookassaPaymentId === paymentId 
          ? { ...payment, status }
          : payment
      )
    );
  };

  const getPaymentByCourse = (courseId: string) => {
    return payments.find(payment => payment.id.toString() === courseId);
  };

  const clearPayments = () => {
    setPaymentsState([]);
  };

  const setPayments = (payments: PaymentResponse[]) => {
    setPaymentsState(payments);
  };

  const value = {
    payments,
    isProcessing,
    addPayment,
    updatePaymentStatus,
    getPaymentByCourse,
    clearPayments,
    setPayments,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};