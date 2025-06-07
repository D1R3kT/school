import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PaymentStatus, Course } from '../types/payment';

interface PaymentContextType {
  payments: PaymentStatus[];
  isProcessing: boolean;
  addPayment: (payment: PaymentStatus) => void;
  updatePaymentStatus: (paymentId: string, status: PaymentStatus['status']) => void;
  getPaymentByCourse: (courseId: string) => PaymentStatus | undefined;
  clearPayments: () => void;
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
  const [payments, setPayments] = useState<PaymentStatus[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addPayment = (payment: PaymentStatus) => {
    setPayments(prev => [...prev, payment]);
  };

  const updatePaymentStatus = (paymentId: string, status: PaymentStatus['status']) => {
    setPayments(prev => 
      prev.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status, updated_at: new Date().toISOString() }
          : payment
      )
    );
  };

  const getPaymentByCourse = (courseId: string) => {
    return payments.find(payment => payment.course_id === courseId);
  };

  const clearPayments = () => {
    setPayments([]);
  };

  const value = {
    payments,
    isProcessing,
    addPayment,
    updatePaymentStatus,
    getPaymentByCourse,
    clearPayments,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};