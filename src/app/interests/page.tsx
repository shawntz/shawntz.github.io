import { Metadata } from "next";
import { InterestsContent } from "@/components/interests/InterestsContent";

export const metadata: Metadata = {
  title: "Interests",
  description: "A peek into my interests - what I'm reading, listening to, and finding inspiration from.",
};

// =============================================================================
// CONFIGURE YOUR CONTENT HERE
// =============================================================================

// Spotify: Get playlist ID from the playlist URL
// Example: https://open.spotify.com/playlist/50Cz2eU1BkXS6ND4dJmDsd → "50Cz2eU1BkXS6ND4dJmDsd"
const spotifyPlaylistId = "50Cz2eU1BkXS6ND4dJmDsd";

// Books: Add your recently read books
// - cover: Add book cover images to /public/images/books/ (or leave empty for placeholder)
// - link: Optional link to Goodreads, Amazon, etc.
const books = [
  {
    title: "Careless People",
    author: "Sarah Wynn-Williams",
    cover: "/images/books/careless-people.jpg",
    link: "",
  },
  {
    title: "Don't Believe Everything You Think",
    author: "Joseph Nguyen",
    cover: "/images/books/dbeyt.jpg",
    link: "",
  },
  {
    title: "Plays Well with Others",
    author: "Eric Barker",
    cover: "/images/books/pwmov.jpg",
    link: "",
  },
];

// Pinterest Boards: Add your boards
// - coverImage: Add cover images to /public/images/pinterest/ (or leave empty for gradient)
// - url: Link to your Pinterest board
const pinterestBoards = [
  {
    name: "Wallpapers",
    url: "https://www.pinterest.com/shawntschwartz/wallpapers/",
    description: "Desktop and mobile wallpapers",
    coverImage: "/images/pinterest/wallpapers.png",
  },
  {
    name: "Tech Aesthetic",
    url: "https://www.pinterest.com/shawntschwartz/tech-aesthetic/",
    description: "Sleek tech setups and gear",
    coverImage: "/images/pinterest/tech-aesthetic.png",
  },
  {
    name: "UI Inspo",
    url: "https://www.pinterest.com/shawntschwartz/ui-inspo/",
    description: "User interface design inspiration",
    coverImage: "/images/pinterest/ui-inspo.png",
  },
];

export default function InterestsPage() {
  return (
    <InterestsContent
      spotifyPlaylistId={spotifyPlaylistId}
      books={books}
      pinterestBoards={pinterestBoards}
    />
  );
}
