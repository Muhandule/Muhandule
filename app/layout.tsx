import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ClientAuthProvider } from "@/contexts/client-auth-context"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Micro Invest - Investimentos Inteligentes",
  description: "Plataforma de microcrédito premium com retornos excepcionais",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-black text-white">
        <AuthProvider>
          <ClientAuthProvider>{children}</ClientAuthProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
