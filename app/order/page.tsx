'use client'

import { FormProvider } from "@/lib/context/FormContext"
import FormContainer from "@/components/generator/FormContainer"

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <FormProvider>
        <FormContainer />
      </FormProvider>
    </main>
  )
}
