import { VisualPlaceholder } from "./VisualPlaceholder"
import { config } from "@/src/config/landingPageConfig"
import { Mail, Send } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-[var(--color-text-main)] text-white">
      <div className="max-w-6xl mx-auto">
        {/* الشعار */}
        <div className="flex justify-center mb-6">
          <VisualPlaceholder text="شعار" shape="square" className="w-20 h-20" />
        </div>

        {/* النص التسويقي */}
        <p className="text-center text-lg mb-8 leading-relaxed max-w-2xl mx-auto">{config.footer.tagline}</p>

        {/* قسم اتصل بنا */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-center mb-4">{config.footer.contact.title}</h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* QR Code */}
            <VisualPlaceholder text="QR Code" shape="square" className="w-32 h-32" />

            {/* معلومات الاتصال */}
            <div className="space-y-3 text-center md:text-right">
              {/* البريد الإلكتروني */}
              <a
                href={`mailto:${config.footer.contact.email}`}
                className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                <Mail size={20} />
                <span>{config.footer.contact.email}</span>
              </a>

              {/* تلغرام */}
              <a
                href={config.footer.contact.telegram.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                <Send size={20} />
                <span>{config.footer.contact.telegram.username}</span>
              </a>
            </div>
          </div>
        </div>

        {/* الروابط القانونية */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-6 border-t border-white/20 pt-6">
          {config.footer.legalLinks.map((link, index) => (
            <a key={index} href={link.link} className="hover:text-[var(--color-accent)] transition-colors duration-200">
              {link.text}
            </a>
          ))}
        </div>

        {/* حقوق النشر */}
        <p className="text-center text-sm text-white/70">{config.footer.copyrightText}</p>
      </div>
    </footer>
  )
}
