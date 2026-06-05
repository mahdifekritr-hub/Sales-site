"use client"

import { useRef, useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { BlogCard } from "./blog-card"

const blogPosts = [
  {
    title: "10 Property Management Trends Reshaping Real Estate in 2026",
    excerpt: "Discover the cutting-edge technologies and strategies that are transforming how property managers operate, from AI-powered tenant screening to predictive maintenance systems.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop",
    category: "Industry Trends",
    author: "Sarah Mitchell",
    publishDate: "May 8, 2026",
    readTime: "8 min read",
    slug: "property-management-trends-2026",
  },
  {
    title: "How AI is Revolutionizing Tenant-Landlord Communication",
    excerpt: "Learn how artificial intelligence is streamlining communication, automating responses, and improving satisfaction rates for both tenants and property owners.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop",
    category: "Technology",
    author: "Michael Chen",
    publishDate: "May 5, 2026",
    readTime: "6 min read",
    slug: "ai-tenant-communication",
  },
  {
    title: "The Complete Guide to Virtual Property Tours",
    excerpt: "Everything you need to know about implementing virtual tours, from 360-degree photography to interactive walkthroughs that convert viewers into tenants.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=450&fit=crop",
    category: "Virtual Tours",
    author: "Emily Rodriguez",
    publishDate: "May 2, 2026",
    readTime: "10 min read",
    slug: "virtual-property-tours-guide",
  },
  {
    title: "Maximizing Rental Income: Data-Driven Pricing Strategies",
    excerpt: "Use market analytics and dynamic pricing models to optimize your rental rates while maintaining high occupancy levels throughout the year.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
    category: "Revenue",
    author: "David Park",
    publishDate: "Apr 28, 2026",
    readTime: "7 min read",
    slug: "data-driven-pricing-strategies",
  },
  {
    title: "Sustainable Property Management: A Green Future",
    excerpt: "Explore eco-friendly practices that reduce environmental impact while cutting operational costs and attracting environmentally-conscious tenants.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=450&fit=crop",
    category: "Sustainability",
    author: "Lisa Green",
    publishDate: "Apr 24, 2026",
    readTime: "9 min read",
    slug: "sustainable-property-management",
  },
  {
    title: "Building Trust: Transparent Reporting for Property Owners",
    excerpt: "How modern reporting dashboards and real-time analytics are helping property managers build stronger relationships with their clients.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    category: "Best Practices",
    author: "James Wilson",
    publishDate: "Apr 20, 2026",
    readTime: "5 min read",
    slug: "transparent-reporting-owners",
  },
]

export function BlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const positionRef = useRef(0)
  const animationRef = useRef<number>()
  const t = useTranslations("blog")

  const duplicatedPosts = [...blogPosts, ...blogPosts, ...blogPosts]

  useEffect(() => {
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
  }, [isHovered])

  return (
    <section id="blog" className="py-16 sm:py-24 lg:py-15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-16 lg:mb-20">
        {/* <span className="inline-block px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-primary bg-primary/10 rounded-full">
          Insights & Resources
        </span> */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance text-foreground">
          {t("sectionTitle")}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          {t("subtitle")}
        </p>
      </div>

      <div
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div ref={scrollRef} className="flex gap-4 sm:gap-6" style={{ width: "fit-content" }}>
          {duplicatedPosts.map((post, index) => (
            <div key={index} className="flex-shrink-0 w-[80vw] sm:w-[60vw] lg:w-[400px]">
              <BlogCard {...post} readArticleText={t("readArticle")} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
