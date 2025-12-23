# IEEE BUC Website - Quick Start Guide

## 🎉 Your website is ready!

The IEEE BUC Student Branch website has been successfully created. Here's how to get started.

## 📋 What's Been Built

✅ Complete website with 6 pages:
- **Home** - Hero, stats, featured events, benefits, CTA
- **About** - Mission, vision, history (MDX format)
- **Events** - Filter by upcoming/past with detail pages
- **Gallery** - Photo/video grid with lightbox and filters
- **Team** - Executive committee and members
- **Contact** - Form with validation

✅ Features:
- Mobile responsive design
- Accessible (WCAG 2.1 AA)
- SEO optimized with structured data
- Smooth animations
- Easy content management via JSON files

## 🚀 Run the Website

```bash
cd ieee-buc-website
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📝 Next Steps

### 1. Set Up Contact Form

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy the endpoint URL
3. Create `.env.local` file in the project root:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/YOUR_FORM_ID
```

### 2. Add Real Content

Replace placeholder content in `src/content/`:

**Events** (`events.json`):
- Add your actual events
- Upload event images to `public/images/events/`

**Team** (`team.json`):
- Add real team member photos to `public/images/team/`
- Update names, roles, emails, and bios

**Gallery** (`gallery.json`):
- Add photos to `public/images/gallery/`
- Create thumbnail and full-size versions

**About Page** (`pages/about.mdx`):
- Edit with your branch's actual history and information

**Site Info** (`site.json`):
- Update email, phone, address
- Add your social media links

### 3. Add Images

#### Required Images:
- `public/images/logo.svg` - Replace with real IEEE BUC logo
- `public/images/og-image.jpg` - Social media preview (1200x630px)

#### Event Images:
- Recommended size: 1200x675px (16:9 ratio)
- Format: JPG
- Optimize before uploading (use TinyPNG)

#### Team Photos:
- Recommended size: 800x800px (1:1 ratio)
- Format: JPG
- Professional headshots work best

#### Gallery Images:
- Recommended size: 1200x1200px or larger
- Format: JPG
- Keep file size under 500KB

### 4. Customize Colors (Optional)

Edit `src/app/globals.css` to adjust the color scheme:

```css
--color-ieee-blue: #00629b;  /* Primary brand color */
--color-ieee-blue-light: #0080c9;  /* Hover states */
```

## 🌐 Deploy to Production

### Deploy to Vercel (Recommended - Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_BASE_URL`: Your production URL
   - `NEXT_PUBLIC_FORMSPREE_URL`: Your Formspree form endpoint
5. Click "Deploy"

Done! Your site will be live in ~2 minutes.

### Custom Domain

1. In Vercel dashboard, go to your project settings
2. Click "Domains"
3. Add your domain (e.g., ieee-buc.om)
4. Update DNS records as instructed

## 📖 Common Tasks

### Adding a New Event

1. Add event image to `public/images/events/`
2. Open `src/content/events.json`
3. Add new event object:
```json
{
  "id": "unique-id",
  "slug": "url-friendly-slug",
  "title": "Event Title",
  "date": "2024-03-15",
  "type": "Workshop",
  "status": "upcoming",
  "description": "Short description",
  "location": "Location",
  "image": "/images/events/your-image.jpg"
}
```
4. Save and refresh

### Adding Team Members

1. Add member photo to `public/images/team/`
2. Open `src/content/team.json`
3. Add to `executive` or `members` array
4. Save and refresh

### Updating About Page

1. Open `src/content/pages/about.mdx`
2. Edit using Markdown syntax
3. Save and refresh

## 🔧 Useful Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Run production server locally
npm start

# Check for code issues
npm run lint
```

## 📦 Project Structure

```
ieee-buc-website/
├── public/images/       ← Add your images here
├── src/
│   ├── app/            ← Pages
│   ├── components/     ← Reusable UI components
│   ├── content/        ← Editable content (JSON/MDX)
│   └── lib/            ← Utility functions
└── README.md           ← Full documentation
```

## 🆘 Need Help?

- **Full Documentation**: See `README.md`
- **Content Updates**: All instructions in `README.md`
- **Technical Issues**: Check browser console for errors

## ✨ Tips

1. **Test on Mobile**: Always check how changes look on phone
2. **Optimize Images**: Use TinyPNG before uploading
3. **Update Regularly**: Keep events and team info current
4. **Backup Content**: Keep a copy of your content files
5. **Use Git**: Commit changes regularly

## 📄 License

© 2024 IEEE Student Branch - Buraimi University College

