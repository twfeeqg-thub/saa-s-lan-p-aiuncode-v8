
"use client"

// تم تعطيل كل حالات useState مؤقتًا للاختبار
// import { useState } from "react"
// import { config } from "@/src/config/landingPageConfig"

// تم تعطيل استيراد كل المكونات الأخرى مؤقتًا
// import { FakeConversation } from "./FakeConversation"
// import { ScenarioSelector } from "./ScenarioSelector"
// import { CustomizationForm } from "./CustomizationForm"
// import { BuildingScreen } from "./BuildingScreen"

// 1. الإبقاء فقط على استيراد المكون الذي نريد اختباره
import { DemoChatWindow } from "./DemoChatWindow"

// تم تعطيل كل شيء آخر مؤقتًا
// type DemoStage = "fakeConversation" | "scenarioSelection" | "customization" | "building" | "finalChat"

export function InteractiveDemoSection() {
  // تم تعطيل كل منطق إدارة الحالة والتنقل
  // const [currentStage, setCurrentStage] = useState<DemoStage>("fakeConversation")
  // const [userSelections, setUserSelections] = useState({ ... })
  // const setStage = (stage: DemoStage) => { ... }
  // const updateUserSelection = (key: string, value: string) => { ... }
  // const renderCurrentStage = () => { ... }

  // 2. إجبار المكون على عرض DemoChatWindow مباشرة مع بيانات وهمية ثابتة
  return (
    <section 
      id="interactive-demo"
      className="py-12 md:py-20 bg-gray-50 min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-red-500 font-bold mb-4">--- وضع الاختبار التشخيصي مفعل ---</p>
        <DemoChatWindow 
          userSelections={{
            businessName: "متجر الاختبار التشخيصي",
            agentRole: "store-manager",
            color: "purple",
            additionalInfo: "هذه بيانات وهمية للاختبار"
          }} 
        />
      </div>
    </section>
  )
}
