import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Briefcase, 
  Armchair, 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Check, 
  MapPin, 
  Maximize2, 
  DollarSign,
  Send,
  Loader2
} from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import './ContactForm.css';

const PROJECT_TYPES = [
  {
    id: 'residencial',
    title: 'Residencial',
    subtitle: 'Villas, Departamentos & Casas',
    description: 'Diseño integral y remodelación de espacios residenciales de alta gama.',
    icon: Home
  },
  {
    id: 'comercial',
    title: 'Comercial',
    subtitle: 'Locales, Oficinas & Boutiques',
    description: 'Espacios corporativos y comerciales con identidad de marca sofisticada.',
    icon: Briefcase
  },
  {
    id: 'mobiliario',
    title: 'Mobiliario Especializado',
    subtitle: 'Cocinas, Closets & Piezas de Autor',
    description: 'Taller de diseño constructivo a medida con acabados premium y montaje digital.',
    icon: Armchair
  },
  {
    id: 'integral',
    title: 'Diseño & Obra Integral',
    subtitle: 'Desde el plano hasta la entrega',
    description: 'Gestión integral llave en mano de proyectos arquitectónicos completos.',
    icon: Compass
  }
];

const SPACE_SIZES = [
  { id: 'small', label: 'Menos de 50 m²', description: 'Espacios unitarios, recámaras, estudios' },
  { id: 'medium', label: '50 a 150 m²', description: 'Departamentos, oficinas medianas, locales' },
  { id: 'large', label: '150 a 300 m²', description: 'Residencias, plantas corporativas, showrooms' },
  { id: 'xlarge', label: 'Más de 300 m²', description: 'Casas completas, desarrollos, grandes superficies' }
];

const LOCATIONS = [
  { id: 'cdmx-poniente', label: 'CDMX Poniente', details: 'Polanco, Lomas, Santa Fe, Interlomas' },
  { id: 'cdmx-sur', label: 'CDMX Sur', details: 'Coyoacán, Pedregal, San Ángel, Del Valle' },
  { id: 'cdmx-centro', label: 'CDMX Centro', details: 'Roma, Condesa, Juárez, Cuauhtémoc' },
  { id: 'cdmx-norte', label: 'CDMX Norte & Satélite', details: 'Lindavista, Satélite, Lomas Verdes' },
  { id: 'edomex', label: 'Estado de México', details: 'Metepec, Huixquilucan, Otras áreas' },
  { id: 'otro', label: 'Otro / Fuera de Zona', details: 'Proyectos foráneos o cotizaciones especiales' }
];

const BUDGET_RANGES = [
  { id: 'premium', label: 'Premium', description: 'Mobiliario exclusivo y detalles selectos' },
  { id: 'exclusivo', label: 'Exclusivo', description: 'Remodelación parcial de diseño y acabados' },
  { id: 'firma', label: 'Firma / Integral', description: 'Proyecto arquitectónico y construcción total llave en mano' }
];

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // State for all form data
  const [formData, setFormData] = useState({
    projectType: '',
    spaceSize: '',
    location: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleSelectField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field if set
    if (formErrors[field]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateStep = (currentStep) => {
    const errors = {};
    if (currentStep === 1) {
      if (!formData.projectType) errors.projectType = 'Por favor selecciona un tipo de proyecto.';
    } else if (currentStep === 2) {
      if (!formData.spaceSize) errors.spaceSize = 'Por favor selecciona la dimensión del espacio.';
      if (!formData.location) errors.location = 'Por favor selecciona la ubicación de la obra.';
      if (!formData.budget) errors.budget = 'Por favor selecciona un nivel de inversión estimado.';
    } else if (currentStep === 3) {
      if (!formData.name.trim()) errors.name = 'El nombre es obligatorio.';
      if (!formData.email.trim()) {
        errors.email = 'El correo electrónico es obligatorio.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Por favor introduce un correo válido.';
      }
      if (!formData.phone.trim()) {
        errors.phone = 'El teléfono es obligatorio.';
      } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.phone.replace(/\s/g, ''))) {
        errors.phone = 'Por favor introduce un número de teléfono válido.';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setDirection(1);
      setStep(4);
    }, 1500);
  };

  const restartForm = () => {
    setFormData({
      projectType: '',
      spaceSize: '',
      location: '',
      budget: '',
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
    setFormErrors({});
    setDirection(-1);
    setStep(1);
  };

  // Build WhatsApp URL with form content summary
  const getWhatsAppUrl = () => {
    const selectedProj = PROJECT_TYPES.find(p => p.id === formData.projectType)?.title || formData.projectType;
    const selectedSize = SPACE_SIZES.find(s => s.id === formData.spaceSize)?.label || formData.spaceSize;
    const selectedLoc = LOCATIONS.find(l => l.id === formData.location)?.label || formData.location;
    const selectedBud = BUDGET_RANGES.find(b => b.id === formData.budget)?.label || formData.budget;

    const message = `Hola Studio CAB, me interesa cotizar un proyecto interactivo:

• Tipo de Proyecto: ${selectedProj}
• Dimensión: ${selectedSize}
• Ubicación: ${selectedLoc}
• Inversión Estimada: ${selectedBud}

• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}
${formData.notes ? `• Notas: ${formData.notes}` : ''}`;

    const phoneNumber = '5215512345678'; // Use original mockup phone
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  // Framer Motion Variants for slide effect
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const stepTransition = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.25 }
  };

  return (
    <section className="quote-form-section" id="cotizacion">
      {/* Background spotlights & radial gold glows */}
      <div className="quote-form__glow-bg" />
      <div className="ambient-spotlight light-glow" style={{ top: '20%', right: '10%', width: '400px', height: '400px' }} />
      <div className="ambient-spotlight wood-glow" style={{ bottom: '10%', left: '5%', width: '500px', height: '500px' }} />

      <div className="container container-narrow">
        <ScrollReveal>
          <div className="section-header quote-form-header">
            <span className="section-label">Cotizador Digital</span>
            <h2 className="quote-form-title">Diseña tu espacio ideal</h2>
            <p className="quote-form-subtitle">
              Calcula un estimado preliminar y comparte las especificaciones de tu obra con nuestro taller de arquitectura en solo 3 pasos.
            </p>
          </div>
        </ScrollReveal>

        {/* Progress Tracker */}
        <div className="quote-form-progress-container">
          <div className="progress-bar-background">
            <motion.div 
              className="progress-bar-fill"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / 3) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div className="progress-steps-labels">
            <div className={`step-label-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <div className="step-num">{step > 1 ? <Check size={14} /> : '1'}</div>
              <span>Proyecto</span>
            </div>
            <div className={`step-label-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <div className="step-num">{step > 2 ? <Check size={14} /> : '2'}</div>
              <span>Especificación</span>
            </div>
            <div className={`step-label-item ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
              <div className="step-num">{step > 3 ? <Check size={14} /> : '3'}</div>
              <span>Contacto</span>
            </div>
            <div className={`step-label-item ${step === 4 ? 'active completed' : ''}`}>
              <div className="step-num">{step === 4 ? <Check size={14} /> : '4'}</div>
              <span>Confirmación</span>
            </div>
          </div>
        </div>

        {/* Form Box (Glassmorphic Container) */}
        <div className="quote-form-card">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
              className="quote-form-step-wrapper"
            >
              {step === 1 && (
                <div className="step-content">
                  <h3 className="step-title">¿Qué tipo de proyecto deseas realizar?</h3>
                  <p className="step-desc">Elige la categoría que mejor describa la obra o mobiliario a cotizar.</p>
                  
                  {formErrors.projectType && (
                    <p className="error-message-alert">{formErrors.projectType}</p>
                  )}

                  <div className="project-types-grid">
                    {PROJECT_TYPES.map((type) => {
                      const IconComponent = type.icon;
                      const isSelected = formData.projectType === type.id;
                      return (
                        <div 
                          key={type.id} 
                          className={`project-type-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSelectField('projectType', type.id)}
                          data-cursor="pointer"
                        >
                          <div className="card-icon-wrap">
                            <IconComponent size={24} className="type-icon" />
                          </div>
                          <div className="card-info">
                            <h4>{type.title}</h4>
                            <span className="card-subtitle">{type.subtitle}</span>
                            <p>{type.description}</p>
                          </div>
                          <div className="selection-indicator">
                            <div className="selection-dot" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="step-content">
                  <h3 className="step-title">Detalles y Especificaciones de la Obra</h3>
                  <p className="step-desc">Ayúdanos a dimensionar el alcance técnico de tu propuesta.</p>

                  <div className="specs-fields-layout">
                    {/* Dimension Selection */}
                    <div className="spec-group">
                      <label className="spec-label">
                        <Maximize2 size={16} /> Dimensión aproximada (m²)
                      </label>
                      {formErrors.spaceSize && <span className="error-text">{formErrors.spaceSize}</span>}
                      <div className="spec-options-grid m2-grid">
                        {SPACE_SIZES.map((size) => (
                          <div 
                            key={size.id}
                            className={`spec-option-card ${formData.spaceSize === size.id ? 'selected' : ''}`}
                            onClick={() => handleSelectField('spaceSize', size.id)}
                            data-cursor="pointer"
                          >
                            <span className="option-title">{size.label}</span>
                            <span className="option-desc">{size.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Location Selection */}
                    <div className="spec-group">
                      <label className="spec-label">
                        <MapPin size={16} /> Ubicación del Proyecto
                      </label>
                      {formErrors.location && <span className="error-text">{formErrors.location}</span>}
                      <div className="spec-options-grid location-grid">
                        {LOCATIONS.map((loc) => (
                          <div 
                            key={loc.id}
                            className={`spec-option-card ${formData.location === loc.id ? 'selected' : ''}`}
                            onClick={() => handleSelectField('location', loc.id)}
                            data-cursor="pointer"
                          >
                            <span className="option-title">{loc.label}</span>
                            <span className="option-desc">{loc.details}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Budget Selection */}
                    <div className="spec-group">
                      <label className="spec-label">
                        <DollarSign size={16} /> Nivel de Inversión Estimado
                      </label>
                      {formErrors.budget && <span className="error-text">{formErrors.budget}</span>}
                      <div className="spec-options-grid budget-grid">
                        {BUDGET_RANGES.map((b) => (
                          <div 
                            key={b.id}
                            className={`spec-option-card ${formData.budget === b.id ? 'selected' : ''}`}
                            onClick={() => handleSelectField('budget', b.id)}
                            data-cursor="pointer"
                          >
                            <span className="option-title">{b.label}</span>
                            <span className="option-desc">{b.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="step-content">
                  <h3 className="step-title">Información de Contacto</h3>
                  <p className="step-desc">Completa tus datos para recibir la propuesta y asignarte un arquitecto especialista.</p>

                  <div className="contact-form-fields">
                    <div className="input-group-row">
                      {/* Name input */}
                      <div className="form-input-wrapper">
                        <label className="input-label" htmlFor="name">
                          <User size={14} /> Nombre Completo *
                        </label>
                        <div className="input-with-icon">
                          <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Ej. Sofía Mendoza"
                            value={formData.name}
                            onChange={handleChangeInput}
                            className={formErrors.name ? 'error' : ''}
                            required
                          />
                        </div>
                        {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                      </div>

                      {/* Email input */}
                      <div className="form-input-wrapper">
                        <label className="input-label" htmlFor="email">
                          <Mail size={14} /> Correo Electrónico *
                        </label>
                        <div className="input-with-icon">
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Ej. sofia@ejemplo.com"
                            value={formData.email}
                            onChange={handleChangeInput}
                            className={formErrors.email ? 'error' : ''}
                            required
                          />
                        </div>
                        {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                      </div>
                    </div>

                    <div className="input-group-row">
                      {/* Phone input */}
                      <div className="form-input-wrapper">
                        <label className="input-label" htmlFor="phone">
                          <Phone size={14} /> Teléfono (WhatsApp) *
                        </label>
                        <div className="input-with-icon">
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            placeholder="Ej. +52 55 1234 5678"
                            value={formData.phone}
                            onChange={handleChangeInput}
                            className={formErrors.phone ? 'error' : ''}
                            required
                          />
                        </div>
                        {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                      </div>
                    </div>

                    {/* Notes textarea */}
                    <div className="form-input-wrapper textarea-wrapper">
                      <label className="input-label" htmlFor="notes">
                        <MessageSquare size={14} /> Cuéntanos más sobre tu idea (opcional)
                      </label>
                      <textarea 
                        id="notes" 
                        name="notes" 
                        placeholder="Ej. Es una remodelación de departamento en Polanco. Queremos carpintería a medida de nogal para sala e isla de cocina, etc..."
                        rows={4}
                        value={formData.notes}
                        onChange={handleChangeInput}
                      />
                    </div>
                  </div>
                </form>
              )}

              {step === 4 && (
                <div className="step-content success-step-content">
                  <div className="success-icon-container">
                    <motion.div 
                      className="success-circle-bg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15, delay: 0.1 }}
                    >
                      <motion.svg 
                        width="80" 
                        height="80" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="var(--color-champagne)" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <motion.polyline 
                          points="20 6 9 17 4 12" 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.3 }}
                        />
                      </motion.svg>
                    </motion.div>
                  </div>

                  <h3 className="success-title">¡Propuesta Recibida Exitosamente!</h3>
                  <p className="success-desc">
                    Hemos procesado las características de tu espacio. Un arquitecto de nuestro taller se pondrá en contacto contigo en las próximas 24 horas laborables para agendar una sesión digital de previsualización 3D y presupuesto formal.
                  </p>

                  <div className="success-summary-box">
                    <h4>Resumen del Proyecto</h4>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <span className="summary-label">Proyecto:</span>
                        <span className="summary-val">{PROJECT_TYPES.find(p => p.id === formData.projectType)?.title || 'N/A'}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Dimensión:</span>
                        <span className="summary-val">{SPACE_SIZES.find(s => s.id === formData.spaceSize)?.label || 'N/A'}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Ubicación:</span>
                        <span className="summary-val">{LOCATIONS.find(l => l.id === formData.location)?.label || 'N/A'}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Inversión:</span>
                        <span className="summary-val">{BUDGET_RANGES.find(b => b.id === formData.budget)?.label || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="success-actions-row">
                    <a 
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-premium btn-premium-accent whatsapp-direct-btn"
                      data-cursor="pointer"
                    >
                      <Send size={16} /> <span>Enviar por WhatsApp</span>
                    </a>
                    
                    <button 
                      onClick={restartForm}
                      className="btn-premium btn-premium-outline"
                      data-cursor="pointer"
                    >
                      <span>Nueva Consulta</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              {step < 4 && (
                <div className="quote-form-navigation">
                  {step > 1 ? (
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="btn-premium btn-premium-outline btn-nav-back"
                      data-cursor="pointer"
                      disabled={isSubmitting}
                    >
                      <ChevronLeft size={16} /> <span>Atrás</span>
                    </button>
                  ) : (
                    <div className="nav-spacer" />
                  )}

                  {step < 3 ? (
                    <button 
                      type="button" 
                      onClick={nextStep}
                      className="btn-premium btn-premium-primary btn-nav-next"
                      data-cursor="pointer"
                    >
                      <span>Siguiente</span> <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button 
                      type="button"
                      onClick={handleSubmit}
                      className="btn-premium btn-premium-accent btn-nav-submit"
                      data-cursor="pointer"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="spinner-icon animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <span>Finalizar Cotización</span> <Check size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
