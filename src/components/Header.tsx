"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Rock Foundation"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-rock-dark">Rock Foundation</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-sm font-medium text-rock-gray hover:text-electric-blue transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-rock-gray hover:text-electric-blue transition-colors">
            How it Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-rock-gray hover:text-electric-blue transition-colors">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-rock-gray hover:text-electric-blue transition-colors">
            Testimonials
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm">
            Start Free
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="#features" 
                className="text-sm font-medium text-rock-gray hover:text-electric-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-sm font-medium text-rock-gray hover:text-electric-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link 
                href="#pricing" 
                className="text-sm font-medium text-rock-gray hover:text-electric-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="#testimonials" 
                className="text-sm font-medium text-rock-gray hover:text-electric-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
            </nav>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="ghost" size="sm" className="justify-start">
                Sign In
              </Button>
              <Button size="sm" className="justify-start">
                Start Free
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
