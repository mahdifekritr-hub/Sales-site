"use client"

import { useRef, useEffect, useState } from "react"
import { BlogCard } from "@/components/landing/blog-card"

const blogPosts = [
  {
    title: "The Complete Guide to Asset Lifecycle Management",
    excerpt: "Learn how to track assets from acquisition to disposal, optimize maintenance schedules, and make data-driven replacement decisions.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop",
    category: "Best Practices",
    author: "Michael Torres",
    publishDate: "May 15, 2026",
    readTime: "10 min read",
    slug: "asset-lifecycle-management-guide",
  },
  {
    title: "QR Codes vs. Barcodes: Which is Best for Asset Tracking?",
    excerpt: "Compare different asset identification methods and learn which technology works best for your property management needs.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop",
    category: "Technology",
    author: "Sarah Kim",
    publishDate: "May 12, 2026",
    readTime: "7 min read",
    slug: "qr-codes-vs-barcodes-asset-tracking",
  },
  {
    title: "Inventory Management Best Practices for Property Managers",
    excerpt: "Discover proven strategies for maintaining optimal stock levels, reducing waste, and automating reorder processes.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=450&fit=crop",
    category: "Operations",
    author: "James Rodriguez",
    publishDate: "May 8, 2026",
    readTime: "8 min read",
    slug: "inventory-management-best-practices",
  },
  {
    title: "Calculating Total Cost of Ownership for Building Equipment",
    excerpt: "How to accurately track and analyze the true cost of owning and maintaining your property assets over time.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
    category: "Finance",
    author: "Emily Chen",
    publishDate: "May 5, 2026",
    readTime: "6 min read",
    slug: "total-cost-ownership-equipment",
  },
  {
    title: "Building a Preventive Maintenance Schedule from Asset Data",
    excerpt: "Use your asset tracking data to create smarter maintenance schedules that extend equipment life and reduce costs.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=450&fit=crop",
    category: "Maintenance",
    author: "David Park",
    publishDate: "May 2, 2026",
    readTime: "9 min read",
    slug: "preventive-maintenance-from-asset-data",
  },
  {
    title: "Warranty Tracking: Never Miss a Claim Again",
    excerpt: "Implement a systematic approach to warranty management that protects your investments and reduces replacement costs.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop",
    category: "Management",
    author: "Lisa Johnson",
    publishDate: "Apr 28, 2026",
    readTime: "7 min read",
    slug: "warranty-tracking-guide",
  },
]

export function AssetsBlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const positionRef = useRef(0)
  const animationRef = useRef<number>()

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
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance text-foreground">
          Asset management insights & resources
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          Stay ahead with expert insights on asset tracking, inventory management, and equipment lifecycle optimization.
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
              <BlogCard {...post} readArticleText="Read Article" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
