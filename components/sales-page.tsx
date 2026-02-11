"use client"

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Check, ChevronDown, ChevronUp, Lock, Shield, Clock, Flame, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const archivos = [
  { name: "Street Food Internacional", image: "/images/street-20food.jpg" },
  { name: "Sandwiches del Mundo", image: "/images/sandwiches-20del-20mundo.jpg" },
  { name: "Maestro de Empanadas", image: "/images/maestro-20empanadas.jpg" },
  { name: "Acompañamientos que Enamoran", image: "/images/acompa-c3-b1amientos.jpeg" },
  { name: "Salsas y Toppings Explosivos", image: "/images/salsas-20callejeras.jpg" },
  { name: "Panes del Mundo", image: "/images/panes-20del-20mundo.jpg" },
  { name: "Dulces Callejeros", image: "/images/dulces-20callejeros.jpg" },
  { name: "Bebidas y Tragos del Mundo", image: "/images/bebidas-20y-20tragos.jpg" },
  { name: "Bowls Callejeros", image: "/images/bowls-20callejeros.jpg" },
  { name: "Frutas Callejeras", image: "/images/frutas-20callejeras.jpg" },
  { name: "Callejeros Irresistibles", image: "/images/callejeros-20irresistibles.jpg" },
  { name: "Sabores en Frascos", image: "/images/sabores-20en-20frasco.jpg" },
  { name: "Guia de Presentacion y Empaque", image: "/images/guias-20de-20presentacion.jpg" },
  { name: "Recetas Secretas: Los Sabores Mas Famosos", image: "/images/recetas-20secretas.jpg" },
]

const faqs = [
  {
    q: "Que incluye exactamente La Boveda?",
    a: "14 archivos PDF con recetas replicadas estilo franquicia, tecnicas de street food internacional, y guias de presentacion profesional.",
  },
  {
    q: "Cuanto tiempo tengo acceso?",
    a: "Acceso de por vida. Una vez que descargas los archivos, son tuyos para siempre.",
  },
  {
    q: "Necesito experiencia previa en cocina?",
    a: "No. Las recetas estan disenadas paso a paso para que cualquier persona pueda replicarlas desde casa.",
  },
  {
    q: "Puedo ver los eBooks en el celular?",
    a: "Si. Funcionan perfecto en Android, iPhone y PC.",
  },
]

// Floating food element data
const FOOD_ELEMENTS = [
  { icon: "burger", size: 42 },
  { icon: "fries", size: 36 },
  { icon: "sauce", size: 32 },
  { icon: "burger", size: 28 },
  { icon: "fries", size: 40 },
  { icon: "sauce", size: 34 },
  { icon: "burger", size: 30 },
  { icon: "fries", size: 38 },
  { icon: "sauce", size: 26 },
  { icon: "burger", size: 36 },
  { icon: "fries", size: 32 },
  { icon: "sauce", size: 40 },
]

function FoodIcon({ icon, size }: { icon: string; size: number }) {
  if (icon === "burger") {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <ellipse cx="32" cy="18" rx="22" ry="10" fill="#D97706" />
        <ellipse cx="32" cy="16" rx="22" ry="10" fill="#F59E0B" />
        <rect x="10" y="26" width="44" height="6" rx="2" fill="#22C55E" />
        <rect x="10" y="32" width="44" height="5" rx="1" fill="#DC2626" />
        <rect x="10" y="37" width="44" height="6" rx="2" fill="#92400E" />
        <ellipse cx="32" cy="44" rx="22" ry="8" fill="#D97706" />
        <ellipse cx="32" cy="42" rx="22" ry="8" fill="#F59E0B" />
        <circle cx="20" cy="14" r="1" fill="#FBBF24" opacity="0.5" />
        <circle cx="36" cy="12" r="1" fill="#FBBF24" opacity="0.5" />
        <circle cx="28" cy="16" r="0.8" fill="#FBBF24" opacity="0.4" />
      </svg>
    )
  }
  if (icon === "fries") {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <path d="M18 48L22 16H26L24 48H18Z" fill="#F59E0B" />
        <path d="M24 48L28 12H32L30 48H24Z" fill="#FBBF24" />
        <path d="M30 48L34 14H38L36 48H30Z" fill="#F59E0B" />
        <path d="M36 48L40 16H44L42 48H36Z" fill="#D97706" />
        <path d="M14 48H50L48 56H16L14 48Z" fill="#DC2626" rx="4" />
        <rect x="16" y="50" width="28" height="4" rx="2" fill="#EF4444" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M24 8C24 8 16 16 16 28C16 36 20 40 24 42L22 56H42L40 42C44 40 48 36 48 28C48 16 40 8 40 8" fill="#DC2626" />
      <path d="M26 12C26 12 20 18 20 28C20 34 23 37 26 38L24.5 50H39.5L38 38C41 37 44 34 44 28C44 18 38 12 38 12" fill="#EF4444" />
      <ellipse cx="32" cy="8" rx="10" ry="3" fill="#92400E" />
      <ellipse cx="32" cy="7" rx="10" ry="3" fill="#D97706" />
      <circle cx="28" cy="24" r="2" fill="#FEF3C7" opacity="0.3" />
      <circle cx="36" cy="30" r="1.5" fill="#FEF3C7" opacity="0.2" />
    </svg>
  )
}

function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function FloatingFoodElements() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const container = containerRef.current?.closest(".scrollable-page")
    if (container) {
      setScrollY(container.scrollTop)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current?.closest(".scrollable-page")
    if (!container) return
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0" style={{ zIndex: 1 }}>
      {FOOD_ELEMENTS.map((el, i) => {
        const baseX = (i % 3 === 0) ? 5 + (i * 3) : (i % 3 === 1) ? 75 + (i * 2) : 40 + (i * 4)
        const baseY = 10 + (i * 8)
        const parallaxSpeed = 0.02 + (i * 0.008)
        const floatOffset = Math.sin((scrollY * 0.003) + (i * 1.2)) * 12
        const rotateAmount = Math.sin((scrollY * 0.002) + (i * 0.8)) * 15
        const yPos = baseY + (scrollY * parallaxSpeed) + floatOffset
        const opacity = Math.max(0, Math.min(0.12, 0.06 + Math.sin((scrollY * 0.002) + i) * 0.04))

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${baseX % 95}%`,
              top: `${yPos % 200}%`,
              opacity,
              transform: `rotate(${rotateAmount}deg)`,
              transition: "opacity 0.3s ease",
            }}
          >
            <FoodIcon icon={el.icon} size={el.size} />
          </div>
        )
      })}
    </div>
  )
}

export function SalesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoStarted, setVideoStarted] = useState(false)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const startVideo = async () => {
    const video = videoRef.current
    if (!video || videoStarted) return
    try {
      video.muted = false
      video.volume = 1
      await video.play()
      setVideoStarted(true)
    } catch (e) {
      console.log("Play failed:", e)
    }
  }

  return (
    <div className="scrollable-page relative min-h-screen overflow-x-hidden pb-32" style={{ color: "var(--text-primary)" }}>
      {/* Dynamic background layers */}
      <div className="pointer-events-none fixed inset-0" style={{ zIndex: 0 }}>
        {/* Base dark gradient */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, #0F0E0C 0%, #1A1208 20%, #0F0E0C 40%, #12100D 60%, #0F0E0C 80%, #1A1208 100%)",
        }} />
        {/* Warm radial glow top */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245, 158, 11, 0.06) 0%, transparent 60%)",
        }} />
        {/* Red glow bottom */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 40% at 30% 80%, rgba(220, 38, 38, 0.04) 0%, transparent 60%)",
        }} />
        {/* Amber accent middle */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 60% 30% at 70% 50%, rgba(217, 119, 6, 0.03) 0%, transparent 50%)",
        }} />
        {/* Subtle noise texture via repeating gradient */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "repeating-conic-gradient(#FAF7F2 0% 25%, transparent 0% 50%)",
          backgroundSize: "4px 4px",
        }} />
      </div>

      {/* Floating food elements that react to scroll */}
      <FloatingFoodElements />

      {/* Content - above backgrounds */}
      <div className="relative" style={{ zIndex: 2 }}>

        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-16">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ border: "1px solid rgba(245, 158, 11, 0.3)", backgroundColor: "rgba(245, 158, 11, 0.1)" }}>
                <Lock className="h-4 w-4" style={{ color: "var(--accent-main)" }} />
                <span className="text-xs font-bold tracking-widest" style={{ fontFamily: '"Bebas Neue", sans-serif', color: "var(--accent-main)" }}>ACCESO CONCEDIDO</span>
              </div>

              <h1 className="mb-6 text-3xl font-bold leading-tight md:text-4xl" style={{ color: "var(--text-primary)", fontFamily: '"Bebas Neue", sans-serif' }}>
                La Cocina Secreta
                <br />
                <span style={{ color: "var(--accent-main)" }}>14 Archivos Exclusivos</span>
              </h1>

              <p className="mb-8 text-lg" style={{ color: "var(--text-secondary)" }}>
                Las recetas que las franquicias nunca quisieron que vieras. Ahora en tus manos.
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <Clock className="h-4 w-4" style={{ color: "var(--accent-main)" }} />
                  <span>Oferta por tiempo limitado</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <Flame className="h-4 w-4" style={{ color: "var(--cta-red)" }} />
                  <span>Alta demanda hoy</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Video Section */}
        <section className="px-4 py-8">
          <ScrollReveal delay={100}>
            <div className="mx-auto max-w-md">
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg" style={{ border: "1px solid var(--border-inactive)", backgroundColor: "var(--card-bg)" }}>
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  playsInline
                  preload="auto"
                  loop
                  src="https://recursoexperto.com/wp-content/uploads/2026/01/Video3.mp4"
                />
                {!videoStarted && (
                  <button
                    onClick={startVideo}
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 transition-all hover:bg-black/50"
                    aria-label="Play"
                  >
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full border-2 transition-transform hover:scale-110"
                      style={{
                        borderColor: "var(--accent-main)",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)",
                      }}
                    >
                      <Play className="ml-1 h-8 w-8" style={{ color: "var(--accent-main)" }} />
                    </div>
                  </button>
                )}
                <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2" style={{ borderColor: "var(--accent-main)" }} />
                <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2" style={{ borderColor: "var(--accent-main)" }} />
                <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2" style={{ borderColor: "var(--accent-main)" }} />
                <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2" style={{ borderColor: "var(--accent-main)" }} />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Decorative food divider */}
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--border-inactive), transparent)" }} />
          <FoodIcon icon="burger" size={24} />
          <FoodIcon icon="fries" size={20} />
          <FoodIcon icon="sauce" size={22} />
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--border-inactive), transparent)" }} />
        </div>

        {/* Problem Section */}
        <section className="relative px-4 py-12">
          {/* Section glow */}
          <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 100% 60% at 50% 50%, rgba(220, 38, 38, 0.03) 0%, transparent 70%)",
          }} />
          <ScrollReveal>
            <div className="mx-auto max-w-2xl rounded-xl p-6" style={{
              border: "1px solid var(--border-inactive)",
              backgroundColor: "rgba(26, 24, 22, 0.8)",
              backdropFilter: "blur(8px)",
            }}>
              <h2 className="mb-6 text-center text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: '"Bebas Neue", sans-serif' }}>El Problema</h2>
              <div className="space-y-4" style={{ color: "var(--text-secondary)" }}>
                <p>
                  Las franquicias gastan millones protegiendo sus recetas. Contratan abogados, firman acuerdos de
                  confidencialidad, y destruyen cualquier filtracion.
                </p>
                <p>
                  Mientras tanto, tu pagas <span className="font-semibold" style={{ color: "var(--text-primary)" }}>10x mas</span> por la misma
                  comida que podrias hacer en casa.
                </p>
                <p className="font-semibold" style={{ color: "var(--accent-main)" }}>Eso termina hoy.</p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Solution Section with scroll-reveal items */}
        <section className="relative px-4 py-12">
          <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(245, 158, 11, 0.03) 0%, transparent 60%)",
          }} />
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h2 className="mb-6 text-center text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: '"Bebas Neue", sans-serif' }}>La Solucion</h2>
              <p className="mb-8 text-center" style={{ color: "var(--text-secondary)" }}>
                Un equipo de expertos decidio romper el silencio. Compilamos anos de investigacion en 14 archivos.
              </p>
            </ScrollReveal>

            <div className="space-y-4">
              {[
                { text: "Replicas exactas de sabores famosos", icon: "burger" as const },
                { text: "Tecnicas de street food que nadie te ensena", icon: "fries" as const },
                { text: "Guias de presentacion profesional", icon: "sauce" as const },
                { text: "Secretos de salsas y marinados", icon: "sauce" as const },
              ].map((benefit, i) => (
                <ScrollReveal key={i} delay={i * 120}>
                  <div className="flex items-start gap-3 rounded-lg p-4 transition-colors" style={{
                    border: "1px solid var(--border-inactive)",
                    backgroundColor: "rgba(26, 24, 22, 0.7)",
                    backdropFilter: "blur(4px)",
                  }}>
                    <div className="mt-0.5 flex-shrink-0">
                      <FoodIcon icon={benefit.icon} size={24} />
                    </div>
                    <div className="flex flex-1 items-center gap-2">
                      <Check className="h-5 w-5 flex-shrink-0" style={{ color: "var(--accent-main)" }} />
                      <p style={{ color: "var(--text-primary)" }}>{benefit.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Decorative food divider */}
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--border-inactive), transparent)" }} />
          <FoodIcon icon="fries" size={22} />
          <FoodIcon icon="burger" size={26} />
          <FoodIcon icon="fries" size={22} />
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--border-inactive), transparent)" }} />
        </div>

        {/* Archive Grid Section */}
        <section className="relative px-4 py-12">
          <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 90% 50% at 50% 50%, rgba(245, 158, 11, 0.02) 0%, transparent 60%)",
          }} />
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="mb-2 text-center text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: '"Bebas Neue", sans-serif' }}>Incluye 14 Archivos</h2>
              <p className="mb-8 text-center" style={{ color: "var(--text-secondary)" }}>Todo lo que necesitas para dominar el sabor</p>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {archivos.map((archivo, i) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <div
                    className="flex flex-col items-center rounded-lg p-3 text-center"
                    style={{
                      border: "1px solid var(--border-inactive)",
                      backgroundColor: "rgba(26, 24, 22, 0.7)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <div className="relative mb-2 aspect-[3/4] w-full overflow-hidden rounded-lg">
                      <Image src={archivo.image || "/placeholder.svg"} alt={archivo.name} fill className="object-cover" />
                      <div className="absolute left-1 top-1 rounded border-2 px-1.5 py-0.5" style={{ borderColor: "var(--cta-red)", backgroundColor: "rgba(0,0,0,0.9)", boxShadow: "0 0 10px rgba(220, 38, 38, 0.5)" }}>
                        <span className="text-[8px] font-bold" style={{ color: "var(--cta-red)", textShadow: "0 0 8px rgba(220, 38, 38, 0.8)" }}>
                          CONFIDENCIAL
                        </span>
                      </div>
                      <span className="absolute right-1 top-1 rounded px-1.5 py-0.5 text-[8px] font-medium" style={{ backgroundColor: "rgba(245, 158, 11, 0.9)", color: "#000" }}>
                        PDF
                      </span>
                    </div>
                    <p className="line-clamp-2 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{archivo.name}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="relative px-4 py-12">
          <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 40% at 20% 50%, rgba(217, 119, 6, 0.03) 0%, transparent 50%)",
          }} />
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h2 className="mb-8 text-center text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: '"Bebas Neue", sans-serif' }}>Lo Que Dicen</h2>
            </ScrollReveal>
            <div className="space-y-4">
              {[
                { text: "Hice la hamburguesa de mi franquicia favorita y quedo IGUAL. Increible.", author: "Maria G." },
                { text: "Entendi por que las salsas funcionan. Las salsas son el verdadero secreto.", author: "Carlos R." },
                { text: "Mis hijos pensaron que habia ido a comprar la comida. Y puedo repetirla sin que cambie.", author: "Ana L." },
              ].map((testimonial, i) => (
                <ScrollReveal key={i} delay={i * 150}>
                  <div className="rounded-lg p-4" style={{
                    border: "1px solid var(--border-inactive)",
                    backgroundColor: "rgba(26, 24, 22, 0.7)",
                    backdropFilter: "blur(4px)",
                  }}>
                    <p className="mb-2 text-sm italic" style={{ color: "var(--text-primary)" }}>{`"${testimonial.text}"`}</p>
                    <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>-- {testimonial.author}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="relative px-4 py-12">
          <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245, 158, 11, 0.04) 0%, transparent 60%)",
          }} />
          <ScrollReveal>
            <div className="mx-auto max-w-2xl rounded-xl p-8 text-center" style={{
              border: "1px solid rgba(245, 158, 11, 0.2)",
              backgroundColor: "rgba(26, 24, 22, 0.8)",
              backdropFilter: "blur(8px)",
            }}>
              <Shield className="mx-auto mb-4 h-12 w-12" style={{ color: "var(--accent-main)" }} />
              <h2 className="mb-4 text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: '"Bebas Neue", sans-serif' }}>Garantia de Sabor</h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Acceso de por Vida. Sabor de franquicia replicable si sigues el metodo.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h2 className="mb-8 text-center text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: '"Bebas Neue", sans-serif' }}>Preguntas Frecuentes</h2>
            </ScrollReveal>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="rounded-lg" style={{
                    border: "1px solid var(--border-inactive)",
                    backgroundColor: "rgba(26, 24, 22, 0.7)",
                    backdropFilter: "blur(4px)",
                  }}>
                    <button
                      type="button"
                      onClick={() => toggleFaq(i)}
                      className="flex w-full items-center justify-between p-4 text-left"
                    >
                      <span className="pr-4 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{faq.q}</span>
                      {openFaq === i ? (
                        <ChevronUp className="h-5 w-5 flex-shrink-0" style={{ color: "var(--text-tertiary)" }} />
                      ) : (
                        <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: "var(--text-tertiary)" }} />
                      )}
                    </button>
                    {openFaq === i && (
                      <div className="px-4 py-3" style={{ borderTop: "1px solid var(--border-inactive)" }}>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{faq.a}</p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative px-4 py-12">
          <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(220, 38, 38, 0.04) 0%, transparent 60%)",
          }} />
          <ScrollReveal>
            <div className="mx-auto max-w-2xl rounded-xl p-8 text-center" style={{
              border: "1px solid var(--border-inactive)",
              backgroundColor: "rgba(26, 24, 22, 0.8)",
              backdropFilter: "blur(8px)",
            }}>
              <h2 className="mb-4 text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: '"Bebas Neue", sans-serif' }}>Accede Ahora a La Cocina Secreta</h2>
              <p className="mb-6" style={{ color: "var(--text-secondary)" }}>14 archivos exclusivos. Acceso de por vida. Garantia total.</p>

              <div className="mb-6 inline-block rounded-lg px-6 py-4" style={{ border: "1px solid rgba(245, 158, 11, 0.3)", backgroundColor: "rgba(245, 158, 11, 0.1)" }}>
                <p className="text-sm line-through" style={{ color: "var(--text-tertiary)" }}>Valor real: $67 USD</p>
                <p className="text-3xl font-bold" style={{ color: "var(--accent-main)", fontFamily: '"Bebas Neue", sans-serif' }}>$9,90 USD</p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Pago unico - Oferta de Lanzamiento</p>
              </div>

              {/* Inline food icons */}
              <div className="mb-4 flex items-center justify-center gap-4 opacity-30">
                <FoodIcon icon="burger" size={28} />
                <FoodIcon icon="fries" size={24} />
                <FoodIcon icon="sauce" size={26} />
                <FoodIcon icon="burger" size={22} />
                <FoodIcon icon="fries" size={28} />
              </div>
            </div>
          </ScrollReveal>
        </section>

        <footer className="px-4 py-8 text-center" style={{ borderTop: "1px solid var(--border-inactive)" }}>
          <div className="mx-auto max-w-2xl">
            <p className="text-[10px] leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
              <strong>DESCARGO DE RESPONSABILIDAD:</strong> Este producto no esta afiliado, respaldado ni conectado
              de ninguna manera con ninguna marca comercial mencionada. Todas las referencias a marcas
              se utilizan estrictamente con fines comparativos. Las recetas contenidas en &quot;La Cocina Secreta&quot;
              son interpretaciones culinarias de ingenieria inversa (copycat recipes) creadas por chefs
              independientes con fines educativos.
            </p>
            <div className="mt-4 flex justify-center gap-4 text-[10px]" style={{ color: "var(--text-tertiary)" }}>
              <span className="cursor-pointer hover:opacity-70">Terminos y Condiciones</span>
              <span className="cursor-pointer hover:opacity-70">Politica de Privacidad</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 backdrop-blur-sm md:left-auto md:right-auto md:w-[430px]" style={{ borderTop: "1px solid var(--border-inactive)", backgroundColor: "rgba(15, 14, 12, 0.95)" }}>
        <div className="mx-auto max-w-2xl">
          <a
            href="https://el-codigo-del-sabor.myshopify.com/checkouts/cn/hWN7YxMNTr99pOTOSFbKIEOf/es-mx?_r=AQABryhwkRHB94-_Ko68hddjAC1LTBcRJXNs2oNF2jK4ROs&skip_shop_pay=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="w-full py-6 text-base font-bold tracking-wider transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, var(--cta-red) 0%, var(--orange) 50%, var(--accent-dark) 100%)",
                color: "var(--text-primary)",
                boxShadow: "0 0 15px rgba(220, 38, 38, 0.4)",
                fontFamily: '"Bebas Neue", sans-serif',
              }}
            >
              DESCARGAR ARCHIVOS ($9,90 USD)
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
