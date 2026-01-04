"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface PinterestBoard {
  name: string;
  url: string;
  description?: string;
  coverImage: string;
}

interface PinterestBoardsProps {
  boards: PinterestBoard[];
  title?: string;
}

export function PinterestBoards({ boards, title = "Inspiration Boards" }: PinterestBoardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title && <h2 className="text-2xl font-semibold mb-6">{title}</h2>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {boards.map((board, index) => (
          <motion.a
            key={board.name}
            href={board.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group block h-full"
          >
            <div className="h-full flex flex-col overflow-hidden rounded-2xl border border-border-light bg-surface transition-all hover:border-accent/50 hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-red-500/20 via-pink-500/10 to-orange-500/20">
                {board.coverImage && (
                  <Image
                    src={board.coverImage}
                    alt={board.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-[#E60023] fill-current"
                    >
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                    <span className="text-white font-medium text-sm">Pinterest</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {board.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-foreground-tertiary group-hover:text-accent transition-colors" />
                </div>
                {board.description && (
                  <p className="mt-2 text-sm text-foreground-secondary line-clamp-2">
                    {board.description}
                  </p>
                )}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
