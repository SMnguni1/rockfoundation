# Rock Foundation Environment Setup Script
# This script helps you configure your environment variables

Write-Host "🚀 Rock Foundation Environment Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Check if .env.local exists
if (Test-Path ".env.local") {
    Write-Host "✅ .env.local file found" -ForegroundColor Green
} else {
    Write-Host "❌ .env.local file not found. Please create it first." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Required API Keys:" -ForegroundColor Yellow
Write-Host "1. Supabase (Database and Auth)" -ForegroundColor White
Write-Host "2. OpenAI (AI Text Generation)" -ForegroundColor White
Write-Host "3. Replicate (AI Image Generation)" -ForegroundColor White
Write-Host "4. Stripe (Billing - Optional)" -ForegroundColor White
Write-Host "5. Social Media APIs (Optional)" -ForegroundColor White

Write-Host ""
Write-Host "🔗 Quick Links:" -ForegroundColor Yellow
Write-Host "• Supabase: https://supabase.com" -ForegroundColor Blue
Write-Host "• OpenAI: https://platform.openai.com/api-keys" -ForegroundColor Blue
Write-Host "• Replicate: https://replicate.com/account/api-tokens" -ForegroundColor Blue
Write-Host "• Stripe: https://dashboard.stripe.com/apikeys" -ForegroundColor Blue

Write-Host ""
Write-Host "📝 Instructions:" -ForegroundColor Yellow
Write-Host "1. Open .env.local in your editor" -ForegroundColor White
Write-Host "2. Replace all 'your-*-here' values with your actual API keys" -ForegroundColor White
Write-Host "3. Save the file" -ForegroundColor White
Write-Host "4. Run 'npm run dev' to start the development server" -ForegroundColor White

Write-Host ""
Write-Host "⚠️  Security Notes:" -ForegroundColor Red
Write-Host "• Never commit .env.local to version control" -ForegroundColor White
Write-Host "• Keep your API keys secure" -ForegroundColor White
Write-Host "• Use different keys for development and production" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Minimum Required for Testing:" -ForegroundColor Green
Write-Host "• NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor White
Write-Host "• NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor White
Write-Host "• OPENAI_API_KEY" -ForegroundColor White
Write-Host "• REPLICATE_API_TOKEN" -ForegroundColor White

Write-Host ""
Write-Host "✨ Setup complete! Edit .env.local with your API keys." -ForegroundColor Green