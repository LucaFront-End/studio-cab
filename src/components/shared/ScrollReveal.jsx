import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
};

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.7,
  threshold = 0.2,
  once = true,
  className = '',
  style = {}
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const selectedVariant = variants[variant] || variants.fadeUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container for child animations */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  threshold = 0.15,
  once = true,
  className = '',
  style = {}
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  variant = 'fadeUp',
  className = '',
  style = {}
}) {
  const selectedVariant = variants[variant] || variants.fadeUp;

  return (
    <motion.div
      variants={selectedVariant}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
