"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

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
    category: "Tu Estilo",
    question: "¿Qué tipo de comida te emociona más?",
    subtitle: "Vamos a priorizar las recetas que más te interesan.",
    options: [
      { emoji: "🍔", text: "Hamburguesas y sándwiches", subtext: "Smash burgers, club sándwiches, brioche" },
      { emoji: "🌮", text: "Street food y antojitos", subtext: "Tacos, empanadas, papas loaded, hot dogs" },
      { emoji: "🍰", text: "Dulces y postres", subtext: "Churros, waffles, donas, postres callejeros" },
      { emoji: "🔥", text: "Todo, quiero el pack completo", subtext: "No me hagan elegir" },
    ],
  },
]

const foodItems = [
  { image: "/food-burger.jpg", label: "SMASH BURGER SECRETA" },
  { image: "/food-fries.jpg", label: "PAPAS LOADED PRO" },
  { image: "/food-sauces.jpg", label: "SALSAS SIGNATURE" },
]

const FireParticle = ({ delay, duration, left }: { delay: number; duration: number; left: number }) => (
  <div
    className="absolute rounded-full"
    style={{
      width: Math.random() * 4 + 3 + "px",
      height: Math.random() * 4 + 3 + "px",
      left: left + "%",
      bottom: "45%",
      background: "radial-gradient(circle, #F59E0B, #EA580C, transparent)",
      filter: "blur(1px)",
      animation: `floatUp ${duration}s ease-out infinite`,
      animationDelay: delay + "s",
      opacity: 0,
      pointerEvents: "none",
    }}
  />
)

export function Quiz() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizState, setQuizState] = useState<"intro" | "question" | "preparing" | "foodReveal" | "accessGranted">("intro")
  const [selectedAnswers, setSelectedAnswers] = useState<{ q: number; answer: string }[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [contentVisible, setContentVisible] = useState(true)
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0)
  const [foodVisible, setFoodVisible] = useState(false)
  const [progressPercent, setProgressPercent] = useState(0)

  // FIX 2: Proper transition between questions — fade out, wait, change, fade in
  const handleSelectAnswer = (answer: string) => {
    if (selectedOption !== null) return // Prevent double-tap
    setSelectedOption(answer)
    setSelectedAnswers([...selectedAnswers, { q: currentQuestion, answer }])

    // Step 1: Wait 500ms so user sees their selection highlighted
    setTimeout(() => {
      // Step 2: Fade out current content
      setContentVisible(false)

      // Step 3: Wait for fade out to complete (300ms), THEN change question
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedOption(null)
          // Step 4: Small delay, then fade in new content
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setContentVisible(true)
            })
          })
        } else {
          // Last question answered — start reveal
          startRevealSequence()
        }
      }, 300)
    }, 500)
  }

  // FIX 3: Slower, more dramatic reveal sequence (~7 seconds total)
  const startRevealSequence = useCallback(() => {
    // Phase 1: "Preparando tu selección..." (0s - 2.5s)
    setQuizState("preparing")
    setProgressPercent(0)

    // Animate progress 0% → 25% over 2.5 seconds
    let progress = 0
    const preparingInterval = setInterval(() => {
      progress += 0.5
      setProgressPercent(progress)
      if (progress >= 25) clearInterval(preparingInterval)
    }, 50) // 0.5% every 50ms = 25% in 2.5s

    // After 2.5s, start food reveal
    setTimeout(() => {
      clearInterval(preparingInterval)
      setQuizState("foodReveal")
      setCurrentFoodIndex(0)
      setFoodVisible(true)
      setProgressPercent(25)

      // Phase 2: Show 3 food images (2.5s - 6.5s) — ~1.3s per image
      const showFood = (index: number) => {
        setFoodVisible(false) // fade out previous

        setTimeout(() => {
          setCurrentFoodIndex(index)
          setFoodVisible(true) // fade in new

          // Update progress: 25% → 90% distributed across 3 images
          const targetProgress = 25 + ((index + 1) / 3) * 65
          let currentProgress = 25 + (index / 3) * 65
          const progressInterval = setInterval(() => {
            currentProgress += 1
            setProgressPercent(Math.min(currentProgress, targetProgress))
            if (currentProgress >= targetProgress) clearInterval(progressInterval)
          }, 40)
        }, 300) // 300ms gap between images for fade transition
      }

      // Image 1 is already showing
      // After 25% progress ramp
      let p1 = 25
      const p1Interval = setInterval(() => {
        p1 += 1
        setProgressPercent(Math.min(p1, 46))
        if (p1 >= 46) clearInterval(p1Interval)
      }, 40)

      // Image 2 at 1.3s
      setTimeout(() => {
        clearInterval(p1Interval)
        showFood(1)
      }, 1300)

      // Image 3 at 2.6s
      setTimeout(() => {
        showFood(2)
      }, 2600)

      // Phase 3: Access granted at 4s (after 3 images shown)
      setTimeout(() => {
        setFoodVisible(false)
        setTimeout(() => {
          setQuizState("accessGranted")
          setProgressPercent(100)

          // Phase 4: Redirect after 2s
          setTimeout(() => {
            router.push("/feed")
          }, 2000)
        }, 400)
      }, 4000)
    }, 2500)
  }, [router])

  // Generate stable particles
  const particles = Array.from({ length: 8 }, (_, i) => ({
    delay: (i * 0.4) % 3,
    duration: 2.2 + (i * 0.3) % 2,
    left: 40 + (i * 3) % 20,
  }))

  // PANTALLA 1: INTRO
  if (quizState === "intro") {
    return (
      <div
        className="relative flex min-h-screen flex-col items-center justify-center px-5"
        style={{ backgroundColor: "#0F0E0C" }}
      >
        {/* Background gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.04) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 100%, rgba(220,38,38,0.03) 0%, transparent 50%)
            `,
          }}
        />

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <FireParticle key={i} {...p} />
          ))}
        </div>

        <div
          className="relative z-10 w-full max-w-[420px]"
          style={{ animation: "fadeSlideUp 0.7s ease-out forwards" }}
        >
          {/* Flame Icon */}
          <div className="mb-7 flex justify-center">
            <div
              className="relative flex h-[90px] w-[90px] items-center justify-center rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)",
                animation: "glowPulse 3s ease-in-out infinite",
              }}
            >
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <defs>
                  <radialGradient id="flameCore" cx="50%" cy="60%" r="40%">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </radialGradient>
                  <radialGradient id="flameMid" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EA580C" />
                  </radialGradient>
                  <linearGradient id="flameOuter" x1="26" y1="6" x2="26" y2="46">
                    <stop offset="0%" stopColor="#EA580C" />
                    <stop offset="60%" stopColor="#DC2626" />
                    <stop offset="100%" stopColor="#991B1B" />
                  </linearGradient>
                </defs>
                {/* Outer flame - irregular shape */}
                <path
                  d="M26 4C26 4 14 16 14 26C14 28 14.5 30 15.5 32C13.5 29 13 27 14 24C14 24 16 28 18 30C16 26 15 22 18 16C18 16 20 22 21 25C20 21 20 17 23 12C23 12 25 18 25.5 22C25.5 18 27 14 29 10C29 10 32 18 32 22C33 19 34 16 36 14C34 20 35 24 34 28C36 26 38 22 38 22C39 27 38 30 36.5 32C37.5 30 38 28 38 26C38 16 26 4 26 4Z"
                  fill="url(#flameOuter)"
                  style={{ animation: "flicker 1.5s ease-in-out infinite" }}
                />
                {/* Middle flame */}
                <path
                  d="M26 12C26 12 19 22 19 28C19 32 22 36 26 36C30 36 33 32 33 28C33 22 26 12 26 12Z"
                  fill="url(#flameMid)"
                  opacity="0.95"
                />
                {/* Inner core - brightest */}
                <path
                  d="M26 20C26 20 22 27 22 31C22 34 24 37 26 37C28 37 30 34 30 31C30 27 26 20 26 20Z"
                  fill="url(#flameCore)"
                />
                {/* Hot center highlight */}
                <ellipse cx="26" cy="32" rx="2.5" ry="3.5" fill="#FDE68A" opacity="0.6" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1
            className="mb-3 text-center uppercase"
            style={{
              color: "#FAF7F2",
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "40px",
              letterSpacing: "2px",
            }}
          >
            La Cocina Secreta
          </h1>

          {/* Subtitle */}
          <p
            className="mx-auto mb-8 text-center"
            style={{
              color: "#A8A29E",
              fontSize: "15px",
              lineHeight: 1.6,
              maxWidth: "360px",
              padding: "0 12px",
            }}
          >
            Recetas exclusivas de chefs que trabajaron en las cadenas más grandes. Responde 3 preguntas para desbloquear tu acceso.
          </p>

          {/* Metrics */}
          <div className="mb-9 flex justify-center gap-10">
            {[
              { number: "400+", label: "Recetas" },
              { number: "14", label: "Guías" },
              { number: "3.5K+", label: "Chefs" },
            ].map((metric, i) => (
              <div key={i} className="text-center">
                <p
                  style={{
                    color: "#F59E0B",
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "26px",
                    lineHeight: 1,
                  }}
                >
                  {metric.number}
                </p>
                <p
                  style={{
                    color: "#57534E",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginTop: "4px",
                  }}
                >
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => {
              setContentVisible(true)
              setQuizState("question")
            }}
            className="w-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #DC2626, #EA580C, #D97706)",
              color: "#FFFFFF",
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "18px",
              letterSpacing: "2px",
              padding: "18px",
              borderRadius: "14px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(220, 38, 38, 0.35)",
            }}
          >
            DESCUBRIR MI PERFIL DE CHEF
          </button>

          {/* Security text */}
          <p className="mt-4 text-center" style={{ color: "#57534E", fontSize: "12px" }}>
            🔒 Sin compromiso · Solo 30 segundos
          </p>
        </div>


      </div>
    )
  }

  // PANTALLA 2: QUIZ — FIX 1: Proper vertical centering
  if (quizState === "question") {
    const q = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div
        className="relative flex min-h-screen flex-col items-center justify-center px-5"
        style={{ backgroundColor: "#0F0E0C" }}
      >
        {/* Background gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.04) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 100%, rgba(220,38,38,0.03) 0%, transparent 50%)
            `,
          }}
        />

        <div
          className="relative z-10 w-full max-w-[420px]"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: "14px" }}>🔥</span>
                <span
                  style={{
                    color: "#F59E0B",
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "13px",
                    letterSpacing: "2px",
                  }}
                >
                  TU PERFIL DE CHEF
                </span>
              </div>
              <span style={{ color: "#A8A29E", fontFamily: '"DM Sans", sans-serif', fontSize: "13px" }}>
                {currentQuestion + 1}/3
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "4px",
                backgroundColor: "#2A2520",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #D97706, #F59E0B, #FBBF24)",
                  borderRadius: "4px",
                  boxShadow: "0 0 10px rgba(245,158,11,0.4)",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>

          {/* Category Badge */}
          <div
            className="mb-5 inline-flex items-center gap-1.5"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: "20px",
              padding: "6px 14px",
            }}
          >
            <span style={{ fontSize: "12px" }}>🔥</span>
            <span
              style={{
                color: "#F59E0B",
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "12px",
                letterSpacing: "2px",
              }}
            >
              {q.category.toUpperCase()}
            </span>
          </div>

          {/* Question */}
          <h2
            style={{
              color: "#FAF7F2",
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "28px",
              lineHeight: 1.2,
              marginBottom: "8px",
            }}
          >
            {q.question}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              color: "#A8A29E",
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "14px",
              lineHeight: 1.5,
              marginBottom: "24px",
            }}
          >
            {q.subtitle}
          </p>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {q.options.map((option, i) => {
              const isSelected = selectedOption === option.text
              return (
                <button
                  key={`${currentQuestion}-${i}`}
                  onClick={() => handleSelectAnswer(option.text)}
                  disabled={selectedOption !== null}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "16px 20px",
                    borderRadius: "14px",
                    border: isSelected ? "2px solid #F59E0B" : "1px solid #2A2520",
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(234,88,12,0.05))"
                      : "#1A1816",
                    boxShadow: isSelected
                      ? "0 0 20px rgba(245,158,11,0.15), inset 0 0 20px rgba(245,158,11,0.05)"
                      : "none",
                    cursor: selectedOption !== null ? "default" : "pointer",
                    transition: "all 0.25s ease",
                    animation: `optionSlideIn 0.35s ease-out ${i * 0.08}s forwards`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ fontSize: "22px", flexShrink: 0 }}>{option.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          color: isSelected ? "#F59E0B" : "#FAF7F2",
                          fontFamily: '"DM Sans", sans-serif',
                          fontSize: "15px",
                          fontWeight: 600,
                          transition: "color 0.25s ease",
                          margin: 0,
                        }}
                      >
                        {option.text}
                      </p>
                      {option.subtext && (
                        <p
                          style={{
                            color: "#A8A29E",
                            fontFamily: '"DM Sans", sans-serif',
                            fontSize: "13px",
                            marginTop: "2px",
                            margin: "2px 0 0 0",
                          }}
                        >
                          {option.subtext}
                        </p>
                      )}
                    </div>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        border: isSelected ? "none" : "2px solid #2A2520",
                        backgroundColor: isSelected ? "#F59E0B" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.25s ease",
                        animation: isSelected ? "scaleIn 0.3s ease" : "none",
                      }}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 6L5.5 8.5L9 3.5" stroke="#0F0E0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // PANTALLA 3: PREPARANDO — FIX 3: Much slower progression
  if (quizState === "preparing") {
    return (
      <div
        className="relative flex min-h-screen flex-col items-center justify-center px-5"
        style={{ backgroundColor: "#0F0E0C" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.04) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 100%, rgba(220,38,38,0.03) 0%, transparent 50%)
            `,
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <FireParticle key={i} {...p} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[420px] text-center">
          {/* Flame */}
          <div className="mb-10 flex justify-center">
            <div
              className="relative flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)",
                animation: "glowPulse 2s ease-in-out infinite",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 52 52" fill="none">
                <defs>
                  <radialGradient id="fc2" cx="50%" cy="60%" r="40%">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </radialGradient>
                  <radialGradient id="fm2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EA580C" />
                  </radialGradient>
                  <linearGradient id="fo2" x1="26" y1="6" x2="26" y2="46">
                    <stop offset="0%" stopColor="#EA580C" />
                    <stop offset="60%" stopColor="#DC2626" />
                    <stop offset="100%" stopColor="#991B1B" />
                  </linearGradient>
                </defs>
                <path
                  d="M26 4C26 4 14 16 14 26C14 28 14.5 30 15.5 32C13.5 29 13 27 14 24C14 24 16 28 18 30C16 26 15 22 18 16C18 16 20 22 21 25C20 21 20 17 23 12C23 12 25 18 25.5 22C25.5 18 27 14 29 10C29 10 32 18 32 22C33 19 34 16 36 14C34 20 35 24 34 28C36 26 38 22 38 22C39 27 38 30 36.5 32C37.5 30 38 28 38 26C38 16 26 4 26 4Z"
                  fill="url(#fo2)"
                  style={{ animation: "flicker 1.5s ease-in-out infinite" }}
                />
                <path d="M26 12C26 12 19 22 19 28C19 32 22 36 26 36C30 36 33 32 33 28C33 22 26 12 26 12Z" fill="url(#fm2)" opacity="0.95" />
                <path d="M26 20C26 20 22 27 22 31C22 34 24 37 26 37C28 37 30 34 30 31C30 27 26 20 26 20Z" fill="url(#fc2)" />
                <ellipse cx="26" cy="32" rx="2.5" ry="3.5" fill="#FDE68A" opacity="0.6" />
              </svg>
            </div>
          </div>

          <p
            style={{
              color: "#A8A29E",
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "16px",
              marginBottom: "24px",
              animation: "fadeContent 0.5s ease-out forwards",
            }}
          >
            Preparando tu selección...
          </p>

          {/* Progress Bar */}
          <div
            className="mx-auto"
            style={{
              width: "256px",
              height: "3px",
              backgroundColor: "#2A2520",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: "linear-gradient(90deg, #D97706, #F59E0B, #FBBF24)",
                borderRadius: "3px",
                boxShadow: "0 0 10px rgba(245,158,11,0.5)",
                transition: "width 0.15s linear",
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  // PANTALLA 4: REVELACIÓN DE COMIDA
  if (quizState === "foodReveal") {
    const currentFood = foodItems[currentFoodIndex]

    return (
      <div
        className="relative flex min-h-screen flex-col items-center justify-center px-5"
        style={{ backgroundColor: "#0F0E0C" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.04) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 100%, rgba(220,38,38,0.03) 0%, transparent 50%)
            `,
          }}
        />

        <div className="relative z-10 w-full max-w-[420px] text-center">
          {/* Food Image with Smoke Effect */}
          <div className="relative mb-8" style={{ minHeight: "220px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Smoke/Steam behind */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "280px",
                height: "280px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, rgba(234,88,12,0.06) 40%, transparent 70%)",
                filter: "blur(20px)",
                animation: foodVisible ? "smokeExpand 1.2s ease-out forwards" : "none",
              }}
            />

            {/* Food Image */}
            <div
              className="relative overflow-hidden"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "16px",
                opacity: foodVisible ? 1 : 0,
                filter: foodVisible ? "blur(0)" : "blur(12px)",
                transform: foodVisible ? "scale(1)" : "scale(0.85)",
                transition: "opacity 0.5s ease, filter 0.6s ease, transform 0.5s ease",
              }}
            >
              <Image
                src={currentFood.image || "/placeholder.svg"}
                alt={currentFood.label}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Label */}
          <p
            style={{
              color: "#F59E0B",
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "16px",
              letterSpacing: "3px",
              opacity: foodVisible ? 1 : 0,
              transform: foodVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s",
            }}
          >
            {currentFood.label}
          </p>

          {/* Progress Bar */}
          <div
            className="mx-auto mt-10"
            style={{
              width: "256px",
              height: "3px",
              backgroundColor: "#2A2520",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: "linear-gradient(90deg, #D97706, #F59E0B, #FBBF24)",
                borderRadius: "3px",
                boxShadow: "0 0 10px rgba(245,158,11,0.5)",
                transition: "width 0.15s linear",
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  // PANTALLA 5: ACCESO CONCEDIDO
  if (quizState === "accessGranted") {
    return (
      <div
        className="relative flex min-h-screen flex-col items-center justify-center px-5"
        style={{ backgroundColor: "#0F0E0C" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 w-full max-w-[420px] text-center">
          {/* Badge */}
          <div
            className="mb-5 inline-flex items-center gap-1.5"
            style={{
              background: "rgba(245,158,11,0.15)",
              border: "1px solid rgba(245,158,11,0.35)",
              borderRadius: "20px",
              padding: "8px 18px",
              animation: "burnIn 0.8s ease forwards",
            }}
          >
            <span style={{ color: "#F59E0B", fontSize: "12px" }}>✦</span>
            <span
              style={{
                color: "#F59E0B",
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "13px",
                letterSpacing: "3px",
              }}
            >
              ACCESO CONCEDIDO
            </span>
            <span style={{ color: "#F59E0B", fontSize: "12px" }}>✦</span>
          </div>

          {/* Title */}
          <h2
            style={{
              color: "#FAF7F2",
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "32px",
              lineHeight: 1.15,
              marginBottom: "12px",
              animation: "burnIn 0.8s ease forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            Tu Cocina Secreta
            <br />
            Está Lista
          </h2>

          {/* Subtitle */}
          <p
            style={{
              color: "#A8A29E",
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "14px",
              animation: "burnIn 0.8s ease forwards",
              animationDelay: "0.4s",
              opacity: 0,
            }}
          >
            Redirigiendo...
          </p>

          {/* Progress at 100% with strong glow */}
          <div
            className="mx-auto mt-10"
            style={{
              width: "256px",
              height: "3px",
              backgroundColor: "#2A2520",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, #D97706, #F59E0B, #FBBF24)",
                borderRadius: "3px",
                boxShadow: "0 0 20px rgba(245,158,11,0.7), 0 0 40px rgba(245,158,11,0.3)",
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return null
}

// Wrap the Quiz in a layout that always has the global styles mounted
export default function QuizPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeContent {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(0) scale(1); }
          15% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-100px) scale(0.2); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 15px rgba(245,158,11,0.2); }
          50% { box-shadow: 0 0 30px rgba(245,158,11,0.4), 0 0 50px rgba(234,88,12,0.15); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scaleX(1); }
          25% { opacity: 0.92; transform: scaleX(0.98); }
          75% { opacity: 0.95; transform: scaleX(1.02); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes foodReveal {
          0% { opacity: 0; filter: blur(12px); transform: scale(0.85); }
          60% { opacity: 1; filter: blur(3px); transform: scale(1.02); }
          100% { opacity: 1; filter: blur(0); transform: scale(1); }
        }
        @keyframes smokeExpand {
          0% { opacity: 0.4; transform: scale(0.8); }
          100% { opacity: 0; transform: scale(1.8); }
        }
        @keyframes burnIn {
          0% { opacity: 0; filter: blur(6px) brightness(1.8); }
          50% { opacity: 0.8; filter: blur(2px) brightness(1.3); }
          100% { opacity: 1; filter: blur(0) brightness(1); }
        }
        @keyframes optionSlideIn {
          from { transform: translateY(12px); }
          to { transform: translateY(0); }
        }
        @keyframes btnGlow {
          0%, 100% { box-shadow: 0 4px 24px rgba(220,38,38,0.3); }
          50% { box-shadow: 0 4px 32px rgba(220,38,38,0.5), 0 0 15px rgba(245,158,11,0.2); }
        }
      `}</style>
      <Quiz />
    </>
  )
}
