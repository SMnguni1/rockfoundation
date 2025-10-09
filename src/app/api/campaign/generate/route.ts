import { NextRequest, NextResponse } from 'next/server'
import { generateCampaignCopy } from '@/lib/openai'
import { generateCampaignVisual } from '@/lib/replicate'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company_id, campaign_goal, target_audience, tone, platform, product_name, brand_palette } = body

    // Generate campaign copy using OpenAI
    const campaignCopy = await generateCampaignCopy({
      campaign_goal,
      target_audience,
      tone,
      platform,
      product_name
    })

    // Generate campaign visual using Replicate
    const visualOutput = await generateCampaignVisual({
      campaign_goal,
      brand_palette
    })

    // Save to Supabase
    const { data: campaign, error: campaignError } = await supabase
      .from('campaigns')
      .insert({
        company_id,
        goal: campaign_goal,
        platform,
        caption: campaignCopy.caption,
        image_url: Array.isArray(visualOutput) ? visualOutput[0] : visualOutput,
        analytics: {
          reach: 0,
          engagement: 0,
          clicks: 0,
          conversions: 0
        }
      })
      .select()
      .single()

    if (campaignError) {
      throw campaignError
    }

    return NextResponse.json({
      success: true,
      data: {
        campaign,
        generated: {
          caption: campaignCopy.caption,
          ad_copy: campaignCopy.ad_copy,
          ctas: campaignCopy.ctas,
          hashtags: campaignCopy.hashtags,
          image_url: Array.isArray(visualOutput) ? visualOutput[0] : visualOutput
        }
      }
    })

  } catch (error) {
    console.error('Error generating campaign:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate campaign' },
      { status: 500 }
    )
  }
}
