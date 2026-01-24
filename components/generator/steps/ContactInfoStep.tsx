'use client'
import { useForm } from '@/lib/context/FormContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function ContactInfoStep() {
  const { setCurrentStep, updateFormData, formData } = useForm()
  const [email, setEmail] = useState(formData.contactEmail || '')
  const [whatsapp, setWhatsapp] = useState(formData.contactWhatsapp || '')
  const [other, setOther] = useState(formData.contactOther || '')
  const handleNext = () => {
    if (!email && !whatsapp && !other) return
    updateFormData({ contactEmail: email, contactWhatsapp: whatsapp, contactOther: other })
    setCurrentStep(11)
  }
  return (
    <div className="text-right space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">كيف يمكننا التواصل معك لإرسال النتائج؟</h2>
      <div className="space-y-4">
        <div>
          <Label className="text-right block mb-2">البريد الإلكتروني</Label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="text-right" dir="ltr" />
        </div>
        <div>
          <Label className="text-right block mb-2">رقم الواتساب</Label>
          <Input type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="text-right" dir="ltr" />
        </div>
      </div>
      <div className="flex justify-between pt-8">
        <Button onClick={() => setCurrentStep(2)} variant="outline">رجوع</Button>
        <Button onClick={handleNext} className="bg-blue-600 text-white px-6">التالي</Button>
      </div>
    </div>
  )
}
