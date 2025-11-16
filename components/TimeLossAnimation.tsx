"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect } from "react"
import Image from "next/image"

const ICONS = {
  question: () => <path d="M9.09 9a3 3 0 0 1 5.83 1c0 1-1.5 2.5-3 3.5-1.5 1-3 .5-3 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  dollar: () => <path d="M12 2v20m5-17H7m10 4H7m10 4H7m10 4H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  truck: () => <><path d="M10 17h4V5H2v12h2" /><path d="M22 17h-4.32a2.28 2.28 0 0 0-2.17 1.35c-.38.7-.08 1.65.7 2.15s1.8.2 2.4-.5c.6-.7.3-1.8-.4-2.4" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></>,
  calendar: () => <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
  check: () => <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />,
};

const MESSAGE_TYPES = {
  question: { icon: ICONS.question(), color: "blue" },
  dollar: { icon: ICONS.dollar(), color: "green" },
  truck: { icon: ICONS.truck(), color: "purple" },
  calendar: { icon: ICONS.calendar(), color: "orange" },
};

const messagesConfig = [
  { type: "question", chaos: { x: -50, y: -45 }, ordered: { x: -45, y: -60 } },
  { type: "dollar",   chaos: { x: 30,  y: -55 }, ordered: { x: -15, y: -60 } },
  { type: "truck",    chaos: { x: 45,  y: 0 },   ordered: { x: -45, y: -30 } },
  { type: "calendar", chaos: { x: -35, y: 15 },  ordered: { x: -15, y: -30 } },
  { type: "question", chaos: { x: -10, y: -20 }, ordered: { x: -45, y: 0 } },
  { type: "dollar",   chaos: { x: 55,  y: 40 },  ordered: { x: -15, y: 0 } },
  { type: "truck",    chaos: { x: -60, y: 35 },  ordered: { x: -45, y: 30 } },
  { type: "calendar", chaos: { x: 0,   y: 50 },  ordered: { x: -15, y: 30 } },
  { type: "question", chaos: { x: 20, y: 20 },  ordered: { x: -45, y: 60 } },
  { type: "dollar",   chaos: { x: -20, y: 60 }, ordered: { x: -15, y: 60 } },
];

export default function TimeLossAnimation() {
  const controls = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      await controls.start("initial");
      await controls.start("chaos");
      // --- 2. استخدام onComplete لربط النهاية بالترتيب ---
      await controls.start("reorder").then(() => {
        controls.start("finalCheck");
      });
    };
    
    sequence();
    const interval = setInterval(sequence, 12000);
    return () => clearInterval(interval);
  }, [controls]);

  const getColorClasses = (color: string, type: "bg" | "text") => ({
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    green: { bg: "bg-green-100", text: "text-green-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
    orange: { bg: "bg-orange-100", text: "text-orange-600" },
  }[color][type]);

  return (
    <div style={{ width: '150px', height: '150px', position: 'relative', overflow: 'hidden' }}>
      <motion.div
        className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center p-1 z-20"
        variants={{
          initial: { scale: 0, opacity: 0 },
          reorder: { scale: 1, opacity: 1, transition: { delay: 2.5, type: "spring" } },
          finalCheck: { scale: 0, opacity: 0, transition: { delay: 0.5, duration: 0.3 } }
        }}
        animate={controls}
      >
        <Image src="/images/logo.png" alt="AI-Uncode Agent" width={40} height={40} />
      </motion.div>

      {messagesConfig.map((msg, i) => (
        <motion.div
          key={i}
          className={`absolute top-1/2 left-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-sm z-10 ${getColorClasses(MESSAGE_TYPES[msg.type].color, "bg")}`}
          variants={{
            initial: { opacity: 0, scale: 0, x: "-50%", y: "-50%" },
            chaos: {
              x: msg.chaos.x, y: msg.chaos.y, opacity: 1, scale: 1,
              transition: { delay: i * 0.2, type: "spring", stiffness: 100 }
            },
            reorder: {
              x: msg.ordered.x, y: msg.ordered.y, scale: 0.6, opacity: 0.8,
              transition: { delay: 3 + i * 0.4, type: "spring", stiffness: 120 }
            },
            finalCheck: { scale: 0, opacity: 0, transition: { duration: 0.3 } }
          }}
          animate={controls}
        >
          <svg viewBox="0 0 24 24" fill="none" className={`w-4 h-4 ${getColorClasses(MESSAGE_TYPES[msg.type].color, "text")}`}>
            {MESSAGE_TYPES[msg.type].icon}
          </svg>
          
          {/* --- 1. إضافة علامات الصح الفردية --- */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
            variants={{
              initial: { scale: 0, opacity: 0 },
              reorder: { scale: 1, opacity: 1, transition: { delay: 3.5 + i * 0.4 } },
              finalCheck: { scale: 0, opacity: 0 }
            }}
            animate={controls}
          >
             <svg viewBox="0 0 24 24" fill="none" className="w-2 h-2 text-white">{ICONS.check()}</svg>
          </motion.div>
        </motion.div>
      ))}
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-green-500 z-30"
        variants={{
          initial: { opacity: 0, scale: 0 },
          finalCheck: {
            opacity: 1, scale: 1,
            transition: { duration: 0.5, type: "spring" }
          }
        }}
        animate={controls}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-2/3 h-2/3 text-white">
          {ICONS.check()}
        </svg>
      </motion.div>
    </div>
  );
}
