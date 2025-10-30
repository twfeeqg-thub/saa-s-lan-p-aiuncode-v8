"use client"

import { config } from "@/src/config/landingPageConfig"
import Lottie from "lottie-react"
import { useState, useEffect } from "react"

function LottieAnimation({ path }: { path: string }) {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    // --- بداية التعديل ---
    // 1. استخدام المسار المطلق من المجلد public مباشرة
    //    Next.js يفهم أن المسارات التي تبدأ بـ '/' هي من داخل مجلد public
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setAnimationData(data)
      })
      .catch(console.error)
    // --- نهاية التعديل ---
  }, [path])

  if (!animationData) {
    return <div className="h-40 w-40" />
  }

  return <Lottie animationData={animationData} loop={true} style={{ width: 160, height: 160 }} />
}


export function PainPointsSection() {
  return (
    <section className="py-20 px-6 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] text-center mb-12 text-balance">
          {config.painPoints.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.painPoints.points.map((point, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4 h-40 flex items-center justify-center">
                <LottieAnimation path={point.lottieFile} />
              </div>
              <p className="text-lg font-bold text-[var(--color-text-main)] text-center mb-2">{point.text}</p>
              <p className="text-sm text-[var(--color-secondary)] text-center leading-relaxed">{point.solutionHint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
