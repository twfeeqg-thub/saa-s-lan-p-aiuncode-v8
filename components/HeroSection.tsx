"use client"

// 1. حذف `useState` الذي لم نعد بحاجة إليه
import { VisualPlaceholder } from "./VisualPlaceholder"
import { config } from "@/src/config/landingPageConfig"
import Image from "next/image"
// 2. استيراد `Link` من `next/link`
import Link from "next/link"

export function HeroSection() {
  // 3. حذف جميع الحالات (states) المتعلقة بالنافذة المنبثقة
  // const [showPopup, setShowPopup] = useState(false)
  // const [formData, setFormData] = useState({ name: "", whatsapp: "" })
  // ...الخ

  const activeTitle = config.hero.title[config.hero.title.active]

  return (
    <section className="relative bg-gray-50">
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
      <div className="flex items-center justify-center px-6 py-32 sm:py-36 md:py-40 lg:py-48">
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
            
            {/* --- بداية التعديل الرئيسي --- */}
            {/* 4. لف الزر بمكون Link وتوجيهه إلى /order */}
            <Link href="/order" passHref>
              <button
                className="px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-main)] rounded-xl font-bold text-lg transition-transform duration-300 shadow-lg animate-pulse-shadow hover:scale-105"
              >
                {config.hero.ctaButton.text}
              </button>
            </Link>
            {/* --- نهاية التعديل الرئيسي --- */}

          </div>
        </div>
      </div>

      {/* 5. حذف كود النافذة المنبثقة بالكامل */}
      {/* {showPopup && ( ... )} */}
    </section>
  )
}
