import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/vietnamese-porridge.png"
          alt="Traditional Vietnamese porridge"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-background/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4 sm:mb-6 leading-tight">
          Discover the Comfort of <span className="text-primary">Tradition</span>
        </h1>

        <p className="font-sans text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-foreground px-2 sm:px-0">
          Experience authentic Vietnamese porridge crafted with love and recipes passed down through generations. Every
          bowl tells a story of family, tradition, and the warmth of home.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-base sm:text-lg px-6 sm:px-8 py-3 min-h-[48px]"
          >
            <Link href="/menu">View Our Menu</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans text-base sm:text-lg px-6 sm:px-8 py-3 bg-transparent min-h-[48px]"
          >
            <Link href="/contact">Order Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
