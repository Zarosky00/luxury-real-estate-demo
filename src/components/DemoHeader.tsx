import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Compass, Heart, Menu, X } from 'lucide-react'
import { useFavorites } from '@/lib/favorites'

export function DemoHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { favoriteIds, isLoaded, openDrawer } = useFavorites()
  const count = isLoaded ? favoriteIds.length : 0

  return (
    <header className="sticky top-0 z-40 border-b border-[#e6dfd3] bg-[#fffcf7]/95 backdrop-blur-sm">
      {/* Main navigation bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand Identity */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center border border-[#282320] bg-[#282320] text-[#fffcf7] transition-colors group-hover:border-[#724532] group-hover:bg-[#724532]">
            <Compass className="h-5 w-5 text-[#bd916d]" />
          </div>
          <div>
            <span className="block font-editorial text-2xl leading-none font-semibold tracking-[0.18em] text-[#282320]">
              DEMO
            </span>
            <span className="mt-1 block text-[10px] tracking-[0.2em] text-[#724532] uppercase">
              Urban Atelier · India
            </span>
          </div>
        </Link>

        {/* Desktop navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-8 md:flex"
        >
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{
              className: 'text-[#724532] border-b-2 border-[#724532] pb-1',
            }}
            inactiveProps={{
              className: 'text-[#282320] hover:text-[#724532] pb-1',
            }}
            className="text-xs font-medium tracking-[0.16em] uppercase transition-colors"
          >
            Home
          </Link>
          <Link
            to="/properties"
            activeProps={{
              className: 'text-[#724532] border-b-2 border-[#724532] pb-1',
            }}
            inactiveProps={{
              className: 'text-[#282320] hover:text-[#724532] pb-1',
            }}
            className="text-xs font-medium tracking-[0.16em] uppercase transition-colors"
          >
            Properties
          </Link>
          <Link
            to="/about"
            activeProps={{
              className: 'text-[#724532] border-b-2 border-[#724532] pb-1',
            }}
            inactiveProps={{
              className: 'text-[#282320] hover:text-[#724532] pb-1',
            }}
            className="text-xs font-medium tracking-[0.16em] uppercase transition-colors"
          >
            About Atelier
          </Link>
          <Link
            to="/contact"
            activeProps={{
              className: 'text-[#724532] border-b-2 border-[#724532] pb-1',
            }}
            inactiveProps={{
              className: 'text-[#282320] hover:text-[#724532] pb-1',
            }}
            className="text-xs font-medium tracking-[0.16em] uppercase transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right utilities: Saved shortlist + Private Consultation CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open saved residences (${count} saved)`}
            className="relative inline-flex h-10 items-center gap-2 border border-[#d5cbb8] bg-[#f4f0e9] px-3.5 text-xs font-medium tracking-[0.12em] text-[#282320] uppercase transition-colors hover:border-[#724532] hover:bg-[#fffcf7]"
          >
            <Heart
              className={`h-4 w-4 ${
                count > 0 ? 'fill-[#724532] text-[#724532]' : 'text-[#282320]'
              }`}
            />
            <span className="hidden sm:inline">Shortlist</span>
            <span className="inline-flex h-5 min-w-[20px] items-center justify-center bg-[#282320] px-1.5 text-[11px] font-semibold text-[#fffcf7]">
              {count}
            </span>
          </button>

          <Link
            to="/contact"
            className="hidden bg-[#724532] px-4 py-2.5 text-xs font-medium tracking-[0.14em] text-[#fffcf7] uppercase transition-colors hover:bg-[#5a3526] lg:inline-flex"
          >
            Private Inquiry
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-10 w-10 items-center justify-center border border-[#d5cbb8] bg-[#f4f0e9] text-[#282320] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-[#e6dfd3] bg-[#fffcf7] px-4 pt-3 pb-6 md:hidden">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              onClick={() => setMobileMenuOpen(false)}
              activeProps={{ className: 'bg-[#f4f0e9] text-[#724532] font-semibold' }}
              className="px-3 py-3 text-xs tracking-[0.16em] text-[#282320] uppercase"
            >
              Home
            </Link>
            <Link
              to="/properties"
              onClick={() => setMobileMenuOpen(false)}
              activeProps={{ className: 'bg-[#f4f0e9] text-[#724532] font-semibold' }}
              className="px-3 py-3 text-xs tracking-[0.16em] text-[#282320] uppercase"
            >
              Properties Catalog
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              activeProps={{ className: 'bg-[#f4f0e9] text-[#724532] font-semibold' }}
              className="px-3 py-3 text-xs tracking-[0.16em] text-[#282320] uppercase"
            >
              About Atelier
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              activeProps={{ className: 'bg-[#f4f0e9] text-[#724532] font-semibold' }}
              className="px-3 py-3 text-xs tracking-[0.16em] text-[#282320] uppercase"
            >
              Contact & Offices
            </Link>
          </nav>

          <div className="mt-4 border-t border-[#e6dfd3] pt-4">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center bg-[#724532] px-4 py-3 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase"
            >
              Schedule Demo Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
