"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

// --- بداية الإصلاح ---
// تم تغليف كل أيقونة بـ Fragment <>...</> وإصلاح إغلاق الوسوم <path />
const QuestionMark = () => (
  <>
    <path d="M10 13.5c0-1.5 1.5-2.5 3-3 1.5-.5 2-1.5 2-2.5 0-1.5-1.5-2.5-3-2.5s-3 1-3 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 19.5v-0.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>
);
const DollarSign = () => (
  <>
    <path d="M12 2v2m0 16v2M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M17.5 6.5c-1.5-1.5-3.5-2.5-5.5-2.5s-4 1-5.5 2.5c-1.5 1.5-2.5 3.5-2.5 5.5s1 4 2.5 5.5c1.5 1.5 3.5 2.5 5.5 2.5s4-1 5.5-2.5c1.5-1.5 2.5-3.5 2.5-5.5s-1-4-2.5-5.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>
);
const CheckMark = () => <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />;
// --- نهاية الإصلاح ---


// تعريف الرسائل الفوضوية
const chaoticMessages = [
  { id: 1, icon: <QuestionMark />, x: -40, y: -30, delay: 0.2 },
  { id: 2, icon: <DollarSign />, x: 20, y: -15, delay: 0.5 },
  { id: 3, icon: <QuestionMark />, x: -25, y: 20, delay: 0.8 },
  { id: 4, icon: <DollarSign />, x: 35, y: 25, delay: 1.1 },
];

// تعريف الردود المنظمة
const orderedReplies = [
  { id: 1, icon: <QuestionMark />, x: -50, y: -20, delay: 0.2 },
  { id: 2, icon: <DollarSign />, x: -50, y: 20, delay: 0.4 },
  { id: 3, icon: <QuestionMark />, x: 50, y: -20, delay: 0.6, isReply: true },
  { id: 4, icon: <DollarSign />, x: 50, y: 20, delay: 0.8, isReply: true },
];

export default function TimeLossAnimation() {
  const [stage, setStage] = useState<"chaos" | "solution">("chaos");

  useEffect(() => {
    const sequence = async () => {
      setStage("chaos");
      await new Promise(resolve => setTimeout(resolve, 3500));
      setStage("solution");
      await new Promise(resolve => setTimeout(resolve, 3500));
    };
    
    sequence();
    const interval = setInterval(sequence, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '150px', height: '150px', position: 'relative', fontFamily: 'sans-serif' }}>
      <AnimatePresence>
        {stage === "chaos" && (
          <motion.div
            key="chaos"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {chaoticMessages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 40, scale: 0.5 }}
                animate={{ opacity: 1, y: msg.y, x: msg.x, scale: 1, transition: { delay: msg.delay, type: "spring", stiffness: 150 } }}
                className="absolute top-1/2 left-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-gray-600">{msg.icon}</svg>
              </motion.div>
            ))}
          </motion.div>
        )}

        {stage === "solution" && (
          <motion.div
            key="solution"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } }}
            className="w-full h-full"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.2, duration: 0.3 } }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--color-primary)] rounded-full"
            />

            {orderedReplies.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, y: msg.y, x: msg.x, scale: 1, transition: { delay: msg.delay, type: "spring", stiffness: 150 } }}
                className={`absolute top-1/2 left-1/2 w-8 h-8 rounded-full flex items-center justify-center ${msg.isReply ? 'bg-green-100' : 'bg-gray-200'}`}
              >
                <svg viewBox="0 0 24 24" fill="none" className={`w-5 h-5 ${msg.isReply ? 'text-green-600' : 'text-gray-600'}`}>
                  {msg.isReply ? <CheckMark /> : msg.icon}
                </svg>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
