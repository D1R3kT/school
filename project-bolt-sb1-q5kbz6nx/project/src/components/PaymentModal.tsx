import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';
import { Course } from '../types/payment';
import { paymentService } from '../services/paymentService';
import { usePayment } from '../context/PaymentContext';
import { useAuth } from '../context/AuthContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, course }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addPayment } = usePayment();
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!user) {
      setError('Необходимо войти в систему для оплаты');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // В реальном приложении здесь будет вызов к вашему серверу
      const paymentData = {
        amount: {
          value: course.price.toString(),
          currency: 'RUB'
        },
        confirmation: {
          type: 'redirect' as const,
          return_url: `${window.location.origin}/payment/success`
        },
        capture: true,
        description: `Оплата курса "${course.title}"`,
        metadata: {
          course_id: course.id,
          user_id: user.id,
          user_email: user.email
        }
      };

      // Для демо используем симуляцию
      const payment = await paymentService.simulatePayment(course.id, course.price);
      
      // Добавляем платеж в контекст
      addPayment({
        id: payment.id,
        status: 'processing',
        course_id: course.id,
        amount: course.price,
        created_at: payment.created_at,
        updated_at: payment.created_at
      });

      // Перенаправляем на страницу оплаты
      window.location.href = payment.confirmation.confirmation_url;
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при создании платежа');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-2xl font-bold text-primary">
                Оплата курса
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-playfair text-xl font-semibold text-primary mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Стоимость:</span>
                <span className="font-bold text-2xl text-accent">
                  {course.price.toLocaleString()} ₽
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Безопасная оплата через ЮKassa</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
                <CreditCard className="h-4 w-4 text-blue-500" />
                <span>Принимаем карты Visa, MasterCard, МИР</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-orange-500" />
                <span>Доступ к курсу сразу после оплаты</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <motion.button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 bg-accent text-white py-3 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                whileHover={!isProcessing ? { scale: 1.02 } : {}}
                whileTap={!isProcessing ? { scale: 0.98 } : {}}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Обработка...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    <span>Оплатить</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;