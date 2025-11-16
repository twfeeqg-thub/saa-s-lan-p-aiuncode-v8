"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useCallback } from "react"
import Image from "next/image"

// أيقونات SVG بسيطة للسيناريو
const ICONS = {
  question: () => <path d="M9.09 9a3 3 0 0 1 5.83 1c0 1-1.5 2.5-3 3.5-1.5 1-3 .5-3 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  check: () => <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />,
  dollar: () => <path d="M12 2v20m5-17H7m10 4H7m10 4H7m10 4H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
};

export default function CustomerLossAnimation() {
  const controls = useAnimationControls();

  const sequence = useCallback(async () => {
    await controls.start("initial");
    await controls.start("hesitation");
    await controls.start("intervention");
    await controls.start("satisfaction");
    await new Promise(resolve => setTimeout(resolve, 2500));
    sequence();
  }, [controls]);

  useEffect(() => {
    sequence();
  }, [sequence]);

  return (
    <div style={{ width: '150px', height: '150px', position: 'relative', overflow: 'hidden' }}>
      
      {/* عربة التسوق */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        variants={{
          initial: { y: 100, opacity: 0 },
          hesitation: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
          intervention: { y: 0, opacity: 1 },
          satisfaction: { y: 0, opacity: 1 },
        }}
        animate={controls}
      >
        {/* جسم العربة */}
        <div className="w-24 h-16 bg-gray-100 border-2 border-gray-400 rounded-lg relative">
          <div className="absolute -top-4 left-4 w-16 h-8 bg-gray-100 border-2 border-b-0 border-gray-400 rounded-t-lg" />
        </div>
        {/* العجلات */}
        <div className="absolute -bottom-2 left-4 w-5 h-5 bg-gray-400 rounded-full" />
        <div className="absolute -bottom-2 right-4 w-5 h-5 bg-gray-400 rounded-full" />
      </motion.div>

      {/* فقاعة السؤال */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow-md z-10"
        variants={{
          initial: { scale: 0, opacity: 0 },
          hesitation: { scale: 1, opacity: 1, transition: { delay: 0.5, type: "spring" } },
          intervention: { scale: 0, opacity: 0, transition: { delay: 0.5 } },
        }}
        animate={controls}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-orange-600">{ICONS.question()}</svg>
      </motion.div>

      {/* شعار المنصة */}
      <motion.div
        className="absolute top-8 right-2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center p-1 z-20"
        variants={{
          initial: { scale: 0, opacity: 0 },
          intervention: { scale: 1, opacity: 1, transition: { delay: 1, type: "spring" } },
          satisfaction: { scale: 0, opacity: 0, transition: { delay: 1.5 } },
        }}
        animate={controls}
      >
        <Image src="/images/logo.png" alt="AI-Uncode Agent" width={40} height={40} />
      </motion.div>

      {/* أيقونة الدولار (النتيجة) */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-lg z-10"
        variants={{
          initial: { scale: 0, opacity: 0 },
          satisfaction: { scale: 1, opacity: 1, transition: { delay: 0.5, type: "spring", stiffness: 150 } },
        }}
        animate={controls}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-green-600">{ICONS.dollar()}</svg>
      </motion.div>

    </div>
  );
}

