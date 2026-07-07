import { motion } from "framer-motion";
import {
  Heart,
  Eye,
  Target,
  ShieldCheck,
  Users,
  Lightbulb,
  Award,
  Gem,
  Handshake,
  Building2,
  TrendingUp,
  Star,
} from "lucide-react";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { BUSINESS } from "@/utils/constants";
import { ABOUT_IMAGES } from "@/data/imageConstants";

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

/* ------------------------------------------------------------------ */
/*  Timeline item                                                      */
/* ------------------------------------------------------------------ */
function TimelineItem({
  year,
  title,
  description,
  isLast = false,
  index = 0,
}: {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
  index?: number;
}) {
  return (
    <FadeIn delay={index * 0.1} className="relative flex gap-6">
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
          <span className="text-xs font-bold">{year}</span>
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-border" />}
      </div>
      {/* Content */}
      <div className="pb-10">
        <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </FadeIn>
  );
}

/* ================================================================== */
/*  ABOUT PAGE                                                         */
/* ================================================================== */
export default function AboutPage() {
  return (
    <>
      {/* ── Hero Banner ───────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0">
          <img
            src={ABOUT_IMAGES.showroomInterior}
            alt="Shajiya Sri Furniture Mart showroom interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 to-charcoal/60" />
        </div>
        <Container className="relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full border border-gold/40 bg-gold/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            {BUSINESS.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-4 max-w-2xl text-base text-cream/80 sm:text-lg"
          >
            {BUSINESS.tagline} — A family-run furniture showroom in Salem
            bringing quality craftsmanship and modern design to every home.
          </motion.p>
        </Container>
      </section>

      {/* ── Our Story ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <span className="mb-3 inline-block rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Our Story
                </span>
                <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                  From a Small Workshop to Salem's Trusted Showroom
                </h2>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <p>
                    Shajiya Sri Furniture Mart was born from a simple belief: every
                    family deserves beautiful, well-built furniture at a fair price.
                    What started as a modest workshop in Malagalapuram has grown into
                    one of Salem's most trusted furniture showrooms.
                  </p>
                  <p>
                    Our founder's passion for woodworking and eye for design laid the
                    foundation for a business that combines traditional craftsmanship
                    with contemporary aesthetics. Over the years, we have expanded our
                    collection to include sofas, beds, dining sets, wardrobes, office
                    furniture, and much more — all sourced from the finest manufacturers
                    and local artisans.
                  </p>
                  <p>
                    Today, with over 500 products on display and 1,000+ happy customers,
                    we continue to uphold the values that started it all — honesty,
                    quality, and an unwavering commitment to customer satisfaction.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="overflow-hidden rounded-2xl shadow-card">
                <img
                  src={ABOUT_IMAGES.showroomExterior}
                  alt="Our showroom"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── Mission · Vision · Values ─────────────────────────── */}
      <section className="bg-secondary/40 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What Drives Us"
            title="Mission, Vision & Values"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "To make premium-quality furniture accessible to every household in Salem and beyond, offering designs that blend style, comfort, and durability at honest prices.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                text: "To become Tamil Nadu's most loved furniture destination — known for exceptional craftsmanship, innovative designs, and an unmatched customer experience.",
              },
              {
                icon: Heart,
                title: "Our Values",
                text: "Integrity in every transaction. Quality in every product. Warmth in every interaction. We treat every customer like family and every piece of furniture as a reflection of our reputation.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="group rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-8">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Why Customers Trust Us ────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Your Trust, Our Promise"
            title="Why Customers Choose Us"
            description="We go beyond selling furniture — we build relationships and ensure every customer walks away delighted."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Quality Commitment",
                desc: "We source only from certified manufacturers and conduct rigorous quality checks. Every product that leaves our showroom meets our exacting standards.",
              },
              {
                icon: Users,
                title: "Customer Satisfaction",
                desc: "Our 5.0 Google rating speaks for itself. We listen, advise, and go the extra mile to ensure you find exactly what your home needs.",
              },
              {
                icon: Lightbulb,
                title: "Modern Furniture Solutions",
                desc: "From space-saving designs for apartments to grand pieces for bungalows, our collection caters to every lifestyle with contemporary flair.",
              },
              {
                icon: Gem,
                title: "Premium Materials",
                desc: "Solid teak, sheesham, rosewood, and top-grade engineered boards — we use only materials that ensure years of reliable use.",
              },
              {
                icon: Handshake,
                title: "Personalised Service",
                desc: "Our experienced team provides personalised design advice, helping you select furniture that perfectly matches your taste and space.",
              },
              {
                icon: Award,
                title: "After-Sales Support",
                desc: "Our relationship doesn't end at delivery. We offer responsive after-sales support for installation, maintenance, and any concerns.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-card">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Professional Timeline ─────────────────────────────── */}
      <section className="bg-secondary/40 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Journey"
            title="Milestones Along The Way"
            description="A look back at the key moments that shaped Shajiya Sri Furniture Mart."
          />
          <div className="mx-auto mt-12 max-w-2xl">
            {[
              {
                year: "'10",
                title: "Humble Beginnings",
                description:
                  "Started as a small furniture workshop in Malagalapuram, Salem, crafting custom wooden furniture for local families.",
              },
              {
                year: "'14",
                title: "First Showroom Opened",
                description:
                  "Expanded into a full-fledged showroom with a curated collection of living room, bedroom, and dining furniture.",
              },
              {
                year: "'17",
                title: "500+ Product Range",
                description:
                  "Grew our catalogue to over 500 products spanning 12+ categories — from sofas and beds to office furniture and décor.",
              },
              {
                year: "'20",
                title: "1,000 Happy Customers",
                description:
                  "Crossed the milestone of 1,000 satisfied customers and achieved a perfect 5.0 Google rating through word-of-mouth referrals.",
              },
              {
                year: "'24",
                title: "Digital Presence",
                description:
                  "Launched our website to serve customers beyond Salem — making it easy to browse, enquire, and connect with us from anywhere.",
              },
              {
                year: "Now",
                title: "Growing Stronger",
                description:
                  "Continuing to expand our collection with modern designs while staying true to the craftsmanship and values our customers love.",
              },
            ].map((item, i, arr) => (
              <TimelineItem
                key={item.year}
                year={item.year}
                title={item.title}
                description={item.description}
                isLast={i === arr.length - 1}
                index={i}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Stats Banner ──────────────────────────────────────── */}
      <section className="bg-charcoal py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {[
              { icon: Building2, value: "500+", label: "Products" },
              { icon: Users, value: "1000+", label: "Happy Customers" },
              { icon: TrendingUp, value: "100+", label: "Designs" },
              { icon: Star, value: "5.0", label: "Google Rating" },
            ].map((stat) => (
              <FadeIn key={stat.label}>
                <div className="flex flex-col items-center">
                  <stat.icon className="mb-2 h-6 w-6 text-gold" />
                  <span className="font-display text-2xl font-bold text-cream sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-cream/60">
                    {stat.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
