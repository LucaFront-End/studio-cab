import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 2800); // Complete preloader animation in 2.8s

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  // SVG Drawing variables
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.6,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const textVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.0 }
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="preloader-wrapper"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#0A0A0A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={{ y: 0 }}
          exit={{ 
            y: '-100vh',
            transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
          }}
        >
          {/* Subtle noise pattern */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
              pointerEvents: 'none',
              opacity: 0.7,
            }}
          />

          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Architectural Blueprint Geometrics */}
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 200 200" 
              fill="none" 
              style={{ position: 'absolute', transform: 'rotate(45deg)' }}
            >
              {/* Outer diamond */}
              <motion.rect
                x="20"
                y="20"
                width="160"
                height="160"
                stroke="#D4C3B3"
                strokeWidth="0.75"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              />
              {/* Inner diagonal cross */}
              <motion.line
                x1="20"
                y1="20"
                x2="180"
                y2="180"
                stroke="#D4C3B3"
                strokeWidth="0.5"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              />
              <motion.line
                x1="180"
                y1="20"
                x2="20"
                y2="180"
                stroke="#D4C3B3"
                strokeWidth="0.5"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              />
              {/* Central Circle */}
              <motion.circle
                cx="100"
                cy="100"
                r="40"
                stroke="#7C6655"
                strokeWidth="1.0"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              />
            </svg>

            {/* Brand Initials / Text Reveal */}
            <div style={{ zIndex: 10, textAlign: 'center' }}>
              <div style={{ overflow: 'hidden', paddingBottom: '5px' }}>
                <motion.h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: '200',
                    fontSize: '1.8rem',
                    letterSpacing: '0.35em',
                    color: '#F4F3EF',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  STUDIO CAB
                </motion.h2>
              </div>
              
              <div style={{ overflow: 'hidden', height: '18px', marginTop: '6px' }}>
                <motion.p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: '400',
                    fontSize: '0.55rem',
                    letterSpacing: '0.5em',
                    color: '#D4C3B3',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 0.8,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  GRUPO CAB
                </motion.p>
              </div>
            </div>
          </div>

          {/* Elegant Loading Percentage Counter */}
          <div style={{ position: 'absolute', bottom: '60px', overflow: 'hidden' }}>
            <motion.span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                color: '#969592',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ 
                opacity: [0, 0.8, 0], 
                y: [15, 0, -15],
                transition: { duration: 2.2, ease: 'easeInOut', delay: 0.2 }
              }}
            >
              ESTABLECIENDO ESTRUCTURA
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
