import { NextRequest, NextResponse } from 'next/server'
import { generateBrandKit } from '@/lib/openai'
import { generateLogo } from '@/lib/replicate'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company_name, industry, mission, audience, tone, keywords, primary_color, secondary_color } = body

    // Generate brand kit using OpenAI
    const brandKit = await generateBrandKit({
      company_name,
      industry,
      mission,
      audience,
      tone,
      keywords
    })

    // Generate logo using Replicate
    const logoOutput = await generateLogo({
      company_name,
      industry,
      primary_color,
      secondary_color
    })

    // Save to Supabase
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert({
        name: company_name,
        industry,
        description: brandKit.description
      })
      .select()
      .single()

    if (companyError) {
      throw companyError
    }

    const { data: brandKitData, error: brandKitError } = await supabase
      .from('brand_kits')
      .insert({
        company_id: company.id,
        tagline: brandKit.tagline,
        tone,
        logo_url: Array.isArray(logoOutput) ? logoOutput[0] : logoOutput,
        colors: JSON.stringify([primary_color, secondary_color]),
        voice: brandKit.voice,
        style: brandKit.style
      })
      .select()
      .single()

    if (brandKitError) {
      throw brandKitError
    }

    return NextResponse.json({
      success: true,
      data: {
        company,
        brandKit: brandKitData,
        generated: {
          tagline: brandKit.tagline,
          description: brandKit.description,
          voice: brandKit.voice,
          style: brandKit.style,
          logo_url: Array.isArray(logoOutput) ? logoOutput[0] : logoOutput
        }
      }
    })

  } catch (error) {
    console.error('Error generating brand kit:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate brand kit' },
      { status: 500 }
    )
  }
}
