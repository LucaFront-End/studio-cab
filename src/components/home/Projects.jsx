import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import MagneticButton from '../shared/MagneticButton';
import heroImg from '../../assets/images/hero-restaurant.png';
import hotelImg from '../../assets/images/hotel-interior.png';
import retailImg from '../../assets/images/retail-commercial.png';
import residentialImg from '../../assets/images/residential-interior.png';
import carpinteriaImg from '../../assets/images/carpinteria-mobiliario.png';
import './Projects.css';

const categories = ['Todos', 'Restaurantes', 'Hoteles', 'Retail', 'Residencial', 'Mobiliario'];

const projectsData = [
  {
    id: 1,
    title: 'Terraza Cha Cha Chá',
    category: 'Restaurantes',
    image: heroImg,
    problem: 'Espacio subutilizado al aire libre sin identidad de marca definida.',
    solution: 'Diseño integral con mobiliario personalizado de exterior y barras estratégicas.',
    result: 'Incremento del 40% en tráfico de clientes y ticket promedio.',
  },
  {
    id: 2,
    title: 'Hotel Barceló Reforma',
    category: 'Hoteles',
    image: hotelImg,
    problem: 'Lobby principal con flujos cruzados y falta de una experiencia de recepción premium.',
    solution: 'Rediseño de circulación con materiales nobles, plafones acústicos y carpintería fina.',
    result: 'Calificación sobresaliente en la experiencia de check-in de los huéspedes.',
  },
  {
    id: 3,
    title: 'Boutique Polanco',
    category: 'Retail',
    image: retailImg,
    problem: 'Exhibición de calzado de lujo desorganizada y sin una iluminación estratégica.',
    solution: 'Mostradores y nichos sobre diseño en nogal y acero cepillado con luces integradas.',
    result: 'Incremento de conversión de ventas en tienda física de un 60%.',
  },
  {
    id: 4,
    title: 'Residencia Santa Fe',
    category: 'Residencial',
    image: residentialImg,
    problem: 'Zonas comunes fragmentadas y desconexión con la terraza principal.',
    solution: 'Interiorismo integral con mobiliario fijo y carpintería arquitectónica a la medida.',
    result: 'Espacios fluidos, luminosos y con alto nivel de detalle estético.',
  },
  {
    id: 5,
    title: 'Showroom Mazda',
    category: 'Retail',
    image: carpinteriaImg,
    problem: 'Área de entrega de vehículos sin impacto de marca ni ceremonia.',
    solution: 'Revestimiento arquitectónico de muros en taller y módulos de entrega retroiluminados.',
    result: 'Experiencia de cliente memorable replicada en 3 sucursales metropolitanas.',
  }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredFilter, setHoveredFilter] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState(projectsData[0].id);

  const filtered = activeCategory === 'Todos'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  // Synchronize active project when filter changes
  useEffect(() => {
    if (filtered.length > 0) {
      const exists = filtered.some(p => p.id === activeProjectId);
      if (!exists) {
        setActiveProjectId(filtered[0].id);
      }
    }
  }, [activeCategory, filtered, activeProjectId]);

  const activeProject = projectsData.find(p => p.id === activeProjectId) || filtered[0] || projectsData[0];

  return (
    <section className="projects section" id="proyectos">
      {/* Background ambient glow lights */}
      <div className="ambient-spotlight light-glow" style={{ top: '20%', left: '5%', width: '500px', height: '500px', opacity: 0.05 }} />
      <div className="ambient-spotlight wood-glow" style={{ bottom: '15%', right: '5%', width: '450px', height: '450px', opacity: 0.04 }} />

      <div className="container">
        <ScrollReveal variant="fadeUp">
          <div className="section-header">
            <span className="section-label">Portafolio</span>
            <h2>Proyectos Destacados</h2>
            <div className="architect-line mt-md mb-md" style={{ maxWidth: '140px', margin: '0 auto' }} />
            <p>Cada espacio tiene un propósito de negocio. Explora cómo integramos diseño comercial estratégico, residencial y carpintería propia.</p>
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div 
            className="projects__filters"
            onMouseLeave={() => setHoveredFilter(null)}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`projects__filter ${activeCategory === cat ? 'projects__filter--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setHoveredFilter(cat)}
              >
                <span className="projects__filter-text">{cat}</span>

                {/* Sliding active filter pill */}
                {activeCategory === cat && (
                  <motion.div
                    className="projects__filter-active-indicator"
                    layoutId="projectActiveFilter"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}

                {/* Hover line indicator */}
                {hoveredFilter === cat && activeCategory !== cat && (
                  <motion.div
                    className="projects__filter-hover-indicator"
                    layoutId="projectHoverFilter"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Split Screen Container */}
        <div className="projects__split-container">
          {/* Left Column: Interactive Catalog List */}
          <div className="projects__list-pane">
            <motion.div className="projects__list" layout>
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => {
                  const isActive = activeProjectId === project.id;
                  
                  return (
                    <motion.div
                      key={project.id}
                      className={`project-item ${isActive ? 'project-item--active' : ''}`}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Project Header Row */}
                      <div 
                        className="project-item__header"
                        onMouseEnter={() => {
                          if (window.innerWidth >= 1024) setActiveProjectId(project.id);
                        }}
                        onClick={() => setActiveProjectId(project.id)}
                      >
                        <span className="project-item__num">0{index + 1}</span>
                        <h3 className="project-item__title">{project.title}</h3>
                        <span className="project-item__tag">{project.category}</span>
                        <div className="project-item__arrow">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>

                      {/* Expandable Stories Detail Area (Accordion) */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            className="project-item__details"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {/* Mobile Inline Image (Only visible in mobile CSS) */}
                            <div className="project-item__mobile-image">
                              <img src={project.image} alt={project.title} />
                              <div className="project-item__mobile-overlay" />
                            </div>

                            {/* Details Grid (Problem / Solution / Result) */}
                            <div className="project-item__story-grid">
                              <div className="project-item__story-block">
                                <span className="project-item__story-label">Problema</span>
                                <p>{project.problem}</p>
                              </div>
                              <div className="project-item__story-block">
                                <span className="project-item__story-label">Solución</span>
                                <p>{project.solution}</p>
                              </div>
                              <div className="project-item__story-block">
                                <span className="project-item__story-label">Resultado</span>
                                <p className="project-item__story-result-text">{project.result}</p>
                              </div>
                            </div>

                            {/* Action CTA */}
                            <div className="project-item__actions">
                              <MagneticButton strength={0.12} range={20}>
                                <Link to="/contacto" className="btn-premium btn-premium-outline btn-premium-sm">
                                  <span>Ver caso completo</span>
                                  <ArrowUpRight size={13} style={{ marginLeft: '4px' }} />
                                </Link>
                              </MagneticButton>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column: Immersive Showcase Viewer */}
          <div className="projects__viewer-pane" data-cursor="view" data-cursor-text="VER">
            <div className="projects__viewer-grid" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProjectId}
                className="projects__viewer-image-wrapper"
                initial={{ opacity: 0, scale: 1.03, x: 15 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97, x: -15 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  draggable="false"
                />
                <div className="projects__viewer-overlay" />
                <div className="projects__viewer-info-badge">
                  <span className="projects__viewer-tag">{activeProject.category}</span>
                  <span className="projects__viewer-name">{activeProject.title}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Global Portafolio CTA */}
        <ScrollReveal variant="fadeUp" delay={0.15}>
          <div className="projects__more">
            <MagneticButton strength={0.15} range={35}>
              <Link to="/contacto" className="btn-premium btn-premium-outline">
                <span>Ver todos los proyectos</span>
                <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
