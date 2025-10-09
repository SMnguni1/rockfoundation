import { NextRequest, NextResponse } from 'next/server'
import { generateInvestorOverview } from '@/lib/openai'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company_id, funding_ask, vision } = body

    // Get company and valuation data
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('id', company_id)
      .single()

    if (companyError) {
      throw companyError
    }

    const { data: valuationData, error: valuationError } = await supabase
      .from('valuation_data')
      .select('*')
      .eq('company_id', company_id)
      .single()

    if (valuationError) {
      throw valuationError
    }

    // Generate investor overview using OpenAI
    const investorOverview = await generateInvestorOverview({
      company_name: company.name,
      valuation: valuationData.ai_output?.valuation_range || 'TBD',
      growth_metrics: valuationData.metrics,
      funding_ask,
      vision
    })

    return NextResponse.json({
      success: true,
      data: {
        overview: investorOverview,
        company,
        valuation: valuationData
      }
    })

  } catch (error) {
    console.error('Error generating investor overview:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate investor overview' },
      { status: 500 }
    )
  }
}
