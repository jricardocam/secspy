"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"

export function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [fading, setFading] = useState(false)

  const handleStart = async () => {
    if (started) return

    setFading(true)

    // Wait for fade animation to complete
    setTimeout(async () => {
      const video = videoRef.current
      if (!video) return

      try {
        video.muted = false
        video.volume = 1
        await video.play()
        setStarted(true)
      } catch (e) {
        console.log("Play failed:", e)
      }
    }, 400)
  }

  return (
    <div
      className="relative h-full w-full bg-black flex items-center justify-center cursor-pointer"
      onClick={handleStart}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        preload="auto"
        onEnded={() => router.push("/quiz")} // Redirect to quiz instead of incoming-call
      >
        <source src="https://recursoexperto.com/wp-content/uploads/2026/01/Video1.mp4" type="video/mp4" />
      </video>

      {!started && (
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center transition-opacity duration-400 pointer-events-none ${fading ? "opacity-0" : "opacity-100"}`}
        >
          {/* Main CTA Button - positioned in center/upper area */}
          <div
            className="px-8 py-4 bg-[#00ff41] text-black font-semibold text-base rounded-lg"
            style={{ marginTop: "20%" }}
          >
            Iniciar la experiencia interactiva
          </div>

          {/* Bottom overlay text */}
          <div className="absolute bottom-12 left-0 right-0 text-center flex flex-col items-center gap-2">
            <p
              className="text-[#00ff41] tracking-wide font-semibold text-sm"
              style={{ opacity: 0.7 }}
            >
              ¿Prefieres ir directo?
            </p>
            <a
              href="/oferta"
              onClick={(e) => e.stopPropagation()}
              className="text-white text-sm underline hover:text-gray-300 transition-colors pointer-events-auto"
            >
              Estoy listo: quiero los secretos por $10 USD
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
