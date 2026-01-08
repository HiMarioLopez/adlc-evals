"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, ExternalLink } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const sections = [
  { id: "delta", label: "2026 Delta" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "pricing", label: "Pricing" },
  { id: "calculator", label: "Calculator" },
  { id: "code", label: "Code" },
  { id: "regions", label: "Regions" },
  { id: "adoption", label: "Adoption" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Find active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id)
      })).filter(s => s.el)
      
      for (const section of [...sectionElements].reverse()) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setMobileOpen(false)
    }
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md" />
              <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border">
                <svg className="w-4 h-4 text-foreground" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
                <span className="text-muted-foreground text-sm font-medium">vs</span>
                <span className="text-aws font-bold text-sm">A</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-sm">Agent Stack Report</span>
              <span className="text-muted-foreground text-xs ml-2 font-mono">2026</span>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-all duration-200",
                  activeSection === section.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              View Sources
              <ExternalLink className="w-3 h-3" />
            </a>
            
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && (
                resolvedTheme === "dark" 
                  ? <Sun className="w-4 h-4" />
                  : <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl lg:hidden pt-20">
          <div className="flex flex-col p-6 gap-1">
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={cn(
                  "w-full px-4 py-3 text-left text-lg rounded-xl transition-all duration-200 opacity-0 animate-fade-up",
                  activeSection === section.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
