"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Upload, User, CreditCard, CheckCircle, Info } from "lucide-react"
import Link from "next/link"

export default function RegistroPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    numeroBi: "",
    telefone: "",
    email: "",
    endereco: "",
    profissao: "",
    rendaMensal: "",
    motivoEmprestimo: "",
    valorDesejado: "",
    prazoDesejado: "12",
    fotoProfile: null as File | null,
    biFrente: null as File | null,
    biVerso: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simular envio dos dados
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSubmitSuccess(true)
    setIsSubmitting(false)
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/50 border-gray-800 text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-serif text-green-400">Registro Enviado!</CardTitle>
            <CardDescription className="text-gray-400">
              Seus dados foram enviados para análise do gestor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-yellow-400/20 bg-yellow-400/10">
              <AlertDescription className="text-yellow-400">
                Aguarde até 20 horas para aprovação do seu empréstimo. Você receberá uma notificação quando aprovado.
              </AlertDescription>
            </Alert>

            <Alert className="border-blue-400/20 bg-blue-400/10">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-blue-400">
                Após aprovação, você receberá instruções de pagamento via WhatsApp. Aceitamos E-mola, M-pesa, M-Kesh e
                transferências bancárias.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Button asChild className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                <Link href="/">Voltar ao Início</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
              >
                <Link href="/pagamentos">Ver Métodos de Pagamento</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
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
          <p className="text-gray-400">Registro de Cliente</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= stepNum
                    ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-black"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {stepNum}
              </div>
            ))}
          </div>
          <div className="text-center mt-2 text-gray-400">Passo {step} de 3</div>
        </div>

        <Card className="bg-black/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-serif gold-gradient text-center">
              {step === 1 && "Dados Pessoais"}
              {step === 2 && "Documentos"}
              {step === 3 && "Informações do Empréstimo"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Dados Pessoais */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="nome" className="text-gray-300">
                      Nome Completo *
                    </Label>
                    <Input
                      id="nome"
                      value={formData.nomeCompleto}
                      onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="bi" className="text-gray-300">
                      Número do BI *
                    </Label>
                    <Input
                      id="bi"
                      value={formData.numeroBi}
                      onChange={(e) => handleInputChange("numeroBi", e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="000000000A"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="telefone" className="text-gray-300">
                      Número de Telemóvel *
                    </Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="+258 84 000 0000"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="endereco" className="text-gray-300">
                    Endereço Completo *
                  </Label>
                  <Textarea
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => handleInputChange("endereco", e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white"
                    placeholder="Bairro, Rua, Cidade, Província"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="profissao" className="text-gray-300">
                      Profissão *
                    </Label>
                    <Input
                      id="profissao"
                      value={formData.profissao}
                      onChange={(e) => handleInputChange("profissao", e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="Sua profissão"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="renda" className="text-gray-300">
                      Renda Mensal (MZN) *
                    </Label>
                    <Input
                      id="renda"
                      type="number"
                      value={formData.rendaMensal}
                      onChange={(e) => handleInputChange("rendaMensal", e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="10000"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Documentos */}
            {step === 2 && (
              <div className="space-y-6">
                <Alert className="border-yellow-400/20 bg-yellow-400/10">
                  <AlertDescription className="text-yellow-400">
                    Faça upload dos seus documentos. Certifique-se de que as imagens estão claras e legíveis.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Foto de Perfil */}
                  <div className="space-y-3">
                    <Label className="text-gray-300 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Foto de Perfil *
                    </Label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-yellow-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange("fotoProfile", e.target.files?.[0] || null)}
                        className="hidden"
                        id="foto-profile"
                      />
                      <label htmlFor="foto-profile" className="cursor-pointer">
                        <span className="text-sm text-gray-400">Clique para enviar</span>
                        {formData.fotoProfile && (
                          <p className="text-xs text-green-400 mt-1">{formData.fotoProfile.name}</p>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* BI Frente */}
                  <div className="space-y-3">
                    <Label className="text-gray-300 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      BI - Frente *
                    </Label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-yellow-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange("biFrente", e.target.files?.[0] || null)}
                        className="hidden"
                        id="bi-frente"
                      />
                      <label htmlFor="bi-frente" className="cursor-pointer">
                        <span className="text-sm text-gray-400">Clique para enviar</span>
                        {formData.biFrente && <p className="text-xs text-green-400 mt-1">{formData.biFrente.name}</p>}
                      </label>
                    </div>
                  </div>

                  {/* BI Verso */}
                  <div className="space-y-3">
                    <Label className="text-gray-300 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      BI - Verso *
                    </Label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-yellow-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange("biVerso", e.target.files?.[0] || null)}
                        className="hidden"
                        id="bi-verso"
                      />
                      <label htmlFor="bi-verso" className="cursor-pointer">
                        <span className="text-sm text-gray-400">Clique para enviar</span>
                        {formData.biVerso && <p className="text-xs text-green-400 mt-1">{formData.biVerso.name}</p>}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Informações do Empréstimo */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="valor" className="text-gray-300">
                      Valor Desejado (MZN) *
                    </Label>
                    <Input
                      id="valor"
                      type="number"
                      value={formData.valorDesejado}
                      onChange={(e) => handleInputChange("valorDesejado", e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                      placeholder="5000"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="prazo" className="text-gray-300">
                      Prazo Desejado (meses)
                    </Label>
                    <select
                      id="prazo"
                      value={formData.prazoDesejado}
                      onChange={(e) => handleInputChange("prazoDesejado", e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 text-white rounded-md px-3 py-2"
                    >
                      <option value="6">6 meses</option>
                      <option value="12">12 meses</option>
                      <option value="18">18 meses</option>
                      <option value="24">24 meses</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="motivo" className="text-gray-300">
                    Motivo do Empréstimo *
                  </Label>
                  <Textarea
                    id="motivo"
                    value={formData.motivoEmprestimo}
                    onChange={(e) => handleInputChange("motivoEmprestimo", e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white"
                    placeholder="Descreva para que pretende usar o empréstimo"
                    required
                  />
                </div>

                {/* Simulação */}
                {formData.valorDesejado && (
                  <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-400 mb-2">Simulação do Empréstimo</h3>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        Valor solicitado:{" "}
                        <span className="text-white font-semibold">
                          {Number.parseInt(formData.valorDesejado).toLocaleString()} MZN
                        </span>
                      </p>
                      <p className="text-gray-300">
                        Juros (30%):{" "}
                        <span className="text-red-400 font-semibold">
                          {(Number.parseInt(formData.valorDesejado) * 0.3).toLocaleString()} MZN
                        </span>
                      </p>
                      <p className="text-gray-300">
                        Total a pagar:{" "}
                        <span className="text-red-400 font-semibold">
                          {(Number.parseInt(formData.valorDesejado) * 1.3).toLocaleString()} MZN
                        </span>
                      </p>
                      <p className="text-gray-300">
                        Prestação mensal:{" "}
                        <span className="text-white font-semibold">
                          {(
                            (Number.parseInt(formData.valorDesejado) * 1.3) /
                            Number.parseInt(formData.prazoDesejado)
                          ).toLocaleString()}{" "}
                          MZN
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                <Alert className="border-blue-400/20 bg-blue-400/10">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-blue-400">
                    <strong>Métodos de Pagamento Disponíveis:</strong> E-mola, M-pesa, M-Kesh e Transferências
                    Bancárias. Após aprovação, você receberá as instruções de pagamento via WhatsApp.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  onClick={() => setStep(step - 1)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Anterior
                </Button>
              )}

              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 ml-auto"
                  disabled={
                    (step === 1 &&
                      (!formData.nomeCompleto ||
                        !formData.numeroBi ||
                        !formData.telefone ||
                        !formData.endereco ||
                        !formData.profissao ||
                        !formData.rendaMensal)) ||
                    (step === 2 && (!formData.fotoProfile || !formData.biFrente || !formData.biVerso))
                  }
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.valorDesejado || !formData.motivoEmprestimo}
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 ml-auto"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
