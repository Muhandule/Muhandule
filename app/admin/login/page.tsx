"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simular delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const success = login(password)
    if (success) {
      router.push("/admin/dashboard")
    } else {
      setError("Senha incorreta. Tente novamente.")
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
          <p className="text-gray-400">Área Administrativa</p>
        </div>

        {/* Login Card */}
        <Card className="bg-black/50 border-gray-800 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Lock className="h-8 w-8 text-black" />
            </div>
            <CardTitle className="text-2xl font-serif gold-gradient">Acesso do Gestor</CardTitle>
            <CardDescription className="text-gray-400">
              Digite sua senha para acessar o painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="password" className="text-gray-300 text-lg">
                  Senha de Acesso
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white text-lg h-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-400/20 bg-red-400/10">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading || !password}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 h-12 text-lg"
              >
                {isLoading ? "Verificando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <p className="text-sm text-yellow-400 text-center">
                <Lock className="h-4 w-4 inline mr-1" />
                Acesso restrito apenas ao gestor da plataforma
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>&copy; 2025 Micro Invest. Área Administrativa.</p>
        </div>
      </div>
    </div>
  )
}
