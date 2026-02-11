"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

const TIEMPO_MOSTRAR_TARJETA = 3 // seconds
const URL_DESTINO = "/oferta"
const COUNTDOWN_SECONDS = 5

const PRODUCTO = {
  nombre: "LA COCINA SECRETA",
  descripcion: "Pack Completo \u00B7 14 Gu\u00EDas",
  imagen: "/food-burger.jpg",
  precioOriginal: "$67",
  precioOferta: "$10 USD",
  rating: 5,
  resenas: 47,
  badge: "73 personas vieron esto hoy",
}

export function FeedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const redirectedRef = useRef(false)
  const progressRef = useRef<HTMLDivElement>(null)

  const [muted, setMuted] = useState(true)
  const [showCard, setShowCard] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [showEndOverlay, setShowEndOverlay] = useState(false)
  const [showEndContent, setShowEndContent] = useState(false)
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS)
  const [videoError, setVideoError] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)

  const goToOferta = useCallback(() => {
    if (redirectedRef.current) return
    redirectedRef.current = true
    router.push(URL_DESTINO)
  }, [router])

  // Auto-play muted on mount
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked, try muted
        video.muted = true
        setMuted(true)
        video.play().catch(() => setVideoError(true))
      })
    }
  }, [])

  // Show floating card after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true)
    }, TIEMPO_MOSTRAR_TARJETA * 1000)
    return () => clearTimeout(timer)
  }, [])

  // Video progress bar
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      if (video.duration && isFinite(video.duration)) {
        const progress = (video.currentTime / video.duration) * 100
        setVideoProgress(progress)
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`
        }
      }
    }

    const onEnded = () => {
      setVideoEnded(true)
      setShowCard(false) // Hide card when overlay appears
      setTimeout(() => setShowEndOverlay(true), 100)
      setTimeout(() => setShowEndContent(true), 400)
    }

    const onError = () => setVideoError(true)

    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("ended", onEnded)
    video.addEventListener("error", onError)

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("ended", onEnded)
      video.removeEventListener("error", onError)
    }
  }, [])

  // Countdown after video ends
  useEffect(() => {
    if (!showEndContent) return
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          goToOferta()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [showEndContent, goToOferta])

  // Video error fallback: redirect after 4s
  useEffect(() => {
    if (!videoError) return
    setShowCard(true)
    const timer = setTimeout(() => goToOferta(), 4000)
    return () => clearTimeout(timer)
  }, [videoError, goToOferta])

  const handleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !muted
    setMuted(!muted)
  }

  // --- ERROR STATE ---
  if (videoError) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center" style={{ background: "#0F0E0C" }}>
        <span className="text-5xl mb-4">&#x1F525;</span>
        <p className="text-sm" style={{ color: "#A8A29E", fontFamily: '"DM Sans", sans-serif' }}>
          Cargando tu experiencia...
        </p>
        {/* Show card immediately on error */}
        <FloatingCard onCta={goToOferta} />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#0F0E0C" }}>
      {/* ELEMENT 1: Video fullscreen background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted={muted}
        loop={false}
        preload="auto"
        src="https://recursoexperto.com/wp-content/uploads/2026/01/Video2.2.mp4"
        style={{ pointerEvents: "none" }}
      />

      {/* Dark overlay gradient (always visible) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, transparent 60%)",
          zIndex: 2,
        }}
      />

      {/* Video progress bar - TOP */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "3px",
          background: "rgba(255,255,255,0.1)",
          zIndex: 30,
        }}
      >
        <div
          ref={progressRef}
          className="h-full transition-[width] duration-200"
          style={{
            width: `${videoProgress}%`,
            background: "linear-gradient(90deg, #D97706, #F59E0B, #FBBF24)",
          }}
        />
      </div>

      {/* Sound button - top right */}
      <button
        onClick={handleMute}
        className="absolute top-4 right-4 flex items-center justify-center rounded-full animate-sound-pulse"
        style={{
          width: "40px",
          height: "40px",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 30,
        }}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
      >
        <span className="text-lg">{muted ? "\uD83D\uDD07" : "\uD83D\uDD0A"}</span>
      </button>

      {/* ELEMENT 2: Floating product card */}
      {showCard && !videoEnded && (
        <div className="animate-slide-up-card" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20 }}>
          <FloatingCard onCta={goToOferta} />
        </div>
      )}

      {/* ELEMENT 3: End overlay */}
      {showEndOverlay && (
        <div
          className="absolute inset-0 flex items-center justify-center animate-fade-in-overlay"
          style={{
            background: "rgba(15, 14, 12, 0.85)",
            zIndex: 40,
          }}
        >
          {showEndContent && (
            <div className="flex flex-col items-center px-6 animate-fade-slide-up">
              {/* Badge */}
              <div
                className="rounded-full px-5 py-2"
                style={{
                  background: "rgba(245, 158, 11, 0.15)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                }}
              >
                <span
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "13px",
                    color: "#F59E0B",
                    letterSpacing: "3px",
                  }}
                >
                  ACCESO CONCEDIDO
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-center mt-4"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: "32px",
                  color: "#FAF7F2",
                }}
              >
                TU COCINA SECRETA TE ESPERA
              </h2>

              {/* Subtitle */}
              <p
                className="text-center mt-2"
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: "15px",
                  color: "#A8A29E",
                }}
              >
                Hemos preparado una seleccion exclusiva para ti
              </p>

              {/* Big CTA button */}
              <button
                onClick={goToOferta}
                className="w-full mt-7 animate-btn-glow active:scale-95 transition-transform"
                style={{
                  maxWidth: "360px",
                  padding: "18px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #DC2626, #EA580C, #D97706)",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 25px rgba(220, 38, 38, 0.4)",
                }}
              >
                <span
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "20px",
                    color: "#FFFFFF",
                    letterSpacing: "2px",
                  }}
                >
                  {'OBTENER MI ACCESO \u00B7 $10 USD'}
                </span>
              </button>

              {/* Countdown */}
              <p
                className="text-center mt-4"
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: "13px",
                  color: "#57534E",
                }}
              >
                {countdown > 0 ? `Redirigiendo en ${countdown}...` : "Redirigiendo..."}
              </p>

              {/* Trust text */}
              <p
                className="text-center mt-3"
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: "11px",
                  color: "#57534E",
                }}
              >
                Pago seguro &middot; Acceso inmediato &middot; Garantia 7 dias
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// --- FLOATING CARD COMPONENT ---
function FloatingCard({ onCta }: { onCta: () => void }) {
  return (
    <div
      style={{
        padding: "14px 16px 16px",
        background: "rgba(15, 14, 12, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(245, 158, 11, 0.15)",
      }}
    >
      {/* ROW 1: Product info */}
      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        <img
          src={PRODUCTO.imagen || "/placeholder.svg"}
          alt={PRODUCTO.nombre}
          className="shrink-0 object-cover"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "10px",
            border: "1px solid #2A2520",
          }}
        />

        {/* Texts */}
        <div className="flex-1 min-w-0">
          <p
            className="truncate"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "15px",
              color: "#FAF7F2",
              letterSpacing: "1px",
              lineHeight: 1.2,
            }}
          >
            {PRODUCTO.nombre}
          </p>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "12px",
              color: "#A8A29E",
              marginTop: "2px",
            }}
          >
            {PRODUCTO.descripcion}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <span style={{ color: "#F59E0B", fontSize: "12px" }}>
              {Array.from({ length: PRODUCTO.rating }).map((_, i) => (
                <span key={i}>&#9733;</span>
              ))}
            </span>
            <span
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: "11px",
                color: "#57534E",
              }}
            >
              {PRODUCTO.resenas} resenas
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="shrink-0 text-right">
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "12px",
              color: "#57534E",
              textDecoration: "line-through",
            }}
          >
            {PRODUCTO.precioOriginal}
          </p>
          <p
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "22px",
              color: "#FBBF24",
              lineHeight: 1,
            }}
          >
            {PRODUCTO.precioOferta}
          </p>
        </div>
      </div>

      {/* ROW 2: CTA Button */}
      <button
        onClick={onCta}
        className="w-full mt-3 animate-btn-glow active:scale-95 transition-transform"
        style={{
          padding: "14px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #DC2626, #EA580C, #D97706)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 -2px 20px rgba(220, 38, 38, 0.3)",
        }}
      >
        <span
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: "16px",
            color: "#FFFFFF",
            letterSpacing: "2px",
          }}
        >
          VER OFERTA EXCLUSIVA
        </span>
      </button>

      {/* ROW 3: Activity badge */}
      <p
        className="text-center mt-2"
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "11px",
          color: "#A8A29E",
        }}
      >
        &#x1F525; {PRODUCTO.badge}
      </p>
    </div>
  )
}
