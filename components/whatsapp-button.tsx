"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline"
  children?: React.ReactNode
}

export function WhatsAppButton({ className, size = "default", variant = "default", children }: WhatsAppButtonProps) {
  const [config, setConfig] = useState({
    whatsappNumber: "+258 84 123 4567",
    whatsappMessage: "Olá! Gostaria de falar sobre os serviços da Micro Invest.",
  })

  useEffect(() => {
    // Carregar configurações do localStorage
    const savedConfig = localStorage.getItem("micro-invest-config")
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig)
      setConfig({
        whatsappNumber: parsedConfig.whatsappNumber || config.whatsappNumber,
        whatsappMessage: parsedConfig.whatsappMessage || config.whatsappMessage,
      })
    }
  }, [])

  const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/\s+/g, "").replace("+", "")}?text=${encodeURIComponent(config.whatsappMessage)}`

  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-4 w-4 mr-2" />
        {children || "Falar no WhatsApp"}
      </a>
    </Button>
  )
}
