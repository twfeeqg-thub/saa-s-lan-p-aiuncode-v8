"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

// --- أيقونات SVG مُعاد كتابتها بشكل صحيح ---
const QuestionMark = () => <path d="M9.09 9a3 3 0 0 1 5.83 1c0 1-1.5 2.5-3 3.5-1.5 1-3 .5-3 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
const DollarSign = () => <path d="M12 2v20m5-17H7m10 4H7m10 4H7m10 4H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />;
const CheckMark = () => <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />;

// --- 1. زيادة عدد الرسائل إلى 8 ---
const chaoticMessages = [
  { id: 1, icon: <QuestionMark />, x: -50, y: -45, delay: 0.2 },
  { id: 2, icon: <DollarSign />,   x: 30,  y: -55, delay: 0.4 },
  { id: 3, icon: <QuestionMark />, x: 45,  y: 0,   delay: 0.6 },
  { id: 4, icon: <DollarSign />,   x: -35, y: 15,  delay: 0.8 },
  { id: 5, icon: <QuestionMark />, x: -10, y: -20, delay: 1.0 },
  { id: 6, icon: <DollarSign />,   x: 55,  y: 40,  delay: 1.2 },
  { id: 7, icon: <QuestionMark />, x: -60, y: 35,  delay: 1.4 },
  { id: 8, icon: <DollarSign />,   x: 0,   y: 50,  delay: 1.6 },
];

const orderedReplies = [
  { id: 1, icon: <QuestionMark />, x: -55, y: -30, delay: 0.4 },
  { id: 2, icon: <DollarSign />,   x: -55, y: 30,  delay: 0.6 },
  { id: 3, icon: <CheckMark />,    x: 55,  y: -30, delay: 0.8, isReply: true },
  { id: 4, icon: <CheckMark />,    x: 55,  y: 30,  delay: 1.0, isReply: true },
];

export default function TimeLossAnimation() {
  const [stage, setStage] = useState<"chaos" | "solution">("chaos");

  useEffect(() => {
    const sequence = async () => {
      setStage("chaos");
      // --- 5. تمديد مدة العرض ---
      await new Promise(resolve => setTimeout(resolve, 3000)); // مدة الفوضى
      setStage("solution");
      await new Promise(resolve => setTimeout(resolve, 3000)); // مدة الحل
    };
    
    sequence();
    const interval = setInterval(sequence, 6000); // تكرار كل 6 ثوانٍ
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '150px', height: '150px', position: 'relative' }}>
      <AnimatePresence>
        {stage === "chaos" && (
          <motion.div key="chaos" exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }} className="w-full h-full">
            {chaoticMessages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                animate={{ opacity: 1, y: msg.y, x: msg.x, scale: 1, transition: { delay: msg.delay, type: "spring", stiffness: 100, damping: 10 } }}
                // --- 2. تحسين ألوان الفوضى ---
                className="absolute top-1/2 left-1/2 w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center shadow-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-600">
                  {msg.icon}
                </svg>
              </motion.div>
            ))}
          </motion.div>
        )}

        {stage === "solution" && (
          <motion.div key="solution" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } }} className="w-full h-full">
            
            {/* --- 4. تكبير وإبراز وكيل AI --- */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.1, type: "spring", stiffness: 150, damping: 15 } }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center p-1"
            >
              <Image src="/images/logo.png" alt="AI-Uncode Agent" width={56} height={56} />
            </motion.div>

            {orderedReplies.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, y: msg.y, x: msg.x, scale: 1, transition: { delay: msg.delay, type: "spring", stiffness: 150 } }}
                className={`absolute top-1/2 left-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.isReply ? 'bg-green-100' : 'bg-blue-100'}`}
              >
                <svg viewBox="0 0 24 24" fill="none" className={`w-5 h-5 ${msg.isReply ? 'text-green-600' : 'text-blue-600'}`}>
                  {msg.icon}
                </svg>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
