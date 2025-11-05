"use client"

import { useState, useEffect, useRef } from "react"
import { config } from "@/src/config/landingPageConfig"
import { Check, Link as LinkIcon } from "lucide-react"

// 1. تعريف أنواع Props: المكون سيستقبل دالة setStage من الأب
type FakeConversationProps = {
  setStage: (stage: "scenarioSelection") => void
}

// 2. تعريف أنواع الأحداث في السيناريو لضمان سلامة الكود
type ScriptEvent = {
  type: "bot" | "user" | "buttons" | "payment-link";
  text?: string;
  options?: string[];
}

// 3. إعادة بناء المكون بالكامل ليصبح "مشغّل سيناريو"
export function FakeConversation({ setStage }: FakeConversationProps) {
  // 4. قراءة البيانات من ملف الإعدادات المركزي
  const { title, script, ctaButton } = config.interactiveDemo.stageZero

  // 5. إدارة الحالة (State Management)
  // حالة لتخزين الأحداث التي ظهرت على الشاشة
  const [displayedEvents, setDisplayedEvents] = useState<ScriptEvent[]>([])
  // حالة لتتبع أي حدث في السيناريو نعرضه الآن
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  // حالة لإظهار زر CTA النهائي بعد انتهاء المحاكاة
  const [isCtaVisible, setIsCtaVisible] = useState(false)

  const chatEndRef = useRef<HTMLDivElement>(null)

  // 6. التأثير الرئيسي (useEffect) لتشغيل المحاكاة
  useEffect(() => {
    // إذا عرضنا كل الأحداث، نوقف المؤقت ونظهر زر CTA
    if (currentEventIndex >= script.length) {
      setTimeout(() => setIsCtaVisible(true), 1000) // تأخير بسيط قبل ظهور الزر
      return
    }

    // تحديد مدة التأخير بناءً على نوع الحدث
    const currentEvent = script[currentEventIndex]
    let delay = 1500 // تأخير افتراضي بين الرسائل (1.5 ثانية)
    if (currentEvent.type === "user") delay = 800 // رد المستخدم يكون أسرع
    if (currentEvent.type === "buttons" || currentEvent.type === "payment-link") delay = 500 // الأزرار تظهر بسرعة

    // إنشاء مؤقت لإضافة الحدث التالي إلى الشاشة
    const timer = setTimeout(() => {
      setDisplayedEvents(prev => [...prev, currentEvent])
      setCurrentEventIndex(prev => prev + 1)
    }, delay)

    // تنظيف المؤقت عند تفكيك المكون لمنع تسريب الذاكرة
    return () => clearTimeout(timer)
  }, [currentEventIndex, script])

  // 7. تأثير لضمان التمرير التلقائي للأسفل مع كل رسالة جديدة
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [displayedEvents])

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] mb-8 animate-fade-in">
        {title}
      </h2>
      
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 space-y-4 border">
        {/* حاوية المحادثة */}
        <div className="space-y-4 h-[500px] overflow-y-auto p-2">
          {displayedEvents.map((event, index) => (
            <div key={index} className="animate-fade-in-up">
              {/* عرض رسائل البوت والمستخدم */}
              {(event.type === "bot" || event.type === "user") && (
                <div className={`flex ${event.type === "user" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-right ${
                      event.type === "bot"
                        ? "bg-[var(--color-primary)] text-white rounded-br-none"
                        : "bg-gray-100 text-[var(--color-text-main)] rounded-bl-none"
                    }`}
                    // استخدام dangerouslySetInnerHTML للسماح بعرض الـ Markdown (مثل **bold**)
                    dangerouslySetInnerHTML={{ __html: event.text!.replace(/\n/g, '<br />') }}
                  />
                </div>
              )}

              {/* عرض أزرار الاقتراحات */}
              {event.type === "buttons" && (
                <div className="flex flex-col sm:flex-row gap-2 justify-end pt-2">
                  {event.options?.map((option, i) => (
                    <button key={i} className="bg-white border border-gray-300 text-sm text-[var(--color-primary)] px-4 py-2 rounded-full transition-colors hover:bg-gray-50">
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* عرض رابط الدفع الوهمي */}
              {event.type === "payment-link" && (
                <div className="flex justify-end pt-2">
                  <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-md">
                    <Check size={20} />
                    {event.text}
                  </button>
                </div>
              )}
            </div>
          ))}
          {/* عنصر وهمي لتحديد نهاية المحادثة للتمرير التلقائي */}
          <div ref={chatEndRef} />
        </div>

        {/* زر CTA النهائي الذي يظهر بعد انتهاء المحاكاة */}
        {isCtaVisible && (
          <button
            onClick={() => setStage("scenarioSelection")}
            className="w-full bg-[var(--color-accent)] hover:bg-opacity-90 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] animate-fade-in"
          >
            {ctaButton}
          </button>
        )}
      </div>
    </div>
  )
}
