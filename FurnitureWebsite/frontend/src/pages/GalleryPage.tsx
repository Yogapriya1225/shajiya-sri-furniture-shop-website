import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { GALLERY_DATA, GALLERY_SECTIONS } from "@/data/galleryData";

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */
function Lightbox({
  imageUrl,
  caption,
  onClose,
}: {
  imageUrl: string;
  caption: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl shadow-card-hover"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt={caption}
            className="max-h-[85vh] w-full object-contain"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4">
            <p className="text-sm text-cream">{caption}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 text-cream transition-colors hover:bg-charcoal"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  GALLERY PAGE                                                       */
/* ================================================================== */
export default function GalleryPage() {
  const [activeSection, setActiveSection] = useState<string>("All");
  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    caption: string;
  } | null>(null);

  const sections = useMemo(() => ["All", ...GALLERY_SECTIONS], []);

  const filteredImages = useMemo(() => {
    if (activeSection === "All") return GALLERY_DATA;
    return GALLERY_DATA.filter((img) => img.category === activeSection);
  }, [activeSection]);

  // Split into columns for masonry effect
  const columns = useMemo(() => {
    const cols: (typeof GALLERY_DATA)[] = [[], [], []];
    filteredImages.forEach((img, i) => {
      cols[i % 3].push(img);
    });
    return cols;
  }, [filteredImages]);

  return (
    <>
      {/* ── Header ────────────────────────────────────────────── */}
      <section className="bg-secondary/40 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Showroom Gallery"
            title="A Look Inside Our Store"
            description="Step into our showroom through these images. From living rooms to office setups — see the quality and design that awaits you."
          />

          {/* Section filter tabs */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
                  activeSection === section
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Masonry Gallery ───────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4">
                {column.map((img, i) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.06,
                      ease: "easeOut",
                    }}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-soft"
                    onClick={() =>
                      setLightboxImage({
                        url: img.imageUrl,
                        caption: img.caption,
                      })
                    }
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.caption}
                      loading="lazy"
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                        // Alternate heights for masonry feel
                        (colIndex + i) % 3 === 0
                          ? "aspect-[3/4]"
                          : (colIndex + i) % 3 === 1
                          ? "aspect-square"
                          : "aspect-[4/3]"
                      }`}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-all duration-300 group-hover:bg-charcoal/40">
                      <div className="flex flex-col items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <ZoomIn className="mb-2 h-8 w-8 text-cream" />
                        <span className="text-xs font-semibold text-cream">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                    {/* Caption bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent p-3">
                      <p className="text-xs text-cream/90 line-clamp-1">
                        {img.caption}
                      </p>
                      <span className="mt-0.5 inline-block rounded-full bg-cream/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-cream/80">
                        {img.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                No images in this section yet.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* ── Lightbox modal ────────────────────────────────────── */}
      {lightboxImage && (
        <Lightbox
          imageUrl={lightboxImage.url}
          caption={lightboxImage.caption}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  );
}
