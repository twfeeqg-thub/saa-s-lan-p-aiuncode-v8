import { config } from "@/src/config/landingPageConfig"
import { HeroSection } from "@/components/HeroSection"
import { PainPointsSection } from "@/components/PainPointsSection"
import { SolutionSection } from "@/components/SolutionSection"
import { FinalCtaSection } from "@/components/FinalCtaSection"
import { SmartFAQSection } from "@/components/SmartFAQSection"
import { Footer } from "@/components/Footer"
import { SmartAmbassador } from "@/components/SmartAmbassador"
// --- بداية التعديل ---
// 1. تم استيراد المكون الجديد
import { SmartAgentScenarios } from "@/components/SmartAgentScenarios" 
// 2. تم حذف استيراد المكون القديم `InteractiveDemoSection`
// --- نهاية التعديل ---

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      {config.sections.hero && <HeroSection />}

      {/* Pain Points Section */}
      {config.sections.painPoints && <PainPointsSection />}

      {/* Solution Section */}
      {config.sections.solution && <SolutionSection />}

      {/* --- بداية التعديل --- */}
      {/* 3. تم استبدال المكون القديم بالجديد مع استخدام المؤشر الصحيح من ملف الإعدادات */}
      {config.sections.smartAgentScenarios && <SmartAgentScenarios />}
      {/* --- نهاية التعديل --- */}

      {/* قسم الدعوة النهائية (كان اسمه القسم القديم في تعليقك) */}
      {config.sections.finalCta && <FinalCtaSection />}

      {/* Smart FAQ Section */}
      {config.sections.faq && <SmartFAQSection />}

      {/* Footer */}
      {config.sections.footer && <Footer />}

      {/* Smart Ambassador */}
      {config.sections.smartAmbassador && <SmartAmbassador />}

      {/* --- بداية التعديل --- */}
      {/* 4. تم حذف العنصر المؤقت الذي كان يمنع قفز الصفحة، لم نعد بحاجة إليه */}
      {/* --- نهاية التعديل --- */}
    </main>
  )
}
