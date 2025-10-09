"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Zap } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for early-stage startups getting started",
    features: [
      "Basic brand kit generation",
      "3 campaign generations per month",
      "Basic analytics dashboard",
      "Community support",
      "Up to 2 team members"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Growth",
    price: "$49",
    period: "per month",
    description: "For growing startups ready to scale",
    features: [
      "Unlimited brand kit generation",
      "Unlimited campaign generation",
      "Advanced analytics & insights",
      "Valuation engine access",
      "Priority support",
      "Up to 10 team members",
      "API access"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For established companies with advanced needs",
    features: [
      "Everything in Growth",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced security features",
      "Unlimited team members",
      "Custom AI model training",
      "White-label options"
    ],
    cta: "Contact Sales",
    popular: false
  }
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-rock-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rock-dark mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-rock-gray max-w-3xl mx-auto">
            Choose the plan that fits your startup's stage. Upgrade or downgrade anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white dark:bg-rock-dark rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border ${
                plan.popular 
                  ? 'border-electric-blue ring-2 ring-electric-blue/20' 
                  : 'border-rock-light'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-electric-blue to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Zap className="h-3 w-3" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-rock-dark mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-rock-dark">
                    {plan.price}
                  </span>
                  <span className="text-rock-gray ml-2">
                    {plan.period}
                  </span>
                </div>
                <p className="text-rock-gray">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-rock-gray">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-electric-blue to-purple-500 hover:from-electric-blue/90 hover:to-purple-500/90' 
                    : ''
                }`}
                variant={plan.popular ? "default" : "outline"}
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-rock-gray mb-4">
            All plans include 14-day free trial. No credit card required.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-rock-gray">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>24/7 support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
