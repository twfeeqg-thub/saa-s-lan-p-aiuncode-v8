"use client"

import { useState } from "react"
import { VisualPlaceholder } from "./VisualPlaceholder"
import { config } from "@/src/config/landingPageConfig"
import { Loader2, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [showPopup, setShowPopup] = useState(false)
  const [formData, setFormData] = useState({ name: "", whatsapp: "" })
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      setFormState("error")
      setErrorMessage("الرجاء ملء جميع الحقول")
      return
    }
    setFormState("loading")
    setErrorMessage("")
    setTimeout(() => {
      setFormState("success")
    }, 2000)
  }

  const activeTitle = config.hero.title[config.hero.title.active]

  return (
    // --- بداية التعديل النهائي ---
    // تطبيق مبدأ Mobile-First: ارتفاع كامل على الجوال، ثم تعديله للشاشات الأكبر
    <section className="relative flex flex-col min-h-screen justify-center md:min-h-[550px] lg:min-h-[600px]">
    {/* --- نهاية التعديل النهائي --- */}

      {/* الخلفية */}
      <div className="absolute inset-0 -z-10">
        <VisualPlaceholder text="خلفية GIF متحركة: محادثة AI على جوال" className="w-full h-full rounded-none" />
      </div>

      {/* الشريط العلوي */}
      <header className="absolute top-0 left-0 right-0 w-full px-6 py-2 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="AI-Uncode Logo" width={56} height={56} className="w-14 h-14" />
            <span className="text-sm text-[var(--color-text-light)] font-medium">{config.header.logo.tagline}</span>
          </div>
          <a
            href={config.header.loginButton.link}
            className="px-6 py-2 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 font-medium"
          >
            {config.header.loginButton.text}
          </a>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex items-center justify-center px-6 pt-20 pb-10"> {/* تعديل الـ padding ليتناسب مع جميع الشاشات */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-main)] leading-tight text-balance">
            {activeTitle}
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-light)] leading-relaxed max-w-3xl mx-auto text-pretty">
            {config.hero.subtitle}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="inline-block bg-[var(--color-secondary)] text-white px-6 py-3 rounded-full font-medium animate-pulse-shadow">
              {config.hero.scarcityBanner.text}
            </div>
            <button
              onClick={() => setShowPopup(true)}
              className="px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-main)] rounded-xl font-bold text-lg transition-transform duration-300 shadow-lg animate-pulse-shadow"
            >
              {config.hero.ctaButton.text}
            </button>
          </div>
          
        </div>
      </div>

      {/* Popup لجمع البيانات */}
      {showPopup && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setShowPopup(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in duration-300">
            {formState === "success" ? (
              <div className="text-center space-y-4 py-8">
                <CheckCircle2 className="w-16 h-16 text-[var(--color-secondary)] mx-auto" />
                <h3 className="text-2xl font-bold text-[var(--color-text-main)]">شكرًا لك!</h3>
                <p className="text-[var(--color-text-light)] leading-relaxed">
                  تم استلام طلبك بنجاح وسنتواصل معك قريبًا.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[var(--color-text-main)] mb-6 text-center">ابدأ رحلتك الآن</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2 text-right">
                      الاسم
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-right"
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2 text-right">
                      رقم الواتساب
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-right"
                      placeholder="05xxxxxxxx"
                    />
                  </div>
                  {formState === "error" && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
                  <button
                    onClick={handleSubmit}
                    disabled={formState === "loading"}
                    className="w-full px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)]/90 disabled:opacity-50 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      "إرسال"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </section>
  )
}
