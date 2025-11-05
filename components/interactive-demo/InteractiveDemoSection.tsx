"use client"

import { useState } from "react"
import { config } from "@/src/config/landingPageConfig"

// --- بداية التعديل ---
// 1. استيراد المكون الجديد
import { FakeConversation } from "./FakeConversation"
import { ScenarioSelector } from "./ScenarioSelector"
import { CustomizationForm } from "./CustomizationForm"
import { BuildingScreen } from "./BuildingScreen"
// import { DemoChatWindow } from "./DemoChatWindow"
// --- نهاية التعديل ---

// تعريف أنواع المراحل لضمان عدم الوقوع في أخطاء إملائية
type DemoStage = "fakeConversation" | "scenarioSelection" | "customization" | "building" | "finalChat"

export function InteractiveDemoSection() {
  // 2. إدارة الحالة الرئيسية
  const [currentStage, setCurrentStage] = useState<DemoStage>("fakeConversation")

  // 3. إدارة بيانات المستخدم
  const [userSelections, setUserSelections] = useState({
    scenario: "",
    businessName: "",
    agentRole: "",
    color: "blue", // لون افتراضي
  })

  // دالة لتغيير المرحلة
  const setStage = (stage: DemoStage) => {
    setCurrentStage(stage)
  }

  // دالة لتحديث اختيارات المستخدم
  const updateUserSelection = (key: string, value: string) => {
    setUserSelections(prev => ({ ...prev, [key]: value }))
  }

  // 4. العرض الشرطي
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

      // --- بداية التعديل ---
      // 2. استبدال العنصر النائب بالمكون الحقيقي
      case "building":
        return <BuildingScreen setStage={setStage} />
      // --- نهاية التعديل ---
        
      case "finalChat":
        // return <DemoChatWindow userSelections={userSelections} />
        return <div>مكون نافذة المحادثة النهائية (قيد الإنشاء)</div> // عنصر نائب مؤقت
      default:
        return <div>مرحلة غير معروفة</div>
    }
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {renderCurrentStage()}
      </div>
    </section>
  )
}
