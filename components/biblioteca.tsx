"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, CheckCircle, X, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

const archivos = [
  {
    id: 1,
    title: "Street Food Internacional: El Mundo en tu Cocina",
    verified: true,
    image: "/images/street-20food.jpg",
  },
  { id: 2, title: "Acompañamientos que Enamoran", verified: true, image: "/images/acompa-c3-b1amientos.jpeg" },
  { id: 3, title: "Salsas Callejeras y Toppings Explosivos", verified: true, image: "/images/salsas-20callejeras.jpg" },
  { id: 4, title: "Dulces Callejeros: Postres del Mundo", verified: false, image: "/images/dulces-20callejeros.jpg" },
  { id: 5, title: "Bebidas y Tragos del Mundo", verified: true, image: "/images/bebidas-20y-20tragos.jpg" },
  { id: 6, title: "Panes del Mundo", verified: false, image: "/images/panes-20del-20mundo.jpg" },
  {
    id: 7,
    title: "Guía de Presentación, Empaque y Experiencia Sabor Callejero",
    verified: true,
    image: "/images/guias-20de-20presentacion.jpg",
  },
  { id: 8, title: "Sándwiches del Mundo", verified: true, image: "/images/sandwiches-20del-20mundo.jpg" },
  {
    id: 9,
    title: "Recetas Secretas: Los Sabores Más Famosos del Mundo",
    verified: true,
    image: "/images/recetas-20secretas.jpg",
  },
  { id: 10, title: "Bowls Callejeros", verified: false, image: "/images/bowls-20callejeros.jpg" },
  { id: 11, title: "Maestro de Empanadas", verified: true, image: "/images/maestro-20empanadas.jpg" },
  { id: 12, title: "Callejeros Irresistibles", verified: true, image: "/images/callejeros-20irresistibles.jpg" },
  {
    id: 13,
    title: "Frutas Callejeras: El Mundo en tu Cocina",
    verified: false,
    image: "/images/frutas-20callejeras.jpg",
  },
  { id: 14, title: "Sabores en Frascos", verified: true, image: "/images/sabores-20en-20frasco.jpg" },
]

export function Biblioteca() {
  const router = useRouter()
  const [selectedArchivo, setSelectedArchivo] = useState<(typeof archivos)[0] | null>(null)

  const filteredArchivos = archivos

  const handleOpenModal = (archivo: (typeof archivos)[0]) => {
    setSelectedArchivo(archivo)
  }

  const handleCloseModal = () => {
    setSelectedArchivo(null)
  }

  const ConfidencialBadge = () => (
    <span
      className="absolute left-1 top-1 z-10 rounded border-2 border-red-600 bg-black/90 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wider text-red-500"
      style={{
        textShadow: "0 0 6px rgba(239, 68, 68, 1), 0 0 12px rgba(239, 68, 68, 0.8)",
        boxShadow: "0 0 8px rgba(239, 68, 68, 0.7), 0 0 16px rgba(239, 68, 68, 0.4)",
      }}
    >
      Confidencial
    </span>
  )

  const ArchivoImage = ({ archivo, className = "" }: { archivo: (typeof archivos)[0]; className?: string }) => (
    <div className={`relative overflow-hidden rounded-md bg-secondary ${className}`}>
      {archivo.image ? (
        <Image
          src={archivo.image || "/placeholder.svg"}
          alt={archivo.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 200px"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-2xl">📄</div>
          </div>
        </div>
      )}
      {/* Confidencial badge */}
      <ConfidencialBadge />
      {/* PDF badge */}
      <span className="absolute right-1 top-1 rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-medium text-primary">
        PDF
      </span>
      {/* Verified/Lock icon */}
      {archivo.verified ? (
        <CheckCircle className="absolute bottom-1 right-1 h-4 w-4 text-primary" />
      ) : (
        <Lock className="absolute bottom-1 right-1 h-4 w-4 text-muted-foreground" />
      )}
    </div>
  )

  return (
    <div className="scrollable-page min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-card/95 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <h1 className="font-mono text-xl font-bold text-primary">La Bóveda</h1>
            <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs text-primary">14 archivos</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="mx-auto max-w-4xl px-4 py-4">
        <Tabs defaultValue="archivos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="feed" className="data-[state=active]:bg-card">
              <List className="mr-2 h-4 w-4" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="archivos" className="data-[state=active]:bg-card">
              <Grid className="mr-2 h-4 w-4" />
              Archivos
            </TabsTrigger>
          </TabsList>

          {/* Feed tab */}
          <TabsContent value="feed" className="mt-4">
            <div className="space-y-4">
              {filteredArchivos.slice(0, 4).map((archivo) => (
                <button
                  type="button"
                  key={archivo.id}
                  onClick={() => handleOpenModal(archivo)}
                  className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-card/80"
                >
                  <ArchivoImage archivo={archivo} className="h-20 w-20 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-sm font-semibold text-foreground">{archivo.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">PDF</p>
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Archivos tab */}
          <TabsContent value="archivos" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {filteredArchivos.map((archivo) => (
                <button
                  type="button"
                  key={archivo.id}
                  onClick={() => handleOpenModal(archivo)}
                  className="flex cursor-pointer flex-col rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-card/80"
                >
                  <ArchivoImage archivo={archivo} className="mb-3 aspect-[3/4] w-full" />
                  <h3 className="line-clamp-2 break-words text-xs font-medium text-foreground">{archivo.title}</h3>
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/95 p-4 backdrop-blur-sm md:left-auto md:right-auto md:w-[430px]">
        <div className="mx-auto max-w-4xl">
          <Button
            onClick={() => router.push("/oferta")}
            className="w-full bg-primary py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Ir a Oferta
          </Button>
        </div>
      </div>

      {/* Modal */}
      {selectedArchivo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6">
            {/* Close button */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-mono text-sm text-primary">Vista previa</h2>
              <Button variant="ghost" size="icon" onClick={handleCloseModal}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Preview - Updated to show image */}
            <ArchivoImage archivo={selectedArchivo} className="mb-6 aspect-[3/4]" />

            {/* Title */}
            <h3 className="mb-4 break-words text-center text-lg font-semibold text-foreground">
              {selectedArchivo.title}
            </h3>

            {/* Actions */}
            <div className="flex justify-center">
              <Button variant="outline" onClick={handleCloseModal} className="min-w-[120px] bg-transparent">
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
