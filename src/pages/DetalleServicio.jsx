import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ChevronDown, Check, Zap, Cpu, Award } from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/shared/ScrollReveal';
import MagneticButton from '../components/shared/MagneticButton';
import CtaSection from '../components/home/CtaSection';

// Import images for consistent visuals
import heroImg from '../assets/images/hero-restaurant.png';
import residentialImg from '../assets/images/residential-interior.png';
import carpinteriaImg from '../assets/images/carpinteria-mobiliario.png';
import procesoImg from '../assets/images/proceso-instalacion.png';

// Import textures for the moodboards
import woodNogalTexture from '../assets/images/wood-nogal-texture.png';
import concreteTexture from '../assets/images/concrete-texture.png';
import champagneMetalTexture from '../assets/images/champagne-metal-texture.png';
import flutedGlassTexture from '../assets/images/fluted-glass-texture.png';

import './DetalleServicio.css';

const serviceDetailsData = {
  comercial: {
    id: 'comercial',
    title: 'Diseño Comercial',
    tagline: 'DISEÑO • OPERACIÓN • MARCA',
    subtitle: 'Espacios comerciales de alto rendimiento que atraen y convierten.',
    description: 'Diseñamos locales comerciales, restaurantes, hoteles y showrooms enfocados en optimizar la experiencia de compra o consumo y el flujo operativo. Cada metro cuadrado se planifica estratégicamente para maximizar tu facturación y reflejar la identidad premium de tu marca.',
    image: heroImg,
    watermark: 'COMER',
    metrics: [
      { val: '+35%', label: 'Conversión de Ventas', icon: Zap },
      { val: '72h', label: 'Entrega de Distribución', icon: Cpu },
      { val: 'CDMX', label: 'Cobertura Integral', icon: Award },
    ],
    features: [
      { title: 'Distribución y Zonificación', desc: 'Análisis de flujos de clientes y personal para crear un layout eficiente y evitar cuellos de botella.' },
      { title: 'Moodboard de Marca', desc: 'Curaduría de texturas, iluminación y acabados alineados al branding y estatus de tu negocio.' },
      { title: 'Planos Constructivos Ejecutivos', desc: 'Ingeniería detallada para que la obra civil, herrería y acabados encajen sin demoras.' },
      { title: 'Producción & Mobiliario', desc: 'Fabricación digital de barras, mostradores y exhibidores en nuestro taller propio.' },
    ],
    materials: [
      { name: 'Vidrio Estriado / Fluted Glass', desc: 'Divisores elegantes que filtran la luz sin restar amplitud visual.', texture: flutedGlassTexture },
      { name: 'Metal Champagne Satinado', desc: 'Detalles de herrería fina para acabados premium y acentos de marca.', texture: champagneMetalTexture },
      { name: 'Concreto Estructural', desc: 'Terminados con texturas arquitectónicas que añaden un look industrial de lujo.', texture: concreteTexture },
    ],
    faqs: [
      { q: '¿Realizan el trámite de permisos en centros comerciales?', a: 'Entregamos el dossier técnico completo y planos ejecutivos autorizados bajo normativas de plaza, y te asesoramos durante el proceso de aprobación.' },
      { q: '¿Qué incluye el proyecto de diseño comercial?', a: 'Layout de distribución, renders fotorrealistas de alta definición, plano de iluminación, guías mecánicas y el catálogo completo de especificaciones de mobiliario.' },
      { q: '¿Se encargan también de la fabricación?', a: 'Sí, somos un estudio integrado. Diseñamos el espacio y fabricamos todo el mobiliario a medida en nuestro taller CNC, controlando tiempos y calidad de inicio a fin.' }
    ]
  },
  residencial: {
    id: 'residencial',
    title: 'Interiorismo Residencial',
    tagline: 'LUJO • BIENESTAR • HOGAR',
    subtitle: 'Hogares con alma minimalista, funcionales y atemporales.',
    description: 'Creamos espacios residenciales personalizados que equilibran la estética contemporánea con la calidez del hogar. Nos especializamos en proyectos integrales que incluyen remodelaciones, cocinas de alta gama, vestidores y áreas sociales diseñadas a la medida de tu estilo de vida.',
    image: residentialImg,
    watermark: 'HOGAR',
    metrics: [
      { val: '100%', label: 'Diseño Exclusivo', icon: Award },
      { val: 'CNC', label: 'Corte de Alta Precisión', icon: Cpu },
      { val: 'Llave', label: 'Entrega en Mano', icon: Zap },
    ],
    features: [
      { title: 'Entrevista de Estilo', desc: 'Alineamos tus hábitos, necesidades de almacenaje y preferencias cromáticas antes de dibujar.' },
      { title: 'Modelado 3D & Renders', desc: 'Visualiza la iluminación natural, texturas de piedra y maderas finas antes de la producción.' },
      { title: 'Ingeniería de Carpintería', desc: 'Desarrollamos los ensambles y guías mecánicas para closets, cocinas integrales y baños.' },
      { title: 'Instalación y Ajuste en Obra', desc: 'Supervisión directa en tu hogar para garantizar juntas perfectas y terminados limpios.' },
    ],
    materials: [
      { name: 'Nogal Americano Mate', desc: 'Madera fina con vetas ricas y continuas que aporta máxima calidez.', texture: woodNogalTexture },
      { name: 'Concreto y Enlucidos', desc: 'Muros de yeso continuo y texturas minerales de look minimalista.', texture: concreteTexture },
      { name: 'Detalles Champagne', desc: 'Acentos en bisagras y perfiles para una elegancia sutil e integrada.', texture: champagneMetalTexture },
    ],
    faqs: [
      { q: '¿Diseñan sobre espacios ya existentes?', a: 'Sí, realizamos remodelaciones totales o parciales adaptando la arquitectura original e incorporando soluciones de carpintería inteligente para optimizar el espacio.' },
      { q: '¿Cuál es el tiempo de entrega residencial?', a: 'Un proyecto conceptual toma de 2 a 3 semanas. La fabricación de mobiliario residencial a gran escala en nuestro taller toma de 4 a 6 semanas tras autorizar planos.' },
      { q: '¿Puedo comprar solo el diseño sin la fabricación?', a: 'Ofrecemos proyectos ejecutivos listos para que los construya tu contratista preferido, aunque nuestro mayor valor radica en la integración Diseño + Taller propio.' }
    ]
  },
  carpinteria: {
    id: 'carpinteria',
    title: 'Carpintería & Mobiliario',
    tagline: 'TALLER • CNC • PRECISIÓN',
    subtitle: 'Fabricación digital y ensamble artesanal en nuestro propio taller.',
    description: 'Producimos mobiliario comercial y residencial a medida de alta gama. Contamos con un taller equipado con tecnología de control numérico (CNC) y un equipo de ebanistas calificados para procesar maderas finas, chapas naturales y acabados en laca con precisión milimétrica.',
    image: carpinteriaImg,
    watermark: 'CRAFT',
    metrics: [
      { val: '1mm', label: 'Tolerancia Máxima', icon: Cpu },
      { val: 'CNC', label: 'Corte Automatizado', icon: Zap },
      { val: 'Premium', label: 'Chapas Seleccionadas', icon: Award },
    ],
    features: [
      { title: 'Revisión y Ajuste de Planos', desc: 'Revisamos planos constructivos o arquitectónicos para validar dimensiones en sitio.' },
      { title: 'Maquinado y Corte Digital', desc: 'Corte digital automatizado que asegura un aprovechamiento óptimo de placas y precisión en juntas.' },
      { title: 'Acabado en Cabina', desc: 'Aplicación de selladores, tintes y lacas de poliuretano en un ambiente controlado libre de polvo.' },
      { title: 'Pre-armado de Control', desc: 'Ensamblamos previamente las piezas complejas en taller para acortar tiempos en obra y validar ensambles.' },
    ],
    materials: [
      { name: 'Nogal Americano', desc: 'Chapas naturales de madera seleccionada individualmente para frentes continuos.', texture: woodNogalTexture },
      { name: 'Vidrio Estriado Acústico', desc: 'Panelería translúcida ideal para divisiones elegantes.', texture: flutedGlassTexture },
      { name: 'Champagne Herrería', desc: 'Pinturas y recubrimientos metálicos satinados de alta duración.', texture: champagneMetalTexture },
    ],
    faqs: [
      { q: '¿Puedo cotizar si ya tengo mi propio diseño de carpintería?', a: 'Sí, colaboramos frecuentemente con arquitectos y despachos de interiorismo externos. Traducimos tus renders y croquis en shop drawings y fabricamos en nuestro taller.' },
      { q: '¿Qué tipo de materiales utilizan?', a: 'Trabajamos con chapas naturales (nogal, encino, tzalam), maderas sólidas, tableros MDF de alta densidad y herrajes importados (bisagras y correderas de cierre suave).' },
      { q: '¿Tienen compra mínima de mobiliario?', a: 'Nos enfocamos principalmente en proyectos integrales (equipamiento de locales completos, cocinas residenciales, vestidores u oficinas), no en piezas sueltas de catálogo.' }
    ]
  },
  produccion: {
    id: 'produccion',
    title: 'Producción & Instalación',
    tagline: 'INGENIERÍA • OBRA • ENTREGA',
    subtitle: 'Ejecución técnica impecable desde el taller hasta la entrega final en obra.',
    description: 'Nos encargamos de todo el proceso de montaje en obra e instalación final. Contamos con cuadrillas de instaladores profesionales coordinadas por supervisores técnicos para asegurar que la carpintería y herrería queden integradas a la perfección con la obra civil e instalaciones.',
    image: procesoImg,
    watermark: 'BUILD',
    metrics: [
      { val: '100%', label: 'Supervisión Técnica', icon: Award },
      { val: '0', label: 'Retrasos en Obra', icon: Zap },
      { val: 'Full', label: 'Montaje Llave en Mano', icon: Cpu },
    ],
    features: [
      { title: 'Levantamiento Láser', desc: 'Medición física con herramientas láser de precisión antes de despachar del taller.' },
      { title: 'Logística Protegida', desc: 'Embalaje protector individual y transporte especializado para evitar golpes o ralladuras en el mobiliario.' },
      { title: 'Fijación de Seguridad', desc: 'Anclaje y ensamble de carpintería en muros mediante sistemas ocultos y nivelación exacta.' },
      { title: 'Detallado e Integración', desc: 'Ajustes finos de herrajes en sitio, retapados de uniones e integración de tiras LED de iluminación cálida.' },
    ],
    materials: [
      { name: 'Herrajes e Iluminación LED', desc: 'Difusores de aluminio empotrados en carpintería para iluminación indirecta.', texture: champagneMetalTexture },
      { name: 'Madera Walnut / Acabados', desc: 'Ceras de pulido y lacas para retoques finales invisibles en obra.', texture: woodNogalTexture },
      { name: 'Sistemas de Anclaje Oculto', desc: 'Colgadores estructurales franceses que evitan tornillos visibles.', texture: concreteTexture },
    ],
    faqs: [
      { q: '¿Coordinan su trabajo con otros contratistas de obra?', a: 'Absolutamente. Nuestro supervisor técnico se coordina directamente con tu contratista general, electricistas y pintores para prever las salidas de luz y preparar los muros de carga.' },
      { q: '¿Qué garantía ofrecen en la instalación?', a: 'Ofrecemos 1 año de garantía en herrajes, desajustes y uniones bajo condiciones de uso normal, con visitas de mantenimiento técnico si lo requieres.' },
      { q: '¿Hacen instalaciones fuera de la CDMX?', a: 'Nuestra zona de montaje activo cubre la CDMX y Área Metropolitana. Para proyectos especiales foráneos (hoteles o franquicias), coordinamos el traslado y viáticos del equipo de montaje.' }
    ]
  }
};

export default function DetalleServicio() {
  const { id } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const service = serviceDetailsData[id];

  if (!service) {
    return (
      <div className="service-error container">
        <h2>Servicio no encontrado</h2>
        <p>La categoría que buscas no existe o fue modificada.</p>
        <Link to="/servicios" className="btn-premium btn-premium-primary">
          <span>Volver a Servicios</span>
        </Link>
      </div>
    );
  }

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="service-detail-page"
    >
      {/* ── Editorial Hero Section ── */}
      <section className="service-detail-hero">
        <div className="service-detail-hero__bg">
          <img src={service.image} alt={service.title} />
          <div className="service-detail-hero__overlay" />
        </div>

        {/* Floating large watermark text background */}
        <div className="service-detail-hero__watermark">
          {service.watermark}
        </div>

        <div className="container service-detail-hero__container">
          <div className="service-detail-hero__content">
            {/* Breadcrumbs */}
            <div className="service-detail-hero__breadcrumbs">
              <Link to="/">Inicio</Link>
              <span className="crumb-sep">/</span>
              <Link to="/servicios">Servicios</Link>
              <span className="crumb-sep">/</span>
              <span className="crumb-active">{service.title}</span>
            </div>

            <span className="section-label" style={{ color: 'var(--color-champagne)' }}>
              {service.tagline}
            </span>
            
            <h1 className="service-detail-hero__title">
              {service.title}
            </h1>

            <p className="service-detail-hero__subtitle">
              {service.subtitle}
            </p>

            <div className="service-detail-hero__nav">
              <Link to="/servicios" className="service-detail-hero__back">
                <ArrowLeft size={14} style={{ marginRight: '8px' }} />
                <span>Volver a todos los servicios</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview Section ── */}
      <section className="service-overview section theme-light">
        <div className="container">
          <div className="service-overview__split">
            {/* Left Column: Description */}
            <div className="service-overview__left">
              <ScrollReveal variant="fadeRight">
                <span className="section-label">Introducción</span>
                <h2 className="service-overview__title">Enfoque Técnico y Estético</h2>
                <div className="architect-line mt-sm mb-lg" style={{ maxWidth: '80px' }} />
                <p className="service-overview__desc">
                  {service.description}
                </p>
              </ScrollReveal>
            </div>

            {/* Right Column: Strategic Metrics Grid */}
            <div className="service-overview__right">
              <StaggerContainer className="service-metrics__grid" staggerDelay={0.1}>
                {service.metrics.map((metric, i) => {
                  const Icon = metric.icon;
                  return (
                    <StaggerItem key={i} variant="scale">
                      <div className="service-metric-card">
                        <div className="service-metric-card__header">
                          <span className="service-metric-card__val">{metric.val}</span>
                          <div className="service-metric-card__icon-box">
                            <Icon size={16} strokeWidth={1.5} />
                          </div>
                        </div>
                        <span className="service-metric-card__label">{metric.label}</span>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ── Specific Process / Workflow ── */}
      <section className="service-process section">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <div className="section-header text-center">
              <span className="section-label">Metodología</span>
              <h2>Flujo de Trabajo Especializado</h2>
              <div className="architect-line mt-md mb-2xl" style={{ maxWidth: '140px', margin: '0 auto' }} />
            </div>
          </ScrollReveal>

          <div className="service-process__grid">
            {service.features.map((feat, i) => (
              <ScrollReveal 
                key={i} 
                variant="fadeUp" 
                delay={i * 0.1}
                className="service-process__card"
              >
                <div className="service-process__num">0{i + 1}</div>
                <h4 className="service-process__card-title">{feat.title}</h4>
                <p className="service-process__card-desc">{feat.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Materials & Texture Moodboard ── */}
      <section className="service-materials section theme-light">
        <div className="container">
          <div className="service-materials__split">
            {/* Left: Content and Specs */}
            <div className="service-materials__left">
              <ScrollReveal variant="fadeRight">
                <span className="section-label">Moodboard</span>
                <h2>Materiales y Texturas Sugeridas</h2>
                <div className="architect-line mt-sm mb-lg" style={{ maxWidth: '80px' }} />
                <p className="service-materials__desc">
                  La selección cromática y de materiales es fundamental para definir el estatus de un local o vivienda. Proponemos una curaduría táctil alineada con nuestro concepto de minimalismo cálido y arquitectura comercial de alto nivel.
                </p>
                <ul className="service-materials__list">
                  {service.materials.map((mat, i) => (
                    <li key={i} className="service-materials__list-item">
                      <Check size={14} className="service-materials__list-icon" />
                      <span>{mat.name}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>

            {/* Right: Interactive 3D Plates Showcase */}
            <div className="service-materials__right">
              <div className="service-materials__grid">
                {service.materials.map((mat, i) => (
                  <ScrollReveal 
                    key={i} 
                    variant="scale" 
                    delay={i * 0.15}
                    className="service-material-plate"
                  >
                    <div className="service-material-plate__card">
                      <div className="service-material-plate__image">
                        <img src={mat.texture} alt={mat.name} />
                      </div>
                      <div className="service-material-plate__info">
                        <h4>{mat.name}</h4>
                        <p>{mat.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section (Accordions) ── */}
      <section className="service-faq section">
        <div className="container container-narrow">
          <ScrollReveal variant="fadeUp">
            <div className="section-header text-center">
              <span className="section-label">Preguntas Frecuentes</span>
              <h2>Consultas Técnicas</h2>
              <div className="architect-line mt-md mb-2xl" style={{ maxWidth: '140px', margin: '0 auto' }} />
            </div>
          </ScrollReveal>

          <div className="service-faq__list">
            {service.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <ScrollReveal 
                  key={i} 
                  variant="fadeUp" 
                  delay={i * 0.1}
                  className={`service-faq__item ${isOpen ? 'service-faq__item--open' : ''}`}
                >
                  <button 
                    className="service-faq__header"
                    onClick={() => toggleFaq(i)}
                  >
                    <h4>{faq.q}</h4>
                    <ChevronDown size={18} className="service-faq__arrow" />
                  </button>
                  <div className="service-faq__content">
                    <div className="service-faq__answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reused Contact CTA section */}
      <CtaSection />
    </motion.main>
  );
}
