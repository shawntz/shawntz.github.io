# PDFViewer Component

A beautiful, reusable PDF viewer component that seamlessly integrates across your entire site.

## Features

- 🎨 **Beautiful Design** - Matches your site's design system with glass morphism effects
- 📱 **Responsive** - Optimized for both desktop (modal viewer) and mobile (direct download)
- ⚡ **Fast Loading** - Loading states and smooth transitions
- ⌨️ **Keyboard Shortcuts** - Press ESC to close the modal
- 🎯 **Flexible** - Two modes: modal popup or inline embed
- 🔒 **Accessible** - ARIA labels and keyboard navigation
- 🌓 **Dark Mode Ready** - Automatic dark mode support

## Usage

### Basic Modal Viewer (Default)

The most common usage - displays a button that opens a beautiful modal viewer:

```astro
---
import PDFViewer from '../components/PDFViewer.astro';
---

<PDFViewer
  pdfUrl="/path/to/your-file.pdf"
  title="Document Title"
/>
```

### Custom Button Text & Style

```astro
<PDFViewer
  pdfUrl="/resume/shawn-schwartz-resume.pdf"
  title="Shawn Schwartz - Resume"
  buttonText="Download Resume"
  buttonStyle="primary"
/>
```

**Button Styles:**
- `primary` - Green background (accent color)
- `secondary` - Border with transparent background (default)
- `ghost` - No border, transparent background

### Inline PDF Embed

For embedding PDFs directly in the page content:

```astro
<PDFViewer
  pdfUrl="/publications/paper.pdf"
  title="Research Paper"
  inline={true}
  height="800px"
/>
```

## Real-World Examples

### 1. Publications Page

```astro
---
import PDFViewer from '../components/PDFViewer.astro';

const publications = [
  {
    title: 'My Research Paper',
    pdfUrl: '/publications/schwartz-2024-research.pdf',
    // ... other fields
  }
];
---

{publications.map((pub) => (
  <article>
    <h2>{pub.title}</h2>
    {pub.pdfUrl && (
      <PDFViewer
        pdfUrl={pub.pdfUrl}
        title={pub.title}
        buttonText="View PDF"
        buttonStyle="primary"
      />
    )}
  </article>
))}
```

### 2. Resume/CV Page

```astro
---
import Layout from '../layouts/Layout.astro';
import PDFViewer from '../components/PDFViewer.astro';
---

<Layout title="Resume">
  <section>
    <h1>Resume</h1>
    <p>View or download my resume below:</p>

    <div class="flex gap-4">
      <PDFViewer
        pdfUrl="/resume/shawn-schwartz-resume.pdf"
        title="Shawn Schwartz - Resume"
        buttonText="View Resume"
        buttonStyle="primary"
      />

      <PDFViewer
        pdfUrl="/resume/shawn-schwartz-cv.pdf"
        title="Shawn Schwartz - Curriculum Vitae"
        buttonText="View Full CV"
        buttonStyle="secondary"
      />
    </div>
  </section>
</Layout>
```

### 3. Inline Documentation Embed

```astro
<section>
  <h2>Technical Documentation</h2>

  <PDFViewer
    pdfUrl="/docs/api-documentation.pdf"
    title="API Documentation"
    inline={true}
    height="600px"
  />
</section>
```

### 4. Conference Talks/Posters

```astro
<PDFViewer
  pdfUrl="/talks/neurips-2023-poster.pdf"
  title="Deep Learning for Neuroimaging - NeurIPS 2023"
  buttonText="View Poster"
  buttonStyle="primary"
/>
```

### 5. Portfolio Work Samples

```astro
<div class="work-samples">
  {samples.map((sample) => (
    <div class="sample-card">
      <h3>{sample.title}</h3>
      <PDFViewer
        pdfUrl={sample.pdfUrl}
        title={sample.title}
        buttonText="View Sample"
        buttonStyle="ghost"
      />
    </div>
  ))}
</div>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pdfUrl` | `string` | **Required** | Path to the PDF file (relative or absolute URL) |
| `title` | `string` | **Required** | Title displayed in the viewer header |
| `buttonText` | `string` | `"View PDF"` | Text shown on the trigger button |
| `buttonStyle` | `'primary' \| 'secondary' \| 'ghost'` | `'secondary'` | Button appearance style |
| `inline` | `boolean` | `false` | If true, embeds PDF inline instead of modal |
| `height` | `string` | `'600px'` | Height of inline embed (only used when inline=true) |

## File Organization

### Recommended Directory Structure

```
/public/
├── publications/        # Research papers
│   └── *.pdf
├── talks/              # Conference presentations
│   └── *.pdf
├── resume/             # Resume/CV
│   └── *.pdf
├── docs/               # Documentation
│   └── *.pdf
└── portfolio/          # Work samples
    └── *.pdf
```

### File Paths

- **Public files** (in `/public/`): Use `/path/to/file.pdf`
- **External URLs**: Use full URL `https://example.com/file.pdf`

## Styling Customization

The component uses CSS custom properties from your global theme:

```css
/* Key variables used */
--surface-elevated      /* Modal background */
--surface-secondary     /* Header background */
--surface-tertiary      /* Loading background */
--ink-primary           /* Title text */
--ink-secondary         /* Secondary text */
--accent-primary        /* Buttons, hover states */
--border-subtle         /* Borders */
```

To customize further, edit `/src/components/PDFViewer.astro`.

## Browser Compatibility

- ✅ **Chrome/Edge**: Full support with native PDF viewer
- ✅ **Firefox**: Full support with native PDF viewer
- ✅ **Safari**: Full support with native PDF viewer
- ✅ **Mobile**: Optimized with download fallbacks
- ℹ️ **IE**: Not supported (site likely doesn't support IE anyway)

## Performance Tips

1. **Compress PDFs**: Keep files under 10MB
   ```bash
   # Using Ghostscript
   gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
      -dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf
   ```

2. **Lazy Loading**: The iframe uses `loading="lazy"` for inline embeds

3. **Serve from CDN**: For production, consider serving PDFs from a CDN

## Accessibility

- Keyboard navigation (ESC to close modal)
- ARIA labels on buttons
- Semantic HTML structure
- Focus management for modal
- High contrast support

## Advanced: Multiple PDFs on One Page

The modal viewer is shared across all PDF buttons on a page:

```astro
<div class="pdf-gallery">
  <PDFViewer pdfUrl="/doc1.pdf" title="Document 1" />
  <PDFViewer pdfUrl="/doc2.pdf" title="Document 2" />
  <PDFViewer pdfUrl="/doc3.pdf" title="Document 3" />
</div>
```

Each button will open its respective PDF in the same beautiful modal.

## Troubleshooting

### PDF not loading
- Check the file path is correct
- Ensure the PDF is in the `/public/` directory
- Check browser console for errors

### Modal not closing
- Ensure JavaScript is enabled
- Check for conflicting event listeners
- Try pressing ESC key

### Styling issues
- Verify CSS custom properties are defined
- Check for conflicting global styles
- Ensure component is imported correctly

## Support

For issues or questions about this component, see the main project documentation.
