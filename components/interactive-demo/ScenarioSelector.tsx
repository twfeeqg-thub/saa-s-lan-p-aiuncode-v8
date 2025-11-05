"use client"

import { useState } from "react"
import { config } from "@/src/config/landingPageConfig"

// 1. تعريف أنواع Props: المكون سيستقبل دالتين من الأب
type ScenarioSelectorProps = {
  setStage: (stage: "customization") => void;
  updateUserSelection: (key: string, value: string) => void;
}

// 2. تعديل اسم المكون واستقبال الـ props
export function ScenarioSelector({ setStage, updateUserSelection }: ScenarioSelectorProps) {
  // 3. قراءة البيانات من ملف الإعدادات المركزي
  const title = config.interactiveDemo.stageOne.title
  // فلترة السيناريوهات المفعلة فقط
  const scenarios = config.interactiveDemo.stageOne.scenarios.filter(s => s.enabled)

  const [selectedId, setSelectedId] = useState<string | null>(null)

  // 4. دالة للتعامل مع الاختيار
  const handleSelection = (scenarioId: string) => {
    setSelectedId(scenarioId)
    updateUserSelection("scenario", scenarioId)
    // الانتقال للمرحلة التالية بعد تأخير بسيط لإعطاء المستخدم فرصة لرؤية اختياره
    setTimeout(() => {
      setStage("customization")
    }, 400)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 text-center">
      {/* Main Title */}
      {/* 5. استخدام متغيرات الألوان والنصوص من ملف config */}
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text-main)]">{title}</h2>

      {/* Dynamic Button List */}
      <div className="flex flex-wrap gap-4 justify-center">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => handleSelection(scenario.id)}
            className={`
              px-6 py-3 rounded-lg font-semibold
              transition-all duration-300 ease-in-out
              transform hover:scale-105 hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]
              ${
                selectedId === scenario.id
                  // 6. استخدام متغيرات الألوان الخاصة بنا
                  ? "bg-[var(--color-primary)] text-white shadow-md scale-105"
                  : "bg-gray-200 text-[var(--color-text-main)] hover:bg-gray-300"
              }
            `}
          >
            {scenario.name}
          </button>
        ))}
      </div>
    </div>
  )
}
