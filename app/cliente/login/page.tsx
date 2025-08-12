"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useClientAuth } from "@/contexts/client-auth-context"

export default function ClientLoginPage() {
  const [numeroBi, setNumeroBi] = useState("")
  const [telefone, setTelefone] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useClientAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simular delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const success = login(numeroBi, telefone)
    if (success) {
      router.push("/cliente/dashboard")
    } else {
      setError("Dados não encontrados. Verifique seu BI e telefone ou registre-se primeiro.")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Site</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
            <span className="font-serif text-3xl font-bold gold-gradient">Micro Invest</span>
          </div>
          <p className="text-gray-400">Área do Cliente</p>
        </div>

        {/* Login Card */}
        <Card className="bg-black/50 border-gray-800 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-serif text-blue-400">Acesso do Cliente</CardTitle>
            <CardDescription className="text-gray-400">Digite seus dados para acessar sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="numeroBi" className="text-gray-300">
                  Número do BI
                </Label>
                <Input
                  id="numeroBi"
                  type="text"
                  placeholder="123456789A"
                  value={numeroBi}
                  onChange={(e) => setNumeroBi(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="telefone" className="text-gray-300">
                  Número de Telemóvel
                </Label>
                <Input
                  id="telefone"
                  type="text"
                  placeholder="+258 84 123 4567"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                  required
                />
              </div>

              {error && (
                <Alert className="border-red-400/20 bg-red-400/10">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading || !numeroBi || !telefone}
                className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 h-12 text-lg"
              >
                {isLoading ? "Verificando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm mb-4">Ainda não tem conta?</p>
              <Button
                asChild
                variant="outline"
                className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-white bg-transparent"
              >
                <Link href="/registro">Registrar-se</Link>
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-400/10 border border-blue-400/20 rounded-lg">
              <p className="text-sm text-blue-400 text-center">
                <User className="h-4 w-4 inline mr-1" />
                Use os dados que forneceu no registro
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
