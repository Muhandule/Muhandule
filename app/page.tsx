import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, TrendingUp, Shield, Clock, Calculator, MessageCircle, QrCode, CreditCard } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
              <span className="font-serif text-2xl font-bold gold-gradient">Micro Invest</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#como-funciona" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Como Funciona
              </a>
              <a href="#simulador" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Simulador
              </a>
              <a href="#pagamentos" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Pagamentos
              </a>
              <a href="#sobre" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Sobre
              </a>
              <a href="#contato" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Contato
              </a>
            </nav>
            <div className="flex space-x-2">
              <Button
                asChild
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-transparent"
              >
                <Link href="/cliente/login">Minha Conta</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black bg-transparent"
              >
                <Link href="/registro">Registrar-se</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent"
              >
                <Link href="/admin/login">Área do Gestor</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-5xl lg:text-7xl font-bold mb-6">
              <span className="gold-gradient">Investimentos</span>
              <br />
              <span className="text-white">Inteligentes</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Plataforma premium de microcrédito onde seus investimentos geram
              <span className="text-yellow-400 font-semibold"> 50% de retorno anual</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 px-8 py-4 text-lg"
              >
                Começar a Investir
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg bg-transparent"
              >
                <Link href="/registro">Solicitar Empréstimo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4 gold-gradient">Como Funciona</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Duas modalidades exclusivas para maximizar seus ganhos
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Para Investidores */}
            <Card className="bg-black/50 border-gray-800 hover:border-yellow-400/50 transition-all duration-300">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-2xl font-serif gold-gradient">Para Investidores</CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  Empreste seu dinheiro e receba retornos excepcionais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p className="text-gray-300">Empreste qualquer valor à Micro Invest</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p className="text-gray-300">
                      Receba <span className="text-yellow-400 font-semibold">50% de retorno</span> após 1 ano
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p className="text-gray-300">Investimento seguro e garantido</p>
                  </div>
                </div>
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                  <p className="text-yellow-400 font-semibold text-center">
                    Exemplo: Invista 1.000 MZN → Receba 1.500 MZN em 1 ano
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Para Tomadores */}
            <Card className="bg-black/50 border-gray-800 hover:border-yellow-400/50 transition-all duration-300">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-serif text-white">Para Tomadores</CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  Obtenha crédito rápido para seus projetos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                    <p className="text-gray-300">Solicite empréstimo de qualquer valor</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                    <p className="text-gray-300">
                      Taxa de juros de <span className="text-red-400 font-semibold">30% ao ano</span>
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                    <p className="text-gray-300">Aprovação rápida e sem burocracia</p>
                  </div>
                </div>
                <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-4">
                  <p className="text-red-400 font-semibold text-center">
                    Exemplo: Pegue 1.000 MZN → Pague 1.300 MZN em 1 ano
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simulador Básico */}
      <section id="simulador" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4 gold-gradient">Simulador</h2>
            <p className="text-xl text-gray-300">Calcule seus ganhos ou custos antes de decidir</p>
          </div>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif flex items-center justify-center gap-2">
                <Calculator className="h-6 w-6 text-yellow-400" />
                Simulação Rápida
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Simulador Investidor */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-yellow-400 text-center">Como Investidor</h3>
                  <div className="space-y-3">
                    <Label htmlFor="invest-amount" className="text-gray-300">
                      Valor a Investir (MZN)
                    </Label>
                    <Input
                      id="invest-amount"
                      type="number"
                      placeholder="1000"
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                  </div>
                  <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-gray-400">Após 1 ano você receberá:</p>
                    <p className="text-2xl font-bold text-yellow-400">1.500 MZN</p>
                    <p className="text-sm text-green-400">Lucro: 500 MZN (50%)</p>
                  </div>
                </div>

                {/* Simulador Tomador */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-400 text-center">Como Tomador</h3>
                  <div className="space-y-3">
                    <Label htmlFor="loan-amount" className="text-gray-300">
                      Valor do Empréstimo (MZN)
                    </Label>
                    <Input
                      id="loan-amount"
                      type="number"
                      placeholder="1000"
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                  </div>
                  <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-gray-400">Após 1 ano você pagará:</p>
                    <p className="text-2xl font-bold text-red-400">1.300 MZN</p>
                    <p className="text-sm text-red-400">Juros: 300 MZN (30%)</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700"
                >
                  <Link href="/simulador">
                    Simulador Avançado
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Added payment methods section */}
      <section id="pagamentos" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4 gold-gradient">Métodos de Pagamento</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Formas seguras e convenientes para investir ou pagar empréstimos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-black/50 border-gray-800 hover:border-blue-400/50 transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-serif text-blue-400">E-mola</CardTitle>
                <CardDescription className="text-gray-400">Carteira móvel</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/50 border-gray-800 hover:border-green-400/50 transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-serif text-green-400">M-pesa</CardTitle>
                <CardDescription className="text-gray-400">Carteira móvel</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/50 border-gray-800 hover:border-purple-400/50 transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-serif text-purple-400">M-Kesh</CardTitle>
                <CardDescription className="text-gray-400">Carteira móvel</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/50 border-gray-800 hover:border-yellow-400/50 transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl font-serif gold-gradient">Transferência</CardTitle>
                <CardDescription className="text-gray-400">Bancária</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700"
            >
              <Link href="/pagamentos">
                Ver Todos os Métodos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-8 gold-gradient">Sobre a Micro Invest</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Somos uma plataforma premium de microcrédito que conecta investidores a oportunidades excepcionais de
            retorno. Nossa missão é democratizar o acesso ao crédito enquanto oferecemos aos nossos investidores
            rendimentos superiores ao mercado tradicional.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <Shield className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Segurança</h3>
              <p className="text-gray-400">Investimentos protegidos e garantidos</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rentabilidade</h3>
              <p className="text-gray-400">50% de retorno anual garantido</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Agilidade</h3>
              <p className="text-gray-400">Processos rápidos e sem burocracia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section with WhatsApp and QR Code */}
      <section id="contato" className="py-20 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4 gold-gradient">Entre em Contato</h2>
            <p className="text-xl text-gray-300">Fale conosco através dos nossos canais de atendimento</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* WhatsApp Contact */}
            <Card className="bg-black/50 border-gray-800 hover:border-green-400/50 transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-serif text-green-400">WhatsApp</CardTitle>
                <CardDescription className="text-gray-400">Fale diretamente com nosso gestor</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-4">Atendimento personalizado para investidores e tomadores</p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700"
                >
                  <a
                    href="https://wa.me/258841234567?text=Olá! Gostaria de falar sobre os serviços da Micro Invest."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Falar no WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* QR Code */}
            <Card className="bg-black/50 border-gray-800 hover:border-purple-400/50 transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-serif text-purple-400">QR Code</CardTitle>
                <CardDescription className="text-gray-400">Escaneie para acessar nossos contatos</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-white p-4 rounded-lg inline-block mb-4">
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <QrCode className="h-8 w-8 mx-auto mb-1" />
                      <p className="text-xs">QR Code</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">Contém WhatsApp, email e informações de contato</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
              <span className="font-serif text-2xl font-bold gold-gradient">Micro Invest</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 Micro Invest. Todos os direitos reservados.</p>
              <p className="text-sm mt-1">Investimentos inteligentes para o futuro</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
