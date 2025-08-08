import fs from 'fs';
import path from 'path';

export function getLatestCvPdfPath(): string | null {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const files = fs.readdirSync(publicDir);
    
    // Find all CV PDF files with the new date pattern
    const cvPdfFiles = files.filter(file => 
      file.match(/^cv-stschwartz-\d{8}\.pdf$/)
    );
    
    if (cvPdfFiles.length === 0) {
      return null;
    }
    
    // Sort by filename (which includes date) to get the latest
    cvPdfFiles.sort().reverse();
    
    return `/${cvPdfFiles[0]}`;
  } catch (error) {
    console.warn('Could not find CV PDF:', error);
    return null;
  }
}