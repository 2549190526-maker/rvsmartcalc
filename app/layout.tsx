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
  // 1. 基础标题模板 (每个页面没写标题时显示这个)
  title: {
    default: "RVSmartCalc - RV Loan & Ownership Cost Calculators",
    template: "%s | RVSmartCalc",
  },
  // 2. 网站描述 (Google 搜索结果下方的文字)
  description: "Calculate RV loans, affordability, and true cost of ownership. Expert tools to help you make smart financial decisions before buying your dream RV.",
  // 3. 关键词 (帮搜索引擎归类)
  keywords: [
    "RV Loan Calculator",
    "RV Affordability",
    "RV Cost of Ownership",
    "Camper Financing",
    "Towing Capacity Calculator",
    "RV Lifestyle Cost"
  ],
  // 4. 作者与版权
  authors: [{ name: "RVSmartCalc Team" }],
  creator: "RVSmartCalc",
  // 5. Open Graph (当链接分享到 Facebook/Twitter/iMessage 时显示的效果)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rvsmartcalc.com", // 上线后换成你的真实域名
    title: "RVSmartCalc - Smart Tools for RV Owners",
    description: "Don't overpay for your RV. Use our free calculators to check payments, hidden costs, and towing safety.",
    siteName: "RVSmartCalc",
  },
  // 6. 图标配置 (Next.js 会自动找 public 里的文件，这里显式声明更稳)
  icons: {
    icon: "/favicon.ico",
  },
}

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
