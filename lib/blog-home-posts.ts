/**
 * Server-side fetch for homepage blog strip — PropertyCare public blog API.
 * Same contract as Blog PCA: GET /public/blog/posts/by-category/:id?flat=1
 */

import type { Locale } from '@/i18n/config'

const DEFAULT_API_BASE = 'https://api.propertycareapp.com'
const DEFAULT_HOME_CATEGORY_ID = 1948
const DEFAULT_FETCH_LIMIT = 12

export type HomeBlogCardData = {
  title: string
  excerpt: string
  image: string
  category: string
  slug: string
  href: string
  author: string
  publishDate: string
  readTime: string
}

function getApiBaseUrl(): string {
  return (
    process.env.BASE_URL?.trim() ||
    process.env.API_BASE_URL?.trim() ||
    DEFAULT_API_BASE
  )
}

function getSubscriptionKey(): string | undefined {
  return process.env.SUBSCRIPTION_API_KEY?.trim()
}

function getHomeCategoryId(): number {
  const raw = process.env.BLOG_HOME_CATEGORY_ID?.trim()
  if (raw) {
    const n = Number.parseInt(raw, 10)
    if (Number.isFinite(n) && n > 0) return n
  }
  return DEFAULT_HOME_CATEGORY_ID
}

function getFetchLimit(): number {
  const raw = process.env.BLOG_HOME_FETCH_LIMIT?.trim()
  if (raw) {
    const n = Number.parseInt(raw, 10)
    if (Number.isFinite(n) && n > 0 && n <= 50) return n
  }
  return DEFAULT_FETCH_LIMIT
}

function publicAssetBaseUrlForBlogMedia(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL_PHOTO?.trim()
  if (!raw) return ''
  return raw.endsWith('/') ? raw : `${raw}/`
}

function resolveBlogMediaUrl(file: string | null | undefined): string | null {
  const f = file?.trim()
  if (!f) return null
  if (f.startsWith('http://') || f.startsWith('https://')) return f
  const base = publicAssetBaseUrlForBlogMedia()
  if (!base) return null
  return `${base}${f.replace(/^\//, '')}`
}

function blogArticleHref(locale: Locale, slug: string): string {
  const base =
    process.env.NEXT_PUBLIC_BLOG_SITE_URL?.trim() || 'https://blog.propertycareapp.com'
  const origin = base.replace(/\/$/, '')
  const safeSlug = encodeURIComponent(slug)
  return `${origin}/${locale}/article/${safeSlug}`
}

function localeToApiLanguage(locale: Locale): string {
  const map: Record<Locale, string> = { en: 'EN', tr: 'TR' }
  return map[locale] ?? 'EN'
}

function readString(r: Record<string, unknown>, ...keys: string[]): string | undefined {
  for (const k of keys) {
    const v = r[k]
    if (typeof v === 'string' && v.trim()) return v
  }
  return undefined
}

function readNumber(v: unknown): number | undefined {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string') {
    const n = Number.parseFloat(v)
    if (Number.isFinite(n)) return n
  }
  return undefined
}

function toFiniteNumber(v: unknown): number | undefined {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v)
    if (Number.isFinite(n)) return n
  }
  return undefined
}

function formatIsoDate(iso: string | null, locale: Locale): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function parseCategoryPostsFlatJson(body: unknown): {
  categoryName: string
  posts: unknown[]
} | null {
  if (!body || typeof body !== 'object') return null
  const data = body as Record<string, unknown>

  const categoryName = data.categoryName
  if (typeof categoryName !== 'string' || !categoryName.trim()) return null

  const pag = data.pagination
  if (!pag || typeof pag !== 'object') return null
  const pr = pag as Record<string, unknown>
  const total = toFiniteNumber(pr.total)
  if (total === undefined || total < 0) return null

  const posts = Array.isArray(data.posts) ? data.posts : []

  return {
    categoryName: categoryName.trim(),
    posts,
  }
}

function normalizeFlatPostRow(
  row: unknown,
  fallbackCategoryName: string,
  locale: Locale,
): HomeBlogCardData | null {
  if (row == null || typeof row !== 'object') return null
  const r = row as Record<string, unknown>
  const post = (r.post != null && typeof r.post === 'object' ? r.post : {}) as Record<string, unknown>
  const category = (post.category != null && typeof post.category === 'object' ? post.category : {}) as Record<
    string,
    unknown
  >

  const slug = readString(r, 'slug')?.trim() ?? ''
  const title = readString(r, 'title')?.trim() ?? ''
  if (!slug || !title) return null

  const imageFile = readString(r, 'mainImage', 'main_image', 'ogImage', 'og_image')
  const imageUrl = resolveBlogMediaUrl(imageFile ?? null)
  const excerpt = readString(r, 'excerpt')?.trim() ?? ''

  const readMinutes = readNumber(post.readingTime ?? post.reading_time)
  const readTime =
    readMinutes != null && readMinutes > 0 ? `${Math.round(readMinutes)} min read` : ''

  const categoryLabel =
    readString(category, 'typeName', 'type_name')?.trim() || fallbackCategoryName

  const publishRaw =
    readString(r, 'publishDate', 'publish_date') ||
    readString(post, 'publishDate', 'publish_date') ||
    readString(r, 'createdAt', 'created_at') ||
    readString(post, 'createdAt', 'created_at')

  let publishIso: string | null = null
  if (publishRaw) {
    const d = new Date(publishRaw)
    publishIso = Number.isNaN(d.getTime()) ? null : d.toISOString()
  }

  return {
    title,
    excerpt,
    image: imageUrl ?? '/placeholder.svg',
    category: categoryLabel,
    slug,
    href: blogArticleHref(locale, slug),
    author: '',
    publishDate: formatIsoDate(publishIso, locale),
    readTime,
  }
}

/**
 * Core fetcher — loads published posts for any Help Center category.
 * Returns an empty array if the API key is missing or the request fails.
 */
async function fetchBlogPosts(
  locale: Locale,
  categoryId: number,
  limit: number,
  label: string,
): Promise<HomeBlogCardData[]> {
  const apiKey = getSubscriptionKey()
  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[blog-${label}] SUBSCRIPTION_API_KEY is not set; skipping blog fetch.`)
    }
    return []
  }

  const baseUrl = getApiBaseUrl()
  const language = localeToApiLanguage(locale)

  const url = new URL(`/public/blog/posts/by-category/${categoryId}`, baseUrl)
  url.searchParams.set('language', language)
  url.searchParams.set('flat', '1')
  url.searchParams.set('page', '1')
  url.searchParams.set('limit', String(limit))

  let response: Response
  try {
    response = await fetch(url.toString(), {
      headers: { 'x-api-key': apiKey },
      next: { revalidate: 300 },
    })
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[blog-${label}] fetch failed`, e)
    }
    return []
  }

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[blog-${label}] HTTP`, response.status, url.toString())
    }
    return []
  }

  let json: unknown
  try {
    json = await response.json()
  } catch {
    return []
  }

  const parsed = parseCategoryPostsFlatJson(json)
  if (!parsed) return []

  const out: HomeBlogCardData[] = []
  for (const raw of parsed.posts) {
    const card = normalizeFlatPostRow(raw, parsed.categoryName, locale)
    if (card) out.push(card)
  }
  return out
}

function readEnvCategoryId(envKey: string, fallback: number): number {
  const raw = process.env[envKey]?.trim()
  if (raw) {
    const n = Number.parseInt(raw, 10)
    if (Number.isFinite(n) && n > 0) return n
  }
  return fallback
}

function readEnvLimit(envKey: string): number {
  const raw = process.env[envKey]?.trim()
  if (raw) {
    const n = Number.parseInt(raw, 10)
    if (Number.isFinite(n) && n > 0 && n <= 50) return n
  }
  return DEFAULT_FETCH_LIMIT
}

/** /real-estate-software page blog strip */
export async function getHomeBlogPosts(locale: Locale): Promise<HomeBlogCardData[]> {
  return fetchBlogPosts(
    locale,
    readEnvCategoryId('BLOG_HOME_CATEGORY_ID', DEFAULT_HOME_CATEGORY_ID),
    readEnvLimit('BLOG_HOME_FETCH_LIMIT'),
    'home',
  )
}

/** /facilities-maintenance-software page blog strip */
export async function getMaintenanceBlogPosts(locale: Locale): Promise<HomeBlogCardData[]> {
  return fetchBlogPosts(
    locale,
    readEnvCategoryId('BLOG_MAINTENANCE_CATEGORY_ID', DEFAULT_HOME_CATEGORY_ID),
    readEnvLimit('BLOG_MAINTENANCE_FETCH_LIMIT'),
    'maintenance',
  )
}

/** /property-asset-part-management-software page blog strip */
export async function getAssetsBlogPosts(locale: Locale): Promise<HomeBlogCardData[]> {
  return fetchBlogPosts(
    locale,
    readEnvCategoryId('BLOG_ASSETS_CATEGORY_ID', DEFAULT_HOME_CATEGORY_ID),
    readEnvLimit('BLOG_ASSETS_FETCH_LIMIT'),
    'assets',
  )
}

/** /communication-property-software page blog strip */
export async function getCommunicationBlogPosts(locale: Locale): Promise<HomeBlogCardData[]> {
  return fetchBlogPosts(
    locale,
    readEnvCategoryId('BLOG_COMMUNICATION_CATEGORY_ID', DEFAULT_HOME_CATEGORY_ID),
    readEnvLimit('BLOG_COMMUNICATION_FETCH_LIMIT'),
    'communication',
  )
}
