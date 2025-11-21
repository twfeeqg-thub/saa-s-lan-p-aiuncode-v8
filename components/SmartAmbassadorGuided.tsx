// components/SmartAmbassadorGuided.tsx

"use client"

import { useState, useRef, useEffect } from "react"
import { X, Volume2, VolumeX, RotateCcw } from "lucide-react"
import { config } from "@/src/config/landingPageConfig"
import Image from "next/image"
import { knowledgeBase } from "@/src/config/knowledgeBase"

// تعريف أنواع البيانات
interface Message {
  type: "user" | "bot";
  text: string;
}

interface CurrentNode {
  message: string;
  options: { text: string; nextId: string }[];
}

export function SmartAmbassadorGuided() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentNode, setCurrentNode] = useState<CurrentNode>(knowledgeBase.root)
  const [isMuted, setIsMuted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, currentNode]) // أضفنا currentNode هنا لضمان التمرير عند عرض الرسالة الأولى

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

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

  const handleOptionClick = (option: { text: string; nextId: string }) => {
    playClickSound();
    const userMessage: Message = { type: "user", text: option.text };
    const nextNode = knowledgeBase[option.nextId];
    
    setMessages((prev) => [...prev, userMessage]);
    setCurrentNode(nextNode);
  }

  const handleClearChat = () => {
    playClickSound()
    setMessages([])
    setCurrentNode(knowledgeBase.root)
  }

  const toggleChat = () => {
    playClickSound()
    setIsOpen(!isOpen)
    if (!isOpen) {
      handleClearChat(); // إعادة تعيين المحادثة عند كل فتح جديد
    }
  }

  return (
    <>
      {/* واجهة الزر العائم (تبقى كما هي) */}
      <div onClick={toggleChat} className="group fixed bottom-6 left-6 z-50 flex cursor-pointer items-center gap-3" aria-label={config.smartAmbassador.buttonLabel}>
        <div className="rounded-full bg-white px-4 py-2 text-[var(--color-text-main)] shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="font-bold">شبيك لبيك</span>
        </div>
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl transition-transform duration-300 group-hover:scale-110 animate-pulse-shadow">
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="relative inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--color-accent)]"></span>
          </span>
          <Image src="/images/logo.png" alt="AI-Uncode Smart Ambassador" width={48} height={48} className="w-12 h-12" />
        </div>
      </div>

      {/* نافذة المحادثة */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={toggleChat} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
            {/* الشريط العلوي (يبقى كما هو) */}
            <div className="flex items-center justify-between p-4 border-b bg-[var(--color-primary)] text-white rounded-t-2xl">
              <h3 className="font-bold text-lg">{config.smartAmbassador.chatTitle}</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => { playClickSound(); setIsMuted(!isMuted); }} className="p-2 hover:bg-white/20 rounded-lg transition-colors" aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}>
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button onClick={handleClearChat} className="p-2 hover:bg-white/20 rounded-lg transition-colors" aria-label="مسح المحادثة">
                  <RotateCcw size={20} />
                </button>
                <button onClick={toggleChat} className="p-2 hover:bg-white/20 rounded-lg transition-colors" aria-label="إغلاق">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* منطقة عرض الرسائل المحدثة */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* --- بداية التعديل الجذري --- */}
              {/* الرسالة الترحيبية الأولى */}
              <div className="flex justify-start">
                  <div className="max-w-[85%] p-3 rounded-2xl bg-[var(--color-primary)] text-white rounded-bl-none">
                    <p className="text-sm leading-relaxed">{knowledgeBase.root.message}</p>
                  </div>
              </div>

              {/* عرض سجل المحادثة (رسائل المستخدم والبوت) */}
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${ message.type === 'user' ? 'bg-gray-100 text-[var(--color-text-main)] rounded-br-none' : 'bg-[var(--color-primary)] text-white rounded-bl-none' }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              {/* --- نهاية التعديل الجذري --- */}
              <div ref={messagesEndRef} />
            </div>

            {/* منطقة الأزرار في الأسفل */}
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
                <div className="flex flex-col gap-2">
                    {currentNode.options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(option)}
                          className="w-full text-right px-4 py-3 bg-white border border-gray-200 text-[var(--color-text-main)] rounded-lg text-sm hover:bg-gray-100 hover:border-[var(--color-primary)] transition-all"
                        >
                          {option.text}
                        </button>
                    ))}
                </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
