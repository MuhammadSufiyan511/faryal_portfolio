"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Expand, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { artGalleryImages } from "@/lib/portfolio-data";

type ArtGalleryItem = (typeof artGalleryImages)[number];

const pageVariants: any = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: ArtGalleryItem;
  index: number;
  onOpen: (item: ArtGalleryItem) => void;
}) {
  const tall = index % 5 === 0 || index % 7 === 0;

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onOpen(item)}
      className={`group relative w-full overflow-hidden rounded-[1.35rem] border border-charcoal/8 bg-white/80 text-left shadow-[0_12px_45px_rgba(26,26,26,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_55px_rgba(26,26,26,0.14)] ${
        tall ? "row-span-2" : ""
      }`}
    >
      <div className={`relative ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,248,245,0.24),rgba(250,248,245,0.02)_38%,rgba(26,26,26,0.55)_100%)] opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <div className="rounded-[1.15rem] border border-white/12 bg-[linear-gradient(135deg,rgba(250,248,245,0.14),rgba(250,248,245,0.06),rgba(184,155,94,0.08))] p-3 text-paper shadow-[0_10px_28px_rgba(0,0,0,0.14)] backdrop-blur-md transition-transform duration-300 ease-out group-hover:translate-y-[-1px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-paper/90 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-gold" />
              {item.category}
            </div>
            <h2 className="mt-3 font-serif text-2xl leading-none text-paper transition-transform duration-300 ease-out group-hover:translate-y-[-1px]">
              {item.title}
            </h2>
            <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-paper/72">
              Click to enlarge
            </p>
          </div>
        </div>
        <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-3 text-paper backdrop-blur-md opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-1">
          <Expand className="h-4 w-4" />
        </div>
      </div>
    </motion.button>
  );
}

export default function ArtGalleryPage() {
  const items = useMemo(() => artGalleryImages, []);
  const [activeItem, setActiveItem] = useState<ArtGalleryItem | null>(null);

  return (
    <main className="min-h-screen bg-paper text-charcoal">
      <motion.div
        className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/8 pb-6"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Full gallery
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">
              Artwork archive
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-charcoal/65 sm:text-base">
              A complete view of the painted surfaces, calligraphic studies,
              and mixed-media works from the art collection.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white px-4 py-2.5 text-sm font-medium text-charcoal shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </motion.div>

        <motion.section
          variants={itemVariants}
          className="grid gap-5 py-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {items.map((item, index) => (
            <GalleryCard
              key={item.image}
              item={item}
              index={index}
              onOpen={setActiveItem}
            />
          ))}
        </motion.section>
      </motion.div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/68 px-4 py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[1.35rem] bg-paper shadow-[0_24px_72px_rgba(0,0,0,0.28)] will-change-transform"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute right-4 top-4 z-10 rounded-full border border-charcoal/10 bg-white/90 p-3 text-charcoal shadow-sm transition hover:text-gold"
                aria-label="Close gallery preview"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[280px] bg-charcoal/5 lg:min-h-[560px]">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,248,245,0.18),rgba(26,26,26,0.08)_35%,rgba(26,26,26,0.35)_100%)]" />
                </div>
                <div className="flex flex-col justify-between gap-6 p-5 sm:p-7 lg:p-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gold">
                      {activeItem.category}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl leading-none text-charcoal sm:text-4xl">
                      {activeItem.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-charcoal/65">
                      This piece is presented at full scale to show the surface,
                      linework, and tonal balance more clearly.
                    </p>
                  </div>
                  <div className="grid gap-3 border-t border-charcoal/8 pt-5 text-sm text-charcoal/70">
                    <div className="flex items-center justify-between gap-6">
                      <span className="uppercase tracking-[0.2em] text-charcoal/45">
                        Category
                      </span>
                      <span>{activeItem.category}</span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <span className="uppercase tracking-[0.2em] text-charcoal/45">
                        Gallery count
                      </span>
                      <span>{items.length} works</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
