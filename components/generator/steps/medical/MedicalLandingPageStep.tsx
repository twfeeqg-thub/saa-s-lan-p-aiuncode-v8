'use client'
import React, { useState } from 'react'
import { useForm } from '@/lib/context/FormContext'
import { Button } from '@/components/ui/button'

export default function MedicalLandingPageStep() {
  const { setCurrentStep } = useForm()
  return (
    <div className="text-right space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">تخصيص العيادة الطبية</h2>
      <p className="text-gray-600">نحن الآن نجهز أقسام صفحة الهبوط الخاصة بعيادتك.</p>
      <div className="flex justify-between pt-8">
        <Button onClick={() => setCurrentStep(2)} variant="outline">رجوع</Button>
        <Button onClick={() => setCurrentStep(4)} className="bg-blue-600 text-white">التالي</Button>
      </div>
    </div>
  )
}
