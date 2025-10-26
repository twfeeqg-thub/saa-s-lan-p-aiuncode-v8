import { VisualPlaceholder } from "./VisualPlaceholder"
import { config } from "@/src/config/landingPageConfig"

export function PainPointsSection() {
  return (
    <section className="py-20 px-6 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto">
        {/* العنوان */}
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] text-center mb-12 text-balance">
          {config.painPoints.title}
        </h2>

        {/* شبكة البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.painPoints.points.map((point, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* أيقونة */}
              <div className="mb-4">
                <VisualPlaceholder text="أيقونة" shape="square" className="w-16 h-16 mx-auto" />
              </div>

              {/* نص الألم */}
              <p className="text-lg font-bold text-[var(--color-text-main)] text-center mb-2">{point.text}</p>

              {/* تلميح الحل */}
              <p className="text-sm text-[var(--color-secondary)] text-center leading-relaxed">{point.solutionHint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
