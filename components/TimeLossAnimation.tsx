"use client"

import { motion, AnimatePresence, useAnimationControls } from "framer-motion"
import { useEffect } from "react"
import Image from "next/image"

// --- 1. أيقونات متنوعة ---
const ICONS = {
  question: () => <path d="M9.09 9a3 3 0 0 1 5.83 1c0 1-1.5 2.5-3 3.5-1.5 1-3 .5-3 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  dollar: () => <path d="M12 2v20m5-17H7m10 4H7m10 4H7m10 4H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  truck: () => <><path d="M10 17h4V5H2v12h2" /><path d="M22 17h-4.32a2.28 2.28 0 0 0-2.17 1.35c-.38.7-.08 1.65.7 2.15s1.8.2 2.4-.5c.6-.7.3-1.8-.4-2.4" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></>,
  calendar: () => <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
  check: () => <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />,
};

// --- 1. تعريف أنواع الرسائل بألوانها ---
const MESSAGE_TYPES = {
  question: { icon: ICONS.question(), color: "blue" },
  dollar: { icon: ICONS.dollar(), color: "green" },
  truck: { icon: ICONS.truck(), color: "purple" },
  calendar: { icon: ICONS.calendar(), color: "orange" },
};

// --- 2. زيادة عدد الرسائل إلى 10 ---
const messagesConfig = [
  { type: "question", chaos: { x: -50, y: -45 }, ordered: { y: -65, x: -30 } },
  { type: "dollar",   chaos: { x: 30,  y: -55 }, ordered: { y: -65, x: 30 } },
  { type: "truck",    chaos: { x: 45,  y: 0 },   ordered: { y: -35, x: -30 } },
  { type: "calendar", chaos: { x: -35, y: 15 },  ordered: { y: -35, x: 30 } },
  { type: "question", chaos: { x: -10, y: -20 }, ordered: { y: -5, x: -30 } },
  { type: "dollar",   chaos: { x: 55,  y: 40 },  ordered: { y: -5, x: 30 } },
  { type: "truck",    chaos: { x: -60, y: 35 },  ordered: { y: 25, x: -30 } },
  { type: "calendar", chaos: { x: 0,   y: 50 },  ordered: { y: 25, x: 30 } },
  { type: "question", chaos: { x: 20, y: 20 }, ordered: { y: 55, x: -30 } },
  { type: "dollar", chaos: { x: -20, y: 60 }, ordered: { y: 55, x: 30 } },
];

export default function TimeLossAnimation() {
  const controls = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      // المرحلة 1: إعادة كل شيء إلى حالة الفوضى الأولية
      await controls.start("chaos");
      // المرحلة 2: إظهار الشعار في المنتصف
      await controls.start("showLogo");
      // المرحلة 3: تحريك كل فقاعة إلى مكانها المنظم
      await controls.start("order");
    };
    
    sequence();
    const interval = setInterval(sequence, 8000); // تكرار كل 8 ثوانٍ
    return () => clearInterval(interval);
  }, [controls]);

  const getColorClasses = (color: string, type: "bg" | "text") => {
    const colorMap = {
      blue: { bg: "bg-blue-100", text: "text-blue-600" },
      green: { bg: "bg-green-100", text: "text-green-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600" },
      orange: { bg: "bg-orange-100", text: "text-orange-600" },
    };
    return colorMap[color][type];
  };

  return (
    <div style={{ width: '150px', height: '150px', position: 'relative' }}>
      {/* شعار المنصة */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center p-1 z-10"
        variants={{
          chaos: { scale: 0, opacity: 0, x: "-50%", y: "-50%" },
          showLogo: { scale: 1, opacity: 1, x: "-50%", y: "-50%", transition: { delay: 2, type: "spring", stiffness: 150, damping: 15 } },
        }}
        animate={controls}
      >
        <Image src="/images/logo.png" alt="AI-Uncode Agent" width={56} height={56} />
      </motion.div>

      {/* الفقاعات */}
      {messagesConfig.map((msg, i) => (
        <motion.div
          key={i}
          className={`absolute top-1/2 left-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-sm ${getColorClasses(MESSAGE_TYPES[msg.type].color, "bg")}`}
          variants={{
            chaos: {
              x: msg.chaos.x,
              y: msg.chaos.y,
              opacity: 1,
              scale: 1,
              transition: { delay: i * 0.1, type: "spring", stiffness: 100, damping: 10 }
            },
            order: {
              x: msg.ordered.x,
              y: msg.ordered.y,
              opacity: 0.5, // جعلها باهتة قليلاً في الخلفية
              scale: 0.8,
              transition: { delay: 2.5 + i * 0.2, type: "spring", stiffness: 120 }
            }
          }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 50 }}
          animate={controls}
        >
          <svg viewBox="0 0 24 24" fill="none" className={`w-5 h-5 ${getColorClasses(MESSAGE_TYPES[msg.type].color, "text")}`}>
            {MESSAGE_TYPES[msg.type].icon}
          </svg>
        </motion.div>
      ))}
      
      {/* علامات الصح */}
      {messagesConfig.map((msg, i) => (
         <motion.div
          key={`check-${i}`}
          className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full flex items-center justify-center bg-green-500"
          variants={{
            chaos: { opacity: 0, scale: 0 },
            order: {
              x: msg.ordered.x + 15, // بجوار الفقاعة المنظمة
              y: msg.ordered.y,
              opacity: 1,
              scale: 1,
              transition: { delay: 2.6 + i * 0.2, type: "spring", stiffness: 200 }
            }
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={controls}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white">
            {ICONS.check()}
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
