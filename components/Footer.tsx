"use client"

import { useState } from "react"
import { config } from "@/src/config/landingPageConfig"
import { Mail, Send, Download, X } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const [showAppPopup, setShowAppPopup] = useState(false)

  return (
    <footer className="py-12 px-6 bg-[var(--color-text-main)] text-white">
      <div className="max-w-7xl mx-auto">
        {/* الهيكل الشبكي الرئيسي للفوتر */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
          
          {/* القسم الأول: الشعار والمعلومات الأساسية */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <div className="bg-white rounded-full p-2 inline-block">
              <Image src="/images/logo.png" alt="AI-Uncode Logo" width={80} height={80} className="w-20 h-20" />
            </div>
            <p className="font-bold text-lg">{config.header.logo.tagline}</p>
            <p className="text-white/80 max-w-xs text-center md:text-right">{config.footer.tagline}</p>
          </div>

          {/* القسم الثاني: وسائل التواصل */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold">{config.footer.contact.title}</h3>
            <a href={`mailto:${config.footer.contact.email}`} className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors duration-200">
              <Mail size={20} />
              <span>{config.footer.contact.email}</span>
            </a>
            <a href={config.footer.contact.telegram.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors duration-200">
              <Send size={20} />
              <span>{config.footer.contact.telegram.username}</span>
            </a>
            <div className="pt-4">
              <Image src="/images/qr-telegram.png" alt="Telegram QR Code" width={100} height={100} className="w-24 h-24" />
            </div>
          </div>

          {/* القسم الثالث: تحميل التطبيق */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold">حمل التطبيق</h3>
            <p className="text-white/80">لإدارة وكيلك الذكي من أي مكان.</p>
            <button 
              onClick={() => setShowAppPopup(true)}
              className="mt-2 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-text-main)] rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Download size={20} />
              <span>قريباً</span>
            </button>
          </div>
        </div>

        {/* الخط الفاصل والحقوق */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70">{config.footer.copyrightText}</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {config.footer.legalLinks.map((link, index) => (
                <a key={index} href={link.link} className="text-sm hover:text-[var(--color-accent)] transition-colors duration-200">
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* نافذة "التطبيق قيد الإنشاء" */}
      {showAppPopup && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setShowAppPopup(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-sm bg-white rounded-2xl shadow-2xl p-8 text-center text-[var(--color-text-main)]">
            <button onClick={() => setShowAppPopup(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-800">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-4">التطبيق قيد الإنشاء!</h3>
            <p>نعمل بجد لإطلاق تطبيقنا قريبًا. ترقبوا التحديثات!</p>
          </div>
        </>
      )}
    </footer>
  )
}
