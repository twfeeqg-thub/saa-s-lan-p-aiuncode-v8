'use client';

import { config } from "@/src/config/landingPageConfig";
// 1. استيراد المكونات الجديدة
import TimeLossAnimation from './TimeLossAnimation';
import CustomerLossAnimation from './CustomerLossAnimation';
import ComplexityAnimation from './ComplexityAnimation';

// مصفوفة بسيطة لتسهيل الوصول إلى المكونات
const animationComponents = [
  TimeLossAnimation,
  CustomerLossAnimation,
  ComplexityAnimation
];

export function PainPointsSection() {
  // تم حذف شرط الإخفاء لإظهار القسم دائمًا
  // if (!config.painPoints.enabled) {
  //   return null;
  // }

  return (
    <section className="py-20 px-6 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] text-center mb-12 text-balance">
          {config.painPoints.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.painPoints.points.map((point, index) => {
            // 2. اختيار المكون الصحيح من المصفوفة بناءً على الـ index
            const AnimationComponent = animationComponents[index];

            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4 h-40 flex items-center justify-center">
                  {/* 3. عرض المكون البرمجي الجديد */}
                  {AnimationComponent && <AnimationComponent />}
                </div>
                <p className="text-lg font-bold text-[var(--color-text-main)] text-center mb-2">{point.text}</p>
                <p className="text-sm text-[var(--color-secondary)] text-center leading-relaxed">{point.solutionHint}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
