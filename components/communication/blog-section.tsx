"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { BlogCard } from "@/components/landing/blog-card"
import type { HomeBlogCardData } from "@/lib/blog-home-posts"

type CommunicationBlogSectionProps = {
  posts: HomeBlogCardData[]
}

export function CommunicationBlogSection({ posts }: CommunicationBlogSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const positionRef = useRef(0)
  const animationRef = useRef<number | undefined>(undefined)

  const duplicatedPosts = useMemo(() => {
    if (posts.length === 0) return []
    return [...posts, ...posts, ...posts]
  }, [posts])

  useEffect(() => {
    if (duplicatedPosts.length === 0) return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const speed = isHovered ? 0.3 : 1
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      positionRef.current += speed * (deltaTime / 16)

      const totalWidth = scrollContainer.scrollWidth / 3

      if (positionRef.current >= totalWidth) {
        positionRef.current = 0
      }

      scrollContainer.style.transform = `translateX(-${positionRef.current}px)`
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered, duplicatedPosts.length])

  return (
    <section id="blog" className="py-16 sm:py-24 lg:py-15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-16 lg:mb-20">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance text-foreground">
          Communication insights &amp; resources
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          Stay ahead with expert insights on resident engagement, community building, and modern communication strategies.
        </p>
      </div>

      {duplicatedPosts.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground px-4 max-w-xl mx-auto">
          No blog posts could be loaded. Check your connection or try again later.
        </p>
      ) : (
        <div
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div ref={scrollRef} className="flex gap-4 sm:gap-6" style={{ width: "fit-content" }}>
            {duplicatedPosts.map((post, index) => (
              <div key={`${post.slug}-${index}`} className="flex-shrink-0 w-[80vw] sm:w-[60vw] lg:w-[400px]">
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.image}
                  category={post.category}
                  href={post.href}
                  readArticleText="Read Article"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
