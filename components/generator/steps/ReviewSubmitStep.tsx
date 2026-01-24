'use client'

import { useForm } from '@/lib/context/FormContext'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function ReviewSubmitStep() {
  const { formData, resetForm, setCurrentStep } = useForm()
  const [copied, setCopied] = useState(false)

  const jsonString = JSON.stringify(formData, null, 2)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="text-right space-y-6">
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8 text-center">
        <div className="text-4xl mb-2">🎉</div>
        <h2 className="text-2xl font-bold text-green-900">تم تجهيز المواصفات بنجاح!</h2>
        <p className="text-green-700 mt-2">يمكنك الآن نسخ الكود وإرساله إلينا أو الاحتفاظ به.</p>
      </div>

      <div className="relative group">
        <div className="absolute -top-3 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded">JSON SPECIFICATION</div>
        <pre 
          className="bg-gray-900 text-blue-400 p-6 rounded-xl overflow-x-auto text-left font-mono text-sm border-2 border-gray-800 shadow-inner"
          dir="ltr"
        >
          {jsonString}
        </pre>
        <Button
          onClick={copyToClipboard}
          className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 text-white border-white/20"
          variant="outline"
          size="sm"
        >
          {copied ? 'تم النسخ!' : 'نسخ الكود'}
        </Button>
      </div>

      <div className="flex justify-center gap-4 pt-6">
        <Button
          onClick={() => {
            resetForm()
            setCurrentStep(1)
          }}
          variant="outline"
          className="px-8"
        >
          بدء من جديد
        </Button>
        <Button
          onClick={() => window.open(`https://wa.me/966XXXXXXXXX?text=${encodeURIComponent('مرحباً، أود مناقشة هذه المواصفات لمشروعي:\n' + jsonString)}`, '_blank')}
          className="bg-green-600 hover:bg-green-700 text-white px-8"
        >
          إرسال عبر واتساب
        </Button>
      </div>
    </div>
  )
}
