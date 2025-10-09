"use client"

import { motion } from "framer-motion"
import { Palette, Megaphone, TrendingUp, Users } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Brand Studio",
    description: "AI-powered brand identity creation with logo generation, color palettes, and brand voice development.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Megaphone,
    title: "Campaign Engine",
    description: "Create and launch cross-platform marketing campaigns with AI-generated copy and visuals.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: TrendingUp,
    title: "Valuation Engine",
    description: "Get real-time company valuations and investor-readiness scores with AI analysis.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Users,
    title: "Investor Hub",
    description: "Auto-generate pitch decks, one-pagers, and investor materials from your company data.",
    color: "from-orange-500 to-red-500"
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rock-dark mb-6">
            Everything you need to build your startup
          </h2>
          <p className="text-lg text-rock-gray max-w-3xl mx-auto">
            From brand identity to investor presentations, Rock Foundation provides all the tools 
            you need to establish and grow your company foundation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white dark:bg-rock-dark rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-rock-light hover:border-electric-blue/20 h-full">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rock-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-rock-gray leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
