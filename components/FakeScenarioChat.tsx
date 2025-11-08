"use client";

import { useState, useEffect, useRef } from 'react';
import { config } from '@/src/config/landingPageConfig';

// الأيقونات المضمنة كـ SVG
const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const TypingIndicator = () => (
  <div className="flex items-start gap-3 my-4 animate-fade-in">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
      <BotIcon />
    </div>
    <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-1">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-short"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-short delay-150"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-short delay-300"></span>
    </div>
  </div>
);

// --- بداية التعديل: إضافة آلية الصوت المضمنة ---
let audioContext: AudioContext | null = null;

const playSound = (type: 'sent' | 'received') => {
  if (typeof window === 'undefined') return;
  
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.error("Web Audio API is not supported in this browser.");
      return;
    }
  }
  
  const ctx = audioContext;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  if (type === 'sent') {
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } else { // received
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  }
};
// --- نهاية التعديل ---

// استيراد أنواع البيانات
type Scenario = typeof config.smartAgentScenarios.scenarios[0];
type AgentRole = Scenario['agentRoles'][0];
// --- بداية التعديل: تحديث نوع الرسالة ليشمل النوع الجديد ---
type ChatMessage = AgentRole['chat'][0] & { type: 'bot' | 'user' | 'buttons' | 'payment-link' };
// --- نهاية التعديل ---

interface FakeScenarioChatProps {
  scenario: Scenario;
}

/**
 * FakeScenarioChat Component
 * ... (التعليقات السابقة تبقى كما هي) ...
 * 11. تمت ترقيته ليدعم الأصوات المضمنة، سرعة محادثة قابلة للتخصيص، وزر دفع ديناميكي.
 */
export function FakeScenarioChat({ scenario }: FakeScenarioChatProps) {
  const { realCta } = config.smartAgentScenarios.finalActions;
  const enabledRoles = scenario.agentRoles.filter(role => role.enabled);
  const [activeRole, setActiveRole] = useState<AgentRole | undefined>(enabledRoles[0]);
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstEnabledRole = scenario.agentRoles.find(role => role.enabled);
    setActiveRole(firstEnabledRole);
    setDisplayedMessages([]);
  }, [scenario]);

  useEffect(() => {
    if (!activeRole) return;

    setDisplayedMessages([]);
    const messages = activeRole.chat as ChatMessage[];
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const showNextMessage = () => {
      if (currentIndex >= messages.length) {
        setIsTyping(false);
        return;
      }

      const currentMessage = messages[currentIndex];
      const delay = currentMessage.delay || (currentMessage.type === 'bot' ? 2000 : 500);
      
      if (currentMessage.type === 'bot') {
        setIsTyping(true);
        timeoutId = setTimeout(() => {
          playSound('received');
          setIsTyping(false);
          setDisplayedMessages(prev => [...prev, currentMessage]);
          currentIndex++;
          timeoutId = setTimeout(showNextMessage, delay);
        }, 1200); // مدة ظهور مؤشر "يكتب الآن..."
      } else {
        playSound('sent');
        setDisplayedMessages(prev => [...prev, currentMessage]);
        currentIndex++;
        timeoutId = setTimeout(showNextMessage, delay);
      }
    };

    timeoutId = setTimeout(showNextMessage, 500);

    return () => clearTimeout(timeoutId);

  }, [activeRole]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [displayedMessages, isTyping]);

  const handleRoleClick = (role: AgentRole) => {
    setActiveRole(role);
  };

  const renderMessage = (message: ChatMessage, index: number) => {
    switch (message.type) {
      case 'bot':
        return (
          <div key={index} className="flex items-start gap-3 my-4 animate-fade-in">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <BotIcon />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-xs md:max-w-md">
              <p className="text-base text-gray-800 whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        );
      case 'user':
        return (
          <div key={index} className="flex items-start gap-3 my-4 justify-end animate-fade-in">
            <div className="bg-[var(--color-primary)] text-white rounded-lg p-3 max-w-xs md:max-w-md">
              <p className="text-base">{message.text}</p>
            </div>
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon />
            </div>
          </div>
        );
      case 'buttons':
        return (
          <div key={index} className="flex flex-wrap gap-2 justify-start my-4 ml-11 animate-fade-in">
            {message.options.map((option, i) => (
              <button key={i} className="px-4 py-2 text-sm bg-white border border-[var(--color-primary)] text-[var(--color-primary)] rounded-full hover:bg-blue-50">
                {option}
              </button>
            ))}
          </div>
        );
      // --- بداية التعديل: إضافة حالة عرض زر الدفع الديناميكي ---
      case 'payment-link':
        return (
          <div key={index} className="flex justify-center my-4 animate-fade-in">
            <button className="w-full max-w-xs px-4 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-lg">
              {message.text}
            </button>
          </div>
        );
      // --- نهاية التعديل ---
      default:
        return null;
    }
  };
  
  if (!activeRole) {
    return <div className="p-4 text-center text-gray-500">لا توجد أدوار مفعّلة لهذا السيناريو.</div>;
  }

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-xl">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {enabledRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleClick(role)}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap
                ${
                  activeRole.id === role.id
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {role.name}
            </button>
          ))}
        </div>
      </div>

      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
        {displayedMessages.map(renderMessage)}
        {isTyping && <TypingIndicator />}
      </div>

      {/* --- بداية التعديل: حذف زر الإجراء الوهمي الثابت --- */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="grid grid-cols-1 gap-3">
          <button className="w-full px-4 py-3 bg-[var(--color-secondary)] text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
            {realCta}
          </button>
        </div>
      </div>
      {/* --- نهاية التعديل --- */}
    </div>
  );
}



