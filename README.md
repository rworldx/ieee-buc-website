# IEEE Student Branch - Buraimi University College Website

Official website for the IEEE Student Branch at Buraimi University College, Oman. Built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, minimalist design with IEEE branding
- 📱 Fully responsive across all devices
- 🔍 SEO-ready with structured data
- 📝 Easy content management via JSON files
- 🖼️ Image gallery with lightbox
- 📧 Contact form with validation
- 🎯 Event management with filtering

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Content:** Local JSON + MDX

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ieee-buc-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/YOUR_FORM_ID
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

All content is managed through editable JSON files in `src/content/`. No coding knowledge required!

### Updating Events

Edit `src/content/events.json`:

```json
{
  "id": "unique-id",
  "slug": "url-friendly-slug",
  "title": "Event Title",
  "date": "2024-03-15",
  "type": "Workshop",
  "status": "upcoming",
  "description": "Short description",
  "longDescription": "Full description for detail page",
  "location": "Location name",
  "image": "/images/events/event-image.jpg",
  "gallery": ["/images/events/photo1.jpg"],
  "videos": ["https://youtube.com/watch?v=..."],
  "registrationLink": "https://forms.gle/..."
}
```

**Adding a new event:**
1. Add event images to `public/images/events/`
2. Add event entry to `events.json`
3. Save and reload the page

### Updating Team Members

Edit `src/content/team.json`:

**Executive Committee:**
```json
{
  "name": "Member Name",
  "role": "Position",
  "email": "email@example.com",
  "photo": "/images/team/photo.jpg",
  "bio": "Brief bio",
  "linkedin": "https://linkedin.com/in/username"
}
```

**Regular Members:**
```json
{
  "name": "Member Name",
  "department": "Department Name",
  "photo": "/images/team/photo.jpg"
}
```

**Steps:**
1. Add member photos to `public/images/team/`
2. Update `team.json` with member information
3. Save and reload

### Updating Gallery

Edit `src/content/gallery.json`:

```json
{
  "id": "unique-id",
  "title": "Photo Title",
  "category": "Workshops",
  "type": "image",
  "thumbnail": "/images/gallery/thumb.jpg",
  "fullSize": "/images/gallery/full.jpg",
  "alt": "Descriptive alt text"
}
```

**For videos:**
```json
{
  "id": "unique-id",
  "title": "Video Title",
  "category": "Social",
  "type": "video",
  "thumbnail": "/images/gallery/thumb.jpg",
  "videoUrl": "https://youtube.com/watch?v=...",
  "alt": "Descriptive alt text"
}
```

**Categories:** Workshops, Social, Seminars, Competitions (or create your own)

### Updating About Page

Edit `src/content/pages/about.mdx` - supports Markdown formatting:

```markdown
# Heading

## Subheading

Regular paragraph text.

**Bold text** and *italic text*

- Bullet points
- Second point

[Link text](https://example.com)
```

### Updating Site Information

Edit `src/content/site.json` for contact details, social media links, etc.

## Adding Images

### Best Practices

- **Format:** JPG for photos, PNG for graphics with transparency
- **Size:** Maximum 1MB per image
- **Dimensions:** 
  - Event images: 1200x675px (16:9)
  - Team photos: 800x800px (1:1)
  - Gallery images: 1200x1200px or larger
- **Optimization:** Use tools like TinyPNG or ImageOptim before uploading

### Steps

1. Optimize your image
2. Place in appropriate folder:
   - Events: `public/images/events/`
   - Team: `public/images/team/`
   - Gallery: `public/images/gallery/`
3. Reference in JSON: `/images/category/filename.jpg`

## Setting Up Contact Form

The contact form uses Formspree (free tier available).

1. Go to [formspree.io](https://formspree.io)
2. Create a free account
3. Create a new form
4. Copy the form endpoint URL
5. Add to `.env.local`:
```env
NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/YOUR_FORM_ID
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "New Project" and import your repository

4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_BASE_URL`: Your production URL (e.g., https://ieee-buc.om)
   - `NEXT_PUBLIC_FORMSPREE_URL`: Your Formspree form endpoint

5. Click "Deploy"

Your site will be live in minutes! Vercel automatically deploys updates when you push to GitHub.

### Deploy to Other Platforms

Build the production version:
```bash
npm run build
```

The output will be in the `.next` folder. Upload to any Node.js hosting service.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Project Structure

```
ieee-buc-website/
├── public/
│   └── images/          # Static images
│       ├── events/
│       ├── team/
│       └── gallery/
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── about/
│   │   ├── events/
│   │   ├── gallery/
│   │   ├── team/
│   │   ├── contact/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/      # React components
│   │   ├── layout/      # Navbar, Footer, Section
│   │   ├── home/        # Homepage sections
│   │   ├── cards/       # Reusable card components
│   │   ├── gallery/     # Gallery and lightbox
│   │   └── forms/       # Contact form
│   ├── content/         # Editable content files
│   │   ├── events.json
│   │   ├── team.json
│   │   ├── gallery.json
│   │   ├── site.json
│   │   └── pages/
│   │       └── about.mdx
│   └── lib/             # Utility functions
│       ├── content.ts   # Content loaders
│       ├── seo.ts       # SEO helpers
│       └── schema.ts    # JSON-LD schemas
└── tailwind.config.ts
```

## Troubleshooting

### Images not showing

- Verify image path starts with `/images/`
- Check file exists in `public/images/`
- Ensure filename matches exactly (case-sensitive)

### Contact form not working

- Verify `NEXT_PUBLIC_FORMSPREE_URL` is set
- Check Formspree dashboard for submissions
- Look for console errors in browser

### Build errors

- Run `npm run build` locally to see errors
- Check all JSON files have valid syntax
- Verify all required fields are present

## Support

For technical issues or questions:
- **Email:** webmaster@ieee-buc.om
- **GitHub Issues:** [Create an issue](repository-url/issues)

## License

© 2025 IEEE Student Branch - Buraimi University College. All rights reserved.

## Credits

Designed and developed by Rashid Al Ghafri, Webmaster, IEEE BUC Student Branch.
