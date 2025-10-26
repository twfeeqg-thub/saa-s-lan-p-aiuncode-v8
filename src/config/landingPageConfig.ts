// ملف الإعدادات المركزي لصفحة الهبوط
// يحتوي على جميع المحتوى والبيانات للصفحة

export const config = {
  // التحكم في إظهار وإخفاء الأقسام
  sections: {
    hero: true,
    painPoints: true,
    solution: true,
    finalCta: true,
    faq: true,
    footer: true,
    smartAmbassador: true,
  },

  // الشريط العلوي
  header: {
    logo: {
      tagline: "ذكاء صناعي بلا تعقيد",
    },
    loginButton: {
      text: "تسجيل الدخول",
      link: "/login",
    },
  },

  // القسم العلوي (Hero)
  hero: {
    // دعم متغيرات A/B للعناوين الرئيسية
    title: {
      variantA: "توقف عن خسارة عملائك... أطلق موقعك الذكي في 7 أيام فقط!",
      variantB: "هل أنت جاهز لمضاعفة مبيعاتك؟ موقعك الذكي جاهز في أسبوع!",
      variantC: "حوّل زوارك إلى عملاء... بوكيل ذكاء اصطناعي يتحدث لهجتهم.",
      // المتغير النشط حالياً
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

  // قسم نقاط الألم
  painPoints: {
    title: "هل تشعر بهذا كل يوم؟",
    points: [
      { text: "تغرق في رسائل متكررة؟", solutionHint: "(وكيل AI يرد نيابة عنك 24/7)" },
      { text: "تخسر عملاء لعدم الرد الفوري؟", solutionHint: "(يزيد مبيعاتك بنسبة تصل إلى 15%)" },
      { text: "التكنولوجيا تبدو معقدة ومكلفة؟", solutionHint: "(نبني كل شيء في 7 أيام دون جهد منك)" },
    ],
  },

  // قسم الحل والدليل الاجتماعي
  solution: {
    title: "الحل البسيط: مشروعك جاهز في 3 خطوات",
    steps: [{ text: "1. نستمع لرؤيتك" }, { text: "2. نبني موقعك + AI" }, { text: "3. تدير من جوالك" }],
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

  // قسم الدعوة النهائية والأسعار
  finalCta: {
    title: "جرب الآن وابدأ رحلتك!",
    pricing: {
      plans: [
        {
          name: "باقة الانطلاق",
          price: "500",
          currency: "ريال/شهريًا",
          features: ["صفحة هبوط احترافية", "وكيل AI أساسي"],
        },
        {
          name: "باقة النمو",
          price: "900",
          currency: "ريال/شهريًا",
          features: ["موقع متعدد الصفحات", "وكيل AI متقدم", "تكامل واتساب"],
        },
      ],
      guaranteeText: "ضمان استرداد الأموال لمدة 30 يومًا",
    },
    finalCtaButton: {
      text: "احجز عرضك المجاني قبل نفاذه",
    },
  },

  // قسم الأسئلة الشائعة
  faq: {
    triggerText: "أسئلة تدور في ذهنك؟",
    questions: [
      { question: "هل أحتاج إلى خبرة تقنية؟", answer: "لا إطلاقًا. نحن نهتم بكل الجوانب التقنية." },
      { question: "ما هي اللهجات التي يدعمها الوكيل؟", answer: "ندعم حاليًا اللهجة السعودية، الإماراتية، والكويتية." },
      { question: "هل يمكنني تحديث المحتوى بنفسي؟", answer: "نعم، نوفر لك لوحة تحكم سهلة." },
    ],
  },

  // الفوتر (الذيل)
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

  // إعدادات السفير الذكي
  smartAmbassador: {
    buttonLabel: "تحدث معنا",
    chatTitle: "السفير الذكي",
    placeholder: "اكتب رسالتك هنا...",
    sendButton: "إرسال",
    welcomeMessage: "مرحباً! كيف يمكنني مساعدتك اليوم؟",
    defaultResponse: "شكرًا لتواصلك! كيف يمكنني مساعدتك اليوم؟",
  },
}

export type Config = typeof config
