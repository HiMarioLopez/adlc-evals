"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReportSection } from "@/data/report-schema.ts";
import { cn } from "@/lib/utils.ts";

interface SidebarTocProps {
  sections: ReportSection[];
}

export function SidebarToc({ sections }: SidebarTocProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Report navigation"
      className="pointer-events-none fixed top-[calc(3.5rem+2.5rem)] bottom-0 left-0 z-30 hidden w-60 px-6 py-10 lg:block xl:w-64 xl:px-8"
    >
      <div className="pointer-events-auto max-h-[calc(100vh-8rem)] overflow-y-auto">
        <p className="mb-5 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
          Contents
        </p>

        <nav aria-label="Table of contents">
          <div className="relative border-border/50 border-l">
            {sections.map((section, idx) => {
              const isActive = activeSection === section.id;
              const number = String(idx + 1).padStart(2, "0");

              return (
                <button
                  className={cn(
                    "-ml-px flex w-full items-baseline gap-3 border-l-2 py-2 pl-4 text-left transition-all duration-200",
                    isActive
                      ? "border-primary"
                      : "border-transparent hover:border-border"
                  )}
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  type="button"
                >
                  <span
                    className={cn(
                      "shrink-0 font-mono text-xs tabular-nums transition-colors duration-200",
                      isActive ? "text-primary" : "text-muted-foreground/60"
                    )}
                  >
                    {number}
                  </span>

                  <span
                    className={cn(
                      "text-sm transition-colors duration-200",
                      isActive
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {section.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-6 border-border/50 border-t pt-4">
          <button
            className="flex items-center gap-1.5 text-muted-foreground/70 text-xs transition-colors duration-200 hover:text-muted-foreground"
            onClick={() => scrollTo("sources")}
            type="button"
          >
            <ExternalLink className="h-3 w-3 shrink-0" />
            <span>Sources</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
