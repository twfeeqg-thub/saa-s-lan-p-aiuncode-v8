'use client'
import React, { createContext, useContext, useState, useCallback } from 'react'

export interface FormData {
  sector?: string
  medicalLandingPageSections?: string[]
  medicalAiAssistantKnowledge?: string[]
  medicalPwaFeatures?: string[]
  juiceLandingPageSections?: string[]
  juiceAiAssistantKnowledge?: string[]
  juicePwaFeatures?: string[]
  contactEmail?: string
  contactWhatsapp?: string
  contactOther?: string
  privacyAccepted?: boolean
}

interface FormContextType {
  currentStep: number
  formData: FormData
  setCurrentStep: (step: number) => void
  updateFormData: (data: Partial<FormData>) => void
  getFormData: () => FormData
  resetForm: () => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({})

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }, [])

  const getFormData = useCallback(() => formData, [formData])

  const resetForm = useCallback(() => {
    setFormData({})
    setCurrentStep(1)
  }, [])

  return (
    <FormContext.Provider value={{ currentStep, formData, setCurrentStep, updateFormData, getFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const context = useContext(FormContext)
  if (!context) throw new Error('useForm must be used within FormProvider')
  return context
}
