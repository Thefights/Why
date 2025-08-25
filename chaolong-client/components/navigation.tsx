"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-foreground leading-10">Chao Long Co Tham </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-sans">
              Home
            </Link>
            <Link href="/menu" className="text-foreground hover:text-primary transition-colors font-sans">
              Menu
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-sans">
              About Us
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-sans">
              Contact
            </Link>
            <Link href="/profile" className="text-foreground hover:text-primary transition-colors font-sans">
              Profile
            </Link>
            <Link href="/orders" className="text-foreground hover:text-primary transition-colors font-sans">
              Orders
            </Link>
            <Link href="/vouchers" className="text-foreground hover:text-primary transition-colors font-sans">
              Vouchers
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans bg-transparent"
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans">Order Now</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-sans"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-sans"
                onClick={() => setIsOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-sans"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-sans"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/profile"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-sans"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/orders"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-sans"
                onClick={() => setIsOpen(false)}
              >
                Orders
              </Link>
              <Link
                href="/vouchers"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-sans"
                onClick={() => setIsOpen(false)}
              >
                Vouchers
              </Link>
              <div className="px-3 py-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans mb-2 bg-transparent"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans">
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
