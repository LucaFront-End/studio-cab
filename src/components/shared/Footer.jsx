import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import MagneticButton from './MagneticButton';
import './Footer.css';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const footerLinks = {
  navegacion: [
    { name: 'Inicio', path: '/' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contacto', path: '/contacto' },
  ],
  servicios: [
    { name: 'Diseño Comercial', path: '/servicios#comercial' },
    { name: 'Interiorismo Residencial', path: '/servicios#residencial' },
    { name: 'Carpintería y Mobiliario', path: '/servicios#carpinteria' },
    { name: 'Producción e Instalación', path: '/servicios#produccion' },
  ]
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <ScrollReveal variant="fadeUp">
          <div className="footer__grid">
            {/* Brand column */}
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-grupo">GRUPO</span>
                <span className="footer__logo-cab">CAB</span>
                <span className="footer__logo-studio">— STUDIO —</span>
              </div>
              <p className="footer__tagline">
                DISEÑO • FABRICACIÓN • CARPINTERÍA
              </p>
              <p className="footer__desc">
                Diseñamos espacios comerciales y residenciales que venden, conectan y generan experiencias memorables.
              </p>
              <div className="footer__social">
                <MagneticButton strength={0.3} range={30} style={{ display: 'inline-flex' }}>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
                    <InstagramIcon />
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.3} range={30} style={{ display: 'inline-flex' }}>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
                    <FacebookIcon />
                  </a>
                </MagneticButton>
              </div>
            </div>

            {/* Navigation links */}
            <div className="footer__col">
              <h4 className="footer__col-title">Navegación</h4>
              <ul className="footer__list">
                {footerLinks.navegacion.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="footer__link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className="footer__col">
              <h4 className="footer__col-title">Servicios</h4>
              <ul className="footer__list">
                {footerLinks.servicios.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="footer__link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="footer__col">
              <h4 className="footer__col-title">Contacto</h4>
              <ul className="footer__list footer__contact-list">
                <li className="footer__contact-item">
                  <MapPin size={15} style={{ color: 'var(--color-champagne)' }} />
                  <span>CDMX y Área Metropolitana</span>
                </li>
                <li className="footer__contact-item">
                  <Mail size={15} style={{ color: 'var(--color-champagne)' }} />
                  <a href="mailto:contacto@studiocab.mx">contacto@studiocab.mx</a>
                </li>
                <li className="footer__contact-item">
                  <Phone size={15} style={{ color: 'var(--color-champagne)' }} />
                  <a href="tel:+525512345678">+52 55 1234 5678</a>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Separator line */}
        <div className="footer__divider" />

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Studio Grupo CAB. Todos los derechos reservados.
          </p>
          <div className="footer__bottom-links">
            <a href="/privacidad" className="footer__bottom-link">Aviso de Privacidad</a>
            <span className="footer__bottom-sep">|</span>
            <a href="/terminos" className="footer__bottom-link">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
