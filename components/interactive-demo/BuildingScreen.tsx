"use client"

import { useState, useEffect } from "react"
import { config } from "@/src/config/landingPageConfig"
import { Palette, Puzzle, Wand2, Check, Loader2 } from "lucide-react"

// 1. تعريف أنواع Props: المكون سيستقبل دالة setStage من الأب
type BuildingScreenProps = {
  setStage: (stage: "finalChat") => void;
}

// 2. تعريف أنواع الخطوات لتكون أكثر تنظيمًا
type StepStatus = "pending" | "active" | "completed"
interface Step {
  id: number;
  icon: React.ReactNode;
  text: string;
  status: StepStatus;
}

// 3. تعديل اسم المكون واستقبال الـ props
export function BuildingScreen({ setStage }: BuildingScreenProps) {
  // 4. قراءة البيانات من ملف الإعدادات المركزي
  const { mainTitle, steps: stepTexts } = config.interactiveDemo.stageThree
  const stepDuration = 2000 // مدة كل خطوة بالمللي ثانية (ثانيتان)

  // 5. إعداد الحالة الأولية للخطوات بناءً على البيانات من config
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, icon: <Palette className="w-8 h-8" />, text: stepTexts[0], status: "pending" },
    { id: 2, icon: <Puzzle className="w-8 h-8" />, text: stepTexts[1], status: "pending" },
    { id: 3, icon: <Wand2 className="w-8 h-8" />, text: stepTexts[2], status: "pending" },
  ])

  // 6. التأثير الرئيسي (useEffect) لتشغيل تسلسل التحميل
  useEffect(() => {
    // المؤقت الأول: يبدأ الخطوة الأولى
    const timer1 = setTimeout(() => {
      setSteps(prev => prev.map(step => step.id === 1 ? { ...step, status: "active" } : step))
    }, 500) // تأخير بسيط في البداية

    // المؤقت الثاني: يكمل الخطوة الأولى ويبدأ الثانية
    const timer2 = setTimeout(() => {
      setSteps(prev => prev.map(step => 
        step.id === 1 ? { ...step, status: "completed" } : 
        step.id === 2 ? { ...step, status: "active" } : 
        step
      ))
    }, 500 + stepDuration)

    // المؤقت الثالث: يكمل الخطوة الثانية ويبدأ الثالثة
    const timer3 = setTimeout(() => {
      setSteps(prev => prev.map(step => 
        step.id === 2 ? { ...step, status: "completed" } : 
        step.id === 3 ? { ...step, status: "active" } : 
        step
      ))
    }, 500 + stepDuration * 2)

    // المؤقت الرابع: يكمل الخطوة الأخيرة وينتقل للمرحلة التالية
    const timer4 = setTimeout(() => {
      setSteps(prev => prev.map(step => 
        step.id === 3 ? { ...step, status: "completed" } : 
        step
      ))
      // بعد اكتمال كل شيء، انتظر قليلاً ثم انتقل للمرحلة النهائية
      setTimeout(() => {
        setStage("finalChat")
      }, 1000)
    }, 500 + stepDuration * 3)

    // تنظيف جميع المؤقتات عند تفكيك المكون
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  // مصفوفة الاعتماديات فارغة لضمان تشغيل التأثير مرة واحدة فقط
  }, [setStage, stepDuration])

  return (
    // 7. استخدام متغيرات الألوان الخاصة بنا وتوسيط المحتوى
    <div className="min-h-[60vh] bg-transparent flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl w-full animate-fade-in">
        {/* العنوان الرئيسي من ملف config */}
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-main)] mb-16 leading-relaxed">
          {mainTitle}
        </h1>

        {/* قائمة الخطوات */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-6 transition-all duration-700 ${
                step.status === "pending" ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* الأيقونة */}
              <div
                className={`flex-shrink-0 transition-colors duration-500 ${
                  step.status === "active"
                    ? "text-[var(--color-primary)] animate-spin"
                    : step.status === "completed"
                      ? "text-green-500"
                      : "text-gray-400"
                }`}
              >
                {step.icon}
              </div>

              {/* النص */}
              <p
                className={`flex-1 text-xl md:text-2xl font-medium text-right transition-colors duration-500 ${
                  step.status === "active"
                    ? "text-[var(--color-text-main)]"
                    : "text-gray-500"
                }`}
              >
                {step.text}
              </p>

              {/* مؤشر الحالة (تحميل أو اكتمال) */}
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {step.status === "active" && <Loader2 className="w-6 h-6 text-[var(--color-primary)] animate-spin" />}
                {step.status === "completed" && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

