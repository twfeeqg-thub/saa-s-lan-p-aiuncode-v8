"use client"

import { useState, useRef, useEffect } from "react"
import { X, Volume2, VolumeX, RotateCcw, Send, LoaderCircle } from "lucide-react"
import { config } from "@/src/config/landingPageConfig"
import Image from "next/image"

interface Message {
  type: "user" | "bot"
  text: string
  timestamp: Date
}

// --- بداية التعديل الوحيد ---
// تم تغيير اسم المكون من SmartAmbassador إلى DemoChatWindow
export function DemoChatWindow() {
// --- نهاية التعديل الوحيد ---

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", text: config.smartAmbassador.welcomeMessage, timestamp: new Date() },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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

  const handleWebhookTrigger = async () => {
    if (!inputValue.trim() || isLoading) return;
    playSendSound();
    setIsLoading(true);

    const userMessage: Message = {
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");

    try {
      const webhookUrl = 'https://n8n-main-service.onrender.com/webhook-test/c5d5b8ed-70f8-41ee-b0cc-e7ee8216addd';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          sessionId: 'user-123-test',
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage: Message = {
        type: "bot",
        text: data.reply || "عذرًا، لم أستلم ردًا مفهومًا. حاول مرة أخرى.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error fetching from n8n:", error);
      const errorMessage: Message = {
        type: "bot",
        text: "أعتذر، أواجه صعوبة في الاتصال بالخادم الآن. الرجاء المحاولة لاحقًا.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    playClickSound()
    setMessages([{ type: "bot", text: config.smartAmbassador.welcomeMessage, timestamp: new Date() }])
  }

  const toggleChat = () => {
    playClickSound()
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div
        onClick={toggleChat}
        className="group fixed bottom-6 left-6 z-50 flex cursor-pointer items-center gap-3"
        aria-label={config.smartAmbassador.buttonLabel}
      >
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

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={toggleChat} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-gray-100 text-[var(--color-text-main)] rounded-bl-sm"
                        : "bg-[var(--color-primary)] text-white rounded-br-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-2xl bg-[var(--color-primary)] text-white rounded-br-sm flex items-center gap-2">
                    <span className="text-sm">يكتب الآن</span>
                    <LoaderCircle size={16} className="animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleWebhookTrigger()}
                  placeholder={config.smartAmbassador.placeholder}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-right"
                  disabled={isLoading}
                />
                <button
                  onClick={handleWebhookTrigger}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                  aria-label={config.smartAmbassador.sendButton}
                >
                  {isLoading ? <LoaderCircle size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
