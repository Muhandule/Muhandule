"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import {
  LogOut,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  CreditCard,
  MapPin,
  Briefcase,
  DollarSign,
  FileText,
  Eye,
  Download,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Dados simulados de solicitações pendentes
const PENDING_APPLICATIONS = [
  {
    id: "app1",
    nomeCompleto: "Ana Silva Costa",
    numeroBi: "456789123B",
    telefone: "+258 85 456 7890",
    email: "ana@email.com",
    endereco: "Bairro Central, Rua das Flores, 123, Maputo",
    profissao: "Comerciante",
    rendaMensal: 15000,
    valorDesejado: 8000,
    prazoDesejado: 12,
    motivoEmprestimo: "Expansão do meu negócio de venda de roupas",
    dataSubmissao: "2025-01-10T10:30:00Z",
    documentos: {
      fotoProfile: "ana_foto.jpg",
      biFrente: "ana_bi_frente.jpg",
      biVerso: "ana_bi_verso.jpg",
    },
    status: "pendente",
  },
  {
    id: "app2",
    nomeCompleto: "Carlos Manuel Nhaca",
    numeroBi: "789123456C",
    telefone: "+258 84 789 1234",
    email: "carlos@email.com",
    endereco: "Bairro Polana, Av. Julius Nyerere, 456, Maputo",
    profissao: "Mecânico",
    rendaMensal: 12000,
    valorDesejado: 5000,
    prazoDesejado: 18,
    motivoEmprestimo: "Compra de ferramentas e equipamentos para oficina",
    dataSubmissao: "2025-01-09T14:15:00Z",
    documentos: {
      fotoProfile: "carlos_foto.jpg",
      biFrente: "carlos_bi_frente.jpg",
      biVerso: "carlos_bi_verso.jpg",
    },
    status: "pendente",
  },
  {
    id: "app3",
    nomeCompleto: "Fatima Abdul Razak",
    numeroBi: "321654987D",
    telefone: "+258 86 321 6549",
    email: "fatima@email.com",
    endereco: "Bairro Sommerschield, Rua da Paz, 789, Maputo",
    profissao: "Cabeleireira",
    rendaMensal: 8000,
    valorDesejado: 3000,
    prazoDesejado: 12,
    motivoEmprestimo: "Reforma do salão de beleza",
    dataSubmissao: "2025-01-08T09:45:00Z",
    documentos: {
      fotoProfile: "fatima_foto.jpg",
      biFrente: "fatima_bi_frente.jpg",
      biVerso: "fatima_bi_verso.jpg",
    },
    status: "pendente",
  },
]

function ApprovalContent() {
  const { logout } = useAuth()
  const router = useRouter()
  const [applications, setApplications] = useState(PENDING_APPLICATIONS)
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleApprove = async (appId: string) => {
    setActionLoading(appId)
    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setApplications((prev) => prev.map((app) => (app.id === appId ? { ...app, status: "aprovado" } : app)))
    setActionLoading(null)
  }

  const handleReject = async (appId: string) => {
    setActionLoading(appId)
    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setApplications((prev) => prev.map((app) => (app.id === appId ? { ...app, status: "rejeitado" } : app)))
    setActionLoading(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aprovado":
        return "bg-green-400/20 text-green-400 border-green-400/20"
      case "rejeitado":
        return "bg-red-400/20 text-red-400 border-red-400/20"
      case "pendente":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/20"
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle className="h-4 w-4" />
      case "rejeitado":
        return <XCircle className="h-4 w-4" />
      case "pendente":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const pendingCount = applications.filter((app) => app.status === "pendente").length

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
                <span className="text-gray-400 text-sm ml-4">Sistema de Aprovações</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 text-orange-400">Sistema de Aprovações</h1>
          <p className="text-xl text-gray-300">Analise e aprove solicitações de empréstimos dos clientes</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{pendingCount}</div>
              <p className="text-xs text-gray-400 mt-1">Aguardando análise</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Aprovadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {applications.filter((app) => app.status === "aprovado").length}
              </div>
              <p className="text-xs text-gray-400 mt-1">Este período</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Rejeitadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                {applications.filter((app) => app.status === "rejeitado").length}
              </div>
              <p className="text-xs text-gray-400 mt-1">Este período</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {applications.map((app) => (
            <Card key={app.id} className="bg-black/50 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-serif text-white flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-400" />
                      {app.nomeCompleto}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      Solicitação enviada em {new Date(app.dataSubmissao).toLocaleDateString("pt-PT")} às{" "}
                      {new Date(app.dataSubmissao).toLocaleTimeString("pt-PT", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {getStatusIcon(app.status)}
                    <span className="ml-1 capitalize">{app.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {/* Dados Pessoais */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-blue-400 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Dados Pessoais
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-400">BI:</span>
                        <span className="text-white">{app.numeroBi}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-400">Telefone:</span>
                        <span className="text-white">{app.telefone}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3 w-3 text-gray-400 mt-1" />
                        <div>
                          <span className="text-gray-400">Endereço:</span>
                          <p className="text-white text-xs">{app.endereco}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dados Profissionais */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-green-400 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Dados Profissionais
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-400">Profissão:</span>
                        <span className="text-white">{app.profissao}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-400">Renda:</span>
                        <span className="text-green-400 font-semibold">{app.rendaMensal.toLocaleString()} MZN</span>
                      </div>
                    </div>
                  </div>

                  {/* Dados do Empréstimo */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-red-400 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Empréstimo Solicitado
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-400">Valor:</span>
                        <span className="text-red-400 font-semibold">{app.valorDesejado.toLocaleString()} MZN</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-400">Prazo:</span>
                        <span className="text-white">{app.prazoDesejado} meses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-400">Total a pagar:</span>
                        <span className="text-red-400 font-semibold">
                          {(app.valorDesejado * 1.3).toLocaleString()} MZN
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Motivo */}
                <div className="mb-6">
                  <h3 className="font-semibold text-purple-400 flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4" />
                    Motivo do Empréstimo
                  </h3>
                  <p className="text-gray-300 text-sm bg-gray-900/50 p-3 rounded-lg">{app.motivoEmprestimo}</p>
                </div>

                {/* Documentos */}
                <div className="mb-6">
                  <h3 className="font-semibold text-yellow-400 flex items-center gap-2 mb-3">
                    <FileText className="h-4 w-4" />
                    Documentos Enviados
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                      <Eye className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-2">Foto de Perfil</p>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Download className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                      <Eye className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-2">BI - Frente</p>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Download className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                      <Eye className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-2">BI - Verso</p>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Download className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {app.status === "pendente" && (
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleApprove(app.id)}
                      disabled={actionLoading === app.id}
                      className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {actionLoading === app.id ? "Aprovando..." : "Aprovar"}
                    </Button>
                    <Button
                      onClick={() => handleReject(app.id)}
                      disabled={actionLoading === app.id}
                      variant="outline"
                      className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white bg-transparent"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      {actionLoading === app.id ? "Rejeitando..." : "Rejeitar"}
                    </Button>
                  </div>
                )}

                {app.status === "aprovado" && (
                  <Alert className="border-green-400/20 bg-green-400/10">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className="text-green-400">
                      Solicitação aprovada. Cliente será notificado e receberá o empréstimo em até 20 horas.
                    </AlertDescription>
                  </Alert>
                )}

                {app.status === "rejeitado" && (
                  <Alert className="border-red-400/20 bg-red-400/10">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-400">
                      Solicitação rejeitada. Cliente foi notificado da decisão.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {applications.length === 0 && (
          <Card className="bg-black/50 border-gray-800">
            <CardContent className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">Nenhuma solicitação encontrada</h3>
              <p className="text-gray-500">Todas as solicitações foram processadas.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function ApprovalsPage() {
  return (
    <ProtectedRoute>
      <ApprovalContent />
    </ProtectedRoute>
  )
}
