import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import ImageReveal from '../shared/ImageReveal';
import { StaggerContainer, StaggerItem } from '../shared/ScrollReveal';
import MagneticButton from '../shared/MagneticButton';
import './ServiceCategory.css';

export default function ServiceCategory({
  id,
  title,
  description,
  image,
  imageAlt,
  subServices,
  reversed = false,
  index = 0,
}) {
  // Alternating between dark theme (default) and light theme (theme-light)
  const isLightTheme = index % 2 === 0;

  return (
    <section 
      className={`service-cat section ${isLightTheme ? 'theme-light' : ''}`} 
      id={id}
    >
      {/* Background spotlights */}
      {isLightTheme ? (
        <div className="ambient-spotlight light-glow" style={{ top: '20%', left: reversed ? '70%' : '10%', width: '450px', height: '450px', opacity: 0.05 }} />
      ) : (
        <div className="ambient-spotlight wood-glow" style={{ top: '20%', left: reversed ? '10%' : '70%', width: '450px', height: '450px', opacity: 0.06 }} />
      )}

      <div className="container">
        <div className={`service-cat__layout ${reversed ? 'service-cat__layout--reversed' : ''}`}>
          {/* Image Side */}
          <div className="service-cat__image-col">
            <div className="service-cat__image-container">
              <ImageReveal
                src={image}
                alt={imageAlt}
                className="service-cat__image"
                direction={reversed ? 'right' : 'left'}
                delay={0.1}
              />
              {/* Floating decorative outline frame */}
              <div className={`service-cat__image-accent ${reversed ? 'service-cat__image-accent--reversed' : ''}`} />
            </div>
          </div>

          {/* Content Side */}
          <div className="service-cat__content-col">
            <ScrollReveal variant={reversed ? 'fadeLeft' : 'fadeRight'}>
              <span className="service-cat__number">0{index + 1}</span>
              <h2 className="service-cat__title">{title}</h2>
              <div className="architect-line mt-md mb-2xl" style={{ maxWidth: '100px' }} />
              <p className="service-cat__desc">{description}</p>
            </ScrollReveal>

            {/* Subservices List */}
            <StaggerContainer className="service-cat__list" staggerDelay={0.06}>
              {subServices.map((sub) => (
                <StaggerItem key={sub} variant="fadeUp">
                  <div className="service-cat__list-item" data-cursor="pointer">
                     <div className="service-cat__list-dot" />
                     <span>{sub}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* CTA Button wrapped in Magnetic Button */}
            <ScrollReveal variant="fadeUp" delay={0.3}>
              <div className="service-cat__cta-wrapper">
                <MagneticButton strength={0.15} range={35}>
                  <Link to={`/servicios/${id}`} className="btn-premium btn-premium-primary service-cat__cta">
                    <span>Explorar servicio</span>
                    <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
                  </Link>
                </MagneticButton>

                <MagneticButton strength={0.15} range={35}>
                  <Link to="/contacto" className="btn-premium btn-premium-outline service-cat__cta">
                    <span>Cotizar</span>
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
