"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Quiz() {
  const router = useRouter()
  const [answered, setAnswered] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const options = ["Sabor de franquicia en casa", "Vender y ganar Dinero con comida", "Las dos"]

  const handleAnswer = () => {
    setAnswered(true)

    setTimeout(() => {
      setShowResult(true)
    }, 500)

    setTimeout(() => {
      router.push("/acceso")
    }, 2500)
  }

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
            <h1 className="mb-10 text-center text-2xl font-bold leading-tight text-foreground">
              {"¿Por qué quieres dominar el sabor?"}
            </h1>

            <div className="space-y-4">
              {options.map((option, index) => (
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
