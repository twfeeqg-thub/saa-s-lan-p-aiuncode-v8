"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useCallback } from "react"
import Image from "next/image"

const ICONS = {
  customer: () => <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></>,
  store: () => <><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /></>,
  question: () => <path d="M9.09 9a3 3 0 0 1 5.83 1c0 1-1.5 2.5-3 3.5-1.5 1-3 .5-3 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  check: () => <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />,
  box: () => <><path d="M21 10V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5" /><path d="m21 10-9 6-9-6" /><path d="M3 10v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8" /></>,
  // --- أيقونة الريال السعودي الرسمية الجديدة (SVG) ---
  saudiRiyalOfficial: () => (
    <>
      <path d="M10.6,3.4h2.8v10.4c0,0.8-0.7,1.5-1.5,1.5h-2.1c-0.8,0-1.5-0.7-1.5-1.5L8.3,3.4H10.6z" />
      <path d="M17.7,8.2H6.3c-0.8,0-1.5,0.7-1.5,1.5v0c0,0.8,0.7,1.5,1.5,1.5h11.3" />
      <path d="M15.4,15.3H8.6c-0.8,0-1.5,0.7-1.5,1.5v0c0,0.8,0.7,1.5,1.5,1.5h6.8" />
      <path d="M15.4,3.4l2.3,4.8H6.3L8.6,3.4H15.4z" />
      <path d="M17.7,11.2l-2.3,4.1H8.6l-2.3-4.1H17.7z" />
      <path d="M15.4,18.3l2.3,4.8H6.3l2.3-4.8H15.4z" />
    </>
  ),
};

export default function CustomerLossAnimation() {
  const controls = useAnimationControls();

  const sequence = useCallback(async () => {
    await controls.start("initial");
    await controls.start("journeyStart");
    await controls.start("obstacle");
    await controls.start("beamTravel");
    await controls.start("problemSolved");
    await controls.start("journeyComplete");
    await new Promise(resolve => setTimeout(resolve, 3000));
    sequence();
  }, [controls]);

  useEffect(() => {
    sequence();
  }, [sequence]);

  return (
    <div style={{ width: '150px', height: '150px', position: 'relative', overflow: 'hidden' }}>

      {/* ... (بقية الكود يبقى كما هو تمامًا) ... */}
      
      <motion.div
        className="absolute bottom-4 left-4 text-gray-500 z-10"
        variants={{
          initial: { opacity: 0, x: 0 },
          journeyStart: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          obstacle: { x: 40, transition: { duration: 1.5 } },
          beamTravel: { x: 40 },
          problemSolved: { x: 40 },
          journeyComplete: { x: 85, transition: { duration: 1, delay: 0.5 } },
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
      <motion.div
        className="absolute top-8 left-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow-md z-20"
        variants={{
          initial: { scale: 0, opacity: 0 },
          obstacle: { scale: 1, opacity: 1, transition: { delay: 1.5, type: "spring" } },
          beamTravel: { scale: 1, opacity: 1 },
          problemSolved: { scale: 0, opacity: 0, transition: { duration: 0.3 } }
        }}
        animate={controls}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-orange-600">{ICONS.question()}</svg>
      </motion.div>
      <motion.div
        className="absolute top-8 left-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-md z-20"
        variants={{
          initial: { scale: 0, opacity: 0 },
          problemSolved: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } },
          journeyComplete: { scale: 0, opacity: 0, transition: { delay: 1.5 } }
        }}
        animate={controls}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-green-600">{ICONS.check()}</svg>
      </motion.div>
      <motion.div
        className="absolute top-8 right-4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center p-1 z-30"
        variants={{
          initial: { scale: 0, opacity: 0 },
          obstacle: { scale: 1, opacity: 1, transition: { delay: 1.8, type: "spring" } },
          journeyComplete: { scale: 0, opacity: 0, transition: { delay: 1.5 } }
        }}
        animate={controls}
      >
        <Image src="/images/logo.png" alt="AI-Uncode Agent" width={40} height={40} />
      </motion.div>
      <motion.div
        className="absolute top-[56px] right-[36px] w-4 h-4 bg-blue-400 rounded-full z-20"
        variants={{
          initial: { x: 0, opacity: 0 },
          beamTravel: { 
            x: -75, 
            opacity: [0, 1, 0], 
            transition: { duration: 1, delay: 0.5 } 
          }
        }}
        animate={controls}
      />
      <motion.div
        className="absolute bottom-[48px] left-[110px] text-purple-500 z-0"
        variants={{
          initial: { y: -20, opacity: 0 },
          journeyComplete: { y: 0, opacity: 1, transition: { delay: 1.5, type: "spring", stiffness: 150 } }
        }}
        animate={controls}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{ICONS.box()}</svg>
      </motion.div>

      {/* --- التعديل هنا: استخدام الأيقونة الرسمية --- */}
      <motion.div
        className="absolute top-4 right-8"
        variants={{
          initial: { y: 20, opacity: 0 },
          journeyComplete: { y: 0, opacity: 1, transition: { delay: 2, type: "spring" } }
        }}
        animate={controls}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
          {ICONS.saudiRiyalOfficial()}
        </svg>
      </motion.div>
    </div>
  );
}
