"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useCallback } from "react"
import Image from "next/image"

const ICONS = {
  gear: () => <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />,
  line: (props) => <path d="M5 12h14" {...props} />,
  wallet: () => <><path d="M19 7V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /><path d="M2 7h20" /><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></>,
  x: () => <path d="M18 6 6 18M6 6l12 12" />,
  rocket: () => <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.09-3.1a2 2 0 0 0-2.43-2.43c-.84.61-2.26.62-3.1.09zM12 15.5V13a6 6 0 0 0-3-5.2V4.5a2.5 2.5 0 0 1 5 0V7.8a6 6 0 0 0-3 5.2v2.5" />,
};

// تعريف الأشكال ومواقعها (الفوضوية والمنظمة)
const SHAPES_CONFIG = [
  // التروس التي ستذهب إلى الزوايا
  { type: 'gear', chaos: { x: -50, y: -40, rotate: 0 },   order: { x: -55, y: -55, rotate: 360, scale: 0.5 } },
  { type: 'gear', chaos: { x: 50, y: 30, rotate: 90 },    order: { x: 55, y: -55, rotate: 360, scale: 0.5 } },
  // الخطوط التي ستشكل محتوى الواجهة
  { type: 'line', chaos: { x: -30, y: 40, rotate: -30 }, order: { x: 0, y: -10, rotate: 0, scale: 0.8 } },
  { type: 'line', chaos: { x: 20, y: -50, rotate: 120 }, order: { x: 0, y: 10, rotate: 0, scale: 0.8 } },
];

export default function ComplexityAnimation() {
  const controls = useAnimationControls();

  const sequence = useCallback(async () => {
    await controls.start("initial");
    await controls.start("chaos");
    await controls.start("intervention");
    await controls.start("build");
    await new Promise(resolve => setTimeout(resolve, 3000));
    sequence();
  }, [controls]);

  useEffect(() => {
    sequence();
  }, [sequence]);

  return (
    <div style={{ width: '150px', height: '150px', position: 'relative', overflow: 'hidden' }}>

      {/* 1. أيقونة المحفظة والتكلفة (الألم) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        variants={{
          initial: { scale: 0, opacity: 0 },
          chaos: { scale: 1, opacity: 1, transition: { delay: 1, type: "spring" } },
          intervention: { scale: 0, opacity: 0, transition: { duration: 0.3 } }
        }}
        animate={controls}
      >
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-gray-500">
            {ICONS.wallet()}
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="absolute inset-0 w-full h-full text-red-500">
            {ICONS.x()}
          </svg>
        </div>
      </motion.div>

      {/* 3. الإطار الذي يمثل الواجهة النهائية */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 rounded-lg"
        variants={{
          initial: { opacity: 0, borderColor: "#9ca3af" }, // رمادي
          build: { opacity: 1, borderColor: "#22c55e", transition: { delay: 1.5 } } // أخضر
        }}
        animate={controls}
      />

      {/* الأشكال التي تتحول من فوضى إلى نظام */}
      {SHAPES_CONFIG.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 text-gray-400"
          variants={{
            initial: { opacity: 0, scale: 0 },
            chaos: { x: shape.chaos.x, y: shape.chaos.y, rotate: shape.chaos.rotate, opacity: 1, scale: 1, transition: { delay: i * 0.2, type: "spring" } },
            build: { x: shape.order.x, y: shape.order.y, rotate: shape.order.rotate, scale: shape.order.scale, color: "#3b82f6", transition: { delay: 1.2 + i * 0.2, duration: 1 } }
          }}
          animate={controls}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {shape.type === 'gear' ? ICONS.gear() : ICONS.line()}
          </svg>
        </motion.div>
      ))}

      {/* 2. شعار المنصة (المنظم) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center p-1 z-20"
        variants={{
          initial: { scale: 0, opacity: 0 },
          intervention: { scale: 1, opacity: 1, transition: { delay: 0.5, type: "spring" } },
          build: { scale: 0, opacity: 0, transition: { delay: 2.5 } }
        }}
        animate={controls}
      >
        <Image src="/images/logo.png" alt="AI-Uncode Agent" width={56} height={56} />
      </motion.div>

      {/* 4. أيقونة الصاروخ (النتيجة) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 z-30"
        variants={{
          initial: { scale: 0, opacity: 0 },
          build: { scale: 1.5, opacity: 1, transition: { delay: 2.8, type: "spring" } }
        }}
        animate={controls}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {ICONS.rocket()}
        </svg>
      </motion.div>
    </div>
  );
}
