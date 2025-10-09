# 4-Step Onboarding Wizard

A comprehensive brand kit generation wizard that guides users through creating their professional brand identity using AI.

## Features

### 4-Step Process

1. **Company Info**
   - Company name
   - Industry selection
   - Mission statement

2. **Audience & Tone**
   - Target audience description
   - Brand voice style selection
   - Brand adjectives (3-5 selection)

3. **Visual Preferences**
   - Visual style selection
   - Color palette preferences (3-5 colors)

4. **Review & Generate**
   - Summary of all inputs
   - AI generation preview
   - Generate brand kit button

### Generated Brand Kit Includes

- **5 Tagline Suggestions** - Varied approaches (emotional, functional, aspirational)
- **Brand Voice Summary** - Detailed communication guidelines
- **3 Logo Variations** - Different design approaches
- **Complete Color Palette** - Primary, secondary, accent, neutral, background colors
- **Typography Recommendations** - Primary, secondary, and body fonts
- **Comprehensive Brand Guidelines** - Usage rules, do's and don'ts

### Dashboard Features

- **Save Brand Kit** - Store to Supabase database
- **Download Kit** - Export as Markdown document
- **Share Kit** - Native sharing or clipboard copy
- **Brand Kit Dashboard** - View and manage all saved brand kits
- **Preview Modal** - Full-screen brand kit preview

## File Structure

```
src/
├── app/
│   ├── onboarding/
│   │   └── page.tsx                 # Main onboarding page
│   └── dashboard/
│       └── brand-kit/
│           └── page.tsx             # Brand kit dashboard
├── components/
│   └── onboarding/
│       ├── OnboardingForm.tsx       # 4-step wizard form
│       ├── BrandPreview.tsx         # Brand kit preview component
│       ├── AIOutputModal.tsx        # Modal for generated results
│       └── BrandKitDashboard.tsx    # Dashboard for saved brand kits
└── lib/
    └── ai/
        └── brand.ts                 # AI brand generation logic
```

## Usage

1. Navigate to `/onboarding` to start the wizard
2. Complete all 4 steps with required information
3. Review your inputs and generate the brand kit
4. Save, download, or share your brand kit
5. View all saved brand kits in `/dashboard/brand-kit`

## AI Integration

- Uses OpenAI GPT-4o-mini for comprehensive brand generation
- Generates taglines, voice guidelines, color palettes, and typography
- Includes brand guidelines with practical usage instructions
- Supports regeneration of individual assets (taglines, logos, colors)

## Database Integration

- Saves brand kits to Supabase `brand_kits` table
- Links to company records in `companies` table
- Stores JSON data for colors and complex brand information
- Supports CRUD operations for brand kit management

## Responsive Design

- Mobile-first design with responsive grid layouts
- Touch-friendly interface for mobile devices
- Dark mode support throughout all components
- Accessible form controls and navigation
