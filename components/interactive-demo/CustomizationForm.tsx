"use client"

import { useState } from "react"
import { config } from "@/src/config/landingPageConfig"

// 1. تعريف أنواع Props (تبقى كما هي)
type CustomizationFormProps = {
  setStage: (stage: "building" | "scenarioSelection") => void;
  updateUserSelection: (key: string, value: string) => void;
}

// 2. تعديل اسم المكون واستقبال الـ props
export function CustomizationForm({ setStage, updateUserSelection }: CustomizationFormProps) {
  // 3. قراءة البيانات من ملف الإعدادات المركزي (أصبح الآن المصدر الوحيد للحقيقة)
  const formConfig = config.interactiveDemo.stageTwo.form
  const agentRoles = formConfig.agentRoles.filter(role => role.enabled)
  const colors = formConfig.colors // <-- نقرأ الألوان من config الآن

  // 4. إدارة حالة النموذج
  const [businessName, setBusinessName] = useState("")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0].id) // لون افتراضي
  const [additionalInfo, setAdditionalInfo] = useState("") // <-- إضافة حالة للمعلومات الإضافية

  // 5. ربط دوال التنقل بالأزرار
  const handleNext = () => {
    // تحديث الاختيارات النهائية قبل الانتقال
    updateUserSelection("businessName", businessName)
    updateUserSelection("agentRole", selectedRole || "")
    updateUserSelection("color", selectedColor || "blue")
    updateUserSelection("additionalInfo", additionalInfo) // <-- تحديث المعلومات الإضافية
    setStage("building")
  }

  const handleBack = () => {
    setStage("scenarioSelection")
  }

  return (
    // 6. استخدام العنوان الرئيسي من ملف config
    <div className="w-full max-w-2xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] mb-8 animate-fade-in">
        {config.interactiveDemo.stageTwo.title}
      </h2>

      <div className="p-6 md:p-8 shadow-xl border bg-white rounded-2xl text-right">
        <div className="space-y-8">
          {/* Business Name Field */}
          <div className="space-y-2">
            <label htmlFor="business-name" className="text-lg font-semibold text-[var(--color-text-main)]">
              {formConfig.businessNameLabel}
            </label>
            <input
              id="business-name"
              type="text"
              placeholder={formConfig.businessNamePlaceholder}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full text-lg h-12 border-gray-300 border rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors"
            />
          </div>

          {/* Agent Role Selection */}
          <div className="space-y-3">
            <label className="text-lg font-semibold text-[var(--color-text-main)]">{formConfig.agentRoleLabel}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {agentRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-lg border-2 text-right transition-all duration-200 font-medium flex items-center gap-3 ${
                    selectedRole === role.id
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg scale-105"
                      : "bg-gray-50 text-gray-800 border-gray-200 hover:border-[var(--color-primary)] hover:shadow-md"
                  }`}
                >
                  <span>{role.name.split(" ")[0]}</span> {/* الأيقونة */}
                  <span>{role.name.split(" ").slice(1).join(" ")}</span> {/* النص */}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <label className="text-lg font-semibold text-[var(--color-text-main)]">{formConfig.colorLabel}</label>
            <div className="flex gap-4 pt-2">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`w-12 h-12 rounded-full transition-all duration-200 transform ${
                    selectedColor === color.id ? "ring-4 ring-offset-2 ring-[var(--color-primary)] scale-110" : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.id} color`}
                />
              ))}
            </div>
          </div>

          {/* --- بداية الإضافة الجديدة --- */}
          {/* Additional Info Field */}
          <div className="space-y-2">
            <label htmlFor="additional-info" className="text-lg font-semibold text-[var(--color-text-main)]">
              {formConfig.moreInfoLabel}
            </label>
            <textarea
              id="additional-info"
              placeholder={formConfig.moreInfoPlaceholder}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full text-lg min-h-28 border-gray-300 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors resize-none"
            />
          </div>
          {/* --- نهاية الإضافة الجديدة --- */}

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
            <button
              onClick={handleBack}
              className="w-full sm:w-auto px-8 py-3 text-lg font-semibold border-2 border-gray-300 rounded-lg hover:bg-gray-100 bg-transparent transition-colors"
            >
              {formConfig.backButton}
            </button>
            <button
              onClick={handleNext}
              disabled={!businessName || !selectedRole || !selectedColor} // تعطيل الزر إذا كانت الحقول المطلوبة فارغة
              className="w-full sm:flex-1 px-8 py-3 text-lg font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formConfig.nextButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
