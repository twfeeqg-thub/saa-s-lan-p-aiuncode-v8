import { config } from "@/src/config/landingPageConfig"
import { HeroSection } from "@/components/HeroSection"
import { PainPointsSection } from "@/components/PainPointsSection"
import { SolutionSection } from "@/components/SolutionSection"
import { FinalCtaSection } from "@/components/FinalCtaSection"
import { SmartFAQSection } from "@/components/SmartFAQSection"
import { Footer } from "@/components/Footer"
import { SmartAmbassador } from "@/components/SmartAmbassador"
import { InteractiveDemoSection } from "@/components/interactive-demo/InteractiveDemoSection"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      {config.sections.hero && <HeroSection />}

      {/* Pain Points Section */}
      {config.sections.painPoints && <PainPointsSection />}

      {/* Solution Section */}
      {config.sections.solution && <SolutionSection />}

      {/* القسم التفاعلي الجديد */}
      {config.sections.interactiveDemo && <InteractiveDemoSection />}

      {/* القسم القديم (سيتم إخفاؤه بناءً على ملف الإعدادات) */}
      {config.sections.finalCta && <FinalCtaSection />}

      {/* Smart FAQ Section */}
      {config.sections.faq && <SmartFAQSection />}

      {/* Footer */}
      {config.sections.footer && <Footer />}

      {/* Smart Ambassador */}
      {config.sections.smartAmbassador && <SmartAmbassador />}

      {/* --- بداية الإضافة الجديدة لحل مشكلة القفز --- */}
      {/* 
        هذا العنصر يعمل كمساحة فارغة في أسفل الصفحة.
        وظيفته هي إعطاء الصفحة ارتفاعًا إضافيًا لمنع المتصفح
        من القفز بشكل غير متوقع عند تحميل المكونات الديناميكية.
        الارتفاع (h-96) يمكن تعديله إذا لزم الأمر، لكنه عادة ما يكون كافيًا.
      */}
      <div className="h-96" />
      {/* --- نهاية الإضافة الجديدة --- */}
    </main>
  )
}
