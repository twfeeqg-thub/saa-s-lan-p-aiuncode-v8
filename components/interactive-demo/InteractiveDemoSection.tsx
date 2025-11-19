"use client"

import { useState } from "react"
import { config } from "@/src/config/landingPageConfig"

// --- بداية التعديل ---
// 1. استيراد كل المكونات، بما في ذلك المكون النهائي
import { FakeConversation } from "./FakeConversation"
import { ScenarioSelector } from "./ScenarioSelector"
import { CustomizationForm } from "./CustomizationForm"
import { BuildingScreen } from "./BuildingScreen"
import { DemoChatWindow } from "./DemoChatWindow" // <-- تم تفعيل الاستيراد الأخير
// --- نهاية التعديل ---

// تعريف أنواع المراحل لضمان عدم الوقوع في أخطاء إملائية
type DemoStage = "fakeConversation" | "scenarioSelection" | "customization" | "building" | "finalChat"

export function InteractiveDemoSection() {
  // إدارة الحالة الرئيسية
  const [currentStage, setCurrentStage] = useState<DemoStage>("fakeConversation")

  // إدارة بيانات المستخدم
  const [userSelections, setUserSelections] = useState({
    scenario: "",
    businessName: "",
    agentRole: "",
    color: "blue",
    additionalInfo: "", // تمت إضافة هذا الحقل
  })

  // دالة لتغيير المرحلة
  const setStage = (stage: DemoStage) => {
    setCurrentStage(stage)
  }

  // دالة لتحديث اختيارات المستخدم
  const updateUserSelection = (key: string, value: string) => {
    setUserSelections(prev => ({ ...prev, [key]: value }))
  }

  // العرض الشرطي
  const renderCurrentStage = () => {
    switch (currentStage) {
      case "fakeConversation":
        return <FakeConversation setStage={setStage} />
      
      case "scenarioSelection":
        return <ScenarioSelector setStage={setStage} updateUserSelection={updateUserSelection} />

      case "customization":
        return (
          <div className="space-y-10">
            <ScenarioSelector 
              setStage={setStage} 
              updateUserSelection={updateUserSelection} 
              initialSelection={userSelections.scenario} 
            />
            <CustomizationForm 
              setStage={setStage} 
              updateUserSelection={updateUserSelection} 
            />
          </div>
        )

      case "building":
        return <BuildingScreen setStage={setStage} />
        
      // --- بداية التعديل ---
      // 2. استبدال العنصر النائب بالمكون الحقيقي والنهائي
      case "finalChat":
        return <DemoChatWindow userSelections={userSelections} />
      // --- نهاية التعديل ---
        
      default:
        return <div>مرحلة غير معروفة</div>
    }
  }

  return (
    <section 
      id="interactive-demo" // إضافة ID للقسم لتسهيل الوصول إليه
      className="py-12 md:py-20 bg-gray-50 min-h-screen flex items-center" // تعديل التصميم ليأخذ مساحة أكبر
    >
      <div className="container mx-auto px-4">
        {renderCurrentStage()}
      </div>
    </section>
  )
}
