"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BlogCardProps {
  title: string
  excerpt: string
  image: string
  category: string
  author?: string
  authorAvatar?: string
  publishDate?: string
  readTime?: string
  slug?: string
  /** Full URL to the article (e.g. Help Center). When set, the card is clickable. */
  href?: string
  className?: string
  readArticleText?: string
  /** When true and `href` is external, open in a new tab. */
  openInNewTab?: boolean
}

export function BlogCard({
  title,
  excerpt,
  image,
  category,
  readArticleText = "Read Article",
  href,
  className,
  openInNewTab = true,
}: BlogCardProps) {
  const isExternal = href ? /^https?:\/\//i.test(href) : false
  const rel = isExternal && openInNewTab ? "noopener noreferrer" : undefined
  const target = isExternal && openInNewTab ? "_blank" : undefined

  const inner = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <h3 className="mb-2 sm:mb-3 text-balance text-base sm:text-lg font-bold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-border">
          <div className="">
            <span className="inline-block rounded-full bg-primary/10 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-primary">
              {category}
            </span>
          </div>

          <span className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold text-primary transition-colors group-hover:text-primary/80 group/btn">
            {readArticleText}
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </span>
        </div>
      </div>
    </div>
  )

  const shellClass = cn(
    "w-full h-full flex flex-col overflow-hidden rounded-3xl bg-card shadow-card group cursor-pointer",
    className
  )

  const shadowStyle = {
    boxShadow:
      "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
  } as const

  if (href) {
    return (
      <Link
        href={href}
        className={shellClass}
        style={shadowStyle}
        target={target}
        rel={rel}
      >
        {inner}
      </Link>
    )
  }

  return (
    <div className={shellClass} style={shadowStyle}>
      {inner}
    </div>
  )
}
