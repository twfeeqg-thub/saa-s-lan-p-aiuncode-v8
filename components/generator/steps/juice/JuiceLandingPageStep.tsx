'use client'
import { useForm } from '@/lib/context/FormContext'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

const mandatory = ['Header', 'Hero Section', 'القائمة/المنتجات', 'الميزات التنافسية', 'Call To Action', 'FAQ', 'Footer']
const optional = ['Testimonials', 'إحصاءات', 'عن المحل', 'الأسعار/الباقات', 'Gallery', 'المدونة']

export default function JuiceLandingPageStep() {
  const { setCurrentStep, updateFormData, formData } = useForm()
  const [selected, setSelected] = useState<string[]>(formData.juiceLandingPageSections || [...mandatory])

  const toggleSection = (s: string) => {
    if (mandatory.includes(s)) return
    setSelected(prev => prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s])
  }

  return (
    <div className="text-right space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">أقسام صفحة هبوط العصائر</h2>
      <div className="grid grid-cols-1 gap-2">
        {[...mandatory, ...optional].map(s => (
          <div key={s} onClick={() => toggleSection(s)} className={`p-3 rounded-lg border cursor-pointer ${selected.includes(s) ? 'bg-blue-50 border-blue-600' : 'bg-gray-50'}`}>
            {s} {mandatory.includes(s) && <span className="text-xs text-gray-400">(إلزامي)</span>}
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-4">
        <Button onClick={() => setCurrentStep(2)} variant="outline">رجوع</Button>
        <Button onClick={() => { updateFormData({ juiceLandingPageSections: selected }); setCurrentStep(7); }} className="bg-blue-600 text-white">التالي</Button>
      </div>
    </div>
  )
}
