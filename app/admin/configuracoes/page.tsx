"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, ArrowLeft, MessageCircle, QrCode, Save, CheckCircle, Building } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

function ConfiguracoesContent() {
  const { logout } = useAuth()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Configurações da empresa (simuladas - em produção viriam de uma API/banco)
  const [config, setConfig] = useState({
    whatsappNumber: "+258 84 123 4567",
    whatsappMessage: "Olá! Gostaria de falar sobre os serviços da Micro Invest.",
    empresaNome: "Micro Invest",
    empresaDescricao: "Plataforma premium de microcrédito com retornos excepcionais",
    empresaEndereco: "Av. Julius Nyerere, 123, Maputo, Moçambique",
    empresaEmail: "contato@microinvest.co.mz",
    empresaTelefone: "+258 21 123 456",
  })

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Salvar no localStorage (em produção seria uma API)
    localStorage.setItem("micro-invest-config", JSON.stringify(config))

    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  // Gerar URL do WhatsApp
  const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/\s+/g, "").replace("+", "")}?text=${encodeURIComponent(config.whatsappMessage)}`

  // Gerar dados para QR Code (simulado)
  const qrCodeData = JSON.stringify({
    empresa: config.empresaNome,
    whatsapp: config.whatsappNumber,
    email: config.empresaEmail,
    website: "https://microinvest.co.mz",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
                <span className="font-serif text-2xl font-bold gold-gradient">Micro Invest</span>
                <span className="text-gray-400 text-sm ml-4">Configurações</span>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 text-gray-400">Configurações</h1>
          <p className="text-xl text-gray-300">Gerencie as configurações da plataforma</p>
        </div>

        {saveSuccess && (
          <Alert className="border-green-400/20 bg-green-400/10 mb-8">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-400">Configurações salvas com sucesso!</AlertDescription>
          </Alert>
        )}

        <div className="space-y-8">
          {/* WhatsApp Configuration */}
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-green-400 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Configurações do WhatsApp
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure o número e mensagem padrão para contato via WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="whatsapp-number" className="text-gray-300">
                    Número do WhatsApp
                  </Label>
                  <Input
                    id="whatsapp-number"
                    value={config.whatsappNumber}
                    onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white"
                    placeholder="+258 84 123 4567"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-gray-300">Teste do Link</Label>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-white bg-transparent"
                  >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Testar WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="whatsapp-message" className="text-gray-300">
                  Mensagem Padrão
                </Label>
                <Textarea
                  id="whatsapp-message"
                  value={config.whatsappMessage}
                  onChange={(e) => handleInputChange("whatsappMessage", e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="Mensagem que aparecerá automaticamente no WhatsApp"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-blue-400 flex items-center gap-2">
                <Building className="h-5 w-5" />
                Informações da Empresa
              </CardTitle>
              <CardDescription className="text-gray-400">Configure as informações básicas da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="empresa-nome" className="text-gray-300">
                    Nome da Empresa
                  </Label>
                  <Input
                    id="empresa-nome"
                    value={config.empresaNome}
                    onChange={(e) => handleInputChange("empresaNome", e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="empresa-email" className="text-gray-300">
                    Email da Empresa
                  </Label>
                  <Input
                    id="empresa-email"
                    type="email"
                    value={config.empresaEmail}
                    onChange={(e) => handleInputChange("empresaEmail", e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="empresa-descricao" className="text-gray-300">
                  Descrição da Empresa
                </Label>
                <Textarea
                  id="empresa-descricao"
                  value={config.empresaDescricao}
                  onChange={(e) => handleInputChange("empresaDescricao", e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                  rows={3}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="empresa-telefone" className="text-gray-300">
                    Telefone da Empresa
                  </Label>
                  <Input
                    id="empresa-telefone"
                    value={config.empresaTelefone}
                    onChange={(e) => handleInputChange("empresaTelefone", e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="empresa-endereco" className="text-gray-300">
                    Endereço da Empresa
                  </Label>
                  <Input
                    id="empresa-endereco"
                    value={config.empresaEndereco}
                    onChange={(e) => handleInputChange("empresaEndereco", e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code */}
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-purple-400 flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code da Empresa
              </CardTitle>
              <CardDescription className="text-gray-400">QR Code com informações de contato da empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <QrCode className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm">QR Code</p>
                        <p className="text-xs">Micro Invest</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Informações no QR Code:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Nome: {config.empresaNome}</li>
                      <li>• WhatsApp: {config.whatsappNumber}</li>
                      <li>• Email: {config.empresaEmail}</li>
                      <li>• Website: https://microinvest.co.mz</li>
                    </ul>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Baixar QR Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Salvando..." : "Salvar Configurações"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConfiguracoesPage() {
  return (
    <ProtectedRoute>
      <ConfiguracoesContent />
    </ProtectedRoute>
  )
}
