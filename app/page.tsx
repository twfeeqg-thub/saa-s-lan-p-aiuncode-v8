// app/page.tsx

import { config } from "@/src/config/landingPageConfig"
import { HeroSection } from "@/components/HeroSection"
import { PainPointsSection } from "@/components/PainPointsSection"
import { SolutionSection } from "@/components/SolutionSection"
import { FinalCtaSection } from "@/components/FinalCtaSection"
import { SmartFAQSection } from "@/components/SmartFAQSection"
import { Footer } from "@/components/Footer"
import { SmartAgentScenarios } from "@/components/SmartAgentScenarios" 

// --- بداية التعديل ---
// 1. نستورد السفيرين كلهم
import { SmartAmbassador } from "@/components/SmartAmbassador"
import { SmartAmbassadorGuided } from "@/components/SmartAmbassadorGuided"
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

      {/* Smart Agent Scenarios */}
      {config.sections.smartAgentScenarios && <SmartAgentScenarios />}

      {/* Final CTA Section */}
      {config.sections.finalCta && <FinalCtaSection />}

      {/* Smart FAQ Section */}
      {config.sections.faq && <SmartFAQSection />}

      {/* Footer */}
      {config.sections.footer && <Footer />}

      {/* --- بداية التعديل --- */}
      {/* 2. نحط المنطق الذكي اللي يختار السفير الصح */}
      {config.smartAmbassador.enabled && (
        <>
          {config.smartAmbassador.activeAmbassador === 'guided' && <SmartAmbassadorGuided />}
          {config.smartAmbassador.activeAmbassador === 'n8n' && <SmartAmbassador />}
        </>
      )}
      {/* --- نهاية التعديل --- */}
    </main>
  )
}
