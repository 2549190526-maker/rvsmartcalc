"use client" // 👈 这个组件专门负责客户端交互

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, Facebook, Linkedin, Twitter } from "lucide-react"

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium mr-2">Share:</span>
      
      <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}>
        <Facebook className="h-4 w-4" />
      </Button>
      
      <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`, '_blank')}>
        <Twitter className="h-4 w-4" />
      </Button>
      
      <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}>
        <Linkedin className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleCopy}>
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}