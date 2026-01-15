"use client"

import { useState, useEffect } from "react"
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { User, Mail, Sparkles, Briefcase, MessageCircle, Loader2 } from "lucide-react"
import { orderFormContent, type OrderFormContent } from "@/src/config/orderFormConfig"
import { CelebrationOverlay } from "./CelebrationOverlay"
// استيراد supabase من المسار الخاص بك
import { supabase } from "@/lib/supabaseClient"

interface FormData {
  site_name: string
  sector_id: string
  hero_title: string
  contactMethod: 'email' | 'whatsapp'
  contactValue: string
}

export default function OrderFormWrapper() {
  const methods = useForm<FormData>({
    defaultValues: {
      contactMethod: 'whatsapp',
    }
  });
  return (
    <FormProvider {...methods}>
      <OrderForm />
    </FormProvider>
  );
}

function OrderForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [celebration, setCelebration] = useState<{
    stage: 'hidden' | 'intermediate' | 'final';
    message: string;
  }>({ stage: 'hidden', message: '' });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    unregister,
  } = useFormContext<FormData>()
  const router = useRouter()

  const contactMethod = watch('contactMethod');

  useEffect(() => {
    unregister('contactValue');
  }, [contactMethod, unregister]);

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

    if (currentStep === 1) fieldToTrigger = "site_name";
    if (currentStep === 2) fieldToTrigger = "sector_id";
    if (currentStep === 3) fieldToTrigger = "hero_title";

    if (fieldToTrigger) {
        isValid = await trigger(fieldToTrigger);
    }

    if (isValid && currentStep < totalSteps) {
      setCelebration({ stage: 'intermediate', message: toastMessages[currentStep - 1] });
    }
  }

  // --- التعديل الجراحي هنا: منطق الإرسال لـ Supabase ---
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // تجميع البيانات في الهيكل الذي يفهمه n8n
    const submissionData = {
      site_name: data.site_name,
      sector_id: data.sector_id,
      hero_title: data.hero_title,
      contact: {
        type: data.contactMethod,
        value: data.contactValue
      },
      submitted_at: new Date().toISOString()
    };

    try {
      const { error } = await supabase
        .from('client_orders')
        .insert([{ full_submission: submissionData }]);

      if (error) throw error;

      setCelebration({ stage: 'final', message: content.finalCelebrationMessage });
    } catch (error) {
      console.error("Submission error:", error);
      alert("عذراً، حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCelebrationComplete = () => {
    if (celebration.stage === 'intermediate') {
      setCurrentStep(currentStep + 1);
    }
    if (celebration.stage === 'final') {
      router.push("/thank-you");
    }
    setCelebration({ stage: 'hidden', message: '' });
  }

  const getStepIcon = (step: number) => {
    if (step === 4) {
      return contactMethod === 'email' 
        ? <Mail className="w-8 h-8 text-primary" /> 
        : <MessageCircle className="w-8 h-8 text-primary" />;
    }
    switch (step) {
      case 1: return <User className="w-8 h-8 text-primary" />
      case 2: return <Briefcase className="w-8 h-8 text-primary" />
      case 3: return <Sparkles className="w-8 h-8 text-primary" />
      default: return null
    }
  }

  return (
    <>
      <CelebrationOverlay
        stage={celebration.stage}
        message={celebration.message}
        onComplete={handleCelebrationComplete}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-6" dir="rtl">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8 animate-fade-in">
            <Image
              src={content.welcomeSection.avatarPlaceholder}
              alt="User Avatar"
              width={80}
              height={80}
              className="rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
            />
            <p className="text-2xl font-bold text-foreground">{content.welcomeSection.greeting}</p>
          </div>

          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-relaxed">{content.title}</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{content.description}</p>
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">الخطوة {currentStep} من {totalSteps}</span>
              <span className="text-sm font-medium text-primary">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-l from-primary to-secondary transition-all duration-500" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
            </div>
            <p className="text-center mt-4 text-sm text-primary font-medium">{progressMessages[currentStep - 1]}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-start gap-4">
                    <div className="mt-2">{getStepIcon(1)}</div>
                    <div className="flex-1 space-y-3">
                      <label className="text-lg font-medium block">{content.fields.name.label}</label>
                      <Input
                        {...register("site_name", { required: "لا تخلّي هالحقل فاضي" })}
                        className="text-lg h-14 bg-background border-2"
                        placeholder="اكتب اسمك أو اسم شركتك..."
                      />
                      {errors.site_name && <p className="text-sm text-destructive">{errors.site_name.message}</p>}
                    </div>
                  </div>
                  <Button type="button" onClick={handleNext} className="w-full h-14 text-lg">التالي</Button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-start gap-4">
                    <div className="mt-2">{getStepIcon(2)}</div>
                    <div className="flex-1 space-y-3">
                      <label className="text-lg font-medium block">{content.fields.service.label}</label>
                      <Controller
                        control={control}
                        name="sector_id"
                        rules={{ required: "لو سمحت، اختر مجال شغلك" }}
                        render={({ field }) => (
                          <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3 pt-2">
                            {content.fields.service.options.map((option) => (
                              <Label key={option.value} className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted transition-all">
                                <RadioGroupItem value={option.value} />
                                <span>{option.label}</span>
                              </Label>
                            ))}
                          </RadioGroup>
                        )}
                      />
                      {errors.sector_id && <p className="text-sm text-destructive mt-2">{errors.sector_id.message}</p>}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button type="button" onClick={() => setCurrentStep(1)} variant="outline" className="flex-1 h-14">السابق</Button>
                    <Button type="button" onClick={handleNext} className="flex-1 h-14">التالي</Button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-start gap-4">
                    <div className="mt-2">{getStepIcon(3)}</div>
                    <div className="flex-1 space-y-3">
                      <label className="text-lg font-medium block">{content.fields.projectGoal.label}</label>
                      <Textarea
                        {...register("hero_title", { required: "نحتاج نعرف وش اللي يميزك" })}
                        className="text-lg min-h-32 bg-background border-2 resize-none"
                        placeholder="اكتب جملة قوية تجذب زبائنك..."
                      />
                      {errors.hero_title && <p className="text-sm text-destructive">{errors.hero_title.message}</p>}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button type="button" onClick={() => setCurrentStep(2)} variant="outline" className="flex-1 h-14">السابق</Button>
                    <Button type="button" onClick={handleNext} className="flex-1 h-14">التالي</Button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-start gap-4">
                    <div className="mt-2">{getStepIcon(4)}</div>
                    <div className="flex-1 space-y-3">
                      <label className="text-lg font-medium block">{content.fields.contact.label}</label>
                      <Controller
                        control={control}
                        name="contactMethod"
                        render={({ field }) => (
                          <ToggleGroup type="single" className="w-full grid grid-cols-2 gap-2" value={field.value} onValueChange={(val: 'email' | 'whatsapp') => val && field.onChange(val)}>
                            {content.fields.contact.types.map((type) => (
                              <ToggleGroupItem key={type.value} value={type.value} className="h-12">
                                {type.value === 'email' ? <Mail className="ml-2 h-5 w-5" /> : <MessageCircle className="ml-2 h-5 w-5" />}
                                {type.label}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        )}
                      />
                      <Input
                        {...register("contactValue", {
                          required: "عطنا وسيلة التواصل",
                          pattern: {
                            value: contactMethod === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/ : /^\+?[0-9\s-]{7,15}$/,
                            message: "تأكد من صحة البيانات"
                          }
                        })}
                        className="text-lg h-14 bg-background border-2"
                        placeholder={content.fields.contact.placeholders[contactMethod]}
                        type={contactMethod === 'email' ? 'email' : 'tel'}
                      />
                      {errors.contactValue && <p className="text-sm text-destructive">{errors.contactValue.message}</p>}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button type="button" onClick={() => setCurrentStep(3)} variant="outline" className="flex-1 h-14">السابق</Button>
                    <Button type="submit" disabled={isSubmitting} className="flex-1 h-14 text-lg font-medium bg-gradient-to-l from-primary to-secondary">
                      {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : content.submitButtonText}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

