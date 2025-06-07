import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Users, Award, ArrowRight, CreditCard } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
import { Course } from '../types/payment';

const Courses: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Акварельная живопись',
      description: 'Изучите основы акварельной техники, от простых упражнений до сложных композиций.',
      image: 'https://images.pexels.com/photos/1646311/pexels-photo-1646311.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '8 недель',
      level: 'Начинающий',
      price: 15000,
      features: ['Основы цветоведения', 'Техники наложения', 'Пейзажная живопись', 'Ботаническая иллюстрация']
    },
    {
      id: '2',
      title: 'Масляная живопись',
      description: 'Освойте классическую технику масляной живописи и создавайте настоящие шедевры.',
      image: 'https://images.pexels.com/photos/1332988/pexels-photo-1332988.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '12 недель',
      level: 'Средний',
      price: 22000,
      features: ['История масляной живописи', 'Подготовка холста', 'Портретная живопись', 'Натюрморт']
    },
    {
      id: '3',
      title: 'Цифровая иллюстрация',
      description: 'Современное искусство в цифровом формате. Изучите Photoshop и создавайте цифровые шедевры.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '10 недель',
      level: 'Все уровни',
      price: 18000,
      features: ['Основы Photoshop', 'Концепт-арт', 'Иллюстрация персонажей', 'Цифровая живопись']
    },
    {
      id: '4',
      title: 'Графика и рисунок',
      description: 'Основа всех видов изобразительного искусства. Изучите академический рисунок.',
      image: 'https://images.pexels.com/photos/1070981/pexels-photo-1070981.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '6 недель',
      level: 'Начинающий',
      price: 12000,
      features: ['Построение композиции', 'Штриховка и тонирование', 'Портрет', 'Анатомический рисунок']
    },
    {
      id: '5',
      title: 'Пастельная живопись',
      description: 'Мягкая и выразительная техника пастели для создания нежных и ярких работ.',
      image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '8 недель',
      level: 'Средний',
      price: 16000,
      features: ['Сухая пастель', 'Масляная пастель', 'Портретная техника', 'Пейзажи пастелью']
    },
    {
      id: '6',
      title: 'Каллиграфия',
      description: 'Искусство красивого письма. Изучите различные каллиграфические стили.',
      image: 'https://images.pexels.com/photos/1470168/pexels-photo-1470168.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '6 недель',
      level: 'Начинающий',
      price: 10000,
      features: ['Латинская каллиграфия', 'Кириллица', 'Современные стили', 'Декоративные элементы']
    },
  ];

  const handleEnrollClick = (course: Course) => {
    setSelectedCourse(course);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <motion.div
      className="min-h-screen pt-16 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-5xl font-bold text-primary mb-6">
              Наши курсы
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Выберите направление, которое вам близко, и начните свой творческий путь 
              под руководством опытных преподавателей
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section ref={ref} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                initial={{ y: 50, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {course.level}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-playfair text-2xl font-bold text-primary mb-3">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Группа до 12 человек</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-primary mb-2">Вы изучите:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {course.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Award className="h-3 w-3 text-accent mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {course.features.length > 3 && (
                        <li className="text-accent text-xs">
                          +{course.features.length - 3} дополнительных тем
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-accent">
                        {course.price.toLocaleString()} ₽
                      </span>
                    </div>
                    <motion.button
                      onClick={() => handleEnrollClick(course)}
                      className="bg-accent text-white px-6 py-2 rounded-full hover:bg-accent/90 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Записаться</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl font-bold mb-6">
              Не нашли подходящий курс?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Свяжитесь с нами, и мы поможем подобрать индивидуальную программу обучения
            </p>
            <motion.button
              className="bg-accent text-white px-8 py-3 rounded-full hover:bg-accent/90 transition-colors text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Получить консультацию
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Payment Modal */}
      {selectedCourse && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={handleClosePaymentModal}
          course={selectedCourse}
        />
      )}
    </motion.div>
  );
};

export default Courses;