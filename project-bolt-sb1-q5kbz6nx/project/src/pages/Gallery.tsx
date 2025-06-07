import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Eye, Heart, Download, Filter } from 'lucide-react';

const Gallery: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const categories = ['Все работы', 'Акварель', 'Масло', 'Графика', 'Цифровая живопись', 'Пастель'];
  
  const artworks = [
    {
      id: 1,
      title: 'Летний пейзаж',
      artist: 'Анна Петрова',
      category: 'Акварель',
      image: 'https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 24,
      views: 156,
    },
    {
      id: 2,
      title: 'Портрет девушки',
      artist: 'Михаил Иванов',
      category: 'Масло',
      image: 'https://images.pexels.com/photos/1340380/pexels-photo-1340380.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 31,
      views: 203,
    },
    {
      id: 3,
      title: 'Городская зарисовка',
      artist: 'Елена Смирнова',
      category: 'Графика',
      image: 'https://images.pexels.com/photos/1246949/pexels-photo-1246949.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 18,
      views: 142,
    },
    {
      id: 4,
      title: 'Цветочная композиция',
      artist: 'Ольга Козлова',
      category: 'Пастель',
      image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 27,
      views: 189,
    },
    {
      id: 5,
      title: 'Морской берег',
      artist: 'Дмитрий Волков',
      category: 'Акварель',
      image: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 35,
      views: 267,
    },
    {
      id: 6,
      title: 'Фантастический мир',
      artist: 'Мария Новикова',
      category: 'Цифровая живопись',
      image: 'https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 42,
      views: 312,
    },
    {
      id: 7,
      title: 'Натюрморт с фруктами',
      artist: 'Александр Белов',
      category: 'Масло',
      image: 'https://images.pexels.com/photos/1070981/pexels-photo-1070981.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 29,
      views: 198,
    },
    {
      id: 8,
      title: 'Архитектурный этюд',
      artist: 'Татьяна Орлова',
      category: 'Графика',
      image: 'https://images.pexels.com/photos/1646311/pexels-photo-1646311.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 22,
      views: 174,
    },
    {
      id: 9,
      title: 'Закат в горах',
      artist: 'Игорь Соколов',
      category: 'Пастель',
      image: 'https://images.pexels.com/photos/1332988/pexels-photo-1332988.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 38,
      views: 245,
    },
  ];

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
              Галерея работ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Вдохновляющие произведения наших талантливых учеников, 
              созданные в процессе обучения в различных техниках
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  index === 0 
                    ? 'bg-accent text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-accent hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={ref} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                initial={{ y: 50, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{artwork.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">{artwork.views}</span>
                          </div>
                        </div>
                        <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {artwork.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Автор: {artwork.artist}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{artwork.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{artwork.views}</span>
                      </div>
                    </div>
                    <button className="text-accent hover:text-accent/80 font-semibold">
                      Подробнее
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-12 text-center">
        <motion.button
          className="bg-accent text-white px-8 py-3 rounded-full hover:bg-accent/90 transition-colors font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Загрузить еще работы
        </motion.button>
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
              Хотите создать такие же шедевры?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Присоединяйтесь к нашим курсам и раскройте свой творческий потенциал
            </p>
            <motion.button
              className="bg-accent text-white px-8 py-3 rounded-full hover:bg-accent/90 transition-colors text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Записаться на курс
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Gallery;