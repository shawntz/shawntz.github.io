"use client";

import Link from "next/link";
import { Home } from "lucide-react";

function Face404({ faceColor = "currentColor" }: { faceColor?: string }) {
  return (
    <div className="flex items-center justify-center">
      <style>{`
        @keyframes eye-lid {
          from, 40%, 45%, to {
            transform: translateY(0);
          }
          42.5% {
            transform: translateY(17.5px);
          }
        }
        @keyframes eyes {
          from {
            transform: translateY(112.5px);
          }
          to {
            transform: translateY(15px);
          }
        }
        @keyframes pupil {
          from, 37.5%, 40%, 45%, 87.5%, to {
            stroke-dashoffset: 0;
            transform: translate(0, 0);
          }
          12.5%, 25%, 62.5%, 75% {
            stroke-dashoffset: 0;
            transform: translate(-35px, 0);
          }
          42.5% {
            stroke-dashoffset: 35;
            transform: translate(0, 17.5px);
          }
        }
        @keyframes mouth-left {
          from, 50% {
            stroke-dashoffset: -102;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes mouth-right {
          from, 50% {
            stroke-dashoffset: 102;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes nose {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(0, 22.5px);
          }
        }
        .face__eyes {
          animation: eyes 1s 0.3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .face__eye-lid {
          animation: eye-lid 4s 1.3s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        .face__pupil {
          animation: pupil 4s 1.3s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        .face__mouth-left {
          animation: mouth-left 1s 0.3s cubic-bezier(0.33, 1, 0.68, 1) forwards;
        }
        .face__mouth-right {
          animation: mouth-right 1s 0.3s cubic-bezier(0.33, 1, 0.68, 1) forwards;
        }
        .face__nose {
          animation: nose 1s 0.3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
      `}</style>
      <svg
        className="face"
        viewBox="0 0 320 380"
        width="320"
        height="380"
        aria-label="A 404 becomes a face, looks to the sides, and blinks"
      >
        <g
          fill="none"
          stroke={faceColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="25"
        >
          <g className="face__eyes" transform="translate(0, 112.5)">
            <g transform="translate(15, 0)">
              <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
              <polyline
                className="face__pupil"
                points="55,120 55,155"
                strokeDasharray="35 35"
              />
            </g>
            <g transform="translate(230, 0)">
              <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
              <polyline
                className="face__pupil"
                points="55,120 55,155"
                strokeDasharray="35 35"
              />
            </g>
          </g>
          <rect
            className="face__nose"
            rx="4"
            ry="4"
            x="132.5"
            y="112.5"
            width="55"
            height="155"
          />
          <g strokeDasharray="102 102" transform="translate(65, 334)">
            <path
              className="face__mouth-left"
              d="M 0 30 C 0 30 40 0 95 0"
              strokeDashoffset="-102"
            />
            <path
              className="face__mouth-right"
              d="M 95 0 C 150 0 190 30 190 30"
              strokeDashoffset="102"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-16">
      <div className="text-foreground">
        <Face404 />
      </div>

      <h1 className="mt-8 text-3xl font-semibold text-foreground">Page not found</h1>
      <p className="mt-4 text-foreground-secondary text-center max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-white font-medium hover:bg-accent-hover transition-colors"
      >
        <Home className="w-4 h-4" />
        Back to home
      </Link>
    </div>
  );
}
