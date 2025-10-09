"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, TechFlow",
    company: "Series A Startup",
    content: "Rock Foundation transformed how we approach branding and marketing. We went from scattered tools to a unified platform that actually understands our startup's needs.",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Marcus Rodriguez",
    role: "CEO, DataVault",
    company: "Seed Stage",
    content: "The AI-powered valuation engine gave us insights we never had before. We secured our Series A with confidence thanks to the investor materials generated here.",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Emily Watson",
    role: "Co-founder, GreenTech",
    company: "Pre-seed",
    content: "From day one, Rock Foundation helped us establish a professional brand identity. The campaign generator alone saved us weeks of work.",
    rating: 5,
    avatar: "EW"
  },
  {
    name: "David Kim",
    role: "Founder, HealthAI",
    company: "Series B",
    content: "The all-in-one approach is exactly what growing startups need. We've consolidated 5 different tools into Rock Foundation and couldn't be happier.",
    rating: 5,
    avatar: "DK"
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rock-dark mb-6">
            Trusted by startup founders
          </h2>
          <p className="text-lg text-rock-gray max-w-3xl mx-auto">
            See what founders are saying about Rock Foundation and how it's helping them build successful companies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-rock-dark rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-rock-light"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <Quote className="h-6 w-6 text-electric-blue/30 mb-4" />
              
              <p className="text-rock-gray mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-rock-dark text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-rock-gray">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-electric-blue">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
