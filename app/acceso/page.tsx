import { AccesoCondicional } from "@/components/acceso-condicional"
import { MobileContainer } from "@/components/mobile-container"

export default function AccesoPage() {
  return (
    <MobileContainer immersive>
      <AccesoCondicional />
    </MobileContainer>
  )
}
