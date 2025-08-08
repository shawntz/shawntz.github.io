export function calculateReadingTime(content: string): { 
  minutes: number; 
  words: number; 
  text: string 
} {
  // Remove HTML tags and markdown syntax for accurate word count
  const cleanContent = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/```[\s\S]*?```/g, ' ') // Remove code blocks
    .replace(/`[^`]*`/g, ' ') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace markdown links with just text
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  const words = cleanContent.split(' ').filter(word => word.length > 0).length;
  
  // Average reading speed is 200-250 words per minute
  // Using 225 as a middle ground
  const minutes = Math.max(1, Math.ceil(words / 225));
  
  const text = `${minutes} min read • ${words.toLocaleString()} words`;
  
  return {
    minutes,
    words,
    text
  };
}

export function generateStructuredData(post: {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
  slug: string;
  author?: string;
  tags?: string[];
}) {
  const baseUrl = 'https://shawnschwartz.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.heroImage ? `${baseUrl}${post.heroImage}` : `${baseUrl}/shawn.jpg`,
    author: {
      '@type': 'Person',
      name: post.author || 'Shawn Schwartz',
      url: baseUrl,
      sameAs: [
        'https://twitter.com/shawntschwartz',
        'https://github.com/shawntschwartz',
        'https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID', // Replace with actual
        'https://www.linkedin.com/in/shawntschwartz/',
        'https://orcid.org/0000-0003-2436-8651'
      ]
    },
    publisher: {
      '@type': 'Person',
      name: 'Shawn Schwartz',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/shawn.jpg`
      }
    },
    datePublished: post.pubDate.toISOString(),
    dateModified: (post.updatedDate || post.pubDate).toISOString(),
    url: `${baseUrl}/blog/${post.slug}/`,
    mainEntityOfPage: `${baseUrl}/blog/${post.slug}/`,
    keywords: post.tags?.join(', ') || 'neuroscience, psychology, data science, research',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    genre: ['Academic', 'Research', 'Technology'],
    about: {
      '@type': 'Thing',
      name: 'Cognitive Neuroscience and Data Science'
    }
  };
}