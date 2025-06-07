import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, BookOpen, Star, Users, Mail, Phone } from 'lucide-react';

const Teachers: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const teachers = [
    {
      id: 1,
      name: 'Елена Васильевна Смирнова',
      title: 'Преподаватель акварельной живописи',
      image: 'https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=500',
      experience: '15 лет',
      students: '200+',
      specialties: ['Акварель', 'Ботаническая иллюстрация', 'Пейзаж'],
      education: 'Московский художественный институт имени Сурикова',
      bio: 'Мастер акварельной техники, лауреат международных конкурсов. Специализируется на реалистичной живописи и ботанической иллюстрации. Ее работы находятся в частных коллекциях по всему миру.',
      achievements: ['Лауреат премии "Золотая кисть" 2020', 'Участник 25+ международных выставок', 'Автор методики "Живая акварель"'],
      email: 'e.smirnova@artschool.ru',
      phone: '+7 (495) 123-45-67'
    },
    {
      id: 2,
      name: 'Александр Петрович Волков',
      title: 'Мастер масляной живописи',
      image: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=500',
      experience: '22 года',
      students: '150+',
      specialties: ['Масляная живопись', 'Портрет', 'Классическая техника'],
      education: 'Санкт-Петербургская Академия художеств',
      bio: 'Виртуозный портретист, продолжатель традиций русской реалистической школы. Его портреты отличаются психологической глубиной и технической безупречностью.',
      achievements: ['Член Союза художников России', 'Персональные выставки в 12 городах', 'Реставратор произведений XVIII-XIX веков'],
      email: 'a.volkov@artschool.ru',
      phone: '+7 (495) 123-45-68'
    },
    {
      id: 3,
      name: 'Мария Андреевна Новикова',
      title: 'Специалист по цифровой иллюстрации',
      image: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=500',
      experience: '8 лет',
      students: '300+',
      specialties: ['Цифровая живопись', 'Концепт-арт', 'Анимация'],
      education: 'ВГИК, факультет анимации и мультимедиа',
      bio: 'Ведущий цифровой художник, работавший над проектами для крупнейших игровых студий. Специализируется на концепт-арте и обучении современным цифровым техникам.',
      achievements: ['Арт-директор 15+ игровых проектов', 'Спикер на конференциях CG Event', 'Разработчик онлайн-курсов по Photoshop'],
      email: 'm.novikova@artschool.ru',
      phone: '+7 (495) 123-45-69'
    },
    {
      id: 4,
      name: 'Дмитрий Сергеевич Козлов',
      title: 'Преподаватель академического рисунка',
      image: 'https://images.pexels.com/photos/8867627/pexels-photo-8867627.jpeg?auto=compress&cs=tinysrgb&w=500',
      experience: '18 лет',
      students: '400+',
      specialties: ['Академический рисунок', 'Анатомия', 'Композиция'],
      education: 'Московская государственная художественно-промышленная академия',
      bio: 'Эксперт в области академического рисунка и анатомии. Его методика обучения основам изобразительного искусства признана одной из лучших в России.',
      achievements: ['Автор учебника "Основы рисунка"', '10+ лет преподавания в ВУЗах', 'Научный руководитель 50+ дипломных работ'],
      email: 'd.kozlov@artschool.ru',
      phone: '+7 (495) 123-45-70'
    },
    {
      id: 5,
      name: 'Анна Игоревна Белова',
      title: 'Мастер пастельной живописи',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=500',
      experience: '12 лет',
      students: '180+',
      specialties: ['Пастель', 'Портретная живопись', 'Пленэр'],
      education: 'Российская академия живописи, ваяния и зодчества',
      bio: 'Мастер пастельной техники, известная своими лирическими портретами и пейзажами. Регулярно проводит пленэрные мастер-классы.',
      achievements: ['Золотая медаль Академии художеств', 'Участник биеннале в Венеции', 'Основатель пленэрной школы "Краски природы"'],
      email: 'a.belova@artschool.ru',
      phone: '+7 (495) 123-45-71'
    },
    {
      id: 6,
      name: 'Сергей Николаевич Морозов',
      title: 'Каллиграф и леттеринг-художник',
      image: 'https://images.pexels.com/photos/8867286/pexels-photo-8867286.jpeg?auto=compress&cs=tinysrgb&w=500',
      experience: '10 лет',
      students: '120+',
      specialties: ['Каллиграфия', 'Леттеринг', 'Типографика'],
      education: 'Московский полиграфический институт',
      bio: 'Мастер современной каллиграфии и леттеринга. Создает уникальные шрифтовые композиции для брендов и художественных проектов.',
      achievements: ['Дизайнер шрифтов для 20+ брендов', 'Автор книги "Искусство красивого письма"', 'Основатель студии каллиграфии'],
      email: 's.morozov@artschool.ru',
      phone: '+7 (495) 123-45-72'
    },
  ];

  return (
    <motion.div
      className="min-h-screen pt-16 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-5xl font-bold text-primary mb-6">
              Наши преподаватели
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Опытные мастера и признанные эксперты в области изобразительного искусства, 
              которые помогут вам раскрыть творческий потенциал
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-accent" />
                <span className="text-primary font-semibold">85+ лет общего опыта</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-accent" />
                <span className="text-primary font-semibold">1200+ выпускников</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-6 w-6 text-accent" />
                <span className="text-primary font-semibold">Международное признание</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section ref={ref} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                initial={{ y: 50, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <motion.button
                        className="bg-accent text-white p-2 rounded-full hover:bg-accent/90"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Mail className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        className="bg-accent text-white p-2 rounded-full hover:bg-accent/90"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Phone className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                    {teacher.name}
                  </h3>
                  <p className="text-accent font-semibold mb-3">{teacher.title}</p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{teacher.experience}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{teacher.students}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {teacher.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {teacher.bio}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-primary text-sm mb-2">Образование:</h4>
                    <p className="text-gray-600 text-xs">{teacher.education}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-primary text-sm mb-2">Достижения:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {teacher.achievements.slice(0, 2).map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <Star className="h-3 w-3 text-accent mr-1 flex-shrink-0 mt-0.5" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition-colors text-sm font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Записаться на курс
                  </motion.button>
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
              Хотите стать частью нашей творческой семьи?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Наши преподаватели готовы поделиться знаниями и помочь вам достичь новых высот в искусстве
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-accent text-white px-8 py-3 rounded-full hover:bg-accent/90 transition-colors font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Записаться на пробное занятие
              </motion.button>
              <motion.button
                className="border-2 border-accent text-accent px-8 py-3 rounded-full hover:bg-accent hover:text-white transition-colors font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Задать вопрос преподавателю
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Teachers;