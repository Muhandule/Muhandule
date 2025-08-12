"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calculator, TrendingUp, TrendingDown, Info } from "lucide-react"
import Link from "next/link"

export default function SimuladorPage() {
  const [investAmount, setInvestAmount] = useState("")
  const [investPeriod, setInvestPeriod] = useState("12")
  const [loanAmount, setLoanAmount] = useState("")
  const [loanPeriod, setLoanPeriod] = useState("12")

  const calculateInvestment = (amount: number, months: number) => {
    const annualRate = 0.5 // 50% ao ano
    const monthlyRate = annualRate / 12
    const totalReturn = amount * (1 + monthlyRate * months)
    const profit = totalReturn - amount
    return { totalReturn, profit, monthlyProfit: profit / months }
  }

  const calculateLoan = (amount: number, months: number) => {
    const annualRate = 0.3 // 30% ao ano
    const monthlyRate = annualRate / 12
    const totalPayment = amount * (1 + monthlyRate * months)
    const interest = totalPayment - amount
    const monthlyPayment = totalPayment / months
    return { totalPayment, interest, monthlyPayment }
  }

  const investResults = investAmount
    ? calculateInvestment(Number.parseFloat(investAmount), Number.parseInt(investPeriod))
    : null
  const loanResults = loanAmount ? calculateLoan(Number.parseFloat(loanAmount), Number.parseInt(loanPeriod)) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
              <span className="font-serif text-2xl font-bold gold-gradient">Micro Invest</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl lg:text-6xl font-bold mb-4 gold-gradient">Simulador Avançado</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Calcule com precisão seus investimentos e empréstimos
          </p>
        </div>

        {/* Simulador */}
        <Tabs defaultValue="investidor" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-900 border-gray-700">
            <TabsTrigger
              value="investidor"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-gray-300"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Como Investidor
            </TabsTrigger>
            <TabsTrigger
              value="tomador"
              className="data-[state=active]:bg-red-400 data-[state=active]:text-black text-gray-300"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              Como Tomador
            </TabsTrigger>
          </TabsList>

          {/* Simulador Investidor */}
          <TabsContent value="investidor">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Card */}
              <Card className="bg-black/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-yellow-400 flex items-center gap-2">
                    <Calculator className="h-6 w-6" />
                    Simular Investimento
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure seu investimento e veja os retornos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="invest-amount" className="text-gray-300 text-lg">
                      Valor do Investimento (MZN)
                    </Label>
                    <Input
                      id="invest-amount"
                      type="number"
                      placeholder="10000"
                      value={investAmount}
                      onChange={(e) => setInvestAmount(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white text-lg h-12"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="invest-period" className="text-gray-300 text-lg">
                      Período do Investimento
                    </Label>
                    <Select value={investPeriod} onValueChange={setInvestPeriod}>
                      <SelectTrigger className="bg-gray-900 border-gray-700 text-white h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="6">6 meses</SelectItem>
                        <SelectItem value="12">12 meses (1 ano)</SelectItem>
                        <SelectItem value="18">18 meses</SelectItem>
                        <SelectItem value="24">24 meses (2 anos)</SelectItem>
                        <SelectItem value="36">36 meses (3 anos)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-400">
                        <p className="font-semibold mb-1">Taxa de Retorno:</p>
                        <p>50% ao ano (4,17% ao mês)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Card */}
              <Card className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-yellow-400">Resultados do Investimento</CardTitle>
                  <CardDescription className="text-gray-400">Projeção dos seus ganhos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {investResults ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">Valor Investido</p>
                          <p className="text-2xl font-bold text-white">
                            {Number.parseFloat(investAmount).toLocaleString("pt-MZ")} MZN
                          </p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">Período</p>
                          <p className="text-2xl font-bold text-white">
                            {investPeriod} {Number.parseInt(investPeriod) === 1 ? "mês" : "meses"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-lg p-6">
                          <p className="text-sm text-gray-300 mb-2">Valor Total a Receber</p>
                          <p className="text-4xl font-bold text-yellow-400">
                            {investResults.totalReturn.toLocaleString("pt-MZ")} MZN
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4">
                            <p className="text-sm text-gray-400 mb-1">Lucro Total</p>
                            <p className="text-xl font-bold text-green-400">
                              {investResults.profit.toLocaleString("pt-MZ")} MZN
                            </p>
                          </div>
                          <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4">
                            <p className="text-sm text-gray-400 mb-1">Lucro Mensal</p>
                            <p className="text-xl font-bold text-green-400">
                              {investResults.monthlyProfit.toLocaleString("pt-MZ")} MZN
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 h-12 text-lg">
                        Começar a Investir
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Calculator className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Digite um valor para ver os resultados</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Simulador Tomador */}
          <TabsContent value="tomador">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Card */}
              <Card className="bg-black/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-red-400 flex items-center gap-2">
                    <Calculator className="h-6 w-6" />
                    Simular Empréstimo
                  </CardTitle>
                  <CardDescription className="text-gray-400">Configure seu empréstimo e veja os custos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="loan-amount" className="text-gray-300 text-lg">
                      Valor do Empréstimo (MZN)
                    </Label>
                    <Input
                      id="loan-amount"
                      type="number"
                      placeholder="5000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white text-lg h-12"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="loan-period" className="text-gray-300 text-lg">
                      Período do Empréstimo
                    </Label>
                    <Select value={loanPeriod} onValueChange={setLoanPeriod}>
                      <SelectTrigger className="bg-gray-900 border-gray-700 text-white h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="6">6 meses</SelectItem>
                        <SelectItem value="12">12 meses (1 ano)</SelectItem>
                        <SelectItem value="18">18 meses</SelectItem>
                        <SelectItem value="24">24 meses (2 anos)</SelectItem>
                        <SelectItem value="36">36 meses (3 anos)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-red-400">
                        <p className="font-semibold mb-1">Taxa de Juros:</p>
                        <p>30% ao ano (2,5% ao mês)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Card */}
              <Card className="bg-gradient-to-br from-red-400/10 to-red-600/5 border-red-400/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-red-400">Resultados do Empréstimo</CardTitle>
                  <CardDescription className="text-gray-400">Custos do seu empréstimo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {loanResults ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">Valor Emprestado</p>
                          <p className="text-2xl font-bold text-white">
                            {Number.parseFloat(loanAmount).toLocaleString("pt-MZ")} MZN
                          </p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-sm text-gray-400 mb-1">Período</p>
                          <p className="text-2xl font-bold text-white">
                            {loanPeriod} {Number.parseInt(loanPeriod) === 1 ? "mês" : "meses"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-red-400/20 border border-red-400/30 rounded-lg p-6">
                          <p className="text-sm text-gray-300 mb-2">Valor Total a Pagar</p>
                          <p className="text-4xl font-bold text-red-400">
                            {loanResults.totalPayment.toLocaleString("pt-MZ")} MZN
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-orange-400/10 border border-orange-400/20 rounded-lg p-4">
                            <p className="text-sm text-gray-400 mb-1">Juros Total</p>
                            <p className="text-xl font-bold text-orange-400">
                              {loanResults.interest.toLocaleString("pt-MZ")} MZN
                            </p>
                          </div>
                          <div className="bg-orange-400/10 border border-orange-400/20 rounded-lg p-4">
                            <p className="text-sm text-gray-400 mb-1">Parcela Mensal</p>
                            <p className="text-xl font-bold text-orange-400">
                              {loanResults.monthlyPayment.toLocaleString("pt-MZ")} MZN
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 h-12 text-lg">
                        Solicitar Empréstimo
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Calculator className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Digite um valor para ver os resultados</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Comparação */}
        {investResults && loanResults && (
          <Card className="mt-12 bg-black/50 border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif gold-gradient">Comparação de Cenários</CardTitle>
              <CardDescription className="text-gray-400">
                Veja a diferença entre investir e pedir emprestado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Se você investir {investAmount} MZN</h3>
                  <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-6">
                    <p className="text-3xl font-bold text-yellow-400 mb-2">
                      +{investResults.profit.toLocaleString("pt-MZ")} MZN
                    </p>
                    <p className="text-gray-300">Lucro em {investPeriod} meses</p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Se você pedir {loanAmount} MZN</h3>
                  <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-6">
                    <p className="text-3xl font-bold text-red-400 mb-2">
                      -{loanResults.interest.toLocaleString("pt-MZ")} MZN
                    </p>
                    <p className="text-gray-300">Juros em {loanPeriod} meses</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
