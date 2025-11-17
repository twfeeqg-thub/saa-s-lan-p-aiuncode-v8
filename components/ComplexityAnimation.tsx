import React from "react"; import { motion, AnimatePresence } from "framer-motion";

/**

AnimatedScenarioHero


---

Reusable React component (Tailwind + Framer Motion) to build complex, timeline-driven

interface animations (suitable as a hero/landing section replacement for GIFs/videos).

Features:

Accepts an array of "scenes". Each scene contains elements and per-element animation steps.


Plays scenes in sequence with crossfade and stagger control.


Keyboard accessible (pause/play) and responsive.


Lightweight: renders DOM + CSS + framer-motion (no video). Works with Lottie/Rive embeds as well.


Usage example (simple):

<AnimatedScenarioHero

scenes={[

{ id: 'discover', duration: 3500, elements: [

{ key: 'title', type: 'text', content: 'Discover AI-Uncode', enter: {y: 24, opacity:0}, animate: {y:0, opacity:1}, delay:0.0 },

{ key: 'cta', type: 'button', content: 'Get Started', enter: {scale:.9, opacity:0}, animate:{scale:1, opacity:1}, delay:0.6 }

]},

{ id: 'flow', duration: 4000, elements: [ /* ... */ ] }

]}

loop={true}

className="max-w-6xl mx-auto"

/> */


const DEFAULT_SCENE_DURATION = 3500;

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

export default function AnimatedScenarioHero({ scenes = [], loop = true, className = "", pauseOnHover = true }) { const [index, setIndex] = React.useState(0); const [paused, setPaused] = React.useState(false); const timerRef = React.useRef(null);

React.useEffect(() => { if (paused) return; const scene = scenes[index] || { duration: DEFAULT_SCENE_DURATION }; const duration = clamp(scene.duration || DEFAULT_SCENE_DURATION, 800, 20000); timerRef.current = setTimeout(() => { const next = index + 1; if (next >= scenes.length) { if (loop) setIndex(0); } else setIndex(next); }, duration); return () => clearTimeout(timerRef.current); }, [index, paused, scenes, loop]);

// keyboard controls: space toggles pause/play, arrow keys navigate scenes React.useEffect(() => { const onKey = (e) => { if (e.code === 'Space') { e.preventDefault(); setPaused(p => !p); } if (e.code === 'ArrowRight') { setIndex(i => Math.min(i+1, scenes.length-1)); } if (e.code === 'ArrowLeft') { setIndex(i => Math.max(i-1, 0)); } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [scenes.length]);

const current = scenes[index] || { id: 'empty', elements: [] };

return ( <section aria-label="Animated scenarios" className={relative overflow-hidden p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-slate-50 ${className}} onMouseEnter={() => pauseOnHover && setPaused(true)} onMouseLeave={() => pauseOnHover && setPaused(false)} tabIndex={0} > <div className="flex items-center justify-between mb-4"> <div className="space-y-1"> <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{current.title || 'Scenario'}</h2> <p className="text-sm text-slate-500">{current.subtitle || 'Animated interface preview — accessible & code-friendly.'}</p> </div>

<div className="flex gap-2 items-center">
      <button
        aria-pressed={paused}
        onClick={() => setPaused(p => !p)}
        className="px-3 py-1 rounded-xl shadow-sm border text-sm text-slate-700 bg-white"
      >{paused ? 'Play' : 'Pause'}</button>

      <div className="text-xs text-slate-500">{index+1}/{Math.max(scenes.length,1)}</div>
    </div>
  </div>

  <div className="relative w-full h-64 md:h-80 lg:h-96 bg-transparent rounded-xl overflow-hidden flex items-center justify-center">
    <AnimatePresence mode="wait">
      {/* Scene wrapper */}
      <motion.div
        key={current.id || index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Elements inside scene */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">
          {current.elements && current.elements.map((el, i) => {
            // default variant map
            const enter = el.enter || { y: 20, opacity: 0, scale: 1 };
            const animate = el.animate || { y: 0, opacity: 1, scale: 1 };
            const exit = el.exit || { opacity: 0, y: -12 };
            const delay = typeof el.delay === 'number' ? el.delay : (i * 0.12);

            const common = {
              initial: enter,
              animate: animate,
              exit: exit,
              transition: { type: 'spring', stiffness: 120, damping: 16, delay }
            };

            // Element rendering by type (text, image, lottie, custom)
            if (el.type === 'image') {
              return (
                <motion.div key={el.key || i} {...common} className="flex items-center justify-center">
                  <img src={el.src} alt={el.alt || ''} className="rounded-2xl shadow-md max-h-64 object-contain" />
                </motion.div>
              );
            }

            if (el.type === 'lottie') {
              // user may pass a React Lottie component in el.component or a fallback image
              return (
                <motion.div key={el.key || i} {...common} className="flex items-center justify-center">
                  {el.component ? el.component : <img src={el.fallback} alt="animation" className="rounded-xl" />}
                </motion.div>
              );
            }

            if (el.type === 'button') {
              return (
                <motion.div key={el.key || i} {...common} className="flex items-center">
                  <button className="px-4 py-2 rounded-2xl shadow-sm bg-slate-900 text-white font-medium">{el.content}</button>
                </motion.div>
              );
            }

            // default: text / card
            return (
              <motion.div key={el.key || i} {...common} className="p-4 rounded-xl bg-white/60 backdrop-blur-sm shadow-inner">
                {el.title && <h3 className="text-lg font-semibold">{el.title}</h3>}
                {el.content && <p className="text-sm text-slate-600 mt-2">{el.content}</p>}
              </motion.div>
            );

          })}
        </div>
      </motion.div>
    </AnimatePresence>
  </div>

  {/* Simple pagination dots */}
  <div className="mt-4 flex items-center justify-center gap-2">
    {scenes.map((s, i) => (
      <button
        key={s.id || i}
        onClick={() => setIndex(i)}
        aria-label={`Go to scene ${i+1}`}
        className={`w-3 h-3 rounded-full ${i === index ? 'scale-110' : 'opacity-50'}`}
      >
        <span className="sr-only">{i+1}</span>
      </button>
    ))}
  </div>

</section>

); }

