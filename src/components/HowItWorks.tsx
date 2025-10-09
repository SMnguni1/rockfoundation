"use client"

import { motion } from "framer-motion"
import { UserPlus, Zap, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up & Onboard",
    description: "Create your account and complete our AI-powered onboarding to define your startup's identity and goals.",
    color: "from-blue-500 to-purple-500"
  },
  {
    number: "02", 
    icon: Zap,
    title: "Generate & Create",
    description: "Use our AI tools to generate your brand kit, marketing campaigns, and business materials automatically.",
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    icon: Rocket,
    title: "Scale & Grow",
    description: "Launch campaigns, track performance, get valuations, and prepare investor materials as you grow.",
    color: "from-pink-500 to-red-500"
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-rock-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rock-dark mb-6">
            How it works
          </h2>
          <p className="text-lg text-rock-gray max-w-3xl mx-auto">
            Get started in minutes and have your complete startup foundation ready in hours, not months.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-electric-blue/30 to-transparent z-0" />
              )}
              
              <div className="relative z-10 text-center">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-semibold text-electric-blue tracking-wider uppercase">
                    Step {step.number}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-rock-dark mb-4">
                  {step.title}
                </h3>
                
                <p className="text-rock-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
