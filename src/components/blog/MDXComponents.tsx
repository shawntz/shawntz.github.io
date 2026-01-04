import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { Cite, References, DefineReference, CitedContent, Ref } from "./Citations";
import type { Reference } from "./Citations";

interface CalloutProps {
  type?: "info" | "warning" | "error" | "success";
  children: React.ReactNode;
}

function Callout({ type = "info", children }: CalloutProps) {
  const styles = {
    info: "bg-accent/10 border-accent text-accent",
    warning: "bg-yellow-500/10 border-yellow-500 text-yellow-600 dark:text-yellow-400",
    error: "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400",
    success: "bg-green-500/10 border-green-500 text-green-600 dark:text-green-400",
  };

  return (
    <div className={`my-6 rounded-lg border-l-4 p-4 ${styles[type]}`}>
      {children}
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="mt-10 mb-4 text-3xl font-bold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-foreground border-b border-border-light pb-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-6 mb-2 text-lg font-medium text-foreground" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="my-4 leading-7 text-foreground" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-accent hover:text-accent-hover underline underline-offset-4"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:text-accent-hover underline underline-offset-4"
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-accent pl-4 italic text-foreground-secondary"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-border-light" />,
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-border-light bg-surface px-4 py-2 text-left font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-border-light px-4 py-2" {...props}>
      {children}
    </td>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl bg-[#0d1117] p-4 text-sm leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }) => {
    // Check if this is inline code (not inside a pre block)
    // rehype-pretty-code adds data attributes to code blocks
    const isInlineCode = !("data-language" in props);

    if (isInlineCode) {
      return (
        <code
          className="rounded bg-code-bg px-1.5 py-0.5 font-mono text-sm text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }

    // For code blocks, let rehype-pretty-code handle the styling
    return <code {...props}>{children}</code>;
  },
  img: ({ src, alt }) => (
    <span className="block my-6">
      <Image
        src={typeof src === "string" ? src : ""}
        alt={alt || ""}
        width={800}
        height={450}
        className="rounded-lg border border-border-light"
      />
    </span>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  Callout,
  // Citation components
  Cite,
  Ref,
  References,
  DefineReference,
  CitedContent,
};
