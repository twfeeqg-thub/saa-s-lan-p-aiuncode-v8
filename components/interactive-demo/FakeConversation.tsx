"use client"

import { useState, useEffect, useRef } from "react"
import { config } from "@/src/config/landingPageConfig"
import { Check } from "lucide-react"

// تعريف أنواع Props
type FakeConversationProps = {
  setStage: (stage: "scenarioSelection") => void
}

// تعريف أنواع الأحداث في السيناريو
type ScriptEvent = {
  type: "bot" | "user" | "buttons" | "payment-link";
  text?: string;
  options?: string[];
}

export function FakeConversation({ setStage }: FakeConversationProps) {
  // قراءة البيانات من ملف الإعدادات
  const { title, script, ctaButton } = config.interactiveDemo.stageZero

  // --- بداية الحل الجديد والمبسط ---

  // 1. حالة واحدة فقط لتتبع ما إذا كانت المحاكاة قد بدأت
  const [hasStarted, setHasStarted] = useState(false)
  // 2. مرجع (ref) للعنصر الذي نريد مراقبته
  const containerRef = useRef<HTMLDivElement>(null)

  // --- نهاية الحل الجديد ---

  // إدارة حالة المحاكاة
  const [displayedEvents, setDisplayedEvents] = useState<ScriptEvent[]>([])
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isCtaVisible, setIsCtaVisible] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // 3. التأثير (useEffect) الخاص بـ Intersection Observer (تم تبسيطه)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // عندما يتقاطع العنصر مع منطقة العرض ولم تكن المحاكاة قد بدأت بعد
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true) // ابدأ المحاكاة
          observer.disconnect() // أوقف المراقبة لأننا نحتاجها مرة واحدة فقط
        }
      },
      { threshold: 0.5 } // ابدأ عندما يكون 50% من العنصر مرئيًا
    )

    const currentRef = containerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  // مصفوفة الاعتماديات تحتوي على hasStarted لضمان عدم إعادة إنشاء المراقب دون داعٍ
  }, [hasStarted])

  // 4. التأثير الرئيسي لتشغيل المحاكاة (تم تبسيطه)
  useEffect(() => {
    // الشرط الجديد: لا تبدأ إلا إذا كانت hasStarted تساوي true
    if (!hasStarted) {
      return
    }

    // باقي منطق المؤقت يبقى كما هو
    if (currentEventIndex >= script.length) {
      setTimeout(() => setIsCtaVisible(true), 1000)
      return
    }

    const currentEvent = script[currentEventIndex]
    let delay = 1500
    if (currentEvent.type === "user") delay = 800
    if (currentEvent.type === "buttons" || currentEvent.type === "payment-link") delay = 500

    const timer = setTimeout(() => {
      setDisplayedEvents(prev => [...prev, currentEvent])
      setCurrentEventIndex(prev => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  // تم تبسيط مصفوفة الاعتماديات
  }, [currentEventIndex, script, hasStarted])

  // تأثير التمرير التلقائي (يبقى كما هو)
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [displayedEvents])

  return (
    // 5. ربط المرجع (ref) بالحاوية الرئيسية للمكون
    <div ref={containerRef} className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] mb-8 animate-fade-in">
        {title}
      </h2>
      
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 space-y-4 border">
        <div className="space-y-4 h-[500px] overflow-y-auto p-2">
          {/* عرض رسالة أولية باهتة قبل بدء المحاكاة */}
          {!hasStarted && (
             <div className="flex justify-end animate-fade-in">
                <div className="max-w-[85%] px-4 py-3 rounded-2xl text-right bg-gray-100 text-gray-400">
                  ...
                </div>
              </div>
          )}

          {displayedEvents.map((event, index) => (
            <div key={index} className="animate-fade-in-up">
              {(event.type === "bot" || event.type === "user") && (
                <div className={`flex ${event.type === "user" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-right ${
                      event.type === "bot"
                        ? "bg-[var(--color-primary)] text-white rounded-br-none"
                        : "bg-gray-100 text-[var(--color-text-main)] rounded-bl-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: event.text!.replace(/\n/g, '<br />') }}
                  />
                </div>
              )}
              {event.type === "buttons" && (
                <div className="flex flex-col sm:flex-row gap-2 justify-end pt-2">
                  {event.options?.map((option, i) => (
                    <button key={i} className="bg-white border border-gray-300 text-sm text-[var(--color-primary)] px-4 py-2 rounded-full transition-colors hover:bg-gray-50">
                      {option}
                    </button>
                  ))}
                </div>
              )}
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
          <div ref={chatEndRef} />
        </div>

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
