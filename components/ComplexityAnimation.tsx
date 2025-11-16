"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useCallback } from "react"
import Image from "next/image"

// أيقونات SVG للسيناريو الثالث
const ICONS = {
  gear: () => <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />,
  line: () => <path d="M5 12h14" />,
  square: () => <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />,
  rocket: () => <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.09-3.1a2 2 0 0 0-2.43-2.43c-.84.61-2.26.62-3.1.09zM12 15.5V13a6 6 0 0 0-3-5.2V4.5a2.5 2.5 0 0 1 5 0V7.8a6 6 0 0 0-3 5.2v2.5" />,
};

// تعريف الأشكال الفوضوية ومواقعها
const CHAOS_SHAPES = [
  { icon: ICONS.gear(), chaos: { x: -40, y: -30, rotate: 0 }, order: { x: -35, y: -25, rotate: 360 } },
  { icon: ICONS.square(), chaos: { x: 30, y: -40, rotate: 45 }, order: { x: 0, y: 0, rotate: 0 } },
  { icon: ICONS.line(), chaos: { x: -20, y: 20, rotate: -30 }, order: { x: 0, y: 15, rotate: 0 } },
  { icon: ICONS.gear(), chaos: { x: 50, y: 10, rotate: 90 }, order: { x: 35, y: -25, rotate: 360 } },
  { icon: ICONS.line(), chaos: { x: 10, y: 50, rotate: 120 }, order: { x: 0, y: -15, rotate: 0 } },
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

      {/* الأشكال الفوضوية */}
      {CHAOS_SHAPES.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 text-gray-400"
          variants={{
            initial: { opacity: 0, scale: 0 },
            chaos: { 
              x: shape.chaos.x, y: shape.chaos.y, rotate: shape.chaos.rotate, 
              opacity: 1, scale: 0.8,
              transition: { delay: i * 0.2, type: "spring" }
            },
            build: {
              x: shape.order.x, y: shape.order.y, rotate: shape.order.rotate,
              scale: 1, color: "#22c55e", // اللون الأخضر
              transition: { delay: 1 + i * 0.3, duration: 1.5 }
            }
          }}
          animate={controls}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {shape.icon}
          </svg>
        </motion.div>
      ))}

      {/* شعار المنصة (المنظم) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center p-1 z-10"
        variants={{
          initial: { scale: 0, opacity: 0 },
          intervention: { scale: 1, opacity: 1, transition: { delay: 0.5, type: "spring" } },
          build: { scale: 0, opacity: 0, transition: { delay: 2.5 } }
        }}
        animate={controls}
      >
        <Image src="/images/logo.png" alt="AI-Uncode Agent" width={56} height={56} />
      </motion.div>

      {/* الهالة (الموجة) التي تنطلق من الشعار */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-500/50 rounded-full"
        variants={{
          initial: { scale: 0, opacity: 0 },
          build: { 
            scale: 150, opacity: 0, 
            transition: { duration: 1.5, delay: 0.8 }
          }
        }}
        animate={controls}
      />

      {/* أيقونة الصاروخ (النتيجة النهائية) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500"
        variants={{
          initial: { scale: 0, opacity: 0 },
          build: { scale: 1.5, opacity: 1, transition: { delay: 3, type: "spring" } }
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
