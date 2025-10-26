import { VisualPlaceholder } from "./VisualPlaceholder"
import { config } from "@/src/config/landingPageConfig"

export function SolutionSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* العنوان */}
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] text-center mb-12 text-balance">
          {config.solution.title}
        </h2>

        {/* مخطط الخطوات */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          {config.solution.steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* أيقونة الخطوة */}
              <VisualPlaceholder text="أيقونة" shape="circle" className="w-20 h-20 mb-4" />

              {/* نص الخطوة */}
              <p className="text-lg font-medium text-[var(--color-text-main)]">{step.text}</p>

              {/* سهم بين الخطوات (إلا الأخيرة) */}
              {index < config.solution.steps.length - 1 && (
                <div className="hidden md:block text-[var(--color-primary)] text-3xl mt-4">←</div>
              )}
            </div>
          ))}
        </div>

        {/* نص Urgency */}
        <p className="text-xl font-bold text-[var(--color-secondary)] text-center mb-12">
          {config.solution.urgencyText}
        </p>

        {/* شهادات العملاء */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {config.solution.testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[var(--color-background)] p-6 rounded-xl shadow-md">
              {/* صورة العميل */}
              <div className="mb-4">
                <VisualPlaceholder text="صورة العميل" shape="circle" className="w-16 h-16 mx-auto" />
              </div>

              {/* الاقتباس */}
              <p className="text-[var(--color-text-main)] text-center mb-4 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* الاسم والشركة */}
              <div className="text-center">
                <p className="font-bold text-[var(--color-text-main)]">{testimonial.author}</p>
                <p className="text-sm text-[var(--color-text-light)]">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
