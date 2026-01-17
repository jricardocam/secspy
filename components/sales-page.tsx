"use client"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp, Lock, Shield, Clock, Flame } from "lucide-react"
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
    q: "📦¿Qué incluye exactamente La Bóveda?",
    a: "14 archivos PDF con recetas secretas de franquicias, técnicas de street food internacional, y guías de presentación profesional.",
  },
  {
    q: "🔓¿Cuánto tiempo tengo acceso?",
    a: "Acceso de por vida. Una vez que descargas los archivos, son tuyos para siempre.",
  },
  {
    q: "👩‍🍳 ¿Necesito experiencia previa en cocina?",
    a: "No. Las recetas están diseñadas para que cualquier persona pueda replicarlas desde casa.",
  },
  {
    q: "📱 ¿Puedo ver los eBooks en el celular?",
    a: "Sí. Funcionan perfecto en Android, iPhone y PC",
  },
]

export function SalesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="scrollable-page min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16">
        {/* Background effects */}
        <div className="absolute inset-0 bg-primary/5 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.05) 2px, rgba(0,255,0,0.05) 4px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <Lock className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs text-primary">ACCESO RESTRINGIDO</span>
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground md:text-4xl">
            La Bóveda Secreta
            <br />
            <span className="text-primary">14 Archivos Clasificados</span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground">
            Las recetas que las franquicias nunca quisieron que vieras. Ahora en tus manos.
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>Oferta por tiempo limitado</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Flame className="h-4 w-4 text-destructive" />
              <span>Se abre por ventanas. Hoy está disponible.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-y border-border bg-card px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">El Problema</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Las franquicias gastan millones protegiendo sus recetas. Contratan abogados, firman acuerdos de
              confidencialidad, y destruyen cualquier filtración.
            </p>
            <p>
              Mientras tanto, tú pagas <span className="font-semibold text-foreground">10x más</span> por la misma
              comida que podrías hacer en casa.
            </p>
            <p className="font-semibold text-primary">Eso termina hoy.</p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">La Solución</h2>
          <p className="mb-8 text-center text-muted-foreground">
            Un ex-chef de franquicia decidió romper el silencio. Compiló todo lo que aprendió en 14 archivos
            clasificados.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {[
              "Recetas exactas de las franquicias más famosas",
              "Técnicas de street food que nadie te enseña",
              "Guías de presentación profesional",
              "Secretos de salsas y marinados",
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Grid Section */}
      <section className="border-y border-border bg-card px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground">Incluye 14 Archivos</h2>
          <p className="mb-8 text-center text-muted-foreground">Todo lo que necesitas para dominar el sabor</p>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {archivos.map((archivo, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-lg border border-border bg-background p-3 text-center"
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
                  <span className="absolute right-1 top-1 rounded bg-primary/90 px-1.5 py-0.5 text-[8px] font-medium text-black">
                    PDF
                  </span>
                </div>
                <p className="line-clamp-2 text-xs font-medium text-foreground">{archivo.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Lo Que Dicen</h2>
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
              <div key={i} className="rounded-lg border border-border bg-card p-4">
                <p className="mb-2 text-sm italic text-foreground">{`"${testimonial.text}"`}</p>
                <p className="text-xs text-muted-foreground">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="border-y border-border bg-card px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <Shield className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="mb-4 text-2xl font-bold text-foreground">Garantía de Sabor</h2>
          <p className="text-muted-foreground">Acceso de por Vida. Sabor de franquicia replicable si sigues el método.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Preguntas Frecuentes</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border border-border bg-card">
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <span className="pr-4 text-sm font-medium text-foreground">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="border-t border-border px-4 py-3">
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-card px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Accede Ahora a La Bóveda</h2>
          <p className="mb-6 text-muted-foreground">14 archivos clasificados. Acceso de por vida. Garantía total.</p>

          <div className="mb-6 inline-block rounded-lg border border-primary/30 bg-primary/10 px-6 py-4">
            <p className="text-sm text-muted-foreground line-through">Valor real: $197</p>
            <p className="text-3xl font-bold text-primary">$10 USD </p>
            <p className="text-xs text-muted-foreground">Pago único</p>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/95 p-4 backdrop-blur-sm md:left-auto md:right-auto md:w-[430px]">
        <div className="mx-auto max-w-2xl">
          <a
            href="https://el-codigo-del-sabor.myshopify.com/checkouts/cn/hWN7YxMNTr99pOTOSFbKIEOf/es-mx?_r=AQABryhwkRHB94-_Ko68hddjAC1LTBcRJXNs2oNF2jK4ROs&skip_shop_pay=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full bg-primary py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90">
              Desbloquear la Bóveda – $10 USD
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
