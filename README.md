# shawnschwartz.com

Personal portfolio and blog built with [Astro](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
/
├── public/
│   ├── favicon.svg
│   └── visualizations/     # Visualization assets
├── src/
│   ├── components/         # Astro components
│   ├── content/
│   │   └── blog/          # MDX blog posts
│   ├── layouts/           # Page layouts
│   ├── pages/             # Route pages
│   └── styles/            # Global CSS
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## ✍️ Adding Blog Posts

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "A brief description"
pubDate: 2024-12-01
tags: ["Tag1", "Tag2"]
readTime: "5 min read"
featured: true # Optional: feature on homepage
---

Your content here...
```

## 🎨 Design System

### Colors

- **Void**: Deep dark background (`#05080f`)
- **Spark**: Warm amber accent (`#f59e0b`)
- **Signal**: Cool cyan accent (`#06b6d4`)
- **Pulse**: Purple highlight (`#a855f7`)

### Typography

- **Display**: Instrument Serif (headings)
- **Sans**: System sans-serif (body)
- **Mono**: JetBrains Mono (code)

## 📦 Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [MDX](https://mdxjs.com/) - Markdown with components
- TypeScript - Type safety

## 🔧 Customization

### Update Personal Info

1. Edit social links in `src/components/Navigation.astro` and `src/components/Footer.astro`
2. Update email address throughout components
3. Modify bio text in `src/components/About.astro`

### Add Publications

Edit the `publications` array in `src/pages/publications.astro`

### Add Experience

Edit the `experiences` array in `src/pages/experience.astro`

### Add Visualizations

Edit the `visualizations` array in `src/pages/visualizations.astro`

## 📄 License

MIT License - feel free to use this template for your own portfolio!
