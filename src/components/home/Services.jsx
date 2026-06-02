import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, Building2, Home, Hammer, Package } from 'lucide-react';
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
    materialName: 'Concreto Pulido',
    materialType: 'Estrategia & Operación',
    texture: concreteTex,
    projectImage: commercialImg,
    description: 'Diseñamos espacios comerciales estratégicos bajo la premisa de que "el diseño también vende". Optimizamos circulación, exhibición e iluminación para maximizar la rentabilidad del local.',
    bullets: [
      'Restaurantes, Bares y Cafeterías',
      'Hoteles y Hospitality de Alta Gama',
      'Boutiques y Retail Premium',
      'Islas Comerciales y Puntos de Venta',
      'Showrooms y Oficinas Corporativas'
    ],
    link: '/servicios#comercial'
  },
  {
    id: 1,
    icon: Home,
    title: 'Interiorismo Residencial',
    materialName: 'Champagne Metal',
    materialType: 'Estética & Exclusividad',
    texture: champagneTex,
    projectImage: residentialImg,
    description: 'Creamos hogares a medida combinando minimalismo cálido con acabados de lujo y texturas naturales. Traducimos tu estilo de vida en ambientes sofisticados y atemporales.',
    bullets: [
      'Casas y Residencias de Alta Gama',
      'Departamentos y Lofts Premium',
      'Remodelaciones de Espacios',
      'Cocinas de Lujo',
      'Vestidores y Closets de Gama Alta'
    ],
    link: '/servicios#residencial'
  },
  {
    id: 2,
    icon: Hammer,
    title: 'Carpintería y Mobiliario',
    materialName: 'Madera de Nogal',
    materialType: 'Fabricación sobre Diseño',
    texture: nogalTex,
    projectImage: carpinteriaImg,
    description: 'Diseño, despiece y fabricación propia en nuestro taller. Trabajamos con maderas finas y herrajes alemanes de alta gama para garantizar acabados perfectos y duraderos.',
    bullets: [
      'Mostradores de Madera para Negocios',
      'Barras y Contrabarras a Medida',
      'Exhibidores y Anaqueles de Retail',
      'Mobiliario Residencial Especializado',
      'Recepciones y Revestimientos de Muros'
    ],
    link: '/servicios#carpinteria'
  },
  {
    id: 3,
    icon: Package,
    title: 'Producción e Instalación',
    materialName: 'Vidrio Estriado',
    materialType: 'Precisión & Montaje',
    texture: glassTex,
    projectImage: procesoImg,
    description: 'Garantizamos que lo diseñado en planos se ejecute con absoluta precisión. Controlamos fabricación directa, logística de montaje y supervisión técnica rigurosa.',
    bullets: [
      'Planos Técnicos y Shop Drawings',
      'Fabricación Directa sin Intermediarios',
      'Logística de Entrega en Sitio',
      'Supervisión y Control de Calidad',
      'Montaje Llave en Mano'
    ],
    link: '/servicios#produccion'
  }
];

/* ─── Desktop Layout (Scroll-Bound Sticky) ─── */
function DesktopLayout() {
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(3, Math.floor(v * 4));
    setActiveIdx(idx);
  });

  const active = servicesData[activeIdx];
  const ActiveIcon = active.icon;

  return (
    <div className="svc-track theme-light" ref={trackRef}>
      <div className="svc-sticky">
        {/* ── Left: Full-bleed visual panel ── */}
        <div className="svc__visual-panel">
          {/* Material texture background (full bleed) */}
          {servicesData.map((s, i) => (
            <motion.div
              key={`tex-${s.id}`}
              className="svc__texture-layer"
              animate={{
                opacity: activeIdx === i ? 1 : 0,
                scale: activeIdx === i ? 1.04 : 1.0,
              }}
              transition={{
                opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                scale: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
              }}
            >
              <img src={s.texture} alt={s.materialName} draggable="false" />
            </motion.div>
          ))}

          {/* Texture overlay with darkening gradient */}
          <div className="svc__texture-overlay" />

          {/* Inset project photo window */}
          <div className="svc__inset-window">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIdx}
                src={active.projectImage}
                alt={active.title}
                draggable="false"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1.0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
            <div className="svc__inset-overlay" />
            <span className="svc__inset-badge">Ejecución Real</span>
          </div>

          {/* Material label top-left */}
          <div className="svc__material-label">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="svc__material-label-inner"
              >
                <span className="svc__material-num">Muestra 0{activeIdx + 1} / 04</span>
                <span className="svc__material-name">{active.materialName}</span>
                <span className="svc__material-type">{active.materialType}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Grid overlay */}
          <div className="svc__grid-overlay" />
        </div>

        {/* ── Right: Content panel ── */}
        <div className="svc__content-panel">
          {/* Section header */}
          <div className="svc__header">
            <span className="section-label">Qué Hacemos</span>
            <h2 className="svc__heading">
              Soluciones integrales<br />
              <em>para cada espacio.</em>
            </h2>
          </div>

          {/* Step indicator */}
          <div className="svc__steps">
            {servicesData.map((s, i) => (
              <div
                key={s.id}
                className={`svc__step ${activeIdx === i ? 'svc__step--active' : ''}`}
              >
                <div className="svc__step-line">
                  {activeIdx === i && (
                    <motion.div
                      className="svc__step-fill"
                      layoutId="svc-step-fill"
                      transition={{ type: 'spring', stiffness: 130, damping: 22 }}
                    />
                  )}
                </div>
                <span className="svc__step-num">0{i + 1}</span>
              </div>
            ))}
          </div>

          {/* Active service content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="svc__service-content"
            >
              <div className="svc__service-header">
                <div className="svc__service-icon">
                  <ActiveIcon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="svc__service-title">{active.title}</h3>
              </div>

              <p className="svc__service-desc">{active.description}</p>

              <ul className="svc__service-bullets">
                {active.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
                  >
                    <span className="svc__bullet-dot" />
                    {b}
                  </motion.li>
                ))}
              </ul>

              <MagneticButton strength={0.15} range={25}>
                <Link to={active.link} className="btn-premium btn-premium-accent" data-cursor="pointer">
                  <span>Explorar servicio</span>
                  <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
                </Link>
              </MagneticButton>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Layout ─── */
function MobileLayout() {
  const [activeCategory, setActiveCategory] = useState(0);
  const active = servicesData[activeCategory];
  const ActiveIcon = active.icon;

  return (
    <section className="svc-mobile section theme-light">
      <div className="container">
        <div className="svc-mobile__header">
          <span className="section-label">Qué Hacemos</span>
          <h2 className="svc__heading">
            Soluciones integrales<br />
            <em>para cada espacio.</em>
          </h2>
          <div className="architect-line mt-md mb-xl" style={{ maxWidth: 100 }} />
        </div>

        {/* Tab selector */}
        <div className="svc-mobile__tabs">
          {servicesData.map((s, i) => (
            <button
              key={s.id}
              className={`svc-mobile__tab ${activeCategory === i ? 'svc-mobile__tab--active' : ''}`}
              onClick={() => setActiveCategory(i)}
            >
              <span className="svc-mobile__tab-num">0{i + 1}</span>
              <span className="svc-mobile__tab-name">{s.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="svc-mobile__content"
          >
            {/* Image */}
            <div className="svc-mobile__image">
              <img src={active.projectImage} alt={active.title} />
              <div className="svc-mobile__image-overlay" />
            </div>

            {/* Info */}
            <div className="svc-mobile__info">
              <div className="svc-mobile__info-header">
                <div className="svc-mobile__info-icon">
                  <ActiveIcon size={18} strokeWidth={1.5} />
                </div>
                <h3>{active.title}</h3>
              </div>
              <p>{active.description}</p>
              <ul className="svc-mobile__bullets">
                {active.bullets.map((b, i) => (
                  <li key={i}>
                    <span className="svc__bullet-dot" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link to={active.link} className="btn-premium btn-premium-accent" style={{ display: 'inline-flex' }}>
                <span>Explorar servicio</span>
                <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Root Component ─── */
export default function Services() {
  return (
    <div id="que-hacemos">
      <div className="services-desktop-only">
        <DesktopLayout />
      </div>
      <div className="services-mobile-only">
        <MobileLayout />
      </div>
    </div>
  );
}
