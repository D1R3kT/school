import React from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { XCircle, ArrowRight, RefreshCw, MessageCircle } from 'lucide-react';

const PaymentFailed: React.FC = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error') || 'Неизвестная ошибка';

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
            className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <XCircle className="h-12 w-12 text-red-600" />
          </motion.div>

          <h1 className="font-playfair text-3xl font-bold text-primary mb-4">
            Оплата не прошла
          </h1>
          
          <p className="text-gray-600 mb-6">
            К сожалению, при обработке платежа произошла ошибка. 
            Пожалуйста, попробуйте еще раз или обратитесь в поддержку.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">
              <strong>Причина:</strong> {error}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <RefreshCw className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-semibold text-primary mb-1">Попробуйте снова</p>
              <p className="text-xs text-gray-600">Возможно, это временная проблема</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <MessageCircle className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-semibold text-primary mb-1">Нужна помощь?</p>
              <p className="text-xs text-gray-600">Обратитесь в службу поддержки</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center space-x-2 bg-accent text-white px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Попробовать снова</span>
            </Link>
            
            <a
              href="mailto:support@artschool.ru"
              className="inline-flex items-center justify-center space-x-2 border-2 border-accent text-accent px-6 py-3 rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Связаться с поддержкой</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">
              Если проблема повторяется, попробуйте:
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Проверить данные карты</li>
              <li>• Убедиться в наличии средств на счете</li>
              <li>• Использовать другую карту или способ оплаты</li>
              <li>• Обратиться в банк для разблокировки операций</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PaymentFailed;