import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ReviewsCarousel } from "@/components/reviews-carousel"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ReviewsCarousel />
    </main>
  )
}
