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

  const [hasStarted, setHasStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayedEvents, setDisplayedEvents] = useState<ScriptEvent[]>([])
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isCtaVisible, setIsCtaVisible] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // التأثير (useEffect) الخاص بـ Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
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
  }, [hasStarted])

  // التأثير الرئيسي لتشغيل المحاكاة
  useEffect(() => {
    if (!hasStarted) {
      return
    }

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
  }, [currentEventIndex, script, hasStarted])

  // تأثير التمرير التلقائي
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [displayedEvents])

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] mb-8 animate-fade-in">
        {title}
      </h2>
      
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 space-y-4 border">
        {/* --- بداية التعديل الجذري --- */}
        {/* 
          هذا هو التعديل الأساسي لحل مشكلة القفز (CLS).
          لقد قمنا بإزالة العرض الشرطي للعنصر النائب `...`.
          الآن، هذا الـ `div` سيحتفظ دائمًا بارتفاعه الكامل (`h-[500px]`)
          سواء كانت المحادثة قد بدأت أم لا.
          هذا "يحجز المساحة" ويمنع الصفحة من تغيير تخطيطها فجأة.
        */}
        <div className="space-y-4 h-[500px] overflow-y-auto p-2">
        {/* --- نهاية التعديل الجذري --- */}

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
