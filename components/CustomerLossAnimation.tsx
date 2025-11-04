'use client';
import { motion } from 'framer-motion';

export default function CustomerLossAnimation() {
  const colors = {
    navy: '#1A237E',
    green: '#2E7D32',
  };

  return (
    <div style={{ width: '150px', height: '150px' }}>
      <motion.svg viewBox="0 0 100 100">
        {/* Shopping Cart */}
        <motion.g
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: -120, opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
        >
          <path d="M10 20 H 25 L 35 60 H 80 L 90 30 H 40" stroke={colors.navy} strokeWidth="4" fill="none" />
          <circle cx="40" cy="75" r="5" fill={colors.navy} />
          <circle cx="75" cy="75" r="5" fill={colors.navy} />
        </motion.g>
        {/* Sad Face Icon */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <circle cx="50" cy="50" r="40" stroke={colors.green} strokeWidth="4" fill="none" />
          <circle cx="40" cy="45" r="3" fill={colors.green} />
          <circle cx="60" cy="45" r="3" fill={colors.green} />
          <path d="M 40 65 Q 50 55 60 65" stroke={colors.green} strokeWidth="3" fill="none" />
        </motion.g>
      </motion.svg>
    </div>
  );
}
