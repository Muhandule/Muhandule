"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ClientUser {
  id: string
  nomeCompleto: string
  numeroBi: string
  telefone: string
  email: string
  status: "pendente" | "aprovado" | "rejeitado"
  investimentos: Array<{
    id: string
    valor: number
    dataInvestimento: string
    dataVencimento: string
    retornoEsperado: number
    status: "ativo" | "vencido" | "pago"
  }>
  emprestimos: Array<{
    id: string
    valor: number
    juros: number
    valorTotal: number
    dataEmprestimo: string
    dataVencimento: string
    prestacaoMensal: number
    prazoMeses: number
    status: "pendente" | "aprovado" | "ativo" | "pago" | "rejeitado"
    motivoEmprestimo: string
  }>
}

interface ClientAuthContextType {
  user: ClientUser | null
  isAuthenticated: boolean
  login: (numeroBi: string, telefone: string) => boolean
  logout: () => void
  isLoading: boolean
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined)

// Dados simulados de clientes
const MOCK_CLIENTS: ClientUser[] = [
  {
    id: "1",
    nomeCompleto: "João Silva Santos",
    numeroBi: "123456789A",
    telefone: "+258 84 123 4567",
    email: "joao@email.com",
    status: "aprovado",
    investimentos: [
      {
        id: "inv1",
        valor: 5000,
        dataInvestimento: "2024-01-15",
        dataVencimento: "2025-01-15",
        retornoEsperado: 7500,
        status: "ativo",
      },
      {
        id: "inv2",
        valor: 2000,
        dataInvestimento: "2023-06-10",
        dataVencimento: "2024-06-10",
        retornoEsperado: 3000,
        status: "pago",
      },
    ],
    emprestimos: [
      {
        id: "emp1",
        valor: 3000,
        juros: 900,
        valorTotal: 3900,
        dataEmprestimo: "2024-03-01",
        dataVencimento: "2025-03-01",
        prestacaoMensal: 325,
        prazoMeses: 12,
        status: "ativo",
        motivoEmprestimo: "Expansão do negócio",
      },
    ],
  },
  {
    id: "2",
    nomeCompleto: "Maria Fernanda Costa",
    numeroBi: "987654321B",
    telefone: "+258 85 987 6543",
    email: "maria@email.com",
    status: "pendente",
    investimentos: [],
    emprestimos: [
      {
        id: "emp2",
        valor: 1500,
        juros: 450,
        valorTotal: 1950,
        dataEmprestimo: "",
        dataVencimento: "",
        prestacaoMensal: 162.5,
        prazoMeses: 12,
        status: "pendente",
        motivoEmprestimo: "Compra de equipamentos",
      },
    ],
  },
]

export function ClientAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se já está autenticado no localStorage
    const clientAuth = localStorage.getItem("micro-invest-client-auth")
    if (clientAuth) {
      const clientData = JSON.parse(clientAuth)
      const foundClient = MOCK_CLIENTS.find((c) => c.id === clientData.id)
      if (foundClient) {
        setUser(foundClient)
      }
    }
    setIsLoading(false)
  }, [])

  const login = (numeroBi: string, telefone: string): boolean => {
    const client = MOCK_CLIENTS.find((c) => c.numeroBi === numeroBi && c.telefone === telefone)

    if (client) {
      setUser(client)
      localStorage.setItem("micro-invest-client-auth", JSON.stringify({ id: client.id }))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("micro-invest-client-auth")
  }

  return (
    <ClientAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  )
}

export function useClientAuth() {
  const context = useContext(ClientAuthContext)
  if (context === undefined) {
    throw new Error("useClientAuth must be used within a ClientAuthProvider")
  }
  return context
}
