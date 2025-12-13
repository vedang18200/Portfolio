# Professional Portfolio Website with Admin Panel

A modern, fully-featured portfolio website for AI/ML engineers and Python developers with a powerful admin panel for content management.

## 🚀 Features

### Frontend
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Dark Theme**: Professional dark theme with gradient accents
- **Smooth Animations**: Framer Motion animations throughout the site
- **Multiple Pages**:
  - Home (Hero, Skills, Featured Projects, Testimonials, CTA)
  - Projects (Full project showcase)
  - Resume (Experience and Education)
  - Contact (Contact form with validation)
  - Admin Panel (Content management)

### Admin Panel
- **Secure Login**: Demo authentication (Email: `admin@portfolio.com`, Password: `admin123`)
- **Project Management**: Add, edit, and delete projects
- **Skills Management**: Manage skill categories and items
- **Testimonials Management**: Add and manage client testimonials
- **Settings**: Configuration options (extensible)

### Design Features
- Dark theme optimized for professional appearance
- Gradient text and backgrounds
- Glassmorphism effects
- Smooth transitions and hover effects
- Grid animations
- Responsive navigation with mobile menu

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **UI Components**: Custom built with Tailwind
- **Package Manager**: npm

## 📦 Installation

```bash
# Clone or navigate to the project directory
cd /home/vedang/portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

The site will be available at `http://localhost:3000`

## 🎯 Usage

### Development
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

### Admin Panel Access

1. Navigate to `http://localhost:3000/admin`
2. Login with demo credentials:
   - Email: `admin@portfolio.com`
   - Password: `admin123`
3. Manage your portfolio content through the dashboard

## 📄 Pages & Components

### Public Pages
- **Home** (`/`): Landing page with hero section, skills, featured projects
- **Projects** (`/projects`): Full project showcase grid
- **Resume** (`/resume`): Experience and education timeline
- **Contact** (`/contact`): Contact form and information

### Admin Pages
- **Login** (`/admin`): Authentication page
- **Dashboard** (`/admin/dashboard`): Main admin interface
  - Projects Management
  - Skills Management
  - Testimonials Management
  - Settings

## 🎨 Customization

### Update Portfolio Information
Edit components in `src/components/`:
- `HeroSection.tsx`: Main heading and intro
- `SkillsSection.tsx`: Your skills and expertise
- `FeaturedProjects.tsx`: Featured projects showcase
- `TestimonialsSection.tsx`: Client testimonials
- `ResumeSection.tsx`: Experience and education

### Change Colors
Edit `tailwind.config.ts` to customize the color scheme:
- Primary color: `primary-600` (default: Sky Blue)
- Accent color: `accent-500` (default: Orange)
- Dark theme: `dark-950`, `dark-900`, etc.

### Add Your Information
Update these files with your personal info:
- [src/components/Footer.tsx](src/components/Footer.tsx) - Social links and contact
- [src/components/ContactForm.tsx](src/components/ContactForm.tsx) - Contact details
- [src/app/layout.tsx](src/app/layout.tsx) - Meta information

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

All components use Tailwind's responsive utilities for seamless adaptation.

## 🔐 Security Notes

- The demo authentication uses localStorage for simplicity
- For production, implement proper authentication with:
  - NextAuth.js with credentials provider
  - JWT tokens
  - Secure session management
  - Database-backed user management

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms
- Build: `npm run build`
- Start: `npm run start`
- Ensure Node.js environment supports the versions specified in package.json

## 📚 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── projects/
│   │   ├── resume/
│   │   ├── contact/
│   │   └── admin/               # Admin pages
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── ResumeSection.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── admin/               # Admin components
│   ├── styles/
│   │   └── globals.css
│   └── lib/                     # Utilities and helpers
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🎯 Next Steps

1. **Customize Content**:
   - Update your name, bio, and contact info
   - Add your actual projects
   - Update skills and experience
   - Add testimonials from real clients

2. **Add Real Images**:
   - Create a `/public/projects` folder
   - Add project screenshots/thumbnails
   - Update component references

3. **Database Integration** (Optional):
   - Connect MongoDB for persistent data
   - Implement proper API routes in `pages/api/`
   - Add form submission handling

4. **Deployment**:
   - Push to GitHub
   - Deploy to Vercel or similar
   - Set up custom domain

## 📝 License

This project is open source and available for personal and commercial use.

## 💡 Tips for Success

- Keep content concise and impactful
- Use high-quality project images
- Update regularly with new projects
- Get real testimonials from clients
- Test on mobile devices
- Monitor performance and SEO

---

**Built with ❤️ for AI/ML engineers and Python developers**
