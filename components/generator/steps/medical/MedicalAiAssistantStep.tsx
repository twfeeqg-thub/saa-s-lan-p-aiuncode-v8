'use client'
import React from 'react'
import { useForm } from '@/lib/context/FormContext'
import { Button } from '@/components/ui/button'

export default function MedicalAiAssistantStep() {
  const { setCurrentStep } = useForm()
  return (
    <div className="text-right space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">مساعد الطبيب الذكي</h2>
      <p className="text-gray-600">برمجة الردود الآلية لحجز المواعيد والاستفسارات الطبية.</p>
      <div className="flex justify-between pt-8">
        <Button onClick={() => setCurrentStep(3)} variant="outline">رجوع</Button>
        <Button onClick={() => setCurrentStep(5)} className="bg-blue-600 text-white">التالي</Button>
      </div>
    </div>
  )
}
