'use client';
import { motion } from 'framer-motion';

export default function TimeLossAnimation() {
  const colors = {
    navy: '#1A237E',
    orange: '#FFC107',
    white: '#FFFFFF',
  };

  const fragments = Array.from({ length: 8 });

  return (
    <div style={{ width: '150px', height: '150px' }}>
      <motion.svg viewBox="0 0 100 100">
        {/* Clock Face */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke={colors.navy}
          strokeWidth="4"
          fill={colors.white}
          initial={{ pathLength: 1, opacity: 1 }}
          animate={{ pathLength: 0.5, opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        />
        {/* Clock Hands */}
        <motion.line
          x1="50" y1="50" x2="50" y2="20"
          stroke={colors.navy} strokeWidth="3"
          initial={{ rotate: 0 }}
          animate={{ rotate: 180 }}
          transition={{ duration: 1, ease: 'linear' }}
        />
        {/* Shattering Fragments */}
        {fragments.map((_, i) => (
          <motion.path
            key={i}
            d="M 0 0 L 5 2 L 0 4 Z"
            fill={colors.orange}
            initial={{ x: 50, y: 50, opacity: 0, scale: 0 }}
            animate={{
              x: 50 + Math.cos((i / fragments.length) * 2 * Math.PI) * 60,
              y: 50 + Math.sin((i / fragments.length) * 2 * Math.PI) * 60,
              rotate: Math.random() * 360,
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{ duration: 1.5, delay: 0.7, ease: 'easeOut' }}
          />
        ))}
      </motion.svg>
    </div>
  );
}

