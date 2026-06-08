export type PortfolioCategory =
  | "Oil Paintings"
  | "Acrylic"
  | "Watercolor"
  | "Sketches"
  | "Digital Art";

export type Artwork = {
  title: string;
  medium: string;
  year: string;
  dimensions: string;
  category: PortfolioCategory;
  image: string;
  width: number;
  height: number;
  accent: string;
};

export type GalleryItem = Artwork & {
  summary: string;
};

export const gallery = (file: string) => `/gallery/${encodeURIComponent(file)}`;
export const art = (file: string) => `/gallery/art/${encodeURIComponent(file)}`;
export const cert = (file: string) => `/gallery/Certificates/${encodeURIComponent(file)}`;
export const me = (file: string) => `/gallery/me/${encodeURIComponent(file)}`;

export const featuredArtworks: GalleryItem[] = [
  {
    title: "Blue-Gold Flow",
    medium: "Mixed media on canvas",
    year: "2025",
    dimensions: "40 x 28 in",
    category: "Acrylic",
    image: art("WhatsApp Image 2026-06-08 at 12.31.39 PM (2).webp"),
    width: 1280,
    height: 855,
    accent: "Deep blue ground with white, blue, and gold calligraphic movement",
    summary: "A stronger, more dramatic canvas with a blue-and-gold presence.",
  },
  {
    title: "Sacred Circle",
    medium: "Acrylic on canvas",
    year: "2025",
    dimensions: "30 x 30 in",
    category: "Oil Paintings",
    image: art("WhatsApp Image 2026-06-08 at 12.32.08 PM.webp"),
    width: 952,
    height: 1032,
    accent: "Saturated color field and figure-led motion",
    summary: "A devotional canvas with painterly movement and striking color.",
  },
  {
    title: "Whirling Light",
    medium: "Mixed media on canvas",
    year: "2025",
    dimensions: "36 x 36 in",
    category: "Watercolor",
    image: art("WhatsApp Image 2026-06-08 at 12.32.12 PM.webp"),
    width: 1072,
    height: 776,
    accent: "Bold contrast with expressive handwritten forms",
    summary: "A vivid calligraphic study that feels kinetic and luminous.",
  },
  {
    title: "Mosaic of Mercy",
    medium: "Acrylic and ink on board",
    year: "2025",
    dimensions: "48 x 30 in",
    category: "Digital Art",
    image: art("WhatsApp Image 2026-06-08 at 12.32.15 PM.webp"),
    width: 996,
    height: 936,
    accent: "Color-blocked lettering with a graphic, contemporary edge",
    summary: "A framed composition built like a visual prayer mosaic.",
  },
  {
    title: "Garden of Devotion",
    medium: "Acrylic on canvas",
    year: "2025",
    dimensions: "42 x 56 in",
    category: "Oil Paintings",
    image: art("WhatsApp Image 2026-06-08 at 12.32.18 PM.webp"),
    width: 1080,
    height: 1388,
    accent: "Tall-format painting with a cinematic presence",
    summary: "A large-scale figure piece with a strong exhibition feel.",
  },
  {
    title: "Azure Invocation",
    medium: "Mixed media on canvas",
    year: "2025",
    dimensions: "30 x 40 in",
    category: "Acrylic",
    image: art("WhatsApp Image 2026-06-08 at 12.32.27 PM.webp"),
    width: 1280,
    height: 855,
    accent: "Blue tonal layers softened by hand-painted ornament",
    summary: "A grounded, architectural composition with layered calligraphy.",
  },
  {
    title: "Green Sanctuary",
    medium: "Acrylic on canvas",
    year: "2025",
    dimensions: "36 x 48 in",
    category: "Sketches",
    image: art("WhatsApp Image 2026-06-08 at 12.32.32 PM.webp"),
    width: 1076,
    height: 1264,
    accent: "Deep green atmosphere and luminous white strokes",
    summary: "A contemplative piece with dense texture and quiet depth.",
  },
];

export const signatureWorks = [
  {
    title: "Ethereal Calligraphy",
    category: "Calligraphy Series",
    image: art("WhatsApp Image 2026-06-08 at 12.32.42 PM.webp"),
  },
  {
    title: "Spiritual Echoes",
    category: "Large-Scale Canvas",
    image: art("WhatsApp Image 2026-06-08 at 12.32.44 PM.webp"),
  },
  {
    title: "Divine Illumination",
    category: "Spiritual Study",
    image: art("WhatsApp Image 2026-06-08 at 12.32.46 PM.webp"),
  },
  {
    title: "Harmonic Verse",
    category: "Contemporary Calligraphy",
    image: art("WhatsApp Image 2026-06-08 at 12.32.48 PM.webp"),
  },
  {
    title: "Blue-Gold Flow",
    category: "Mixed Media",
    image: art("WhatsApp Image 2026-06-08 at 12.31.39 PM (2).webp"),
  },
  {
    title: "Sacred Circle",
    category: "Oil Painting",
    image: art("WhatsApp Image 2026-06-08 at 12.32.08 PM.webp"),
  },
  {
    title: "Whirling Light",
    category: "Watercolor Study",
    image: art("WhatsApp Image 2026-06-08 at 12.32.12 PM.webp"),
  },
  {
    title: "Azure Invocation",
    category: "Acrylic Canvas",
    image: art("WhatsApp Image 2026-06-08 at 12.32.27 PM.webp"),
  },
];

/* All art images for the hero 4x4 grid background */
export const heroGridImages = [
  art("WhatsApp Image 2026-06-08 at 12.31.39 PM (2).webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.08 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.12 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.15 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.18 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.27 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.32 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.42 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.44 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.46 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.48 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.31.39 PM (2).webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.08 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.12 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.15 PM.webp"),
  art("WhatsApp Image 2026-06-08 at 12.32.18 PM.webp"),
];

export const processMoments = [
  {
    title: "Composition",
    description:
      "Letter placement, rhythm, and spacing are sketched first so the final work feels balanced from a distance and close up.",
    image: art("WhatsApp Image 2026-06-08 at 12.32.42 PM.webp"),
  },
  {
    title: "Layering",
    description:
      "Color fields, texture, and ornament are built in transparent passes to keep the surface rich without becoming busy.",
    image: art("WhatsApp Image 2026-06-08 at 12.32.44 PM.webp"),
  },
  {
    title: "Finishing",
    description:
      "Gold accents, highlights, and edge details are refined so the piece holds presence under exhibition lighting.",
    image: art("WhatsApp Image 2026-06-08 at 12.32.46 PM.webp"),
  },
];

export const achievements = [
  {
    title: "PNCA Calligraphy Training Certificate",
    detail: "6-month training course completed in calligraphy",
    image: cert("certificate 1.webp"),
  },
  {
    title: "Ashraf-ul-Qalam National Calligraphy Competition 2025",
    detail: "Participation in a major national calligraphy event",
    image: cert("certificate 2.webp"),
  },
  {
    title: "Al-Qadir University Project Trust",
    detail: "Poster competition participation and recognition",
    image: cert("certificate 3.webp"),
  },
  {
    title: "Calligraphy Competition Recognition",
    detail: "Award and presentation moments from recent art events",
    image: cert("certificate 4.webp"),
  },
  {
    title: "Certificate of Achievement",
    detail: "Recognition for calligraphy practice and presentation",
    image: cert("certificate 5.webp"),
  },
  {
    title: "Workshop and Public Presentation",
    detail: "Teaching, exhibition, and community-facing art activity",
    image: cert("certificate 6.webp"),
  },
];

export const testimonials = [
  {
    name: "Collector, Lahore",
    role: "Private collection",
    quote:
      "Faryal's work has a rare balance of spiritual calm and visual strength. The piece transformed the room immediately.",
    image: me("WhatsApp Image 2026-06-08 at 12.33.11 PM.webp"),
  },
  {
    name: "Workshop Participant",
    role: "Beginner calligraphy class",
    quote:
      "Her teaching style is patient and encouraging. She explains the foundation clearly and helps you build confidence quickly.",
    image: me("WhatsApp Image 2026-06-08 at 12.33.12 PM (1).webp"),
  },
  {
    name: "Gallery Visitor",
    role: "Exhibition audience",
    quote:
      "The work feels thoughtful and carefully composed. It brings together tradition and a contemporary visual language beautifully.",
    image: me("WhatsApp Image 2026-06-08 at 12.33.13 PM.webp"),
  },
];
