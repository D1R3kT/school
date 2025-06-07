import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Users, Award, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.5, triggerOnce: true });
  const [galleryRef, galleryInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const heroWorks = [
    'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1988681/pexels-photo-1988681.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Учеников' },
    { icon: Award, value: '15', label: 'Лет опыта' },
    { icon: BookOpen, value: '12', label: 'Курсов' },
    { icon: Star, value: '4.9', label: 'Рейтинг' },
  ];

  const galleryImages = [
    'https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1340380/pexels-photo-1340380.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1246949/pexels-photo-1246949.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-brown/50 z-10" />
        
        {/* Background Carousel */}
        <div className="absolute inset-0 flex animate-parallax">
          {[...heroWorks, ...heroWorks].map((image, index) => (
            <div
              key={index}
              className="min-w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1
            className="font-playfair text-5xl md:text-7xl font-bold mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Творчество без границ
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Раскройте свой художественный потенциал в нашей школе искусств
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              to="/courses"
              className="bg-accent text-white px-8 py-3 rounded-full hover:bg-accent/90 transition-colors inline-flex items-center space-x-2"
            >
              <span>Выбрать курс</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/gallery"
              className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-primary transition-colors"
            >
              Посмотреть работы
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={aboutInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-playfair text-4xl font-bold text-primary mb-6">
                О нашей школе
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Наша художественная школа — это место, где талант встречается с мастерством. 
                Уже более 15 лет мы помогаем людям всех возрастов открывать в себе художника 
                и развивать творческие способности.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Под руководством опытных преподавателей вы освоите различные техники живописи, 
                от классической акварели до современной цифровой иллюстрации.
              </p>
              <Link
                to="/teachers"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-semibold"
              >
                <span>Познакомиться с преподавателями</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              animate={aboutInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/3779432/pexels-photo-3779432.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Студия"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm">Довольных учеников</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center text-white"
                initial={{ y: 50, opacity: 0 }}
                animate={statsInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <stat.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                <div className="text-3xl font-bold font-playfair mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section ref={galleryRef} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={galleryInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
              Работы наших учеников
            </h2>
            <p className="text-lg text-gray-600">
              Вдохновляющие произведения, созданные в стенах нашей школы
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative group overflow-hidden rounded-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={galleryInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image}
                  alt={`Работа ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center space-x-2 bg-accent text-white px-8 py-3 rounded-full hover:bg-accent/90 transition-colors"
            >
              <span>Посмотреть всю галерею</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;