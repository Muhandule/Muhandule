"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, Search, Users, TrendingUp, TrendingDown, Mail, Phone, Calendar } from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  name: string
  email: string
  phone: string
  type: "investor" | "borrower"
  amount: number
  joinDate: string
  status: "active" | "pending" | "inactive"
  totalTransactions: number
}

function UserManagementContent() {
  const { logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@email.com",
      phone: "+351 912 345 678",
      type: "investor",
      amount: 15000,
      joinDate: "2024-12-15",
      status: "active",
      totalTransactions: 3,
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "+351 923 456 789",
      type: "borrower",
      amount: 8500,
      joinDate: "2024-12-20",
      status: "active",
      totalTransactions: 2,
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@email.com",
      phone: "+351 934 567 890",
      type: "investor",
      amount: 25000,
      joinDate: "2024-11-10",
      status: "active",
      totalTransactions: 5,
    },
    {
      id: "4",
      name: "Ana Ferreira",
      email: "ana@email.com",
      phone: "+351 945 678 901",
      type: "borrower",
      amount: 3200,
      joinDate: "2025-01-05",
      status: "pending",
      totalTransactions: 1,
    },
  ])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const investors = filteredUsers.filter((user) => user.type === "investor")
  const borrowers = filteredUsers.filter((user) => user.type === "borrower")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-400/20 text-green-400 border-green-400/30"
      case "pending":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
      case "inactive":
        return "bg-red-400/20 text-red-400 border-red-400/30"
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "pending":
        return "Pendente"
      case "inactive":
        return "Inativo"
      default:
        return "Desconhecido"
    }
  }

  const UserCard = ({ user }: { user: User }) => (
    <Card className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                user.type === "investor"
                  ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                  : "bg-gradient-to-br from-red-400 to-red-600"
              }`}
            >
              {user.type === "investor" ? (
                <TrendingUp className="h-6 w-6 text-white" />
              ) : (
                <TrendingDown className="h-6 w-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">{user.name}</h3>
              <Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-yellow-400">
              € {user.amount.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-400">{user.type === "investor" ? "Investido" : "Emprestado"}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-gray-300">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Phone className="h-4 w-4" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar className="h-4 w-4" />
            <span>Membro desde {new Date(user.joinDate).toLocaleDateString("pt-PT")}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Transações: {user.totalTransactions}</span>
            <div className="space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
              >
                Ver Detalhes
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent"
              >
                Contatar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

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
                <span>Dashboard</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
                <span className="font-serif text-2xl font-bold gold-gradient">Micro Invest</span>
                <span className="text-gray-400 text-sm ml-4">Gerenciar Usuários</span>
              </div>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white bg-transparent"
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-4 gold-gradient">Gerenciar Usuários</h1>
          <p className="text-xl text-gray-300">Visualize e gerencie investidores e tomadores</p>
        </div>

        {/* Search */}
        <Card className="bg-black/50 border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white h-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/50 border-gray-800">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold text-white">{users.length}</div>
              <p className="text-sm text-gray-400">Total Usuários</p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 border-gray-800">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-green-400">{investors.length}</div>
              <p className="text-sm text-gray-400">Investidores</p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 border-gray-800">
            <CardContent className="p-6 text-center">
              <TrendingDown className="h-8 w-8 mx-auto mb-2 text-red-400" />
              <div className="text-2xl font-bold text-red-400">{borrowers.length}</div>
              <p className="text-sm text-gray-400">Tomadores</p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 border-gray-800">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-blue-400">
                {users.filter((u) => u.status === "active").length}
              </div>
              <p className="text-sm text-gray-400">Ativos</p>
            </CardContent>
          </Card>
        </div>

        {/* User Lists */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-900 border-gray-700">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-gray-300"
            >
              Todos ({filteredUsers.length})
            </TabsTrigger>
            <TabsTrigger
              value="investors"
              className="data-[state=active]:bg-green-400 data-[state=active]:text-black text-gray-300"
            >
              Investidores ({investors.length})
            </TabsTrigger>
            <TabsTrigger
              value="borrowers"
              className="data-[state=active]:bg-red-400 data-[state=active]:text-black text-gray-300"
            >
              Tomadores ({borrowers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="investors">
            <div className="grid gap-6">
              {investors.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="borrowers">
            <div className="grid gap-6">
              {borrowers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <UserManagementContent />
    </ProtectedRoute>
  )
}
