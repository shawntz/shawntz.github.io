"use client";

import { motion } from "framer-motion";
import { SpotifyPlayer } from "./SpotifyPlayer";
import { BookShelf } from "./BookShelf";
import { PinterestBoards } from "./PinterestBoards";
import { Music, BookOpen, Sparkles } from "lucide-react";

interface Book {
  title: string;
  author: string;
  cover: string;
  link?: string;
}

interface PinterestBoard {
  name: string;
  url: string;
  description?: string;
  coverImage: string;
}

interface InterestsContentProps {
  spotifyPlaylistId: string;
  books: Book[];
  pinterestBoards: PinterestBoard[];
}

export function InterestsContent({
  spotifyPlaylistId,
  books,
  pinterestBoards,
}: InterestsContentProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-semibold tracking-tight md:text-[64px]">
          Interests
        </h1>
        <p className="mt-6 text-lg text-foreground-secondary max-w-3xl mx-auto leading-relaxed text-balance">
          A glimpse into what inspires me outside of code — the music I listen to,
          books I&apos;m reading, and things that spark creativity.
        </p>
      </motion.header>

      {/* Music Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl bg-green-500/10 p-2.5">
            <Music className="h-6 w-6 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold">What I&apos;m Listening To</h2>
        </div>
        <SpotifyPlayer playlistId={spotifyPlaylistId} title="" />
      </motion.section>

      {/* Books Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-20"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-xl bg-amber-500/10 p-2.5">
            <BookOpen className="h-6 w-6 text-amber-500" />
          </div>
          <h2 className="text-2xl font-semibold">Recently Read</h2>
        </div>
        <BookShelf books={books} title="" />
      </motion.section>

      {/* Pinterest Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl bg-red-500/10 p-2.5">
            <Sparkles className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-2xl font-semibold">Inspiration Boards</h2>
        </div>
        <PinterestBoards boards={pinterestBoards} title="" />
      </motion.section>
    </div>
  );
}
