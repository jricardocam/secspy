"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const questions = [
  {
    question: "¿Por qué quieres dominar el sabor?",
    options: ["Sabor de franquicia en casa", "Vender y ganar dinero con comida", "Las dos"],
  },
  {
    question: "¿Cuánta experiencia tienes en cocina?",
    options: ["Principiante", "Intermedio", "Avanzado"],
  },
  {
    question: "¿Cuánto tiempo puedes dedicar a aprender?",
    options: ["1-2 horas/semana", "3-5 horas/semana", "Más de 5 horas/semana"],
  },
]

export function Quiz() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = () => {
    setAnswered(true)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        // Move to next question
        setCurrentQuestion((prev) => prev + 1)
        setAnswered(false)
      } else {
        // All questions answered, show result
        setShowResult(true)
        setTimeout(() => {
          router.push("/feed")
        }, 2000)
      }
    }, 500)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-background px-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.05) 2px, rgba(0,255,0,0.05) 4px)",
        }}
      />

      <div className="absolute inset-0 bg-primary/3 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {!showResult ? (
          <>
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                <span>
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 w-full rounded-full bg-muted">
                <div
                  className="h-1 rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <h1 className="mb-10 text-center text-2xl font-bold leading-tight text-foreground">
              {questions[currentQuestion].question}
            </h1>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={handleAnswer}
                  disabled={answered}
                  variant="outline"
                  className={`w-full break-words py-6 text-base transition-all duration-300 ${
                    answered
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border bg-card text-card-foreground hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-6 inline-block rounded-full border border-primary/30 bg-primary/10 px-6 py-3">
              <p className="font-mono text-sm text-primary">ANÁLISIS COMPLETO</p>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Perfil confirmado.</h2>
            <h2 className="text-2xl font-bold text-foreground">Acceso listo.</h2>
          </div>
        )}
      </div>
    </div>
  )
}
