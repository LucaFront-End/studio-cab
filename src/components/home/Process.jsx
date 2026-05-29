import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Lightbulb, Palette, PenTool, Wrench, HardHat, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import './Process.css';

const steps = [
  { 
    icon: Lightbulb, 
    title: 'Conceptualización', 
    phase: 'Fase 01: Planificación',
    description: 'Entendemos tu visión, analizamos las necesidades operativas de tu local y definimos los objetivos comerciales y de flujo de clientes.' 
  },
  { 
    icon: Palette, 
    title: 'Moodboards + Renders', 
    phase: 'Fase 02: Creatividad',
    description: 'Creamos propuestas tridimensionales (renders fotorrealistas) y muestras de materiales físicos para alinear la dirección creativa antes de la fabricación.' 
  },
  { 
    icon: PenTool, 
    title: 'Diseño Técnico', 
    phase: 'Fase 03: Ingeniería',
    description: 'Elaboramos planos ejecutivos detallados (shop drawings) y especificaciones de carpintería y herrería técnicas precisas para nuestro taller.' 
  },
  { 
    icon: Wrench, 
    title: 'Fabricación', 
    phase: 'Fase 04: Producción',
    description: 'Producimos el mobiliario en nuestro propio taller digital, cortando y ensamblando con maderas finas y controlando la calidad de cada ensamble.' 
  },
  { 
    icon: HardHat, 
    title: 'Instalación', 
    phase: 'Fase 05: Montaje',
    description: 'Montaje profesional en obra coordinado por nuestro equipo de instaladores con supervisión técnica en sitio, garantizando un ajuste milimétrico.' 
  },
  { 
    icon: CheckCircle2, 
    title: 'Entrega Final', 
    phase: 'Fase 06: Finalización',
    description: 'Revisión minuciosa de cada detalle operativo y estético junto contigo, entregando el espacio completamente listo para abrir y facturar.' 
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  // Track scroll position of the entire section relative to the viewport center
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center']
  });

  // Calculate rotation angle of the technical dial (0 to 360 degrees)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Read scroll changes and update activeStep state
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Map latest (0 to 1) to step index (0 to 5)
    const stepIndex = Math.min(5, Math.floor(latest * 6));
    setActiveStep(stepIndex);
  });

  const activeServiceStep = steps[activeStep];

  return (
    <section className="process section" ref={sectionRef} id="proceso">
      {/* Ambient spotlights */}
      <div className="ambient-spotlight light-glow" style={{ top: '35%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', opacity: 0.05 }} />
      <div className="ambient-spotlight wood-glow" style={{ bottom: '15%', right: '10%', width: '450px', height: '450px', opacity: 0.04 }} />

      <div className="container">
        <ScrollReveal variant="fadeUp">
          <div className="section-header">
            <span className="section-label">Nuestro Proceso</span>
            <h2>De la idea a la realidad</h2>
            <div className="architect-line mt-md mb-md" style={{ maxWidth: '140px', margin: '0 auto' }} />
            <p>Un flujo de trabajo riguroso e integrado (Diseño + Taller + Obra) que optimiza tiempos y garantiza resultados de alta gama.</p>
          </div>
        </ScrollReveal>

        <div className="process__split-container">
          {/* Left Column: Sticky Technical Dial & Phase Tracker */}
          <div className="process__left-pane">
            <div className="process__sticky-wrapper">
              <div className="process__dial-container">
                {/* Spinning technical compass/ruler dial */}
                <motion.div 
                  className="process__dial" 
                  style={{ rotate }}
                >
                  <svg width="220" height="220" viewBox="0 0 200 200" fill="none" stroke="currentColor">
                    {/* Outer ticks circle */}
                    <circle cx="100" cy="100" r="90" stroke="var(--color-champagne)" strokeWidth="1" strokeDasharray="1 8" opacity="0.35" />
                    {/* Middle thin circle */}
                    <circle cx="100" cy="100" r="75" stroke="var(--color-champagne)" strokeWidth="0.75" opacity="0.15" />
                    {/* Inner technical circle */}
                    <circle cx="100" cy="100" r="52" stroke="var(--color-champagne)" strokeWidth="0.5" opacity="0.25" />
                    {/* Crosshairs */}
                    <line x1="100" y1="5" x2="100" y2="195" stroke="var(--color-champagne)" strokeWidth="0.5" opacity="0.12" />
                    <line x1="5" y1="100" x2="195" y2="100" stroke="var(--color-champagne)" strokeWidth="0.5" opacity="0.12" />
                    {/* Rotating pointer marker */}
                    <line x1="100" y1="100" x2="100" y2="25" stroke="var(--color-champagne)" strokeWidth="1.5" opacity="0.8" />
                    <circle cx="100" cy="25" r="3" fill="var(--color-champagne)" />
                  </svg>
                </motion.div>

                {/* Central active step display */}
                <div className="process__dial-center">
                  <span className="process__dial-num">0{activeStep + 1}</span>
                </div>
              </div>

              {/* Active phase text below the dial */}
              <div className="process__phase-display">
                <span className="process__phase-label">Fase Actual</span>
                <h4 className="process__phase-title">{activeServiceStep.phase}</h4>
                <span className="process__phase-name">{activeServiceStep.title}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Scrollable Cards List */}
          <div className="process__right-pane">
            <div className="process__steps-list">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = activeStep === i;

                return (
                  <div
                    key={step.title}
                    className={`process-card-item ${isActive ? 'process-card-item--active' : ''}`}
                  >
                    <div className="process-card-item__wrapper">
                      {/* Step Header */}
                      <div className="process-card-item__header">
                        <span className="process-card-item__num">Paso 0{i + 1}</span>
                        <div className="process-card-item__icon-box">
                          <Icon size={18} strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h4 className="process-card-item__title">{step.title}</h4>
                      <p className="process-card-item__desc">{step.description}</p>
                    </div>

                    {/* Left glowing trace border on the active card */}
                    <div className="process-card-item__active-border" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
