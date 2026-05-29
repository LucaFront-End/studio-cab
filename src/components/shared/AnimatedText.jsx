import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedText({
  text,
  tag = 'h2',
  className = '',
  delay = 0,
  splitBy = 'word', // 'word' | 'char'
  once = true,
  style = {}
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const items = splitBy === 'char' ? text.split('') : text.split(' ');
  const Tag = tag;

  return (
    <Tag ref={ref} className={className} style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: splitBy === 'word' ? '0.35em' : '0' }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {item === ' ' ? '\u00A0' : item}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
