"use client"

import { useRef, useEffect, useState } from "react"
import { BlogCard } from "@/components/landing/blog-card"

const blogPosts = [
  {
    title: "The Complete Guide to Preventive Maintenance Scheduling",
    excerpt: "Learn how to build an effective preventive maintenance program that reduces downtime, extends asset life, and saves money on emergency repairs.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=450&fit=crop",
    category: "Best Practices",
    author: "Michael Torres",
    publishDate: "May 15, 2026",
    readTime: "10 min read",
    slug: "preventive-maintenance-guide",
  },
  {
    title: "How CMMS Software is Transforming Facility Management",
    excerpt: "Discover how computerized maintenance management systems are revolutionizing the way facilities teams track, manage, and optimize their operations.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop",
    category: "Technology",
    author: "Sarah Kim",
    publishDate: "May 12, 2026",
    readTime: "7 min read",
    slug: "cmms-facility-management",
  },
  {
    title: "Reducing Equipment Downtime: Strategies That Work",
    excerpt: "Practical strategies and tools to minimize unplanned downtime, from predictive maintenance to spare parts inventory optimization.",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=450&fit=crop",
    category: "Operations",
    author: "James Rodriguez",
    publishDate: "May 8, 2026",
    readTime: "8 min read",
    slug: "reducing-equipment-downtime",
  },
  {
    title: "Mobile Maintenance: Empowering Your Field Technicians",
    excerpt: "How mobile apps are changing the game for maintenance technicians - from work order management to real-time communication.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    category: "Mobile",
    author: "Emily Chen",
    publishDate: "May 5, 2026",
    readTime: "6 min read",
    slug: "mobile-maintenance-apps",
  },
  {
    title: "Vendor Management Best Practices for Maintenance Teams",
    excerpt: "Build better relationships with contractors and service providers while ensuring quality work and controlling costs.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=450&fit=crop",
    category: "Management",
    author: "David Park",
    publishDate: "May 2, 2026",
    readTime: "9 min read",
    slug: "vendor-management-best-practices",
  },
  {
    title: "Compliance and Safety in Maintenance Operations",
    excerpt: "Navigate regulatory requirements, maintain audit trails, and ensure workplace safety with proper maintenance documentation.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop",
    category: "Compliance",
    author: "Lisa Johnson",
    publishDate: "Apr 28, 2026",
    readTime: "7 min read",
    slug: "compliance-safety-maintenance",
  },
]

export function MaintenanceBlogSection() {
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
          Maintenance insights & resources
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          Stay ahead with expert insights, industry trends, and practical guides for modern maintenance management.
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
