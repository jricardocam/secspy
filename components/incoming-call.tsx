"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function IncomingCall() {
  const router = useRouter()
  const [callState, setCallState] = useState<"incoming" | "connected">("incoming")
  const [seconds, setSeconds] = useState(0)
  const [showGlitch, setShowGlitch] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const callAudioRef = useRef<HTMLAudioElement>(null)

  // Timer for connected call
  useEffect(() => {
    if (callState !== "connected") return

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s >= 54) {
          setShowGlitch(true)
          setTimeout(() => {
            router.push("/whatsapp-operador")
          }, 1000)
          return s
        }
        return s + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [callState, router])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (callState === "incoming") {
      audio.loop = true
      audio.play().catch(() => {})
    } else {
      audio.pause()
      audio.currentTime = 0
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [callState])

  useEffect(() => {
    if (callState === "connected" && callAudioRef.current) {
      callAudioRef.current.play().catch((error) => {
        console.log("[v0] Audio playback failed:", error)
      })
    }
  }, [callState])

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAccept = useCallback(() => {
    setCallState("connected")
  }, [])

  return (
    <div className="relative h-full w-full bg-black">
      <audio ref={audioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mobile-phone-vibration-77849-4vIEtvbtYvPBlpLgrxxY8c8QqS3D8N.mp3" />
      <audio ref={callAudioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AudioLlamada-xGHgBLMeycw8cWxj45dZpNEHOxBDNA.MP3" />

      {showGlitch && (
        <div className="absolute inset-0 z-50 bg-black">
          <div className="absolute inset-0 animate-glitch bg-primary/20" />
          <div className="absolute inset-0 animate-glitch bg-destructive/20" style={{ animationDelay: "0.1s" }} />
        </div>
      )}

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4">
        <div className="relative mb-12">
          <div
            className={`flex h-32 w-32 items-center justify-center rounded-full bg-zinc-800 overflow-hidden ${callState === "incoming" ? "ring-4 ring-green-500 ring-offset-4 ring-offset-black" : ""}`}
          >
            <img src="/profile-operator.jpg" alt="Caller" className="h-full w-full object-cover" />
          </div>
          {callState === "incoming" && (
            <>
              <div className="absolute inset-0 animate-ping rounded-full bg-white/20" />
              <div
                className="absolute inset-0 animate-ping rounded-full bg-white/10"
                style={{ animationDelay: "0.5s" }}
              />
            </>
          )}
        </div>

        <h1 className="mb-2 text-3xl font-light text-white">
          {callState === "incoming" ? "Llamada entrante" : "Llamando"}
        </h1>

        {callState === "connected" && <p className="mb-12 text-lg font-light text-zinc-400">{formatTime(seconds)}</p>}

        {callState === "incoming" && <div className="mb-12" />}

        {callState === "connected" && (
          <div className="mb-16 flex h-12 items-end gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-green-500"
                style={{
                  animation: `wave 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.05}s`,
                  height: "8px",
                }}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-16">
          {callState === "incoming" && (
            <div className="flex flex-col items-center gap-3">
              <Button
                onClick={handleAccept}
                size="lg"
                className="h-16 w-16 rounded-full bg-green-500 text-white hover:bg-green-600"
              >
                <Phone className="h-7 w-7" />
              </Button>
              <span className="text-sm text-zinc-400">Aceptar</span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            height: 8px;
          }
          50% {
            height: 48px;
          }
        }
      `}</style>
    </div>
  )
}
