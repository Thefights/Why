import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background to-secondary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif font-black text-4xl md:text-5xl text-foreground mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="font-sans text-lg max-w-2xl mx-auto leading-relaxed text-black">
            We'd love to hear from you. Visit us, call us, or send us a message - we're here to serve you.
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="font-serif font-bold text-3xl text-foreground mb-8">Visit Our Restaurant</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">Address</h3>
                    <p className="font-sans leading-relaxed text-black">
                      1234 Vietnamese Street
                      <br />
                      Little Saigon District
                      <br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">Phone</h3>
                    <p className="font-sans text-muted-foreground">
                      <a href="tel:+14155551234" className="hover:text-primary transition-colors text-black">
                        (415) 555-1234
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-muted" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">Email</h3>
                    <p className="font-sans text-muted-foreground">
                      <a href="mailto:hello@chaolonggatruyen.com" className="hover:text-primary transition-colors text-black">
                        hello@chaolonggatruyen.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">Hours</h3>
                    <div className="font-sans text-muted-foreground space-y-1">
                      <p className="text-black">Monday - Thursday: 11:00 AM - 9:00 PM</p>
                      
                      
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <Card className="bg-card border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 bg-muted flex items-center justify-center">
                    <img
                      src="/restaurant-map-location.png"
                      alt="Map showing restaurant location in Little Saigon District"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                        <p className="font-sans font-semibold text-foreground">Chao Long Gia Truyền</p>
                        <p className="font-sans text-sm text-muted-foreground">Little Saigon District</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-serif font-bold text-3xl text-foreground mb-8">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif font-bold text-3xl text-foreground mb-6">Planning a Special Event?</h2>
          <p className="font-sans text-lg text-muted-foreground mb-8 leading-relaxed">
            We'd love to cater your next gathering! From intimate family dinners to large corporate events, we bring the
            authentic taste of Vietnam to your special occasions. Contact us to discuss catering options and group
            reservations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+14155551234"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-sans font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call for Catering
            </a>
            <a
              href="mailto:catering@chaolonggatruyen.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-sans font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email for Events
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
