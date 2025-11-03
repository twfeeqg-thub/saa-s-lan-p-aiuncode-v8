"use client"

import { config } from "@/src/config/landingPageConfig"
import Lottie from "lottie-react"
import { useState, useEffect } from "react"

// --- بداية الكود المحصّن والآمن ---
function LottieAnimation({ path }: { path: string }) {
  const [animationData, setAnimationData] = useState<any | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(path)
      .then((response) => {
        if (!response.ok) {
          // إذا كان هناك أي مشكلة في الاستجابة (مثل 404 أو 500)
          throw new Error(`Failed to fetch Lottie file: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => {
        // تحقق إضافي: تأكد من أن البيانات تحتوي على خاصية أساسية (مثل 'v' للإصدار)
        if (data && typeof data === 'object' && 'v' in data) {
          setAnimationData(data)
        } else {
          throw new Error("Invalid Lottie JSON structure.")
        }
      })
      .catch((e) => {
        console.error("Lottie Load Error:", e)
        setError(true) // تعيين حالة الخطأ
      })
  }, [path])

  if (error) {
    // عرض عنصر نائب آمن في حال فشل التحميل لمنع انهيار الصفحة
    return <div className="h-40 w-40 bg-red-100 flex items-center justify-center text-sm text-red-600 rounded-lg p-2 text-center">Error Loading Animation</div>
  }

  if (!animationData) {
    // عرض عنصر نائب جميل أثناء التحميل
    return <div className="h-40 w-40 animate-pulse bg-gray-100 rounded-lg" />
  }

  return (
    <Lottie 
      animationData={animationData} 
      loop={true} 
      style={{ width: 160, height: 160 }} 
      // إضافة prop للتعامل مع الأخطاء التي تحدث أثناء العرض (Rendering)
      onError={(err) => {
        console.error("Lottie Render Error:", err)
        setError(true)
      }}
    />
  )
}
// --- نهاية الكود المحصّن والآمن ---


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
