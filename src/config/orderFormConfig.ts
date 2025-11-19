// src/config/orderFormConfig.ts

export const orderFormContent = {
  title: "لنبدأ مشروعك ونحوله إلى واقع",
  description: "خطوات قليلة تفصلنا عن إطلاق موقعك الذكي. أجب عن الأسئلة التالية لنفهم رؤيتك.",
  fields: {
    name: {
      label: "أولاً، ما هو اسمك أو اسم شركتك؟",
    },
    service: {
      label: "ما هي الخدمة الأساسية التي تحتاجها؟",
      options: [
        { value: "new_landing_page", label: "بناء صفحة هبوط جديدة" },
        { value: "integrate_agent", label: "دمج وكيل ذكي في موقعي الحالي" },
        { value: "full_package", label: "بناء صفحة هبوط مع وكيل ذكي مدمج" },
      ],
    },
    projectGoal: {
      label: "صف لنا مشروعك والهدف الذي تسعى لتحقيقه.",
    },
    contact: {
      label: "أخيراً، ما هو أفضل بريد إلكتروني للتواصل معك؟",
    },
  },
  submitButtonText: "أرسل طلبي الآن",
  progressMessages: {
    step1: "لنتعرف عليك...",
    step2: "حدد هدفك الرئيسي...",
    step3: "شاركنا رؤيتك...",
    step4: "على وشك الانتهاء!",
  },
  toastMessages: {
    step1: "ممتاز! الخطوة التالية...",
    step2: "رائع! الآن صف لنا مشروعك.",
    step3: "خطوة أخيرة وننتهي!",
    step4: "تم الإرسال بنجاح! سنتواصل معك قريباً.",
  },
};

export type OrderFormContent = typeof orderFormContent;
