import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Compass, Factory, Layers, Maximize } from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../shared/ScrollReveal';
import ImageReveal from '../shared/ImageReveal';
import hotelImg from '../../assets/images/hotel-interior.png';
import './WhyUs.css';

const differentiators = [
  {
    icon: Compass,
    title: 'Diseño Estratégico',
    description: 'Cada espacio se diseña considerando la experiencia del usuario, circulación, exhibición y la percepción de tu marca.',
    stat: '80',
    statLabel: 'Proyectos Comerciales',
    suffix: '+'
  },
  {
    icon: Factory,
    title: 'Fabricación Propia',
    description: 'Mayor control de calidad y personalización absoluta. Todo el proceso técnico bajo una misma visión creativa.',
    stat: '100',
    statLabel: 'Control de Calidad',
    suffix: '%'
  },
  {
    icon: Layers,
    title: 'Soluciones Integrales',
    description: 'Diseño + Producción + Instalación. Un solo equipo unificado de principio a fin, eliminando fricciones.',
    stat: '3',
    statLabel: 'Servicios en Uno',
    suffix: ''
  },
  {
    icon: Maximize,
    title: 'Optimización de Espacios',
    description: 'Especialistas en rentabilizar locales comerciales pequeños, haciéndolos ergonómicos y comerciales.',
    stat: '40',
    statLabel: 'Más Eficiencia',
    suffix: '%'
  },
];

function AnimatedCounter({ value, suffix = '', inView }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value);

  useEffect(() => {
    if (!inView) return;

    let startTime = null;
    const duration = 1800; // 1.8s

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      
      setCount(Math.floor(easeProgress * numericValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [inView, numericValue]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function WhyUs() {
  const counterRef = useRef(null);
  const counterInView = useInView(counterRef, { once: true, amount: 0.2 });

  return (
    <section className="why-us section theme-light" id="por-que">
      {/* Dynamic ambient spotlight */}
      <div className="ambient-spotlight light-glow" style={{ top: '20%', left: '30%', width: '500px', height: '500px', opacity: 0.05 }} />

      <div className="container">
        <div className="why-us__layout">
          {/* Image side */}
          <div className="why-us__image-col">
            <div className="why-us__image-container">
              <ImageReveal
                src={hotelImg}
                alt="Interior de hotel premium diseñado por Studio CAB"
                className="why-us__image"
                direction="left"
              />
              {/* Premium brushed metallic floating accent frame */}
              <div className="why-us__image-accent" />
            </div>
          </div>

          {/* Content side */}
          <div className="why-us__content-col" ref={counterRef}>
            <ScrollReveal variant="fadeRight">
              <span className="section-label">Diferenciadores</span>
              <h2 className="why-us__title">
                No solo diseñamos espacios.<br />
                <span className="text-gradient">Los hacemos funcionar.</span>
              </h2>
              <div className="architect-line mt-md mb-2xl" style={{ maxWidth: '100px' }} />
            </ScrollReveal>

            <StaggerContainer className="why-us__items" staggerDelay={0.1}>
              {differentiators.map((diff, index) => {
                const Icon = diff.icon;
                return (
                  <StaggerItem key={diff.title} variant="fadeRight">
                    <div className="why-us__item" data-cursor="pointer">
                      <div className="why-us__item-header-mobile">
                        <div className="why-us__item-icon-box">
                          <Icon size={20} strokeWidth={1.5} className="why-us__item-icon" />
                        </div>
                        <div className="why-us__item-stat">
                          <span className="why-us__item-stat-value">
                            <AnimatedCounter value={diff.stat} suffix={diff.suffix} inView={counterInView} />
                          </span>
                          <span className="why-us__item-stat-label">{diff.statLabel}</span>
                        </div>
                      </div>
                      
                      <div className="why-us__item-body">
                        <h4 className="why-us__item-title">{diff.title}</h4>
                        <p className="why-us__item-desc">{diff.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
