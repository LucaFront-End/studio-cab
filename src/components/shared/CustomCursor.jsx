import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState('default'); // 'default', 'hover', 'drag', 'view', 'whatsapp'
  const [cursorText, setCursorText] = useState('');
  const [isMobile, setIsMobile] = useState(true);
  
  const cursorRef = useRef(null);

  // Motion values for smooth spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 350, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile devices
    const checkDevice = () => {
      const mobile = window.matchMedia('(max-width: 1024px)').matches || 'ontouchstart' in window;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const moveMouse = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Event Delegation for hover styling
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        setCursorType(type || 'hover');
        
        const text = target.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        // Fallback for native links / buttons
        const isInteractive = e.target.closest('a, button, [role="button"], input, select, textarea');
        if (isInteractive) {
          setCursorType('hover');
        } else {
          setCursorType('default');
        }
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, isVisible, cursorX, cursorY]);

  if (isMobile || !isVisible) return null;

  // Variants for cursor container scaling/stretching
  const ringVariants = {
    default: {
      width: 24,
      height: 24,
      backgroundColor: 'rgba(212, 195, 179, 0.0)',
      border: '1px solid rgba(212, 195, 179, 0.5)',
    },
    hover: {
      width: 50,
      height: 50,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      border: '1px solid rgba(255, 255, 255, 1)',
      mixBlendMode: 'difference',
    },
    drag: {
      width: 70,
      height: 70,
      backgroundColor: 'rgba(75, 54, 33, 0.9)',
      border: '1px solid rgba(124, 102, 85, 0.3)',
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: '#F7F5F0',
      border: '1px solid #E8E5DF',
      color: '#121211',
    },
    whatsapp: {
      width: 60,
      height: 60,
      backgroundColor: '#25D366',
      border: '1px solid #128C7E',
      color: '#FFFFFF',
    }
  };

  const dotVariants = {
    default: { scale: 1, opacity: 1, backgroundColor: '#D4C3B3' },
    hover: { scale: 0, opacity: 0 },
    drag: { scale: 0, opacity: 0 },
    view: { scale: 0, opacity: 0 },
    whatsapp: { scale: 0, opacity: 0 }
  };

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: varCSS('--z-cursor', 9999),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: cursorType === 'drag' ? '0 10px 25px rgba(75,54,33,0.2)' : 'none',
        }}
        variants={ringVariants}
        animate={cursorType}
        transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.2 }}
      >
        {/* Text inside expanded cursor */}
        {cursorType === 'drag' && (
          <span style={{ color: '#F7F5F0', fontSize: '9px', fontWeight: '600', letterSpacing: '0.15em', fontFamily: 'var(--font-display)' }}>
            {cursorText || 'ARRAS'}
          </span>
        )}
        {cursorType === 'view' && (
          <span style={{ color: '#121211', fontSize: '9px', fontWeight: '600', letterSpacing: '0.15em', fontFamily: 'var(--font-display)' }}>
            {cursorText || 'VER'}
          </span>
        )}
        {cursorType === 'whatsapp' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="currentColor"/>
          </svg>
        )}
      </motion.div>

      {/* Inner Pinpoint (Sticky Mouse position, direct coordinate mapping for high responsiveness) */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: varCSS('--z-cursor', 9999),
        }}
        variants={dotVariants}
        animate={cursorType}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}

// Helper to access CSS variables safely
function varCSS(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}
