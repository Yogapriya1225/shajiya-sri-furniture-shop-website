import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Mail,
  Send,
  Navigation,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  BUSINESS,
  buildCallLink,
  buildWhatsAppLink,
  DEFAULT_WHATSAPP_MESSAGE,
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
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  CONTACT PAGE                                                       */
/* ================================================================== */
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    // Simulate submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Thank you! We'll get back to you shortly.");
    setForm({ name: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <>
      {/* ── Header ────────────────────────────────────────────── */}
      <section className="bg-secondary/40 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Get In Touch"
            title="Visit Or Contact Our Showroom"
            description="We'd love to hear from you. Drop by our showroom, give us a call, or send a message — we're here to help you find the perfect furniture."
          />

          {/* Big action buttons */}
          <div className="mx-auto mt-8 flex max-w-lg flex-col gap-4 sm:flex-row">
            <Button size="lg" variant="call" className="flex-1 text-base" asChild>
              <a href={buildCallLink()}>
                <Phone className="h-5 w-5" />
                Call Now — {BUSINESS.phone}
              </a>
            </Button>
            <Button
              size="lg"
              variant="whatsapp"
              className="flex-1 text-base"
              asChild
            >
              <a
                href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </Container>
      </section>

      {/* ── Contact Details + Form ────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* ── Left: Details ────────────────────────────── */}
            <FadeIn>
              <div className="space-y-6">
                {/* Location card */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <Building2 className="h-5 w-5 text-primary" />
                    {BUSINESS.name}
                  </h3>

                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div className="flex gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Address</p>
                        <p>{BUSINESS.address.full}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <a
                          href={buildCallLink()}
                          className="transition-colors hover:text-primary"
                        >
                          {BUSINESS.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <a
                          href={`mailto:${BUSINESS.email}`}
                          className="transition-colors hover:text-primary"
                        >
                          {BUSINESS.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">
                          Business Hours
                        </p>
                        {BUSINESS.businessHours.map((b) => (
                          <p key={b.day}>
                            {b.day}: {b.hours}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button variant="outline" asChild>
                      <a
                        href={BUSINESS.mapDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="h-4 w-4" />
                        Get Directions on Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ── Right: Contact Form ─────────────────────── */}
            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
                  Send Us a Message
                </h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Fill in the form below and we'll get back to you as soon as
                  possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder="Tell us what furniture you're looking for..."
                      value={form.message}
                      onChange={handleChange}
                      className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── Google Map ────────────────────────────────────────── */}
      <section className="pb-16 sm:pb-20">
        <Container>
          <FadeIn>
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
        </Container>
      </section>
    </>
  );
}
