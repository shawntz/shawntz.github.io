import {
  navigationConfig,
  type NavItem,
  type NavSubsection,
} from "./navigationConfig";

export interface SearchItem {
  type: "section" | "page" | "post" | "project" | "action";
  title: string;
  description?: string;
  href: string;
  icon?: string;
  keywords?: string[];
}

// Build comprehensive search index
export function buildSearchIndex(currentPath?: string): SearchItem[] {
  const items: SearchItem[] = [];

  // 1. Add current page sections (if on a page with subsections)
  const currentPage = navigationConfig.find((item) => {
    if (currentPath) {
      if (item.href === "/" && currentPath === "/") return true;
      if (item.href !== "/" && currentPath.startsWith(item.href)) return true;
    }
    return false;
  });

  if (currentPage && currentPage.subsections) {
    currentPage.subsections.forEach((subsection) => {
      items.push({
        type: "section",
        title: subsection.label,
        description: `Section on ${currentPage.label} page`,
        href: subsection.href,
        icon: getSectionIcon(subsection.label),
        keywords: [
          subsection.label.toLowerCase(),
          currentPage.label.toLowerCase(),
        ],
      });
    });
  }

  // 2. Add all navigation pages
  navigationConfig.forEach((navItem) => {
    items.push({
      type: "page",
      title: navItem.label,
      description: getPageDescription(navItem.href),
      href: navItem.href,
      icon: getPageIcon(navItem.label),
      keywords: [navItem.label.toLowerCase(), getPageKeywords(navItem.label)],
    });

    // Add subsections if they exist
    if (navItem.subsections) {
      navItem.subsections.forEach((subsection) => {
        items.push({
          type: "section",
          title: `${navItem.label} - ${subsection.label}`,
          description: `Jump to ${subsection.label} section`,
          href: subsection.href,
          icon: getSectionIcon(subsection.label),
          keywords: [
            subsection.label.toLowerCase(),
            navItem.label.toLowerCase(),
          ],
        });
      });
    }
  });

  // 3. Add quick actions
  items.push({
    type: "action",
    title: "Contact me",
    description: "Send an email",
    href: "mailto:shawn@schwartz.so",
    icon: "📧",
    keywords: ["contact", "email", "reach", "message"],
  });

  items.push({
    type: "action",
    title: "Download Resume",
    description: "Download my CV/resume",
    href: "/resume.pdf",
    icon: "📥",
    keywords: ["resume", "cv", "download", "pdf"],
  });

  items.push({
    type: "action",
    title: "View on GitHub",
    description: "See my GitHub profile",
    href: "https://github.com/shawnschwartz",
    icon: "⚡",
    keywords: ["github", "code", "projects", "source"],
  });

  items.push({
    type: "action",
    title: "Follow on Twitter",
    description: "Connect on Twitter/X",
    href: "https://twitter.com/shawnschwartz_",
    icon: "🐦",
    keywords: ["twitter", "x", "social", "follow"],
  });

  return items;
}

// Helper functions
function getPageDescription(href: string): string {
  const descriptions: Record<string, string> = {
    "/": "Homepage - Overview and highlights",
    "/apps": "macOS menu bar applications",
    "/experience": "Work experience and roles",
    "/publications": "Research publications and papers",
    "/talks": "Conference talks and presentations",
    "/projects": "Personal and open source projects",
    "/photography": "Photography portfolio",
    "/blog": "Articles and blog posts",
    "/interests": "Music, books, and inspiration",
  };
  return descriptions[href] || "";
}

function getPageIcon(label: string): string {
  const icons: Record<string, string> = {
    Home: "🏡",
    Apps: "📱",
    Work: "💼",
    Research: "🔬",
    Talks: "🎙️",
    Projects: "🚀",
    Photography: "📸",
    Blog: "✍️",
    Interests: "🎨",
  };
  return icons[label] || "📄";
}

function getSectionIcon(sectionLabel: string): string {
  const icons: Record<string, string> = {
    // Home sections
    Overview: "👋",
    About: "👤",
    Work: "💻",
    Contact: "📬",
    // Blog sections
    Latest: "🆕",
    Tags: "🏷️",
    Newsletter: "📮",
    // Interests sections
    Music: "🎵",
    Books: "📚",
    Boards: "📌",
  };
  return icons[sectionLabel] || "📍";
}

function getPageKeywords(label: string): string {
  const keywords: Record<string, string> = {
    Home: "start main overview",
    Apps: "menubar applications utilities",
    Work: "experience career jobs employment",
    Research: "papers publications academic science",
    Talks: "presentations speaking conferences",
    Projects: "code github open source",
    Photography: "photos images gallery",
    Blog: "articles posts writing",
    Interests: "music books boards pinterest spotify",
  };
  return keywords[label] || "";
}
