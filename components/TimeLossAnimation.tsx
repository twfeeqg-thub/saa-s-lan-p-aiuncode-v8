'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useCallback } from 'react'

export default function TimeLossAnimation() {
  const controls = useAnimation()
  
  const sequence = useCallback(async () => {
    try {
      await controls.start("chaos")
      await controls.start("reorder")
    } catch (e) { console.error(e) }
  }, [controls])

  useEffect(() => {
    sequence()
  }, [sequence])

  return (
    <motion.div animate={controls} initial="initial" className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
      {/* محتوى الأنيميشن */}
      <motion.div variants={{ chaos: { x: [0, -20, 20, 0] }, reorder: { scale: [1, 1.2, 1] } }}>
        ⏳ معالجة ذكية للوقت
      </motion.div>
    </motion.div>
  )
}
