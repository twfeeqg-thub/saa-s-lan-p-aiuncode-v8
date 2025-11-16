"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useCallback } from "react"
import Image from "next/image"

// أيقونات SVG للسيناريو الجديد
const ICONS = {
  customer: () => <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></>,
  store: () => <><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /></>,
  question: () => <path d="M9.09 9a3 3 0 0 1 5.83 1c0 1-1.5 2.5-3 3.5-1.5 1-3 .5-3 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  check: () => <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />,
  dollar: () => <path d="M12 2v20m5-17H7m10 4H7m10 4H7m10 4H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
};

export default function CustomerLossAnimation() {
  const controls = useAnimationControls();

  const sequence = useCallback(async () => {
    await controls.start("initial");
    await controls.start("journeyStart");
    await controls.start("obstacle");
    await controls.start("intervention");
    await controls.start("journeyComplete");
    await new Promise(resolve => setTimeout(resolve, 2500));
    sequence();
  }, [controls]);

  useEffect(() => {
    sequence();
  }, [sequence]);

  return (
    <div style={{ width: '150px', height: '150px', position: 'relative', overflow: 'hidden' }}>

      {/* أيقونة العميل (نقطة البداية) */}
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        variants={{ initial: { opacity: 0 }, journeyStart: { opacity: 1 } }}
        animate={controls}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{ICONS.customer()}</svg>
      </motion.div>

      {/* أيقونة المتجر (نقطة النهاية) */}
      <motion.div
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        variants={{
          initial: { opacity: 0 },
          journeyStart: { opacity: 1 },
          journeyComplete: { color: "#22c55e", transition: { delay: 1 } } // اللون الأخضر عند اكتمال الرحلة
        }}
        animate={controls}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{ICONS.store()}</svg>
      </motion.div>

      {/* الخط المتقطع (مسار الشراء) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 150 150">
        <motion.path
          d="M 35 75 H 115"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="5 5"
          className="text-gray-300"
          variants={{
            initial: { pathLength: 0, opacity: 0 },
            journeyStart: { pathLength: 0.5, opacity: 1, transition: { duration: 1.5 } }, // يتوقف في المنتصف
            journeyComplete: { pathLength: 1, opacity: 1, transition: { duration: 1, delay: 0.5 } } // يكمل المسار
          }}
          animate={controls}
        />
      </svg>

      {/* العائق (علامة الاستفهام) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow-md z-10"
        variants={{
          initial: { scale: 0, opacity: 0 },
          obstacle: { scale: 1, opacity: 1, transition: { type: "spring" } },
          intervention: { scale: 0, opacity: 0, transition: { delay: 0.5 } }
        }}
        animate={controls}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-orange-600">{ICONS.question()}</svg>
      </motion.div>

      {/* شعار المنصة (الحل) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center p-1 z-20"
        variants={{
          initial: { scale: 0, opacity: 0 },
          intervention: { scale: 1, opacity: 1, transition: { type: "spring" } },
          journeyComplete: { scale: 0, opacity: 0, transition: { delay: 1.5 } }
        }}
        animate={controls}
      >
        <Image src="/images/logo.png" alt="AI-Uncode Agent" width={40} height={40} />
      </motion.div>

      {/* علامة الدولار (النتيجة النهائية) */}
      <motion.div
        className="absolute top-4 right-8"
        variants={{
          initial: { y: 20, opacity: 0 },
          journeyComplete: { y: 0, opacity: 1, transition: { delay: 1.2, type: "spring" } }
        }}
        animate={controls}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-500">{ICONS.dollar()}</svg>
      </motion.div>

    </div>
  );
}
