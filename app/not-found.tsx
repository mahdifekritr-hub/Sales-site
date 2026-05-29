import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Page Not Found | PropertyCareApp',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        404
      </p>
      <h1 className="text-4xl font-bold mb-3 text-center">Page not found</h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Sorry, we could not find the page you were looking for. It may have been moved or removed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Go back home
      </Link>
    </main>
  );
}
