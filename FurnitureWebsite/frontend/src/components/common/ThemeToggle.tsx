import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={cn(
        "relative inline-flex h-9 w-16 items-center rounded-full border border-border bg-secondary/70 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <span
        className={cn(
          "absolute left-1 flex h-7 w-7 items-center justify-center rounded-full bg-card shadow-soft transition-transform duration-300 ease-out",
          isDark && "translate-x-7"
        )}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-accent" strokeWidth={2.2} />
        ) : (
          <Sun className="h-4 w-4 text-primary" strokeWidth={2.2} />
        )}
      </span>
    </button>
  );
}
