// src/config/orderFormConfig.ts

export const orderFormContent = {
  // العنوان الرئيسي
  title: "خلّنا نبدأ مشروعك ونخليه حقيقة",
  // الوصف
  description: "كم خطوة بس تفصلنا عن إطلاق موقعك الذكي. جاوب هالأسئلة عشان نفهم وش في بالك.",
  
  // الحقول والأسئلة
  fields: {
    name: {
      label: "أول شي، وش اسمك أو اسم شركتك؟",
    },
    service: {
      label: "وش الخدمة اللي بخاطرك فيها؟",
      options: [
        { value: "new_landing_page", label: "أبي صفحة هبوط جديدة" },
        { value: "integrate_agent", label: "أبي أركّب وكيل ذكي على موقعي الحالي" },
        { value: "full_package", label: "أبي صفحة هبوط مع وكيل ذكي جاهزة" },
      ],
    },
    projectGoal: {
      label: "علّمنا عن مشروعك والهدف اللي تبي توصله.",
    },
    contact: {
      label: "وآخر شي، كيف تبغانا نتواصل معك؟",
      types: [
        { value: "whatsapp", label: "واتساب" },
        { value: "email", label: "إيميل" },
      ],
      placeholders: {
        whatsapp: "اكتب رقم واتساب حقك...",
        email: "اكتب إيميلك هنا...",
      },
      validationMessages: {
        whatsapp: "تأكد من رقم الواتساب، شكله غير صحيح",
        email: "تأكد من الإيميل، شكله غير صحيح",
      }
    },
  },
  
  // النصوص والأزرار
  submitButtonText: "أرسل طلبي الحين",
  
  // رسائل شريط التقدم
  progressMessages: {
    step1: "خلنا نتعرف عليك...",
    step2: "حدد وش تبي بالضبط...",
    step3: "سولف لنا عن فكرتك...",
    step4: "خلاص قرّبنا نخلص!",
  },
  
  // رسائل التنبيه (Toast) - هذه الرسائل لن تستخدم كـ toast بعد الآن بل كرسائل في CelebrationOverlay
  toastMessages: {
    step1: "كفو! اللي بعده...",
    step2: "حلو! الحين عطنا تفاصيل مشروعك.",
    step3: "باقي خطوة وحدة بس!",
    step4: "وصل طلبك! بنتواصل معك قريب.", // هذه الرسالة لن تظهر كـ toast بل كجزء من الاحتفال النهائي
  },

  // الرسالة الاحتفالية النهائية
  finalCelebrationMessage: "وصل طلبك بنجاح، والآن ريّح بالك وخلّ التعقيدات الباقية علينا وبنتواصل معك قريب",
};

export type OrderFormContent = typeof orderFormContent;
