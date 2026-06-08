"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
    useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Quote,
  Sparkles,
  Star,
  Award,
  Brush,
  X,
  Palette,
  Layers,
  GraduationCap,
  Menu,
  ArrowUpRight,
  Shuffle,
} from "lucide-react";
import {
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  achievements,
  artGalleryImages,
  featuredArtworks,
  heroGridImages,
  processMoments,
  signatureWorks,
  testimonials,
  type GalleryItem,
  type PortfolioCategory,
} from "@/lib/portfolio-data";

/* ── Constants ─────────────────────────────────────── */

const filters: Array<"All" | PortfolioCategory> = [
  "All",
  "Oil Paintings",
  "Acrylic",
  "Watercolor",
  "Sketches",
  "Digital Art",
];

const navItems = [
  ["About", "#about"],
  ["Gallery", "#gallery"],
  ["Process", "#process"],
  ["Achievements", "#achievements"],
  ["Commission", "#commission"],
] as const;

const studioSignals = [
  ["Islamic Calligraphy", "Spiritual composition, form, and balance", Palette],
  ["Mixed Media", "Layered canvases with texture and depth", Layers],
  ["Workshops", "Teaching through patience and structure", GraduationCap],
] as const;

/* ── Animation variants ───────────────────────────── */

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: "easeOut",
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ── Floating Particles ───────────────────────────── */

function FloatingParticles({ count = 6 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 3 + ((i * 5) % 7),
        left: `${(i * 17 + 13) % 100}%`,
        top: `${(i * 29 + 37) % 100}%`,
        delay: (i % 5) * 0.6,
        duration: 8 + (i % 4) * 1.75,
        color:
          i % 3 === 0
            ? "rgba(201, 162, 78, 0.25)"
            : i % 3 === 1
              ? "rgba(139, 92, 246, 0.15)"
              : "rgba(20, 184, 166, 0.15)",
      })),
    [count]
  );

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: p.color,
          }}
          animate={{
            y: [0, -30, -10, -40, 0],
            x: [0, 10, -8, 15, 0],
            scale: [1, 1.3, 0.9, 1.1, 1],
            opacity: [0.3, 0.6, 0.3, 0.5, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function shuffleArray<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

/* ── Mesh Gradient Background ─────────────────────── */

function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="mesh-orb mesh-orb-gold"
        style={{ width: 500, height: 500, top: "-10%", right: "-5%" }}
      />
      <div
        className="mesh-orb mesh-orb-violet"
        style={{ width: 400, height: 400, bottom: "5%", left: "-8%" }}
      />
      <div
        className="mesh-orb mesh-orb-teal"
        style={{ width: 350, height: 350, top: "40%", right: "20%" }}
      />
    </div>
  );
}

/* ── Section wrapper with scroll animation ────────── */

function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      {children}
    </motion.section>
  );
}

/* ── Section Heading ──────────────────────────────── */

function SectionHeading({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  const words = title.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 15, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
      transition: { type: "spring" as const, damping: 15, stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="max-w-3xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.p variants={child} className="inline-flex items-center gap-2 rounded-full bg-gold-light px-4 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-gold">
        <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-glow" />
        {kicker}
      </motion.p>
      <motion.h2
        variants={container}
        className="mt-5 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl lg:text-[3.4rem] flex flex-wrap gap-x-2.5 gap-y-1"
      >
        {words.map((word, idx) => (
          <motion.span variants={child} key={idx} className="inline-block">
            {word}
          </motion.span>
        ))}
      </motion.h2>
      <motion.div variants={child} className="mt-5 h-[2px] w-32 rounded-full bg-gradient-to-r from-gold via-violet/40 to-transparent" />
      <motion.p variants={child} className="mt-5 max-w-2xl text-[15px] leading-7 text-charcoal/65 md:text-base">
        {text}
      </motion.p>
    </motion.div>
  );
}

/* ── Gallery Lightbox ─────────────────────────────── */

function GalleryLightbox({
  item,
  onClose,
}: {
  item: GalleryItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl glass-card"
            initial={{ y: 40, opacity: 0, scale: 0.95, rotateX: 8 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ y: 30, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(event) => event.stopPropagation()}
            style={{ transformStyle: "preserve-3d" }}
            role="dialog"
            aria-modal="true"
            aria-label={`${item.title} artwork preview`}
          >
            <div className="grid gap-0 md:grid-cols-[1.4fr_0.9fr]">
              <div className="relative min-h-[320px] bg-charcoal/5 md:min-h-[640px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
              </div>
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="inline-flex items-center gap-2 rounded-full bg-gold-light px-3 py-1 text-xs uppercase tracking-[0.24em] text-gold">
                      <Sparkles className="h-3 w-3" />
                      Featured work
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-charcoal/10 text-charcoal/60 transition-all hover:border-gold hover:text-gold hover:bg-gold-light"
                      aria-label="Close artwork preview"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="mt-6 font-serif text-4xl leading-none">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-charcoal/65">
                    {item.summary}
                  </p>
                  <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                    {[
                      ["Medium", item.medium],
                      ["Year", item.year],
                      ["Dimensions", item.dimensions],
                      ["Category", item.category],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <dt className="text-charcoal/40">{label}</dt>
                        <dd className="mt-1 font-medium">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="mt-8 flex items-center gap-3 rounded-xl bg-gold-light/50 px-4 py-3 text-sm text-charcoal/60">
                  <Sparkles className="h-4 w-4 text-gold" />
                  Museum-style preview with a restrained frame.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ── 3D Tilt Artwork Card ─────────────────────────── */

function ArtworkCard({
  item,
  onOpen,
}: {
  item: GalleryItem;
  onOpen: (item: GalleryItem) => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      if (prefersReduced) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(-y * 12);
      rotateY.set(x * 12);
    },
    [prefersReduced, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  /* Inner glow that follows the cursor */
  const glowX = useTransform(rotateY, [-6, 6], [20, 80]);
  const glowY = useTransform(rotateX, [-6, 6], [80, 20]);
  const glowBg = useTransform(
    () =>
      `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, rgba(201,162,78,0.08) 0%, transparent 60%)`
  );

  return (
    <motion.button
      ref={cardRef}
      type="button"
      className="perspective-container group relative block w-full text-left"
      onClick={() => onOpen(item)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="gallery-card-3d overflow-hidden"
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Inner glow overlay */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glowBg }}
        />

        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: `${item.width} / ${item.height}` }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          {/* Hover overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Category badge on hover */}
          <div className="absolute bottom-3 left-3 z-20">
            <motion.span
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 backdrop-blur-sm px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-charcoal/80 shadow-sm opacity-0 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0"
            >
              <ArrowUpRight className="h-3 w-3" />
              View
            </motion.span>
          </div>
        </div>

        <div className="relative space-y-3 border-t border-gold/10 bg-white/80 backdrop-blur-sm p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-serif text-2xl leading-tight">{item.title}</h3>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.22em] text-gold">
                {item.category}
              </p>
            </div>
            <span className="rounded-lg border border-gold/15 bg-gold-light/50 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-gold/80">
              {item.year}
            </span>
          </div>
          <dl className="grid gap-2 text-[13px] text-charcoal/55 sm:grid-cols-2">
            <div>
              <dt className="text-charcoal/35">Medium</dt>
              <dd className="mt-0.5">{item.medium}</dd>
            </div>
            <div>
              <dt className="text-charcoal/35">Dimensions</dt>
              <dd className="mt-0.5">{item.dimensions}</dd>
            </div>
          </dl>
        </div>
      </motion.div>
    </motion.button>
  );
}

/* ── Testimonial Carousel ─────────────────────────── */

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setIndex((v) => (v + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const current = testimonials[index];

  return (
    <div className="relative overflow-hidden glass-card p-8 md:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="inline-flex items-center gap-2 rounded-full bg-gold-light px-3 py-1 text-xs uppercase tracking-[0.24em] text-gold">
          <Star className="h-3 w-3 fill-gold" />
          Testimonials
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setIndex(
                (v) => (v - 1 + testimonials.length) % testimonials.length
              )
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-charcoal/10 text-charcoal/50 transition-all hover:border-gold hover:text-gold hover:bg-gold-light"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((v) => (v + 1) % testimonials.length)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-charcoal/10 text-charcoal/50 transition-all hover:border-gold hover:text-gold hover:bg-gold-light"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-8 grid gap-8 md:grid-cols-[1fr_0.6fr] items-center"
        >
          <div className="space-y-6">
            <Quote className="h-12 w-12 text-gold/30" />
            <p className="max-w-3xl font-serif text-3xl leading-snug text-charcoal md:text-4xl lg:text-[2.2rem]">
              {current.quote}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-light to-violet-light">
                <Star className="h-5 w-5 fill-gold text-gold" />
              </div>
              <div>
                <p className="font-medium text-charcoal">{current.name}</p>
                <p className="text-sm text-charcoal/50">{current.role}</p>
              </div>
            </div>
          </div>
          {current.image && (
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl hidden md:block">
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            onClick={() => setIndex(dotIndex)}
            className={dotIndex === index ? "dot-active" : "dot-inactive"}
            aria-label={`Show testimonial ${dotIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Horizontal Signature Scroll ───────────────────── */

const signatureTextColors = [
  "text-[#C9A24E]",    // gold
  "text-[#8B5CF6]",    // violet
  "text-[#0EA5E9]",    // sky blue
  "text-[#F97316]",    // orange
  "text-[#10B981]",    // emerald
  "text-[#EC4899]",    // pink
  "text-[#6366F1]",    // indigo
  "text-[#EF4444]",    // red
];

function HorizontalSignatureScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.2,
  });
  const xPercent = useTransform(smoothProgress, [0, 1], [0, 100]);
  const x = useMotionTemplate`calc(-${xPercent}% + ${xPercent}vw)`;
  return (
    <div ref={containerRef} className="relative h-[420vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex h-full w-max items-center gap-10 px-[8vw] md:gap-16 lg:gap-20"
        >
          {signatureWorks.map((work, idx) => (
            <article
              key={work.title}
              className="relative flex h-full w-[82vw] flex-shrink-0 items-center justify-center sm:w-[68vw] lg:w-[56vw] xl:w-[48vw]"
            >
              {/* Huge colorful text in the background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                <motion.h3
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
                  whileInView={{ opacity: 0.07, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className={`font-serif text-[120px] leading-none whitespace-nowrap text-center select-none sm:text-[180px] lg:text-[220px] ${signatureTextColors[idx % signatureTextColors.length]}`}
                >
                  {work.title}
                </motion.h3>
              </div>

              {/* Image card in the foreground */}
              <motion.div
                className="relative z-10 w-full overflow-hidden rounded-[2rem] border border-beige bg-white shadow-gallery"
                whileHover={{ scale: 1.03, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative aspect-[4/5] sm:aspect-[16/10]">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 82vw, (max-width: 1280px) 68vw, 48vw"
                    quality={75}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 via-charcoal/12 to-transparent p-5 sm:p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.55 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block rounded-2xl border border-white/20 bg-black/20 px-5 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(184,155,94,0.15)]"
                      >
                        <motion.h4
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.55 }}
                          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                          className={`font-serif text-3xl leading-none sm:text-4xl ${signatureTextColors[idx % signatureTextColors.length]}`}
                        >
                          {work.title}
                        </motion.h4>
                      </motion.div>
                    </div>
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="hidden rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-md sm:inline-flex"
                    >
                      {work.category}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Hero Section ─────────────────────────────────── */

/* Infinite Marquee Ticker */
function MarqueeTicker() {
  const items = [
    "Islamic Calligraphy",
    "Mixed Media",
    "Spiritual Art",
    "Oil Paintings",
    "Canvas Work",
    "Contemporary Art",
    "Exhibitions",
    "Workshops",
  ];

  return (
    <div className="w-full overflow-hidden py-3 border-b border-charcoal/5">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-charcoal/30 font-medium">
            {item}
            <span className="h-1 w-1 rounded-full bg-gold/50" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* 4x4 Background Art Grid Card */
function HeroGridCard({ src, id, index }: { src: string; id: string; index: number }) {
  return (
    <motion.div
      layout
      layoutId={id}
      className="relative overflow-hidden rounded-xl aspect-square"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        layout: { type: "spring", stiffness: 60, damping: 14 },
        opacity: { duration: 0.6, delay: index * 0.03, ease: "easeOut" }
      }}
    >
      <Image
        src={src}
        alt={`Artwork`}
        fill
        className="object-cover"
        sizes="25vw"
        quality={45}
        priority={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
      />
    </motion.div>
  );
}

function Hero({ onExplore }: { onExplore: () => void }) {
  const [gridItems, setGridItems] = useState<{ id: string; src: string }[]>([]);

  useEffect(() => {
    type NetworkInfo = { effectiveType?: string; saveData?: boolean };
    const connection = (window.navigator as Navigator & {
      connection?: NetworkInfo;
    }).connection;
    const slowNetwork =
      connection?.saveData ||
      ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
    const sourceImages = shuffleArray(
      heroGridImages.slice(0, slowNetwork ? 4 : heroGridImages.length)
    );
    const slots = slowNetwork ? 4 : 16;

    setGridItems(
      Array.from({ length: slots }, (_, idx) => ({
        id: `hero-img-${idx}`,
        src: sourceImages[idx % sourceImages.length],
      }))
    );
  }, []);

  const handleNext = () => {
    setGridItems((prev) => {
      const copy = [...prev];
      const first = copy.shift();
      if (first) copy.push(first);
      return copy;
    });
  };

  const handlePrev = () => {
    setGridItems((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      if (last) copy.unshift(last);
      return copy;
    });
  };

  /* Stagger variants for text elements */
  const heroStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const heroChild: any = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-paper">
      {/* 4x4 Art Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-4 grid-rows-4 gap-2 p-2 h-full w-full">
          {gridItems.map((item, idx) => (
            <HeroGridCard key={item.id} id={item.id} src={item.src} index={idx} />
          ))}
        </div>
        {/* Radial gradient overlay: highly opaque in center for text readability, clear at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,252,242,0.95)_0%,rgba(255,252,242,0.85)_35%,rgba(255,252,242,0.2)_100%)] backdrop-blur-[2px] pointer-events-none" />
      </div>

      {/* Marquee ticker at top */}
      <div className="relative z-10 bg-white/40 backdrop-blur-md">
        <MarqueeTicker />
      </div>

      {/* Carousel Chevrons */}
      <div className="absolute inset-y-0 left-4 md:left-8 z-20 flex items-center pointer-events-none">
        <button 
          onClick={handlePrev} 
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/60 backdrop-blur-md shadow-sm border border-gold/20 text-charcoal/60 hover:text-gold hover:bg-white/90 transition-all hover:scale-105"
          aria-label="Previous images"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 md:right-8 z-20 flex items-center pointer-events-none">
        <button 
          onClick={handleNext} 
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/60 backdrop-blur-md shadow-sm border border-gold/20 text-charcoal/60 hover:text-gold hover:bg-white/90 transition-all hover:scale-105"
          aria-label="Next images"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-60px)] max-w-7xl items-center px-6 py-12 sm:px-8 lg:px-10 pointer-events-none">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroStagger}
          className="w-full max-w-3xl mx-auto text-center pointer-events-auto"
        >
          <motion.div variants={heroChild}>
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/70 border border-gold/20 px-5 py-2.5 text-xs uppercase tracking-[0.22em] text-charcoal/70 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
              </span>
              Available for commissions
            </div>
          </motion.div>

          <motion.h1
            variants={heroChild}
            className="mt-6 font-serif text-7xl leading-[0.93] text-charcoal sm:text-8xl lg:text-[7rem]"
          >
            <span className="shimmer-text">Faryal</span>
            <br />
            <span className="gradient-text">Rajpoot</span>
          </motion.h1>

          <motion.p
            variants={heroChild}
            className="mt-5 text-sm font-medium uppercase tracking-[0.26em] text-charcoal/50"
          >
            Calligraphy Artist &amp; Visual Artist
          </motion.p>

          <motion.p
            variants={heroChild}
            className="mt-8 max-w-xl mx-auto text-lg leading-8 text-charcoal/80 md:text-xl font-medium"
          >
            &ldquo;Art is not only what I create, it is how I express faith,
            emotions, beauty, and inner peace.&rdquo;
          </motion.p>

          <motion.p
            variants={heroChild}
            className="mt-6 max-w-2xl mx-auto text-[15px] leading-7 text-charcoal/70"
          >
            A self-taught artist working across Islamic calligraphy and
            expressive mixed-media painting. My practice explores spirituality,
            color, texture, and visual calm with a contemporary, gallery-ready
            finish.
          </motion.p>

          <motion.div
            variants={heroChild}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button type="button" onClick={onExplore} className="btn-primary">
              <span>View Gallery</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link href="#commission" className="btn-secondary bg-white/50 backdrop-blur-sm border-gold/30 hover:bg-gold/10 hover:border-gold/50">
              Commission Artwork
              <ExternalLink className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={heroChild}
            className="mt-12 grid gap-3 sm:grid-cols-3 max-w-2xl mx-auto"
          >
            {studioSignals.map(([label, value, Icon]) => (
              <div
                key={label}
                className="bg-white/60 border border-white/40 backdrop-blur-md rounded-2xl p-5 group cursor-default shadow-sm transition-all hover:bg-white/80"
              >
                <div className="flex items-center gap-2 justify-center">
                  <Icon className="h-4 w-4 text-gold transition-transform duration-300 group-hover:scale-110" />
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
                    {label}
                  </p>
                </div>
                <p className="mt-2.5 text-sm text-charcoal/70">{value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-paper to-transparent z-10 pointer-events-none" />
    </section>
  );
}

/* ── Contact Form ─────────────────────────────────── */

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(
      `Hello Faryal, my name is ${name || "____"}. My email is ${email || "____"
      }. I would like to inquire about a commission: ${message || "____"}`
    );
    return `https://wa.me/923305984102?text=${text}`;
  }, [email, message, name]);

  return (
    <form
      className="glass-card !p-6 md:!p-8 space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="text-charcoal/60 font-medium">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input-glow"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-charcoal/60 font-medium">Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="input-glow"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        <span className="text-charcoal/60 font-medium">Commission brief</span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="input-glow min-h-36 resize-none"
          placeholder="Tell Faryal about the artwork size, theme, and deadline."
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary">
          <span>Send Inquiry</span>
          <Mail className="h-4 w-4" />
        </button>
        <a
          href="https://instagram.com/artb_yfari"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >
          Instagram DM
          <Camera className="h-4 w-4" />
        </a>
      </div>
      {submitted ? (
        <p className="text-sm text-charcoal/55 flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          Your inquiry has been prepared for WhatsApp so you can send it
          directly.
        </p>
      ) : (
        <p className="text-sm text-charcoal/45">
          Replies are handled through WhatsApp and Instagram for a direct studio
          connection.
        </p>
      )}
    </form>
  );
}

/* ── Mobile Nav ───────────────────────────────────── */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.nav
            className="absolute right-0 top-0 h-full w-72 glass-card !rounded-none !rounded-l-3xl !border-r-0 p-8 flex flex-col gap-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="self-end inline-flex h-10 w-10 items-center justify-center rounded-xl border border-charcoal/10 text-charcoal/60 transition hover:text-gold"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            {navItems.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-lg font-serif text-charcoal/80 transition hover:text-gold"
                onClick={onClose}
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="btn-primary mt-auto w-full justify-center"
              onClick={onClose}
            >
              <span>Contact</span>
              <Mail className="h-4 w-4" />
            </Link>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main Portfolio Page ──────────────────────────── */

export default function PortfolioPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [activeArtwork, setActiveArtwork] = useState<GalleryItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [processCards, setProcessCards] = useState(processMoments);

  const filteredArtworks = useMemo(() => {
    if (filter === "All") return featuredArtworks;
    return featuredArtworks.filter((item) => item.category === filter);
  }, [filter]);

  useEffect(() => {
    const randomImages = shuffleArray(artGalleryImages).slice(
      0,
      processMoments.length
    );

    setProcessCards(
      processMoments.map((step, index) => ({
        ...step,
        image: randomImages[index]?.image ?? step.image,
      }))
    );
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-x-clip"
    >
      {/* ── Sticky Nav ────────────────────────── */}
      <header className="sticky top-0 z-40 glass-nav">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <Link
            href="#top"
            className="font-serif text-xl tracking-[0.08em] text-charcoal transition-colors hover:text-gold"
          >
            <span className="shimmer-text">FARYAL RAJPOOT</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-charcoal/60 md:flex">
            {navItems.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="relative transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-gold after:transition-all hover:after:w-full"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="#contact" className="btn-secondary !py-2 !px-4 text-sm hidden md:inline-flex">
              Contact
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-charcoal/10 text-charcoal/60 transition hover:text-gold md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* ── Hero ──────────────────────────────── */}
      <Hero
        onExplore={() =>
          document
            .getElementById("gallery")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      />

      {/* ── Quick stats bar ───────────────────── */}
      <AnimatedSection className="relative bg-paper">
        <div className="section-divider" />
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [
                "Signature medium",
                "Islamic calligraphy and spiritual mixed media",
              ],
              [
                "Presentation style",
                "Gallery-ready canvases with refined contrast",
              ],
              ["Creative focus", "Faith, color, texture, and visual calm"],
            ].map(([label, value], idx) => (
              <motion.div
                key={label}
                variants={fadeUp}
                custom={idx}
                className="glass-card !p-5 group cursor-default"
              >
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
                  {label}
                </p>
                <p className="mt-2.5 text-sm leading-6 text-charcoal/60">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── About ─────────────────────────────── */}
      <AnimatedSection id="about" className="relative bg-paper overflow-hidden">
        <div className="section-divider" />
        <FloatingParticles count={4} />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
          <SectionHeading
            kicker="About the artist"
            title="Faith, color, and the discipline of composition."
            text="Faryal Rajpoot's practice sits between devotion and contemporary presentation. Her calligraphy is built with patience and clarity, while her mixed-media work extends that same sense of rhythm into texture, atmosphere, and expressive color."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div variants={fadeUp} custom={1} className="space-y-8">
              <div className="glass-card !p-6 md:!p-8">
                <p className="text-[15px] leading-7 text-charcoal/65">
                  I am Faryal Rajpoot, a passionate self-taught artist
                  specializing in Islamic calligraphy and expressive mixed-media
                  paintings. My artistic journey began with a deep love for
                  creativity and spiritual expression. Through my artwork, I
                  strive to transform emotions, faith, colors, and imagination
                  into meaningful visual experiences.
                </p>
                <p className="mt-5 text-[15px] leading-7 text-charcoal/65">
                  Islamic calligraphy is at the heart of my artistic practice. I
                  enjoy exploring different styles, textures, backgrounds, and
                  color combinations to create unique compositions that connect
                  tradition with contemporary aesthetics.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  [
                    "Self-taught",
                    "Rooted in independent study and practice.",
                  ],
                  [
                    "Exhibition-ready",
                    "Built for gallery walls and public presentation.",
                  ],
                  [
                    "Teaching-driven",
                    "Workshops that build confidence and clarity.",
                  ],
                ].map(([title, detail], idx) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    custom={idx + 2}
                    className="glass-card !p-5"
                  >
                    <p className="font-medium text-charcoal">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-charcoal/55">
                      {detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="glass-card !p-6 md:!p-8"
            >
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-gold">
                <Sparkles className="h-3 w-3" />
                Journey
              </p>
              <div className="mt-8 space-y-7">
                {[
                  [
                    "Origin",
                    "A love for creativity, faith, and visual storytelling.",
                  ],
                  [
                    "Growth",
                    "Studying calligraphy forms, layered surfaces, and composition.",
                  ],
                  [
                    "Practice",
                    "Building a body of work that connects spiritual beauty with modern presentation.",
                  ],
                  [
                    "Future",
                    "Teaching, collaborations, exhibitions, and wider educational reach.",
                  ],
                ].map(([label, detail], idx) => (
                  <div key={label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="step-badge">{idx + 1}</span>
                      {idx !== 3 && (
                        <span className="mt-2 h-full w-px bg-gradient-to-b from-gold/30 to-violet/10" />
                      )}
                    </div>
                    <div className="pb-2">
                      <p className="font-medium text-charcoal">{label}</p>
                      <p className="mt-2 text-sm leading-6 text-charcoal/55">
                        {detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Gallery ───────────────────────────── */}
      <AnimatedSection id="gallery" className="relative bg-paper overflow-hidden">
        <div className="section-divider" />
        <MeshGradient />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">
              Featured gallery
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-none text-charcoal md:text-5xl">
              Art gallery only no certificates
            </h2>
            <Link
              href="/art-gallery"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-charcoal px-5 py-3 text-sm font-medium text-paper shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-charcoal/95"
            >
              View Full Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-charcoal/72 md:text-base">
              Browse the selected collection and filter by the visual language
              that best matches each piece. Tap any artwork to open a detailed
              view.
            </p>
          </div>

          {/* Filter buttons */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {filters.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setFilter(label)}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${filter === label
                    ? "bg-charcoal text-paper shadow-lg shadow-charcoal/20"
                    : "glass-card !shadow-soft !py-2.5 !px-5 text-charcoal/70 hover:!border-gold hover:text-gold"
                  }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

          {/* Masonry grid */}
          <div className="mt-12 columns-1 gap-7 sm:columns-2 xl:columns-3">
            <AnimatePresence>
              {filteredArtworks.map((item, idx) => (
                <motion.div
                  key={item.title}
                  className="mb-7 break-inside-avoid"
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      delay: idx * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 20,
                    scale: 0.95,
                    transition: { duration: 0.3 },
                  }}
                >
                  <ArtworkCard item={item} onOpen={setActiveArtwork} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Signature Collection ──────────────── */}
      <section className="relative bg-paper z-10">
        <div className="section-divider" />
        <AnimatedSection className="relative mx-auto max-w-7xl px-6 pt-24 sm:px-8 lg:px-10">
          <SectionHeading
            kicker="Signature collection"
            title="Large-scale works with cinematic presence."
            text="Scroll to explore horizontal presentation that gives the strongest pieces room to breathe and creates an immersive scrolling exhibition."
          />
        </AnimatedSection>

        {/* Horizontal scroll animation container */}
        <HorizontalSignatureScroll />
      </section>

      {/* ── Process ───────────────────────────── */}
      <AnimatedSection
        id="process"
        className="relative bg-paper overflow-hidden"
      >
        <div className="section-divider" />
        <FloatingParticles count={4} />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
          <SectionHeading
            kicker="Creative process"
            title="From sketch to final surface."
            text="The process is structured enough to keep the work disciplined, but open enough to let color, texture, and spiritual atmosphere evolve naturally."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {processCards.map((step, idx) => (
              <motion.article
                key={step.title}
                variants={fadeUp}
                custom={idx + 1}
                className="overflow-hidden rounded-2xl glass-card !p-0 group"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 28vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="step-badge !bg-white/80 !backdrop-blur-sm !border-gold/20">
                      {idx + 1}
                    </span>
                  </div>
                </div>
                <div className="p-6 border-t border-gold/10 bg-white/90 backdrop-blur-sm">
                  <h3 className="font-serif text-3xl leading-none">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal/60">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              [
                "Tools",
                "Brushes, pens, paint, texture paste, and layered surfaces.",
              ],
              [
                "Composition",
                "Balanced negative space and clear reading from distance.",
              ],
              [
                "Teaching",
                "Introductory workshops that emphasize patience and practice.",
              ],
            ].map(([label, detail], idx) => (
              <motion.div
                key={label}
                variants={fadeUp}
                custom={idx + 4}
                className="glass-card !p-5"
              >
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-6 text-charcoal/55">
                  {detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Achievements ──────────────────────── */}
      <AnimatedSection
        id="achievements"
        className="relative bg-paper overflow-hidden"
      >
        <div className="section-divider" />
        <MeshGradient />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
          <SectionHeading
            kicker="Exhibitions & achievements"
            title="Certificates, competitions, and presentation moments."
            text="A gallery practice is strengthened by public recognition, training, and shared community spaces. These selected moments show that side of the portfolio."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {achievements.map((item, idx) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                custom={idx}
                className="overflow-hidden rounded-2xl glass-card !p-0 group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-[4/3] bg-charcoal/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5 border-t border-gold/10 bg-white/90 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-light to-violet-light flex-shrink-0">
                      <Award className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-charcoal/55">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Testimonials ──────────────────────── */}
      <AnimatedSection className="relative bg-paper">
        <div className="section-divider" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
          <SectionHeading
            kicker="Testimonials"
            title="A calm, confident body of work that resonates."
            text="Client, collector, and workshop feedback helps explain what the artwork feels like in the room and what the teaching experience is like in practice."
          />
          <motion.div variants={fadeUp} custom={1} className="mt-12">
            <TestimonialCarousel />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ── Commission ────────────────────────── */}
      <AnimatedSection
        id="commission"
        className="relative bg-paper overflow-hidden"
      >
        <div className="section-divider" />
        <FloatingParticles count={4} />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
          <SectionHeading
            kicker="Commission section"
            title="Custom artwork shaped around your space and brief."
            text="For private homes, studios, and meaningful gifts, commissions are developed through a simple process that keeps the artist and client aligned from the beginning."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div variants={fadeUp} custom={1} className="space-y-5">
              {[
                [
                  "Inquiry",
                  "Share your size, subject, palette, and timeframe.",
                ],
                [
                  "Concept",
                  "A direction is clarified around mood, composition, and finish.",
                ],
                [
                  "Execution",
                  "The work is developed in stages with careful attention to detail.",
                ],
                [
                  "Delivery",
                  "Final presentation is prepared for display or gifting.",
                ],
              ].map(([title, detail], idx) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  custom={idx + 2}
                  className="glass-card !p-5"
                >
                  <div className="flex items-center gap-4">
                    <span className="step-badge">{idx + 1}</span>
                    <div>
                      <p className="font-medium text-charcoal">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-charcoal/55">
                        {detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="glass-card !p-6 md:!p-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-light to-violet-light">
                  <Brush className="h-5 w-5 text-gold" />
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
                  Custom artwork services
                </p>
              </div>
              <h3 className="mt-6 font-serif text-4xl leading-[1.1]">
                Portraits, calligraphy panels, gift pieces, and spiritual
                canvases.
              </h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-charcoal/60">
                The commission experience is designed to stay simple and
                personal. You can request a statement piece for a home interior,
                a calligraphic work for an institution, or a special artwork for
                a ceremony or gift.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="#contact" className="btn-primary">
                  <span>Request pricing</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://instagram.com/artb_yfari"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  View updates
                  <Camera className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Contact ───────────────────────────── */}
      <AnimatedSection id="contact" className="relative bg-paper overflow-hidden">
        <div className="section-divider" />
        <MeshGradient />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
          <SectionHeading
            kicker="Contact"
            title="Start a commission or get in touch about workshops."
            text="The contact area is built for direct studio communication, with WhatsApp and Instagram as the primary response channels."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.div variants={fadeUp} custom={1} className="space-y-4">
              <div className="glass-card !p-6">
                <p className="font-serif text-3xl">Faryal Rajpoot</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.24em] text-gold">
                  Calligraphy Artist & Visual Artist
                </p>
                <div className="mt-5 space-y-3">
                  <p className="flex items-center gap-3 text-sm text-charcoal/60">
                    <Camera className="h-4 w-4 text-gold" />
                    Instagram: @artb_yfari
                  </p>
                  <p className="flex items-center gap-3 text-sm text-charcoal/60">
                    <Phone className="h-4 w-4 text-gold" />
                    Phone: 0330-5984102
                  </p>
                  <p className="flex items-center gap-3 text-sm text-charcoal/60">
                    <MapPin className="h-4 w-4 text-gold" />
                    Pakistan-based studio
                  </p>
                </div>
                <div className="mt-6 rounded-xl bg-gold-light/50 p-4">
                  <p className="text-sm leading-6 text-charcoal/55 italic">
                    &ldquo;Creating art that connects faith, beauty, and
                    imagination.&rdquo;
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href="https://instagram.com/artb_yfari"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card !p-5 flex items-center justify-between group"
                >
                  <div>
                    <p className="text-sm font-medium">Instagram</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-charcoal/45">
                      @artb_yfari
                    </p>
                  </div>
                  <Camera className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110" />
                </a>
                <a
                  href="tel:03305984102"
                  className="glass-card !p-5 flex items-center justify-between group"
                >
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-charcoal/45">
                      0330-5984102
                    </p>
                  </div>
                  <Phone className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110" />
                </a>
                <div className="glass-card !p-5 flex items-center justify-between sm:col-span-2">
                  <div>
                    <p className="text-sm font-medium">Studio</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-charcoal/45">
                      Pakistan-based studio practice
                    </p>
                  </div>
                  <MapPin className="h-5 w-5 text-gold" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={2}>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Footer ────────────────────────────── */}
      <footer className="relative bg-paper">
        <div className="section-divider" />
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-charcoal/45 sm:px-8 lg:px-10 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-lg shimmer-text">Faryal Rajpoot</p>
          <p className="text-charcoal/40">
            Calligraphy Artist & Visual Artist · {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* ── Lightbox ──────────────────────────── */}
      <GalleryLightbox
        item={activeArtwork}
        onClose={() => setActiveArtwork(null)}
      />
    </motion.main>
  );
}
