import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute, Link } from '@tanstack/react-router'
import { seoConfig, seoHead } from '@/lib/monstarx/seo'
import { FavoritesProvider } from '@/lib/favorites'
import { DemoHeader } from '@/components/DemoHeader'
import { DemoFooter } from '@/components/DemoFooter'
import { FavoritesDrawer } from '@/components/FavoritesDrawer'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: (ctx) => {
    const seo = seoHead(ctx)
    return {
      ...seo,
      links: [
        ...seo.links,
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..700;1,400..600&display=swap',
        },
        { rel: 'stylesheet', href: appCss },
      ],
    }
  },
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang={seoConfig.locale || 'en'}>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[#f4f0e9] text-[#282320] antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  return (
    <FavoritesProvider>
      <div className="flex min-h-screen flex-col bg-[#f4f0e9] text-[#282320]">
        <DemoHeader />
        <div className="flex-1">
          <Outlet />
        </div>
        <DemoFooter />
        <FavoritesDrawer />
      </div>
    </FavoritesProvider>
  )
}

function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-xs font-medium tracking-[0.2em] text-[#724532] uppercase">
        404 · Dossier Not Found
      </p>
      <h1 className="mt-3 font-editorial text-4xl font-normal text-[#282320]">
        The residence or page you requested is not in this portfolio.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#4a423d]">
        Explore our curated collection of Indian heritage bungalows, sky villas, and coastal pavilions on DEMO.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="bg-[#724532] px-6 py-3 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase hover:bg-[#5a3526]"
        >
          Return Home
        </Link>
        <Link
          to="/properties"
          className="border border-[#282320] bg-[#fffcf7] px-6 py-3 text-xs font-medium tracking-[0.16em] text-[#282320] uppercase hover:bg-[#282320] hover:text-[#fffcf7]"
        >
          Browse Properties
        </Link>
      </div>
    </main>
  )
}
