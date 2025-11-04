"use client"

import { config } from "@/src/config/landingPageConfig"
// 1. استيراد المكتبة الجديدة
import { DotLottiePlayer } from '@lottiefiles/dotlottie-react';

export function PainPointsSection() {
  // تأكد من أن القسم مفعل قبل عرضه
  if (!config.sections.painPoints) {
    return null;
  }

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
                {/* 2. استخدام المكون الجديد DotLottiePlayer */}
                <DotLottiePlayer
                  src={point.lottieFile} // المسار إلى ملف .json
                  autoplay
                  loop
                  style={{ width: 160, height: 160 }}
                />
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
