import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './Navbar.css';

const services = [
  { name: 'Diseño Comercial', path: '/servicios#comercial' },
  { name: 'Interiorismo Residencial', path: '/servicios#residencial' },
  { name: 'Carpintería y Mobiliario', path: '/servicios#carpinteria' },
  { name: 'Producción e Instalación', path: '/servicios#produccion' },
];

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Proyectos', path: '/proyectos' },
  { name: 'Servicios', path: '/servicios', hasDropdown: true },
  { name: 'Nosotros', path: '/nosotros' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contacto', path: '/contacto' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Find if a path is active
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar__container container">
          {/* Logo with magnetic pull inside its box */}
          <Link to="/" className="navbar__logo" aria-label="Studio CAB - Inicio">
            <motion.div 
              className="navbar__logo-text"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <span className="navbar__logo-grupo">GRUPO</span>
              <span className="navbar__logo-cab">CAB</span>
              <span className="navbar__logo-studio">— STUDIO —</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div 
            className="navbar__links"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="navbar__link-wrapper"
                onMouseEnter={() => {
                  setHoveredLink(link.name);
                  if (link.hasDropdown) setIsDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  if (link.hasDropdown) setIsDropdownOpen(false);
                }}
              >
                <Link
                  to={link.path}
                  className={`navbar__link ${isActive(link.path) ? 'navbar__link--active' : ''}`}
                >
                  <span className="navbar__link-text">
                    {link.name}
                    {link.hasDropdown && (
                      <motion.span
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: 'inline-flex', marginLeft: '6px', alignSelf: 'center' }}
                      >
                        <ChevronDown size={11} />
                      </motion.span>
                    )}
                  </span>

                  {/* Elastic Underline Effect (Vercel style) */}
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="nav-underline"
                      className="navbar__link-underline"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        className="navbar__dropdown"
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="navbar__dropdown-grid">
                          {services.map((service, i) => (
                            <motion.div
                              key={service.name}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05, duration: 0.4 }}
                            >
                              <Link
                                to={service.path}
                                className="navbar__dropdown-link"
                              >
                                <span className="navbar__dropdown-name">{service.name}</span>
                                <ArrowUpRight size={13} className="navbar__dropdown-arrow" />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA wrapped in Magnetic Wrapper */}
          <div className="navbar__cta-desktop">
            <MagneticButton strength={0.2} range={35}>
              <Link to="/contacto" className="btn-premium btn-premium-outline navbar__cta">
                <span>Cotiza tu Proyecto</span>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            className={`navbar__hamburger ${isMobileOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Abrir menú"
            aria-expanded={isMobileOpen}
          >
            <span className="navbar__hamburger-line navbar__hamburger-line-1" />
            <span className="navbar__hamburger-line navbar__hamburger-line-2" />
            <span className="navbar__hamburger-line navbar__hamburger-line-3" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="mobile-menu__content"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Noise overlay */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              <div className="mobile-menu__links">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.path}
                      className={`mobile-menu__link ${isActive(link.path) ? 'mobile-menu__link--active' : ''}`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mobile-menu__footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link
                  to="/contacto"
                  className="btn-premium btn-premium-primary"
                  onClick={() => setIsMobileOpen(false)}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  <span>Cotiza tu Proyecto</span>
                </Link>
                
                <div className="mobile-menu__info">
                  <p className="mobile-menu__info-location">CDMX y Área Metropolitana</p>
                  <p className="mobile-menu__info-mail">contacto@studiocab.mx</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
