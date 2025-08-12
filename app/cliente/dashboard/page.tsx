"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClientProtectedRoute } from "@/components/client-protected-route"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useClientAuth } from "@/contexts/client-auth-context"
import { LogOut, TrendingUp, CreditCard, Clock, AlertCircle, CheckCircle, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

function DashboardContent() {
  const { user, logout } = useClientAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  const totalInvestido = user.investimentos.reduce((sum, inv) => sum + inv.valor, 0)
  const totalRetornoEsperado = user.investimentos.reduce((sum, inv) => sum + inv.retornoEsperado, 0)
  const totalEmprestimos = user.emprestimos.reduce((sum, emp) => sum + emp.valor, 0)
  const totalAPagar = user.emprestimos.reduce((sum, emp) => sum + emp.valorTotal, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aprovado":
      case "ativo":
      case "pago":
        return "bg-green-400/20 text-green-400 border-green-400/20"
      case "pendente":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/20"
      case "rejeitado":
        return "bg-red-400/20 text-red-400 border-red-400/20"
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aprovado":
      case "ativo":
      case "pago":
        return <CheckCircle className="h-4 w-4" />
      case "pendente":
        return <Clock className="h-4 w-4" />
      case "rejeitado":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
              <span className="font-serif text-2xl font-bold gold-gradient">Micro Invest</span>
              <span className="text-gray-400 text-sm ml-4">Minha Conta</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Olá, {user.nomeCompleto.split(" ")[0]}</span>
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 gold-gradient">Minha Conta</h1>
          <div className="flex items-center space-x-4">
            <p className="text-xl text-gray-300">Status da conta:</p>
            <Badge className={getStatusColor(user.status)}>
              {getStatusIcon(user.status)}
              <span className="ml-1 capitalize">{user.status}</span>
            </Badge>
          </div>
        </div>

        {/* Status Alert */}
        {user.status === "pendente" && (
          <div className="mb-8 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <p className="text-yellow-400 font-semibold">Conta em análise</p>
            </div>
            <p className="text-gray-300 mt-2">
              Seus dados estão sendo analisados pelo gestor. Aguarde até 20 horas para aprovação.
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Total Investido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{totalInvestido.toLocaleString()} MZN</div>
              <p className="text-xs text-green-400 mt-1">
                Retorno esperado: {totalRetornoEsperado.toLocaleString()} MZN
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Empréstimos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">{totalEmprestimos.toLocaleString()} MZN</div>
              <p className="text-xs text-red-400 mt-1">Total a pagar: {totalAPagar.toLocaleString()} MZN</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Investimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{user.investimentos.length}</div>
              <p className="text-xs text-green-400 mt-1">
                {user.investimentos.filter((i) => i.status === "ativo").length} ativos
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Empréstimos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{user.emprestimos.length}</div>
              <p className="text-xs text-blue-400 mt-1">
                {user.emprestimos.filter((e) => e.status === "ativo").length} ativos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Investimentos */}
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-serif gold-gradient flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Meus Investimentos
              </CardTitle>
              <CardDescription className="text-gray-400">Acompanhe seus investimentos e retornos</CardDescription>
            </CardHeader>
            <CardContent>
              {user.investimentos.length > 0 ? (
                <div className="space-y-4">
                  {user.investimentos.map((investimento) => (
                    <div key={investimento.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-white">{investimento.valor.toLocaleString()} MZN</p>
                          <p className="text-sm text-gray-400">
                            Investido em {new Date(investimento.dataInvestimento).toLocaleDateString("pt-PT")}
                          </p>
                        </div>
                        <Badge className={getStatusColor(investimento.status)}>{investimento.status}</Badge>
                      </div>
                      <div className="text-sm text-gray-300">
                        <p>
                          Retorno esperado:{" "}
                          <span className="text-green-400 font-semibold">
                            {investimento.retornoEsperado.toLocaleString()} MZN
                          </span>
                        </p>
                        <p>Vencimento: {new Date(investimento.dataVencimento).toLocaleDateString("pt-PT")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Nenhum investimento encontrado</p>
              )}
            </CardContent>
          </Card>

          {/* Empréstimos */}
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-red-400 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Meus Empréstimos
              </CardTitle>
              <CardDescription className="text-gray-400">Acompanhe seus empréstimos e pagamentos</CardDescription>
            </CardHeader>
            <CardContent>
              {user.emprestimos.length > 0 ? (
                <div className="space-y-4">
                  {user.emprestimos.map((emprestimo) => (
                    <div key={emprestimo.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-white">{emprestimo.valor.toLocaleString()} MZN</p>
                          <p className="text-sm text-gray-400">{emprestimo.motivoEmprestimo}</p>
                        </div>
                        <Badge className={getStatusColor(emprestimo.status)}>{emprestimo.status}</Badge>
                      </div>
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>
                          Juros: <span className="text-red-400">{emprestimo.juros.toLocaleString()} MZN</span>
                        </p>
                        <p>
                          Total a pagar:{" "}
                          <span className="text-red-400 font-semibold">
                            {emprestimo.valorTotal.toLocaleString()} MZN
                          </span>
                        </p>
                        <p>
                          Prestação mensal:{" "}
                          <span className="text-white font-semibold">
                            {emprestimo.prestacaoMensal.toLocaleString()} MZN
                          </span>
                        </p>
                        {emprestimo.dataVencimento && (
                          <p>Vencimento: {new Date(emprestimo.dataVencimento).toLocaleDateString("pt-PT")}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Nenhum empréstimo encontrado</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div className="mt-12">
          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-serif text-blue-400 flex items-center justify-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Precisa de Ajuda?
              </CardTitle>
              <CardDescription className="text-gray-400">Entre em contato com nosso gestor</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <WhatsAppButton className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700">
                Falar no WhatsApp
              </WhatsAppButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function ClientDashboardPage() {
  return (
    <ClientProtectedRoute>
      <DashboardContent />
    </ClientProtectedRoute>
  )
}
