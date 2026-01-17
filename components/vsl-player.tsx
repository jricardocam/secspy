"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Play } from "lucide-react"

export function VSLPlayer() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  const [started, setStarted] = useState(false)

  const startWithSound = async () => {
    const video = videoRef.current
    if (!video || started) return

    try {
      video.muted = false
      video.volume = 1
      await video.play()
      setStarted(true)
    } catch (e) {
      console.log("Play failed:", e)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onEnded = () => {
      router.push("/whatsapp-gancho")
    }

    video.addEventListener("ended", onEnded)
    return () => video.removeEventListener("ended", onEnded)
  }, [router])

  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-background p-4">
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-5"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)",
        }}
      />

      <div className="relative z-20 w-full max-w-md">
        <div className="mb-4 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Archivo Clasificado</p>
        </div>

        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg border border-border bg-card flex items-center justify-center">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            playsInline
            preload="auto"
            src="https://recursoexperto.com/wp-content/uploads/2026/01/Video3.mp4"
          />

          {!started && (
            <button
              onClick={startWithSound}
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-background/60 transition-all hover:bg-background/70"
              aria-label="Play"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 transition-transform hover:scale-110">
                <Play className="ml-1 h-10 w-10 text-primary-foreground" />
              </div>
            </button>
          )}

          <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary" />
          <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary" />
        </div>
      </div>
    </div>
  )
}
