// ملف الإعدادات المركزي لصفحة الهبوط
// يحتوي على جميع المحتوى والبيانات للصفحة

// =================================================================
// == استيراد بيانات السيناريوهات من ملفات خارجية                ==
// =================================================================
import datesShopChat from '../data/chat-scenarios/dates-shop-chat';
import hotelChat from '../data/chat-scenarios/hotel-chat';
import clinicChat from '../data/chat-scenarios/clinic-chat';
import realEstateChat from '../data/chat-scenarios/real-estate-chat';
import carAgencyChat from '../data/chat-scenarios/car-agency-chat'; // يستخدم محتوى صالون الحلاقة مؤقتاً
import restaurantChat from '../data/chat-scenarios/restaurant-chat';
import gymChat from '../data/chat-scenarios/gym-chat'; // يستخدم محتوى مواد البناء مؤقتاً


interface ConfigType {
  sections: {
    hero: boolean;
    painPoints: boolean;
    solution: boolean;
    smartAgentScenarios: boolean;
    finalCta: boolean;
    faq: boolean;
    footer: boolean;
    smartAmbassador: boolean;
  };
  header: any;
  hero: any;
  painPoints: any;
  solution: any;
  smartAgentScenarios: any;
  finalCta: any;
  faq: any;
  footer: any;
  smartAmbassador: any;
}

export const config: ConfigType = {
  // التحكم في إظهار وإخفاء الأقسام
  sections: {
    hero: true,
    painPoints: true,
    solution: true,
    smartAgentScenarios: true,
    finalCta: true,
    faq: true,
    footer: true,
    smartAmbassador: true,
  },

  // ... (الأقسام الأخرى تبقى كما هي) ...
  header: {
    logo: {
      tagline: "ذكاء صناعي بلا تعقيد",
    },
    loginButton: {
      text: "تسجيل الدخول",
      link: "/login",
    },
  },
  hero: {
    title: {
      variantA: "توقف عن خسارة عملائك... أطلق موقعك الذكي في 7 أيام فقط!",
      variantB: "هل أنت جاهز لمضاعفة مبيعاتك؟ موقعك الذكي جاهز في أسبوع!",
      variantC: "حوّل زوارك إلى عملاء... بوكيل ذكاء اصطناعي يتحدث لهجتهم.",
      active: "variantA" as "variantA" | "variantB" | "variantC",
    },
    subtitle:
      "نبني لك صفحة احترافية مع وكيل AI يتحدث لهجتك الخليجية، يجيب 24/7، ويزيد مبيعاتك. لا تعقيد، فقط نتائج سريعة.",
    ctaButton: {
      text: "ابدأ مجانًا الآن",
    },
    scarcityBanner: {
      text: "عرض محدود: أول 20 عميلًا هذا الأسبوع يحصلون على خصم 25%!",
    },
  },
  painPoints: {
    title: "هل تشعر بهذا كل يوم؟",
    points: [
      { 
        text: "تغرق في رسائل متكررة؟", 
        solutionHint: "(وكيل AI يرد نيابة عنك 24/7)",
        lottieFile: "/animations/wasted-time.json"
      },
      { 
        text: "تخسر عملاء لعدم الرد الفوري؟", 
        solutionHint: "(يزيد مبيعاتك بنسبة تصل إلى 15%)",
        lottieFile: "/animations/lost-customer.json"
      },
      { 
        text: "التكنولوجيا تبدو معقدة ومكلفة؟", 
        solutionHint: "(نبني كل شيء في 7 أيام دون جهد منك)",
        lottieFile: "/animations/tech-complexity.json"
      },
    ],
  },
  solution: {
    title: "الحل البسيط: مشروعك جاهز في 3 خطوات",
    steps: [
      { text: "نستمع لرؤيتك", icon: "💬" },
      { text: "نبني موقعك + AI", icon: "🎨" },
      { text: "تدير من جوالك", icon: "🚀" },
    ],
    urgencyText: "انضم إلى رواد التجارة!",
    testimonials: [
      {
        quote: "زادت مبيعاتي 15% في شهر! الوكيل AI يفهم عملائي تمامًا.",
        author: "سارة الأحمدي",
        company: "مؤسسة متجر عطري",
      },
      {
        quote: "جمعنا 500 عميل عقاري جديد بأقل جهد. نقلة نوعية!",
        author: "خالد بن فهد",
        company: "مدير تسويق، دارك العقارية",
      },
    ],
  },

  // =================================================================
  // == مرحلة Project Phoenix: بناء القسم التفاعلي الجديد (نسخة مطورة) ==
  // =================================================================
  smartAgentScenarios: {
    title: "شف وكيلنا الذكي ويش يمكن يسوي بدالك",
    subtitle: "اضغط على أي بزنس تحت وشوف بنفسك كيف يرد على العملاء ويزيد مبيعاتك!",
    finalActions: {
      realCta: "اطلب وكيلك طال عمرك",
    },
    scenarios: [
      {
        id: "dates-shop",
        name: "محل تمور",
        enabled: true,
        thumbnailUrl: "/images/thumbnails/dates-shop-chat.png",
        agentRoles: datesShopChat // <-- ✨ الربط بالبيانات المستوردة
      },
      {
        id: "hotel",
        name: "فندق",
        enabled: true,
        thumbnailUrl: "/images/thumbnails/hotel-chat.png",
        agentRoles: hotelChat // <-- ✨ الربط بالبيانات المستوردة
      },
      {
        id: "clinic",
        name: "عيادة",
        enabled: true,
        thumbnailUrl: "/images/thumbnails/clinic-chat.png",
        agentRoles: clinicChat // <-- ✨ الربط بالبيانات المستوردة
      },
      {
        id: "building-materials",
        name: "مواد بناء",
        enabled: true,
        thumbnailUrl: "/images/thumbnails/building-materials-chat.png",
        agentRoles: gymChat // <-- ✨ الربط بالبيانات المستوردة (مؤقتاً)
      },
      {
        id: "restaurant",
        name: "مطعم",
        enabled: true,
        thumbnailUrl: "/images/thumbnails/restaurant-chat.png",
        agentRoles: restaurantChat // <-- ✨ الربط بالبيانات المستوردة
      },
      {
        id: "barber-shop",
        name: "صالون حلاقة",
        enabled: true,
        thumbnailUrl: "/images/thumbnails/barber-shop-chat.png",
        agentRoles: carAgencyChat // <-- ✨ الربط بالبيانات المستوردة (مؤقتاً)
      },
      {
        id: "real-estate",
        name: "وكيل عقاري",
        enabled: true,
        thumbnailUrl: "/images/thumbnails/real-estate-chat.png",
        agentRoles: realEstateChat // <-- ✨ الربط بالبيانات المستوردة
      },
    ],
  },
  // =================================================================
  // == نهاية قسم Project Phoenix                                  ==
  // =================================================================


  // ... (بقية الأقسام تبقى كما هي) ...
  finalCta: {
    title: "جرب الآن وابدأ رحلتك!",
    pricing: {
      plans: [
        { name: "باقة الانطلاق", price: "500", currency: "ريال/شهريًا", features: ["صفحة هبوط احترافية", "وكيل AI أساسي"] },
        { name: "باقة النمو", price: "900", currency: "ريال/شهريًا", features: ["موقع متعدد الصفحات", "وكيل AI متقدم", "تكامل واتساب"] },
      ],
      guaranteeText: "ضمان استرداد الأموال لمدة 30 يومًا",
    },
    finalCtaButton: {
      text: "احجز عرضك المجاني قبل نفاذه",
    },
  },
  faq: {
    triggerText: "أسئلة تدور في ذهنك؟",
    questions: [
      { question: "هل أحتاج إلى خبرة تقنية؟", answer: "لا إطلاقًا. نحن نهتم بكل الجوانب التقنية." },
      { question: "ما هي اللهجات التي يدعمها الوكيل؟", answer: "ندعم حاليًا اللهجة السعودية، الإماراتية، والكويتية." },
      { question: "هل يمكنني تحديث المحتوى بنفسي؟", answer: "نعم، نوفر لك لوحة تحكم سهلة." },
    ],
  },
  footer: {
    tagline: "نحن شريكك في النجاح. مهمتنا أن نضعك في مكانك الطبيعي: في القمة.",
    contact: {
      title: "اتصل بنا",
      email: "info@aiuncode.com",
      telegram: {
        username: "@tsahma",
        link: "https://t.me/tsahma",
      },
    },
    legalLinks: [
      { text: "سياسة الخصوصية", link: "/privacy" },
      { text: "شروط الاستخدام", link: "/terms" },
      { text: "إنشاء حساب", link: "/signup" },
    ],
    copyrightText: "© 2025 AI-Uncode. جميع الحقوق محفوظة.",
  },
  smartAmbassador: {
    buttonLabel: "تحدث معنا",
    chatTitle: "السفير الذكي",
    placeholder: "اكتب رسالتك هنا...",
    sendButton: "إرسال",
    welcomeMessage: "مرحباً! كيف يمكنني مساعدتك اليوم؟",
    defaultResponse: "شكرًا لتواصلك! كيف يمكنني مساعدتك اليوم؟",
  },
};
