"use client"

import { useRef, useEffect, useState } from "react"
import { BlogCard } from "@/components/landing/blog-card"

const blogPosts = [
  {
    title: "Building Community: The Power of Resident Engagement",
    excerpt: "Discover how effective communication transforms residential buildings into thriving communities where neighbors connect, collaborate, and support each other.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=450&fit=crop",
    category: "Community",
    author: "Sarah Thompson",
    publishDate: "May 15, 2026",
    readTime: "8 min read",
    slug: "building-community-resident-engagement",
  },
  {
    title: "Multi-Channel Communication: Reaching Every Resident",
    excerpt: "Learn best practices for using email, SMS, push notifications, and in-app messaging to ensure your announcements reach all residents effectively.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop",
    category: "Best Practices",
    author: "Michael Chen",
    publishDate: "May 12, 2026",
    readTime: "6 min read",
    slug: "multi-channel-communication-strategies",
  },
  {
    title: "Virtual Events: The Future of Community Meetings",
    excerpt: "How virtual town halls and online events are increasing resident participation and making community involvement more accessible than ever.",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=450&fit=crop",
    category: "Events",
    author: "Emily Rodriguez",
    publishDate: "May 8, 2026",
    readTime: "7 min read",
    slug: "virtual-events-community-meetings",
  },
  {
    title: "AI Assistants in Property Management",
    excerpt: "Explore how AI-powered assistants are revolutionizing resident communication by providing instant answers and 24/7 support.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    category: "Technology",
    author: "David Park",
    publishDate: "May 5, 2026",
    readTime: "9 min read",
    slug: "ai-assistants-property-management",
  },
  {
    title: "Creating a Resident Portal That People Actually Use",
    excerpt: "Key features and UX principles that make resident portals engaging, useful, and essential for community communication.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    category: "Product",
    author: "Lisa Kim",
    publishDate: "May 2, 2026",
    readTime: "7 min read",
    slug: "resident-portal-best-practices",
  },
  {
    title: "Emergency Communication: Being Prepared",
    excerpt: "How to set up effective emergency notification systems that ensure critical information reaches all residents instantly.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop",
    category: "Safety",
    author: "James Wilson",
    publishDate: "Apr 28, 2026",
    readTime: "6 min read",
    slug: "emergency-communication-preparedness",
  },
]

export function CommunicationBlogSection() {
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
          Communication insights & resources
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          Stay ahead with expert insights on resident engagement, community building, and modern communication strategies.
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
