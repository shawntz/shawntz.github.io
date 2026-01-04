"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

interface AuthorBioProps {
  substackUrl?: string;
}

export function AuthorBio({ substackUrl = "https://shawntz.substack.com" }: AuthorBioProps) {
  return (
    <div className="mt-16 pt-12 border-t border-border-light">
      {/* Author Section */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Link href="/about" className="flex-shrink-0">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            <Image
              src="/images/shawn/shawn_sf_ggb_square_web.png"
              alt="Shawn Schwartz"
              fill
              className="object-cover rounded-2xl shadow-lg"
            />
          </div>
        </Link>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground-tertiary uppercase tracking-wider mb-1">
            Written by
          </p>
          <Link href="/about">
            <h3 className="text-xl font-semibold text-foreground hover:text-accent transition-colors">
              Shawn Schwartz
            </h3>
          </Link>
          <p className="mt-2 text-foreground-secondary leading-relaxed">
            Software engineer, researcher, and lifelong learner. PhD from Stanford, Ex-Slack Data Science. Building tools at the intersection of technology and science.
          </p>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-surface border border-border-light">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-accent" />
              <h4 className="font-semibold text-foreground">Subscribe to my newsletter</h4>
            </div>
            <p className="text-sm text-foreground-secondary">
              Get notified when I publish new articles. No spam, unsubscribe anytime.
            </p>
          </div>
          <a
            href={substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors whitespace-nowrap"
          >
            Subscribe on Substack
          </a>
        </div>
      </div>
    </div>
  );
}
