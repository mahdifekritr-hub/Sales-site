"use client";

import { useLanguage } from "./language-provider";
import { locales } from "@/i18n/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground "
        >
          <Globe className="h-4 w-4" />
          <span>{locale === "en" ? "EN" : "TR"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} alignOffset={-65} className="min-w-[120px]">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => setLocale(loc)}
            className={`cursor-pointer ${locale === loc ? "bg-secondary" : ""}`}
          >
            <span>{loc === "en" ? "English" : "Türkçe"}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Inline version for mobile menu
export function LanguageSwitcherInline() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${locale === loc
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            }`}
        >
          <span>{loc === "en" ? "English" : "Türkçe"}</span>
        </button>
      ))}
    </div>
  );
}
