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

// --- بداية التعديل ---
// مؤشر "يكتب الآن..."
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
// --- نهاية التعديل ---


// استيراد أنواع البيانات
type Scenario = typeof config.smartAgentScenarios.scenarios[0];
type AgentRole = Scenario['agentRoles'][0];
type ChatMessage = AgentRole['chat'][0];

interface FakeScenarioChatProps {
  scenario: Scenario;
}

/**
 * FakeScenarioChat Component
 * ... (التعليقات السابقة تبقى كما هي) ...
 * 10. تمت ترقيته لعرض المحادثة بشكل حي ومتتابع مع مؤشر "يكتب الآن...".
 */
export function FakeScenarioChat({ scenario }: FakeScenarioChatProps) {
  const { finalActions } = config.smartAgentScenarios;
  const enabledRoles = scenario.agentRoles.filter(role => role.enabled);
  const [activeRole, setActiveRole] = useState<AgentRole | undefined>(enabledRoles[0]);

  // --- بداية التعديل ---
  // حالات جديدة للتحكم في العرض الحي للمحادثة
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // --- نهاية التعديل ---

  useEffect(() => {
    const firstEnabledRole = scenario.agentRoles.find(role => role.enabled);
    setActiveRole(firstEnabledRole);
    // عند تغيير السيناريو، نفرّغ الرسائل المعروضة
    setDisplayedMessages([]);
  }, [scenario]);

  // --- بداية التعديل ---
  // تأثير جديد مسؤول عن عرض الرسائل بشكل متتابع
  useEffect(() => {
    if (!activeRole) return;

    // نبدأ بعرض الرسائل من الصفر
    setDisplayedMessages([]);
    const messages = activeRole.chat;
    let currentIndex = 0;

    const showNextMessage = () => {
      if (currentIndex >= messages.length) {
        setIsTyping(false);
        return;
      }

      const currentMessage = messages[currentIndex];
      
      // إذا كانت الرسالة من البوت، نظهر مؤشر "يكتب الآن..."
      if (currentMessage.type === 'bot') {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setDisplayedMessages(prev => [...prev, currentMessage]);
          currentIndex++;
          setTimeout(showNextMessage, 1200); // تأخير قبل الرسالة التالية
        }, 800); // مدة ظهور مؤشر "يكتب الآن..."
      } else {
        // رسائل المستخدم والأزرار تظهر فوراً
        setDisplayedMessages(prev => [...prev, currentMessage]);
        currentIndex++;
        setTimeout(showNextMessage, 300); // تأخير بسيط قبل الرسالة التالية
      }
    };

    // نبدأ عرض أول رسالة بعد فترة قصيرة
    const timeoutId = setTimeout(showNextMessage, 500);

    // دالة التنظيف لإلغاء المؤقتات عند تغيير الدور أو إغلاق المكون
    return () => clearTimeout(timeoutId);

  }, [activeRole]);

  // تأثير للتمرير التلقائي إلى أسفل المحادثة
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [displayedMessages, isTyping]);
  // --- نهاية التعديل ---


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

      {/* --- بداية التعديل --- */}
      {/* نعرض الرسائل من `displayedMessages` بدلاً من `activeRole.chat` */}
      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
        {displayedMessages.map(renderMessage)}
        {/* نعرض مؤشر "يكتب الآن..." إذا كانت الحالة `true` */}
        {isTyping && <TypingIndicator />}
      </div>
      {/* --- نهاية التعديل --- */}

      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button className="w-full px-4 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors">
            {finalActions.fakeCta}
          </button>
          <button className="w-full px-4 py-3 bg-[var(--color-secondary)] text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
            {finalActions.realCta}
          </button>
        </div>
      </div>
    </div>
  );
}
