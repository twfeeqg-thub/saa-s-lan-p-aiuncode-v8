"use client"

import { useState } from "react"
import { config } from "@/src/config/landingPageConfig"

// 1. استيراد المكونات الفرعية - تم تفعيل المكون الثاني
import { FakeConversation } from "./FakeConversation"
import { ScenarioSelector } from "./ScenarioSelector"
// import { CustomizationForm } from "./CustomizationForm"
// import { BuildingScreen } from "./BuildingScreen"
// import { DemoChatWindow } from "./DemoChatWindow"

// تعريف أنواع المراحل لضمان عدم الوقوع في أخطاء إملائية
type DemoStage = "fakeConversation" | "scenarioSelection" | "customization" | "building" | "finalChat"

export function InteractiveDemoSection() {
  // 2. إدارة الحالة الرئيسية: هذه الحالة هي "الدماغ" الذي يقرر أي جزء نعرضه
  const [currentStage, setCurrentStage] = useState<DemoStage>("fakeConversation")

  // 3. إدارة بيانات المستخدم: حالة لتخزين اختيارات المستخدم أثناء رحلته
  const [userSelections, setUserSelections] = useState({
    scenario: "",
    businessName: "",
    agentRole: "",
    color: "",
  })

  // دالة لتغيير المرحلة (سنستخدمها لاحقًا في المكونات الفرعية)
  const setStage = (stage: DemoStage) => {
    setCurrentStage(stage)
  }

  // --- بداية الإضافة الجديدة ---
  // دالة لتحديث اختيارات المستخدم من المكونات الفرعية
  const updateUserSelection = (key: string, value: string) => {
    setUserSelections(prev => ({ ...prev, [key]: value }))
  }
  // --- نهاية الإضافة الجديدة ---

  // 4. العرض الشرطي: بناءً على قيمة currentStage، نعرض المكون المناسب
  const renderCurrentStage = () => {
    switch (currentStage) {
      case "fakeConversation":
        return <FakeConversation setStage={setStage} />
      
      case "scenarioSelection":
        // --- بداية التعديل ---
        // تم استبدال العنصر النائب بالمكون الحقيقي
        return <ScenarioSelector setStage={setStage} updateUserSelection={updateUserSelection} />
        // --- نهاية التعديل ---

      case "customization":
        // return <CustomizationForm setStage={setStage} setUserSelections={setUserSelections} />
        return <div>مكون نموذج التخصيص (قيد الإنشاء)</div> // عنصر نائب مؤقت
      case "building":
        // return <BuildingScreen setStage={setStage} />
        return <div>مكون شاشة البناء (قيد الإنشاء)</div> // عنصر نائب مؤقت
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
        {/* هنا سيتم عرض المكون المناسب للمرحلة الحالية */}
        {renderCurrentStage()}
      </div>
    </section>
  )
}
