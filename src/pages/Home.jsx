import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Projects from '../components/home/Projects';
import WhyUs from '../components/home/WhyUs';
import Process from '../components/home/Process';
import Furniture from '../components/home/Furniture';
import CtaSection from '../components/home/CtaSection';
import ContactForm from '../components/home/ContactForm';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Services />
      <Projects />
      <WhyUs />
      <Process />
      <Furniture />
      <CtaSection />
      <ContactForm />
    </motion.main>
  );
}
