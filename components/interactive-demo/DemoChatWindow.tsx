"use client"

import { useState, useRef, useEffect } from "react"
import { X, Volume2, VolumeX, RotateCcw, Send, LoaderCircle } from "lucide-react"
import Image from "next/image"

// 1. تعريف أنواع الرسائل
interface Message {
  type: "user" | "bot"
  text: string
  timestamp: Date
}

// 2. تعريف أنواع Props
interface DemoChatWindowProps {
  userSelections: {
    businessName: string;
    agentRole: string;
    color: string;
  }
}

// 3. تعديل اسم المكون واستقبال الـ props
export function DemoChatWindow({ userSelections }: DemoChatWindowProps) {
  // 4. دالة لتوليد الرسالة الترحيبية الديناميكية
  const generateWelcomeMessage = () => {
    const business = userSelections.businessName || "متجرك";
    switch (userSelections.agentRole) {
      case "secretary":
        return `حياك الله! أنا سكرتيرك الذكي في ${business}. كيف أقدر أخدمك اليوم؟`
      case "customer-service":
        return `أهلاً بك في ${business}. أنا هنا لخدمتك. تفضل بسؤالك.`
      case "store-manager":
        return `يا هلا بك في ${business}! أنا مدير متجرك الذكي. آمرني؟`
      case "marketer":
        return `مرحباً! بصفتي مسوقك الذكي في ${business}، عندي لك عروض خاصة اليوم. مهتم؟`
      default:
        return `مرحباً بك في ${business}! كيف يمكنني مساعدتك؟`
    }
  }

  // 5. إدارة الحالة (State Management)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", text: generateWelcomeMessage(), timestamp: new Date() },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // 6. دالة لتحديد لون الواجهة
  const getAccentColor = () => {
    const colorMap: { [key: string]: string } = {
      blue: "#3B82F6",
      green: "#10B981",
      yellow: "#F59E0B",
      purple: "#8B5CF6",
      red: "#EF4444",
    }
    return colorMap[userSelections.color] || colorMap.blue
  }
  const accentColor = getAccentColor()

  // --- دوال الصوت الكاملة (بدون اختصار) ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  const playSound = (frequency: number, duration: number) => {
    if (isMuted || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  const playClickSound = () => playSound(800, 0.1);
  const playSendSound = () => playSound(1200, 0.15);
  // --- نهاية دوال الصوت ---

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // منطق الردود الوهمية
  const handleSimpleBotResponse = (userInput: string) => {
    setIsLoading(true)
    setTimeout(() => {
      const botMessage: Message = {
        type: "bot",
        text: `شكرًا لك على رسالتك بخصوص "${userInput}". فريقنا في ${userSelections.businessName || 'الشركة'} سيقوم بالرد عليك قريبًا.`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return
    playSendSound()

    const userMessage: Message = {
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")

    handleSimpleBotResponse(currentInput)
  }

  const handleClearChat = () => {
    playClickSound()
    setMessages([{ type: "bot", text: generateWelcomeMessage(), timestamp: new Date() }])
  }

  const toggleChat = () => {
    playClickSound()
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* الزر العائم */}
      <div
        onClick={toggleChat}
        className="group fixed bottom-6 left-6 z-50 flex cursor-pointer items-center gap-3"
        aria-label="افتح المحادثة التجريبية"
      >
        <div className="rounded-full bg-white px-4 py-2 text-[var(--color-text-main)] shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="font-bold">جرب وكيلك المخصص!</span>
        </div>
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl transition-transform duration-300 group-hover:scale-110 animate-pulse-shadow">
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="relative inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: accentColor }}></span>
            <span className="relative inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: accentColor }}></span>
          </span>
          <Image src="/images/logo.png" alt="وكيلك الذكي المخصص" width={48} height={48} className="w-12 h-12" />
        </div>
      </div>

      {/* نافذة المحادثة */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={toggleChat} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
            {/* الشريط العلوي المخصص */}
            <div className="flex items-center justify-between p-4 border-b text-white rounded-t-2xl" style={{ backgroundColor: accentColor }}>
              <h3 className="font-bold text-lg">{userSelections.businessName || "محادثة تجريبية"}</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => { playClickSound(); setIsMuted(!isMuted); }} className="p-2 hover:bg-white/20 rounded-lg" aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}>
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button onClick={handleClearChat} className="p-2 hover:bg-white/20 rounded-lg" aria-label="مسح المحادثة"><RotateCcw size={20} /></button>
                <button onClick={toggleChat} className="p-2 hover:bg-white/20 rounded-lg" aria-label="إغلاق"><X size={20} /></button>
              </div>
            </div>
            
            {/* جسم المحادثة */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-gray-100 text-[var(--color-text-main)] rounded-bl-sm"
                        : "text-white rounded-br-sm"
                    }`}
                    style={message.type === 'bot' ? { backgroundColor: accentColor } : {}}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-2xl text-white rounded-br-sm flex items-center gap-2" style={{ backgroundColor: accentColor }}>
                    <span className="text-sm">يكتب الآن</span>
                    <LoaderCircle size={16} className="animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* حقل الإدخال */}
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2"
                  style={{ '--ring-color': accentColor } as React.CSSProperties}
                  onFocus={(e) => e.target.style.borderColor = accentColor}
                  onBlur={(e) => e.target.style.borderColor = ''}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-6 py-3 text-white rounded-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                  style={{ backgroundColor: accentColor }}
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
