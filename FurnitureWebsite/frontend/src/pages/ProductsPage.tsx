import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Phone,
  MessageCircle,
  SlidersHorizontal,
  X,
} from "lucide-react";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { DEMO_PRODUCTS, PRODUCT_CATEGORY_NAMES } from "@/data/demoProducts";
import {
  buildCallLink,
  buildWhatsAppLink,
  productEnquiryMessage,
} from "@/utils/constants";

const PRODUCTS_PER_PAGE = 12;

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
/*  PRODUCTS PAGE                                                      */
/* ================================================================== */
export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const categories = useMemo(() => ["All", ...PRODUCT_CATEGORY_NAMES], []);

  const filteredProducts = useMemo(() => {
    let products = DEMO_PRODUCTS;

    if (activeCategory !== "All") {
      products = products.filter((p) => p.categoryName === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
      );
    }

    return products;
  }, [activeCategory, searchQuery]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => setVisibleCount((v) => v + PRODUCTS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PRODUCTS_PER_PAGE);
  };

  return (
    <>
      {/* ── Hero Banner ───────────────────────────────────────── */}
      <section className="bg-secondary/40 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Collection"
            title="Browse Our Furniture Catalogue"
            description="Explore 500+ products across sofas, beds, wardrobes, dining tables, and more. Find the perfect piece for your home."
          />

          {/* Search */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, category, or material..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(PRODUCTS_PER_PAGE);
                }}
                className="w-full rounded-full border border-border bg-card py-3 pl-12 pr-12 text-sm text-foreground shadow-soft outline-none transition-shadow focus:ring-2 focus:ring-primary/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Category Filters + Products ───────────────────────── */}
      <section className="py-12 sm:py-16">
        <Container>
          {/* Category tabs */}
          <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <SlidersHorizontal className="mr-1 h-4 w-4 shrink-0 text-muted-foreground" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {visibleProducts.length} of {filteredProducts.length} products
            {activeCategory !== "All" && (
              <span>
                {" "}
                in <strong className="text-foreground">{activeCategory}</strong>
              </span>
            )}
            {searchQuery && (
              <span>
                {" "}
                matching "<strong className="text-foreground">{searchQuery}</strong>"
              </span>
            )}
          </p>

          {/* Product grid */}
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product, i) => (
                <FadeIn key={product.id} delay={(i % PRODUCTS_PER_PAGE) * 0.04}>
                  <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                    {/* Image */}
                    <Link
                      to={`/products/${product.slug}`}
                      className="relative aspect-[4/3] overflow-hidden"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.isNewArrival && (
                        <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-accent-foreground shadow-soft">
                          New Arrival
                        </span>
                      )}
                    </Link>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-4">
                      <span className="mb-1 inline-block self-start rounded-full bg-secondary px-3 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-primary">
                        {product.categoryName}
                      </span>
                      <Link to={`/products/${product.slug}`}>
                        <h3 className="font-display text-base font-semibold text-foreground line-clamp-1 hover:text-primary">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-1 flex-1 text-xs text-muted-foreground line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/70">Material:</span>{" "}
                        {product.material}
                      </p>

                      {/* Actions */}
                      <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
                        <Button
                          size="sm"
                          variant="whatsapp"
                          className="flex-1 text-xs"
                          asChild
                        >
                          <a
                            href={buildWhatsAppLink(
                              productEnquiryMessage(product.name)
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle className="h-3 w-3" />
                            Enquire
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="call"
                          className="flex-1 text-xs"
                          asChild
                        >
                          <a href={buildCallLink()}>
                            <Phone className="h-3 w-3" />
                            Call Now
                          </a>
                        </Button>
                      </div>
                      <Link
                        to={`/products/${product.slug}`}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-accent"
                      >
                        View Details
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-20 text-center">
              <Search className="mb-4 h-12 w-12 text-muted-foreground/40" />
              <h3 className="font-display text-xl font-semibold text-foreground">
                No products found
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different search term or category filter.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <FadeIn className="mt-12 text-center">
              <Button variant="outline" size="lg" onClick={handleLoadMore}>
                Load More Products
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </FadeIn>
          )}
        </Container>
      </section>
    </>
  );
}
