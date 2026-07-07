import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  compact?: boolean;
}

/**
 * Signature brand mark: an "SS" monogram built from two joined arcs
 * that echo a wingback chair's silhouette — a nod to the showroom's
 * product without leaning on a generic sofa icon.
 */
export default function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2.5 shrink-0 group", className)}
      aria-label="Shajiya Sri Furniture Mart — Home"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:-rotate-3"
      >
        <rect width="40" height="40" rx="12" className="fill-primary" />
        <path
          d="M11 26V16.5C11 14 12.8 12 15.5 12C17.6 12 19 13.4 19 15.5V19"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M29 26V16.5C29 14 27.2 12 24.5 12C22.4 12 21 13.4 21 15.5V19"
          stroke="hsl(var(--accent))"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <rect x="10" y="19" width="20" height="4.5" rx="2.25" className="fill-primary-foreground" />
        <rect x="9" y="26" width="4" height="4" rx="1.2" className="fill-accent" />
        <rect x="27" y="26" width="4" height="4" rx="1.2" className="fill-accent" />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Shajiya Sri
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-primary/80 sm:text-xs">
            Furniture Mart
          </span>
        </span>
      )}
    </Link>
  );
}
