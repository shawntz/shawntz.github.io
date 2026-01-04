"use client";

import { createContext, useContext, useRef, useState, useEffect, ReactNode } from "react";

// Reference type supporting various publication types
export interface Reference {
  id: string;
  authors: string;
  year: string | number;
  title: string;
  journal?: string;
  volume?: string | number;
  issue?: string | number;
  pages?: string;
  doi?: string;
  url?: string;
  publisher?: string;
  booktitle?: string; // For conference papers
  accessed?: string; // For web references
}

interface CitationContextType {
  registerReference: (ref: Reference) => void;
  getCitationNumber: (id: string) => number;
  getReferences: () => Map<string, Reference>;
  getCitationOrder: () => string[];
  subscribe: (callback: () => void) => () => void;
}

const CitationContext = createContext<CitationContextType | null>(null);

export function CitationProvider({ children }: { children: ReactNode }) {
  // Use refs for synchronous access to avoid duplicate entries
  const referencesRef = useRef<Map<string, Reference>>(new Map());
  const citationOrderRef = useRef<string[]>([]);
  const subscribersRef = useRef<Set<() => void>>(new Set());

  const registerReference = (ref: Reference) => {
    if (!referencesRef.current.has(ref.id)) {
      referencesRef.current.set(ref.id, ref);
    }
  };

  const getCitationNumber = (id: string) => {
    const currentOrder = citationOrderRef.current;
    const existingIndex = currentOrder.indexOf(id);

    if (existingIndex === -1) {
      // Add to order synchronously
      citationOrderRef.current = [...currentOrder, id];
      return currentOrder.length + 1;
    }
    return existingIndex + 1;
  };

  const getReferences = () => referencesRef.current;
  const getCitationOrder = () => citationOrderRef.current;

  const subscribe = (callback: () => void) => {
    subscribersRef.current.add(callback);
    return () => subscribersRef.current.delete(callback);
  };

  return (
    <CitationContext.Provider
      value={{ registerReference, getCitationNumber, getReferences, getCitationOrder, subscribe }}
    >
      {children}
    </CitationContext.Provider>
  );
}

function useCitations() {
  const context = useContext(CitationContext);
  if (!context) {
    throw new Error("useCitations must be used within a CitationProvider");
  }
  return context;
}

// Inline citation component
interface CiteProps {
  id: string;
  reference?: Reference;
  page?: string;
}

export function Cite({ id, reference, page }: CiteProps) {
  const { registerReference, getCitationNumber, getReferences } = useCitations();

  // Register reference if provided inline (only once)
  const registeredRef = useRef(false);
  if (reference && !registeredRef.current) {
    registerReference({ ...reference, id });
    registeredRef.current = true;
  }

  const citationNum = getCitationNumber(id);
  const ref = getReferences().get(id);
  const displayText = page ? `${citationNum}, p. ${page}` : citationNum;

  return (
    <sup className="inline-flex">
      <a
        href={`#ref-${id}`}
        className="text-accent hover:text-accent-hover transition-colors font-medium px-0.5"
        title={ref ? `${ref.authors} (${ref.year})` : id}
      >
        [{displayText}]
      </a>
    </sup>
  );
}

// Define a reference without citing it (useful for pre-registering references)
export function DefineReference({ reference }: { reference: Reference }) {
  const { registerReference } = useCitations();
  const registeredRef = useRef(false);

  if (!registeredRef.current) {
    registerReference(reference);
    registeredRef.current = true;
  }

  return null;
}

// Format a reference in APA-ish style
function formatReference(ref: Reference): ReactNode {
  const parts: ReactNode[] = [];

  // Authors and year
  parts.push(
    <span key="authors" className="text-foreground">
      {ref.authors} ({ref.year}).
    </span>
  );

  // Title
  if (ref.journal || ref.booktitle) {
    // Article or conference paper - title not italicized
    parts.push(
      <span key="title" className="text-foreground">
        {" "}{ref.title}.
      </span>
    );
  } else {
    // Book or standalone work - title italicized
    parts.push(
      <em key="title" className="text-foreground">
        {" "}{ref.title}.
      </em>
    );
  }

  // Journal or conference
  if (ref.journal) {
    parts.push(
      <em key="journal" className="text-foreground">
        {" "}{ref.journal}
      </em>
    );
    if (ref.volume) {
      parts.push(
        <span key="volume" className="text-foreground">
          , {ref.volume}
        </span>
      );
      if (ref.issue) {
        parts.push(
          <span key="issue" className="text-foreground">
            ({ref.issue})
          </span>
        );
      }
    }
    if (ref.pages) {
      parts.push(
        <span key="pages" className="text-foreground">
          , {ref.pages}
        </span>
      );
    }
    parts.push(<span key="period">.</span>);
  } else if (ref.booktitle) {
    parts.push(
      <span key="booktitle" className="text-foreground">
        {" "}In <em>{ref.booktitle}</em>
        {ref.pages && ` (pp. ${ref.pages})`}.
      </span>
    );
  }

  // Publisher
  if (ref.publisher) {
    parts.push(
      <span key="publisher" className="text-foreground">
        {" "}{ref.publisher}.
      </span>
    );
  }

  // DOI or URL
  if (ref.doi) {
    parts.push(
      <span key="doi" className="text-foreground-secondary">
        {" "}
        <a
          href={`https://doi.org/${ref.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover underline underline-offset-2"
        >
          https://doi.org/{ref.doi}
        </a>
      </span>
    );
  } else if (ref.url) {
    parts.push(
      <span key="url" className="text-foreground-secondary">
        {" "}Retrieved from{" "}
        <a
          href={ref.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover underline underline-offset-2 break-all"
        >
          {ref.url}
        </a>
        {ref.accessed && ` (accessed ${ref.accessed})`}
      </span>
    );
  }

  return <>{parts}</>;
}

// References section component
export function References() {
  const { getReferences, getCitationOrder } = useCitations();
  const [, forceUpdate] = useState(0);

  // Force a re-render after mount to ensure we have all citations
  useEffect(() => {
    forceUpdate((n) => n + 1);
  }, []);

  const references = getReferences();
  const citationOrder = getCitationOrder();

  if (citationOrder.length === 0) {
    return null;
  }

  // Deduplicate citation order (safety check)
  const uniqueOrder = [...new Set(citationOrder)];

  return (
    <section className="mt-12 pt-8 border-t border-border-light">
      <h2 className="text-xl font-semibold text-foreground mb-6">References</h2>
      <ol className="space-y-4 text-sm">
        {uniqueOrder.map((id, index) => {
          const ref = references.get(id);
          if (!ref) return null;

          return (
            <li
              key={id}
              id={`ref-${id}`}
              className="flex gap-3 text-foreground-secondary leading-relaxed scroll-mt-24"
            >
              <span className="text-foreground-tertiary font-medium flex-shrink-0">
                [{index + 1}]
              </span>
              <span>{formatReference(ref)}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

// Wrapper component that provides citation context
export function CitedContent({ children }: { children: ReactNode }) {
  return <CitationProvider>{children}</CitationProvider>;
}

// Simplified Ref component - define and cite in one step
// Usage: <Ref id="smith2024" authors="Smith, J." year={2024} title="Example Paper" journal="Nature" />
interface RefProps extends Omit<Reference, "id"> {
  id: string;
  page?: string;
}

export function Ref({ id, page, ...referenceProps }: RefProps) {
  return (
    <Cite
      id={id}
      reference={{ id, ...referenceProps }}
      page={page}
    />
  );
}
