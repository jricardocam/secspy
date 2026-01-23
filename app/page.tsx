import { Quiz } from "@/components/quiz"
import { MobileContainer } from "@/components/mobile-container"

export default function Home() {
  return (
    <MobileContainer immersive>
      <Quiz />
    </MobileContainer>
  )
}
