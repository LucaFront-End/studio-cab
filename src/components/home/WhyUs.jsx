import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Compass, Factory, Layers, Maximize, ArrowUpRight } from 'lucide-react';

// Finished project images
import hotelImg from '../../assets/images/hotel-interior.png';
import retailImg from '../../assets/images/retail-commercial.png';
import carpinteriaImg from '../../assets/images/carpinteria-mobiliario.png';
import residentialImg from '../../assets/images/residential-interior.png';

import './WhyUs.css';

const differentiators = [
  {
    icon: Compass,
    title: 'Diseño Estratégico',
    tagline: 'El espacio que vende más.',
    description:
      'Cada proyecto se diseña considerando la experiencia del usuario final: circulación, exhibición e identidad de marca. El diseño es una herramienta de negocio.',
    stat: '80+',
    statLabel: 'Proyectos Comerciales',
    image: retailImg,
    accentColor: 'var(--color-wood-nogal)',
  },
  {
    icon: Factory,
    title: 'Fabricación Propia',
    tagline: 'Taller propio, control total.',
    description:
      'Producimos cada pieza en nuestro taller con maderas finas y herrajes alemanes de alta gama. Sin intermediarios: mayor calidad, tiempos más precisos y personalización absoluta.',
    stat: '100%',
    statLabel: 'Control de Calidad',
    image: carpinteriaImg,
    accentColor: 'var(--color-wood-light)',
  },
  {
    icon: Layers,
    title: 'Soluciones Integrales',
    tagline: 'Un equipo, todo el proceso.',
    description:
      'Diseño + Producción + Instalación bajo una misma dirección creativa. Eliminamos la fricción entre fases y aseguramos que lo que se dibuja en planos se ejecuta con fidelidad milimétrica.',
    stat: '3',
    statLabel: 'Etapas Integradas',
    image: hotelImg,
    accentColor: 'var(--color-champagne)',
  },
  {
    icon: Maximize,
    title: 'Optimización de Espacios',
    tagline: 'Más rendimiento por metro cuadrado.',
    description:
      'Especializados en rentabilizar locales comerciales pequeños: ergonomía de trabajo, flujo de clientes y exhibición estratégica para maximizar ventas en superficies reducidas.',
    stat: '40%',
    statLabel: 'Más Eficiencia Promedio',
    image: residentialImg,
    accentColor: 'var(--color-wood-nogal)',
  },
];

function AnimatedCounter({ value, inView }) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    // Extract numeric part and suffix
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) { setDisplay(value); return; }
    const num = parseInt(match[1]);
    const suffix = match[2];

    if (!inView) { setDisplay('0' + suffix); return; }

    let startTime = null;
    const duration = 1200;

    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(eased * num);
      setDisplay(current + suffix);
      if (progress < 1) window.requestAnimationFrame(step);
    };

    const id = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(id);
  }, [inView, value]);

  return <>{display}</>;
}

/* ─── Desktop scroll-bound layout ─── */
function DesktopLayout() {
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Each card occupies 25% of the scroll range
    const idx = Math.min(3, Math.floor(v * 4));
    setActiveIdx(idx);
  });

  const active = differentiators[activeIdx];

  return (
    <div className="whyus-track theme-light" ref={trackRef}>
      {/* Sticky viewport panel */}
      <div className="whyus-sticky">
        {/* ── Left: Image Panel ── */}
        <div className="whyus__image-panel">
          {/* Architectural annotation layer */}
          <div className="whyus__img-annotation">
            <span className="whyus__annotation-chip">
              Proyecto {String(activeIdx + 1).padStart(2, '0')} / 04
            </span>
            <span className="whyus__annotation-chip whyus__annotation-chip--right">
              {active.title}
            </span>
          </div>

          {/* Cross-fade images with scale effect */}
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              className="whyus__image-layer"
              initial={{ opacity: 0, scale: 1.0 }}
              animate={{ 
                opacity: activeIdx === i ? 1 : 0,
                scale: activeIdx === i ? 1.06 : 1.0
              }}
              transition={{ 
                opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                scale: { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
              }}
            >
              <img src={d.image} alt={d.title} draggable="false" />
            </motion.div>
          ))}

          {/* Stat badge floating bottom-left */}
          <div className="whyus__stat-badge">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                className="whyus__stat-badge-inner"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="whyus__stat-num">
                  <AnimatedCounter value={active.stat} inView={true} />
                </span>
                <span className="whyus__stat-lbl">{active.statLabel}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtle grid overlay */}
          <div className="whyus__img-grid-overlay" />
        </div>

        {/* ── Right: Card List ── */}
        <div className="whyus__cards-panel">
          {/* Header */}
          <div className="whyus__cards-header">
            <span className="section-label">Diferenciadores</span>
            <h2 className="whyus__heading">
              No solo diseñamos espacios.<br />
              <em>Los hacemos funcionar.</em>
            </h2>
            <div className="architect-line mt-md mb-xl" style={{ maxWidth: 100 }} />
          </div>

          {/* Items Container with progress track */}
          <div className="whyus__item-list-container">
            <div className="whyus__progress-track">
              <motion.div 
                className="whyus__progress-bar"
                style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
              />
            </div>

            <div className="whyus__item-list">
              {differentiators.map((d, i) => {
                const Icon = d.icon;
                const isActive = activeIdx === i;
                return (
                  <motion.div
                    key={d.title}
                    className={`whyus__item ${isActive ? 'whyus__item--active' : ''}`}
                    animate={{ opacity: isActive ? 1 : 0.45 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Sliding background pill */}
                    {isActive && (
                      <motion.div
                        layoutId="whyus-active-bg"
                        className="whyus__item-active-bg"
                        transition={{ type: 'spring', stiffness: 120, damping: 22 }}
                      />
                    )}
                    
                    {/* Watermark number behind content */}
                    <div className="whyus__item-watermark">0{i + 1}</div>

                    <div className="whyus__item-left">
                      <div className={`whyus__item-icon ${isActive ? 'whyus__item-icon--active' : ''}`}>
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="whyus__item-right">
                      <div className="whyus__item-header-row">
                        <span className="whyus__item-num">0{i + 1}</span>
                        <h4 className="whyus__item-title">{d.title}</h4>
                      </div>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="whyus__item-body"
                          >
                            <p className="whyus__item-tagline">{d.tagline}</p>
                            <p className="whyus__item-desc">{d.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile layout ─── */
function MobileLayout() {
  return (
    <section className="whyus-mobile section theme-light" id="por-que-mobile">
      <div className="container">
        <div className="whyus-mobile__header">
          <span className="section-label">Diferenciadores</span>
          <h2 className="whyus__heading">
            No solo diseñamos espacios.<br />
            <em>Los hacemos funcionar.</em>
          </h2>
          <div className="architect-line mt-md mb-2xl" style={{ maxWidth: 80 }} />
        </div>

        <div className="whyus-mobile__list">
          {differentiators.map((d, i) => {
            const Icon = d.icon;
            return (
              <div key={d.title} className="whyus-mobile__item">
                <div className="whyus-mobile__img-wrap">
                  <img src={d.image} alt={d.title} />
                  <div className="whyus-mobile__img-overlay" />
                  <div className="whyus-mobile__img-badge">
                    <span className="whyus-mobile__badge-num">{d.stat}</span>
                    <span className="whyus-mobile__badge-lbl">{d.statLabel}</span>
                  </div>
                </div>
                <div className="whyus-mobile__content">
                  <div className="whyus-mobile__icon-row">
                    <div className="whyus-mobile__icon"><Icon size={16} strokeWidth={1.5} /></div>
                    <span className="whyus-mobile__num">0{i + 1}</span>
                  </div>
                  <h4 className="whyus-mobile__title">{d.title}</h4>
                  <p className="whyus-mobile__tagline">{d.tagline}</p>
                  <p className="whyus-mobile__desc">{d.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Root export ─── */
export default function WhyUs() {
  return (
    <>
      {/* Desktop: shown via CSS on ≥1024px */}
      <div className="whyus-desktop-only" id="por-que">
        <DesktopLayout />
      </div>
      {/* Mobile: shown via CSS on <1024px */}
      <div className="whyus-mobile-only">
        <MobileLayout />
      </div>
    </>
  );
}
