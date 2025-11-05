"use client"

import { useState } from "react"
import { config } from "@/src/config/landingPageConfig"

// 1. تعريف أنواع Props
type CustomizationFormProps = {
  setStage: (stage: "building" | "scenarioSelection") => void;
  updateUserSelection: (key: string, value: string) => void;
}

// 2. تعديل اسم المكون واستقبال الـ props
export function CustomizationForm({ setStage, updateUserSelection }: CustomizationFormProps) {
  // 3. قراءة البيانات من ملف الإعدادات المركزي
  const formConfig = config.interactiveDemo.stageTwo.form
  const agentRoles = formConfig.agentRoles.filter(role => role.enabled)
  const colors = [ // سنبقي الألوان هنا مؤقتًا لسهولة الوصول
    { id: "blue", value: "#3B82F6" },
    { id: "green", value: "#10B981" },
    { id: "yellow", value: "#F59E0B" },
    { id: "purple", value: "#8B5CF6" },
    { id: "red", value: "#EF4444" },
  ]

  // 4. إدارة حالة النموذج
  const [businessName, setBusinessName] = useState("")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0].id) // لون افتراضي

  // 5. ربط دوال التنقل بالأزرار
  const handleNext = () => {
    // تحديث الاختيارات النهائية قبل الانتقال
    updateUserSelection("businessName", businessName)
    updateUserSelection("agentRole", selectedRole || "")
    updateUserSelection("color", selectedColor || "blue")
    setStage("building")
  }

  const handleBack = () => {
    setStage("scenarioSelection")
  }

  return (
    // 6. إزالة الحاوية الخارجية التي تملأ الشاشة
    <div className="w-full max-w-2xl mx-auto">
      <div className="p-6 md:p-8 shadow-xl border bg-white rounded-2xl">
        <div className="space-y-6">
          {/* Business Name Field */}
          <div className="space-y-2">
            <label htmlFor="business-name" className="text-md font-semibold text-[var(--color-text-main)]">
              {formConfig.businessNameLabel}
            </label>
            <input
              id="business-name"
              type="text"
              placeholder="مثلاً: تمورنا الذهبية"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full text-md h-12 border-gray-300 border rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors"
            />
          </div>

          {/* Agent Role Selection */}
          <div className="space-y-2">
            <label className="text-md font-semibold text-[var(--color-text-main)]">{formConfig.agentRoleLabel}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {agentRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-lg border-2 text-right transition-all duration-200 font-medium ${
                    selectedRole === role.id
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[var(--color-primary)]"
                  }`}
                >
                  {role.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <label className="text-md font-semibold text-[var(--color-text-main)]">{formConfig.colorLabel}</label>
            <div className="flex gap-4">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`w-10 h-10 rounded-full transition-all duration-200 ${
                    selectedColor === color.id ? "ring-4 ring-offset-2 ring-[var(--color-primary)]" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.id} color`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
            <button
              onClick={handleBack}
              className="w-full sm:w-auto px-6 py-3 text-md font-semibold border-2 border-gray-300 rounded-lg hover:bg-gray-100 bg-transparent transition-colors"
            >
              {formConfig.backButton}
            </button>
            <button
              onClick={handleNext}
              className="w-full sm:flex-1 px-6 py-3 text-md font-bold bg-[var(--color-primary)] hover:opacity-90 text-white rounded-lg shadow-md transition-opacity"
            >
              {formConfig.nextButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
