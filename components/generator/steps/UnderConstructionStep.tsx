'use client'
import { useForm } from '@/lib/context/FormContext'
import { Button } from '@/components/ui/button'

export default function UnderConstructionStep() {
  const { setCurrentStep } = useForm()
  return (
    <div className="text-center space-y-6">
      <div className="text-6xl">🛠️</div>
      <h2 className="text-2xl font-bold text-gray-800">هذا الجزء قيد التطوير</h2>
      <p className="text-gray-600">نحن نعمل على إضافة هذا القطاع قريباً.</p>
      <Button onClick={() => setCurrentStep(2)} variant="outline">العودة للاختيار</Button>
    </div>
  )
}
