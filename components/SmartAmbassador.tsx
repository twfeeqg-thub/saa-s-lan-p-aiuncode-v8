"use client"

import { useState, useRef, useEffect } from "react"
import { X, Volume2, VolumeX, RotateCcw, Send } from "lucide-react"
import { VisualPlaceholder } from "./VisualPlaceholder"
import { config } from "@/src/config/landingPageConfig"

interface Message {
  type: "user" | "bot"
  text: string
  timestamp: Date
}

export function SmartAmbassador() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", text: config.smartAmbassador.welcomeMessage, timestamp: new Date() },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // تمرير تلقائي لآخر رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // تهيئة Web Audio API
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  // تشغيل صوت النقر
  const playClickSound = () => {
    if (isMuted || !audioContextRef.current) return

    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = 800
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.1)
  }

  // تشغيل صوت الإرسال
  const playSendSound = () => {
    if (isMuted || !audioContextRef.current) return

    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = 1200
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.15)
  }

  // معالجة إرسال الرسالة
  const handleWebhookTrigger = () => {
    if (!inputValue.trim()) return

    playSendSound()

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // محاكاة رد البوت بعد ثانية
    setTimeout(() => {
      const botMessage: Message = {
        type: "bot",
        text: config.smartAmbassador.defaultResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  // مسح المحادثة
  const handleClearChat = () => {
    playClickSound()
    setMessages([{ type: "bot", text: config.smartAmbassador.welcomeMessage, timestamp: new Date() }])
  }

  // فتح/إغلاق النافذة
  const toggleChat = () => {
    playClickSound()
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* الزر العائم */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
        aria-label={config.smartAmbassador.buttonLabel}
      >
        {/* حلقة النبض الخارجية */}
        <div className="absolute inset-0 rounded-full bg-[var(--color-primary)] opacity-20 animate-pulse-ring" />

        {/* نقطة نابضة في الزاوية العلوية اليمنى */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-secondary)] rounded-full animate-pulse-dot" />

        {/* العنصر النائب للشعار */}
        <VisualPlaceholder text="شعار" shape="square" className="w-12 h-12 text-xs" />
      </button>

      {/* نافذة المحادثة */}
      {isOpen && (
        <>
          {/* Overlay ضبابي */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={toggleChat} />

          {/* نافذة المحادثة */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
            {/* رأس النافذة */}
            <div className="flex items-center justify-between p-4 border-b bg-[var(--color-primary)] text-white rounded-t-2xl">
              <h3 className="font-bold text-lg">{config.smartAmbassador.chatTitle}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playClickSound()
                    setIsMuted(!isMuted)
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button
                  onClick={handleClearChat}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="مسح المحادثة"
                >
                  <RotateCcw size={20} />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="إغلاق"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* جسم المحادثة */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-[var(--color-primary)] text-white rounded-br-sm"
                        : "bg-gray-100 text-[var(--color-text-main)] rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* شريط الإدخال */}
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleWebhookTrigger()}
                  placeholder={config.smartAmbassador.placeholder}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-right"
                />
                <button
                  onClick={handleWebhookTrigger}
                  disabled={!inputValue.trim()}
                  className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                  aria-label={config.smartAmbassador.sendButton}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
