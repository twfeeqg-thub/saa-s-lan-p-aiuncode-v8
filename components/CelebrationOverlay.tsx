// components/CelebrationOverlay.tsx

"use client"

import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationOverlayProps {
  stage: 'intermediate' | 'final' | 'hidden';
  message: string;
  onComplete: () => void;
}

export function CelebrationOverlay({ stage, message, onComplete }: CelebrationOverlayProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    setDimensions({ width: innerWidth, height: innerHeight });
  }, []);

  useEffect(() => {
    if (stage !== 'hidden') {
      // --- بداية التعديل ---
      // زيادة مدة عرض الرسالة النهائية إلى 5 ثوانٍ
      const timer = setTimeout(() => {
        onComplete();
      }, stage === 'final' ? 5000 : 1500); 
      // --- نهاية التعديل ---

      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'hidden' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          {stage === 'final' && (
            <ReactConfetti
              width={dimensions.width}
              height={dimensions.height}
              recycle={false}
              numberOfPieces={400}
              gravity={0.15}
            />
          )}

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-center p-8"
          >
            <h2 className={`font-bold text-white text-balance ${
              stage === 'final' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
            }`}>
              {message}
            </h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
