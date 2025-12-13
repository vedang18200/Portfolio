# 🚀 Portfolio Website - Quick Start Guide

## Project Setup Complete! ✨

Your professional AI/ML portfolio website with admin panel has been successfully created. Here's everything you need to know to get started.

## 📋 What's Included

### Pages Built
✅ **Home** - Hero section, skills showcase, featured projects, testimonials, CTA
✅ **Projects** - Full project grid with filtering
✅ **Resume** - Experience timeline and education
✅ **Contact** - Contact form with validation
✅ **Admin Panel** - Complete content management system

### Features
✅ Dark theme with modern design
✅ Smooth Framer Motion animations
✅ Fully responsive (mobile, tablet, desktop)
✅ Glassmorphism UI effects
✅ Admin authentication
✅ Real-time content management

## 🎯 Quick Start

### 1. Navigate to Project Directory
```bash
cd /home/vedang/portfolio
```

### 2. Install Dependencies (if not done)
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

The site will be available at: **http://localhost:3000**

## 🔐 Admin Access

**Login Page:** http://localhost:3000/admin

**Demo Credentials:**
- Email: `admin@portfolio.com`
- Password: `admin123`

**Admin Features:**
- ✅ Add/Edit/Delete Projects
- ✅ Manage Skills & Categories
- ✅ Add Testimonials
- ✅ Settings (extensible)

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx           # Home page
│   │   ├── projects/          # Projects page
│   │   ├── resume/            # Resume page
│   │   ├── contact/           # Contact page
│   │   └── admin/             # Admin pages
│   ├── components/             # React components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── ResumeSection.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── admin/              # Admin components
│   ├── styles/
│   │   └── globals.css
│   └── lib/                    # Utilities
├── public/                     # Static assets
├── package.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🎨 Customization

### Update Your Information

1. **Name & Title** - Edit `src/components/HeroSection.tsx`
2. **Skills** - Edit `src/components/SkillsSection.tsx`
3. **Social Links** - Edit `src/components/Footer.tsx`
4. **Contact Info** - Edit `src/components/ContactForm.tsx`

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: { 500: '#0ea5e9', 600: '#0284c7' },  // Sky Blue
  accent: { 500: '#f97316', 600: '#ea580c' },   // Orange
  dark: { 950: '#030712' }                       // Dark background
}
```

### Add Projects via Admin Panel

1. Go to http://localhost:3000/admin/dashboard
2. Click on **Projects** tab
3. Fill in project details
4. Click **Add Project**

## 📦 Available Commands

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Create production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

## 🎯 Next Steps

### Immediate
1. Customize your information (name, bio, contact)
2. Add real projects through admin panel
3. Update skills and expertise
4. Add client testimonials

### Short Term
1. Add project thumbnails to `/public/projects/`
2. Update meta information in `src/app/layout.tsx`
3. Test on mobile devices
4. Customize colors to match your brand

### Production
1. Deploy to Vercel (recommended):
   ```bash
   npm install -g vercel
   vercel
   ```
2. Set up custom domain
3. Configure environment variables
4. Add proper authentication
5. Connect database (MongoDB/Firebase) for persistence

## 🔗 Page Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page |
| `/projects` | All projects |
| `/resume` | Experience & education |
| `/contact` | Contact form |
| `/admin` | Admin login |
| `/admin/dashboard` | Admin panel |

## 💡 Key Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Icons** - Icon library

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Admin Security Notes

Current setup uses localStorage for demo purposes. For production, implement:
- NextAuth.js with credentials provider
- JWT tokens
- Secure session management
- Database-backed user accounts

## ❓ Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Build errors?**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

**TypeScript errors?**
- Check that all imports use correct paths
- Run `npm run lint` to identify issues

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [React Icons](https://react-icons.github.io/react-icons)

## 🎉 You're All Set!

Your portfolio website is ready to customize and deploy. Start by running:

```bash
npm run dev
```

Then visit http://localhost:3000 to see your site in action!

---

**Need help?** Check the README.md file for more detailed information.
