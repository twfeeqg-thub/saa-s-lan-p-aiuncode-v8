'use client'
import { useForm } from '@/lib/context/FormContext'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const sectors = [
  { id: 'medical', label: 'الصحة والعيادات الخاصة (تجميلية / أسنان)', icon: '🏥' },
  { id: 'juice', label: 'المطاعم والمقاهي ومحلات العصائر', icon: '🥤' },
  { id: 'retail', label: 'التجزئة والمتاجر الإلكترونية', icon: '🛍️' },
  { id: 'services', label: 'الخدمات المهنية', icon: '💼' },
  { id: 'education', label: 'التعليم الخاص', icon: '📚' },
  { id: 'real_estate', label: 'العقارات', icon: '🏠' },
  { id: 'cars', label: 'السيارات', icon: '🚗' },
]

export default function SectorSelectionStep() {
  const { setCurrentStep, updateFormData, formData } = useForm()
  const [selected, setSelected] = useState(formData.sector || '')
  const handleNext = () => {
    if (!selected) return
    updateFormData({ sector: selected })
    if (selected === 'medical') { setCurrentStep(3) } 
    else if (selected === 'juice') { setCurrentStep(6) } 
    else { setCurrentStep(10) }
  }
  return (
    <div className="text-right space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">في أي قطاع يعمل مشروعك؟</h2>
      <div className="space-y-3">
        {sectors.map(sector => (
          <div key={sector.id}>
            <input type="radio" id={sector.id} name="sector" value={sector.id} checked={selected === sector.id} onChange={e => setSelected(e.target.value)} className="hidden" />
            <label htmlFor={sector.id} className={`flex items-center justify-end gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${selected === sector.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:border-blue-300'}`}>
              <span className="text-lg font-medium text-gray-800">{sector.label}</span>
              <span className="text-3xl">{sector.icon}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-8">
        <Button onClick={() => setCurrentStep(1)} variant="outline">رجوع</Button>
        <Button onClick={handleNext} disabled={!selected} className="bg-blue-600 text-white px-6">التالي</Button>
      </div>
    </div>
  )
}
