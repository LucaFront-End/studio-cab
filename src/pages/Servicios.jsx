import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ServiciosHero from '../components/servicios/ServiciosHero';
import ServiceCategory from '../components/servicios/ServiceCategory';
import CtaSection from '../components/home/CtaSection';

import heroImg from '../assets/images/hero-restaurant.png';
import residentialImg from '../assets/images/residential-interior.png';
import carpinteriaImg from '../assets/images/carpinteria-mobiliario.png';
import procesoImg from '../assets/images/proceso-instalacion.png';

const servicesData = [
  {
    id: 'comercial',
    title: 'Diseño Comercial',
    description: 'Creamos espacios comerciales estratégicos que no solo se ven increíbles, sino que optimizan la operación, mejoran la experiencia del cliente y potencian las ventas. Cada proyecto se diseña considerando circulación, exhibición y percepción de marca.',
    image: heroImg,
    imageAlt: 'Diseño de restaurante premium por Studio CAB',
    subServices: [
      'Restaurantes',
      'Hoteles',
      'Retail y tiendas',
      'Franquicias',
      'Islas comerciales',
      'Showrooms',
      'Oficinas',
      'Cafeterías',
      'Boutiques',
    ],
  },
  {
    id: 'residencial',
    title: 'Interiorismo Residencial',
    description: 'Diseñamos hogares que reflejan la personalidad de sus habitantes. Espacios funcionales, elegantes y pensados para el día a día con materiales de la más alta calidad y mobiliario personalizado.',
    image: residentialImg,
    imageAlt: 'Diseño residencial premium por Studio CAB',
    subServices: [
      'Casas completas',
      'Departamentos',
      'Remodelaciones',
      'Cocinas integrales',
      'Closets y vestidores',
      'Baños de diseño',
    ],
  },
  {
    id: 'carpinteria',
    title: 'Carpintería y Mobiliario sobre Diseño',
    description: 'Fabricamos mobiliario personalizado adaptado al espacio y necesidad de cada cliente. Desde mostradores de madera para negocios hasta anaqueles, barras y exhibidores — todo bajo los más altos estándares de calidad.',
    image: carpinteriaImg,
    imageAlt: 'Carpintería artesanal de Studio CAB',
    subServices: [
      'Mostradores de madera para negocios',
      'Anaqueles para tienda',
      'Barras comerciales',
      'Exhibidores',
      'Recepciones',
      'Closets',
      'Cocinas integrales',
      'Muebles personalizados',
      'Mobiliario retail',
    ],
  },
  {
    id: 'produccion',
    title: 'Producción e Instalación',
    description: 'Controlamos todo el proceso creativo y operativo. Desde la fabricación en nuestro taller hasta la instalación final en sitio, garantizando un estándar de calidad consistente en cada etapa.',
    image: procesoImg,
    imageAlt: 'Proceso de instalación profesional',
    subServices: [
      'Fabricación en taller propio',
      'Montaje profesional',
      'Supervisión en sitio',
      'Instalación final',
      'Control de calidad',
      'Entrega y ajustes',
    ],
  },
];

export default function Servicios() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Handle hash navigation
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ServiciosHero />

      {servicesData.map((service, i) => (
        <ServiceCategory
          key={service.id}
          id={service.id}
          title={service.title}
          description={service.description}
          image={service.image}
          imageAlt={service.imageAlt}
          subServices={service.subServices}
          reversed={i % 2 !== 0}
          index={i}
        />
      ))}

      <CtaSection />
    </motion.main>
  );
}
