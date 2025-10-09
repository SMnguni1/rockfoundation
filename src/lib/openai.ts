import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default openai

// Brand Builder AI Prompts
export const generateBrandKit = async (inputs: {
  company_name: string
  industry: string
  mission: string
  audience: string
  tone: string
  keywords: string
}) => {
  const systemPrompt = `You are Rock Foundation's AI Brand Strategist. 
You help startup founders create professional and consistent brand identities.`

  const userPrompt = `Generate the following for the startup "${inputs.company_name}" in the ${inputs.industry} sector:

Company Mission: ${inputs.mission}
Target Audience: ${inputs.audience}
Desired Tone: ${inputs.tone}
Keywords: ${inputs.keywords}

Please generate:
1. A 1-sentence tagline
2. A short company description (max 60 words)
3. 3 adjectives that describe the brand voice
4. A short paragraph on the ideal visual style

Output as JSON with keys: tagline, description, voice, style.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content
    return JSON.parse(response || '{}')
  } catch (error) {
    console.error('Error generating brand kit:', error)
    throw error
  }
}

// Campaign Generator AI Prompts
export const generateCampaignCopy = async (inputs: {
  campaign_goal: string
  target_audience: string
  tone: string
  platform: string
  product_name: string
}) => {
  const systemPrompt = `You are an expert marketing strategist for tech startups.`

  const userPrompt = `Generate marketing content for a campaign with the following details:

Campaign Goal: ${inputs.campaign_goal}
Target Audience: ${inputs.target_audience}
Tone: ${inputs.tone}
Platform: ${inputs.platform}
Product Name: ${inputs.product_name}

Please generate:
1. A social media caption (max 280 characters)
2. A supporting ad text (max 60 words)
3. 3 short CTA options
4. Suggested hashtags

Return as JSON: caption, ad_copy, ctas, hashtags.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content
    return JSON.parse(response || '{}')
  } catch (error) {
    console.error('Error generating campaign copy:', error)
    throw error
  }
}

// Valuation Engine AI Prompts
export const generateValuationAnalysis = async (inputs: {
  company_name: string
  industry: string
  annual_revenue: number
  monthly_growth: number
  team_size: number
  funding_raised: number
  user_base: number
  market_size: number
}) => {
  const systemPrompt = `You are a startup valuation analyst.`

  const userPrompt = `Analyze the following startup for valuation:

Company: ${inputs.company_name}
Industry: ${inputs.industry}
Annual Revenue: $${inputs.annual_revenue}
Monthly Growth Rate: ${inputs.monthly_growth}%
Team Size: ${inputs.team_size} people
Funding Raised: $${inputs.funding_raised}
User Base: ${inputs.user_base} users
Market Size: $${inputs.market_size}

Please provide:
1. Estimate current pre-money valuation range
2. Generate a short analysis of key strengths & risks
3. Suggest 2 metrics to improve valuation

Output in JSON: valuation_range, analysis, improvement_tips.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3,
    })

    const response = completion.choices[0]?.message?.content
    return JSON.parse(response || '{}')
  } catch (error) {
    console.error('Error generating valuation analysis:', error)
    throw error
  }
}

// Investor Hub AI Prompts
export const generateInvestorOverview = async (inputs: {
  company_name: string
  valuation: string
  growth_metrics: any
  funding_ask: string
  vision: string
}) => {
  const systemPrompt = `You are a financial copywriter that transforms business metrics into an investor-friendly summary.`

  const userPrompt = `Generate a 1-page investor overview for:

Company: ${inputs.company_name}
Current Valuation: ${inputs.valuation}
Growth Metrics: ${JSON.stringify(inputs.growth_metrics)}
Funding Ask: ${inputs.funding_ask}
Vision: ${inputs.vision}

Please generate:
- Company summary
- Key metrics
- Market opportunity
- Funding ask
- Closing statement

Return as Markdown for PDF export.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.5,
    })

    return completion.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Error generating investor overview:', error)
    throw error
  }
}
