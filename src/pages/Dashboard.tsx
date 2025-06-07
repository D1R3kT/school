import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Upload, Award, Calendar, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { paymentService } from '../services/paymentService';
import { PaymentResponse } from '../types/payment';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [payments, setPayments] = useState<PaymentResponse[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (isAuthenticated) {
      fetchUserPayments();
    }
  }, [isAuthenticated, loading, navigate]);

  const fetchUserPayments = async () => {
    try {
      const userPayments = await paymentService.getUserPayments();
      setPayments(userPayments);
    } catch (error) {
      console.error('Error fetching user payments:', error);
    } finally {
      setPaymentsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const successfulPayments = payments.filter(p => p.status === 'SUCCEEDED');
  const achievements = [
    { name: 'Первая работа', icon: Award, completed: successfulPayments.length > 0 },
    { name: 'Студент', icon: Award, completed: successfulPayments.length >= 1 },
    { name: 'Активный ученик', icon: Award, completed: successfulPayments.length >= 3 },
  ];

  return (
    <motion.div
      className="min-h-screen pt-16 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-3xl font-bold text-primary mb-2">
            Добро пожаловать, {user.name}!
          </h1>
          <p className="text-gray-600">Ваш творческий путь продолжается</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Courses */}
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-playfair text-2xl font-semibold text-primary mb-6 flex items-center">
                <BookOpen className="h-6 w-6 text-accent mr-2" />
                Мои курсы
              </h2>
              
              {paymentsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent mx-auto mb-4" />
                  <p className="text-gray-600">Загружаем ваши курсы...</p>
                </div>
              ) : successfulPayments.length > 0 ? (
                <div className="space-y-4">
                  {successfulPayments.map((payment, index) => (
                    <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-primary">{payment.courseName}</h3>
                        <span className="text-sm text-green-600 font-semibold">Оплачено</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: '0%' }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Начните обучение</span>
                        <div className="flex items-center text-accent">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(payment.createdAt).toLocaleDateString('ru-RU')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">У вас пока нет активных курсов</p>
                  <button
                    onClick={() => navigate('/courses')}
                    className="bg-accent text-white px-6 py-2 rounded-full hover:bg-accent/90 transition-colors"
                  >
                    Выбрать курс
                  </button>
                </div>
              )}
            </motion.div>

            {/* Portfolio */}
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-playfair text-2xl font-semibold text-primary mb-6 flex items-center">
                <Upload className="h-6 w-6 text-accent mr-2" />
                Мое портфолио
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                ))}
              </div>
              <button className="w-full border-2 border-dashed border-accent text-accent py-3 rounded-lg hover:bg-accent/5 transition-colors">
                Загрузить новую работу
              </button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-white" />
                  )}
                </div>
                <h3 className="font-semibold text-primary">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {user.role === 'STUDENT' ? 'Студент' : 
                   user.role === 'TEACHER' ? 'Преподаватель' : 'Администратор'}
                </p>
                <button className="mt-4 flex items-center justify-center w-full py-2 text-accent hover:bg-accent/5 rounded-lg transition-colors">
                  <Settings className="h-4 w-4 mr-2" />
                  Настройки профиля
                </button>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-playfair text-xl font-semibold text-primary mb-4">
                Достижения
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      achievement.completed ? 'bg-accent/10' : 'bg-gray-50'
                    }`}
                  >
                    <achievement.icon
                      className={`h-5 w-5 ${
                        achievement.completed ? 'text-accent' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        achievement.completed ? 'text-primary' : 'text-gray-500'
                      }`}
                    >
                      {achievement.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Payment History */}
            {payments.length > 0 && (
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-playfair text-xl font-semibold text-primary mb-4">
                  История платежей
                </h3>
                <div className="space-y-2">
                  {payments.slice(0, 3).map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 truncate">{payment.courseName}</span>
                      <span className={`font-semibold ${
                        payment.status === 'SUCCEEDED' ? 'text-green-600' : 
                        payment.status === 'PENDING' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {payment.status === 'SUCCEEDED' ? 'Оплачено' :
                         payment.status === 'PENDING' ? 'В обработке' : 'Ошибка'}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;