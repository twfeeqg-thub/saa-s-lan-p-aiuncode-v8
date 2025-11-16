"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect } from "react"
import Image from "next/image"

// --- 3. إضافة أيقونة الإعجاب ---
const ICONS = {
  question: () => <path d="M9.09 9a3 3 0 0 1 5.83 1c0 1-1.5 2.5-3 3.5-1.5 1-3 .5-3 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  dollar: () => <path d="M12 2v20m5-17H7m10 4H7m10 4H7m10 4H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  truck: () => <><path d="M10 17h4V5H2v12h2" /><path d="M22 17h-4.32a2.28 2.28 0 0 0-2.17 1.35c-.38.7-.08 1.65.7 2.15s1.8.2 2.4-.5c.6-.7.3-1.8-.4-2.4" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></>,
  calendar: () => <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
  check: () => <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />,
  thumbsUp: () => <path d="M7 11V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4M7 11H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3M7 11l1.11 6.23A2 2 0 0 0 10 19h4.23a2 2 0 0 0 1.95-1.57L18 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
};

const MESSAGE_TYPES = {
  question: { icon: ICONS.question(), color: "blue" },
  dollar: { icon: ICONS.dollar(), color: "green" },
  truck: { icon: ICONS.truck(), color: "purple" },
  calendar: { icon: ICONS.calendar(), color: "orange" },
};

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
  // --- 2. استخدام متحكمات منفصلة لكل جزء ---
  const chaosControls = useAnimationControls();
  const logoControls = useAnimationControls();
  const orderControls = useAnimationControls();
  const finalControls = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      // إعادة كل شيء إلى الحالة الأولية
      await Promise.all([
        chaosControls.start("initial"),
        logoControls.start("initial"),
        orderControls.start("initial"),
        finalControls.start("initial"),
      ]);

      // المرحلة 1: عرض الفوضى
      await chaosControls.start("animate");

      // المرحلة 2: إظهار الشعار (بعد ثانية واحدة)
      await logoControls.start("animate");

      // المرحلة 3: بدء عملية الترتيب (بعد 2.5 ثانية)
      await orderControls.start("animate");

      // المرحلة 4: إظهار علامة الإعجاب النهائية (بعد 7 ثوانٍ)
      await finalControls.start("animate");
    };
    
    sequence();
    // --- 4. تمديد مدة الدورة الكاملة ---
    const interval = setInterval(sequence, 10000);
    return () => clearInterval(interval);
  }, [chaosControls, logoControls, orderControls, finalControls]);

  const getColorClasses = (color: string, type: "bg" | "text") => ({
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    green: { bg: "bg-green-100", text: "text-green-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
    orange: { bg: "bg-orange-100", text: "text-orange-600" },
  }[color][type]);

  return (
    <div style={{ width: '150px', height: '150px', position: 'relative', overflow: 'hidden' }}>
      <motion.div animate={logoControls} initial="initial"
        variants={{
          initial: { scale: 0, opacity: 0, x: "-50%", y: "-50%" },
          // --- 1. تسريع ظهور الشعار ---
          animate: { scale: 1, opacity: 1, transition: { delay: 1, type: "spring", stiffness: 150 } },
        }}
        className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center p-1 z-10"
      >
        <Image src="/images/logo.png" alt="AI-Uncode Agent" width={56} height={56} />
      </motion.div>

      {messagesConfig.map((msg, i) => (
        <motion.div key={i} animate={chaosControls} initial="initial"
          variants={{
            initial: { opacity: 0, scale: 0, x: 0, y: 50 },
            animate: {
              x: msg.chaos.x, y: msg.chaos.y, opacity: 1, scale: 1,
              transition: { delay: i * 0.1, type: "spring", stiffness: 100 }
            },
          }}
          className={`absolute top-1/2 left-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-sm ${getColorClasses(MESSAGE_TYPES[msg.type].color, "bg")}`}
        >
           <svg viewBox="0 0 24 24" fill="none" className={`w-5 h-5 ${getColorClasses(MESSAGE_TYPES[msg.type].color, "text")}`}>
            {MESSAGE_TYPES[msg.type].icon}
          </svg>
        </motion.div>
      ))}
      
      {messagesConfig.map((msg, i) => (
         <motion.div key={`ordered-${i}`} animate={orderControls} initial="initial"
          variants={{
            initial: { opacity: 0, scale: 0 },
            animate: {
              x: msg.ordered.x, y: msg.ordered.y, opacity: 1, scale: 0.8,
              transition: { delay: 2.5 + i * 0.4, type: "spring", stiffness: 120 }
            }
          }}
          className={`absolute top-1/2 left-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-sm ${getColorClasses(MESSAGE_TYPES[msg.type].color, "bg")}`}
        >
          <svg viewBox="0 0 24 24" fill="none" className={`w-5 h-5 ${getColorClasses(MESSAGE_TYPES[msg.type].color, "text")}`}>
            {MESSAGE_TYPES[msg.type].icon}
          </svg>
          <motion.div
            variants={{ initial: { scale: 0 }, animate: { scale: 1, transition: { delay: 2.8 + i * 0.4 } } }}
            className="absolute -right-2 -bottom-0 w-5 h-5 rounded-full flex items-center justify-center bg-green-500"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white">{ICONS.check()}</svg>
          </motion.div>
        </motion.div>
      ))}

      <motion.div animate={finalControls} initial="initial"
        variants={{
          initial: { opacity: 0, scale: 0 },
          animate: { opacity: 1, scale: 1.2, transition: { delay: 7.5, type: "spring" } }
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center bg-blue-500"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-white">{ICONS.thumbsUp()}</svg>
      </motion.div>
    </div>
  );
}
