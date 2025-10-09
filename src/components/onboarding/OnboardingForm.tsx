'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  Users, 
  Palette, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Wand2,
  Loader2
} from 'lucide-react'

interface OnboardingFormProps {
  onGenerate: (data: FormData) => Promise<void>
}

interface FormData {
  // Step 1: Company Info
  companyName: string
  industry: string
  mission: string
  
  // Step 2: Audience & Tone
  targetAudience: string
  personas: string[]
  voiceStyle: string
  adjectives: string[]
  
  // Step 3: Visual Preferences
  colorPalette: string[]
  visualStyle: string
  preferredColors: string[]
  
  // Step 4: Review
  reviewComplete: boolean
}

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 
  'SaaS', 'Consulting', 'Manufacturing', 'Retail', 'Real Estate',
  'Media & Entertainment', 'Non-profit', 'Other'
]

const voiceStyles = [
  'Professional & Authoritative',
  'Friendly & Approachable', 
  'Innovative & Cutting-edge',
  'Trustworthy & Reliable',
  'Playful & Creative',
  'Minimalist & Clean',
  'Bold & Confident',
  'Warm & Personal'
]

const visualStyles = [
  'Minimal & Clean',
  'Bold & Vibrant',
  'Playful & Colorful',
  'Professional & Corporate',
  'Modern & Sleek',
  'Creative & Artistic',
  'Classic & Timeless',
  'Tech-forward & Futuristic'
]

const adjectives = [
  'Innovative', 'Trustworthy', 'Reliable', 'Creative', 'Professional',
  'Friendly', 'Bold', 'Elegant', 'Modern', 'Approachable',
  'Confident', 'Warm', 'Dynamic', 'Stable', 'Inspiring'
]

const colorOptions = [
  '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
  '#14B8A6', '#F43F5E', '#8B5A2B', '#1F2937', '#6B7280'
]

export default function OnboardingForm({ onGenerate }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    industry: '',
    mission: '',
    targetAudience: '',
    personas: [],
    voiceStyle: '',
    adjectives: [],
    colorPalette: [],
    visualStyle: '',
    preferredColors: [],
    reviewComplete: false
  })

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const toggleArrayItem = (field: keyof FormData, item: string) => {
    const currentArray = formData[field] as string[]
    const updatedArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item]
    updateFormData({ [field]: updatedArray })
  }

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.companyName && formData.industry && formData.mission)
      case 2:
        return !!(formData.targetAudience && formData.voiceStyle && formData.adjectives.length > 0)
      case 3:
        return !!(formData.visualStyle && formData.preferredColors.length > 0)
      case 4:
        return formData.reviewComplete
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onGenerate(formData)
    } catch (error) {
      console.error('Error generating brand kit:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <Building2 className="w-5 h-5" />
      case 2: return <Users className="w-5 h-5" />
      case 3: return <Palette className="w-5 h-5" />
      case 4: return <CheckCircle className="w-5 h-5" />
      default: return null
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Company Info'
      case 2: return 'Audience & Tone'
      case 3: return 'Visual Preferences'
      case 4: return 'Review & Generate'
      default: return ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                currentStep >= stepNumber 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
              }`}>
                {currentStep > stepNumber ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  getStepIcon(stepNumber)
                )}
              </div>
              {stepNumber < 4 && (
                <div className={`w-20 h-0.5 mx-4 transition-colors ${
                  currentStep > stepNumber ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
          {[1, 2, 3, 4].map((stepNumber) => (
            <span key={stepNumber} className="text-center">
              {getStepTitle(stepNumber)}
            </span>
          ))}
        </div>
      </div>

      {/* Step 1: Company Info */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Tell us about your company
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Help us understand your business to create the perfect brand identity
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => updateFormData({ companyName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Industry *
              </label>
              <select
                value={formData.industry}
                onChange={(e) => updateFormData({ industry: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select your industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mission Statement *
              </label>
              <textarea
                value={formData.mission}
                onChange={(e) => updateFormData({ mission: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Describe your company's mission and purpose..."
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={nextStep}
              disabled={!isStepValid(1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Audience & Tone */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Define your audience and voice
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Help us understand who you're talking to and how you want to sound
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Audience *
              </label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => updateFormData({ targetAudience: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Describe your ideal customers, their demographics, needs, and pain points..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand Voice Style *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {voiceStyles.map(style => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => updateFormData({ voiceStyle: style })}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      formData.voiceStyle === style
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand Adjectives * (Select 3-5)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {adjectives.map(adjective => (
                  <button
                    key={adjective}
                    type="button"
                    onClick={() => toggleArrayItem('adjectives', adjective)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      formData.adjectives.includes(adjective)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    {adjective}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              onClick={prevStep}
              variant="outline"
              className="px-8 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={nextStep}
              disabled={!isStepValid(2)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Visual Preferences */}
      {currentStep === 3 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Choose your visual style
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select colors and style preferences for your brand
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Visual Style *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {visualStyles.map(style => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => updateFormData({ visualStyle: style })}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      formData.visualStyle === style
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Colors * (Select 3-5)
              </label>
              <div className="grid grid-cols-5 gap-3">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => toggleArrayItem('preferredColors', color)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all ${
                      formData.preferredColors.includes(color)
                        ? 'border-blue-500 scale-110 shadow-lg'
                        : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Selected: {formData.preferredColors.length} colors
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              onClick={prevStep}
              variant="outline"
              className="px-8 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={nextStep}
              disabled={!isStepValid(3)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Generate */}
      {currentStep === 4 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Review your brand preferences
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Everything looks good? Let's generate your brand kit!
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Company Info Summary */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Company Information</h3>
              <p><strong>Name:</strong> {formData.companyName}</p>
              <p><strong>Industry:</strong> {formData.industry}</p>
              <p><strong>Mission:</strong> {formData.mission}</p>
            </div>

            {/* Audience & Tone Summary */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Audience & Voice</h3>
              <p><strong>Target Audience:</strong> {formData.targetAudience}</p>
              <p><strong>Voice Style:</strong> {formData.voiceStyle}</p>
              <p><strong>Adjectives:</strong> {formData.adjectives.join(', ')}</p>
            </div>

            {/* Visual Preferences Summary */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Visual Style</h3>
              <p><strong>Style:</strong> {formData.visualStyle}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Colors:</span>
                {formData.preferredColors.map(color => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* AI Summary Preview */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">AI Brand Summary</h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Our AI will analyze your preferences and generate:
              </p>
              <ul className="text-blue-800 dark:text-blue-200 text-sm mt-2 space-y-1">
                <li>• 3-5 compelling tagline suggestions</li>
                <li>• Brand voice guidelines and tone description</li>
                <li>• 3 logo variations with different styles</li>
                <li>• Complete color palette with hex codes</li>
                <li>• Typography recommendations</li>
                <li>• Brand usage guidelines</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              onClick={prevStep}
              variant="outline"
              className="px-8 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Brand Kit...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Brand Kit
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
