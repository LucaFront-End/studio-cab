import { useState, useEffect, useRef } from 'react';
import ScrollReveal from '../shared/ScrollReveal';
import './Zones.css';

/* Zone data — geographically positioned */
const zones = [
  {
    id: 'cdmx-poniente',
    name: 'Poniente CDMX',
    areas: 'Polanco, Lomas de Chapultepec, Santa Fe, Reforma, Bosques, San Ángel',
    cx: 122, cy: 187,
  },
  {
    id: 'cdmx-sur',
    name: 'Sur CDMX',
    areas: 'Coyoacán, Del Valle, Pedregal, Tlalpan, Xochimilco',
    cx: 195, cy: 270,
  },
  {
    id: 'cdmx-centro',
    name: 'Centro CDMX',
    areas: 'Roma, Condesa, Juárez, Cuauhtémoc, Centro Histórico',
    cx: 205, cy: 175,
  },
  {
    id: 'cdmx-norte',
    name: 'Norte CDMX',
    areas: 'Lindavista, Azcapotzalco, GAM, Vallejo, Tepeyac',
    cx: 212, cy: 110,
  },
  {
    id: 'edomex-poniente',
    name: 'Poniente Edomex',
    areas: 'Satélite, Naucalpan, Tlalnepantla, Atizapán, Huixquilucan, Interlomas',
    cx: 105, cy: 90,
  },
  {
    id: 'edomex-oriente',
    name: 'Oriente Edomex',
    areas: 'Ecatepec, Nezahualcóyotl, Texcoco, Chalco',
    cx: 295, cy: 155,
  },
];

/* Geographically-inspired SVG paths for CDMX + Edomex */
const zonePaths = {
  'cdmx-poniente': 'M95,135 L140,130 L160,155 L160,200 L155,240 L130,250 L100,235 L80,200 L75,165 Z',
  'cdmx-centro': 'M140,130 L240,120 L255,145 L260,185 L250,210 L210,220 L160,225 L155,200 L160,155 Z',
  'cdmx-norte': 'M140,100 L190,85 L245,90 L275,110 L255,145 L240,120 L140,130 Z',
  'cdmx-sur': 'M130,250 L155,240 L160,225 L210,220 L250,210 L270,235 L265,275 L240,310 L210,340 L175,345 L145,320 L120,285 Z',
  'edomex-poniente': 'M20,50 L120,25 L190,30 L190,85 L140,100 L140,130 L95,135 L75,165 L45,150 L25,110 Z',
  'edomex-oriente': 'M190,30 L300,20 L380,60 L385,140 L370,220 L340,280 L300,310 L265,275 L270,235 L250,210 L260,185 L255,145 L275,110 L245,90 L190,85 Z',
};

const marqueeAreas = [
  'Polanco', 'Condesa', 'Roma', 'Del Valle', 'Coyoacán',
  'Santa Fe', 'Lomas de Chapultepec', 'Satélite', 'Naucalpan', 'Tlalnepantla',
  'Bosques de las Lomas', 'Lindavista', 'Pedregal', 'Reforma', 'San Ángel',
  'Huixquilucan', 'Interlomas', 'Nezahualcóyotl', 'Metepec', 'Atizapán',
  'Tlalpan', 'Lerma', 'Toluca',
];

export default function Zones() {
  const [active, setActive] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });
  const sectionRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    section.querySelectorAll('.zones-content, .zones-map-container, .zones-marquee-wrap').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleZoneEnter = (zone, e) => {
    setActive(zone);
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltip({
        visible: true,
        x: e.clientX - rect.left + 15,
        y: e.clientY - rect.top - 60,
      });
    }
  };

  const handleZoneMove = (e) => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltip((t) => ({
        ...t,
        x: e.clientX - rect.left + 15,
        y: e.clientY - rect.top - 60,
      }));
    }
  };

  const handleZoneLeave = () => {
    setActive(null);
    setTooltip((t) => ({ ...t, visible: false }));
  };

  const renderMarqueeItems = () =>
    marqueeAreas.map((area, i) => (
      <span className="marquee-item" key={i}>
        {area}
        <span className="marquee-dot">•</span>
      </span>
    ));

  const phoneNumber = '5215512345678';
  const message = encodeURIComponent('Hola, me interesa saber si mi zona de obra tiene cobertura con Studio CAB.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <section className="zones theme-light" id="zonas" ref={sectionRef}>
      {/* Subtle radial gold glow behind */}
      <div className="zones__glow-bg" />

      <div className="container">
        <div className="zones-layout">
          {/* ---- Left: Text content ---- */}
          <div className="zones-content">
            <span className="section-label zones-section-label">Cobertura</span>
            <h2 className="zones-title">
              Toda la <em>zona metro</em><br />
              al alcance de obra
            </h2>
            <p className="zones-desc">
              Llevamos nuestro taller de diseño constructivo y montaje digital directo a tu local o residencia. Logística, traslado e instalación sin costo adicional dentro de nuestras zonas activas.
            </p>

            <div className="zones-stats">
              <div>
                <span className="zones-stat-value">15+</span>
                <span className="zones-stat-label">Colonias</span>
              </div>
              <div>
                <span className="zones-stat-value">$0</span>
                <span className="zones-stat-label">Logística</span>
              </div>
              <div>
                <span className="zones-stat-value">24h</span>
                <span className="zones-stat-label">Respuesta</span>
              </div>
            </div>

            <div className="zones-buttons">
              <a
                href={whatsappUrl}
                className="zones-cta"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
              >
                <span>Consultar mi zona</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            {/* Central Showroom / Workshop Address */}
            <a
              href="https://maps.google.com"
              className="zones-address"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Naucalpan, Estado de México, C.P. 53500</span>
            </a>
          </div>

          {/* ---- Right: SVG Map ---- */}
          <div className="zones-map-container" ref={mapRef}>
            <svg
              className="zones-map"
              viewBox="0 0 410 370"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid dots for technical/blueprint atmosphere */}
              {Array.from({ length: 24 }, (_, row) =>
                Array.from({ length: 26 }, (_, col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={col * 16 + 4}
                    cy={row * 16 + 4}
                    r="0.5"
                    fill="rgba(75, 54, 33, 0.05)" /* Subtle wood-nogal colored dots */
                  />
                ))
              )}

              {/* Zone shapes / Grouped paths */}
              {zones.map((zone) => (
                <g
                  className="zone-group"
                  key={zone.id}
                  onMouseEnter={(e) => handleZoneEnter(zone, e)}
                  onMouseMove={handleZoneMove}
                  onMouseLeave={handleZoneLeave}
                >
                  <path
                    className={`zone-path ${
                      zone.id.startsWith('cdmx') 
                        ? 'zone-cdmx' 
                        : 'zone-edomex'
                    }${active?.id === zone.id ? ' active' : ''}`}
                    d={zonePaths[zone.id]}
                  />
                  <circle className="zone-dot" cx={zone.cx} cy={zone.cy} r="2.5" />
                  <text className="zone-label" x={zone.cx} y={zone.cy + 4}>
                    {zone.id.startsWith('edomex')
                      ? (zone.id === 'edomex-poniente' ? 'Satélite' : 'Oriente')
                      : zone.name.split(' ')[0]}
                  </text>
                </g>
              ))}
            </svg>

            {/* Map Legend Swatches */}
            <div className="zones-legend">
              <div className="zones-legend-item">
                <span className="zones-legend-swatch zones-legend-cdmx" />
                <span>Ciudad de México (Cobertura Total)</span>
              </div>
              <div className="zones-legend-item">
                <span className="zones-legend-swatch zones-legend-edomex" />
                <span>Estado de México (Cobertura Total)</span>
              </div>
            </div>

            {/* Floating Glassmorphic Tooltip */}
            <div
              className={`zones-tooltip${tooltip.visible ? ' visible' : ''}`}
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              {active && (
                <>
                  <div className="zones-tooltip-title">{active.name}</div>
                  <div className="zones-tooltip-areas">{active.areas}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---- Horizontal Marquee Carousel ---- */}
      <div className="zones-marquee-wrap">
        <div className="zones-marquee">
          <div className="zones-marquee-track">
            {renderMarqueeItems()}
            {renderMarqueeItems()}
          </div>
        </div>
      </div>
    </section>
  );
}
