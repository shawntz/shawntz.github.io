"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchModal } from "@/components/ui/SearchModal";
import { RippleButton } from "@/components/ui/Ripple";
import { cn } from "@/lib/utils";
import { Search, Menu, X } from "lucide-react";
import type { SearchResult } from "@/lib/types";

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/projects" },
  { name: "Research", href: "/research" },
  { name: "Resume", href: "/resume" },
  { name: "Services", href: "/services" },
  { name: "Interests", href: "/interests" },
  { name: "About", href: "/about" },
];

interface HeaderProps {
  searchIndex?: SearchResult[];
}

export function Header({ searchIndex = [] }: HeaderProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-4 z-40 mx-auto max-w-5xl px-4"
      >
        <nav className="flex h-14 items-center justify-between gap-8 px-8 rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-lg shadow-gray-900/5 dark:shadow-black/30 ring-1 ring-gray-900/5 dark:ring-white/10">
          <Link
            href="/"
            className="text-lg font-semibold text-foreground hover:text-accent transition-colors flex-shrink-0"
          >
            SS
          </Link>

          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-foreground-secondary hover:text-foreground"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 -z-10 rounded-full bg-gray-100 dark:bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <RippleButton
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100/80 dark:bg-white/10 px-3 py-1.5 text-sm text-foreground-secondary hover:bg-gray-200/80 dark:hover:bg-white/20 transition-colors active:scale-[0.98]"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline ml-2 rounded-full bg-gray-200 dark:bg-white/10 px-1.5 py-0.5 text-xs text-foreground-tertiary">
                ⌘K
              </kbd>
            </RippleButton>
            <ThemeToggle />
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <motion.div
                  initial={false}
                  animate={{
                    rotate: isMobileMenuOpen ? 90 : 0,
                    opacity: isMobileMenuOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Menu className="w-5 h-5 text-foreground" />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{
                    rotate: isMobileMenuOpen ? 0 : -90,
                    opacity: isMobileMenuOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.div>
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden mt-2 rounded-2xl bg-white dark:bg-gray-900 shadow-xl overflow-hidden"
            >
              <motion.div
                className="flex flex-col gap-1 p-4"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.03, staggerDirection: -1 }
                  }
                }}
              >
                {navigation.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -10 }
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                          isActive
                            ? "bg-gray-100 dark:bg-white/10 text-foreground"
                            : "text-foreground-secondary hover:bg-gray-50 dark:hover:bg-white/5 hover:text-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchIndex={searchIndex}
      />
    </>
  );
}
