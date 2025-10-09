import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on our schema
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'founder' | 'admin' | 'team' | 'investor'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'founder' | 'admin' | 'team' | 'investor'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'founder' | 'admin' | 'team' | 'investor'
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          user_id: string
          name: string
          industry: string
          description: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          industry: string
          description: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          industry?: string
          description?: string
          created_at?: string
          updated_at?: string
        }
      }
      brand_kits: {
        Row: {
          id: string
          company_id: string
          tagline: string
          tone: string
          logo_url: string
          colors: string
          voice: string
          style: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          tagline: string
          tone: string
          logo_url: string
          colors: string
          voice: string
          style: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          tagline?: string
          tone?: string
          logo_url?: string
          colors?: string
          voice?: string
          style?: string
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          company_id: string
          goal: string
          platform: string
          caption: string
          image_url: string
          analytics: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          goal: string
          platform: string
          caption: string
          image_url: string
          analytics?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          goal?: string
          platform?: string
          caption?: string
          image_url?: string
          analytics?: any
          created_at?: string
          updated_at?: string
        }
      }
      valuation_data: {
        Row: {
          id: string
          company_id: string
          financials: any
          metrics: any
          ai_output: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          financials: any
          metrics: any
          ai_output?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          financials?: any
          metrics?: any
          ai_output?: any
          created_at?: string
          updated_at?: string
        }
      }
      vault_files: {
        Row: {
          id: string
          company_id: string
          name: string
          category: string
          file_url: string
          encryption_key: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          category: string
          file_url: string
          encryption_key: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          category?: string
          file_url?: string
          encryption_key?: string
          created_at?: string
          updated_at?: string
        }
      }
      integrations: {
        Row: {
          id: string
          company_id: string
          platform: string
          api_key: string
          connected: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          platform: string
          api_key: string
          connected?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          platform?: string
          api_key?: string
          connected?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          company_id: string
          stripe_plan: string
          usage: any
          billing_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          stripe_plan: string
          usage?: any
          billing_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          stripe_plan?: string
          usage?: any
          billing_status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
