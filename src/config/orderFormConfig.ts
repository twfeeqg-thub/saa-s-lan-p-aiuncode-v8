// src/config/orderFormConfig.ts

export const orderFormContent = {
  welcomeSection: {
    greeting: "يا هلا والله! نورتنا.",
    avatarPlaceholder: "/placeholder-user.jpg", 
  },

  title: "خلّنا نبدأ مشروعك ونخليه حقيقة",
  description: "كم خطوة بس تفصلنا عن إطلاق موقعك الذكي. جاوب هالأسئلة عشان نفهم وش في بالك.",
  
  fields: {
    // السؤال الأول: الهوية
    name: {
      label: "أول شي، وش الاسم اللي تبيه يلمع في واجهة موقعك؟",
      key: "site_name" // مفتاح n8n
    },
    // السؤال الثاني: التخصص
    service: {
      label: "وش مجال شغلك؟ (عشان نختار لك القالب المناسب)",
      options: [
        { value: "clinics", label: "عيادة طبية" },
        { value: "restaurants", label: "مطعم أو مقهى" },
        { value: "training", label: "مدرب / خبير" },
      ],
      key: "sector_id" // مفتاح n8n
    },
    // السؤال الثالث: عرض القيمة
    projectGoal: {
      label: "لو جاك زبون وقال لك: ليش أتعامل معك؟ وش الكلمتين اللي بتقولهم له؟",
      key: "hero_title" // مفتاح n8n
    },
    // السؤال الرابع: التواصل
    contact: {
      label: "وآخر شي، كيف تبغانا نتواصل معك؟",
      types: [
        { value: "whatsapp", label: "واتساب" },
        { value: "email", label: "إيميل" },
      ],
      key: "contact",
      placeholders: {
        whatsapp: "اكتب رقم واتساب حقك...",
        email: "اكتب إيميلك هنا...",
      }
    },
  },
  
  submitButtonText: "أرسل طلبي الحين",
  
  progressMessages: {
    step1: "خلنا نتعرف على براندك...",
    step2: "نحدد القالب المناسب...",
    step3: "نصيغ عرضك القوي...",
    step4: "خلاص قرّبنا نخلص!",
  },
  
  toastMessages: {
    step1: "كفو! اللي بعده...",
    step2: "حلو! الحين نبي التميز.",
    step3: "باقي خطوة وحدة بس!",
    step4: "وصل طلبك! ريّح بالك وخلّ الباقي علينا.",
  },

  finalCelebrationMessage: "وصل طلبك بنجاح، والآن ريّح بالك وخلّ التعقيدات الباقية علينا وبنتواصل معك قريب",
};

export type OrderFormContent = typeof orderFormContent;
