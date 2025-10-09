import OpenAI from 'openai'
import { supabase } from '../supabase'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export interface BrandKitData {
  companyName: string
  industry: string
  mission: string
  targetAudience: string
  voiceStyle: string
  adjectives: string[]
  visualStyle: string
  preferredColors: string[]
}

export interface GeneratedBrandKit {
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

export async function createBrandKit(formData: BrandKitData): Promise<GeneratedBrandKit> {
  try {
    // Generate comprehensive brand kit using OpenAI
    const brandKit = await generateComprehensiveBrandKit(formData)
    
    // Save to database
    await saveBrandKitToDatabase(brandKit, formData)
    
    return brandKit
  } catch (error) {
    console.error('Error creating brand kit:', error)
    throw error
  }
}

async function generateComprehensiveBrandKit(formData: BrandKitData): Promise<GeneratedBrandKit> {
  const systemPrompt = `You are Rock Foundation's AI Brand Strategist. You help startup founders create professional, comprehensive brand identities that resonate with their target audience and stand out in their industry.

Your expertise includes:
- Creating compelling taglines that capture brand essence
- Developing brand voice guidelines that connect with target audiences
- Recommending color palettes that convey the right emotions
- Suggesting typography that enhances brand personality
- Writing comprehensive brand guidelines for consistent application

Always provide practical, actionable brand guidance that startups can immediately implement.`

  const userPrompt = `Create a comprehensive brand kit for "${formData.companyName}" with the following details:

COMPANY INFORMATION:
- Industry: ${formData.industry}
- Mission: ${formData.mission}
- Target Audience: ${formData.targetAudience}

BRAND VOICE & PERSONALITY:
- Voice Style: ${formData.voiceStyle}
- Brand Adjectives: ${formData.adjectives.join(', ')}

VISUAL PREFERENCES:
- Visual Style: ${formData.visualStyle}
- Preferred Colors: ${formData.preferredColors.join(', ')}

Please generate a complete brand kit including:

1. TAGLINES (5 variations):
   - Create 5 compelling taglines that capture the brand essence
   - Each should be 3-8 words and memorable
   - Vary the approach (emotional, functional, aspirational, etc.)

2. BRAND VOICE SUMMARY (2-3 paragraphs):
   - Detailed description of how the brand should communicate
   - Tone, personality traits, and communication style
   - Examples of how to write in this voice
   - What to avoid

3. COLOR PALETTE (5 colors with hex codes):
   - Primary: Main brand color
   - Secondary: Supporting color
   - Accent: Highlight color
   - Neutral: Text/background color
   - Background: Light background color
   - Base on preferred colors and visual style

4. TYPOGRAPHY RECOMMENDATIONS (3 font families):
   - Primary: For headlines and important text
   - Secondary: For subheadings and emphasis
   - Body: For paragraphs and body text
   - Include reasoning for each choice

5. BRAND GUIDELINES (comprehensive document):
   - Logo usage rules
   - Color application guidelines
   - Typography hierarchy
   - Voice and tone examples
   - Do's and don'ts
   - Brand personality traits
   - Target audience considerations

Return as JSON with this exact structure:
{
  "taglines": ["tagline1", "tagline2", "tagline3", "tagline4", "tagline5"],
  "brandVoice": "Detailed brand voice description...",
  "colorPalette": {
    "primary": "#hexcode",
    "secondary": "#hexcode", 
    "accent": "#hexcode",
    "neutral": "#hexcode",
    "background": "#hexcode"
  },
  "typography": {
    "primary": "Font Name",
    "secondary": "Font Name",
    "body": "Font Name"
  },
  "brandGuidelines": "Comprehensive brand guidelines document..."
}`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    const parsedResponse = JSON.parse(response)
    
    // Generate logo variations (placeholder URLs for now)
    const logoVariations = await generateLogoVariations(formData)
    
    const brandKit: GeneratedBrandKit = {
      companyName: formData.companyName,
      taglines: parsedResponse.taglines || [],
      brandVoice: parsedResponse.brandVoice || '',
      logoVariations: logoVariations,
      colorPalette: parsedResponse.colorPalette || {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#10B981',
        neutral: '#6B7280',
        background: '#F9FAFB'
      },
      typography: parsedResponse.typography || {
        primary: 'Inter',
        secondary: 'Inter',
        body: 'Inter'
      },
      brandGuidelines: parsedResponse.brandGuidelines || '',
      generatedAt: new Date().toISOString()
    }

    return brandKit
  } catch (error) {
    console.error('Error generating brand kit:', error)
    throw error
  }
}

async function generateLogoVariations(formData: BrandKitData): Promise<string[]> {
  // For now, return placeholder URLs
  // In a real implementation, you would integrate with a logo generation service
  // like Replicate, DALL-E, or a custom logo generation API
  
  const baseUrl = 'https://via.placeholder.com/300x300'
  const colors = formData.preferredColors.slice(0, 3)
  
  return [
    `${baseUrl}/${colors[0]?.replace('#', '')}/FFFFFF?text=${encodeURIComponent(formData.companyName.charAt(0))}`,
    `${baseUrl}/${colors[1]?.replace('#', '')}/FFFFFF?text=${encodeURIComponent(formData.companyName.substring(0, 2))}`,
    `${baseUrl}/${colors[2]?.replace('#', '')}/FFFFFF?text=${encodeURIComponent(formData.companyName.substring(0, 3))}`
  ]
}

async function saveBrandKitToDatabase(brandKit: GeneratedBrandKit, formData: BrandKitData): Promise<void> {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('User not authenticated')
    }

    // Get or create company
    let { data: company } = await supabase
      .from('companies')
      .select('id')
      .eq('user_id', user.id)
      .eq('name', formData.companyName)
      .single()

    if (!company) {
      const { data: newCompany, error: companyError } = await supabase
        .from('companies')
        .insert({
          user_id: user.id,
          name: formData.companyName,
          industry: formData.industry,
          description: formData.mission
        })
        .select('id')
        .single()

      if (companyError) {
        throw companyError
      }
      company = newCompany
    }

    // Save brand kit
    const { error: brandError } = await supabase
      .from('brand_kits')
      .insert({
        company_id: company.id,
        tagline: brandKit.taglines[0] || '',
        tone: formData.voiceStyle,
        logo_url: brandKit.logoVariations[0] || '',
        colors: JSON.stringify(brandKit.colorPalette),
        voice: brandKit.brandVoice,
        style: formData.visualStyle
      })

    if (brandError) {
      throw brandError
    }
  } catch (error) {
    console.error('Error saving brand kit to database:', error)
    throw error
  }
}

export async function regenerateBrandAsset(
  type: 'taglines' | 'logos' | 'colors',
  formData: BrandKitData,
  currentBrandKit: GeneratedBrandKit
): Promise<Partial<GeneratedBrandKit>> {
  try {
    switch (type) {
      case 'taglines':
        return await regenerateTaglines(formData)
      case 'logos':
        return await regenerateLogos(formData)
      case 'colors':
        return await regenerateColors(formData)
      default:
        throw new Error('Invalid asset type')
    }
  } catch (error) {
    console.error(`Error regenerating ${type}:`, error)
    throw error
  }
}

async function regenerateTaglines(formData: BrandKitData): Promise<Partial<GeneratedBrandKit>> {
  const systemPrompt = `You are a brand strategist specializing in creating compelling taglines for startups.`

  const userPrompt = `Generate 5 new tagline variations for "${formData.companyName}":

Company: ${formData.companyName}
Industry: ${formData.industry}
Mission: ${formData.mission}
Target Audience: ${formData.targetAudience}
Voice Style: ${formData.voiceStyle}
Brand Adjectives: ${formData.adjectives.join(', ')}

Create 5 fresh taglines that are:
- 3-8 words each
- Memorable and impactful
- Aligned with the brand voice
- Different approaches (emotional, functional, aspirational, etc.)

Return as JSON: {"taglines": ["tagline1", "tagline2", "tagline3", "tagline4", "tagline5"]}`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.8,
  })

  const response = completion.choices[0]?.message?.content
  return JSON.parse(response || '{}')
}

async function regenerateLogos(formData: BrandKitData): Promise<Partial<GeneratedBrandKit>> {
  // Generate new logo variations
  const logoVariations = await generateLogoVariations(formData)
  return { logoVariations }
}

async function regenerateColors(formData: BrandKitData): Promise<Partial<GeneratedBrandKit>> {
  const systemPrompt = `You are a color theory expert and brand strategist.`

  const userPrompt = `Generate a new color palette for "${formData.companyName}":

Industry: ${formData.industry}
Visual Style: ${formData.visualStyle}
Preferred Colors: ${formData.preferredColors.join(', ')}
Brand Adjectives: ${formData.adjectives.join(', ')}

Create a 5-color palette with hex codes:
- Primary: Main brand color
- Secondary: Supporting color  
- Accent: Highlight color
- Neutral: Text/background color
- Background: Light background color

Return as JSON:
{
  "colorPalette": {
    "primary": "#hexcode",
    "secondary": "#hexcode",
    "accent": "#hexcode", 
    "neutral": "#hexcode",
    "background": "#hexcode"
  }
}`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.6,
  })

  const response = completion.choices[0]?.message?.content
  return JSON.parse(response || '{}')
}
