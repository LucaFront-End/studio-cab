import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ImageReveal({
  src,
  alt,
  className = '',
  direction = 'left', // 'left' | 'right' | 'up' | 'down'
  delay = 0,
  duration = 1,
  once = true,
  style = {}
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const curtainOrigins = {
    left: { initial: '0% 0%', scaleX: 1, scaleY: 1, origin: 'right' },
    right: { initial: '100% 0%', scaleX: 1, scaleY: 1, origin: 'left' },
    up: { initial: '0% 0%', scaleX: 1, scaleY: 1, origin: 'bottom' },
    down: { initial: '0% 100%', scaleX: 1, scaleY: 1, origin: 'top' },
  };

  const config = curtainOrigins[direction];
  const isHorizontal = direction === 'left' || direction === 'right';

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      {/* Curtain overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--gris-grafito)',
          zIndex: 2,
          transformOrigin: config.origin,
        }}
        initial={isHorizontal ? { scaleX: 1 } : { scaleY: 1 }}
        animate={isInView
          ? (isHorizontal ? { scaleX: 0 } : { scaleY: 0 })
          : (isHorizontal ? { scaleX: 1 } : { scaleY: 1 })
        }
        transition={{
          duration: duration * 0.7,
          delay: delay + 0.2,
          ease: [0.65, 0, 0.35, 1]
        }}
      />

      {/* Image */}
      <motion.img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
        transition={{
          duration: duration,
          delay: delay + 0.3,
          ease: [0.16, 1, 0.3, 1]
        }}
      />
    </div>
  );
}
