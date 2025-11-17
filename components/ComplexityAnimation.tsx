"use client"; import React from "react"; import { motion, AnimatePresence } from "framer-motion";

/**

ComplexityScenarioAnimation.tsx

سيناريو: "التكنولوجيا تبدو معقدة ومكلفة؟"

قصة مرئية: من الفوضى → النظام عبر تدخل AI‑Uncode

مناسب لــ Landing Pages (Hero / Pain Point Section) */


export default function ComplexityScenarioAnimation() { const [phase, setPhase] = React.useState(0);

React.useEffect(() => { const timers = [ setTimeout(() => setPhase(1), 1800), // ظهور AI‑Uncode setTimeout(() => setPhase(2), 3600), // الموجة + التحول setTimeout(() => setPhase(3), 6200), // النتيجة النهائية ]; return () => timers.forEach(t => clearTimeout(t)); }, []);

return ( <div className="relative w-full h-72 md:h-96 flex items-center justify-center overflow-hidden rounded-2xl bg-white"> {/* المرحلة الأولى: فوضى */} <AnimatePresence> {phase === 0 && ( <motion.div key="chaos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0" > <ChaosLayer /> </motion.div> )} </AnimatePresence>

{/* المرحلة الثانية: ظهور AI‑Uncode */}
  <AnimatePresence>
    {phase === 1 && (
      <motion.div
        key="logo"
        className="absolute z-20 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <LogoPulse />
      </motion.div>
    )}
  </AnimatePresence>

  {/* المرحلة الثالثة: الموجة + التحول */}
  <AnimatePresence>
    {phase === 2 && (
      <motion.div key="wave" className="absolute inset-0 z-10">
        <WaveEffect />
        <TransformLayer />
      </motion.div>
    )}
  </AnimatePresence>

  {/* المرحلة الرابعة: النتيجة النهائية */}
  <AnimatePresence>
    {phase === 3 && (
      <motion.div
        key="result"
        className="absolute inset-0 z-30 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
      >
        <FinalResult />
      </motion.div>
    )}
  </AnimatePresence>
</div>

); }

/* -------------------------------------------------------

الطبقة 1: الفوضى (أشكال عشوائية متحركة)

-----------------------------------------------------*/ function ChaosLayer() { const shapes = Array.from({ length: 9 }).map((_, i) => ({ id: i, x: Math.random() * 250 - 120, y: Math.random() * 150 - 80, rotate: Math.random() * 180, scale: Math.random() * 0.8 + 0.6, }));


return ( <div className="absolute inset-0 flex items-center justify-center"> {shapes.map(s => ( <motion.div key={s.id} className="absolute bg-slate-400 rounded-lg opacity-70" style={{ width: 40, height: 40 }} initial={{ x: 0, y: 0, rotate: 0 }} animate={{ x: s.x, y: s.y, rotate: s.rotate, scale: s.scale }} transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse" }} /> ))}

{/* أيقونة محفظة مع X */}
  <motion.div
    className="absolute flex flex-col items-center gap-1"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.8 }}
  >
    <div className="text-4xl">💸</div>
    <div className="text-red-600 text-2xl font-bold">X</div>
  </motion.div>
</div>

); }

/* -------------------------------------------------------

الطبقة 2: شعار AI‑Uncode مع نبضة

-----------------------------------------------------*/ function LogoPulse() { return ( <motion.div className="w-28 h-28 rounded-3xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.8, repeat: Infinity }}

> 

AI‑U </motion.div> ); }


/* -------------------------------------------------------

الطبقة 3: موجة تنظف الفوضى + تظهر البناء

-----------------------------------------------------*/ function WaveEffect() { return ( <motion.div className="absolute inset-0 bg-white/60 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} /> ); }


function TransformLayer() { return ( <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }} > {/* واجهة بسيطة تمثل النظام */} <motion.div className="w-64 h-40 rounded-xl bg-green-300 shadow-xl p-4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} > <div className="w-full h-4 bg-white/80 rounded mb-2" /> <div className="w-3/4 h-4 bg-white/80 rounded mb-2" /> <div className="w-1/2 h-4 bg-white/80 rounded mb-2" /> <div className="mt-4 w-20 h-6 bg-slate-900 rounded-xl" /> </motion.div> </motion.div> ); }

/* -------------------------------------------------------

الطبقة 4: النتيجة النهائية (صاروخ النجاح)

-----------------------------------------------------*/ function FinalResult() { return (

 <div className="flex flex-col items-center gap-4">
   <div className="text-6xl">🚀</div>
   <h3 className="text-xl font-semibold text-slate-800">تم البناء في 7 أيام</h3>
 </div>
); }

