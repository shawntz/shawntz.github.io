import { buildSearchIndex } from "@/lib/mdx";
import { Header } from "./Header";

export async function HeaderWrapper() {
  const searchIndex = await buildSearchIndex();
  return <Header searchIndex={searchIndex} />;
}
