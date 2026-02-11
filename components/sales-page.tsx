"use client"

import { useState, useRef } from "react"
import { Check, ChevronDown, ChevronUp, Shield, Flame, Star, Users, Zap, ChefHat, Heart, DollarSign, Gift, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// ===== CONFIGURACIÓN =====
const CHECKOUT_URL = "https://el-codigo-del-sabor.myshopify.com/checkouts/cn/hWN7YxMNTr99pOTOSFbKIEOf/es-mx?_r=AQABryhwkRHB94-_Ko68hddjAC1LTBcRJXNs2oNF2jK4ROs&skip_shop_pay=true"
const PRECIO_OFERTA = "$9.90 USD"
const PRECIO_ORIGINAL = "$67 USD"
const WHATSAPP_LINK = "https://wa.me/TUNUMERO" // Cambiar por tu número real
// ==========================

const archivosPrincipales = [
  { name: "Recetas Secretas: Los Sabores Más Famosos", image: "/images/recetas-20secretas.jpg", tag: "PRINCIPAL" },
  { name: "Street Food Internacional", image: "/images/street-20food.jpg", tag: "PRINCIPAL" },
  { name: "Sándwiches del Mundo", image: "/images/sandwiches-20del-20mundo.jpg", tag: "PRINCIPAL" },
]

const archivosBonus = [
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
  { name: "Guía de Presentación y Empaque", image: "/images/guias-20de-20presentacion.jpg" },
]

const faqs = [
  {
    q: "📦 ¿Qué incluye exactamente La Cocina Secreta?",
    a: "3 guías principales con las recetas más buscadas (hamburguesas, street food, sándwiches) + 11 guías bonus de regalo (salsas, dulces, bebidas, empanadas, panes, y más). En total: 14 guías PDF con más de 400 recetas paso a paso.",
  },
  {
    q: "🔓 ¿Cuánto tiempo tengo acceso?",
    a: "Para siempre. Una vez que compras, descargas los archivos y son tuyos de por vida. Sin suscripciones, sin pagos recurrentes.",
  },
  {
    q: "👩‍🍳 ¿Necesito experiencia previa en cocina?",
    a: "No. Cada receta tiene instrucciones paso a paso, con ingredientes exactos y técnicas explicadas desde cero. Si sabes encender una estufa, puedes seguir estas recetas.",
  },
  {
    q: "📱 ¿En qué formato vienen?",
    a: "PDF. Funcionan perfecto en celular (Android/iPhone), tablet y computadora. Puedes verlos sin internet una vez descargados.",
  },
  {
    q: "💰 ¿Puedo usar estas recetas para vender?",
    a: "Sí. Muchas personas usan estas recetas para emprender vendiendo comida desde casa, en puestos callejeros o en food trucks. Las recetas incluyen tips de costos y presentación.",
  },
  {
    q: "🔄 ¿Y si no me gusta?",
    a: "Tienes 7 días de garantía. Si no te convence, te devolvemos tu dinero completo por WhatsApp. Sin preguntas, sin complicaciones.",
  },
]

export function SalesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showAllBonus, setShowAllBonus] = useState(false)
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

  const visibleBonus = showAllBonus ? archivosBonus : archivosBonus.slice(0, 4)

  return (
    <div className="scrollable-page min-h-screen pb-32" style={{ backgroundColor: "#0F0E0C", color: "#FAF7F2" }}>
      
      {/* ============================================ */}
      {/* HERO — Beneficio + Precio inmediato          */}
      {/* ============================================ */}
      <section className="relative overflow-hidden px-5 pt-10 pb-8">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 100%, rgba(220,38,38,0.03) 0%, transparent 50%)
            `,
          }}
        />

        <div className="relative z-10 mx-auto max-w-md text-center">
          {/* Social proof pill */}
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}
          >
            <Flame className="h-3.5 w-3.5" style={{ color: "#F59E0B" }} />
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#F59E0B" }}>
              +3,500 personas ya tienen acceso
            </span>
          </div>

          {/* Main headline — benefit-driven */}
          <h1
            className="mb-4"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "34px",
              lineHeight: 1.1,
              color: "#FAF7F2",
              letterSpacing: "1px",
            }}
          >
            Aprende a Preparar
            <br />
            <span style={{ color: "#F59E0B" }}>y Vender</span> los Platillos
            <br />
            Más Famosos del Mundo
          </h1>

          {/* Sub-headline */}
          <p
            className="mb-6 mx-auto"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "15px",
              color: "#A8A29E",
              lineHeight: 1.6,
              maxWidth: "340px",
            }}
          >
            400+ recetas con técnicas exactas de chefs que trabajaron en las cocinas de las cadenas más grandes. Paso a paso, sin experiencia previa.
          </p>

          {/* Price block — visible immediately */}
          <div
            className="mb-5 rounded-xl px-6 py-5 mx-auto"
            style={{
              maxWidth: "300px",
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#57534E", textDecoration: "line-through" }}>
              Valor total: {PRECIO_ORIGINAL}
            </p>
            <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "42px", color: "#FBBF24", lineHeight: 1, marginTop: "4px" }}>
              {PRECIO_OFERTA}
            </p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#A8A29E", marginTop: "4px" }}>
              Pago único · Acceso de por vida
            </p>
          </div>

          {/* CTA Button */}
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block">
            <button
              className="w-full transition-all duration-200 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #DC2626, #EA580C, #D97706)",
                color: "#FFFFFF",
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "19px",
                letterSpacing: "2px",
                padding: "18px",
                borderRadius: "14px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(220,38,38,0.35)",
              }}
            >
              🔥 OBTENER ACCESO AHORA
            </button>
          </a>

          {/* Trust badges */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#57534E" }}>
              🔒 Pago seguro
            </span>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#57534E" }}>
              ⚡ Acceso inmediato
            </span>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#57534E" }}>
              ✅ Garantía 7 días
            </span>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHAT YOU GET — Guías principales             */}
      {/* ============================================ */}
      <section className="px-5 py-10" style={{ borderTop: "1px solid #2A2520" }}>
        <div className="mx-auto max-w-md">
          <h2
            className="mb-2 text-center"
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "26px", color: "#FAF7F2", letterSpacing: "1px" }}
          >
            Lo Que Te Llevas Hoy
          </h2>
          <p
            className="mb-6 text-center"
            style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#A8A29E" }}
          >
            3 guías principales + 11 guías bonus de regalo
          </p>

          {/* Main products */}
          <div className="mb-3">
            <p
              className="mb-3"
              style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "14px", color: "#F59E0B", letterSpacing: "2px" }}
            >
              ⭐ GUÍAS PRINCIPALES
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {archivosPrincipales.map((archivo, i) => (
                <div key={i} className="flex flex-col items-center rounded-xl p-2.5 text-center" style={{ border: "1px solid rgba(245,158,11,0.25)", background: "rgba(245,158,11,0.05)" }}>
                  <div className="relative mb-2 aspect-[3/4] w-full overflow-hidden rounded-lg">
                    <Image src={archivo.image || "/placeholder.svg"} alt={archivo.name} fill className="object-cover" />
                    <span className="absolute left-1 top-1 rounded px-1.5 py-0.5 text-[7px] font-bold" style={{ backgroundColor: "#F59E0B", color: "#0F0E0C" }}>
                      PRINCIPAL
                    </span>
                  </div>
                  <p className="line-clamp-2 text-[11px] font-medium" style={{ color: "#FAF7F2" }}>{archivo.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bonus products */}
          <div className="mt-6">
            <p
              className="mb-3"
              style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "14px", color: "#22C55E", letterSpacing: "2px" }}
            >
              🎁 +11 GUÍAS BONUS GRATIS
            </p>
            <div className="grid grid-cols-4 gap-2">
              {visibleBonus.map((archivo, i) => (
                <div key={i} className="flex flex-col items-center rounded-lg p-2 text-center" style={{ border: "1px solid #2A2520", background: "#1A1816" }}>
                  <div className="relative mb-1.5 aspect-[3/4] w-full overflow-hidden rounded-md">
                    <Image src={archivo.image || "/placeholder.svg"} alt={archivo.name} fill className="object-cover" />
                    <span className="absolute left-0.5 top-0.5 rounded px-1 py-0.5 text-[6px] font-bold" style={{ backgroundColor: "#22C55E", color: "#0F0E0C" }}>
                      GRATIS
                    </span>
                  </div>
                  <p className="line-clamp-2 text-[9px]" style={{ color: "#A8A29E" }}>{archivo.name}</p>
                </div>
              ))}
            </div>
            {!showAllBonus && (
              <button
                onClick={() => setShowAllBonus(true)}
                className="mt-3 w-full rounded-lg py-2.5 text-center transition-all"
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: "13px",
                  color: "#F59E0B",
                  border: "1px solid rgba(245,158,11,0.2)",
                  background: "rgba(245,158,11,0.05)",
                  cursor: "pointer",
                }}
              >
                Ver las {archivosBonus.length - 4} guías bonus restantes ↓
              </button>
            )}
          </div>

          {/* Total value summary */}
          <div
            className="mt-6 rounded-xl p-4"
            style={{ border: "1px solid #2A2520", background: "#1A1816" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#A8A29E" }}>3 guías principales</span>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#57534E", textDecoration: "line-through" }}>$29.90</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#A8A29E" }}>11 guías bonus</span>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#57534E", textDecoration: "line-through" }}>$37.10</span>
            </div>
            <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid #2A2520" }}>
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "16px", color: "#FAF7F2", letterSpacing: "1px" }}>TÚ PAGAS HOY</span>
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "24px", color: "#FBBF24" }}>{PRECIO_OFERTA}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOR WHO — 3 perfiles                         */}
      {/* ============================================ */}
      <section className="px-5 py-10" style={{ borderTop: "1px solid #2A2520", background: "#1A1816" }}>
        <div className="mx-auto max-w-md">
          <h2
            className="mb-6 text-center"
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "24px", color: "#FAF7F2", letterSpacing: "1px" }}
          >
            ¿Para Quién es Esto?
          </h2>

          <div className="space-y-3">
            {[
              {
                emoji: "👨‍👩‍👧‍👦",
                title: "Para tu familia",
                desc: "Deja de gastar en delivery. Sorprende a tu familia con comida que sabe igual o mejor que la de sus cadenas favoritas — por una fracción del precio.",
              },
              {
                emoji: "💰",
                title: "Para emprender",
                desc: "Empieza a vender comida con recetas que la gente YA conoce y ama. Costos bajísimos, márgenes altos. Desde tu cocina, un puesto o un food truck.",
              },
              {
                emoji: "🔥",
                title: "Para ti",
                desc: "Aprende técnicas reales de chefs profesionales. Deja de improvisar y empieza a cocinar con la confianza de que siempre va a quedar increíble.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{ border: "1px solid #2A2520", background: "#0F0E0C" }}
              >
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: "24px", flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "15px", fontWeight: 600, color: "#FAF7F2", marginBottom: "4px" }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#A8A29E", lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* COMPARISON — Delivery vs Cocina Secreta      */}
      {/* ============================================ */}
      <section className="px-5 py-10" style={{ borderTop: "1px solid #2A2520" }}>
        <div className="mx-auto max-w-md">
          <h2
            className="mb-6 text-center"
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "24px", color: "#FAF7F2", letterSpacing: "1px" }}
          >
            Haz las Cuentas
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {/* Delivery column */}
            <div className="rounded-xl p-4 text-center" style={{ border: "1px solid rgba(220,38,38,0.3)", background: "rgba(220,38,38,0.05)" }}>
              <p style={{ fontSize: "28px", marginBottom: "8px" }}>🛵</p>
              <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "15px", color: "#FAF7F2", letterSpacing: "1px", marginBottom: "8px" }}>
                PEDIR DELIVERY
              </p>
              <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "28px", color: "#DC2626" }}>$196/mes</p>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#57534E", marginTop: "4px" }}>
                Hamburguesas + papas + envío + propina. Se acaba en 15 minutos.
              </p>
            </div>

            {/* Cocina Secreta column */}
            <div className="rounded-xl p-4 text-center" style={{ border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.05)" }}>
              <p style={{ fontSize: "28px", marginBottom: "8px" }}>🔥</p>
              <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "15px", color: "#FAF7F2", letterSpacing: "1px", marginBottom: "8px" }}>
                COCINA SECRETA
              </p>
              <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "28px", color: "#FBBF24" }}>{PRECIO_OFERTA}</p>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#57534E", marginTop: "4px" }}>
                400+ recetas de por vida. Mismo sabor. Desde tu cocina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SOCIAL PROOF                                 */}
      {/* ============================================ */}
      <section className="px-5 py-10" style={{ borderTop: "1px solid #2A2520", background: "#1A1816" }}>
        <div className="mx-auto max-w-md">
          <h2
            className="mb-2 text-center"
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "24px", color: "#FAF7F2", letterSpacing: "1px" }}
          >
            Lo Que Dicen Nuestros Chefs
          </h2>
          <p className="mb-6 text-center" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#57534E" }}>
            ★★★★★ 4.8 promedio · +3,500 descargas
          </p>

          <div className="space-y-3">
            {[
              {
                text: "Hice la smash burger y mi esposo pensó que la había comprado. Me pidió que la hiciera de nuevo al día siguiente. 10/10.",
                author: "María G.",
                detail: "🍔 Preparó: Smash Burger",
              },
              {
                text: "Empecé a vender papas loaded con la receta del ebook. Ya tengo 15 clientes fijos en mi colonia. La inversión se pagó en el primer día.",
                author: "Diego M.",
                detail: "💰 Emprendió con: Papas Loaded",
              },
              {
                text: "Mis hijos ya no me piden delivery. Me piden que cocine. Eso nunca había pasado. Las salsas son el verdadero secreto.",
                author: "Ana L.",
                detail: "👨‍👩‍👧‍👦 Cocina para: Su familia",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{ border: "1px solid #2A2520", background: "#0F0E0C" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className="h-3 w-3 fill-current" style={{ color: "#F59E0B" }} />
                  ))}
                </div>
                <p
                  className="mb-3"
                  style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#FAF7F2", lineHeight: 1.5, fontStyle: "italic" }}
                >
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#57534E" }}>
                    — {testimonial.author}
                  </span>
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#F59E0B" }}>
                    {testimonial.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* GUARANTEE — Real, specific, with WhatsApp    */}
      {/* ============================================ */}
      <section className="px-5 py-10" style={{ borderTop: "1px solid #2A2520" }}>
        <div className="mx-auto max-w-md text-center">
          <Shield className="mx-auto mb-4 h-12 w-12" style={{ color: "#22C55E" }} />
          <h2
            className="mb-3"
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "24px", color: "#FAF7F2", letterSpacing: "1px" }}
          >
            Garantía de 7 Días
          </h2>
          <p
            className="mb-4 mx-auto"
            style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#A8A29E", lineHeight: 1.6, maxWidth: "340px" }}
          >
            Si no te convence, te devolvemos tu dinero completo. Sin preguntas, sin complicaciones. Solo escríbenos por WhatsApp y listo.
          </p>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#57534E" }}>
            🔒 Tu compra está protegida · Pago seguro vía Shopify
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* VIDEO                                        */}
      {/* ============================================ */}
      <section className="px-5 py-10" style={{ borderTop: "1px solid #2A2520", background: "#1A1816" }}>
        <div className="mx-auto max-w-md">
          <h2
            className="mb-2 text-center"
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "24px", color: "#FAF7F2", letterSpacing: "1px" }}
          >
            Mira Lo Que Vas a Aprender
          </h2>
          <p
            className="mb-5 text-center"
            style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#A8A29E" }}
          >
            Un vistazo a lo que incluye La Cocina Secreta
          </p>
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl" style={{ border: "1px solid #2A2520", backgroundColor: "#0F0E0C" }}>
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
                    borderColor: "#F59E0B",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)",
                  }}
                >
                  <Play className="ml-1 h-8 w-8" style={{ color: "#F59E0B" }} />
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FAQ                                          */}
      {/* ============================================ */}
      <section className="px-5 py-10" style={{ borderTop: "1px solid #2A2520", background: "#1A1816" }}>
        <div className="mx-auto max-w-md">
          <h2
            className="mb-6 text-center"
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "24px", color: "#FAF7F2", letterSpacing: "1px" }}
          >
            Preguntas Frecuentes
          </h2>
          <div className="space-y-2.5">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid #2A2520", background: "#0F0E0C" }}>
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-center justify-between p-4 text-left"
                  style={{ cursor: "pointer", background: "transparent", border: "none" }}
                >
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", fontWeight: 500, color: "#FAF7F2", paddingRight: "12px" }}>
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="h-4 w-4 flex-shrink-0" style={{ color: "#57534E" }} />
                  ) : (
                    <ChevronDown className="h-4 w-4 flex-shrink-0" style={{ color: "#57534E" }} />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4" style={{ borderTop: "1px solid #2A2520" }}>
                    <p className="pt-3" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#A8A29E", lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA                                    */}
      {/* ============================================ */}
      <section className="px-5 py-12" style={{ borderTop: "1px solid #2A2520" }}>
        <div className="mx-auto max-w-md text-center">
          <h2
            className="mb-3"
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "26px", color: "#FAF7F2", letterSpacing: "1px" }}
          >
            ¿Todavía lo Estás Pensando?
          </h2>
          <p
            className="mb-6 mx-auto"
            style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#A8A29E", lineHeight: 1.6, maxWidth: "340px" }}
          >
            Son {PRECIO_OFERTA}. Menos que una pizza un viernes por la noche. Te llevas 400+ recetas para toda la vida, con garantía de devolución de 7 días. Sin riesgo.
          </p>

          {/* Final price */}
          <div
            className="mb-6 rounded-xl px-6 py-5 mx-auto"
            style={{ maxWidth: "300px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}
          >
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#57534E", textDecoration: "line-through" }}>
              {PRECIO_ORIGINAL}
            </p>
            <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "42px", color: "#FBBF24", lineHeight: 1, marginTop: "4px" }}>
              {PRECIO_OFERTA}
            </p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#A8A29E", marginTop: "4px" }}>
              Pago único · Acceso de por vida · Garantía 7 días
            </p>
          </div>

          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block">
            <button
              className="w-full transition-all duration-200 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #DC2626, #EA580C, #D97706)",
                color: "#FFFFFF",
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "19px",
                letterSpacing: "2px",
                padding: "18px",
                borderRadius: "14px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(220,38,38,0.35)",
              }}
            >
              🔥 OBTENER MI ACCESO — {PRECIO_OFERTA}
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-8 text-center" style={{ borderTop: "1px solid #2A2520" }}>
        <div className="mx-auto max-w-md">
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", color: "#57534E", lineHeight: 1.6 }}>
            <strong>DESCARGO DE RESPONSABILIDAD:</strong> Este producto no está afiliado, respaldado ni conectado
            de ninguna manera con ninguna marca comercial mencionada. Todas las referencias a marcas
            se utilizan estrictamente con fines comparativos. Las recetas contenidas en &ldquo;La Cocina Secreta&rdquo;
            son interpretaciones culinarias de ingeniería inversa (copycat recipes) creadas por chefs
            independientes con fines educativos.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", color: "#57534E", cursor: "pointer" }}>Términos y Condiciones</span>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", color: "#57534E", cursor: "pointer" }}>Política de Privacidad</span>
          </div>
        </div>
      </footer>

      {/* ============================================ */}
      {/* STICKY CTA — Always visible                  */}
      {/* ============================================ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 backdrop-blur-sm md:left-auto md:right-auto md:w-[430px]"
        style={{
          borderTop: "1px solid rgba(245,158,11,0.15)",
          background: "rgba(15,14,12,0.95)",
          padding: "12px 16px max(12px, env(safe-area-inset-bottom))",
        }}
      >
        <div className="mx-auto max-w-md">
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block">
            <button
              className="w-full flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #DC2626, #EA580C, #D97706)",
                color: "#FFFFFF",
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "17px",
                letterSpacing: "2px",
                padding: "16px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 -2px 20px rgba(220,38,38,0.3)",
              }}
            >
              <span>🔥</span>
              <span>DESCARGAR ARCHIVOS</span>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", fontWeight: 700, opacity: 0.9 }}>
                — {PRECIO_OFERTA}
              </span>
            </button>
          </a>
          <p className="mt-1.5 text-center" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", color: "#57534E" }}>
            🔒 Pago seguro · Acceso inmediato · Garantía 7 días
          </p>
        </div>
      </div>
    </div>
  )
}
