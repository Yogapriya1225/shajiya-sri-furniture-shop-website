import { useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  ArrowRight,
  Layers,
  Palette,
  Tag,
} from "lucide-react";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { DEMO_PRODUCTS } from "@/data/demoProducts";
import {
  buildCallLink,
  buildWhatsAppLink,
  productEnquiryMessage,
  BUSINESS,
} from "@/utils/constants";

/* ------------------------------------------------------------------ */
/*  Fade-in wrapper                                                    */
/* ------------------------------------------------------------------ */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  PRODUCT DETAIL PAGE                                                */
/* ================================================================== */
export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = useMemo(
    () => DEMO_PRODUCTS.find((p) => p.slug === slug),
    [slug]
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return DEMO_PRODUCTS.filter(
      (p) => p.categoryName === product.categoryName && p.id !== product.id
    ).slice(0, 4);
  }, [product]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <>
      <section className="py-8 sm:py-12">
        <Container>
          {/* Back link */}
          <FadeIn>
            <Link
              to="/products"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* ── Image gallery ──────────────────────────────── */}
            <FadeIn>
              <div>
                {/* Main image */}
                <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
                  <motion.img
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={product.images[activeImageIndex]}
                    alt={product.name}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                {/* Thumbnail strip */}
                {product.images.length > 1 && (
                  <div className="mt-4 flex gap-3">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                          i === activeImageIndex
                            ? "border-primary shadow-soft"
                            : "border-border opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} view ${i + 1}`}
                          className="h-16 w-20 object-cover sm:h-20 sm:w-24"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* ── Product info ───────────────────────────────── */}
            <FadeIn delay={0.15}>
              <div>
                {/* Category badge */}
                <span className="mb-3 inline-block rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {product.categoryName}
                </span>

                {product.isNewArrival && (
                  <span className="mb-3 ml-2 inline-block rounded-full bg-accent/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    New Arrival
                  </span>
                )}

                <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
                  {product.name}
                </h1>

                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="mt-6 space-y-3 rounded-2xl border border-border bg-secondary/30 p-5">
                  <div className="flex items-start gap-3">
                    <Layers className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Material
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {product.material}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Palette className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Available Colours
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {product.availableColours.map((colour) => (
                          <span
                            key={colour}
                            className="rounded-full border border-border bg-card px-3 py-0.5 text-xs font-medium text-foreground"
                          >
                            {colour}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Tag className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Category
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {product.categoryName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" variant="whatsapp" className="flex-1" asChild>
                    <a
                      href={buildWhatsAppLink(
                        productEnquiryMessage(product.name)
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Enquire on WhatsApp
                    </a>
                  </Button>
                  <Button size="lg" variant="call" className="flex-1" asChild>
                    <a href={buildCallLink()}>
                      <Phone className="h-5 w-5" />
                      Call Now — {BUSINESS.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── Related Products ──────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="bg-secondary/40 py-16 sm:py-20">
          <Container>
            <h2 className="mb-8 font-display text-2xl font-semibold text-foreground sm:text-3xl">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((rp, i) => (
                <FadeIn key={rp.id} delay={i * 0.07}>
                  <Link
                    to={`/products/${rp.slug}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={rp.images[0]}
                        alt={rp.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold text-foreground line-clamp-1">
                        {rp.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {rp.shortDescription}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        View Details <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
