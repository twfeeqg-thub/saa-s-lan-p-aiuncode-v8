"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LinkIcon, Copy, Calendar } from "lucide-react"
import { useState } from "react"

export default function FinaleScreen() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("your-project.aiuncode.site")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-2xl rtl:direction-rtl" dir="rtl">
        <div className="flex flex-col gap-8">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
              عفية عليك! 🎉
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 font-medium">حلمك صار تحفة فنية جاهزة.</p>
          </div>

          {/* Deployment Screenshot Card */}
          <Card className="overflow-hidden shadow-xl bg-white dark:bg-slate-800 border-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 p-4 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-sm text-slate-400">your-project.aiuncode.site</p>
              <div></div>
            </div>

            {/* Website Preview */}
            <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 min-h-96 flex items-center justify-center overflow-hidden">
              <img src="/modern-website-design-with-beautiful-ui.jpg" alt="Website preview" className="w-full h-full object-cover" />

              {/* Domain Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-8">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-3">
                  <LinkIcon className="w-5 h-5 text-white" />
                  <span className="text-white font-mono font-semibold">your-project.aiuncode.site</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Info Box */}
          <div className="border-2 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-slate-800 rounded-lg p-4 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-blue-700 dark:text-blue-400">مبروك! </span>
              موقعك الآن حي على الإنترنت لمدة 10 أيام استكشافية...
            </p>
          </div>

          {/* Buttons Container */}
          <div className="flex flex-col gap-3">
            {/* Copy Link Button */}
            <Button
              onClick={handleCopy}
              variant="outline"
              className="w-full py-6 text-base font-semibold border-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all bg-transparent"
            >
              <Copy className="w-5 h-5 ml-2" />
              {copied ? "تم النسخ!" : "نسخ الرابط"}
            </Button>

            {/* Primary and Secondary Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button className="py-6 text-base font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-all">
                حلو! أبي أستثمر وأنشره رسميًا
              </Button>
              <Button
                variant="outline"
                className="py-6 text-base font-semibold border-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all bg-transparent"
              >
                بأخذ لفة في موقعي أول
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
