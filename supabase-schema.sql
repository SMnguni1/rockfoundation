-- Rock Foundation Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('founder', 'admin', 'team', 'investor');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'founder',
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE public.companies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    industry TEXT,
    description TEXT,
    website TEXT,
    founded_year INTEGER,
    employee_count INTEGER,
    revenue_range TEXT,
    funding_stage TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brand kits table
CREATE TABLE public.brand_kits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
    tagline TEXT,
    tone TEXT,
    logo_url TEXT,
    colors JSONB, -- Store color palette as JSON
    typography JSONB, -- Store font information as JSON
    voice TEXT,
    style TEXT,
    brand_guidelines TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Target audience table
CREATE TABLE public.target_audiences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
    demographics JSONB, -- Age, gender, location, etc.
    psychographics JSONB, -- Interests, values, lifestyle
    pain_points TEXT[],
    goals TEXT[],
    preferred_channels TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE public.campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    goal TEXT,
    platform TEXT,
    caption TEXT,
    image_url TEXT,
    target_audience_id UUID REFERENCES public.target_audiences(id),
    analytics JSONB,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Valuation data table
CREATE TABLE public.valuation_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
    financials JSONB, -- Revenue, expenses, growth metrics
    metrics JSONB, -- KPIs, user metrics, etc.
    market_data JSONB, -- Market size, competition, etc.
    ai_analysis JSONB, -- AI-generated valuation insights
    valuation_range JSONB, -- Min/max valuation estimates
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vault files table
CREATE TABLE public.vault_files (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    encryption_key TEXT,
    is_encrypted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Integrations table
CREATE TABLE public.integrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
    platform TEXT NOT NULL,
    api_key TEXT,
    access_token TEXT,
    refresh_token TEXT,
    connected BOOLEAN DEFAULT FALSE,
    settings JSONB,
    last_sync TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    stripe_plan TEXT,
    usage JSONB, -- Track API usage, features used, etc.
    billing_status subscription_status DEFAULT 'trialing',
    trial_ends_at TIMESTAMP WITH TIME ZONE,
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Onboarding progress table
CREATE TABLE public.onboarding_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    step TEXT NOT NULL, -- 'company_info', 'target_audience', 'brand_preferences', 'ai_generation', 'review'
    completed BOOLEAN DEFAULT FALSE,
    data JSONB, -- Store step-specific data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_companies_user_id ON public.companies(user_id);
CREATE INDEX idx_brand_kits_company_id ON public.brand_kits(company_id);
CREATE INDEX idx_campaigns_company_id ON public.campaigns(company_id);
CREATE INDEX idx_valuation_data_company_id ON public.valuation_data(company_id);
CREATE INDEX idx_vault_files_company_id ON public.vault_files(company_id);
CREATE INDEX idx_integrations_company_id ON public.integrations(company_id);
CREATE INDEX idx_subscriptions_company_id ON public.subscriptions(company_id);
CREATE INDEX idx_onboarding_progress_user_id ON public.onboarding_progress(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brand_kits_updated_at BEFORE UPDATE ON public.brand_kits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_target_audiences_updated_at BEFORE UPDATE ON public.target_audiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_valuation_data_updated_at BEFORE UPDATE ON public.valuation_data FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vault_files_updated_at BEFORE UPDATE ON public.vault_files FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON public.integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_onboarding_progress_updated_at BEFORE UPDATE ON public.onboarding_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.target_audiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valuation_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_progress ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Companies policies
CREATE POLICY "Users can view own companies" ON public.companies FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own companies" ON public.companies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own companies" ON public.companies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own companies" ON public.companies FOR DELETE USING (auth.uid() = user_id);

-- Brand kits policies
CREATE POLICY "Users can view brand kits for own companies" ON public.brand_kits FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = brand_kits.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can insert brand kits for own companies" ON public.brand_kits FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = brand_kits.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can update brand kits for own companies" ON public.brand_kits FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = brand_kits.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can delete brand kits for own companies" ON public.brand_kits FOR DELETE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = brand_kits.company_id AND companies.user_id = auth.uid()));

-- Target audiences policies
CREATE POLICY "Users can view target audiences for own companies" ON public.target_audiences FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = target_audiences.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can insert target audiences for own companies" ON public.target_audiences FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = target_audiences.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can update target audiences for own companies" ON public.target_audiences FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = target_audiences.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can delete target audiences for own companies" ON public.target_audiences FOR DELETE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = target_audiences.company_id AND companies.user_id = auth.uid()));

-- Campaigns policies
CREATE POLICY "Users can view campaigns for own companies" ON public.campaigns FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = campaigns.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can insert campaigns for own companies" ON public.campaigns FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = campaigns.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can update campaigns for own companies" ON public.campaigns FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = campaigns.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can delete campaigns for own companies" ON public.campaigns FOR DELETE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = campaigns.company_id AND companies.user_id = auth.uid()));

-- Valuation data policies
CREATE POLICY "Users can view valuation data for own companies" ON public.valuation_data FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = valuation_data.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can insert valuation data for own companies" ON public.valuation_data FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = valuation_data.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can update valuation data for own companies" ON public.valuation_data FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = valuation_data.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can delete valuation data for own companies" ON public.valuation_data FOR DELETE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = valuation_data.company_id AND companies.user_id = auth.uid()));

-- Vault files policies
CREATE POLICY "Users can view vault files for own companies" ON public.vault_files FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = vault_files.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can insert vault files for own companies" ON public.vault_files FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = vault_files.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can update vault files for own companies" ON public.vault_files FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = vault_files.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can delete vault files for own companies" ON public.vault_files FOR DELETE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = vault_files.company_id AND companies.user_id = auth.uid()));

-- Integrations policies
CREATE POLICY "Users can view integrations for own companies" ON public.integrations FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = integrations.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can insert integrations for own companies" ON public.integrations FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = integrations.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can update integrations for own companies" ON public.integrations FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = integrations.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can delete integrations for own companies" ON public.integrations FOR DELETE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = integrations.company_id AND companies.user_id = auth.uid()));

-- Subscriptions policies
CREATE POLICY "Users can view subscriptions for own companies" ON public.subscriptions FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = subscriptions.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can insert subscriptions for own companies" ON public.subscriptions FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = subscriptions.company_id AND companies.user_id = auth.uid()));
CREATE POLICY "Users can update subscriptions for own companies" ON public.subscriptions FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE companies.id = subscriptions.company_id AND companies.user_id = auth.uid()));

-- Onboarding progress policies
CREATE POLICY "Users can view own onboarding progress" ON public.onboarding_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own onboarding progress" ON public.onboarding_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own onboarding progress" ON public.onboarding_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own onboarding progress" ON public.onboarding_progress FOR DELETE USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample data for testing (optional)
-- You can remove this section if you don't want sample data

-- Sample company data (will be created when users sign up and complete onboarding)
-- This is just for reference - actual data will be created through the application

COMMENT ON TABLE public.users IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE public.companies IS 'Company information for each user';
COMMENT ON TABLE public.brand_kits IS 'AI-generated brand assets and guidelines';
COMMENT ON TABLE public.target_audiences IS 'Target audience definitions for marketing';
COMMENT ON TABLE public.campaigns IS 'Marketing campaigns and content';
COMMENT ON TABLE public.valuation_data IS 'Company valuation and financial data';
COMMENT ON TABLE public.vault_files IS 'Encrypted file storage for sensitive documents';
COMMENT ON TABLE public.integrations IS 'Third-party service integrations';
COMMENT ON TABLE public.subscriptions IS 'Subscription and billing information';
COMMENT ON TABLE public.onboarding_progress IS 'Track user onboarding completion status';
