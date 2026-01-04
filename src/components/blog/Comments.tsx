"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface CommentsProps {
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
}

export function Comments({
  repo = "shawntz/shawntz.github.io",
  repoId = "MDEwOlJlcG9zaXRvcnkzNjcxODUzODc=",
  category = "Blog",
  categoryId = "DIC_kwDOFeLN684CzRPN",
}: CommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!ref.current || !repoId || !categoryId) return;

    const theme = resolvedTheme === "dark" ? "dark_tritanopia" : "light_tritanopia";

    // Remove existing iframe if any
    const existingScript = ref.current.querySelector("script");
    if (existingScript) {
      existingScript.remove();
    }
    const existingIframe = ref.current.querySelector("iframe");
    if (existingIframe) {
      existingIframe.remove();
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "1");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    ref.current.appendChild(script);
  }, [repo, repoId, category, categoryId, resolvedTheme]);

  if (!repoId || !categoryId) {
    return null;
  }

  return (
    <div className="mt-16 pt-12 border-t border-border-light">
      <h3 className="text-xl font-semibold mb-6">Comments</h3>
      <div ref={ref} />
    </div>
  );
}
