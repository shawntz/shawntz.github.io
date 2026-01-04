"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const selectedProjects = [
  { name: "Project Alpha", href: "/projects" },
  { name: "DevTools CLI", href: "/projects/cli-tool" },
  { name: "Portfolio Site", href: "/projects/portfolio-site" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/in/shawnts" },
  { name: "Bluesky", href: "https://bsky.app/profile/shawnschwartz.bsky.social" },
  { name: "GitHub", href: "https://github.com/shawntz" },
  { name: "Google Scholar", href: "https://scholar.google.com/citations?user=xII63_wAAAAJ&hl=en&oi=ao" },
];

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const email = "hey@shawnschwartz.com";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
    >
      {email}
      {copied ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <Copy className="h-4 w-4 opacity-60" />
      )}
    </button>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-white overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[420px_1fr]">
          {/* Left column - Info + Memoji */}
          <div className="relative px-4 sm:px-6 lg:px-0 flex flex-col items-center lg:items-start">
            {/* Name and description - positioned above memoji */}
            <div className="relative z-10 pt-2 text-center lg:text-left">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-white">
                Shawn Schwartz
              </h2>
              <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-[280px]">
                Senior Data Scientist & Engineer, currently finishing my PhD at Stanford.
              </p>
            </div>

            {/* Memoji - positioned below the text */}
            <div className="mt-4 w-64 sm:w-72 md:w-80 lg:w-96 lg:-ml-8">
              <Image
                src="/images/shawn/shawn-moji.webp"
                alt="Shawn Schwartz Memoji"
                width={320}
                height={320}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right column - CTA + Links */}
          <div className="flex flex-col justify-between">
            {/* CTA */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-light text-white/90 leading-snug">
                Think I&apos;d be a good fit for your team or project?
                <br />
                <span className="text-white">Let&apos;s connect.</span>
              </h3>
              <div className="mt-6 flex flex-col items-center lg:items-start gap-4">
                <CopyEmailButton />
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-sm text-white/60">Available for new opportunities</span>
                </div>
              </div>
            </div>

            {/* Bottom links section */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid gap-8 sm:grid-cols-2">
                {/* Selected Projects */}
                <div>
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-white/40 mb-4">
                    Selected Projects
                  </h4>
                  <ul className="space-y-2">
                    {selectedProjects.map((project) => (
                      <li key={project.name}>
                        <Link
                          href={project.href}
                          className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {project.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Socials */}
                <div>
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-white/40 mb-4">
                    Socials
                  </h4>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center lg:text-right">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Shawn Schwartz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
