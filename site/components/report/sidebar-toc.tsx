"use client";

import {
  ExternalLink,
  PanelLeft,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ReportSection } from "@/data/report-schema.ts";
import { cn } from "@/lib/utils.ts";

interface SidebarTocProps {
  sections: ReportSection[];
}

type SidebarState = "expanded" | "collapsed" | "hidden";

const STORAGE_KEY = "sidebar-toc-state";
const LEGACY_STORAGE_KEY = "sidebar-toc-collapsed";

function readStoredState(): SidebarState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "expanded" || raw === "collapsed" || raw === "hidden") {
      return raw;
    }
    const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy === "1") {
      return "collapsed";
    }
    if (legacy === "0") {
      return "expanded";
    }
  } catch {
    // Safari private mode and locked-down browsers throw on localStorage access
  }
  return null;
}

function widthFor(state: SidebarState): string {
  if (state === "hidden") {
    return "0rem";
  }
  if (state === "collapsed") {
    return "3.5rem";
  }
  return "15rem";
}

export function SidebarToc({ sections }: SidebarTocProps) {
  const [activeSection, setActiveSection] = useState("");
  const [state, setState] = useState<SidebarState>("collapsed");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredState();
    if (stored) {
      setState(stored);
    } else if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setState("expanded");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    document.documentElement.style.setProperty("--sidebar-w", widthFor(state));
    try {
      window.localStorage.setItem(STORAGE_KEY, state);
    } catch {
      // Safari private mode and locked-down browsers throw on localStorage access
    }
  }, [state, hydrated]);

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

  const collapsed = state === "collapsed";
  const hidden = state === "hidden";

  if (hidden) {
    return (
      <button
        aria-label="Show sidebar"
        className="fixed top-[calc(3.5rem+2.5rem+0.75rem)] left-2 z-30 hidden h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background/70 text-muted-foreground/80 shadow-sm backdrop-blur transition-colors hover:border-border hover:text-foreground md:flex"
        onClick={() => setState("collapsed")}
        title="Show sidebar"
        type="button"
      >
        <PanelLeft className="h-4 w-4" />
      </button>
    );
  }

  return (
    <aside
      aria-label="Report navigation"
      className={cn(
        "pointer-events-none fixed top-[calc(3.5rem+2.5rem)] bottom-0 left-0 z-30 hidden py-10 transition-[width,padding] duration-300 ease-out md:block",
        collapsed ? "w-14 px-2" : "w-60 px-6"
      )}
    >
      <div className="pointer-events-auto flex h-full max-h-[calc(100vh-8rem)] flex-col">
        <div
          className={cn(
            "mb-5 flex items-center",
            collapsed ? "flex-col gap-1" : "justify-between"
          )}
        >
          {!collapsed && (
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
              Contents
            </p>
          )}
          <div
            className={cn(
              "flex items-center",
              collapsed ? "flex-col gap-1" : "gap-1"
            )}
          >
            <button
              aria-expanded={!collapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/70 transition-colors hover:bg-muted/50 hover:text-foreground"
              onClick={() => setState(collapsed ? "expanded" : "collapsed")}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              type="button"
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>
            <button
              aria-label="Hide sidebar"
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-muted/50 hover:text-foreground"
              onClick={() => setState("hidden")}
              title="Hide sidebar"
              type="button"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
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
              const number = String(idx).padStart(2, "0");

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
