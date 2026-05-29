import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from '../shared/AnimatedText';
import MagneticButton from '../shared/MagneticButton';
import heroImg from '../../assets/images/hero-restaurant.png';
import blueprintImg from '../../assets/images/hero-blueprint.png';
import './Hero.css';

const hotspots = [
  {
    id: 1,
    title: "Mobiliario sobre Diseño",
    desc: "Barras y contrabarras fabricadas a medida en nuestro taller de carpintería, asegurando acabados premium en madera de nogal y ensamble de alta precisión.",
    top: "68%",
    left: "28%",
    position: "top"
  },
  {
    id: 2,
    title: "Diseño Lumínico",
    desc: "Iluminación indirecta integrada en plafones y contrabarra, diseñada para resaltar las texturas naturales del espacio y crear una atmósfera sofisticada.",
    top: "22%",
    left: "48%",
    position: "bottom"
  },
  {
    id: 3,
    title: "Distribución Comercial",
    desc: "Layout estratégico optimizado para el flujo operativo de meseros y clientes, maximizando el aforo sin comprometer la comodidad ni la experiencia de marca.",
    top: "45%",
    left: "62%",
    position: "left"
  }
];

export default function Hero() {
  const containerRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  // Close active hotspot tooltip when clicking anywhere else
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeHotspot !== null && !e.target.closest('.hero__hotspot')) {
        setActiveHotspot(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeHotspot]);

  return (
    <section className="hero" id="hero">
      {/* Noise texture overlay */}
      <div className="hero__noise" />

      <div className="hero__container container">
        {/* Left Column: Brand Info Editorial Column */}
        <motion.div 
          className="hero__info"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__label">
            <span className="label label--pill">Diseño de Interiores • CDMX</span>
          </div>

          <motion.h1 
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Diseñamos espacios que <span className="hero__title-highlight">venden, conectan y generan experiencia.</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Studio CAB | Diseño de Interiores | Carpintería y Muebles sobre Diseño en CDMX y Área Metropolitana. Especializados en diseño comercial estratégico y residencial de alta gama.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <MagneticButton strength={0.15} range={25}>
              <Link to="/contacto" className="btn-premium btn-premium-primary" data-cursor="pointer">
                <span>Cotizar Proyecto</span>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.15} range={25}>
              <Link to="/contacto" className="btn-premium btn-premium-outline" data-cursor="pointer">
                <span>Agenda una Asesoría</span>
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive Showcase */}
        <motion.div 
          className="hero__showcase"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__slider-instruction">
            <span>Arrastra la barra para revelar el diseño técnico</span>
          </div>

          <div 
            ref={containerRef}
            className="hero__slider-container"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* Lado Derecho: Realidad (Fondo completo) */}
            <div className="hero__image-wrapper hero__image-wrapper--real">
              <img 
                src={heroImg} 
                alt="Proyecto finalizado por Studio CAB" 
                draggable="false"
              />
            </div>

            {/* Lado Izquierdo: Plano Técnico (Recortado por clip-path) */}
            <div 
              className="hero__image-wrapper hero__image-wrapper--blueprint"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img 
                src={blueprintImg} 
                alt="Plano técnico y render por Studio CAB" 
                draggable="false"
              />
              <div className="hero__blueprint-grid" />
            </div>

            {/* Deslizador (Handle) */}
            <div 
              className="hero__slider-divider"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              data-cursor="drag"
            >
              <div className="hero__slider-line" />
              <div className="hero__slider-handle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
                </svg>
              </div>
            </div>

            {/* Hotspots interactivos (se muestran si el sliderPosition es mayor a su left%) */}
            {hotspots.map((hotspot) => {
              const leftPercent = parseFloat(hotspot.left);
              const isVisible = sliderPosition > leftPercent;

              return (
                <div
                  key={hotspot.id}
                  className={`hero__hotspot ${activeHotspot === hotspot.id ? 'hero__hotspot--active' : ''}`}
                  style={{
                    top: hotspot.top,
                    left: hotspot.left,
                    opacity: isVisible ? 1 : 0,
                    pointerEvents: isVisible ? 'auto' : 'none',
                    transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id);
                  }}
                  onMouseEnter={() => {
                    if (window.innerWidth >= 1024) setActiveHotspot(hotspot.id);
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth >= 1024) setActiveHotspot(null);
                  }}
                >
                  <div className="hero__hotspot-dot">
                    <div className="hero__hotspot-pulse" />
                  </div>

                  {/* Tooltip Card */}
                  <AnimatePresence>
                    {activeHotspot === hotspot.id && (
                      <motion.div 
                        className={`hero__hotspot-tooltip hero__hotspot-tooltip--${hotspot.position}`}
                        initial={{ opacity: 0, scale: 0.9, y: hotspot.position === 'top' ? -10 : 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        <h4>{hotspot.title}</h4>
                        <p>{hotspot.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Decorative side text strip */}
      <motion.div
        className="hero__side-text"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.25, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        DISEÑO • FABRICACIÓN • INSTALACIÓN
      </motion.div>
    </section>
  );
}
