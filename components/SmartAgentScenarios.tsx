"use client";

import { useState, useEffect } from 'react';
import { config } from '@/src/config/landingPageConfig';
import Image from 'next/image';
import { FakeScenarioChat } from './FakeScenarioChat'; 

// استيراد أنواع البيانات من ملف الإعدادات لضمان التوافق
type Scenario = typeof config.smartAgentScenarios.scenarios[0];

/**
 * SmartAgentScenarios Component
 * ... (التعليقات السابقة تبقى كما هي) ...
 * 8. تمت ترقيته ليفهم خاصية `enabled` ويقوم بفلترة السيناريوهات المعطلة.
 */
export function SmartAgentScenarios() {
  const { title, subtitle, scenarios } = config.smartAgentScenarios;

  // --- بداية التعديل ---
  // 1. نقوم بفلترة السيناريوهات لنحصل فقط على المفعّلة منها
  const enabledScenarios = scenarios.filter(scenario => scenario.enabled);
  // --- نهاية التعديل ---

  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // --- بداية التعديل ---
    // 2. نتأكد من وجود سيناريوهات مفعّلة قبل محاولة الاختيار العشوائي
    if (enabledScenarios.length > 0) {
      // نختار عشوائياً فقط من قائمة السيناريوهات المفعّلة
      const randomIndex = Math.floor(Math.random() * enabledScenarios.length);
      const randomScenario = enabledScenarios[randomIndex];
      setActiveScenario(randomScenario);
    }
    // --- نهاية التعديل ---
    setShowChat(false); 
  }, [scenarios]); // نبقي الاعتماد على `scenarios` الأصلي لإعادة التشغيل عند أي تغيير في الإعدادات

  const handleScenarioClick = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setShowChat(false); 
  };

  // إذا لم يتم تحميل أي سيناريو مفعّل، لا نعرض القسم بأكمله
  if (!activeScenario) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 text-center">
      <div className="container mx-auto px-4">
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          {subtitle}
        </p>

        {/* --- بداية التعديل --- */}
        {/* 3. نعرض أزرار السيناريوهات المفعّلة فقط */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {enabledScenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioClick(scenario)}
              className={`
                px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 ease-in-out
                shadow-md hover:shadow-lg hover:-translate-y-1
                ${
                  activeScenario.id === scenario.id
                    ? 'bg-[var(--color-primary)] text-white scale-105 shadow-xl animate-pulse-slow'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {activeScenario.id === scenario.id && '✨ '}
              {scenario.name}
            </button>
          ))}
        </div>
        {/* --- نهاية التعديل --- */}

        <div className="w-full max-w-4xl mx-auto min-h-[550px] md:min-h-[600px] bg-white rounded-xl shadow-2xl">
          <div key={activeScenario.id} className="animate-fade-in h-full">
            {showChat ? (
              <FakeScenarioChat scenario={activeScenario} />
            ) : (
              <div className="p-4 flex flex-col items-center justify-center h-full">
                <p className="text-sm text-gray-500 mb-4">
                  مثال حي لمحادثة في سيناريو: <strong>{activeScenario.name}</strong>
                </p>
                <Image
                  src={activeScenario.thumbnailUrl}
                  alt={`لقطة شاشة لمحادثة وهمية في ${activeScenario.name}`}
                  width={1024}
                  height={768}
                  className="rounded-lg border border-gray-200 mb-6"
                  priority 
                />
                <button 
                  onClick={() => setShowChat(true)}
                  className="px-8 py-3 bg-[var(--color-secondary)] text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  جرب المحادثة بنفسك
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
