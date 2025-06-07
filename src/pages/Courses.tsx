import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Users, Award, CreditCard } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
import { Course } from '../types/course';
import { courseLevelLabels } from '../types/course';
import { apiService } from '../services/api';

const Courses: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await apiService.getCourses();
        setCourses(coursesData);
      } catch (err) {
        setError('Не удалось загрузить курсы');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnrollClick = (course: Course) => {
    const courseForModal = {
      id: course.id.toString(),
      title: course.title,
      description: course.description,
      price: course.price,
      duration: course.duration,
      level: courseLevelLabels[course.level],
      image: course.imageUrl,
      features: course.features,
    };
    setSelectedCourse(courseForModal as any);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Загружаем курсы...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-accent text-white px-6 py-2 rounded-full hover:bg-accent/90 transition-colors"
          >
            Попробовать снова
          </button>
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
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {courseLevelLabels[course.level]}
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