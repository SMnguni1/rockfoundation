# Environment Variables Setup Guide

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# ===========================================
# SUPABASE CONFIGURATION
# ===========================================
# Get these from your Supabase project settings > API
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# ===========================================
# AI SERVICES CONFIGURATION
# ===========================================
# OpenAI API Key for GPT-4 text generation
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your-openai-api-key-here

# Replicate API Token for image/logo generation
# Get from: https://replicate.com/account/api-tokens
REPLICATE_API_TOKEN=your-replicate-api-token-here

# ===========================================
# STRIPE CONFIGURATION (for billing)
# ===========================================
# Stripe API Keys for subscription management
# Get from: https://dashboard.stripe.com/apikeys
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key-here
STRIPE_SECRET_KEY=your-stripe-secret-key-here
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret-here

# ===========================================
# SOCIAL MEDIA INTEGRATIONS
# ===========================================
# LinkedIn API for social posting
# Get from: https://www.linkedin.com/developers/apps
LINKEDIN_CLIENT_ID=your-linkedin-client-id-here
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret-here

# Twitter/X API for social posting
# Get from: https://developer.twitter.com/en/portal/dashboard
TWITTER_API_KEY=your-twitter-api-key-here
TWITTER_API_SECRET=your-twitter-api-secret-here
TWITTER_ACCESS_TOKEN=your-twitter-access-token-here
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret-here

# Meta/Facebook API for social posting
# Get from: https://developers.facebook.com/apps
META_APP_ID=your-meta-app-id-here
META_APP_SECRET=your-meta-app-secret-here

# ===========================================
# EMAIL SERVICE CONFIGURATION
# ===========================================
# SendGrid API for transactional emails
# Get from: https://app.sendgrid.com/settings/api_keys
SENDGRID_API_KEY=your-sendgrid-api-key-here

# ===========================================
# ANALYTICS INTEGRATIONS
# ===========================================
# Google Analytics API for growth insights
# Get from: https://console.developers.google.com/
GOOGLE_ANALYTICS_API_KEY=your-google-analytics-api-key-here
GOOGLE_ANALYTICS_VIEW_ID=your-google-analytics-view-id-here

# ===========================================
# SECURITY & ENCRYPTION
# ===========================================
# AES-256 encryption key for company data
# Generate a secure random string (32 characters)
ENCRYPTION_KEY=your-32-character-encryption-key-here

# JWT secret for additional security
JWT_SECRET=your-jwt-secret-here

# ===========================================
# APPLICATION CONFIGURATION
# ===========================================
# Application URL (for OAuth redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Environment
NODE_ENV=development

# ===========================================
# OPTIONAL: MONITORING & LOGGING
# ===========================================
# Sentry DSN for error tracking
# Get from: https://sentry.io/settings/projects/
SENTRY_DSN=your-sentry-dsn-here

# ===========================================
# DEVELOPMENT ONLY
# ===========================================
# Set to true to enable debug logging
DEBUG=false

# Mock API responses for development (set to true for testing without API calls)
MOCK_AI_RESPONSES=false
```

## How to Get API Keys

### 1. Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a project
2. Go to **Settings** → **API**
3. Copy the **Project URL** and **anon public** key

### 2. OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### 3. Replicate API Token
1. Go to [replicate.com](https://replicate.com/account/api-tokens)
2. Sign up or log in
3. Go to **Account** → **API tokens**
4. Click "Create token"
5. Copy the token (starts with `r8_`)

### 4. Stripe API Keys (Optional - for billing)
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com/apikeys)
2. Sign up or log in
3. Copy the **Publishable key** and **Secret key**

### 5. Social Media APIs (Optional)
- **LinkedIn**: [linkedin.com/developers/apps](https://www.linkedin.com/developers/apps)
- **Twitter/X**: [developer.twitter.com](https://developer.twitter.com/en/portal/dashboard)
- **Meta/Facebook**: [developers.facebook.com/apps](https://developers.facebook.com/apps)

## Quick Setup Commands

```bash
# Create the environment file
cp environment-setup.md .env.local

# Edit the file with your actual API keys
# Replace all "your-*-here" values with your actual keys

# Install dependencies
npm install

# Run the development server
npm run dev
```

## Security Notes

- Never commit `.env.local` to version control
- Keep your API keys secure and don't share them
- Use different keys for development and production
- Rotate your keys regularly
- The `.env.local` file is already in `.gitignore`
