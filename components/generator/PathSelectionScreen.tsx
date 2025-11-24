"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Zap, Palette, Briefcase, Sparkles } from "lucide-react"

export default function ProjectSetupPanel() {
  const [selectedCategory, setSelectedCategory] = useState("تجارة إلكترونية")
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  const categories = ["تجارة إلكترونية", "مطعم", "خدمات", "عقارات"]

  const paths = [
    {
      id: "speed",
      title: "أبي شي سريع",
      description: "موقع جاهز بـ 4 أسئلة بس.",
      icon: Zap,
    },
    {
      id: "creativity",
      title: "أبي أختار الألوان",
      description: "تحكم كامل بالهوية البصرية.",
      icon: Palette,
    },
    {
      id: "professional",
      title: "عندي المحتوى جاهز",
      description: "ارفع ملفاتك وانطلق.",
      icon: Briefcase,
    },
    {
      id: "special",
      title: "أبي شي سبيشل",
      description: "تواصل معنا لطلباتك الخاصة.",
      icon: Sparkles,
      isSpecial: true,
    },
  ]

  return (
    <div dir="rtl" className="flex h-screen bg-white">
      {/* Left Panel - Control Panel */}
      <div className="w-2/5 bg-gray-50 p-8 overflow-y-auto">
        {/* Heading 1 */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">مشروعك وش مجاله؟</h2>

        {/* Chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Heading 2 */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">اختر مسارك:</h2>

        {/* Cards Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          {paths.map((path) => {
            const IconComponent = path.icon
            const isSelected = selectedPath === path.id

            return (
              <Card
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  path.isSpecial
                    ? "border-2 border-transparent bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-lg hover:scale-105"
                    : "border border-gray-200 hover:shadow-md hover:scale-105"
                } ${isSelected && !path.isSpecial ? "ring-2 ring-gray-900" : ""}`}
                style={
                  path.isSpecial
                    ? {
                        borderImage: "linear-gradient(135deg, #a78bfa, #60a5fa) 1",
                      }
                    : {}
                }
              >
                <div className="flex flex-col items-center text-center">
                  <IconComponent className="w-8 h-8 text-gray-700 mb-3" />
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{path.title}</h3>
                  <p className="text-xs text-gray-600">{path.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="w-3/5 bg-white flex items-center justify-center border-r border-gray-200">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-lg mb-4 mx-auto flex items-center justify-center">
            <span className="text-4xl">👁️</span>
          </div>
          <p className="text-gray-500 text-lg font-medium">Live Preview</p>
          <p className="text-gray-400 text-sm">سيظهر معاينة الموقع هنا</p>
        </div>
      </div>
    </div>
  )
}
