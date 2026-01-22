"use client"

import { useState, useRef } from "react"
import { Check, ChevronDown, ChevronUp, Lock, Shield, Clock, Flame, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const archivos = [
  { name: "Street Food Internacional", image: "/images/street-20food.jpg" },
  { name: "Sándwiches del Mundo", image: "/images/sandwiches-20del-20mundo.jpg" },
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
  { name: "Recetas Secretas: Los Sabores Más Famosos", image: "/images/recetas-20secretas.jpg" },
]

const faqs = [
  {
    q: "📦 ¿Qué incluye exactamente La Bóveda?",
    a: "14 archivos PDF con recetas replicadas estilo franquicia, técnicas de street food internacional, y guías de presentación profesional.",
  },
  {
    q: "🔓 ¿Cuánto tiempo tengo acceso?",
    a: "Acceso de por vida. Una vez que descargas los archivos, son tuyos para siempre.",
  },
  {
    q: "👩‍🍳 ¿Necesito experiencia previa en cocina?",
    a: "No. Las recetas están diseñadas paso a paso para que cualquier persona pueda replicarlas desde casa.",
  },
  {
    q: "📱 ¿Puedo ver los eBooks en el celular?",
    a: "Sí. Funcionan perfecto en Android, iPhone y PC.",
  },
]

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
    // CAMBIO 1: Forzamos bg-black y text-white para evitar flash blanco y mantener estilo Hacker
    <div className="scrollable-page min-h-screen bg-black text-white pb-32">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[#00ff41]/5 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.05) 2px, rgba(0,255,0,0.05) 4px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00ff41]/30 bg-[#00ff41]/10 px-4 py-2">
            <Lock className="h-4 w-4 text-[#00ff41]" />
            <span className="font-mono text-xs text-[#00ff41]">ACCESO CONCEDIDO</span>
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl">
            La Bóveda Secreta
            <br />
            <span className="text-[#00ff41]">14 Archivos Clasificados</span>
          </h1>

          <p className="mb-8 text-lg text-gray-400">
            Las recetas que las franquicias nunca quisieron que vieras. Ahora en tus manos.
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4 text-[#00ff41]" />
              <span>Oferta por tiempo limitado</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Flame className="h-4 w-4 text-red-500" />
              <span>Alta demanda hoy</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-md">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              playsInline
              preload="auto"
              // Loop activado para que no se quede negro al final
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
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#00ff41] bg-black/50 transition-transform hover:scale-110"
                  style={{ boxShadow: "0 0 20px rgba(0,255,65,0.4)" }}
                >
                  <Play className="ml-1 h-8 w-8 text-[#00ff41]" />
                </div>
              </button>
            )}

            {/* Corner accents */}
            <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[#00ff41]" />
            <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-[#00ff41]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[#00ff41]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[#00ff41]" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-y border-white/10 bg-zinc-900 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">El Problema</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              Las franquicias gastan millones protegiendo sus recetas. Contratan abogados, firman acuerdos de
              confidencialidad, y destruyen cualquier filtración.
            </p>
            <p>
              Mientras tanto, tú pagas <span className="font-semibold text-white">10x más</span> por la misma
              comida que podrías hacer en casa.
            </p>
            <p className="font-semibold text-[#00ff41]">Eso termina hoy.</p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">La Solución</h2>
          <p className="mb-8 text-center text-gray-400">
            Un equipo de expertos decidió romper el silencio. Compilamos años de investigación en 14 archivos.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {[
              "Réplicas exactas de sabores famosos",
              "Técnicas de street food que nadie te enseña",
              "Guías de presentación profesional",
              "Secretos de salsas y marinados",
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-white/10 bg-zinc-900 p-4">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#00ff41]" />
                <p className="text-white">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Grid Section */}
      <section className="border-y border-white/10 bg-zinc-900 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-white">Incluye 14 Archivos</h2>
          <p className="mb-8 text-center text-gray-400">Todo lo que necesitas para dominar el sabor</p>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {archivos.map((archivo, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-lg border border-white/10 bg-black p-3 text-center"
              >
                <div className="relative mb-2 aspect-[3/4] w-full overflow-hidden rounded-lg">
                  <Image src={archivo.image || "/placeholder.svg"} alt={archivo.name} fill className="object-cover" />
                  {/* CONFIDENCIAL badge */}
                  <div className="absolute left-1 top-1 rounded border-2 border-red-600 bg-black/90 px-1.5 py-0.5 shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                    <span className="text-[8px] font-bold text-red-600 [text-shadow:0_0_8px_rgba(220,38,38,0.8)]">
                      CONFIDENCIAL
                    </span>
                  </div>
                  {/* PDF badge */}
                  <span className="absolute right-1 top-1 rounded bg-[#00ff41]/90 px-1.5 py-0.5 text-[8px] font-medium text-black">
                    PDF
                  </span>
                </div>
                <p className="line-clamp-2 text-xs font-medium text-gray-300">{archivo.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Lo Que Dicen</h2>
          <div className="space-y-4">
            {[
              {
                text: "Hice la hamburguesa de mi franquicia favorita y quedó IGUAL. Increíble.",
                author: "María G.",
              },
              {
                text: "Entendí por qué las salsas funcionan. Las salsas son el verdadero secreto.",
                author: "Carlos R.",
              },
              {
                text: "Mis hijos pensaron que habia ido a comprar la comida. Y puedo repetirla sin que cambie.",
                author: "Ana L.",
              },
            ].map((testimonial, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-zinc-900 p-4">
                <p className="mb-2 text-sm italic text-white">{`"${testimonial.text}"`}</p>
                <p className="text-xs text-gray-500">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="border-y border-white/10 bg-zinc-900 px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <Shield className="mx-auto mb-4 h-12 w-12 text-[#00ff41]" />
          <h2 className="mb-4 text-2xl font-bold text-white">Garantía de Sabor</h2>
          <p className="text-gray-400">
            Acceso de por Vida. Sabor de franquicia replicable si sigues el método.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Preguntas Frecuentes</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-zinc-900">
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <span className="pr-4 text-sm font-medium text-white">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-500" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="border-t border-white/10 px-4 py-3">
                    <p className="text-sm text-gray-400">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 bg-zinc-900 px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Accede Ahora a La Bóveda</h2>
          <p className="mb-6 text-gray-400">14 archivos clasificados. Acceso de por vida. Garantía total.</p>

          <div className="mb-6 inline-block rounded-lg border border-[#00ff41]/30 bg-[#00ff41]/10 px-6 py-4">
            {/* CAMBIO 3: Precio ancla ajustado para credibilidad */}
            <p className="text-sm text-gray-500 line-through">Valor real: $67 USD</p>
            <p className="text-3xl font-bold text-[#00ff41]">$10 USD </p>
            <p className="text-xs text-gray-400">Pago único - Oferta de Lanzamiento</p>
          </div>
        </div>
      </section>

      {/* CAMBIO 2: Footer Legal Anti-Ban */}
      <footer className="border-t border-white/10 bg-black px-4 py-8 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-[10px] text-gray-600 leading-relaxed">
            <strong>DESCARGO DE RESPONSABILIDAD:</strong> Este producto no está afiliado, respaldado ni conectado 
            de ninguna manera con ninguna marca comercial mencionada. Todas las referencias a marcas 
            se utilizan estrictamente con fines comparativos. Las recetas contenidas en "La Bóveda" 
            son interpretaciones culinarias de ingeniería inversa (copycat recipes) creadas por chefs 
            independientes con fines educativos.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-[10px] text-gray-600">
            <span className="cursor-pointer hover:text-gray-400">Términos y Condiciones</span>
            <span className="cursor-pointer hover:text-gray-400">Política de Privacidad</span>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/95 p-4 backdrop-blur-sm md:left-auto md:right-auto md:w-[430px]">
        <div className="mx-auto max-w-2xl">
          <a
            href="https://el-codigo-del-sabor.myshopify.com/checkouts/cn/hWN7YxMNTr99pOTOSFbKIEOf/es-mx?_r=AQABryhwkRHB94-_Ko68hddjAC1LTBcRJXNs2oNF2jK4ROs&skip_shop_pay=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* CAMBIO 4: Texto de botón optimizado para acción */}
            <Button className="w-full bg-[#00ff41] py-6 text-base font-bold text-black hover:bg-[#00ff41]/90 shadow-[0_0_15px_rgba(0,255,65,0.3)]">
              🔓 DESCARGAR ARCHIVOS ($10 USD)
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
