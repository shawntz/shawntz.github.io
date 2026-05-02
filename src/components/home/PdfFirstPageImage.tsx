"use client";

import { useEffect, useState } from "react";

let workerConfigured = false;

async function configureWorker(pdfjs: typeof import("pdfjs-dist")) {
  if (workerConfigured) return;
  pdfjs.GlobalWorkerOptions.workerSrc =
    /* global worker — version must match bundled pdfjs-dist */
    `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  workerConfigured = true;
}

interface PdfFirstPageImageProps {
  pdfUrl: string;
  alt: string;
  className?: string;
  /** Tighter raster width for thumbnails in compact layouts */
  compact?: boolean;
}

/**
 * Renders page 1 of a PDF to a PNG data URL in the browser (pdf.js).
 */
export function PdfFirstPageImage({
  pdfUrl,
  alt,
  className,
  compact = false,
}: PdfFirstPageImageProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const pdfjs = await import("pdfjs-dist");
        await configureWorker(pdfjs);

        const docUrl =
          pdfUrl.startsWith("http://") || pdfUrl.startsWith("https://")
            ? pdfUrl
            : `${window.location.origin}${pdfUrl.startsWith("/") ? "" : "/"}${pdfUrl}`;

        const task = pdfjs.getDocument({ url: docUrl, withCredentials: false });
        const pdf = await task.promise;
        const page = await pdf.getPage(1);
        const baseViewport = page.getViewport({ scale: 1 });

        const cssTargetWidth = compact ? 480 : 720;
        const pixelRatio = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2);
        const scale = (cssTargetWidth / baseViewport.width) * pixelRatio;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) {
          throw new Error("2d context unavailable");
        }

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        await page
          .render({
            canvasContext: ctx,
            viewport,
            canvas,
          })
          .promise;

        const url = canvas.toDataURL("image/png");
        if (!cancelled) {
          setDataUrl(url);
        }
      } catch {
        if (!cancelled) {
          setFailed(true);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl, compact]);

  if (failed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center bg-surface px-4 text-center text-foreground-tertiary text-sm ${
          compact ? "min-h-36" : "min-h-[280px]"
        } ${className ?? ""}`}
        role="img"
        aria-label={alt}
      >
        PDF preview unavailable
      </div>
    );
  }

  if (!dataUrl) {
    return (
      <div
        className={`shrink-0 animate-pulse bg-gradient-to-br from-accent/15 via-surface to-surface ${compact ? "min-h-36 min-w-[140px]" : "min-h-[280px]"}`}
        aria-hidden
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element -- data URL from canvas; not a static import
  return <img src={dataUrl} alt={alt} className={className} />;
}
