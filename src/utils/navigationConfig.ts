export interface NavSubsection {
  label: string;
  href: string;
  id: string;
}

export interface NavItem {
  label: string;
  href: string;
  subsections?: NavSubsection[];
}

export const navigationConfig: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    subsections: [
      { label: 'Overview', href: '/#overview', id: 'overview' },
      { label: 'About', href: '/#about', id: 'about' },
      { label: 'Work', href: '/#work', id: 'work' },
      { label: 'Contact', href: '/#contact', id: 'contact' }
    ]
  },
  { label: 'Apps', href: '/apps' },
  { label: 'Work', href: '/experience' },
  { label: 'Research', href: '/publications' },
  { label: 'Talks', href: '/talks' },
  { label: 'Projects', href: '/projects' },
  { label: 'Photography', href: '/photography' },
  {
    label: 'Blog',
    href: '/blog',
    subsections: [
      { label: 'Latest', href: '/blog#latest', id: 'latest' },
      { label: 'Tags', href: '/blog#tags', id: 'tags' },
      { label: 'Newsletter', href: '/blog#newsletter', id: 'newsletter' }
    ]
  },
  {
    label: 'Interests',
    href: '/interests',
    subsections: [
      { label: 'Music', href: '/interests#music', id: 'music' },
      { label: 'Books', href: '/interests#books', id: 'books' },
      { label: 'Boards', href: '/interests#pinterest', id: 'pinterest' }
    ]
  }
];

// Helper function to get current page config
export function getCurrentPageConfig(pathname: string): NavItem | undefined {
  return navigationConfig.find(item => {
    if (item.href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(item.href);
  });
}

// Helper function to check if a page has subsections
export function hasSubsections(pathname: string): boolean {
  const pageConfig = getCurrentPageConfig(pathname);
  return !!(pageConfig && pageConfig.subsections && pageConfig.subsections.length > 0);
}
