// src/config/landingPageConfig.ts

// (باقي الاستيرادات في أعلى الملف تبقى كما هي)
import datesShopChat from '../data/chat-scenarios/dates-shop-chat';
// ...الخ

interface ConfigType {
  // ... (باقي الأنواع)
}

export const config: ConfigType = {
  sections: {
    hero: true,
    painPoints: true,
    solution: true,
    smartAgentScenarios: true,
    finalCta: true,
    faq: true,
    footer: true,
    smartAmbassador: true, // تأكد من أن هذا true
  },

  // ... (كل أقسام header, hero, painPoints, solution, ...إلخ تبقى كما هي)
  // ...
  // ...

  // اذهب إلى نهاية الملف وعدّل قسم smartAmbassador
  
  footer: {
    // ... (محتوى الفوتر يبقى كما هو)
  },

  // --- بداية التعديل ---
  smartAmbassador: {
    enabled: true, // إذا حطيتها false، يختفي السفير بكبره
    activeAmbassador: 'guided' as 'guided' | 'n8n', // 'guided' = الجديد أبو أزرار, 'n8n' = القديم
    
    // باقي الإعدادات القديمة
    buttonLabel: "تحدث معنا",
    chatTitle: "السفير الذكي",
    placeholder: "اكتب رسالتك هنا...",
    sendButton: "إرسال",
    welcomeMessage: "مرحباً! كيف يمكنني مساعدتك اليوم؟",
    defaultResponse: "شكرًا لتواصلك! كيف يمكنني مساعدتك اليوم؟",
  },
  // --- نهاية التعديل ---
};
