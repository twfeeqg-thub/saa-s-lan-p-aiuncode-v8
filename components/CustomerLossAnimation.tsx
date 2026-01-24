'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useCallback } from 'react'

export default function CustomerLossAnimation() {
  const controls = useAnimation()
  
  const sequence = useCallback(async () => {
    try {
      await controls.start("initial")
      await controls.start("journeyStart")
      await controls.start("obstacle")
      await controls.start("beamTravel")
    } catch (e) { /* Prevent crash if unmounted */ }
  }, [controls])

  useEffect(() => {
    sequence()
    return () => controls.stop()
  }, [sequence, controls])

  return (
    <motion.div animate={controls} initial="initial" className="w-full h-32 bg-red-50 rounded-lg flex items-center justify-center">
       <span className="text-red-500 font-bold">نموذج فقدان العملاء المحدث</span>
    </motion.div>
  )
}
