# Portfolio Website Development Guide

## Project Overview
Professional AI/ML Engineer Portfolio website with admin panel for content management.

## Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Authentication**: localStorage (demo), NextAuth ready

## Project Structure

### Pages
- `/` - Home page with hero, skills, projects
- `/projects` - Full project showcase
- `/resume` - Experience and education
- `/contact` - Contact form
- `/admin` - Admin login
- `/admin/dashboard` - Admin panel

### Components
- `Navbar` - Navigation with mobile menu
- `HeroSection` - Landing hero section
- `SkillsSection` - Skills showcase
- `FeaturedProjects` - Featured projects grid
- `ProjectsGrid` - All projects
- `ResumeSection` - Resume and experience
- `ContactForm` - Contact form
- `Footer` - Footer with links
- Admin components - Management interfaces

## Development Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run linter
```

## Key Features

### Frontend
- ✅ Fully responsive design
- ✅ Dark theme with animations
- ✅ Glassmorphism effects
- ✅ Smooth page transitions
- ✅ Mobile-friendly navigation

### Admin Panel
- ✅ Secure login (demo credentials)
- ✅ Project management
- ✅ Skills management
- ✅ Testimonials management
- ✅ Settings interface

## Demo Credentials
- Email: `admin@portfolio.com`
- Password: `admin123`

## Customization Guide

### Update Personal Information
1. Edit [src/components/Footer.tsx](src/components/Footer.tsx) - Social links
2. Edit [src/components/ContactForm.tsx](src/components/ContactForm.tsx) - Contact info
3. Edit [src/components/HeroSection.tsx](src/components/HeroSection.tsx) - Intro text

### Change Theme Colors
Edit [tailwind.config.ts](tailwind.config.ts):
- Primary: `primary-600` (Sky Blue)
- Accent: `accent-500` (Orange)
- Dark: `dark-950` (Almost Black)

### Add Content
1. Use admin panel to add projects, skills, testimonials
2. Data stored in React state (not persistent)
3. For persistence, connect MongoDB or Firebase

## File Locations

### Configuration Files
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `next.config.js` - Next.js config
- `tailwind.config.ts` - Tailwind theme
- `postcss.config.js` - CSS processing

### Source Code
- `src/app/` - Pages
- `src/components/` - React components
- `src/styles/` - Global styles
- `public/` - Static assets

## Common Tasks

### Add a New Skill Category
1. Open admin dashboard
2. Navigate to Skills tab
3. Enter category and skills
4. Click "Add Skills"

### Add a New Project
1. Open admin dashboard
2. Navigate to Projects tab
3. Fill in project details
4. Click "Add Project"

### Add a Testimonial
1. Open admin dashboard
2. Navigate to Testimonials tab
3. Enter client info and testimonial
4. Click "Add Testimonial"

## Performance Optimization
- Image optimization ready (Next.js Image component)
- Code splitting by route
- CSS purging with Tailwind
- No blocking scripts

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Future Enhancements
1. Connect to MongoDB for data persistence
2. Implement proper authentication with NextAuth
3. Add image upload for projects
4. Email notifications for contact form
5. Blog section
6. Case studies page
7. Integrate with portfolio tracking analytics
