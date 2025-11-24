"use client"

import { motion } from "framer-motion"
import { Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function WelcomePage() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-background" dir="rtl">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-900"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Subtle overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Main content container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Main heading with animations */}
        <motion.h1
          className="mb-8 text-center text-5xl font-bold text-white md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          لنحقق حلمك بذكاء!
        </motion.h1>

        {/* CTA Button with animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="mb-8"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(168, 85, 247, 0.3)",
                "0 0 40px rgba(168, 85, 247, 0.6)",
                "0 0 20px rgba(168, 85, 247, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="rounded-full"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-white text-black hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-full"
              onClick={() => console.log("AI-Uncode started")}
            >
              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50"
                whileHover={{ x: 100 }}
                transition={{ duration: 0.5 }}
              />

              {/* Button content */}
              <div className="relative flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                <span>ابدأ مع AI-Uncode الآن</span>
              </div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Brand elements container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
          }}
          className="mb-4 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="AI-Uncode logo" width={24} height={24} className="h-6 w-6" />
            <span className="text-sm font-medium text-white/80">ذكاء صناعي بلا تعقيد</span>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
          }}
          className="text-center text-xs text-white/60 md:text-sm"
        >
          استعد... ذكاؤنا الصناعي يخلّيه أسهل مما تتخيل!
        </motion.p>
      </div>
    </div>
  )
}
