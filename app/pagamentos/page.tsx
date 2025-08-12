"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Smartphone, Building, Copy, CheckCircle, Info } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PagamentosPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const paymentMethods = [
    {
      id: "emola",
      name: "E-mola",
      type: "Carteira Móvel",
      icon: <Smartphone className="h-8 w-8 text-blue-400" />,
      color: "blue",
      number: "+258 84 123 4567",
      accountName: "Micro Invest Lda",
      instructions: [
        "Abra o aplicativo E-mola no seu telemóvel",
        "Selecione 'Enviar Dinheiro'",
        "Digite o número: +258 84 123 4567",
        "Confirme o nome: Micro Invest Lda",
        "Digite o valor do investimento/pagamento",
        "Confirme a transação com seu PIN",
        "Envie o comprovativo via WhatsApp",
      ],
    },
    {
      id: "mpesa",
      name: "M-pesa",
      type: "Carteira Móvel",
      icon: <Smartphone className="h-8 w-8 text-green-400" />,
      color: "green",
      number: "+258 85 987 6543",
      accountName: "Micro Invest Lda",
      instructions: [
        "Abra o aplicativo M-pesa",
        "Selecione 'Enviar Dinheiro'",
        "Digite o número: +258 85 987 6543",
        "Confirme o nome: Micro Invest Lda",
        "Digite o valor do investimento/pagamento",
        "Confirme a transação",
        "Envie o comprovativo via WhatsApp",
      ],
    },
    {
      id: "mkesh",
      name: "M-Kesh",
      type: "Carteira Móvel",
      icon: <Smartphone className="h-8 w-8 text-purple-400" />,
      color: "purple",
      number: "+258 86 456 7890",
      accountName: "Micro Invest Lda",
      instructions: [
        "Abra o aplicativo M-Kesh",
        "Selecione 'Transferir'",
        "Digite o número: +258 86 456 7890",
        "Confirme o nome: Micro Invest Lda",
        "Digite o valor do investimento/pagamento",
        "Confirme com seu código PIN",
        "Envie o comprovativo via WhatsApp",
      ],
    },
    {
      id: "banco",
      name: "Transferência Bancária",
      type: "Banco",
      icon: <Building className="h-8 w-8 text-yellow-400" />,
      color: "yellow",
      bankName: "Banco Standard Bank",
      accountNumber: "0001234567890",
      accountName: "Micro Invest Limitada",
      iban: "MZ59000100000001234567890",
      instructions: [
        "Acesse o seu banco (online, app ou agência)",
        "Selecione 'Transferência'",
        "Banco: Standard Bank",
        "Número da conta: 0001234567890",
        "Nome: Micro Invest Limitada",
        "IBAN: MZ59000100000001234567890",
        "Digite o valor e confirme",
        "Envie o comprovativo via WhatsApp",
      ],
    },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          border: "border-blue-400/50",
          bg: "bg-blue-400/10",
          text: "text-blue-400",
          button: "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white",
        }
      case "green":
        return {
          border: "border-green-400/50",
          bg: "bg-green-400/10",
          text: "text-green-400",
          button: "border-green-400 text-green-400 hover:bg-green-400 hover:text-white",
        }
      case "purple":
        return {
          border: "border-purple-400/50",
          bg: "bg-purple-400/10",
          text: "text-purple-400",
          button: "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white",
        }
      case "yellow":
        return {
          border: "border-yellow-400/50",
          bg: "bg-yellow-400/10",
          text: "text-yellow-400",
          button: "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white",
        }
      default:
        return {
          border: "border-gray-400/50",
          bg: "bg-gray-400/10",
          text: "text-gray-400",
          button: "border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white",
        }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-6xl mx-auto">
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
          <p className="text-gray-400">Métodos de Pagamento</p>
        </div>

        {/* Important Notice */}
        <Alert className="border-yellow-400/20 bg-yellow-400/10 mb-8">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-yellow-400">
            <strong>Importante:</strong> Após realizar qualquer pagamento, envie sempre o comprovativo via WhatsApp para
            confirmação. Pagamentos sem comprovativo não serão processados.
          </AlertDescription>
        </Alert>

        {/* Payment Methods */}
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 gold-gradient">Métodos de Pagamento</h1>
            <p className="text-xl text-gray-300">Escolha a forma mais conveniente para você</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {paymentMethods.map((method) => {
              const colors = getColorClasses(method.color)
              return (
                <Card
                  key={method.id}
                  className={`bg-black/50 border-gray-800 hover:${colors.border} transition-all duration-300`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-${method.color}-400 to-${method.color}-600 rounded-full flex items-center justify-center`}
                        >
                          {method.icon}
                        </div>
                        <div>
                          <CardTitle className={`text-2xl font-serif ${colors.text}`}>{method.name}</CardTitle>
                          <CardDescription className="text-gray-400">{method.type}</CardDescription>
                        </div>
                      </div>
                      <Badge className={`${colors.bg} ${colors.text} border-${method.color}-400/20`}>Disponível</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Account Details */}
                    <div className={`${colors.bg} border border-${method.color}-400/20 rounded-lg p-4`}>
                      <h3 className={`font-semibold ${colors.text} mb-3`}>Dados para Pagamento:</h3>
                      <div className="space-y-2">
                        {method.number && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Número:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-mono">{method.number}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 w-6 p-0 bg-transparent"
                                onClick={() => copyToClipboard(method.number!, `${method.id}-number`)}
                              >
                                {copiedText === `${method.id}-number` ? (
                                  <CheckCircle className="h-3 w-3 text-green-400" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                        )}
                        {method.bankName && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Banco:</span>
                            <span className="text-white">{method.bankName}</span>
                          </div>
                        )}
                        {method.accountNumber && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Conta:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-mono">{method.accountNumber}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 w-6 p-0 bg-transparent"
                                onClick={() => copyToClipboard(method.accountNumber!, `${method.id}-account`)}
                              >
                                {copiedText === `${method.id}-account` ? (
                                  <CheckCircle className="h-3 w-3 text-green-400" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                        )}
                        {method.iban && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">IBAN:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-mono text-sm">{method.iban}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 w-6 p-0 bg-transparent"
                                onClick={() => copyToClipboard(method.iban!, `${method.id}-iban`)}
                              >
                                {copiedText === `${method.id}-iban` ? (
                                  <CheckCircle className="h-3 w-3 text-green-400" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Nome:</span>
                          <span className="text-white">{method.accountName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h3 className={`font-semibold ${colors.text} mb-3`}>Como Pagar:</h3>
                      <ol className="space-y-2">
                        {method.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <span className={`${colors.text} font-semibold min-w-[20px]`}>{index + 1}.</span>
                            <span className="text-gray-300">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Action Button */}
                    <Button asChild variant="outline" className={`w-full ${colors.button} bg-transparent`}>
                      <a
                        href="https://wa.me/258841234567?text=Olá! Realizei um pagamento e gostaria de enviar o comprovativo."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Enviar Comprovativo
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 space-y-6">
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-blue-400">Informações Importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-2">Para Investimentos:</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Primeiro contacte o gestor via WhatsApp</li>
                    <li>• Confirme o valor e condições</li>
                    <li>• Realize o pagamento</li>
                    <li>• Envie o comprovativo</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Para Pagamento de Empréstimos:</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Verifique o valor da prestação no seu dashboard</li>
                    <li>• Realize o pagamento até a data de vencimento</li>
                    <li>• Envie sempre o comprovativo</li>
                    <li>• Aguarde confirmação do gestor</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-green-400">Horários de Processamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">Carteiras Móveis</h4>
                  <p className="text-sm text-gray-300">Processamento imediato</p>
                  <p className="text-xs text-green-400">24/7 disponível</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">Transferências Bancárias</h4>
                  <p className="text-sm text-gray-300">1-2 dias úteis</p>
                  <p className="text-xs text-yellow-400">Segunda a Sexta</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">Confirmação</h4>
                  <p className="text-sm text-gray-300">Até 2 horas</p>
                  <p className="text-xs text-blue-400">Após envio do comprovativo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
