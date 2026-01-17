"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, ShieldCheck } from "lucide-react"

export function LoginInstagram() {
  const router = useRouter()
  const [displayUsername, setDisplayUsername] = useState("")
  const [displayPassword, setDisplayPassword] = useState("")
  const [fieldsComplete, setFieldsComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const fullUsername = "archivos_sellados"
    const fullPassword = "••••••••••••••"
    let usernameIndex = 0
    let passwordIndex = 0

    const interval = setInterval(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {})
      }

      if (usernameIndex < fullUsername.length) {
        setDisplayUsername(fullUsername.slice(0, usernameIndex + 1))
        usernameIndex++
      } else if (passwordIndex < fullPassword.length) {
        setDisplayPassword(fullPassword.slice(0, passwordIndex + 1))
        passwordIndex++
      } else {
        setFieldsComplete(true)
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    router.push("/biblioteca")
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-background px-4">
      <audio
        ref={audioRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mechanical-keyboard-typing-sound-effect-hd-379363%20%28mp3cut.net%29-is7w3DLijKG05REqrS7j9F2h25IdLP.mp3"
        preload="auto"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full border-2 border-primary/20" />
            <div
              className="absolute inset-2 animate-pulse rounded-full border-2 border-primary/30"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute inset-4 animate-pulse rounded-full border-2 border-primary/40"
              style={{ animationDelay: "1s" }}
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-card shadow-lg shadow-primary/20">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">BÓVEDA SECRETA</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">Sistema de Archivos Clasificados</p>
        </div>

        <div className="mb-8 rounded-lg border border-primary/20 bg-card/50 p-4 text-center backdrop-blur-sm">
          <div className="mb-2 flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">Acceso Restringido</p>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Las franquicias protegen el sabor.
            <br />
            <span className="text-foreground">Nosotros filtramos el método.</span>
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Código de Acceso"
              value={displayUsername}
              readOnly
              className="h-12 border-primary/30 bg-card font-mono text-foreground placeholder:text-muted-foreground focus:border-primary sm:h-14 sm:text-base"
              style={{ cursor: fieldsComplete ? "default" : "text" }}
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Clave Secreta"
              value={displayPassword}
              readOnly
              className="h-12 border-primary/30 bg-card font-mono text-foreground placeholder:text-muted-foreground focus:border-primary sm:h-14 sm:text-base"
              style={{ cursor: fieldsComplete ? "default" : "text" }}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !fieldsComplete}
            className={`h-12 w-full text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg sm:h-14 sm:text-base ${
              fieldsComplete && !isLoading
                ? "animate-pulse bg-primary shadow-primary/30 hover:bg-primary/90 hover:shadow-primary/50"
                : "bg-primary/50"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                Abriendo Bóveda...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                Ingresar a la Bóveda Secreta
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
