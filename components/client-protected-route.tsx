"use client"

import type React from "react"

import { useClientAuth } from "@/contexts/client-auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ClientProtectedRouteProps {
  children: React.ReactNode
}

export function ClientProtectedRoute({ children }: ClientProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useClientAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/cliente/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 animate-pulse"></div>
          <p className="text-gray-300">Verificando acesso...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
