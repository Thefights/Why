import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background to-secondary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif font-black text-4xl md:text-5xl text-foreground mb-4">
            Our <span className="text-primary">Story</span>
          </h1>
          <p className="font-sans text-lg max-w-2xl mx-auto leading-relaxed text-black">
            Three generations of tradition, love, and authentic Vietnamese flavors brought to your table.
          </p>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-6">
                A Family Legacy Since 1952
              </h2>
              <div className="space-y-4 font-sans text-muted-foreground leading-relaxed">
                <p className="text-black">
                  Our story begins in the bustling streets of Hanoi, where our grandmother, Bà Liên, first started
                  serving her famous porridge from a small street cart. Her secret recipes, passed down through
                  generations, captured the hearts and taste buds of locals who would line up every morning for a bowl
                  of comfort.
                </p>
                <p className="text-black">
                  In 1985, our family immigrated to America, carrying with us not just our belongings, but the precious
                  recipes and traditions that defined our heritage. What started as a way to preserve our culture became
                  a mission to share the warmth and comfort of Vietnamese home cooking with our new community.
                </p>
                <p className="text-black">
                  Today, Chao Long Gia Truyền continues this legacy. Every bowl we serve is prepared with the same love,
                  attention to detail, and authentic ingredients that our grandmother used over 70 years ago. We believe
                  that food is more than sustenance—it's a bridge between cultures, a way to bring families together,
                  and a celebration of our shared humanity.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/family-restaurant-story.png"
                alt="Family cooking together in traditional Vietnamese kitchen"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">Our Commitment</h2>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              Every dish we serve reflects our unwavering dedication to quality, authenticity, and tradition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-background border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary">🥄</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-foreground mb-3">Authentic Recipes</h3>
                <p className="font-sans leading-relaxed text-black">
                  Every recipe is unchanged from our grandmother's original formulations, ensuring authentic Vietnamese
                  flavors in every bite.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-background border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-accent">🌿</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-foreground mb-3">Fresh Ingredients</h3>
                <p className="font-sans leading-relaxed text-black">
                  We source the finest, freshest ingredients daily, including herbs and spices imported directly from
                  Vietnam.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-background border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-muted">❤️</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-foreground mb-3">Family Values</h3>
                <p className="font-sans leading-relaxed text-black">
                  We treat every customer like family, creating a warm, welcoming atmosphere where everyone feels at
                  home.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">Meet Our Family</h2>
            <p className="font-sans text-lg max-w-2xl mx-auto text-black">
              The heart and soul behind every dish, our family works together to bring you authentic Vietnamese cuisine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center bg-card border-border">
              <CardContent className="p-6">
                <img
                  src="/chef-grandmother.png"
                  alt="Bà Liên - Head Chef and Founder"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-serif font-bold text-xl text-foreground mb-2">Bà Liên</h3>
                <p className="font-sans text-primary font-medium mb-3">Head Chef & Founder</p>
                <p className="font-sans text-sm leading-relaxed text-black">
                  The matriarch of our family and keeper of our traditional recipes. At 89, she still oversees every pot
                  of broth to ensure perfection.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border">
              <CardContent className="p-6">
                <img
                  src="/chef-son.png"
                  alt="Minh Nguyen - Executive Chef"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-serif font-bold text-xl text-foreground mb-2">Minh Nguyen</h3>
                <p className="font-sans text-primary font-medium mb-3">Executive Chef</p>
                <p className="font-sans text-sm leading-relaxed text-black">
                  Bà Liên's son, who learned the art of Vietnamese cooking at his mother's side and now leads our
                  kitchen with passion and precision.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border">
              <CardContent className="p-6">
                <img
                  src="/chef-daughter.png"
                  alt="Lan Nguyen - Restaurant Manager"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-serif font-bold text-xl text-foreground mb-2">Lan Nguyen</h3>
                <p className="font-sans text-primary font-medium mb-3">Restaurant Manager</p>
                <p className="font-sans text-sm leading-relaxed text-black">
                  The third generation, Lan ensures every guest feels welcomed and that our family traditions continue
                  to thrive in the modern world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Restaurant Photos Section */}
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">Our Restaurant</h2>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              Step into our warm, inviting space where tradition meets comfort in every corner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="/restaurant-interior.png"
                alt="Cozy restaurant interior with traditional Vietnamese decor"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="/kitchen-cooking.png"
                alt="Chefs preparing traditional Vietnamese porridge in the kitchen"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="/dining-atmosphere.png"
                alt="Families enjoying meals together in warm dining atmosphere"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
