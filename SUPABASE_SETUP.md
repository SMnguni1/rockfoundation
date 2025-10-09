# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `rockfoundation`
   - **Database Password**: Choose a strong password
   - **Region**: Choose the closest region to your users
6. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click "Run" to execute the SQL

This will create:
- All necessary tables (users, companies, brand_kits, etc.)
- Row Level Security (RLS) policies
- Triggers for automatic user profile creation
- Indexes for better performance

## 5. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Under **Site URL**, add your development URL: `http://localhost:3000`
3. Under **Redirect URLs**, add:
   - `http://localhost:3000/onboarding`
   - `http://localhost:3000/dashboard`
   - Your production URLs when ready

## 6. Enable OAuth Providers (Optional)

To enable Google and LinkedIn sign-in:

### Google OAuth:
1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Add your Google OAuth credentials

### LinkedIn OAuth:
1. Go to **Authentication** → **Providers**
2. Enable **LinkedIn**
3. Add your LinkedIn OAuth credentials

## 7. Test the Setup

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000`
3. Click "Start Free" to test signup
4. Click "Sign In" to test login
5. Both should redirect to the onboarding page after successful authentication

## Database Schema Overview

The schema includes these main tables:

- **users**: User profiles (extends Supabase auth.users)
- **companies**: Company information for each user
- **brand_kits**: AI-generated brand assets and guidelines
- **target_audiences**: Target audience definitions
- **campaigns**: Marketing campaigns and content
- **valuation_data**: Company valuation and financial data
- **vault_files**: Encrypted file storage
- **integrations**: Third-party service connections
- **subscriptions**: Billing and subscription data
- **onboarding_progress**: Track onboarding completion

## Security Features

- **Row Level Security (RLS)**: Users can only access their own data
- **Automatic user creation**: New users get profiles automatically
- **Encrypted file storage**: Sensitive documents are encrypted
- **API key management**: Secure storage of third-party API keys

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check your environment variables
2. **"User not found"**: Make sure the user profile was created
3. **"Permission denied"**: Check RLS policies are enabled
4. **OAuth redirect errors**: Verify redirect URLs in Supabase settings

### Getting Help:

- Check the [Supabase Documentation](https://supabase.com/docs)
- Join the [Supabase Discord](https://discord.supabase.com)
- Review the SQL schema in `supabase-schema.sql`
