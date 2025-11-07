"use client";

import { useState, useEffect } from 'react';
import { config } from '@/src/config/landingPageConfig';
import Image from 'next/image';

// استيراد أنواع البيانات من ملف الإعدادات لضمان التوافق
type Scenario = typeof config.smartAgentScenarios.scenarios[0];

/**
 * SmartAgentScenarios Component
 * 
 * هذا هو المكون الرئيسي للقسم التفاعلي الجديد "Project Phoenix".
 * مسؤولياته:
 * 1. عرض العنوان الرئيسي والعناوين الفرعية للقسم.
 * 2. عرض قائمة أزرار لسيناريوهات الأعمال المختلفة (محل تمور، فندق، إلخ).
 * 3. اختيار سيناريو عشوائي لعرضه بشكل افتراضي عند تحميل الصفحة.
 * 4. تتبع السيناريو النشط الذي يختاره المستخدم.
 * 5. عرض الصورة المصغرة (Thumbnail) المطابقة للسيناريو النشط.
 * 6. تمييز زر السيناريو النشط بتأثيرات بصرية (نبض وتوهج).
 * 7. في المراحل اللاحقة، سيكون مسؤولاً عن إظهار مكون المحادثة الوهمية.
 */
export function SmartAgentScenarios() {
  // استخراج البيانات من ملف الإعدادات المركزي لتسهيل القراءة
  const { title, subtitle, scenarios } = config.smartAgentScenarios;

  // حالة لتخزين السيناريو الذي تم اختياره حاليًا
  // نستخدم `useState<Scenario | null>` للسماح بقيمة أولية فارغة قبل الاختيار العشوائي
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);

  // هذا التأثير (Effect) يعمل مرة واحدة فقط عند تحميل المكون لأول مرة
  useEffect(() => {
    // اختيار سيناريو عشوائي من قائمة السيناريوهات
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    const randomScenario = scenarios[randomIndex];
    // تحديث الحالة لتعيين السيناريو العشوائي كالسيناريو النشط
    setActiveScenario(randomScenario);
  }, [scenarios]); // الاعتماد على `scenarios` يضمن إعادة التشغيل إذا تغيرت البيانات

  // دالة لمعالجة النقر على أي زر سيناريو
  const handleScenarioClick = (scenario: Scenario) => {
    setActiveScenario(scenario);
  };

  // إذا لم يتم تحميل السيناريوهات بعد (حالة نادرة جدًا)، نعرض لا شيء لتجنب الأخطاء
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
              // تطبيق أنماط مختلفة للزر النشط وغير النشط
              className={`
                px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 ease-in-out
                shadow-md hover:shadow-lg hover:-translate-y-1
                ${
                  activeScenario.id === scenario.id
                    ? 'bg-[var(--color-primary)] text-white scale-105 shadow-xl animate-pulse-slow' // نمط الزر النشط
                    : 'bg-white text-gray-700 hover:bg-gray-100' // نمط الزر العادي
                }
              `}
            >
              {/* إضافة أيقونة التوهج للزر النشط */}
              {activeScenario.id === scenario.id && '✨ '}
              {scenario.name}
            </button>
          ))}
        </div>

        {/* 3. حاوية عرض الصورة المصغرة (Thumbnail) */}
        <div className="w-full max-w-4xl mx-auto min-h-[400px] md:min-h-[500px] bg-white rounded-xl shadow-2xl p-4">
          {/* 
            نستخدم key={activeScenario.id} لإجبار React على إعادة تحميل مكون الصورة
            عند تغيير السيناريو، مما يخلق تأثير انتقال (fade) جميل.
          */}
          <div key={activeScenario.id} className="animate-fade-in">
            <p className="text-sm text-gray-500 mb-4">
              مثال حي لمحادثة في سيناريو: <strong>{activeScenario.name}</strong>
            </p>
            <Image
              src={activeScenario.thumbnailUrl}
              alt={`لقطة شاشة لمحادثة وهمية في ${activeScenario.name}`}
              width={1024}
              height={768}
              className="rounded-lg border border-gray-200"
              // الأولوية للتحميل السريع للصورة الأولى التي تظهر
              priority 
            />
          </div>
        </div>

      </div>
    </section>
  );
}
