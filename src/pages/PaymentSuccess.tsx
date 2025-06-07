import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, Calendar, X } from 'lucide-react';
import { paymentService } from '../services/paymentService';
import { PaymentResponse } from '../types/payment';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentId) {
        setError('Не указан ID платежа');
        setIsLoading(false);
        return;
      }

      try {
        const payment = await paymentService.getPaymentStatus(paymentId);
        setPaymentData(payment);
      } catch (err) {
        console.error('Error verifying payment:', err);
        setError('Не удалось проверить статус платежа');
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [paymentId]);

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

  if (error || !paymentData) {
    return (
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <X className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-primary mb-4">
            Ошибка проверки платежа
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'Не удалось найти информацию о платеже. Пожалуйста, обратитесь в поддержку.'}
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

  const isSuccessful = paymentData.status === 'SUCCEEDED';

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
            className={`rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center ${
              isSuccessful ? 'bg-green-100' : 'bg-yellow-100'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className={`h-12 w-12 ${isSuccessful ? 'text-green-600' : 'text-yellow-600'}`} />
          </motion.div>

          <h1 className="font-playfair text-3xl font-bold text-primary mb-4">
            {isSuccessful ? 'Оплата прошла успешно!' : 'Платеж обрабатывается'}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {isSuccessful 
              ? 'Спасибо за покупку! Ваш платеж обработан, и доступ к курсу уже активирован.'
              : 'Ваш платеж находится в обработке. Доступ к курсу будет предоставлен после подтверждения оплаты.'
            }
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-primary mb-4">Детали платежа:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Номер платежа:</span>
                <span className="font-mono">{paymentData.yookassaPaymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Сумма:</span>
                <span className="font-semibold">
                  {paymentData.amount.toLocaleString()} ₽
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Курс:</span>
                <span>{paymentData.courseName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Статус:</span>
                <span className={`font-semibold ${
                  isSuccessful ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {paymentData.status === 'SUCCEEDED' ? 'Оплачено' : 'В обработке'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Дата:</span>
                <span>{new Date(paymentData.createdAt).toLocaleDateString('ru-RU')}</span>
              </div>
            </div>
          </div>

          {isSuccessful && (
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
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center space-x-2 bg-accent text-white px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
            >
              <span>{isSuccessful ? 'Перейти к обучению' : 'Личный кабинет'}</span>
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