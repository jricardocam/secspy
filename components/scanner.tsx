"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface LogLine {
  id: number
  text: string
  type: "command" | "progress" | "success" | "warning"
}

export function Scanner() {
  const router = useRouter()
  const [lines, setLines] = useState<LogLine[]>([])
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const logSequence = [
    { text: "> Inicializando protocolo SABOR-IX", type: "command" as const, delay: 0 },
    { text: "[██░░░░░] 28%", type: "progress" as const, delay: 2000 },
    { text: "> Validando acceso", type: "command" as const, delay: 2000 },
    { text: "[████░░░] 57%", type: "progress" as const, delay: 3000 },
    { text: "> Perfil válido", type: "success" as const, delay: 4000 },
    { text: "[██████░] 85%", type: "progress" as const, delay: 5000 },
    { text: "> Acceso confirmado", type: "success" as const, delay: 9000 },
  ]

  useEffect(() => {
    logSequence.forEach((log, index) => {
      setTimeout(() => {
        setLines((prev) => [...prev, { id: index, text: log.text, type: log.type }])
        setCurrentStep(index + 1)

        if (log.type === "progress") {
          const percent = Number.parseInt(log.text.match(/\d+/)?.[0] || "0")
          setProgress(percent)

          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch((e) => console.log("[v0] Audio play prevented:", e.message))
          }
        }
        if (log.text.includes("Acceso parcial")) {
          setProgress(100)
        }
      }, log.delay)
    })

    const timeout = setTimeout(() => {
      router.push("/feed")
    }, 12000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-background p-4">
      <audio ref={audioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Progress-neozzKtbZdqZewEAFppPiEvzdivTSY.mp3" preload="auto" />

      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.05) 2px, rgba(0,255,0,0.05) 4px)",
        }}
      />

      <div className="absolute inset-0 bg-primary/5 blur-3xl" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-border bg-card px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-destructive" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-success" />
          <span className="ml-4 font-mono text-xs text-muted-foreground">SABOR-IX Terminal</span>
        </div>

        <div className="min-h-[300px] rounded-b-lg border border-border bg-card/80 p-4 backdrop-blur-sm">
          <div className="space-y-2 font-mono text-sm">
            {lines.map((line) => (
              <div
                key={line.id}
                className={`break-words ${
                  line.type === "command"
                    ? "text-primary"
                    : line.type === "progress"
                      ? "text-muted-foreground"
                      : line.type === "success"
                        ? "text-success"
                        : "text-yellow-500"
                }`}
              >
                {line.text}
              </div>
            ))}
            <span className="inline-block h-4 w-2 animate-pulse bg-primary" />
          </div>

          <div className="mt-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-center font-mono text-xs text-muted-foreground">{progress}% completado</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="animate-pulse font-mono text-xs text-primary/60">Procesando datos...</p>
      </div>
    </div>
  )
}
