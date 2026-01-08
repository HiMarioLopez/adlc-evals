"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "capabilities", label: "Runtime" },
  { id: "security", label: "Security" },
  { id: "pricing", label: "Pricing" },
  { id: "code", label: "Code" },
  { id: "observability", label: "Observability" },
  { id: "regional", label: "Regional" },
  { id: "adoption", label: "Adoption" },
]

export function Nav() {
  const [activeSection, setActiveSection] = useState("overview")
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
      
      const sectionElements = sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id)
      }))
      
      for (const section of sectionElements.reverse()) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <svg className="w-5 h-5 text-background" viewBox="0 0 76 65" fill="currentColor">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>
            <span className="font-semibold hidden sm:block">Agent Stack Report</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm transition-colors",
                  activeSection === section.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground px-2 py-1 rounded bg-secondary">
              Claude Opus 4.5
            </span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && (
                resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4 text-foreground" />
                ) : (
                  <Moon className="w-4 h-4 text-foreground" />
                )
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
