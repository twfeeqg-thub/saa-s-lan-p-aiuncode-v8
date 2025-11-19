// components/OrderForm.tsx

"use client"

import { useState, useEffect } from "react"
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { toast } from "sonner"
import { User, Mail, Sparkles, Briefcase, MessageCircle } from "lucide-react"
import { orderFormContent, type OrderFormContent } from "@/src/config/orderFormConfig"

interface FormData {
  name: string
  service: "new_landing_page" | "integrate_agent" | "full_package"
  projectGoal: string
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
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
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
    let fieldToTrigger: keyof FormData | "contactValue" | undefined;

    if (currentStep === 1) fieldToTrigger = "name";
    if (currentStep === 2) fieldToTrigger = "service";
    if (currentStep === 3) fieldToTrigger = "projectGoal";
    if (currentStep === 4) fieldToTrigger = "contactValue";

    if (fieldToTrigger) {
        isValid = await trigger(fieldToTrigger);
    }

    if (isValid && currentStep < totalSteps) {
      toast(toastMessages[currentStep - 1]);
      setCurrentStep(currentStep + 1)
    }
  }

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    toast.success(toastMessages[3]);
    
    setTimeout(() => {
      router.push("/thank-you")
    }, 1000)
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
    <div
      className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-6"
      dir="rtl"
    >
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-relaxed text-balance">
            {content.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto text-pretty">
            {content.description}
          </p>
        </div>

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

        <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="mt-2">{getStepIcon(1)}</div>
                  <div className="flex-1 space-y-3">
                    <label className="text-lg font-medium text-card-foreground leading-relaxed block">
                      {content.fields.name.label}
                    </label>
                    <Input
                      {...register("name", { required: "لا تخلّي هالحقل فاضي" })}
                      className="text-lg h-14 bg-background border-2 focus:border-primary transition-all"
                      placeholder="اكتب اسمك أو اسم شركتك..."
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                  </div>
                </div>
                <Button type="button" onClick={handleNext} className="w-full h-14 text-lg font-medium">
                  التالي
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="mt-2">{getStepIcon(2)}</div>
                  <div className="flex-1 space-y-3">
                    <label className="text-lg font-medium text-card-foreground leading-relaxed block">
                      {content.fields.service.label}
                    </label>
                    <Controller
                      control={control}
                      name="service"
                      rules={{ required: "لو سمحت، اختر خدمة" }}
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-3 pt-2"
                        >
                          {content.fields.service.options.map((option) => (
                            <Label key={option.value} className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-muted has-[:checked]:border-primary transition-all">
                              <RadioGroupItem value={option.value} />
                              <span>{option.label}</span>
                            </Label>
                          ))}
                        </RadioGroup>
                      )}
                    />
                    {errors.service && <p className="text-sm text-destructive mt-2">{errors.service.message}</p>}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="button" onClick={() => setCurrentStep(1)} variant="outline" className="flex-1 h-14 text-lg">السابق</Button>
                  <Button type="button" onClick={handleNext} className="flex-1 h-14 text-lg font-medium">التالي</Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="mt-2">{getStepIcon(3)}</div>
                  <div className="flex-1 space-y-3">
                    <label className="text-lg font-medium text-card-foreground leading-relaxed block">
                      {content.fields.projectGoal.label}
                    </label>
                    <Textarea
                      {...register("projectGoal", { required: "نحتاج نعرف وش هدفك" })}
                      className="text-lg min-h-32 bg-background border-2 focus:border-primary transition-all resize-none"
                      placeholder="مثال: أبي صفحة لمتجر تمور عشان أزيد مبيعاتي، وأبي وكيل ذكي يرد على استفسارات الزباين..."
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

            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="mt-2">{getStepIcon(4)}</div>
                  <div className="flex-1 space-y-3">
                    <label className="text-lg font-medium text-card-foreground leading-relaxed block">
                      {content.fields.contact.label}
                    </label>
                    
                    <Controller
                      control={control}
                      name="contactMethod"
                      render={({ field }) => (
                        <ToggleGroup
                          type="single"
                          className="w-full grid grid-cols-2 gap-2"
                          value={field.value}
                          onValueChange={(value: 'email' | 'whatsapp') => {
                            if (value) field.onChange(value);
                          }}
                        >
                          {content.fields.contact.types.map((type) => (
                            <ToggleGroupItem key={type.value} value={type.value} className="h-12 text-base">
                              {type.value === 'email' ? <Mail className="ml-2 h-5 w-5" /> : <MessageCircle className="ml-2 h-5 w-5" />}
                              {type.label}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      )}
                    />

                    <Input
                      {...register("contactValue", {
                        required: "عطنا وسيلة التواصل عشان نكلمك",
                        pattern: {
                          value: contactMethod === 'email' 
                            ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                            : /^\+?[0-9\s-]{7,15}$/,
                          message: content.fields.contact.validationMessages[contactMethod]
                        }
                      })}
                      className="text-lg h-14 bg-background border-2 focus:border-primary transition-all"
                      placeholder={content.fields.contact.placeholders[contactMethod]}
                      type={contactMethod === 'email' ? 'email' : 'tel'}
                      key={contactMethod}
                    />
                    {errors.contactValue && <p className="text-sm text-destructive">{errors.contactValue.message}</p>}
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
