"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rock-light to-background py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-rock-dark leading-tight"
              >
                Rock Foundation
                <span className="block text-electric-blue">Your startup copilot</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-rock-gray max-w-2xl"
              >
                The all-in-one SaaS platform for startup founders to build, grow, and scale their companies. 
                Branding, marketing, valuation, and AI-powered insights in one place.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-6 text-sm text-rock-gray"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>14-day free trial</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-electric-blue/10 to-rock-gray/10 rounded-2xl p-8 lg:p-12">
              {/* Mock Dashboard Preview */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-rock-dark rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-rock-gray/20 rounded w-3/4"></div>
                    <div className="h-2 bg-rock-gray/20 rounded w-1/2"></div>
                    <div className="h-2 bg-electric-blue/30 rounded w-2/3"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-rock-dark rounded-lg p-4 shadow-lg">
                    <div className="h-16 bg-gradient-to-br from-electric-blue/20 to-electric-blue/40 rounded mb-2"></div>
                    <div className="h-2 bg-rock-gray/20 rounded w-3/4"></div>
                  </div>
                  <div className="bg-white dark:bg-rock-dark rounded-lg p-4 shadow-lg">
                    <div className="h-16 bg-gradient-to-br from-green-500/20 to-green-500/40 rounded mb-2"></div>
                    <div className="h-2 bg-rock-gray/20 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
