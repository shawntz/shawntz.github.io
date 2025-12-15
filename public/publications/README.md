# Publications PDFs

This directory contains PDF files of your research publications.

## Directory Structure

```
/public/publications/
├── README.md                                    # This file
└── *.pdf                                        # Your publication PDFs
```

## Adding Publication PDFs

1. **Place PDF files in this directory:**
   - Example: `schwartz-2024-vr-motor-learning.pdf`
   - Keep filenames lowercase with hyphens
   - Use descriptive names: `{lastname}-{year}-{short-title}.pdf`

2. **Update the publications data in `/src/pages/publications.astro`:**

```typescript
{
  title: 'Your Paper Title',
  authors: ['Schwartz, S.', 'Co-Author, J.'],
  journal: 'Journal Name',
  year: 2024,
  doi: '10.xxxx/xxxxx',
  type: 'journal',
  tags: ['Tag1', 'Tag2'],
  abstract: 'Your abstract...',
  citations: 45,
  pdfUrl: '/publications/your-filename.pdf' // Add this line
}
```

3. **The PDF viewer will automatically appear** on the publications page with a "View PDF" button

## File Size Recommendations

- Keep PDFs under 10MB for best performance
- Compress PDFs using tools like:
  - Adobe Acrobat (Save As > Reduced Size PDF)
  - Online tools like smallpdf.com
  - Command line: `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf`

## Notes

- PDFs are served from the `/public` directory and will be accessible at `/publications/filename.pdf`
- The beautiful modal PDF viewer is automatically integrated
- Users can view, download, or open PDFs in a new tab
- Mobile users get optimized download options
