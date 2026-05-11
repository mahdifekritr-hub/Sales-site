"use client"

import Image from "next/image"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BlogCardProps {
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  authorAvatar?: string
  publishDate: string
  readTime: string
  slug?: string
  className?: string
}

export function BlogCard({
  title,
  excerpt,
  image,
  category,
  author,
  authorAvatar,
  publishDate,
  readTime,
  slug,
  className,
}: BlogCardProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col overflow-hidden rounded-3xl bg-card shadow-card group cursor-pointer",
        className
      )}
      style={{
        boxShadow:
          "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
      }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Category badge */}
        <div className="absolute left-3 top-3 rounded-lg bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
          {category}
        </div>

        {/* Title on image */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-balance text-xl font-bold text-white leading-tight line-clamp-2">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Excerpt */}
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        {/* Meta info */}
        {/* <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{publishDate}</span>
            <span className="text-border">•</span>
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div> */}

        {/* Author & CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          {/* <div className="flex items-center gap-3">
            {authorAvatar ? (
              <Image
                src={authorAvatar}
                alt={author}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            <span className="text-sm font-medium text-foreground">{author}</span>
          </div> */}
          <button className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 group/btn">
            Read Article
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
