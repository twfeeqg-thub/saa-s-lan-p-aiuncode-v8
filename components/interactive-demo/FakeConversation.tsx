"use client"

import { config } from "@/src/config/landingPageConfig"

// 1. تعريف أنواع Props: المكون سيستقبل دالة setStage من الأب
type FakeConversationProps = {
  setStage: (stage: "scenarioSelection") => void
}

// 2. تعديل اسم المكون واستقبال الـ props
export function FakeConversation({ setStage }: FakeConversationProps) {
  // 3. قراءة البيانات من ملف الإعدادات المركزي بدلاً من البيانات الثابتة
  const messages = config.interactiveDemo.stageZero.fakeConversation
  const ctaText = config.interactiveDemo.stageZero.ctaButton
  const title = config.interactiveDemo.stageZero.title

  return (
    // 4. إضافة حاوية خارجية وعنوان للقسم
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-[var(--color-text-main)] mb-8">{title}</h2>
      
      {/* هذا هو الكود الذي تم توليده من v0 مع التعديلات */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 space-y-4 border">
        {/* Chat Messages */}
        <div className="space-y-4 h-[450px] overflow-y-auto p-2">
          {messages.map((message, index) => (
            // 5. تصحيح اتجاه الرسائل (RTL)
            <div key={index} className={`flex ${message.type === "user" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.type === "bot"
                    // 6. استخدام متغيرات الألوان الخاصة بنا
                    ? "bg-[var(--color-primary)] text-white rounded-br-none"
                    : "bg-gray-100 text-[var(--color-text-main)] rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-relaxed text-right">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {/* 7. ربط الزر بدالة setStage وتطبيق ألواننا */}
        <button
          onClick={() => setStage("scenarioSelection")}
          className="w-full bg-[var(--color-accent)] hover:bg-opacity-90 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          {ctaText}
        </button>
      </div>
    </div>
  )
}

