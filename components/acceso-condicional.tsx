"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface LogLine {
  id: number
  text: string
  type: "command" | "progress" | "warning" | "success"
}

export function AccesoCondicional() {
  const router = useRouter()
  const [lines, setLines] = useState<LogLine[]>([])
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const logSequence = [
    { text: "> Verificando intención…", type: "command" as const, delay: 0 },
    { text: "[██░░░░░] 23%", type: "progress" as const, delay: 2000 },
    { text: "[████░░░] 67%", type: "progress" as const, delay: 4000 },
    { text: "> Acceso no autorizado al público", type: "warning" as const, delay: 6000 },
    { text: "> Advertencia: CONFIDENCIAL Recetas Sectretas", type: "warning" as const, delay: 8000 },
    { text: "[██████░] 89%", type: "progress" as const, delay: 10000 },
    { text: "> Entrando a La Bóveda", type: "success" as const, delay: 13000 },
  ]

  useEffect(() => {
    logSequence.forEach((log, index) => {
      setTimeout(() => {
        setLines((prev) => [...prev, { id: index, text: log.text, type: log.type }])

        if (log.type === "progress") {
          const percent = Number.parseInt(log.text.match(/\d+/)?.[0] || "0")
          setProgress(percent)

          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch((e) => console.log("[v0] Audio play prevented:", e.message))
          }
        }
        if (log.text.includes("La Bóveda")) {
          setProgress(100)
        }
      }, log.delay)
    })

    const timeout = setTimeout(() => {
      router.push("/vsl")
    }, 15000)

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

      <div className="absolute inset-0 bg-yellow-500/5 blur-3xl" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-border bg-card px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-destructive" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-success" />
          <span className="ml-4 font-mono text-xs text-muted-foreground">BÓVEDA — Contenido clasificado</span>
        </div>

        <div className="min-h-[320px] rounded-b-lg border border-border bg-card/80 p-4 backdrop-blur-sm">
          <div className="space-y-2 font-mono text-sm">
            {lines.map((line) => (
              <div
                key={line.id}
                className={`break-words ${
                  line.type === "command"
                    ? "text-primary"
                    : line.type === "progress"
                      ? "text-muted-foreground"
                      : line.type === "warning"
                        ? "text-yellow-500"
                        : "text-success"
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
                className="h-full transition-all duration-700 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: progress < 67 ? "var(--primary)" : progress < 100 ? "#eab308" : "var(--success)",
                }}
              />
            </div>
            <p className="mt-2 text-center font-mono text-xs text-muted-foreground">{progress}% Verificando credenciales</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="animate-pulse font-mono text-xs text-yellow-500/60">Verificando credenciales...</p>
      </div>
    </div>
  )
}
