import { config } from "@/src/config/landingPageConfig"
import { HeroSection } from "@/components/HeroSection"
import { PainPointsSection } from "@/components/PainPointsSection"
import { SolutionSection } from "@/components/SolutionSection"
import { FinalCtaSection } from "@/components/FinalCtaSection"
import { SmartFAQSection } from "@/components/SmartFAQSection"
import { Footer } from "@/components/Footer"
import { SmartAmbassador } from "@/components/SmartAmbassador"

// --- بداية التعديل ---
// استيراد المكون الجديد
import { InteractiveDemoSection } from "@/components/interactive-demo/InteractiveDemoSection"
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
      {/* القسم التفاعلي الجديد */}
      {config.sections.interactiveDemo && <InteractiveDemoSection />}

      {/* القسم القديم (سيتم إخفاؤه بناءً على ملف الإعدادات) */}
      {config.sections.finalCta && <FinalCtaSection />}
      {/* --- نهاية التعديل --- */}

      {/* Smart FAQ Section */}
      {config.sections.faq && <SmartFAQSection />}

      {/* Footer */}
      {config.sections.footer && <Footer />}

      {/* Smart Ambassador */}
      {config.sections.smartAmbassador && <SmartAmbassador />}
    </main>
  )
}
