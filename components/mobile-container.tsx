"use client"

import type React from "react"

interface MobileContainerProps {
  children: React.ReactNode
  immersive?: boolean // true = no scroll (video, whatsapp, etc.), false = scroll allowed (oferta, biblioteca)
}

export function MobileContainer({ children, immersive = true }: MobileContainerProps) {
  if (immersive) {
    return (
      <>
        {/* Fondo negro en desktop */}
        <div className="fixed inset-0 bg-black -z-10 hidden md:block" />
        {/* Contenedor principal fixed para evitar cualquier scroll */}
        <div className="fixed inset-0 overflow-hidden md:flex md:items-center md:justify-center">
          <div className="w-full h-[100dvh] bg-background overflow-hidden md:w-[430px] md:h-[calc(430px*16/9)] md:max-h-[90vh] md:rounded-[40px] md:border md:border-border/30 md:shadow-2xl">
            {children}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen w-full bg-background md:bg-black md:flex md:justify-center">
      <div className="w-full bg-background md:w-[430px] md:shadow-2xl scrollable-page">{children}</div>
    </div>
  )
}
