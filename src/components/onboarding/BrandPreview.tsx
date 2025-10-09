'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Download, 
  Save, 
  RefreshCw, 
  Edit3, 
  Eye,
  Palette,
  Type,
  Image,
  FileText,
  CheckCircle,
  Loader2
} from 'lucide-react'

interface BrandKit {
  id?: string
  companyName: string
  taglines: string[]
  brandVoice: string
  logoVariations: string[]
  colorPalette: {
    primary: string
    secondary: string
    accent: string
    neutral: string
    background: string
  }
  typography: {
    primary: string
    secondary: string
    body: string
  }
  brandGuidelines: string
  generatedAt: string
}

interface BrandPreviewProps {
  brandKit?: BrandKit | null
  onSave?: (brandKit: BrandKit) => Promise<void>
  onDownload?: (brandKit: BrandKit) => Promise<void>
  onRegenerate?: (type: 'taglines' | 'logos' | 'colors') => Promise<void>
}

export default function BrandPreview({ 
  brandKit, 
  onSave, 
  onDownload, 
  onRegenerate 
}: BrandPreviewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'logos' | 'colors' | 'typography' | 'guidelines'>('overview')
  const [loading, setLoading] = useState(false)
  const [selectedTagline, setSelectedTagline] = useState(0)
  const [selectedLogo, setSelectedLogo] = useState(0)

  if (!brandKit) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Your Brand Kit Preview
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Complete the onboarding wizard to see your generated brand kit here
          </p>
        </div>
      </div>
    )
  }

  const handleSave = async () => {
    if (onSave) {
      setLoading(true)
      try {
        await onSave(brandKit)
      } catch (error) {
        console.error('Error saving brand kit:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDownload = async () => {
    if (onDownload) {
      setLoading(true)
      try {
        await onDownload(brandKit)
      } catch (error) {
        console.error('Error downloading brand kit:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleRegenerate = async (type: 'taglines' | 'logos' | 'colors') => {
    if (onRegenerate) {
      setLoading(true)
      try {
        await onRegenerate(type)
      } catch (error) {
        console.error('Error regenerating:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'logos', label: 'Logos', icon: Image },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'guidelines', label: 'Guidelines', icon: FileText }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {brandKit.companyName} Brand Kit
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Generated on {new Date(brandKit.generatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleSave}
                disabled={loading}
                variant="outline"
                className="flex items-center"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Brand
              </Button>
              <Button
                onClick={handleDownload}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Download Kit
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Taglines */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Tagline Suggestions
                  </h3>
                  <Button
                    onClick={() => handleRegenerate('taglines')}
                    variant="ghost"
                    size="sm"
                    disabled={loading}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Regenerate
                  </Button>
                </div>
                <div className="space-y-3">
                  {brandKit.taglines.map((tagline, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedTagline === index
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedTagline(index)}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          {tagline}
                        </p>
                        {selectedTagline === index && (
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand Voice */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Brand Voice Summary
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    {brandKit.brandVoice}
                  </p>
                </div>
              </div>

              {/* Quick Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Logo Preview
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex items-center justify-center">
                    {brandKit.logoVariations[selectedLogo] ? (
                      <img
                        src={brandKit.logoVariations[selectedLogo]}
                        alt="Brand logo"
                        className="max-w-full max-h-32 object-contain"
                      />
                    ) : (
                      <div className="text-gray-500 dark:text-gray-400">
                        Logo will appear here
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Color Palette
                  </h3>
                  <div className="flex space-x-2">
                    {Object.values(brandKit.colorPalette).map((color, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Logos Tab */}
          {activeTab === 'logos' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Logo Variations
                </h3>
                <Button
                  onClick={() => handleRegenerate('logos')}
                  variant="ghost"
                  size="sm"
                  disabled={loading}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Regenerate All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {brandKit.logoVariations.map((logo, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border cursor-pointer transition-colors ${
                      selectedLogo === index
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedLogo(index)}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center mb-3">
                      {logo ? (
                        <img
                          src={logo}
                          alt={`Logo variation ${index + 1}`}
                          className="max-w-full max-h-24 object-contain"
                        />
                      ) : (
                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                          Logo {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Variation {index + 1}
                      </span>
                      {selectedLogo === index && (
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Color Palette
                </h3>
                <Button
                  onClick={() => handleRegenerate('colors')}
                  variant="ghost"
                  size="sm"
                  disabled={loading}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Regenerate
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(brandKit.colorPalette).map(([name, color]) => (
                  <div key={name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div
                      className="w-full h-20 rounded-lg mb-3 border border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: color }}
                    />
                    <h4 className="font-medium text-gray-900 dark:text-white capitalize mb-1">
                      {name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {color}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Typography Tab */}
          {activeTab === 'typography' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Typography Recommendations
              </h3>
              <div className="space-y-6">
                {Object.entries(brandKit.typography).map(([type, font]) => (
                  <div key={type} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white capitalize mb-2">
                      {type} Font
                    </h4>
                    <p className="text-lg" style={{ fontFamily: font }}>
                      {font}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Recommended for {type === 'primary' ? 'headings and titles' : 
                                      type === 'secondary' ? 'subheadings and emphasis' : 
                                      'body text and paragraphs'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guidelines Tab */}
          {activeTab === 'guidelines' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Brand Guidelines
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                    {brandKit.brandGuidelines}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
