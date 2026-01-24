'use client'

import { useForm } from '@/lib/context/FormContext'
import WelcomeStep from './steps/WelcomeStep'
import SectorSelectionStep from './steps/SectorSelectionStep'
import MedicalLandingPageStep from './steps/medical/MedicalLandingPageStep'
import MedicalAiAssistantStep from './steps/medical/MedicalAiAssistantStep'
import MedicalPwaStep from './steps/medical/MedicalPwaStep'
import JuiceLandingPageStep from './steps/juice/JuiceLandingPageStep'
import JuiceAiAssistantStep from './steps/juice/JuiceAiAssistantStep'
import JuicePwaStep from './steps/juice/JuicePwaStep'
import ContactInfoStep from './steps/ContactInfoStep'
import UnderConstructionStep from './steps/UnderConstructionStep'
import ReviewSubmitStep from './steps/ReviewSubmitStep'

export default function FormContainer() {
  const { currentStep } = useForm()

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <WelcomeStep />
      case 2: return <SectorSelectionStep />
      case 3: return <MedicalLandingPageStep />
      case 4: return <MedicalAiAssistantStep />
      case 5: return <MedicalPwaStep />
      case 6: return <JuiceLandingPageStep />
      case 7: return <JuiceAiAssistantStep />
      case 8: return <JuicePwaStep />
      case 9: return <ContactInfoStep />
      case 10: return <UnderConstructionStep />
      case 11: return <ReviewSubmitStep />
      default: return <WelcomeStep />
    }
  }

  const getProgressPercentage = () => (currentStep / 11) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">aiuncode</h1>
          <p className="text-gray-600">منشئ مواصفات الذكاء الاصطناعي</p>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">الخطوة {currentStep} من 11</span>
            <span className="text-sm font-semibold">{Math.round(getProgressPercentage())}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${getProgressPercentage()}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10">{renderStep()}</div>
      </div>
    </div>
  )
}
