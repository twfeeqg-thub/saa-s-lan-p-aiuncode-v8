import { VisualPlaceholder } from "./VisualPlaceholder"
import { config } from "@/src/config/landingPageConfig"

export function FinalCtaSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/80 text-white">
      <div className="max-w-6xl mx-auto">
        {/* العنوان */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">{config.finalCta.title}</h2>

        {/* iframe للعرض التفاعلي */}
        <div className="mb-12">
          <VisualPlaceholder text="iframe للعرض التفاعلي" className="w-full mx-auto max-w-4xl" aspectRatio="16/9" />
        </div>

        {/* خطط الأسعار */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {config.finalCta.pricing.plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white text-[var(--color-text-main)] p-8 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-bold text-center mb-4">{plan.name}</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-[var(--color-primary)]">{plan.price}</span>
                <span className="text-[var(--color-text-light)] mr-2">{plan.currency}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-right">
                    <span className="text-[var(--color-secondary)] text-xl">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ضمان 30 يوم */}
        <p className="text-center text-lg mb-8 font-medium">{config.finalCta.pricing.guaranteeText}</p>

        {/* زر CTA النهائي - تم تعديل الأنيميشن */}
        <div className="text-center">
          <button className="px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-main)] rounded-xl font-bold text-lg transition-transform duration-300 shadow-lg animate-pulse-shadow">
            {config.finalCta.finalCtaButton.text}
          </button>
        </div>
      </div>
    </section>
  )
}
