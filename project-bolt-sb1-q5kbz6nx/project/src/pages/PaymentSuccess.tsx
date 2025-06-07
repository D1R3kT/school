import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, Calendar } from 'lucide-react';
import { paymentService } from '../services/paymentService';
import { usePayment } from '../context/PaymentContext';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);
  const { updatePaymentStatus } = usePayment();

  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentId) {
        setIsLoading(false);
        return;
      }

      try {
        // В реальном приложении здесь будет проверка статуса платежа
        // const payment = await paymentService.getPaymentStatus(paymentId);
        
        // Для демо симулируем успешный платеж
        const mockPayment = {
          id: paymentId,
          status: 'succeeded',
          amount: { value: '15000', currency: 'RUB' },
          description: 'Оплата курса "Акварельная живопись"',
          metadata: {
            course_id: '1',
            user_id: 'demo_user',
            user_email: 'demo@example.com'
          },
          paid: true,
          created_at: new Date().toISOString()
        };

        setPaymentData(mockPayment);
        updatePaymentStatus(paymentId, 'succeeded');
      } catch (error) {
        console.error('Error verifying payment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [paymentId, updatePaymentStatus]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Проверяем статус платежа...</p>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <X className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-primary mb-4">
            Платеж не найден
          </h1>
          <p className="text-gray-600 mb-6">
            Не удалось найти информацию о платеже. Пожалуйста, обратитесь в поддержку.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
          >
            <span>На главную</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen pt-16 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="h-12 w-12 text-green-600" />
          </motion.div>

          <h1 className="font-playfair text-3xl font-bold text-primary mb-4">
            Оплата прошла успешно!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Спасибо за покупку! Ваш платеж обработан, и доступ к курсу уже активирован.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-primary mb-4">Детали платежа:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Номер платежа:</span>
                <span className="font-mono">{paymentData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Сумма:</span>
                <span className="font-semibold">
                  {parseInt(paymentData.amount.value).toLocaleString()} ₽
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Курс:</span>
                <span>{paymentData.description.replace('Оплата курса ', '')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Дата:</span>
                <span>{new Date(paymentData.created_at).toLocaleDateString('ru-RU')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              className="bg-accent/10 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
            >
              <Calendar className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-semibold text-primary">Доступ открыт</p>
              <p className="text-xs text-gray-600">Сразу после оплаты</p>
            </motion.div>
            
            <motion.div
              className="bg-accent/10 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
            >
              <Download className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-semibold text-primary">Материалы</p>
              <p className="text-xs text-gray-600">Скачайте в кабинете</p>
            </motion.div>
            
            <motion.div
              className="bg-accent/10 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
            >
              <CheckCircle className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-semibold text-primary">Сертификат</p>
              <p className="text-xs text-gray-600">После завершения</p>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center space-x-2 bg-accent text-white px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
            >
              <span>Перейти к обучению</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <Link
              to="/courses"
              className="inline-flex items-center justify-center space-x-2 border-2 border-accent text-accent px-6 py-3 rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              <span>Другие курсы</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PaymentSuccess;