'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  X, 
  Download, 
  Save, 
  Share2, 
  Copy,
  CheckCircle,
  Loader2,
  Eye,
  Edit3
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

interface AIOutputModalProps {
  isOpen: boolean
  onClose: () => void
  brandKit: BrandKit | null
  onSave?: (brandKit: BrandKit) => Promise<void>
  onDownload?: (brandKit: BrandKit) => Promise<void>
  onShare?: (brandKit: BrandKit) => Promise<void>
}

export default function AIOutputModal({ 
  isOpen, 
  onClose, 
  brandKit, 
  onSave, 
  onDownload, 
  onShare 
}: AIOutputModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'guidelines'>('overview')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  if (!isOpen || !brandKit) return null

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

  const handleShare = async () => {
    if (onShare) {
      setLoading(true)
      try {
        await onShare(brandKit)
      } catch (error) {
        console.error('Error sharing brand kit:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'details', label: 'Details', icon: Edit3 },
    { id: 'guidelines', label: 'Guidelines', icon: CheckCircle }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              🎉 Your Brand Kit is Ready!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {brandKit.companyName} • Generated {new Date(brandKit.generatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleSave}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save
            </Button>
            <Button
              onClick={handleDownload}
              disabled={loading}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Download
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
            >
              <X className="w-4 h-4" />
            </Button>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Taglines */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Tagline Suggestions
                </h3>
                <div className="space-y-3">
                  {brandKit.taglines.map((tagline, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          {tagline}
                        </p>
                        <Button
                          onClick={() => copyToClipboard(tagline, `tagline-${index}`)}
                          variant="ghost"
                          size="sm"
                        >
                          {copied === `tagline-${index}` ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
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
                    {brandKit.logoVariations[0] ? (
                      <img
                        src={brandKit.logoVariations[0]}
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
                    {Object.entries(brandKit.colorPalette).map(([name, color]) => (
                      <div key={name} className="text-center">
                        <div
                          className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600 mb-2"
                          style={{ backgroundColor: color }}
                        />
                        <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                          {name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                          {color}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Logo Variations */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Logo Variations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {brandKit.logoVariations.map((logo, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center mb-3">
                        {logo ? (
                          <img
                            src={logo}
                            alt={`Logo variation ${index + 1}`}
                            className="max-w-full max-h-20 object-contain"
                          />
                        ) : (
                          <div className="text-gray-500 dark:text-gray-400 text-sm">
                            Logo {index + 1}
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white text-center">
                        Variation {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Typography Recommendations
                </h3>
                <div className="space-y-4">
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
            </div>
          )}

          {/* Guidelines Tab */}
          {activeTab === 'guidelines' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
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

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Your brand kit is ready to use! Save it to your dashboard or download for offline use.
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleShare}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={handleDownload}
                disabled={loading}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
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
      </div>
    </div>
  )
}
