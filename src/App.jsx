import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import ScrollProgress from './components/shared/ScrollProgress';
import WhatsAppButton from './components/shared/WhatsAppButton';
import Preloader from './components/shared/Preloader';
import CustomCursor from './components/shared/CustomCursor';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import DetalleServicio from './pages/DetalleServicio';

// Animated Route Wrapper to ensure seamless full-page fades
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="page-transition-wrapper"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/servicios" element={<PageWrapper><Servicios /></PageWrapper>} />
        <Route path="/servicios/:id" element={<PageWrapper><DetalleServicio /></PageWrapper>} />
        {/* Future pages */}
        <Route path="/proyectos" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/nosotros" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/contacto" element={<PageWrapper><Home /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <WhatsAppButton />
    </Router>
  );
}

