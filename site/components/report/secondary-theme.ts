import type { SecondaryPlatformTheme } from "@/data/report-schema.ts";

export const THEME_CLASSES = {
  aws: {
    bg: "bg-aws",
    bgSoft: "bg-aws/5",
    bgSoft10: "bg-aws/10",
    bgSoft15: "bg-aws/15",
    bgSoft20: "bg-aws/20",
    text: "text-aws",
    border: "border-aws",
    borderSoft: "border-aws/20",
    hoverBorder: "hover:border-aws/30",
    hoverBg: "hover:bg-aws/10",
    hoverText: "hover:text-aws",
    blurOrb: "bg-aws/15",
    glow: "glow-aws",
    dataActiveBg: "data-[state=active]:bg-aws",
    dataActiveBgSoft: "bg-aws/20",
  },
  azure: {
    bg: "bg-azure",
    bgSoft: "bg-azure/5",
    bgSoft10: "bg-azure/10",
    bgSoft15: "bg-azure/15",
    bgSoft20: "bg-azure/20",
    text: "text-azure",
    border: "border-azure",
    borderSoft: "border-azure/20",
    hoverBorder: "hover:border-azure/30",
    hoverBg: "hover:bg-azure/10",
    hoverText: "hover:text-azure",
    blurOrb: "bg-azure/15",
    glow: "glow-azure",
    dataActiveBg: "data-[state=active]:bg-azure",
    dataActiveBgSoft: "bg-azure/20",
  },
} as const;

export function themeClasses(theme: SecondaryPlatformTheme) {
  return THEME_CLASSES[theme.accent];
}
