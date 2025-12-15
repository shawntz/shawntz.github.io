# Talks & Presentations Assets

This directory contains PDFs and images for your conference talks and poster presentations.

## Directory Structure

```
/public/talks/
├── README.md                          # This file
├── *.pdf                             # Your poster PDFs and slide decks
└── photos/                           # Conference photos
    └── *.jpg                         # Photos of you presenting
```

## How to Add Your Content

### 1. Add PDF Files

Place your poster PDFs and slide decks directly in `/public/talks/`:

- `bci-poster-sna2024.pdf`
- `neurips-2023-slides.pdf`
- `cogsci-2023-vr-motor-learning.pdf`
- etc.

These will be accessible at `/talks/your-filename.pdf`

### 2. Add Conference Photos

Place photos of you presenting in `/public/talks/photos/`:

- `sna2024-presenting.jpg`
- `neurips2023-stage.jpg`
- `cogsci2023-sydney.jpg`
- etc.

These will be accessible at `/talks/photos/your-photo.jpg`

### 3. Update the Data in talks.astro

Edit `/src/pages/talks.astro` and update the `talks` array with your actual data:

```typescript
const talks = [
  {
    title: 'Your Talk Title',
    event: 'Conference Name',
    date: '2024-11-08', // ISO date format
    location: 'City, State/Country',
    type: 'poster', // or 'talk', 'keynote', 'workshop'
    abstract: 'Your abstract text here...',
    image: '/talks/poster-thumb.jpg', // Optional thumbnail
    pdfUrl: '/talks/your-poster.pdf', // Your PDF file
    slidesUrl: 'https://...', // Optional external slides link
    tags: ['Tag1', 'Tag2', 'Tag3'],
    photos: [
      {
        url: '/talks/photos/your-photo.jpg',
        caption: 'Caption describing the photo',
        date: 'Month Day, Year'
      }
    ]
  },
  // Add more talks...
];
```

## Tips

- Keep file names lowercase and use hyphens instead of spaces
- Optimize images for web (recommended max width: 1200px)
- Use JPG for photos, PNG for graphics/screenshots
- PDFs will be downloaded when users click the buttons
- You can also use external URLs for PDFs hosted elsewhere (Dropbox, Google Drive, etc.)
