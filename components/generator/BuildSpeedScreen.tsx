"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ProjectForm() {
  const [formData, setFormData] = useState({
    projectName: "",
    offering: "",
    tagline: "",
    contact: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleBack = () => {
    console.log("Back button clicked")
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name Field */}
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-right block">
              اسم المشروع
            </Label>
            <Input
              id="projectName"
              name="projectName"
              placeholder="مثال: قهوة الأصيل"
              value={formData.projectName}
              onChange={handleChange}
              className="text-right"
              required
            />
          </div>

          {/* Offering Field */}
          <div className="space-y-2">
            <Label htmlFor="offering" className="text-right block">
              ماذا تقدم لعملائك؟
            </Label>
            <Input
              id="offering"
              name="offering"
              placeholder="أجود أنواع البن المختص"
              value={formData.offering}
              onChange={handleChange}
              className="text-right"
              required
            />
          </div>

          {/* Tagline Field */}
          <div className="space-y-2">
            <Label htmlFor="tagline" className="text-right block">
              عبارة قصيرة تلخص مشروعك (اختياري)
            </Label>
            <Input
              id="tagline"
              name="tagline"
              placeholder="أدخل عبارة قصيرة"
              value={formData.tagline}
              onChange={handleChange}
              className="text-right"
            />
          </div>

          {/* Contact Field */}
          <div className="space-y-2">
            <Label htmlFor="contact" className="text-right block">
              وسيلة التواصل (واتساب أو إيميل)
            </Label>
            <Input
              id="contact"
              name="contact"
              placeholder="أدخل رقم الواتساب أو الإيميل"
              value={formData.contact}
              onChange={handleChange}
              className="text-right"
              required
            />
          </div>

          {/* Buttons Section */}
          <div className="flex items-center justify-between gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="px-2 bg-transparent"
              aria-label="العودة للخلف"
            >
              ↩️
            </Button>
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              جاهز للتتويج!
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
