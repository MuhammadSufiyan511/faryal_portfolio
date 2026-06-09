import type { Metadata } from "next";
import ArtGalleryPage from "@/components/art-gallery-page";

export const metadata: Metadata = {
  title: "Full Gallery | Faryal Zaheer",
  description:
    "Explore the full art gallery of Faryal Zaheer with a cinematic grid and immersive artwork preview.",
};

export default function Page() {
  return <ArtGalleryPage />;
}
