import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, Palette } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Главная', path: '/' },
    { name: 'Курсы', path: '/courses' },
    { name: 'Преподаватели', path: '/teachers' },
    { name: 'Галерея', path: '/gallery' },
    { name: 'Отзывы', path: '/reviews' },
    { name: 'Контакты', path: '/contact' },
  ];

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Palette className="h-8 w-8 text-accent" />
            <span className="font-playfair font-bold text-xl text-primary">
              АртШкола
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-primary hover:text-accent transition-colors duration-200 ${
                  location.pathname === item.path ? 'text-accent' : ''
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAuthClick}
                  className="flex items-center space-x-2 text-primary hover:text-accent transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.name}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-primary hover:text-accent transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <motion.button
                onClick={handleAuthClick}
                className="bg-accent text-white px-6 py-2 rounded-full hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Войти
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 text-primary hover:text-accent transition-colors ${
                  location.pathname === item.path ? 'text-accent' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t pt-2">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleAuthClick();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-primary hover:text-accent transition-colors"
                  >
                    Личный кабинет
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-primary hover:text-accent transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleAuthClick();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-accent font-medium"
                >
                  Войти
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;