"use client";

import { useState, useEffect } from 'react';
import { config } from '@/src/config/landingPageConfig';
import Image from 'next/image';
import { FakeScenarioChat } from './FakeScenarioChat'; 

// استيراد أنواع البيانات من ملف الإعدادات لضمان التوافق
// --- بداية التعديل ---
// 1. تحديث النوع ليشمل الحقل الجديد showcaseImageUrl
type Scenario = (typeof config.smartAgentScenarios.scenarios)[0] & { showcaseImageUrl: string };
// --- نهاية التعديل ---


/**
 * SmartAgentScenarios Component
 * ... (التعليقات السابقة تبقى كما هي) ...
 * 9. تمت ترقيته لعرض صورة معبرة عن النشاط التجاري (Showcase Image) بدلاً من لقطة الشاشة.
 */
export function SmartAgentScenarios() {
  const { title, subtitle, scenarios } = config.smartAgentScenarios;

  const enabledScenarios = scenarios.filter(scenario => scenario.enabled);

  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (enabledScenarios.length > 0) {
      const randomIndex = Math.floor(Math.random() * enabledScenarios.length);
      const randomScenario = enabledScenarios[randomIndex] as Scenario; // Cast to the updated type
      setActiveScenario(randomScenario);
    }
    setShowChat(false); 
  }, [scenarios]);

  const handleScenarioClick = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setShowChat(false); 
  };

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

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {enabledScenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioClick(scenario as Scenario)} // Cast to the updated type
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

        <div className="w-full max-w-4xl mx-auto min-h-[550px] md:min-h-[600px] bg-white rounded-xl shadow-2xl">
          <div key={activeScenario.id} className="animate-fade-in h-full">
            {showChat ? (
              <FakeScenarioChat scenario={activeScenario} />
            ) : (
              <div className="p-4 flex flex-col items-center justify-center h-full">
                {/* --- بداية التعديل --- */}
                {/* 2. تغيير النص ليعكس طبيعة الصورة الجديدة */}
                <p className="text-sm text-gray-500 mb-4">
                  شاهد كيف يعمل وكيلنا الذكي في سيناريو: <strong>{activeScenario.name}</strong>
                </p>
                {/* 3. استخدام الحقل الجديد `showcaseImageUrl` وتحديث النص البديل */}
                <Image
                  src={activeScenario.showcaseImageUrl}
                  alt={`صورة معبرة عن نشاط ${activeScenario.name}`}
                  width={1024}
                  height={768}
                  className="rounded-lg border border-gray-200 mb-6 object-cover aspect-video" // aspect-video للحفاظ على أبعاد الصورة
                  priority 
                />
                {/* --- نهاية التعديل --- */}
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
