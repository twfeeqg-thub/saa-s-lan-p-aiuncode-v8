import { config } from "@/src/config/landingPageConfig"
import { HeroSection } from "@/components/HeroSection"
import { PainPointsSection } from "@/components/PainPointsSection"
import { SolutionSection } from "@/components/SolutionSection"
import { FinalCtaSection } from "@/components/FinalCtaSection"
import { SmartFAQSection } from "@/components/SmartFAQSection"
import { Footer } from "@/components/Footer"
import { SmartAmbassador } from "@/components/SmartAmbassador"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      {config.sections.hero && <HeroSection />}

      {/* Pain Points Section */}
      {config.sections.painPoints && <PainPointsSection />}

      {/* Solution Section */}
      {config.sections.solution && <SolutionSection />}

      {/* Final CTA Section */}
      {config.sections.finalCta && <FinalCtaSection />}

      {/* Smart FAQ Section */}
      {config.sections.faq && <SmartFAQSection />}

      {/* Footer */}
      {config.sections.footer && <Footer />}

      {/* Smart Ambassador */}
      {config.sections.smartAmbassador && <SmartAmbassador />}
    </main>
  )
}
