"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useCallback } from "react"
import Image from "next/image"

const ICONS = {
  customer: () => <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></>,
  store: () => <><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /></>,
  question: () => <path d="M9.09 9a3 3 0 0 1 5.83 1c0 1-1.5 2.5-3 3.5-1.5 1-3 .5-3 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  check: () => <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />,
  saudiRiyal: () => <><path d="M14 11a3 3 0 0 0-6 0v1a3 3 0 0 0 6 0v-1z" stroke="currentColor" strokeWidth="2" /><path d="M4 18h14.48a2 2 0 0 0 1.8-3.1L16 6H8l-4.32 9.9a2 2 0 0 0 1.8 3.1H6" stroke="currentColor" strokeWidth="2" /></>,
  box: () => <><path d="M21 10V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5" /><path d="m21 10-9 6-9-6" /><path d="M3 10v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8" /></>,
};

export default function CustomerLossAnimation() {
  const controls = useAnimationControls();

  const sequence = useCallback(async () => {
    await controls.start("initial");
    await controls.start("journeyStart");
    await controls.start("obstacle");
    await controls.start("intervention");
    await controls.start("journeyComplete");
    await new Promise(resolve => setTimeout(resolve, 3000));
    sequence();
  }, [controls]);

  useEffect(() => {
    sequence();
  }, [sequence]);

  return (
    <div style={{ width: '150px', height: '150px', position: 'relative', overflow: 'hidden' }}>

      {/* --- 1. العميل والمتجر في الأسفل --- */}
      <motion.div
        className="absolute bottom-4 left-4 text-gray-500 z-10"
        variants={{
          initial: { opacity: 0, x: 0 },
          journeyStart: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          obstacle: { x: 40, transition: { duration: 1.5 } },
          intervention: { x: 40 },
          journeyComplete: { x: 85, transition: { duration: 1, delay: 1.5 } },
        }}
        animate={controls}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{ICONS.customer()}</svg>
      </motion.div>

      <motion.div
        className="absolute bottom-4 right-4 text-gray-500"
        variants={{ initial: { opacity: 0 }, journeyStart: { opacity: 1 } }}
        animate={controls}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{ICONS.store()}</svg>
      </motion.div>

      {/* --- 1. الاستفهام والشعار في الأعلى --- */}
      <motion.div
        className="absolute top-8 left-1/4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow-md z-20"
        variants={{
          initial: { scale: 0, opacity: 0 },
          obstacle: { scale: 1, opacity: 1, transition: { delay: 1.5, type: "spring" } },
          intervention: { scale: 0, opacity: 0, transition: { delay: 1.5 } }
        }}
        animate={controls}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-orange-600">{ICONS.question()}</svg>
      </motion.div>
      
      <motion.div
        className="absolute top-8 left-1/4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-md z-20"
        variants={{
          initial: { scale: 0, opacity: 0 },
          intervention: { scale: 1, opacity: 1, transition: { delay: 1.5, type: "spring" } },
          journeyComplete: { scale: 0, opacity: 0, transition: { delay: 1.5 } }
        }}
        animate={controls}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-green-600">{ICONS.check()}</svg>
      </motion.div>

      <motion.div
        className="absolute top-8 right-1/4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center p-1 z-30"
        variants={{
          initial: { scale: 0, opacity: 0 },
          obstacle: { scale: 1, opacity: 1, transition: { delay: 1.8, type: "spring" } },
          journeyComplete: { scale: 0, opacity: 0, transition: { delay: 1.5 } }
        }}
        animate={controls}
      >
        <Image src="/images/logo.png" alt="AI-Uncode Agent" width={40} height={40} />
      </motion.div>

      {/* --- 2. المرسلة (الشعاع) --- */}
      <motion.div
        className="absolute top-[56px] right-[55px] w-4 h-4 bg-blue-400 rounded-full"
        variants={{
          initial: { x: 0, opacity: 0 },
          intervention: { x: -38, opacity: [0, 1, 0], transition: { duration: 0.8, delay: 2.5 } }
        }}
        animate={controls}
      />

      {/* بقية العناصر تبقى كما هي */}
      <motion.div
        className="absolute bottom-[48px] left-[110px] text-purple-500 z-0"
        variants={{
          initial: { y: -20, opacity: 0 },
          journeyComplete: { y: 0, opacity: 1, transition: { delay: 2.5, type: "spring", stiffness: 150 } }
        }}
        animate={controls}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{ICONS.box()}</svg>
      </motion.div>

      <motion.div
        className="absolute top-4 right-8"
        variants={{
          initial: { y: 20, opacity: 0 },
          journeyComplete: { y: 0, opacity: 1, transition: { delay: 3, type: "spring" } }
        }}
        animate={controls}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-500">{ICONS.saudiRiyal()}</svg>
      </motion.div>
    </div>
  );
}
