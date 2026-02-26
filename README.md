# Personal Portfolio Website

A modern, responsive personal portfolio website showcasing professional profile, skills, work experience, education, projects, and contact information.

## 🚀 Tech Stack

### Frontend Framework & Libraries
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript for enhanced development experience
- **Tailwind CSS v4** - Utility-first CSS framework for styling

### UI Components & Icons
- **Lucide React** - Beautiful, consistent icon library
- **Shadcn/UI** - High-quality, accessible React components
- **Motion (Framer Motion)** - Animation library for smooth transitions and interactions

### Image Handling
- **Unsplash API** - High-quality stock images for project showcases
- **ImageWithFallback** - Custom component for reliable image loading

### Build Tools
- **Vite** - Fast, modern build tool and development server
- **ES Modules** - Modern JavaScript module system

## 📋 Features

- **Hero Section** - Eye-catching introduction with call-to-action buttons
- **About Section** - Professional summary with resume download functionality
- **Skills Showcase** - Interactive technology badges organized by categories:
  - Backend Engineering
  - Cloud Technologies
  - AI, Machine Learning & Analytics
  - Software Testing
  - Web Technologies
  - Data Engineering
  - DevOps
- **Work Experience Timeline** - Professional career history
- **Education Section** - Academic background
- **Projects Gallery** - Featured projects with GitHub links
- **Contact Form** - Email integration for easy communication
- **Footer** - Social media links and additional information
- **Smooth Scrolling** - Seamless navigation between sections
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 🏗️ Building for Production

### Build the Application

Create an optimized production build:
```bash
npm run build
```

This command will:
- Compile TypeScript to JavaScript
- Bundle and minify all assets
- Optimize images and CSS
- Generate a production-ready build in the `dist/` directory

### Preview Production Build

Test the production build locally:
```bash
npm run preview
```

### Deployment Options

#### Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)

**Netlify:**
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

**Vercel:**
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect the framework
3. Deploy

**GitHub Pages:**
```bash
npm install -g gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy
```

#### Option 2: Traditional Web Server (Apache, Nginx)

1. Build the application:
```bash
npm run build
```

2. Upload the `dist/` folder contents to your web server

3. **Nginx Configuration Example:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. **Apache Configuration Example (.htaccess):**
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

#### Option 3: Docker Deployment

1. Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Build and run:
```bash
docker build -t portfolio .
docker run -p 80:80 portfolio
```

## 📁 Project Structure

```
portfolio/
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Education.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── WorkExperience.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/
│       └── [shadcn components]
├── styles/
│   └── globals.css
├── App.tsx
└── README.md
```

## 🔧 Customization

### Update Personal Information

1. **Hero Section**: Edit `/components/Hero.tsx`
2. **About Section**: Edit `/components/About.tsx`
3. **Skills**: Edit `/components/Skills.tsx`
4. **Work Experience**: Edit `/components/WorkExperience.tsx`
5. **Education**: Edit `/components/Education.tsx`
6. **Projects**: Edit `/components/Projects.tsx`
7. **Contact Info**: Edit `/components/Contact.tsx` and `/components/Footer.tsx`

### Update Styling

- Global styles: `/styles/globals.css`
- Tailwind configuration: Inline classes in components

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
