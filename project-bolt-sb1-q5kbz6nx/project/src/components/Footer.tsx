import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { 
      name: 'Telegram', 
      icon: MessageCircle, 
      url: 'https://t.me/artschool',
      color: 'hover:text-blue-500'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://instagram.com/artschool',
      color: 'hover:text-pink-500'
    },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="h-8 w-8 text-accent" />
              <span className="font-playfair font-bold text-xl">АртШкола</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Раскройте свой творческий потенциал в нашей художественной школе. 
              Профессиональные преподаватели, современные методики и атмосфера вдохновения.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-300 ${social.color} transition-colors`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              {['Курсы', 'Преподаватели', 'Галерея', 'Отзывы'].map((link) => (
                <li key={link}>
                  <a 
                    href={`/${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-gray-300">+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-gray-300">info@artschool.ru</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-gray-300">Москва, ул. Творческая, 15</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 АртШкола. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;