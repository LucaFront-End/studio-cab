import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Building2, Home, Hammer, Package } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import MagneticButton from '../shared/MagneticButton';

// Texturas físicas de materiales
import concreteTex from '../../assets/images/concrete-texture.png';
import champagneTex from '../../assets/images/champagne-metal-texture.png';
import nogalTex from '../../assets/images/wood-nogal-texture.png';
import glassTex from '../../assets/images/fluted-glass-texture.png';

// Imágenes de proyectos reales terminados
import commercialImg from '../../assets/images/retail-commercial.png';
import residentialImg from '../../assets/images/residential-interior.png';
import carpinteriaImg from '../../assets/images/carpinteria-mobiliario.png';
import procesoImg from '../../assets/images/proceso-instalacion.png';

import './Services.css';

const servicesData = [
  {
    id: 0,
    icon: Building2,
    title: 'Diseño Comercial',
    materialName: 'Muestra 01: Concreto Pulido',
    materialType: 'Estrategia & Operación',
    texture: concreteTex,
    projectImage: commercialImg,
    description: 'Diseñamos espacios comerciales estratégicos bajo la premisa de que "el diseño también vende". Optimizamos la circulación de clientes, la distribución del personal, la exhibición de producto y la iluminación para maximizar el aforo y la rentabilidad del local.',
    bullets: [
      'Diseño de Restaurantes, Bares y Cafeterías',
      'Hoteles y Espacios de Hospitality de Alta Gama',
      'Boutiques y Locales Retail Premium',
      'Islas Comerciales y Puntos de Venta',
      'Showrooms y Oficinas Corporativas'
    ],
    link: '/servicios#comercial'
  },
  {
    id: 1,
    icon: Home,
    title: 'Interiorismo Residencial',
    materialName: 'Muestra 02: Champagne Metal',
    materialType: 'Estética & Exclusividad',
    texture: champagneTex,
    projectImage: residentialImg,
    description: 'Creamos hogares a la medida combinando el minimalismo cálido con acabados de lujo y texturas naturales. Nos enfocamos en la atemporalidad y el confort, traduciendo tus necesidades y estilo de vida en ambientes ordenados y sofisticados.',
    bullets: [
      'Casas y Residencias de Alta Gama',
      'Departamentos y Lofts Premium',
      'Remodelaciones e Intervenciones de Espacios',
      'Diseño y Planificación de Cocinas de Lujo',
      'Diseño de Vestidores y Closets de Gama Alta'
    ],
    link: '/servicios#residencial'
  },
  {
    id: 2,
    icon: Hammer,
    title: 'Carpintería y Mobiliario',
    materialName: 'Muestra 03: Madera de Nogal',
    materialType: 'Fabricación sobre Diseño',
    texture: nogalTex,
    projectImage: carpinteriaImg,
    description: 'Diseño, despiece y fabricación propia de carpintería arquitectónica y muebles sobre diseño en nuestro taller. Trabajamos con maderas finas (como nogal seleccionado) y herrajes alemanes de alta gama para garantizar acabados perfectos y duraderos.',
    bullets: [
      'Mostradores de Madera para Negocios',
      'Barras y Contrabarras Comerciales a Medida',
      'Exhibidores, Libreros y Anaqueles de Retail',
      'Mobiliario Residencial Fijo y Especializado',
      'Recepciones y Revestimientos de Muros'
    ],
    link: '/servicios#carpinteria'
  },
  {
    id: 3,
    icon: Package,
    title: 'Producción e Instalación',
    materialName: 'Muestra 04: Vidrio Estriado',
    materialType: 'Precisión & Montaje',
    texture: glassTex,
    projectImage: procesoImg,
    description: 'Garantizamos que lo diseñado en planos se ejecute físicamente con absoluta precisión. Controlamos todo el proceso creativo y operativo mediante nuestra fabricación directa, logística de montaje en obra y una rigurosa supervisión técnica de detalles.',
    bullets: [
      'Desarrollo de Planos Técnicos y Shop Drawings',
      'Fabricación Directa sin Intermediarios',
      'Logística de Entrega y Maniobras en Sitio',
      'Supervisión y Control de Calidad Riguroso',
      'Montaje y Acabados de Obra Llave en Mano'
    ],
    link: '/servicios#produccion'
  }
];

// Framer Motion variants for the material sample plates (overlapping layout)
const sampleVariants = [
  {
    idle: { scale: 0.98, rotate: -3, zIndex: 10 },
    active: { scale: 1.05, rotate: -1, zIndex: 20, y: -5 }
  },
  {
    idle: { scale: 0.98, rotate: 2, zIndex: 11 },
    active: { scale: 1.05, rotate: 0, zIndex: 20, y: -5 }
  },
  {
    idle: { scale: 0.98, rotate: -1.5, zIndex: 12 },
    active: { scale: 1.05, rotate: 0, zIndex: 20, y: -5 }
  },
  {
    idle: { scale: 0.98, rotate: 3, zIndex: 13 },
    active: { scale: 1.05, rotate: 1, zIndex: 20, y: -5 }
  }
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(0);
  const activeService = servicesData[activeCategory];
  const ActiveIcon = activeService.icon;

  return (
    <section className="home-services section theme-light" id="que-hacemos">
      {/* Ambient glowing spotlight background elements */}
      <div className="ambient-spotlight light-glow" style={{ top: '15%', right: '5%', width: '400px', height: '400px', opacity: 0.04 }} />
      <div className="ambient-spotlight wood-glow" style={{ bottom: '10%', left: '5%', width: '450px', height: '450px', opacity: 0.05 }} />

      <div className="container">
        <ScrollReveal variant="fadeUp">
          <div className="section-header">
            <span className="section-label">Qué Hacemos</span>
            <h2>Soluciones integrales para espacios comerciales y residenciales</h2>
            <div className="architect-line mt-md" style={{ maxWidth: '140px', margin: '0 auto' }} />
          </div>
        </ScrollReveal>

        <div className="home-services__split">
          {/* Left Column: Interactive Material Moodboard */}
          <div className="home-services__moodboard-wrapper">
            <div className="home-services__moodboard-instruction">
              <span>Muestras de materiales de diseño • Interactúa para explorar</span>
            </div>

            <div className="home-services__moodboard">
              {/* Drafting grid paper lines background */}
              <div className="home-services__moodboard-grid" />

              {servicesData.map((service, index) => {
                const isActive = activeCategory === index;
                const variants = sampleVariants[index];

                return (
                  <motion.div
                    key={service.id}
                    className={`material-sample material-sample--${index} ${isActive ? 'material-sample--active' : ''}`}
                    variants={variants}
                    initial="idle"
                    animate={isActive ? 'active' : 'idle'}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    onMouseEnter={() => setActiveCategory(index)}
                    onClick={() => setActiveCategory(index)}
                  >
                    {/* Material Texture Plate */}
                    <div className="material-sample__plate">
                      <img 
                        src={service.texture} 
                        alt={service.materialName} 
                        draggable="false"
                      />
                      <div className="material-sample__overlay" />
                    </div>

                    {/* Monospace Architectural Tag Attached to Plate */}
                    <div className="material-sample__tag">
                      <span className="material-sample__tag-num">0{index + 1}</span>
                      <div className="material-sample__tag-info">
                        <span className="material-sample__tag-name">{service.materialName.split(':')[1].trim()}</span>
                        <span className="material-sample__tag-type">{service.materialType}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile horizontal tap list of materials */}
            <div className="home-services__mobile-selector">
              {servicesData.map((service, index) => (
                <button
                  key={service.id}
                  className={`mobile-material-tab ${activeCategory === index ? 'mobile-material-tab--active' : ''}`}
                  onClick={() => setActiveCategory(index)}
                >
                  <span className="mobile-material-tab__num">0{index + 1}</span>
                  <span className="mobile-material-tab__name">{service.materialName.split(':')[1].trim()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Ficha Técnica / Detail Panel */}
          <div className="home-services__details">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="service-details__container"
              >
                {/* Header detail */}
                <div className="service-details__header">
                  <div className="service-details__icon-box">
                    <ActiveIcon size={22} strokeWidth={1.5} />
                  </div>
                  <div className="service-details__title-group">
                    <span className="service-details__category-label">Servicio</span>
                    <h3 className="service-details__title">{activeService.title}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="service-details__desc">{activeService.description}</p>

                {/* Technical Bullets */}
                <div className="service-details__bullets-section">
                  <span className="service-details__section-title">Especialidades e Integración</span>
                  <ul className="service-details__bullets-list">
                    {activeService.bullets.map((bullet, i) => (
                      <li key={i} className="service-details__bullet-item">
                        <span className="service-details__bullet-dot" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preview Window (Actual finished spaces matching material selection) */}
                <div className="service-details__preview">
                  <span className="service-details__preview-label">Proyecto Terminado</span>
                  <div className="service-details__preview-window">
                    <img 
                      src={activeService.projectImage} 
                      alt={`Resultado de ${activeService.title}`} 
                      className="service-details__preview-img"
                    />
                    <div className="service-details__preview-overlay" />
                    <span className="service-details__preview-badge">Ejecución Real</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="service-details__actions">
                  <MagneticButton strength={0.15} range={25}>
                    <Link to={activeService.link} className="btn-premium btn-premium-accent" data-cursor="pointer">
                      <span>Saber más del servicio</span>
                      <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
                    </Link>
                  </MagneticButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
