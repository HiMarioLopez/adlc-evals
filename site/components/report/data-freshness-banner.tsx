"use client";

import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

export function DataFreshnessBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-16 z-40 w-full">
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/90 via-orange-500/90 to-amber-500/90 dark:from-amber-600/95 dark:via-orange-500/95 dark:to-amber-600/95">
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-center gap-3 py-2.5 text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 animate-ping rounded-full bg-white/20" />
                <AlertCircle className="relative h-4 w-4" />
              </div>

              <p className="font-medium text-xs sm:text-sm">
                <span className="hidden sm:inline">
                  All data, especially pricing, captured{" "}
                </span>
                <span className="sm:hidden">Data captured </span>
                <time
                  className="font-bold underline decoration-white/40 underline-offset-2"
                  dateTime="2026-01-08"
                >
                  January 8, 2026
                </time>
                <span className="mx-1.5 opacity-60">·</span>
                <span className="opacity-90">
                  Always verify with official sources
                </span>
              </p>
            </div>

            <button
              aria-label="Dismiss banner"
              className="group absolute right-3 rounded-full p-1 transition-colors hover:bg-white/20 sm:right-4"
              onClick={() => setDismissed(true)}
            >
              <X className="h-4 w-4 transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
