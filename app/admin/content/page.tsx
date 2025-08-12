"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, Upload, ImageIcon, Megaphone, Newspaper, Trash2, Edit, Plus } from "lucide-react"
import Link from "next/link"

interface ContentItem {
  id: string
  title: string
  description: string
  type: "image" | "announcement" | "news"
  date: string
  active: boolean
}

function ContentManagementContent() {
  const { logout } = useAuth()
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Banner Principal",
      description: "Imagem do hero da página inicial",
      type: "image",
      date: "2025-01-15",
      active: true,
    },
    {
      id: "2",
      title: "Promoção Janeiro",
      description: "Taxa especial de 45% para novos investidores",
      type: "announcement",
      date: "2025-01-10",
      active: true,
    },
    {
      id: "3",
      title: "Nova Funcionalidade",
      description: "Lançamento do simulador avançado",
      type: "news",
      date: "2025-01-08",
      active: false,
    },
  ])

  const [newContent, setNewContent] = useState({
    title: "",
    description: "",
    type: "image" as const,
  })

  const handleAddContent = () => {
    if (newContent.title && newContent.description) {
      const newItem: ContentItem = {
        id: Date.now().toString(),
        title: newContent.title,
        description: newContent.description,
        type: newContent.type,
        date: new Date().toISOString().split("T")[0],
        active: true,
      }
      setContentItems([newItem, ...contentItems])
      setNewContent({ title: "", description: "", type: "image" })
    }
  }

  const handleDeleteContent = (id: string) => {
    setContentItems(contentItems.filter((item) => item.id !== id))
  }

  const toggleContentStatus = (id: string) => {
    setContentItems(contentItems.map((item) => (item.id === id ? { ...item, active: !item.active } : item)))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "announcement":
        return <Megaphone className="h-4 w-4" />
      case "news":
        return <Newspaper className="h-4 w-4" />
      default:
        return <ImageIcon className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "text-blue-400"
      case "announcement":
        return "text-yellow-400"
      case "news":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

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
                <span className="text-gray-400 text-sm ml-4">Gerenciar Conteúdo</span>
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
          <h1 className="font-serif text-4xl font-bold mb-4 gold-gradient">Gerenciar Conteúdo</h1>
          <p className="text-xl text-gray-300">Adicione e gerencie imagens, anúncios e novidades</p>
        </div>

        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-900 border-gray-700">
            <TabsTrigger
              value="add"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-gray-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Conteúdo
            </TabsTrigger>
            <TabsTrigger
              value="manage"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-gray-300"
            >
              <Edit className="h-4 w-4 mr-2" />
              Gerenciar Existente
            </TabsTrigger>
          </TabsList>

          {/* Add Content Tab */}
          <TabsContent value="add">
            <Card className="bg-black/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-serif gold-gradient">Adicionar Novo Conteúdo</CardTitle>
                <CardDescription className="text-gray-400">
                  Crie novos anúncios, adicione imagens ou publique novidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card
                    className={`cursor-pointer transition-all duration-200 ${
                      newContent.type === "image"
                        ? "bg-blue-400/20 border-blue-400"
                        : "bg-black/30 border-gray-700 hover:border-blue-400/50"
                    }`}
                    onClick={() => setNewContent({ ...newContent, type: "image" })}
                  >
                    <CardContent className="p-6 text-center">
                      <ImageIcon className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                      <h3 className="font-semibold text-blue-400">Imagem</h3>
                      <p className="text-sm text-gray-400 mt-2">Banners, fotos, gráficos</p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all duration-200 ${
                      newContent.type === "announcement"
                        ? "bg-yellow-400/20 border-yellow-400"
                        : "bg-black/30 border-gray-700 hover:border-yellow-400/50"
                    }`}
                    onClick={() => setNewContent({ ...newContent, type: "announcement" })}
                  >
                    <CardContent className="p-6 text-center">
                      <Megaphone className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                      <h3 className="font-semibold text-yellow-400">Anúncio</h3>
                      <p className="text-sm text-gray-400 mt-2">Promoções, avisos importantes</p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all duration-200 ${
                      newContent.type === "news"
                        ? "bg-green-400/20 border-green-400"
                        : "bg-black/30 border-gray-700 hover:border-green-400/50"
                    }`}
                    onClick={() => setNewContent({ ...newContent, type: "news" })}
                  >
                    <CardContent className="p-6 text-center">
                      <Newspaper className="h-12 w-12 mx-auto mb-4 text-green-400" />
                      <h3 className="font-semibold text-green-400">Novidade</h3>
                      <p className="text-sm text-gray-400 mt-2">Atualizações, lançamentos</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300 text-lg">
                      Título
                    </Label>
                    <Input
                      id="title"
                      placeholder="Digite o título do conteúdo"
                      value={newContent.title}
                      onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                      className="bg-gray-900 border-gray-700 text-white h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300 text-lg">
                      Descrição
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva o conteúdo..."
                      value={newContent.description}
                      onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
                      className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
                    />
                  </div>

                  {newContent.type === "image" && (
                    <div className="space-y-2">
                      <Label className="text-gray-300 text-lg">Upload de Imagem</Label>
                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-gray-600 transition-colors">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-400 mb-2">Clique para fazer upload ou arraste a imagem aqui</p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF até 10MB</p>
                        <Input type="file" className="hidden" accept="image/*" />
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleAddContent}
                  disabled={!newContent.title || !newContent.description}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 h-12 text-lg"
                >
                  Adicionar Conteúdo
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Content Tab */}
          <TabsContent value="manage">
            <Card className="bg-black/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-serif gold-gradient">Conteúdo Existente</CardTitle>
                <CardDescription className="text-gray-400">
                  Gerencie, edite ou remova conteúdo existente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentItems.map((item) => (
                    <Card key={item.id} className="bg-gray-900/50 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg bg-gray-800 ${getTypeColor(item.type)}`}>
                              {getTypeIcon(item.type)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{item.title}</h3>
                              <p className="text-gray-400 text-sm">{item.description}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Criado em {new Date(item.date).toLocaleDateString("pt-PT")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => toggleContentStatus(item.id)}
                              variant="outline"
                              size="sm"
                              className={
                                item.active
                                  ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-white bg-transparent"
                                  : "border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white bg-transparent"
                              }
                            >
                              {item.active ? "Ativo" : "Inativo"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteContent(item.id)}
                              variant="outline"
                              size="sm"
                              className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function ContentPage() {
  return (
    <ProtectedRoute>
      <ContentManagementContent />
    </ProtectedRoute>
  )
}
