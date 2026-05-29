import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '../shared/ScrollReveal';
import MagneticButton from '../shared/MagneticButton';
import carpinteriaImg from '../../assets/images/carpinteria-mobiliario.png';
import retailImg from '../../assets/images/retail-commercial.png';
import heroImg from '../../assets/images/hero-restaurant.png';
import residentialImg from '../../assets/images/residential-interior.png';
import hotelInteriorImg from '../../assets/images/hotel-interior.png';
import procesoInstalacionImg from '../../assets/images/proceso-instalacion.png';
import './Furniture.css';

const row1 = [
  { title: 'Mostradores de madera', image: carpinteriaImg, subtitle: 'Negocios & Recepciones' },
  { title: 'Barras comerciales', image: heroImg, subtitle: 'Cafeterías & Restaurantes' },
  { title: 'Exhibidores premium', image: retailImg, subtitle: 'Showrooms de marca' },
  { title: 'Anaqueles para tienda', image: retailImg, subtitle: 'Exhibición Retail' },
  { title: 'Mesas de junta', image: hotelInteriorImg, subtitle: 'Salas de Conferencia' },
  { title: 'Islas de exhibición', image: procesoInstalacionImg, subtitle: 'Centros Comerciales' },
];

const row2 = [
  { title: 'Muebles residenciales', image: residentialImg, subtitle: 'Cocinas & Clósets' },
  { title: 'Libreros a medida', image: carpinteriaImg, subtitle: 'Bibliotecas & Estudios' },
  { title: 'Mobiliario corporativo', image: hotelInteriorImg, subtitle: 'Oficinas & Recepciones' },
  { title: 'Panelería acústica', image: procesoInstalacionImg, subtitle: 'Revestimientos & Muros' },
  { title: 'Gabinetes integrados', image: residentialImg, subtitle: 'Baños & Vestidores' },
  { title: 'Muebles de exterior', image: heroImg, subtitle: 'Terrazas & Hoteles' },
];

export default function Furniture() {
  return (
    <section className="furniture section theme-light" id="mobiliario">
      {/* Background ambient lighting */}
      <div className="ambient-spotlight light-glow" style={{ top: '5%', left: '10%', width: '450px', height: '450px', opacity: 0.05 }} />

      <div className="container">
        <ScrollReveal variant="fadeUp">
          <div className="section-header">
            <span className="section-label">Mobiliario sobre Diseño</span>
            <h2>Muebles que definen espacios</h2>
            <div className="architect-line mt-md mb-md" style={{ maxWidth: '140px', margin: '0 auto' }} />
            <p>Fabricación de carpintería arquitectónica y mobiliario comercial personalizado, adaptado estrictamente a tus necesidades de espacio y ventas.</p>
          </div>
        </ScrollReveal>
      </div>

      {/* Infinite Marquee Container */}
      <div className="furniture__carousel-container">
        {/* Blur overlays on the left and right */}
        <div className="furniture__blur-overlay furniture__blur-overlay--left" />
        <div className="furniture__blur-overlay furniture__blur-overlay--right" />

        {/* Row 1: Leftward constant movement */}
        <div className="furniture__marquee-wrapper">
          <div className="furniture__marquee-row furniture__marquee-row--left">
            {[...row1, ...row1].map((cat, i) => (
              <div
                key={`${cat.title}-r1-${i}`}
                className="furniture__item"
              >
                <div className="furniture__item-image-box">
                  <img src={cat.image} alt={cat.title} loading="lazy" />
                  <div className="furniture__item-overlay">
                    <span className="furniture__item-subtitle">{cat.subtitle}</span>
                    <h4 className="furniture__item-title">{cat.title}</h4>
                    <LinkBlock to="/contacto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward constant movement */}
        <div className="furniture__marquee-wrapper mt-lg">
          <div className="furniture__marquee-row furniture__marquee-row--right">
            {[...row2, ...row2].map((cat, i) => (
              <div
                key={`${cat.title}-r2-${i}`}
                className="furniture__item"
              >
                <div className="furniture__item-image-box">
                  <img src={cat.image} alt={cat.title} loading="lazy" />
                  <div className="furniture__item-overlay">
                    <span className="furniture__item-subtitle">{cat.subtitle}</span>
                    <h4 className="furniture__item-title">{cat.title}</h4>
                    <LinkBlock to="/contacto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <ScrollReveal variant="fadeUp" delay={0.15}>
          <div className="furniture__bottom">
            <p className="furniture__note">
              ¿Necesitas mobiliario comercial a medida para tu local o proyecto?
            </p>
            <MagneticButton strength={0.2} range={35}>
              <Link to="/contacto" className="btn-premium btn-premium-accent">
                <span>Cotiza tu mobiliario</span>
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Subcomponent to avoid direct navigation crash
function LinkBlock({ to }) {
  return (
    <Link to={to} className="furniture__item-cta" data-cursor="pointer">
      <span>Cotizar diseño</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </Link>
  );
}
