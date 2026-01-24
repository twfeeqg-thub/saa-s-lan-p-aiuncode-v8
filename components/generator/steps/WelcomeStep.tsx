'use client'
import { useForm } from '@/lib/context/FormContext'
import { Button } from '@/components/ui/button'

export default function WelcomeStep() {
  const { setCurrentStep } = useForm()
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">مرحباً بك</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-900">جاهز تبني بزنس المستقبل؟</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
          هذا الفورم هو خطوتك الأولى لبناء نظام ذكاء صناعي مخصص لعملك. جاوب على الأسئلة بدقة، ونحن نتكفل بالباقي.
        </p>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 my-8">
        <p className="text-lg text-blue-900 font-semibold">aiuncode.com — ذكاء صناعي بلا تعقيد</p>
        <p className="text-sm text-gray-600 mt-2">بناء حلول ذكاء صناعي متقدمة للعاملين بالقطاع الخاص في المملكة العربية السعودية</p>
      </div>
      <div className="flex justify-center pt-8">
        <Button onClick={() => setCurrentStep(2)} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-4 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
          ابدأ الآن
        </Button>
      </div>
    </div>
  )
}
