"use client";

import { useState, useEffect } from 'react';
import { config } from '@/src/config/landingPageConfig';
// --- بداية التعديل ---
// تم تغيير طريقة استيراد الأيقونات لحل مشكلة البناء على Vercel
// بدلاً من 'react-icons/fi'، نستورد من 'react-icons/fa' التي تكون عادةً أكثر استقرارًا في حزم البناء
import { FaUser, FaRobot } from 'react-icons/fa'; 
// --- نهاية التعديل ---

// استيراد أنواع البيانات لضمان التوافق الكامل
type Scenario = typeof config.smartAgentScenarios.scenarios[0];
type AgentRole = Scenario['agentRoles'][0];
type ChatMessage = AgentRole['chat'][0];

// تعريف واجهة الخصائص (Props) التي سيستقبلها المكون
interface FakeScenarioChatProps {
  scenario: Scenario; // المكون يستقبل بيانات السيناريو النشط بالكامل
}

/**
 * FakeScenarioChat Component
 * ... (التعليقات السابقة تبقى كما هي) ...
 */
export function FakeScenarioChat({ scenario }: FakeScenarioChatProps) {
  // استخراج نصوص الأزرار النهائية من ملف الإعدادات
  const { finalActions } = config.smartAgentScenarios;

  // حالة لتخزين الدور النشط حاليًا (مثلاً: سكرتير، مسوق)
  const [activeRole, setActiveRole] = useState<AgentRole>(scenario.agentRoles[0]);

  // هذا التأثير (Effect) يضمن تحديث الدور النشط إذا تغير السيناريو نفسه
  useEffect(() => {
    setActiveRole(scenario.agentRoles[0]);
  }, [scenario]);

  // دالة لمعالجة النقر على زر دور وظيفي مختلف
  const handleRoleClick = (role: AgentRole) => {
    setActiveRole(role);
  };

  // دالة لتنسيق وعرض كل رسالة في المحادثة
  const renderMessage = (message: ChatMessage, index: number) => {
    switch (message.type) {
      case 'bot':
        return (
          <div key={index} className="flex items-start gap-3 my-4 animate-fade-in">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              {/* --- بداية التعديل --- */}
              <FaRobot className="text-gray-600" /> {/* تم تغيير الأيقونة إلى FaRobot */}
              {/* --- نهاية التعديل --- */}
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-xs md:max-w-md">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        );
      case 'user':
        return (
          <div key={index} className="flex items-start gap-3 my-4 justify-end animate-fade-in">
            <div className="bg-[var(--color-primary)] text-white rounded-lg p-3 max-w-xs md:max-w-md">
              <p className="text-sm">{message.text}</p>
            </div>
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              {/* --- بداية التعديل --- */}
              <FaUser className="text-gray-600" /> {/* تم تغيير الأيقونة إلى FaUser */}
              {/* --- نهاية التعديل --- */}
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

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-xl">
      {/* 1. شريط أزرار الأدوار الوظيفية */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {scenario.agentRoles.map((role) => (
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

      {/* 2. نافذة عرض رسائل المحادثة */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeRole.chat.map(renderMessage)}
      </div>

      {/* 3. شريط الأزرار النهائية للدعوة لاتخاذ إجراء */}
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
