# Rock Foundation API Setup Guide

This guide will help you configure all the necessary API keys and integrations for Rock Foundation according to the requirements specification.

## 🎯 Core APIs (Required)

### 1. Supabase (Database & Authentication)
**Purpose**: Core backend, database, authentication, and storage

**Setup Steps**:
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **API**
4. Copy the following values to your `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (your anon key)
   ```

**Database Setup**:
- Run the SQL schema from `supabase-schema.sql` in your Supabase SQL Editor
- This creates all necessary tables with Row Level Security

### 2. OpenAI (AI Text Generation)
**Purpose**: Brand voice, campaign copy, valuation analysis, investor materials

**Setup Steps**:
1. Go to [platform.openai.com](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key to your `.env.local`:
   ```env
   OPENAI_API_KEY=sk-... (your OpenAI key)
   ```

**Usage in Rock Foundation**:
- **Brand Builder**: Generate taglines, descriptions, brand voice
- **Campaign Generator**: Create social media captions, ad copy, CTAs
- **Valuation Engine**: Analyze financial data and generate insights
- **Investor Hub**: Create pitch decks and investor materials

### 3. Replicate (AI Image Generation)
**Purpose**: Logo generation, campaign visuals, brand assets

**Setup Steps**:
1. Go to [replicate.com](https://replicate.com/account/api-tokens)
2. Sign up or log in
3. Go to **Account** → **API tokens**
4. Click "Create token"
5. Copy the token to your `.env.local`:
   ```env
   REPLICATE_API_TOKEN=r8_... (your Replicate token)
   ```

**Usage in Rock Foundation**:
- **Logo Generation**: Create professional geometric logos
- **Campaign Visuals**: Generate social media images
- **Brand Assets**: Create visual content for marketing

## 💳 Billing & Payments (Optional)

### 4. Stripe (Subscription Management)
**Purpose**: Handle subscription plans, payments, and billing

**Setup Steps**:
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com/apikeys)
2. Sign up or log in
3. Copy the following keys to your `.env.local`:
   ```env
   STRIPE_PUBLISHABLE_KEY=pk_... (your publishable key)
   STRIPE_SECRET_KEY=sk_... (your secret key)
   STRIPE_WEBHOOK_SECRET=whsec_... (for webhooks)
   ```

## 📱 Social Media Integrations (Optional)

### 5. LinkedIn API
**Purpose**: Publish campaigns and fetch analytics

**Setup Steps**:
1. Go to [linkedin.com/developers/apps](https://www.linkedin.com/developers/apps)
2. Create a new app
3. Add the following to your `.env.local`:
   ```env
   LINKEDIN_CLIENT_ID=your-linkedin-client-id
   LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
   ```

### 6. Twitter/X API
**Purpose**: Publish campaigns and fetch analytics

**Setup Steps**:
1. Go to [developer.twitter.com](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app
3. Add the following to your `.env.local`:
   ```env
   TWITTER_API_KEY=your-twitter-api-key
   TWITTER_API_SECRET=your-twitter-api-secret
   TWITTER_ACCESS_TOKEN=your-twitter-access-token
   TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
   ```

### 7. Meta/Facebook API
**Purpose**: Publish campaigns and fetch analytics

**Setup Steps**:
1. Go to [developers.facebook.com/apps](https://developers.facebook.com/apps)
2. Create a new app
3. Add the following to your `.env.local`:
   ```env
   META_APP_ID=your-meta-app-id
   META_APP_SECRET=your-meta-app-secret
   ```

## 📧 Email Services (Optional)

### 8. SendGrid
**Purpose**: Transactional emails (welcome, reports, investor invites)

**Setup Steps**:
1. Go to [app.sendgrid.com](https://app.sendgrid.com/settings/api_keys)
2. Create an API key
3. Add to your `.env.local`:
   ```env
   SENDGRID_API_KEY=SG... (your SendGrid key)
   ```

## 📊 Analytics (Optional)

### 9. Google Analytics
**Purpose**: Connect external metrics for growth insights

**Setup Steps**:
1. Go to [console.developers.google.com](https://console.developers.google.com/)
2. Enable Google Analytics API
3. Create credentials
4. Add to your `.env.local`:
   ```env
   GOOGLE_ANALYTICS_API_KEY=your-google-analytics-api-key
   GOOGLE_ANALYTICS_VIEW_ID=your-google-analytics-view-id
   ```

## 🔒 Security Configuration

### Encryption Keys
Generate secure keys for data encryption:

```env
# Generate a 32-character random string for AES-256 encryption
ENCRYPTION_KEY=your-32-character-encryption-key-here

# Generate a secure JWT secret
JWT_SECRET=your-jwt-secret-here
```

**Generate Encryption Key**:
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using PowerShell
[System.Web.Security.Membership]::GeneratePassword(32, 0)
```

## 🚀 Quick Start (Minimum Setup)

For testing the core functionality, you only need:

1. **Supabase** (Database & Auth)
2. **OpenAI** (AI Text Generation)
3. **Replicate** (AI Image Generation)

```env
# Minimum required environment variables
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-key
REPLICATE_API_TOKEN=your-replicate-token
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## 🧪 Testing Your Setup

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test the onboarding flow**:
   - Go to `http://localhost:3000`
   - Click "Start Free"
   - Complete the signup process
   - Test the AI brand generation

3. **Check API connectivity**:
   - Brand generation should work with OpenAI
   - Logo generation should work with Replicate
   - User data should save to Supabase

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid API key" errors**:
   - Check your environment variables are correct
   - Ensure no extra spaces or quotes
   - Verify the API key is active

2. **Supabase connection issues**:
   - Check your project URL and anon key
   - Ensure RLS policies are enabled
   - Verify the database schema is set up

3. **AI generation not working**:
   - Check OpenAI/Replicate API keys
   - Verify you have sufficient API credits
   - Check the console for error messages

### Getting Help:

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the [OpenAI API Documentation](https://platform.openai.com/docs)
- Check the [Replicate Documentation](https://replicate.com/docs)

## 📋 Environment Variables Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `OPENAI_API_KEY`
- [ ] `REPLICATE_API_TOKEN`
- [ ] `STRIPE_PUBLISHABLE_KEY` (optional)
- [ ] `STRIPE_SECRET_KEY` (optional)
- [ ] `LINKEDIN_CLIENT_ID` (optional)
- [ ] `LINKEDIN_CLIENT_SECRET` (optional)
- [ ] `TWITTER_API_KEY` (optional)
- [ ] `TWITTER_API_SECRET` (optional)
- [ ] `META_APP_ID` (optional)
- [ ] `META_APP_SECRET` (optional)
- [ ] `SENDGRID_API_KEY` (optional)
- [ ] `GOOGLE_ANALYTICS_API_KEY` (optional)
- [ ] `ENCRYPTION_KEY`
- [ ] `JWT_SECRET`
- [ ] `NEXT_PUBLIC_APP_URL`
- [ ] `NODE_ENV`

## 🎉 You're Ready!

Once you've configured the required APIs, you can:

1. **Test the onboarding wizard** with AI brand generation
2. **Create marketing campaigns** with AI-powered copy and visuals
3. **Generate company valuations** with AI analysis
4. **Build investor materials** automatically
5. **Manage your startup's complete digital presence**

The platform will automatically use the configured APIs to provide AI-powered insights and content generation for your startup!
