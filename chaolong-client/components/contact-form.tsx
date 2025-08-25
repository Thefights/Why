"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission to hello@chaolonggatruyen.com
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <Card className="bg-accent/10 border-accent">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-accent-foreground">✓</span>
          </div>
          <h3 className="font-serif font-bold text-xl text-foreground mb-2">Message Sent!</h3>
          <p className="font-sans text-muted-foreground">
            Thank you for contacting Chao Long Gia Truyền. We'll get back to you within 24 hours.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-sans font-medium text-foreground">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="bg-input border-border focus:ring-ring font-sans"
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans font-medium text-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="bg-input border-border focus:ring-ring font-sans"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-sans font-medium text-foreground">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-input border-border focus:ring-ring font-sans"
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="font-sans font-medium text-foreground">
                Subject *
              </Label>
              <Select onValueChange={handleSelectChange} required>
                <SelectTrigger className="bg-input border-border focus:ring-ring font-sans">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="reservation">Table Reservation</SelectItem>
                  <SelectItem value="catering">Catering Services</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="font-sans font-medium text-foreground">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleInputChange}
              className="bg-input border-border focus:ring-ring font-sans min-h-32"
              placeholder="Tell us how we can help you with our traditional Vietnamese congee..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-lg py-3"
          >
            {isSubmitting ? "Sending Message..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
