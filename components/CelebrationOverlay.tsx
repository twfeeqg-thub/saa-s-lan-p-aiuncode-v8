// components/CelebrationOverlay.tsx

"use client"

import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationOverlayProps {
  // `stage` يحدد ما الذي يجب عرضه: رسالة وسيطة أم احتفال نهائي
  stage: 'intermediate' | 'final' | 'hidden';
  // الرسالة التي ستظهر في المنتصف
  message: string;
  // دالة لإخفاء الواجهة عند انتهاء العرض
  onComplete: () => void;
}

export function CelebrationOverlay({ stage, message, onComplete }: CelebrationOverlayProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // تأثير جانبي للحصول على أبعاد الشاشة لتغطيتها بالقصاصات
  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    setDimensions({ width: innerWidth, height: innerHeight });
  }, []);

  // تأثير جانبي لإخفاء الواجهة تلقائياً بعد مدة معينة
  useEffect(() => {
    if (stage !== 'hidden') {
      const timer = setTimeout(() => {
        onComplete();
      }, stage === 'final' ? 3500 : 1500); // مدة أطول للاحتفال النهائي

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
          {/* تأثير القصاصات الملونة (يعمل فقط في المرحلة النهائية) */}
          {stage === 'final' && (
            <ReactConfetti
              width={dimensions.width}
              height={dimensions.height}
              recycle={false}
              numberOfPieces={400}
              gravity={0.15}
            />
          )}

          {/* حاوية الرسالة */}
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
