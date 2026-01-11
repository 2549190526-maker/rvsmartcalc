import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./styles.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  // 1. 升级版标题：加入“避坑”心理暗示
  title: {
    default: "RV Smart Calc | Avoid Costly Mistakes with Our RV Calculators",
    template: "%s | RV Smart Calc",
  },

  // 2. 升级版描述：利用“损失厌恶”，让用户觉得不点进来就会亏钱
  description: "Stop losing money on hidden RV costs. Our specialized calculators for loans, fuel, and maintenance empower you to take control of your financial RV dream.",

  // 3. 精准关键词
  keywords: [
    "RV Loan Calculator",
    "RV Affordability",
    "Hidden RV Costs",
    "Motorhome Financing Traps",
    "RV Maintenance Budget",
    "RV Lifestyle Cost"
  ],

  // 4. 作者与版权
  authors: [{ name: "RVSmartCalc Expert Team" }],
  creator: "RVSmartCalc",

  // 5. 社交媒体分享优化 (Open Graph)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rvsmartcalc.com", 
    title: "Don't Overpay for Your RV - Use RVSmartCalc",
    description: "The only financial tool designed by real RVers to help you dodge dealership traps.",
    siteName: "RVSmartCalc",
  },

  // 6. 图标配置
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
