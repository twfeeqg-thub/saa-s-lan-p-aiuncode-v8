'use client';
import { motion } from 'framer-motion';

export default function ComplexityAnimation() {
  const colors = {
    navy: '#1A237E',
    orange: '#FFC107',
    green: '#2E7D32',
  };

  const symbols = ['{}', '/>', '∑', '∫', '∀'];

  return (
    <div style={{ width: '150px', height: '150px' }}>
      <motion.svg viewBox="0 0 100 100">
        {/* Chaotic Symbols */}
        {symbols.map((symbol, i) => (
          <motion.text
            key={i}
            x={25}
            y={50}
            fontSize="12"
            fill={colors.navy}
            textAnchor="middle"
            initial={{
              x: 25 + (Math.random() - 0.5) * 30,
              y: 50 + (Math.random() - 0.5) * 30,
              opacity: 1,
              rotate: (Math.random() - 0.5) * 90,
            }}
            animate={{ x: 75, y: 50, opacity: 0, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.2 * i, ease: 'easeInOut' }}
          >
            {symbol}
          </motion.text>
        ))}
        {/* Glowing Lightbulb */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <path d="M50 30 C 40 30, 35 40, 35 50 C 35 65, 45 70, 50 80 C 55 70, 65 65, 65 50 C 65 40, 60 30, 50 30 Z" fill={colors.orange} />
          <rect x="45" y="80" width="10" height="5" fill={colors.navy} />
          {/* Glow */}
          <motion.circle
            cx="50" cy="55" r="25"
            fill={colors.orange}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}
