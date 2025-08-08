import { getCollection } from 'astro:content';

export interface BibtexEntry {
  type: string;
  key: string;
  title: string;
  author: string;
  journal?: string;
  year: string;
  volume?: string;
  number?: string;
  pages?: string;
  doi?: string;
  url?: string;
  abstract?: string;
}

export function formatAuthorForBibtex(authorHtml: string): string {
  // Remove HTML tags and format for BibTeX
  return authorHtml
    .replace(/<strong>/g, '')
    .replace(/<\/strong>/g, '')
    .replace(/&/g, 'and')
    .trim();
}

export function extractVolumeNumber(pages: string): { volume?: string, number?: string, pages?: string } {
  // Extract volume and number from pages like "<em>38</em>(1), 30-48"
  const volumeMatch = pages.match(/<em>(\d+)<\/em>/);
  const numberMatch = pages.match(/\((\d+)\)/);
  const pagesMatch = pages.match(/(\d+[-–]\d+)/);
  
  return {
    volume: volumeMatch ? volumeMatch[1] : undefined,
    number: numberMatch ? numberMatch[1] : undefined,
    pages: pagesMatch ? pagesMatch[1] : undefined
  };
}

export function generateBibtexKey(author: string, year: string, title: string): string {
  // Extract first author's last name
  const firstAuthor = author.split(',')[0].trim();
  const lastName = firstAuthor.split(' ').pop() || 'Unknown';
  
  // Extract first meaningful word from title
  const titleWords = title
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => word.length > 3 && !['the', 'and', 'for', 'with', 'from'].includes(word.toLowerCase()));
  
  const titleWord = titleWords[0] || 'Paper';
  
  return `${lastName.toLowerCase()}${year}${titleWord.toLowerCase()}`;
}

export async function generateBibtexFromPubs(): Promise<string> {
  const pubs = await getCollection('pubs');
  
  const bibtexEntries = pubs.map(pub => {
    const { volume, number, pages } = extractVolumeNumber(pub.data.pages || '');
    const author = formatAuthorForBibtex(pub.data.authors);
    const year = pub.data.pubDate.getFullYear().toString();
    const key = generateBibtexKey(author, year, pub.data.title);
    
    let bibtex = `@article{${key},\n`;
    bibtex += `  title = {${pub.data.title}},\n`;
    bibtex += `  author = {${author}},\n`;
    bibtex += `  journal = {${pub.data.journal}},\n`;
    bibtex += `  year = {${year}},\n`;
    
    if (volume) bibtex += `  volume = {${volume}},\n`;
    if (number) bibtex += `  number = {${number}},\n`;
    if (pages) bibtex += `  pages = {${pages}},\n`;
    if (pub.data.doi) bibtex += `  doi = {${pub.data.doi.replace('https://doi.org/', '')}},\n`;
    if (pub.data.pdf) bibtex += `  url = {${pub.data.pdf}},\n`;
    
    bibtex += `  publisher = {${getPublisher(pub.data.journal)}}\n`;
    bibtex += `}`;
    
    return bibtex;
  });
  
  return bibtexEntries.join('\n\n');
}

function getPublisher(journal: string): string {
  const publisherMap: Record<string, string> = {
    'Psychology and Aging': 'American Psychological Association',
    'Journal of Cognitive Neuroscience': 'MIT Press',
    'NeuroImage': 'Elsevier',
    'Psychonomic Bulletin & Review': 'Springer',
    'Memory & Cognition': 'Springer',
    'Journal of Experimental Psychology: Learning, Memory, and Cognition': 'American Psychological Association',
    'Neuropsychologia': 'Elsevier',
    'Cognitive, Affective, & Behavioral Neuroscience': 'Springer'
  };
  
  return publisherMap[journal] || 'Academic Publisher';
}

export function downloadBibtex(bibtexContent: string, filename: string = 'publications.bib') {
  const blob = new Blob([bibtexContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}