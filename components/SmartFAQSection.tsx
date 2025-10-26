"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { config } from "@/src/config/landingPageConfig"

export function SmartFAQSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      className="py-6 px-6 bg-[var(--color-background)] border-t-2 border-[var(--color-primary)]"
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="max-w-4xl mx-auto">
        {/* الشريط الافتراضي */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={() => setIsExpanded(true)}
          className="w-full flex items-center justify-between py-4 px-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:animate-pulse-dot"
        >
          <span className="text-lg font-bold text-[var(--color-text-main)]">{config.faq.triggerText}</span>
          <ChevronDown
            className={`w-6 h-6 text-[var(--color-primary)] transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* الأكورديون */}
        {isExpanded && (
          <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
            {config.faq.questions.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* السؤال */}
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between py-4 px-6 text-right hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-[var(--color-text-main)]">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--color-primary)] transition-transform duration-300 flex-shrink-0 mr-2 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* الإجابة */}
                {openIndex === index && (
                  <div className="px-6 pb-4 text-[var(--color-text-light)] leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
