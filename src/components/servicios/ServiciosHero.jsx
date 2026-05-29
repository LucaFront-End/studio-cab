import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Home as HomeIcon, Hammer, Package } from 'lucide-react';
import AnimatedText from '../shared/AnimatedText';
import heroImg from '../../assets/images/hero-restaurant.png';
import './ServiciosHero.css';

export default function ServiciosHero() {
  const handleQuickNav = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update hash in URL
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section className="servicios-hero">
      {/* Background Parallax */}
      <div className="servicios-hero__bg">
        <img src={heroImg} alt="" aria-hidden="true" />
        <div className="servicios-hero__overlay" />
      </div>

      <div className="servicios-hero__content container">
        {/* Breadcrumb */}
        <motion.div
          className="servicios-hero__breadcrumb"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/">Inicio</Link>
          <span className="servicios-hero__breadcrumb-sep">/</span>
          <span className="servicios-hero__breadcrumb-active">Servicios</span>
        </motion.div>

        {/* Title */}
        <AnimatedText
          text="Nuestros Servicios"
          tag="h1"
          className="servicios-hero__title text-gradient"
          delay={0.4}
        />

        {/* Description */}
        <motion.p
          className="servicios-hero__desc"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Soluciones integrales de diseño conceptual, fabricación en taller e instalación final para espacios comerciales y residenciales de alta gama.
        </motion.p>

        {/* Quick Nav Anchors */}
        <motion.div
          className="servicios-hero__nav"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <a 
            href="#comercial" 
            onClick={(e) => handleQuickNav(e, 'comercial')}
            className="servicios-hero__nav-item"
            data-cursor="pointer"
          >
            <Building2 size={16} strokeWidth={1.5} className="servicios-hero__nav-icon" />
            <span>Comercial</span>
          </a>
          <a 
            href="#residencial" 
            onClick={(e) => handleQuickNav(e, 'residencial')}
            className="servicios-hero__nav-item"
            data-cursor="pointer"
          >
            <HomeIcon size={16} strokeWidth={1.5} className="servicios-hero__nav-icon" />
            <span>Residencial</span>
          </a>
          <a 
            href="#carpinteria" 
            onClick={(e) => handleQuickNav(e, 'carpinteria')}
            className="servicios-hero__nav-item"
            data-cursor="pointer"
          >
            <Hammer size={16} strokeWidth={1.5} className="servicios-hero__nav-icon" />
            <span>Carpintería</span>
          </a>
          <a 
            href="#produccion" 
            onClick={(e) => handleQuickNav(e, 'produccion')}
            className="servicios-hero__nav-item"
            data-cursor="pointer"
          >
            <Package size={16} strokeWidth={1.5} className="servicios-hero__nav-icon" />
            <span>Producción</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
