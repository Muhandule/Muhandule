"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, Settings, Users, TrendingUp, FileText, Bell, CheckCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

function DashboardContent() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const pendingApprovals = 3

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
              <span className="font-serif text-2xl font-bold gold-gradient">Micro Invest</span>
              <span className="text-gray-400 text-sm ml-4">Painel Administrativo</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 gold-gradient">Painel do Gestor</h1>
          <p className="text-xl text-gray-300">Gerencie sua plataforma de microcrédito</p>
        </div>

        {/* Added notification alert for pending approvals */}
        {pendingApprovals > 0 && (
          <div className="mb-8 p-4 bg-orange-400/10 border border-orange-400/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-400" />
                <p className="text-orange-400 font-semibold">{pendingApprovals} solicitações aguardando aprovação</p>
              </div>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700"
              >
                <Link href="/admin/aprovacoes">Ver Solicitações</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Total Investido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">125.000 MZN</div>
              <p className="text-xs text-green-400 mt-1">+12% este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Empréstimos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">89.500 MZN</div>
              <p className="text-xs text-green-400 mt-1">+8% este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Investidores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">47</div>
              <p className="text-xs text-green-400 mt-1">+5 novos</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Lucro Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">8.750 MZN</div>
              <p className="text-xs text-green-400 mt-1">+15% este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Added approvals card with notification badge */}
          <Card className="bg-black/50 border-gray-800 hover:border-orange-400/50 transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center relative">
                <CheckCircle className="h-8 w-8 text-white" />
                {pendingApprovals > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1">
                    {pendingApprovals}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl font-serif text-orange-400">Aprovações</CardTitle>
              <CardDescription className="text-gray-400">Aprovar ou rejeitar solicitações de clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700"
              >
                <Link href="/admin/aprovacoes">
                  {pendingApprovals > 0 ? `Ver ${pendingApprovals} Pendentes` : "Ver Solicitações"}
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800 hover:border-yellow-400/50 transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-black" />
              </div>
              <CardTitle className="text-xl font-serif gold-gradient">Gerenciar Usuários</CardTitle>
              <CardDescription className="text-gray-400">
                Visualizar e gerenciar investidores e tomadores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700"
              >
                <Link href="/admin/users">Acessar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800 hover:border-yellow-400/50 transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-serif text-blue-400">Relatórios</CardTitle>
              <CardDescription className="text-gray-400">Análises financeiras e estatísticas</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
              >
                Ver Relatórios
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800 hover:border-yellow-400/50 transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-serif text-green-400">Conteúdo</CardTitle>
              <CardDescription className="text-gray-400">Gerenciar imagens, anúncios e novidades</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-white bg-transparent"
              >
                <Link href="/admin/content">Gerenciar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800 hover:border-yellow-400/50 transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-serif text-purple-400">Notificações</CardTitle>
              <CardDescription className="text-gray-400">Enviar avisos e comunicados</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
              >
                Enviar
              </Button>
            </CardContent>
          </Card>

          {/* Updated settings card to link to new configurations page */}
          <Card className="bg-black/50 border-gray-800 hover:border-yellow-400/50 transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-serif text-gray-400">Configurações</CardTitle>
              <CardDescription className="text-gray-400">WhatsApp, QR Code e ajustes da plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white bg-transparent"
              >
                <Link href="/admin/configuracoes">Configurar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
