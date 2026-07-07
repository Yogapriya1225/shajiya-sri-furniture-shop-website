import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  ChevronDown,
  Star,
  ShieldCheck,
  BadgeIndianRupee,
  Palette,
  Truck,
  Heart,
  Award,
  Quote,
} from "lucide-react";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { BUSINESS, buildCallLink, buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/utils/constants";
import { HOME_CATEGORIES } from "@/data/categories";
import { FEATURED_PRODUCTS } from "@/data/demoProducts";
import { TESTIMONIALS } from "@/data/testimonials";
import { HERO_IMAGES } from "@/data/imageConstants";

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */
function AnimatedCounter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="font-display text-4xl font-bold text-primary sm:text-5xl lg:text-6xl"
    >
      {isInView ? target : 0}
      {suffix}
    </motion.span>
  );
}

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */
export default function HomePage() {
  return (
    <>
      {/* ── Hero Section ──────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGES.main}
            alt="Premium furniture showroom"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-charcoal/30" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 inline-block rounded-full border border-gold/40 bg-gold/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light"
            >
              Premium Furniture Store in Salem
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Elegant Furniture
              <br />
              <span className="text-gold-light">For Every Home</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg"
            >
              Discover handcrafted sofas, beds, dining sets, wardrobes, and
              more — designed for comfort, built to last, and priced to
              delight. Visit our showroom in Salem today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex flex-wrap gap-3 sm:gap-4"
            >
              <Button size="lg" variant="gold" asChild>
                <Link to="/products">
                  Explore Collection
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="call" asChild>
                <a href={buildCallLink()}>
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
              <Button size="lg" variant="whatsapp" asChild>
                <a
                  href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-cream/60">
              Scroll to Explore
            </span>
            <ChevronDown className="h-5 w-5 text-gold-light" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Featured Categories ───────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Collections"
            title="Browse By Category"
            description="From plush sofas to elegant dining sets — explore furniture for every room in your home."
          />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {HOME_CATEGORIES.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 0.07}>
                <Link
                  to="/products"
                  className="group relative overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {cat.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-cream/70 line-clamp-1">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────── */}
      <section className="bg-secondary/40 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Built On Trust, Crafted With Care"
            description="For years, families across Salem have trusted us for quality, affordability, and timeless designs."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Quality Materials",
                desc: "Every piece is crafted from premium-grade solid wood, engineered board, and high-density foam for lasting durability.",
              },
              {
                icon: BadgeIndianRupee,
                title: "Affordable Pricing",
                desc: "Factory-direct sourcing and lean operations let us offer showroom-quality furniture at prices that respect your budget.",
              },
              {
                icon: Palette,
                title: "Modern Designs",
                desc: "Our collection blends contemporary aesthetics with traditional craftsmanship — so your home always looks its best.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "We offer prompt delivery across Salem and surrounding areas with careful handling and professional installation.",
              },
              {
                icon: Heart,
                title: "Customer Satisfaction",
                desc: "With a 5.0 Google rating and 1000+ happy customers, your satisfaction is our greatest achievement.",
              },
              {
                icon: Award,
                title: "Years of Trust",
                desc: "As a family-run showroom, we've built lasting relationships through honesty, quality, and consistent service.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Statistics ────────────────────────────────────────── */}
      <section className="bg-charcoal py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
            {[
              { value: BUSINESS.stats.products, label: "Products" },
              { value: BUSINESS.stats.happyCustomers, label: "Happy Customers" },
              { value: BUSINESS.stats.designs, label: "Designs" },
            ].map((stat) => (
              <div key={stat.label}>
                <AnimatedCounter target={stat.value} />
                <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-cream/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Featured Products ─────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Top Picks"
            title="Featured Furniture"
            description="Handpicked bestsellers loved by our customers. Each piece combines comfort, style, and unmatched quality."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRODUCTS.slice(0, 8).map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.07}>
                <Link
                  to={`/products/${product.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <span className="mb-1 inline-block rounded-full bg-secondary px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
                      {product.categoryName}
                    </span>
                    <h3 className="font-display text-base font-semibold text-foreground line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors group-hover:text-accent">
                        View Details
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="bg-secondary/40 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Customer Reviews"
            title="What Our Customers Say"
            description="Real stories from families who chose Shajiya Sri Furniture Mart for their homes and offices."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.08}>
                <div className="relative rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
                  <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star
                        key={si}
                        className="h-4 w-4 fill-gold text-gold"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-5">
                    "{t.message}"
                  </p>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="font-display text-sm font-semibold text-foreground">
                      {t.customerName}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Google Map ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Find Us"
            title="Visit Our Showroom"
            description={BUSINESS.address.full}
          />

          <FadeIn className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
              <iframe
                src={BUSINESS.mapEmbedSrc}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shajiya Sri Furniture Mart location"
                className="w-full"
              />
            </div>
          </FadeIn>

          <FadeIn className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a
                href={BUSINESS.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="call" asChild>
              <a href={buildCallLink()}>
                <Phone className="h-4 w-4" />
                Call Now — {BUSINESS.phone}
              </a>
            </Button>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
