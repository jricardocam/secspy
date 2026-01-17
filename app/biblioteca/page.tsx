import { Biblioteca } from "@/components/biblioteca"
import { MobileContainer } from "@/components/mobile-container"

export default function BibliotecaPage() {
  return (
    <MobileContainer immersive={false}>
      <Biblioteca />
    </MobileContainer>
  )
}
