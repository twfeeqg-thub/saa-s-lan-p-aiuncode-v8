"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Image from "next/image"

// 1. تعريف أنواع Props (تبقى كما هي)
interface DemoChatWindowProps {
  userSelections: {
    businessName: string;
    agentRole: string;
    color: string;
  }
}

// 2. بناء المكون من جديد مع التركيز على البساطة
export function DemoChatWindow({ userSelections }: DemoChatWindowProps) {
  // 3. حالة واحدة فقط للتحكم بالفتح والإغلاق
  const [isOpen, setIsOpen] = useState(false)

  // 4. دالة بسيطة لتحديد اللون (لتجنب أي أخطاء محتملة)
  const getAccentColor = () => {
    const colorMap: { [key: string]: string } = {
      blue: "#3B82F6",
      green: "#10B981",
      yellow: "#F59E0B",
      purple: "#8B5CF6",
      red: "#EF4444",
    }
    return colorMap[userSelections.color] || "#3B82F6" // لون أزرق افتراضي
  }
  const accentColor = getAccentColor()

  // 5. رسالة ترحيب بسيطة ومباشرة
  const welcomeMessage = `مرحباً بك في ${userSelections.businessName || "متجرك المخصص"}!`

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  // 6. عرض الواجهة (Return statement) مبسط جدًا
  return (
    <>
      {/* الزر العائم (بدون أي منطق معقد) */}
      <div
        onClick={toggleChat}
        className="group fixed bottom-6 left-6 z-50 flex cursor-pointer items-center gap-3"
        aria-label="افتح المحادثة التجريبية"
      >
        <div className="rounded-full bg-white px-4 py-2 text-black shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="font-bold">جرب وكيلك المخصص!</span>
        </div>
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="relative inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: accentColor }}></span>
            <span className="relative inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: accentColor }}></span>
          </span>
          <Image src="/images/logo.png" alt="وكيلك الذكي المخصص" width={48} height={48} className="w-12 h-12" />
        </div>
      </div>

      {/* نافذة المحادثة (بأبسط شكل ممكن) */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={toggleChat} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col">
            {/* الشريط العلوي المخصص */}
            <div className="flex items-center justify-between p-4 border-b text-white rounded-t-2xl" style={{ backgroundColor: accentColor }}>
              <h3 className="font-bold text-lg">{userSelections.businessName || "محادثة تجريبية"}</h3>
              <button onClick={toggleChat} className="p-2 hover:bg-white/20 rounded-lg" aria-label="إغلاق"><X size={20} /></button>
            </div>
            
            {/* جسم المحادثة (يحتوي فقط على الرسالة الترحيبية) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-end">
                <div className="max-w-[80%] p-3 rounded-2xl text-white rounded-br-sm" style={{ backgroundColor: accentColor }}>
                  <p className="text-sm leading-relaxed">{welcomeMessage}</p>
                </div>
              </div>
            </div>

            {/* حقل الإدخال (معطل مؤقتًا) */}
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-200"
                  disabled={true}
                />
                <button
                  className="px-6 py-3 text-white rounded-xl opacity-50"
                  style={{ backgroundColor: accentColor }}
                  disabled={true}
                >
                  إرسال
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
