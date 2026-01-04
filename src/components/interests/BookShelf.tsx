"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Book {
  title: string;
  author: string;
  cover: string;
  link?: string;
}

interface BookShelfProps {
  books: Book[];
  title?: string;
}

function Book3D({ book, index }: { book: Book; index: number }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative transition-transform duration-500 group-hover:rotate-y-[-15deg]"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Book cover */}
        <div className="relative w-36 h-52 md:w-44 md:h-64 rounded-r-md shadow-xl overflow-hidden bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5">
          {book.cover ? (
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <span className="text-4xl font-bold text-accent/40 text-center leading-tight">
                {book.title.split(' ').map(w => w[0]).join('').slice(0, 3)}
              </span>
            </div>
          )}
          {/* Spine shadow effect */}
          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/30 to-transparent" />
          {/* Page edge effect */}
          <div className="absolute inset-y-2 -right-1 w-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-600 dark:to-gray-500 rounded-r-sm" />
        </div>

        {/* 3D spine */}
        <div
          className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-900 dark:to-gray-800 origin-left"
          style={{
            transform: "rotateY(-90deg) translateX(-8px)",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Bottom shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/20 dark:bg-black/40 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );

  if (book.link) {
    return (
      <a href={book.link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

export function BookShelf({ books, title = "Recently Read" }: BookShelfProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title && <h2 className="text-2xl font-semibold mb-8">{title}</h2>}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {books.map((book, index) => (
          <Book3D key={book.title} book={book} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
