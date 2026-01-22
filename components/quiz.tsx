"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ChevronRight, CheckCircle2, Terminal } from "lucide-react"

const questions = [
  {
    question: "PROTOCOLO DE SEGURIDAD: Si tuvieras acceso a la receta secreta de la hamburguesa más famosa, ¿qué harías?",
    options: ["Guardarla solo para mí", "Venderla y competir con ellos", "Compartirla en redes sociales"],
  },
  {
    question: "NIVEL DE EXPERIENCIA: ¿Buscas replicar el sabor exacto o crear algo nuevo?",
    options: ["Quiero el sabor exacto (Réplica)", "Quiero experimentar", "No lo sé, solo tengo hambre"],
  },
  {
    question: "ADVERTENCIA FINAL: El contenido que vas a ver revela técnicas industriales. ¿Entendido?",
    options: ["Entendido, muéstrame los archivos", "Prefiero no saber"],
  },
]

export function Quiz() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizState, setQuizState] = useState<'question' | 'analyzing' | 'granted'>('question')
  const [progressLog, setProgressLog] = useState<string[]>([])

  const handleAnswer = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      startAnalysis()
    }
  }

  // Simula un "hackeo" o análisis del sistema para generar expectativa
  const startAnalysis = () => {
    setQuizState('analyzing')
    
    const logs = [
      "Conectando con el servidor...",
      "Verificando perfil de usuario...",
      "Analizando respuestas...",
      "Desencriptando la Bóveda...",
      "ACCESO AUTORIZADO."
    ]

    let i = 0
    const interval = setInterval(() => {
      setProgressLog(prev => [...prev, logs[i]])
      i++
      if (i >= logs.length) {
        clearInterval(interval)
        setTimeout(() => setQuizState('granted'), 800)
      }
    }, 600) // Velocidad de los mensajes
  }

  const enterVault = () => {
    router.push("/feed") 
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black px-4 font-mono overflow-hidden">
      {/* Fondo Matrix Sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md border border-[#00ff41]/30 bg-black/90 p-6 shadow-[0_0_50px_rgba(0,255,65,0.1)] backdrop-blur-md rounded-xl">
        
        {quizState === 'question' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6 flex items-center justify-between border-b border-[#00ff41]/20 pb-4">
              <div className="flex items-center gap-2 text-[#00ff41]">
                <Terminal className="h-4 w-4" />
                <span className="text-xs font-bold tracking-widest">SISTEMA ACTIVO</span>
              </div>
              <span className="text-xs text-gray-500">{currentQuestion + 1}/{questions.length}</span>
            </div>

            <h2 className="mb-8 text-lg font-bold leading-relaxed text-white md:text-xl">
              <span className="text-[#00ff41] mr-2 blink-cursor">{">"}</span>
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={handleAnswer}
                  className="group relative w-full overflow-hidden rounded border border-[#00ff41]/30 bg-black/50 px-4 py-4 text-left text-sm text-gray-300 transition-all hover:border-[#00ff41] hover:text-[#00ff41] hover:bg-[#00ff41]/5"
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {quizState === 'analyzing' && (
          <div className="flex flex-col items-center justify-center py-8 font-mono text-xs md:text-sm">
             <div className="w-full space-y-2 text-[#00ff41]">
                {progressLog.map((log, i) => (
                  <p key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                    {">"} {log}
                  </p>
                ))}
                <span className="inline-block w-2 h-4 bg-[#00ff41] animate-pulse ml-1"/>
             </div>
          </div>
        )}

        {quizState === 'granted' && (
          <div className="text-center animate-in zoom-in duration-500 py-4">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#00ff41]/10 shadow-[0_0_30px_rgba(0,255,65,0.4)]">
              <CheckCircle2 className="h-10 w-10 text-[#00ff41]" />
            </div>
            
            <h3 className="mb-2 text-2xl font-bold text-white tracking-wider">
              ACCESO CONCEDIDO
            </h3>
            <p className="mb-8 text-sm text-gray-400">
              Tu perfil es compatible. Los archivos han sido desbloqueados.
            </p>

            <Button 
              onClick={enterVault}
              className="w-full bg-[#00ff41] py-8 text-black hover:bg-[#00ff41] hover:scale-105 transition-transform font-bold text-lg tracking-widest shadow-[0_0_20px_rgba(0,255,65,0.4)]"
            >
              ENTRAR A LA BÓVEDA
            </Button>
          </div>
        )}

      </div>
      
      <style jsx global>{`
        .blink-cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
