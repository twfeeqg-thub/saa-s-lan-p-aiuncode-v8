"use client";

import { useState, useEffect } from 'react';
import { config } from '@/src/config/landingPageConfig';
import Image from 'next/image';
// --- بداية التعديل ---
// 1. استيراد مكون المحادثة الوهمية الذي أنشأناه
import { FakeScenarioChat } from './FakeScenarioChat'; 
// --- نهاية التعديل ---

// استيراد أنواع البيانات من ملف الإعدادات لضمان التوافق
type Scenario = typeof config.smartAgentScenarios.scenarios[0];

/**
 * SmartAgentScenarios Component
 * ... (التعليقات السابقة تبقى كما هي) ...
 * 7. أصبح الآن مسؤولاً عن إظهار مكون المحادثة الوهمية عند طلب المستخدم.
 */
export function SmartAgentScenarios() {
  // استخراج البيانات من ملف الإعدادات المركزي لتسهيل القراءة
  const { title, subtitle, scenarios } = config.smartAgentScenarios;

  // حالة لتخزين السيناريو الذي تم اختياره حاليًا
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);

  // --- بداية التعديل ---
  // 2. حالة جديدة لتحديد ما إذا كنا سنعرض المحادثة التفاعلية أم الصورة المصغرة
  const [showChat, setShowChat] = useState(false);
  // --- نهاية التعديل ---

  // هذا التأثير (Effect) يعمل مرة واحدة فقط عند تحميل المكون لأول مرة
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    const randomScenario = scenarios[randomIndex];
    setActiveScenario(randomScenario);
    // عند التحميل الأول، نعرض دائمًا الصورة المصغرة
    setShowChat(false); 
  }, [scenarios]);

  // دالة لمعالجة النقر على أي زر سيناريو
  const handleScenarioClick = (scenario: Scenario) => {
    setActiveScenario(scenario);
    // عند تغيير السيناريو، نعود دائمًا إلى عرض الصورة المصغرة أولاً
    setShowChat(false); 
  };

  // إذا لم يتم تحميل السيناريوهات بعد، نعرض لا شيء لتجنب الأخطاء
  if (!activeScenario) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 text-center">
      <div className="container mx-auto px-4">
        
        {/* 1. العناوين الرئيسية للقسم */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          {subtitle}
        </p>

        {/* 2. شريط أزرار سيناريوهات الأعمال */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {scenarios.map((scenario) => (
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

        {/* --- بداية التعديل --- */}
        {/* 3. حاوية العرض الديناميكية (إما صورة أو محادثة) */}
        <div className="w-full max-w-4xl mx-auto min-h-[550px] md:min-h-[600px] bg-white rounded-xl shadow-2xl">
          {/* 
            نستخدم `key` لإجبار React على إعادة إنشاء المكونات عند تغيير السيناريو،
            مما يعطينا تأثير الانتقال (fade-in) مجانًا.
          */}
          <div key={activeScenario.id} className="animate-fade-in h-full">
            {/* نستخدم الشرط `showChat` لتحديد ماذا سنعرض */}
            {showChat ? (
              // 4. في حالة `true`، نعرض المحادثة التفاعلية ونمرر لها البيانات
              <FakeScenarioChat scenario={activeScenario} />
            ) : (
              // في حالة `false`، نعرض الصورة المصغرة مع زر التفعيل
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
        {/* --- نهاية التعديل --- */}

      </div>
    </section>
  );
}
