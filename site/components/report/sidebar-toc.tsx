"use client";

import { ExternalLink, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReportSection } from "@/data/report-schema.ts";
import { cn } from "@/lib/utils.ts";

interface SidebarTocProps {
  sections: ReportSection[];
}

const STORAGE_KEY = "sidebar-toc-collapsed";

export function SidebarToc({ sections }: SidebarTocProps) {
  const [activeSection, setActiveSection] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "1") {
        setCollapsed(true);
      }
    } catch {
      // Safari private mode and locked-down browsers throw on localStorage access
    }
    setHydrated(true);
  }, []);

  // Publish --sidebar-w on <html> so the main content wrapper can track
  // the sidebar width via CSS var; avoids threading state through pages
  useEffect(() => {
    if (!hydrated) {
      return;
    }
    const root = document.documentElement;
    root.style.setProperty("--sidebar-w", collapsed ? "3.5rem" : "15rem");
    try {
      window.localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    } catch {
      // Safari private mode and locked-down browsers throw on localStorage access
    }
  }, [collapsed, hydrated]);

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
      className={cn(
        "pointer-events-none fixed top-[calc(3.5rem+2.5rem)] bottom-0 left-0 z-30 hidden py-10 transition-[width,padding] duration-300 ease-out lg:block",
        collapsed ? "w-14 px-2" : "w-60 px-6"
      )}
    >
      <div className="pointer-events-auto flex h-full max-h-[calc(100vh-8rem)] flex-col">
        <div
          className={cn(
            "mb-5 flex items-center",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
              Contents
            </p>
          )}
          <button
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/70 transition-colors hover:bg-muted/50 hover:text-foreground"
            onClick={() => setCollapsed((v) => !v)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            type="button"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav aria-label="Table of contents" className="flex-1 overflow-y-auto">
          <div
            className={cn(
              "relative",
              collapsed ? "" : "border-border/50 border-l"
            )}
          >
            {sections.map((section, idx) => {
              const isActive = activeSection === section.id;
              const number = String(idx + 1).padStart(2, "0");

              return (
                <button
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex w-full items-baseline text-left transition-all duration-200",
                    collapsed
                      ? cn(
                          "my-0.5 justify-center rounded-md py-1.5",
                          isActive ? "bg-primary/10" : "hover:bg-muted/50"
                        )
                      : cn(
                          "-ml-px gap-3 border-l-2 py-2 pl-4",
                          isActive
                            ? "border-primary"
                            : "border-transparent hover:border-border"
                        )
                  )}
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  title={collapsed ? section.label : undefined}
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

                  {!collapsed && (
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
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <div
          className={cn(
            "mt-4 shrink-0 border-border/50 border-t pt-4",
            collapsed && "flex justify-center"
          )}
        >
          <button
            aria-label="Jump to sources"
            className={cn(
              "flex items-center text-muted-foreground/70 transition-colors duration-200 hover:text-muted-foreground",
              collapsed
                ? "h-7 w-7 justify-center rounded-md hover:bg-muted/50"
                : "gap-1.5 text-xs"
            )}
            onClick={() => scrollTo("sources")}
            title={collapsed ? "Sources" : undefined}
            type="button"
          >
            <ExternalLink className="h-3 w-3 shrink-0" />
            {!collapsed && <span>Sources</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
