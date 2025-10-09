import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export default replicate

// Logo Generation
export const generateLogo = async (inputs: {
  company_name: string
  industry: string
  primary_color: string
  secondary_color: string
}) => {
  const prompt = `Generate a clean, geometric, vector-style logo for a startup called "${inputs.company_name}" in the ${inputs.industry} sector.
Style: minimal, professional, futuristic.
Colors: ${inputs.primary_color}, ${inputs.secondary_color}.
Include a stylized symbol that represents strength, intelligence, and growth.`

  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: prompt,
          width: 1024,
          height: 1024,
          num_outputs: 1,
          scheduler: "K_EULER",
          num_inference_steps: 20,
          guidance_scale: 7.5,
          seed: Math.floor(Math.random() * 1000000)
        }
      }
    )

    return output
  } catch (error) {
    console.error('Error generating logo:', error)
    throw error
  }
}

// Campaign Visual Generation
export const generateCampaignVisual = async (inputs: {
  campaign_goal: string
  brand_palette: string
}) => {
  const prompt = `Generate a realistic, brand-aligned social media visual for a campaign about "${inputs.campaign_goal}".
Include modern startup aesthetics, flat lighting, and colors matching ${inputs.brand_palette}.
No text overlay.`

  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: prompt,
          width: 1024,
          height: 1024,
          num_outputs: 1,
          scheduler: "K_EULER",
          num_inference_steps: 20,
          guidance_scale: 7.5,
          seed: Math.floor(Math.random() * 1000000)
        }
      }
    )

    return output
  } catch (error) {
    console.error('Error generating campaign visual:', error)
    throw error
  }
}
