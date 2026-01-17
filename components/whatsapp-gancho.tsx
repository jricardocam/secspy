"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Message {
  id: number
  text: string
  isUser: boolean
  isTyping?: boolean
}

export function WhatsAppGancho() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [showCTA, setShowCTA] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const notificationAudioRef = useRef<HTMLAudioElement | null>(null)

  const chatMessages = [
    "Ahora entiendes todo",
    "Cambia tu cocina (y si quieres, tu ingreso).",
    "El archivo completo está disponible HOY.",
    "Después se sella otra vez.",
    "Puedes seguir igual o decidir cambiarlo con La Bóveda Secreta",
  ]

  useEffect(() => {
    notificationAudioRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whatsapp-460912%20%281%29%20%28mp3cut.net%29-eDh6CDHdgxjY3mPberGbi8rQj3YtQY.mp3")
    notificationAudioRef.current.volume = 0.7
    notificationAudioRef.current.preload = "auto"
  }, [])

  useEffect(() => {
    if (currentStep >= chatMessages.length) {
      setIsTyping(false)
      const timeout = setTimeout(() => {
        setShowCTA(true)
      }, 1500)
      return () => clearTimeout(timeout)
    }

    setIsTyping(true)

    setMessages((prev) => [
      ...prev.filter((m) => !m.isTyping),
      { id: Date.now(), text: "", isUser: false, isTyping: true },
    ])

    const delay = currentStep === 2 ? 3000 : 2500

    const timeout = setTimeout(() => {
      setMessages((prev) => [
        ...prev.filter((m) => !m.isTyping),
        { id: Date.now(), text: chatMessages[currentStep], isUser: false },
      ])
      if (notificationAudioRef.current) {
        notificationAudioRef.current.currentTime = 0
        notificationAudioRef.current.play().catch((err) => console.log("[v0] Audio play blocked:", err))
      }
      setCurrentStep((s) => s + 1)
    }, delay)

    return () => clearTimeout(timeout)
  }, [currentStep])

  const handleContinue = () => {
    router.push("/login")
  }

  return (
    <div className="flex h-full flex-col bg-[#e5ddd5]">
      <header className="flex-shrink-0 flex items-center gap-3 bg-[#075e54] px-3 py-2.5">
        <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-white/10">
          <ArrowLeft className="h-5 w-5 text-white" />
        </Button>
        <Image
          src="/profile-operator.jpg"
          alt="Sistema"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h1 className="text-base font-medium text-white">Agente Chef017 </h1>
          <p className="text-xs text-[#d9fdd3]">{isTyping ? "escribiendo..." : "En línea"}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-white/10">
          <Video className="h-5 w-5 text-white" />
        </Button>
        <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-white/10">
          <Phone className="h-5 w-5 text-white" />
        </Button>
        <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-white/10">
          <MoreVertical className="h-5 w-5 text-white" />
        </Button>
      </header>

      <div
        className="flex-1 p-4"
        style={{
          backgroundColor: "#e5ddd5",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='%23d9d0c7' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='15'/%3E%3Cpath d='M80 40 Q85 30 90 40 Q95 50 90 60 Q85 70 80 60 Z'/%3E%3Crect x='130' y='20' width='25' height='25' rx='5'/%3E%3Cpath d='M40 90 L50 80 L60 90 L50 100 Z'/%3E%3Ccircle cx='170' cy='90' r='12'/%3E%3Cpath d='M20 140 Q30 130 40 140 T60 140'/%3E%3Crect x='100' y='130' width='20' height='30' rx='3'/%3E%3Ccircle cx='160' cy='150' r='10'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="mx-auto max-w-md space-y-2">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] break-words rounded-lg px-3 py-2 shadow-sm ${
                  message.isUser
                    ? "rounded-tr-none bg-[#d9fdd3] text-[#111111]"
                    : "rounded-tl-none bg-white text-[#111111]"
                }`}
              >
                {message.isTyping ? (
                  <div className="flex items-center gap-1 py-1">
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-[#667781]"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-[#667781]"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-[#667781]"
                      style={{ animationDelay: "150ms" }}
                    />
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{message.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCTA && (
        <div className="flex-shrink-0 bg-[#f0f2f5] p-4">
          <Button
            onClick={handleContinue}
            className="w-full bg-[#00a884] py-6 text-base font-semibold text-white hover:bg-[#06cf9c]"
          >
            Continuar
          </Button>
        </div>
      )}
    </div>
  )
}
