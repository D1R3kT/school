import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Teachers from './pages/Teachers';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Auth from './pages/Auth'; 
import Dashboard from './pages/Dashboard';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import { AuthProvider } from './context/AuthContext';
import { PaymentProvider } from './context/PaymentContext';

function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <Router>
          <div className="min-h-screen bg-background font-opensans">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/failed" element={<PaymentFailed />} />
              </Routes>
            </AnimatePresence>
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;