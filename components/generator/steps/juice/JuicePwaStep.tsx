'use client'
import { useForm } from '@/lib/context/FormContext'
import { Button } from '@/components/ui/button'

export default function JuicePwaStep() {
  const { setCurrentStep } = useForm()
  return (
    <div className="text-right space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">تطبيق الولاء (PWA)</h2>
      <p className="text-gray-600">ميزات الطلب المسبق وتتبع النقاط لعملاء العصائر والمشروبات.</p>
      <div className="flex justify-between pt-8">
        <Button onClick={() => setCurrentStep(7)} variant="outline">رجوع</Button>
        <Button onClick={() => setCurrentStep(9)} className="bg-blue-600 text-white">التالي</Button>
      </div>
    </div>
  )
}
