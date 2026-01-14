"use client";

import { ChevronLeft, ExternalLink, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { ReportSection } from "@/data/report-schema";
import { cn } from "@/lib/utils";

interface NavigationProps {
  sections: ReportSection[];
}

export function Navigation({ sections }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Find active section
      const sectionElements = sections
        .map((s) => ({
          id: s.id,
          el: document.getElementById(s.id),
        }))
        .filter((s) => s.el);

      for (const section of [...sectionElements].reverse()) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 w-full transition-all duration-300",
          mobileOpen ? "z-[60]" : "z-50",
          isScrolled
            ? "border-border border-b bg-background/85 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo + Back link */}
          <div className="flex items-center gap-3">
            <Link
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              href="/"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden font-medium text-sm sm:inline">
                All Reports
              </span>
            </Link>
            <div className="hidden h-6 w-px bg-border sm:block" />
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-primary/20 blur-md" />
              <div className="relative flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5">
                <svg
                  className="h-4 w-4 text-foreground"
                  fill="currentColor"
                  viewBox="0 0 76 65"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
                <span className="font-medium text-muted-foreground text-sm">
                  vs
                </span>
                <span className="font-bold text-aws text-sm">A</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-sm">Agent Stack Report</span>
              <span className="ml-2 font-mono text-muted-foreground text-xs">
                2026
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 xl:flex">
            {sections.map((section) => (
              <button
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm transition-all duration-200",
                  activeSection === section.id
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
                key={section.id}
                onClick={() => scrollTo(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium text-muted-foreground text-xs transition-colors hover:bg-muted/50 hover:text-foreground sm:flex"
              onClick={() => scrollTo("sources")}
            >
              View Sources
              <ExternalLink className="h-3 w-3" />
            </button>

            <button
              aria-label="Toggle theme"
              className="rounded-lg bg-secondary/50 p-2 transition-colors hover:bg-secondary"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {mounted &&
                (resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                ))}
            </button>

            <button
              aria-label="Toggle menu"
              className="rounded-lg p-2 transition-colors hover:bg-muted/50 xl:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] bg-background/98 pt-20 backdrop-blur-xl xl:hidden">
          <div className="flex flex-col gap-1 p-6">
            {sections.map((section, idx) => (
              <button
                className={cn(
                  "w-full animate-fade-up rounded-xl px-4 py-3 text-left text-lg opacity-0 transition-all duration-200",
                  activeSection === section.id
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
                key={section.id}
                onClick={() => scrollTo(section.id)}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
