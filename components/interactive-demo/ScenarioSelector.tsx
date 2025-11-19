"use client"

import { useState } from "react"
import { config } from "@/src/config/landingPageConfig"

// 1. تعريف أنواع Props: إضافة خاصية اختيارية جديدة
type ScenarioSelectorProps = {
  setStage: (stage: "customization") => void;
  updateUserSelection: (key: string, value: string) => void;
  initialSelection?: string; // خاصية اختيارية لتمرير الاختيار الحالي
}

// 2. تعديل اسم المكون واستقبال الـ props
export function ScenarioSelector({ setStage, updateUserSelection, initialSelection }: ScenarioSelectorProps) {
  // 3. قراءة البيانات من ملف الإعدادات المركزي
  const title = config.interactiveDemo.stageOne.title
  const scenarios = config.interactiveDemo.stageOne.scenarios.filter(s => s.enabled)

  // 4. تحديث الحالة لتقبل القيمة المبدئية
  const [selectedId, setSelectedId] = useState<string | null>(initialSelection || null)

  // 5. دالة للتعامل مع الاختيار
  const handleSelection = (scenarioId: string) => {
    setSelectedId(scenarioId)
    updateUserSelection("scenario", scenarioId)
    // الانتقال للمرحلة التالية فقط إذا لم نكن بالفعل في مرحلة التخصيص
    if (!initialSelection) {
      setTimeout(() => {
        setStage("customization")
      }, 400)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text-main)]">{title}</h2>

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
                  ? "bg-[var(--color-primary)] text-white shadow-md scale-105"
                  // 6. تعديل مهم: جعل الأزرار غير المختارة باهتة إذا كنا في مرحلة التخصيص
                  : initialSelection 
                    ? "bg-gray-100 text-gray-400 cursor-default" 
                    : "bg-gray-200 text-[var(--color-text-main)] hover:bg-gray-300"
              }
            `}
            // 7. تعطيل الأزرار الأخرى إذا كنا في مرحلة التخصيص
            disabled={!!initialSelection && selectedId !== scenario.id}
          >
            {scenario.name}
          </button>
        ))}
      </div>
    </div>
  )
}
