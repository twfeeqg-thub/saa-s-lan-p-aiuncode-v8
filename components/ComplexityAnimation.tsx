'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useCallback } from 'react'

export default function ComplexityAnimation() {
  const controls = useAnimation()
  
  const sequence = useCallback(async () => {
    try {
      await controls.start("chaos")
      await controls.start("intervention")
      await controls.start("build")
      await controls.start("result")
    } catch (e) { }
  }, [controls])

  useEffect(() => {
    sequence()
    return () => controls.stop()
  }, [sequence, controls])

  return (
    <motion.div animate={controls} initial="initial" className="w-full h-32 bg-blue-50 rounded-lg flex items-center justify-center">
       <span className="text-blue-500 font-bold">نموذج التبسيط المحدث</span>
    </motion.div>
  )
}
