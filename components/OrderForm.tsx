// components/OrderForm.tsx

"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
// ملاحظة: هذه الاستيرادات قد تفشل إذا لم يتم تثبيت المكونات بعد
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
// --- بداية التعديل ---
// 1. حذف استيراد useToast القديم
// import { useToast } from "@/components/ui/use-toast"
// 2. إضافة استيراد toast من sonner
import { toast } from "sonner"
// --- نهاية التعديل ---
import { User, Mail, Sparkles, Briefcase } from "lucide-react"
import { orderFormContent, type OrderFormContent } from "@/src/config/orderFormConfig"

// تعريف نوع البيانات التي سيتم جمعها من الفورم
interface FormData {
  name: string
  service: "new_landing_page" | "integrate_agent" | "full_package"
  projectGoal: string
  contact: string
}

export default function OrderForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm<FormData>()
  const router = useRouter()
  // 3. حذف استدعاء hook الـ useToast
  // const { toast } = useToast()

  const content: OrderFormContent = orderFormContent
  const totalSteps = 4

  const progressMessages = [
    content.progressMessages.step1,
    content.progressMessages.step2,
    content.progressMessages.step3,
    content.progressMessages.step4,
  ]

  const toastMessages = [
    content.toastMessages.step1,
    content.toastMessages.step2,
    content.toastMessages.step3,
    content.toastMessages.step4,
  ]

  const handleNext = async () => {
    let isValid = false
    let fieldToTrigger: keyof FormData | undefined;

    if (currentStep === 1) fieldToTrigger = "name";
    if (currentStep === 2) fieldToTrigger = "service";
    if (currentStep === 3) fieldToTrigger = "projectGoal";

    if (fieldToTrigger) {
        isValid = await trigger(fieldToTrigger);
    }

    if (isValid && currentStep < totalSteps) {
      // 4. تعديل استدعاء toast ليناسب صيغة sonner
      toast(toastMessages[currentStep - 1]);
      setCurrentStep(currentStep + 1)
    }
  }

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    // 4. تعديل استدعاء toast ليناسب صيغة sonner (استخدام .success للون الأخضر)
    toast.success(toastMessages[3]);
    
    // لاحقاً، سنستبدل هذا بالربط الفعلي (إرسال إيميل، الخ)
    setTimeout(() => {
      router.push("/thank-you")
    }, 1000) // تم زيادة المدة قليلاً لترى الرسالة بوضوح
  }

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <User className="w-8 h-8 text-primary" />
      case 2: return <Briefcase className="w-8 h-8 text-primary" />
      case 3: return <Sparkles className="w-8 h-8 text-primary" />
      case 4: return <Mail className="w-8 h-8 text-primary" />
      default: return null
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-6"
      dir="rtl"
    >
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-relaxed text-balance">
            {content.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto text-pretty">
            {content.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              الخطوة {currentStep} من {totalSteps}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-primary to-secondary transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <p className="text-center mt-4 text-sm text-primary font-medium animate-fade-in">
            {progressMessages[currentStep - 1]}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Step 1: Name */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="mt-2">{getStepIcon(1)}</div>
                  <div className="flex-1 space-y-3">
                    <label className="text-lg font-medium text-card-foreground leading-relaxed block">
                      {content.fields.name.label}
                    </label>
                    <Input
                      {...register("name", { required: "هذا الحقل مطلوب" })}
                      className="text-lg h-14 bg-background border-2 focus:border-primary transition-all"
                      placeholder="اكتب اسمك أو اسم شركتك هنا..."
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                  </div>
                </div>
                <Button type="button" onClick={handleNext} className="w-full h-14 text-lg font-medium">
                  التالي
                </Button>
              </div>
            )}

            {/* Step 2: Service Selection */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="mt-2">{getStepIcon(2)}</div>
                  <div className="flex-1 space-y-3">
                    <label className="text-lg font-medium text-card-foreground leading-relaxed block">
                      {content.fields.service.label}
                    </label>
                    <RadioGroup
                      {...register("service", { required: "الرجاء اختيار خدمة" })}
                      onValueChange={(value) => setValue("service", value as FormData["service"], { shouldValidate: true })}
                      className="space-y-3 pt-2"
                      value={watch("service")}
                    >
                      {content.fields.service.options.map((option) => (
                        <Label key={option.value} className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-muted has-[:checked]:border-primary transition-all">
                          <RadioGroupItem value={option.value} />
                          <span>{option.label}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                    {errors.service && <p className="text-sm text-destructive mt-2">{errors.service.message}</p>}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="button" onClick={() => setCurrentStep(1)} variant="outline" className="flex-1 h-14 text-lg">السابق</Button>
                  <Button type="button" onClick={handleNext} className="flex-1 h-14 text-lg font-medium">التالي</Button>
                </div>
              </div>
            )}

            {/* Step 3: Project Goal */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="mt-2">{getStepIcon(3)}</div>
                  <div className="flex-1 space-y-3">
                    <label className="text-lg font-medium text-card-foreground leading-relaxed block">
                      {content.fields.projectGoal.label}
                    </label>
                    <Textarea
                      {...register("projectGoal", { required: "هذا الحقل مطلوب" })}
                      className="text-lg min-h-32 bg-background border-2 focus:border-primary transition-all resize-none"
                      placeholder="مثال: أريد صفحة هبوط لمتجر تمور لزيادة المبيعات، وأحتاج وكيل ذكي للرد على استفسارات الأسعار والشحن."
                    />
                    {errors.projectGoal && <p className="text-sm text-destructive">{errors.projectGoal.message}</p>}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="button" onClick={() => setCurrentStep(2)} variant="outline" className="flex-1 h-14 text-lg">السابق</Button>
                  <Button type="button" onClick={handleNext} className="flex-1 h-14 text-lg font-medium">التالي</Button>
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="mt-2">{getStepIcon(4)}</div>
                  <div className="flex-1 space-y-3">
                    <label className="text-lg font-medium text-card-foreground leading-relaxed block">
                      {content.fields.contact.label}
                    </label>
                    <Input
                      {...register("contact", { 
                        required: "هذا الحقل مطلوب",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "الرجاء إدخال بريد إلكتروني صالح"
                        }
                      })}
                      className="text-lg h-14 bg-background border-2 focus:border-primary transition-all"
                      placeholder="بريدك الإلكتروني..."
                      type="email"
                    />
                    {errors.contact && <p className="text-sm text-destructive">{errors.contact.message}</p>}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="button" onClick={() => setCurrentStep(3)} variant="outline" className="flex-1 h-14 text-lg">السابق</Button>
                  <Button type="submit" className="flex-1 h-14 text-lg font-medium bg-gradient-to-l from-primary to-secondary hover:opacity-90">
                    {content.submitButtonText}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === currentStep ? "w-12 bg-primary" : step < currentStep ? "w-8 bg-secondary" : "w-8 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
