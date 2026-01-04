export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shawn Schwartz",
    url: "https://shawnschwartz.com",
    image: "https://shawnschwartz.com/images/shawn/shawn_sf_ggb_square_web.png",
    sameAs: [
      "https://github.com/shawntz",
      "https://linkedin.com/in/shawnts",
      "https://bsky.app/profile/shawnschwartz.bsky.social",
      "https://scholar.google.com/citations?user=xII63_wAAAAJ",
    ],
    jobTitle: "Software Engineer & Researcher",
    alumniOf: {
      "@type": "Organization",
      name: "Stanford University",
    },
    knowsAbout: [
      "Software Engineering",
      "Data Science",
      "Neuroscience",
      "Machine Learning",
      "Cognitive Psychology",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shawn Schwartz",
    url: "https://shawnschwartz.com",
    description:
      "Personal website of Shawn Schwartz - software engineer and researcher sharing insights on programming, research, and technology.",
    author: {
      "@type": "Person",
      name: "Shawn Schwartz",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
}

export function ArticleJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  url,
  image,
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    url,
    image: image || "https://shawnschwartz.com/opengraph-image",
    author: {
      "@type": "Person",
      name: "Shawn Schwartz",
      url: "https://shawnschwartz.com",
    },
    publisher: {
      "@type": "Person",
      name: "Shawn Schwartz",
      url: "https://shawnschwartz.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ScholarlyArticleJsonLdProps {
  title: string;
  description: string;
  datePublished: string;
  authors: string[];
  url: string;
  doi?: string;
  journal?: string;
  conference?: string;
}

export function ScholarlyArticleJsonLd({
  title,
  description,
  datePublished,
  authors,
  url,
  doi,
  journal,
  conference,
}: ScholarlyArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: title,
    description,
    datePublished,
    url,
    author: authors.map((name) => ({
      "@type": "Person",
      name,
    })),
    ...(doi && { identifier: { "@type": "PropertyValue", propertyID: "DOI", value: doi } }),
    ...(journal && { isPartOf: { "@type": "Periodical", name: journal } }),
    ...(conference && { isPartOf: { "@type": "Event", name: conference } }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
