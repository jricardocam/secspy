"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Heart, MessageCircle, Send, Bookmark, Volume2, VolumeX, MoreHorizontal, X, Music } from "lucide-react"

export function FeedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  const redirectedRef = useRef(false)

  const [isPlaying, setIsPlaying] = useState(false)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [muted, setMuted] = useState(false)
  const [likes, setLikes] = useState(1247)
  const [showComments, setShowComments] = useState(false)
  const [started, setStarted] = useState(false)
  const [showDescription, setShowDescription] = useState(false)

  const comments = [
    { id: 1, user: "chef_master", text: "Esto se ve increíble! 🔥", time: "2h", avatar: "/male-chef-avatar.png" },
    { id: 2, user: "foodlover23", text: "Necesito esta receta YA", time: "1h", avatar: "/woman-foodie-avatar.jpg" },
    { id: 3, user: "cooking_pro", text: "Técnica perfecta 👨‍🍳", time: "45min", avatar: "/professional-cook-avatar.jpg" },
    {
      id: 4,
      user: "saboresmx",
      text: "Esto es nivel restaurante",
      time: "30min",
      avatar: "/mexican-chef-avatar.jpg",
    },
    {
      id: 5,
      user: "cocina_real",
      text: "Jamás había visto este método 😱",
      time: "25min",
      avatar: "/home-cook-woman-avatar.jpg",
    },
    {
      id: 6,
      user: "recetas_secretas",
      text: "Confirmo que funciona 👌",
      time: "20min",
      avatar: "/secret-recipe-avatar.jpg",
    },
    {
      id: 7,
      user: "foodlab",
      text: "Esto cambia las reglas del juego",
      time: "15min",
      avatar: "/food-scientist-avatar.jpg",
    },
    {
      id: 8,
      user: "gourmetpro",
      text: "Se nota el nivel profesional 💯",
      time: "10min",
      avatar: "/gourmet-chef-avatar.jpg",
    },
  ]

  const goToQuiz = () => {
    if (redirectedRef.current) return
    redirectedRef.current = true
    router.push("/quiz")
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onEnded = () => goToQuiz()
    const onTimeUpdate = () => {
      if (!video.duration || !isFinite(video.duration)) return
      if (video.currentTime >= video.duration - 0.15) goToQuiz()
    }

    video.addEventListener("ended", onEnded)
    video.addEventListener("timeupdate", onTimeUpdate)

    return () => {
      video.removeEventListener("ended", onEnded)
      video.removeEventListener("timeupdate", onTimeUpdate)
    }
  }, [router])

  const startWithSound = async () => {
    const video = videoRef.current
    if (!video || started) return

    try {
      redirectedRef.current = false
      video.muted = false
      video.volume = 1
      await video.play()
      setStarted(true)
      setIsPlaying(true)
      setMuted(false)
    } catch (error) {
      console.error("[FeedVideo] Error playing video:", error)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const preventPause = () => {
      if (!started || video.ended) return
      video.play().catch(() => {})
    }

    video.addEventListener("pause", preventPause)
    return () => video.removeEventListener("pause", preventPause)
  }, [started])

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked((prev) => {
      setLikes((l) => (prev ? l - 1 : l + 1))
      return !prev
    })
  }

  const handleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.muted = !muted
    setMuted(!muted)
  }

  const handleComments = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowComments(true)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSaved(!saved)
  }

  return (
    <div className="relative w-full h-full bg-black" onClick={startWithSound}>
      {/* Video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover pointer-events-none"
          playsInline
          loop={false}
          preload="auto"
          src="https://recursoexperto.com/wp-content/uploads/2026/01/Video2.2.mp4"
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold text-lg">Reels</span>
          <MoreHorizontal className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Play button */}
      {!started && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div
            className="h-16 w-16 rounded-full border-2 border-[#00ff41] flex items-center justify-center bg-black/30 backdrop-blur-sm"
            style={{ boxShadow: "0 0 20px rgba(0,255,65,0.4)" }}
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#00ff41] ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      <div className="absolute right-3 bottom-32 z-10 flex flex-col items-center gap-5">
        {/* Profile */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
            <img src="/profile-operator.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#00ff41] rounded-full flex items-center justify-center">
            <span className="text-black text-xs font-bold">+</span>
          </div>
        </div>

        {/* Like button */}
        <button onClick={handleLike} className="flex flex-col items-center gap-1">
          <Heart className={`w-7 h-7 transition-all ${liked ? "fill-red-500 text-red-500 scale-110" : "text-white"}`} />
          <span className="text-white text-xs font-medium">{likes.toLocaleString()}</span>
        </button>

        {/* Comments button */}
        <button onClick={handleComments} className="flex flex-col items-center gap-1">
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="text-white text-xs font-medium">{comments.length * 11}</span>
        </button>

        {/* Share button */}
        <button className="flex flex-col items-center gap-1">
          <Send className="w-6 h-6 text-white" />
          <span className="text-white text-xs font-medium">24</span>
        </button>

        {/* Save button */}
        <button onClick={handleSave} className="flex flex-col items-center gap-1">
          <Bookmark className={`w-7 h-7 transition-all ${saved ? "fill-white text-white" : "text-white"}`} />
        </button>

        {/* Mute button */}
        <button onClick={handleMute} className="flex flex-col items-center">
          {muted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-16 z-10 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        {/* Usuario */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white font-semibold">@chef_secreto</span>
          <button className="px-3 py-1 border border-white rounded text-white text-xs font-medium hover:bg-white hover:text-black transition-colors">
            Seguir
          </button>
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <p className={`text-white text-sm ${!showDescription ? "line-clamp-2" : ""}`}>
            Técnicas secretas de cocina que cambiarán tu forma de preparar alimentos 🍳
            {showDescription &&
              " Estos métodos han sido guardados por las franquicias más grandes durante años. Ahora los tienes aquí."}
          </p>
          {!showDescription && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDescription(true)
              }}
              className="text-gray-400 text-sm"
            >
              más
            </button>
          )}
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="text-white text-sm">#cocina</span>
          <span className="text-white text-sm">#chef</span>
          <span className="text-white text-sm">#gastronomía</span>
          <span className="text-white text-sm">#secretos</span>
        </div>

        {/* Audio */}
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-white" />
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-white text-sm whitespace-nowrap animate-marquee">Original Audio - chef_secreto</span>
          </div>
          <div className="w-8 h-8 rounded-md overflow-hidden border border-white/30 animate-spin-slow ml-auto">
            <img src="/profile-operator.jpg" alt="Audio" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {showComments && (
        <div
          className="absolute inset-0 z-30 bg-black/50"
          onClick={(e) => {
            e.stopPropagation()
            setShowComments(false)
          }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#262626] rounded-t-xl max-h-[70%] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-white font-semibold">Comentarios</span>
              <button onClick={() => setShowComments(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Lista de comentarios */}
            <div className="overflow-y-auto max-h-[50vh] p-4 space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.user}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-semibold">{comment.user}</span>
                      <span className="text-gray-500 text-xs">{comment.time}</span>
                    </div>
                    <p className="text-white text-sm">{comment.text}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <button className="text-gray-500 text-xs">Responder</button>
                      <button className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-500 text-xs">{Math.floor(Math.random() * 50) + 1}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input de comentario */}
            <div className="p-4 border-t border-white/10 flex items-center gap-3">
              <img src="/diverse-user-avatars.png" alt="Tu avatar" className="w-8 h-8 rounded-full object-cover" />
              <input
                type="text"
                placeholder="Agregar un comentario..."
                className="flex-1 bg-transparent text-white text-sm placeholder:text-gray-500 outline-none"
              />
              <button className="text-[#00ff41] font-semibold text-sm">Publicar</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}
