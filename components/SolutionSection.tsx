import { config } from "@/src/config/landingPageConfig"
import { VisualPlaceholder } from "./VisualPlaceholder"

export function SolutionSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* العنوان */}
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] text-center mb-16 text-balance">
          {config.solution.title}
        </h2>

        {/* مخطط الخطوات - تم إعادة تصميمه */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {config.solution.steps.map((step, index) => (
            <div key={index} className="bg-[var(--color-background)] rounded-xl p-8 text-center hover:scale-105 hover:shadow-xl transition-all duration-300">
              {/* 1. الأيقونة الجديدة من ملف الإعدادات */}
              <div className="text-6xl mb-4">{step.icon}</div>
              
              {/* 2. رقم الخطوة داخل دائرة */}
              <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {index + 1}
              </div>

              {/* نص الخطوة */}
              <h3 className="text-xl font-bold text-[var(--color-text-main)]">{step.text}</h3>
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
              <div className="mb-4">
                <VisualPlaceholder text="صورة العميل" shape="circle" className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-[var(--color-text-main)] text-center mb-4 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
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
