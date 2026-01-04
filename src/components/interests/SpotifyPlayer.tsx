"use client";

import { motion } from "framer-motion";

interface SpotifyPlayerProps {
  playlistId: string;
  title?: string;
}

export function SpotifyPlayer({ playlistId, title = "What I'm Listening To" }: SpotifyPlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title && <h2 className="text-2xl font-semibold mb-6">{title}</h2>}
      <div className="rounded-2xl overflow-hidden border border-border-light bg-surface">
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          width="100%"
          height="600"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-2xl"
        />
      </div>
    </motion.div>
  );
}
