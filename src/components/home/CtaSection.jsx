import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '../shared/ScrollReveal';
import { ShieldCheck, Ruler, Wrench, MessageSquare, Mail, Phone, ArrowRight } from 'lucide-react';
import carpinteriaImg from '../../assets/images/carpinteria-mobiliario.png';
import './CtaSection.css';

export default function CtaSection() {
  const ref = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Parallax translation for the background image
  const bgY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const phoneNumber = '5215512345678'; // Placeholder
  const message = encodeURIComponent('Hola, me interesa cotizar un proyecto con Studio CAB.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <section 
      className="cta-section" 
      id="contacto-cta" 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background with Parallax */}
      <div className="cta-section__bg">
        <motion.img 
          src={carpinteriaImg} 
          alt="" 
          aria-hidden="true" 
          style={{ y: bgY }}
        />
        <div className="cta-section__overlay" />
        <div className="cta-section__noise" />
      </div>

      {/* Interactive mouse spotlight glow */}
      <div 
        className="cta-section__spotlight"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 195, 179, 0.08), transparent 80%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="container cta-section__container">
        <div className="cta-section__split">
          {/* Left Column: Copy & B2B Trust Points */}
          <div className="cta-section__left">
            <ScrollReveal variant="fadeUp">
              <span className="section-label cta-section__label" style={{ color: 'var(--color-champagne)' }}>
                ¿Listo para empezar?
              </span>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <h2 className="cta-section__title">
                Diseñemos el próximo <span className="text-gradient">gran espacio</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="cta-section__desc">
                Desde el plano conceptual hasta el montaje final en obra, coordinamos diseño constructivo y fabricación en nuestro propio taller digital para locales comerciales y residencias exclusivas.
              </p>
            </ScrollReveal>

            {/* B2B Trust Grid */}
            <div className="cta-section__trust-grid">
              <ScrollReveal variant="fadeUp" delay={0.3}>
                <div className="cta-section__trust-item">
                  <div className="cta-section__trust-icon">
                    <Wrench size={18} strokeWidth={1.5} />
                  </div>
                  <div className="cta-section__trust-info">
                    <h4>Taller Propio Digital</h4>
                    <p>Fabricación directa con maquinaria CNC. Sin intermediarios, tiempos controlados y ensamble milimétrico.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.4}>
                <div className="cta-section__trust-item">
                  <div className="cta-section__trust-icon">
                    <Ruler size={18} strokeWidth={1.5} />
                  </div>
                  <div className="cta-section__trust-info">
                    <h4>Ingeniería Constructiva</h4>
                    <p>Elaboramos planos ejecutivos de carpintería y herrería técnica (shop drawings) listos para producción.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.5}>
                <div className="cta-section__trust-item">
                  <div className="cta-section__trust-icon">
                    <ShieldCheck size={18} strokeWidth={1.5} />
                  </div>
                  <div className="cta-section__trust-info">
                    <h4>Montaje Llave en Mano</h4>
                    <p>Instalación en sitio dirigida por nuestro equipo de obra, garantizando un ajuste y acabado perfecto.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Glassmorphic Contact Card */}
          <div className="cta-section__right">
            <ScrollReveal variant="fadeUp" delay={0.35}>
              <div className="cta-section__card">
                <div className="cta-section__card-header">
                  <h3>Hablemos de tu proyecto</h3>
                  <div className="architect-line mt-sm mb-md" style={{ maxWidth: '60px', opacity: 0.4 }} />
                  <p>Selecciona la vía de contacto de tu preferencia. Te responderemos en menos de 24 horas hábiles.</p>
                </div>

                <div className="cta-section__card-links">
                  {/* WhatsApp */}
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cta-section__card-link-item"
                    data-cursor="whatsapp"
                  >
                    <div className="cta-section__link-icon-box whatsapp-box">
                      <MessageSquare size={18} strokeWidth={2} />
                    </div>
                    <div className="cta-section__link-text">
                      <span className="cta-section__link-label">Mensaje Rápido</span>
                      <span className="cta-section__link-val">Iniciar WhatsApp</span>
                    </div>
                    <ArrowRight size={14} className="cta-section__link-arrow" />
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:contacto@studiocab.mx" 
                    className="cta-section__card-link-item"
                  >
                    <div className="cta-section__link-icon-box email-box">
                      <Mail size={18} strokeWidth={2} />
                    </div>
                    <div className="cta-section__link-text">
                      <span className="cta-section__link-label">Planos y Presupuestos</span>
                      <span className="cta-section__link-val">contacto@studiocab.mx</span>
                    </div>
                    <ArrowRight size={14} className="cta-section__link-arrow" />
                  </a>

                  {/* Phone Call */}
                  <a 
                    href="tel:+525512345678" 
                    className="cta-section__card-link-item"
                  >
                    <div className="cta-section__link-icon-box phone-box">
                      <Phone size={18} strokeWidth={2} />
                    </div>
                    <div className="cta-section__link-text">
                      <span className="cta-section__link-label">Llamada Directa</span>
                      <span className="cta-section__link-val">+52 55 1234 5678</span>
                    </div>
                    <ArrowRight size={14} className="cta-section__link-arrow" />
                  </a>
                </div>

                <div className="cta-section__card-footer">
                  <div className="cta-section__status-dot" />
                  <span>Taller y Oficinas activas en CDMX</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
