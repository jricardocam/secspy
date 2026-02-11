"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const questions = [
  {
    category: "Tu Motivación",
    question: "¿Para quién cocinas?",
    subtitle: "Esto nos ayuda a mostrarte el contenido más relevante para ti.",
    options: [
      { emoji: "👨‍👩‍👧‍👦", text: "Para mi familia", subtext: "Quiero sorprenderlos en casa" },
      { emoji: "💰", text: "Quiero emprender", subtext: "Vender comida desde casa o un puesto" },
      { emoji: "🔥", text: "Para mí", subtext: "Quiero comer mejor y más barato" },
    ],
  },
  {
    category: "Tu Nivel",
    question: "¿Cómo te defiendes en la cocina?",
    subtitle: "No hay respuesta incorrecta. Todas las recetas se adaptan a tu nivel.",
    options: [
      { emoji: "🥄", text: "Principiante", subtext: "Quemo hasta el arroz, pero quiero aprender" },
      { emoji: "🍳", text: "Me defiendo bien", subtext: "Cocino seguido pero quiero subir de nivel" },
      { emoji: "👨‍🍳", text: "Soy crack en la cocina", subtext: "Busco técnicas y recetas profesionales" },
    ],
  },
  {
    category: "La Invitación",
    question: "Estas recetas vienen de chefs que trabajaron en las cocinas de las cadenas más grandes.",
    subtitle: "Son recetas reales, probadas y listas para replicar. ¿Estás listo?",
    options: [
      { emoji: "🔓", text: "Estoy listo, muéstrame todo", subtext: "" },
      { emoji: "🚪", text: "Todavía no estoy listo", subtext: "" },
    ],
  },
]

const FireParticle = ({ delay, duration }: { delay: number; duration: number }) => (
  <div
    className="absolute rounded-full bg-gradient-to-b from-amber-400 via-orange-500 to-transparent blur-md"
    style={{
      width: Math.random() * 5 + 3 + "px",
      height: Math.random() * 5 + 3 + "px",
      left: 50 + "%",
      top: 50 + "%",
      animation: `floatUp ${duration}s ease-out infinite`,
      animationDelay: delay + "s",
      transformOrigin: "center",
    }}
  />
)

export function Quiz() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizState, setQuizState] = useState<"intro" | "question" | "loading" | "granted">("intro")
  const [selectedAnswers, setSelectedAnswers] = useState<{ q: number; answer: string }[]>([])
  const [loadingLines, setLoadingLines] = useState<{ text: string; done: boolean }[]>([])
  const [fadeOut, setFadeOut] = useState(false)

  const loadingMessages = [
    "Analizando tu perfil de chef...",
    "Seleccionando recetas para tu nivel...",
    "Preparando tu acceso exclusivo...",
    "Tu cocina secreta está lista ✓",
  ]

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswers([...selectedAnswers, { q: currentQuestion, answer }])
    setFadeOut(true)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setFadeOut(false)
      } else {
        startLoading()
      }
    }, 300)
  }

  const startLoading = () => {
    setQuizState("loading")
    setLoadingLines(loadingMessages.map((msg, i) => ({ text: msg, done: false })))

    loadingMessages.forEach((msg, index) => {
      const isFinal = index === loadingMessages.length - 1
      const delay = index * 1400 + (isFinal ? 0 : 0)

      setTimeout(() => {
        setLoadingLines((prev) =>
          prev.map((line, i) =>
            i === index ? { ...line, done: true } : line
          )
        )
      }, delay + (isFinal ? 1200 : 1400))
    })

    setTimeout(() => {
      setQuizState("granted")
    }, loadingMessages.length * 1400 + 800)
  }

  const enterKitchen = () => {
    router.push("/feed")
  }

  const getSelectedAnswer = (qIndex: number) => {
    return selectedAnswers.find((a) => a.q === qIndex)?.answer || ""
  }

  // PANTALLA 1: INTRO
  if (quizState === "intro") {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center px-5" style={{ backgroundColor: "var(--background)" }}>
        <div className="absolute inset-0 z-0">
          {[...Array(8)].map((_, i) => (
            <FireParticle key={i} delay={Math.random() * 2} duration={2 + Math.random() * 2} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Flame Icon */}
          <div className="mb-8 flex justify-center">
            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-full animate-glow"
              style={{
                background: "radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 100%)",
              }}
            >
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <defs>
                  <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#FBBF24" }} />
                    <stop offset="50%" style={{ stopColor: "#EA580C" }} />
                    <stop offset="100%" style={{ stopColor: "#DC2626" }} />
                  </linearGradient>
                </defs>
                <path
                  d="M22 2C22 2 15 12 15 18C15 23.5 18.1 28 22 28C25.9 28 29 23.5 29 18C29 12 22 2 22 2Z"
                  fill="url(#flameGradient)"
                  opacity="0.9"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1
            className="mb-4 text-center text-5xl font-black tracking-widest uppercase"
            style={{ color: "var(--text-primary)", fontFamily: '"Bebas Neue", sans-serif' }}
          >
            La Cocina Secreta
          </h1>

          {/* Subtitle */}
          <p className="mb-8 text-center text-sm leading-relaxed" style={{ color: "var(--text-secondary)", maxWidth: "380px", margin: "0 auto 32px" }}>
            Recetas exclusivas de chefs que trabajaron en las cadenas más grandes. Responde 3 preguntas para desbloquear tu acceso.
          </p>

          {/* Metrics */}
          <div className="mb-12 flex justify-center gap-8">
            {[
              { number: "400+", label: "Recetas" },
              { number: "14", label: "Guías" },
              { number: "3.5k+", label: "Chefs" },
            ].map((metric, i) => (
              <div key={i} className="text-center">
                <p className="mb-1 text-3xl font-black" style={{ color: "var(--accent-main)", fontFamily: '"Bebas Neue", sans-serif' }}>
                  {metric.number}
                </p>
                <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setQuizState("question")}
            className="w-full rounded-xl py-5 px-8 text-xl font-black uppercase tracking-widest transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, var(--cta-red) 0%, var(--orange) 50%, var(--accent-dark) 100%)",
              color: "var(--text-primary)",
              boxShadow: "0 4px 20px rgba(220, 38, 38, 0.4)",
              fontFamily: '"Bebas Neue", sans-serif',
            }}
          >
            Descubrir Mi Perfil de Chef
          </button>

          {/* Security Text */}
          <p className="mt-6 text-center text-xs" style={{ color: "var(--text-tertiary)" }}>
            🔒 Sin compromiso · Solo 30 segundos
          </p>
        </div>
      </div>
    )
  }

  // PANTALLA 2: QUIZ
  if (quizState === "question") {
    const q = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-8" style={{ backgroundColor: "var(--background)" }}>
        <div className="relative z-10 w-full max-w-[440px]">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2" style={{ color: "var(--accent-main)" }}>
                <span className="text-sm">🔥</span>
                <span className="text-xs font-black uppercase tracking-widest" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  Tu Perfil de Chef
                </span>
              </div>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {currentQuestion + 1}/3
              </span>
            </div>
            <div
              className="h-1 rounded-full transition-all duration-600"
              style={{
                background: "var(--border-inactive)",
                boxShadow: `0 0 10px rgba(245, 158, 11, 0.3)`,
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-600"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, var(--accent-dark) 0%, var(--accent-main) 50%, var(--accent-light) 100%)",
                  boxShadow: "0 0 10px rgba(245, 158, 11, 0.5)",
                }}
              />
            </div>
          </div>

          {/* Category Badge */}
          <div
            className="mb-8 inline-block rounded-full px-4 py-1.5"
            style={{
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
            }}
          >
            <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest" style={{ color: "var(--accent-main)", fontFamily: '"Bebas Neue", sans-serif' }}>
              <span>🔥</span>
              {q.category}
            </span>
          </div>

          {/* Question */}
          <h2
            className={`mb-2 text-4xl font-black leading-tight uppercase transition-all duration-300 ${fadeOut ? "opacity-0" : "opacity-100 animate-in fade-in slide-in-from-bottom-4"}`}
            style={{ color: "var(--text-primary)", fontFamily: '"Bebas Neue", sans-serif' }}
          >
            {q.question}
          </h2>

          {/* Subtitle */}
          <p className={`mb-8 text-sm leading-relaxed transition-all duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`} style={{ color: "var(--text-secondary)" }}>
            {q.subtitle}
          </p>

          {/* Options */}
          <div className={`space-y-3 transition-all duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
            {q.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelectAnswer(option.text)}
                className="group w-full rounded-2xl border-2 p-5 text-left transition-all duration-200 hover:scale-105"
                style={{
                  background: "var(--card-bg)",
                  borderColor: "var(--border-inactive)",
                  animation: `slideUp 0.4s ease-out ${i * 0.1}s both`,
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{option.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                      {option.text}
                    </p>
                    {option.subtext && <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {option.subtext}
                    </p>}
                  </div>
                  <div
                    className="h-5 w-5 rounded-full border-2"
                    style={{
                      borderColor: "var(--border-inactive)",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // PANTALLA 3: LOADING
  if (quizState === "loading") {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center px-5" style={{ backgroundColor: "var(--background)" }}>
        <div className="absolute inset-0 z-0">
          {[...Array(12)].map((_, i) => (
            <FireParticle key={i} delay={Math.random() * 3} duration={2.5 + Math.random() * 1.5} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[440px] text-center">
          {/* Flame */}
          <div className="mb-12 flex justify-center">
            <div
              className="relative flex h-16 w-16 items-center justify-center rounded-full animate-flicker"
              style={{
                background: "radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 100%)",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
                <defs>
                  <linearGradient id="flameGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#FBBF24" }} />
                    <stop offset="50%" style={{ stopColor: "#EA580C" }} />
                    <stop offset="100%" style={{ stopColor: "#DC2626" }} />
                  </linearGradient>
                </defs>
                <path
                  d="M22 2C22 2 15 12 15 18C15 23.5 18.1 28 22 28C25.9 28 29 23.5 29 18C29 12 22 2 22 2Z"
                  fill="url(#flameGradient2)"
                />
              </svg>
            </div>
          </div>

          {/* Loading Lines */}
          <div className="space-y-4 text-left">
            {loadingLines.map((line, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${line.done ? "" : "animate-pulse"}`}
                  style={{ backgroundColor: "var(--accent-main)" }}
                />
                <p
                  className={`animate-type-line text-sm font-medium transition-all ${line.done ? "opacity-50" : ""}`}
                  style={{ color: line.done ? "var(--text-tertiary)" : "var(--text-primary)" }}
                >
                  {line.text}
                  {!line.done && <span className="ml-1 inline-block animate-pulse">...</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // PANTALLA 4: ACCESO CONCEDIDO
  if (quizState === "granted") {
    const motivationAnswer = getSelectedAnswer(0)
    const levelAnswer = getSelectedAnswer(1)

    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-8" style={{ backgroundColor: "var(--background)" }}>
        <div className="absolute inset-0 z-0">
          {[...Array(15)].map((_, i) => (
            <FireParticle key={i} delay={Math.random() * 2.5} duration={2 + Math.random() * 2.5} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[440px] text-center">
          {/* Flame */}
          <div className="mb-10 flex justify-center animate-in scale-in duration-600">
            <div
              className="relative flex h-24 w-24 items-center justify-center rounded-full animate-glow"
              style={{
                background: "radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 100%)",
              }}
            >
              <svg width="56" height="56" viewBox="0 0 44 44" fill="none">
                <defs>
                  <linearGradient id="flameGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#FBBF24" }} />
                    <stop offset="50%" style={{ stopColor: "#EA580C" }} />
                    <stop offset="100%" style={{ stopColor: "#DC2626" }} />
                  </linearGradient>
                </defs>
                <path
                  d="M22 2C22 2 15 12 15 18C15 23.5 18.1 28 22 28C25.9 28 29 23.5 29 18C29 12 22 2 22 2Z"
                  fill="url(#flameGradient3)"
                  opacity="0.95"
                />
              </svg>
            </div>
          </div>

          {/* Badge */}
          <div
            className="mb-6 inline-block rounded-full px-4 py-2 animate-burn-in"
            style={{
              background: "rgba(245, 158, 11, 0.18)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              animationDelay: "0.2s",
            }}
          >
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--accent-main)" }}>
              ✦ Acceso Concedido ✦
            </span>
          </div>

          {/* Title */}
          <h2
            className="mb-3 text-4xl font-black uppercase leading-tight animate-burn-in"
            style={{ color: "var(--text-primary)", fontFamily: '"Bebas Neue", sans-serif', animationDelay: "0.4s" }}
          >
            Tu Cocina Secreta Está Lista
          </h2>

          {/* Subtitle */}
          <p
            className="mb-8 text-sm leading-relaxed animate-burn-in"
            style={{ color: "var(--text-secondary)", animationDelay: "0.6s" }}
          >
            Tu perfil es compatible. Hemos seleccionado las recetas ideales para ti.
          </p>

          {/* Summary */}
          <div className="mb-8 flex gap-4 animate-fade-content" style={{ animationDelay: "0.8s" }}>
            {[
              { label: "Objetivo", value: motivationAnswer },
              { label: "Nivel", value: levelAnswer },
            ].map((item, i) => (
              <div key={i} className="flex-1 rounded-xl p-3" style={{ background: "var(--card-bg)", border: "1px solid var(--border-inactive)" }}>
                <p className="mb-1 text-xs uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
                  {item.label}
                </p>
                <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={enterKitchen}
            className="w-full rounded-2xl py-6 px-8 text-2xl font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 animate-glow-pulse"
            style={{
              background: "linear-gradient(135deg, var(--cta-red) 0%, var(--orange) 50%, var(--accent-dark) 100%)",
              color: "var(--text-primary)",
              boxShadow: "0 4px 25px rgba(220, 38, 38, 0.5)",
              fontFamily: '"Bebas Neue", sans-serif',
              animation: `fadeContent 0.5s ease-out, glowPulse 3s ease-in-out`,
              animationDelay: "1s, 1s",
            }}
          >
            🔥 Entrar a la Cocina
          </button>

          {/* Social Proof */}
          <p className="mt-6 text-xs animate-fade-content" style={{ color: "var(--text-tertiary)", animationDelay: "1.2s" }}>
            +3,500 personas ya accedieron · Acceso inmediato
          </p>
        </div>
      </div>
    )
  }

  return null
}
