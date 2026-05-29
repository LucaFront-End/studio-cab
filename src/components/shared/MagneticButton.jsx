import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticButton({ children, range = 45, strength = 0.35, className = '', ...props }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Position displacement motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for displacements
  const springX = useSpring(x, { stiffness: 120, damping: 15, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 15, mass: 0.6 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance between mouse and button center
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // If cursor is within range, magnetic pull takes effect
      if (distance < range) {
        setIsHovered(true);
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (ref.current) {
      ref.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (ref.current) {
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [range, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
        display: 'inline-block',
      }}
      animate={{
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
