'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Palette, 
  Wand2, 
  Download, 
  Edit3, 
  RefreshCw,
  CheckCircle,
  Loader2
} from 'lucide-react'

interface BrandKit {
  tagline: string
  description: string
  voice: string
  style: string
  logo_url: string
  colors: string[]
}

export default function BrandBuilder() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [brandKit, setBrandKit] = useState<BrandKit | null>(null)
  const [formData, setFormData] = useState({
    company_name: '',
    industry: '',
    mission: '',
    audience: '',
    tone: 'professional',
    keywords: '',
    primary_color: '#3B82F6',
    secondary_color: '#8B5CF6'
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateBrandKit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/brand/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      
      if (result.success) {
        setBrandKit(result.data.generated)
        setStep(3)
      } else {
        console.error('Error generating brand kit:', result.error)
      }
    } catch (error) {
      console.error('Error generating brand kit:', error)
    } finally {
      setLoading(false)
    }
  }

  const regenerateAsset = async (type: 'logo' | 'copy') => {
    setLoading(true)
    try {
      // Implement regeneration logic here
      console.log(`Regenerating ${type}`)
    } catch (error) {
      console.error(`Error regenerating ${type}:`, error)
    } finally {
      setLoading(false)
    }
  }

  const downloadBrandKit = () => {
    // Implement download logic here
    console.log('Downloading brand kit')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= stepNumber 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
              }`}>
                {step > stepNumber ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              {stepNumber < 3 && (
                <div className={`w-24 h-0.5 mx-4 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Company Info</span>
          <span>Generate</span>
          <span>Review & Edit</span>
        </div>
      </div>

      {/* Step 1: Company Information */}
      {step === 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Tell us about your company
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
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
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="ecommerce">E-commerce</option>
                <option value="saas">SaaS</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mission Statement *
              </label>
              <textarea
                value={formData.mission}
                onChange={(e) => handleInputChange('mission', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Describe your company's mission and purpose"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Audience *
              </label>
              <input
                type="text"
                value={formData.audience}
                onChange={(e) => handleInputChange('audience', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Who is your target audience?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand Tone
              </label>
              <select
                value={formData.tone}
                onChange={(e) => handleInputChange('tone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="innovative">Innovative</option>
                <option value="authoritative">Authoritative</option>
                <option value="playful">Playful</option>
                <option value="minimalist">Minimalist</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Keywords
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="e.g., innovation, trust, growth"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.primary_color}
                  onChange={(e) => handleInputChange('primary_color', e.target.value)}
                  className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primary_color}
                  onChange={(e) => handleInputChange('primary_color', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.secondary_color}
                  onChange={(e) => handleInputChange('secondary_color', e.target.value)}
                  className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.secondary_color}
                  onChange={(e) => handleInputChange('secondary_color', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={() => setStep(2)}
              disabled={!formData.company_name || !formData.industry || !formData.mission || !formData.audience}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Generation */}
      {step === 2 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wand2 className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Ready to generate your brand kit?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our AI will create a professional tagline, description, logo, and brand guidelines for {formData.company_name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Palette className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">Brand Identity</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tagline, voice, and style</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Wand2 className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">AI Logo</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Professional geometric design</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => setStep(1)}
              variant="outline"
              className="px-8 py-3"
            >
              Back
            </Button>
            <Button
              onClick={generateBrandKit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
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

      {/* Step 3: Results */}
      {step === 3 && brandKit && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Your Brand Kit
              </h2>
              <Button
                onClick={downloadBrandKit}
                variant="outline"
                className="flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Logo */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Logo</h3>
                  <Button
                    onClick={() => regenerateAsset('logo')}
                    variant="ghost"
                    size="sm"
                    disabled={loading}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Regenerate
                  </Button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 flex items-center justify-center">
                  {brandKit.logo_url ? (
                    <img
                      src={brandKit.logo_url}
                      alt="Generated logo"
                      className="max-w-full max-h-48 object-contain"
                    />
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400">Logo will appear here</div>
                  )}
                </div>
              </div>

              {/* Brand Copy */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tagline</h3>
                    <Button
                      onClick={() => regenerateAsset('copy')}
                      variant="ghost"
                      size="sm"
                      disabled={loading}
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {brandKit.tagline}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {brandKit.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Brand Voice
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {brandKit.voice}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Visual Style
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {brandKit.style}
                  </p>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Color Palette
              </h3>
              <div className="flex space-x-4">
                {brandKit.colors.map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-16 h-16 rounded-lg border border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {color}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => setStep(1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Create New Brand Kit
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
