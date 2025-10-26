import type React from "react"
import type { Metadata } from "next"
import { Tajawal } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Script from "next/script"

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "AI-Uncode | ذكاء صناعي بلا تعقيد",
  description: "نبني لك صفحة احترافية مع وكيل AI يتحدث لهجتك الخليجية، يجيب 24/7، ويزيد مبيعاتك",
  generator: "AI-Uncode",
  keywords: ["ذكاء اصطناعي", "AI", "SaaS", "وكيل ذكي", "صفحة هبوط", "تسويق"],
  authors: [{ name: "AI-Uncode" }],
  openGraph: {
    title: "AI-Uncode | ذكاء صناعي بلا تعقيد",
    description: "نبني لك صفحة احترافية مع وكيل AI يتحدث لهجتك الخليجية",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Microsoft Clarity Integration */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
          `}
        </Script>
      </head>
      <body className={`${tajawal.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
