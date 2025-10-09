import { NextRequest, NextResponse } from 'next/server'
import { generateValuationAnalysis } from '@/lib/openai'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      company_id, 
      company_name, 
      industry, 
      annual_revenue, 
      monthly_growth, 
      team_size, 
      funding_raised, 
      user_base, 
      market_size 
    } = body

    // Generate valuation analysis using OpenAI
    const valuationAnalysis = await generateValuationAnalysis({
      company_name,
      industry,
      annual_revenue,
      monthly_growth,
      team_size,
      funding_raised,
      user_base,
      market_size
    })

    // Save to Supabase
    const { data: valuationData, error: valuationError } = await supabase
      .from('valuation_data')
      .upsert({
        company_id,
        financials: {
          annual_revenue,
          funding_raised,
          monthly_growth
        },
        metrics: {
          team_size,
          user_base,
          market_size
        },
        ai_output: valuationAnalysis
      })
      .select()
      .single()

    if (valuationError) {
      throw valuationError
    }

    return NextResponse.json({
      success: true,
      data: {
        valuation: valuationData,
        analysis: valuationAnalysis
      }
    })

  } catch (error) {
    console.error('Error analyzing valuation:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to analyze valuation' },
      { status: 500 }
    )
  }
}
