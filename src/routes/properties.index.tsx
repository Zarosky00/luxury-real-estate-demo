import { useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  ArrowUpDown,
  Filter,
  Heart,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import {
  BUDGET_BRACKETS,
  CITIES,
  PROPERTIES,
  PROPERTY_TYPES,
  type PropertyListing,
} from '@/data/properties'
import { PropertyCard } from '@/components/PropertyCard'
import { useFavorites } from '@/lib/favorites'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'area-desc'

export interface PropertiesSearchState {
  q?: string
  city?: string
  type?: string
  budget?: string
  sort?: SortOption
  saved?: string
}

export const Route = createFileRoute('/properties/')({
  validateSearch: (search: Record<string, unknown>): PropertiesSearchState => {
    const q = typeof search.q === 'string' && search.q.trim() ? search.q : undefined
    const city =
      typeof search.city === 'string' &&
      CITIES.includes(search.city as (typeof CITIES)[number])
        ? search.city
        : undefined
    const type =
      typeof search.type === 'string' &&
      PROPERTY_TYPES.includes(search.type as (typeof PROPERTY_TYPES)[number])
        ? search.type
        : undefined
    const budget =
      typeof search.budget === 'string' &&
      BUDGET_BRACKETS.some((b) => b.id === search.budget && b.id !== 'all')
        ? search.budget
        : undefined
    const sortRaw = typeof search.sort === 'string' ? search.sort : undefined
    const sort: SortOption | undefined =
      sortRaw === 'price-asc' ||
      sortRaw === 'price-desc' ||
      sortRaw === 'area-desc' ||
      sortRaw === 'featured'
        ? sortRaw
        : undefined
    const saved = search.saved === 'true' ? 'true' : undefined

    return { q, city, type, budget, sort, saved }
  },
  component: PropertiesCatalogPage,
})

function PropertiesCatalogPage() {
  const searchParams = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const { favoriteIds, isLoaded } = useFavorites()

  // Single current draft for search text + filters to avoid stale URL race conditions
  const [draftQuery, setDraftQuery] = useState(searchParams.q ?? '')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Keep draftQuery synced with URL back/forward navigation
  useEffect(() => {
    setDraftQuery(searchParams.q ?? '')
  }, [searchParams.q])

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const activeCity = searchParams.city ?? 'all'
  const activeType = searchParams.type ?? 'all'
  const activeBudget = searchParams.budget ?? 'all'
  const activeSort: SortOption = searchParams.sort ?? 'featured'
  const onlySaved = searchParams.saved === 'true'

  const commitFilters = (next: {
    q?: string
    city?: string
    type?: string
    budget?: string
    sort?: SortOption
    saved?: boolean
  }) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }

    const qVal = next.q !== undefined ? next.q : draftQuery
    const cityVal = next.city !== undefined ? next.city : activeCity
    const typeVal = next.type !== undefined ? next.type : activeType
    const budgetVal = next.budget !== undefined ? next.budget : activeBudget
    const sortVal = next.sort !== undefined ? next.sort : activeSort
    const savedVal = next.saved !== undefined ? next.saved : onlySaved

    const nextSearch: PropertiesSearchState = {}
    if (qVal.trim()) nextSearch.q = qVal.trim()
    if (cityVal && cityVal !== 'all') nextSearch.city = cityVal
    if (typeVal && typeVal !== 'all') nextSearch.type = typeVal
    if (budgetVal && budgetVal !== 'all') nextSearch.budget = budgetVal
    if (sortVal && sortVal !== 'featured') nextSearch.sort = sortVal
    if (savedVal) nextSearch.saved = 'true'

    navigate({
      search: nextSearch,
      replace: true,
    })
  }

  const handleQueryChange = (value: string) => {
    setDraftQuery(value)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    debounceTimerRef.current = setTimeout(() => {
      commitFilters({ q: value })
    }, 220)
  }

  const resetAllFilters = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }
    setDraftQuery('')
    navigate({
      search: {},
      replace: true,
    })
  }

  // Filter and sort locally from PROPERTIES
  const filteredProperties = useMemo(() => {
    const queryNorm = draftQuery.trim().toLowerCase()
    const bracket =
      BUDGET_BRACKETS.find((b) => b.id === activeBudget) ?? BUDGET_BRACKETS[0]

    const matches = PROPERTIES.filter((property: PropertyListing) => {
      if (activeCity !== 'all' && property.city !== activeCity) {
        return false
      }
      if (activeType !== 'all' && property.propertyType !== activeType) {
        return false
      }
      if (
        activeBudget !== 'all' &&
        (property.priceCrores < bracket.minCrores ||
          property.priceCrores > bracket.maxCrores)
      ) {
        return false
      }
      if (onlySaved && (!isLoaded || !favoriteIds.includes(property.id))) {
        return false
      }
      if (queryNorm) {
        const haystack = [
          property.title,
          property.subtitle,
          property.city,
          property.neighborhood,
          property.state,
          property.propertyType,
          property.architectStudio,
          property.summary,
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(queryNorm)) {
          return false
        }
      }
      return true
    })

    const sorted = [...matches]
    if (activeSort === 'price-asc') {
      sorted.sort((a, b) => a.priceCrores - b.priceCrores)
    } else if (activeSort === 'price-desc') {
      sorted.sort((a, b) => b.priceCrores - a.priceCrores)
    } else if (activeSort === 'area-desc') {
      sorted.sort((a, b) => b.areaSqFt - a.areaSqFt)
    } else {
      // 'featured' default: featured first, then price desc
      sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        return b.priceCrores - a.priceCrores
      })
    }

    return sorted
  }, [
    draftQuery,
    activeCity,
    activeType,
    activeBudget,
    activeSort,
    onlySaved,
    favoriteIds,
    isLoaded,
  ])

  const hasActiveFilters =
    Boolean(draftQuery.trim()) ||
    activeCity !== 'all' ||
    activeType !== 'all' ||
    activeBudget !== 'all' ||
    activeSort !== 'featured' ||
    onlySaved

  return (
    <main className="min-h-screen bg-[#f4f0e9]">
      {/* Page Masthead */}
      <section className="border-b border-[#d5cbb8] bg-[#fffcf7] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#724532] uppercase">
                DEMO · Curated Indian Portfolio
              </p>
              <h1 className="mt-2 font-editorial text-3xl font-normal text-[#282320] sm:text-5xl">
                Architectural Residences & Private Estates
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#4a423d] sm:text-base">
                Explore ten fictional architectural homes across Mumbai, New Delhi, North Goa, Bengaluru, Udaipur, Alibaug, Hyderabad, and Chennai. All filtering and sorting happens instantaneously in your browser.
              </p>
            </div>

            {/* Quick City Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => commitFilters({ city: 'all' })}
                className={`px-3.5 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors ${
                  activeCity === 'all'
                    ? 'bg-[#282320] text-[#fffcf7]'
                    : 'border border-[#d5cbb8] bg-[#f4f0e9] text-[#282320] hover:border-[#724532]'
                }`}
              >
                All Cities ({PROPERTIES.length})
              </button>
              {['Mumbai', 'New Delhi', 'North Goa', 'Bengaluru', 'Udaipur'].map(
                (city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() =>
                      commitFilters({
                        city: activeCity === city ? 'all' : city,
                      })
                    }
                    className={`px-3.5 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors ${
                      activeCity === city
                        ? 'bg-[#724532] text-[#fffcf7]'
                        : 'border border-[#d5cbb8] bg-[#f4f0e9] text-[#282320] hover:border-[#724532]'
                    }`}
                  >
                    {city}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Console */}
      <section
        aria-label="Property Filters and Sorting"
        className="border-b border-[#d5cbb8] bg-[#f4f0e9]"
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Mobile filter bar trigger */}
          <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((prev) => !prev)}
              aria-expanded={mobileFiltersOpen}
              className="inline-flex items-center gap-2 border border-[#282320] bg-[#fffcf7] px-4 py-2.5 text-xs font-medium tracking-[0.14em] text-[#282320] uppercase"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#724532]" />
              <span>
                {mobileFiltersOpen ? 'Hide Filters' : 'Filters & Sort'}
              </span>
            </button>

            <span className="text-xs font-medium text-[#4a423d]">
              Showing {filteredProperties.length} of {PROPERTIES.length} Estates
            </span>
          </div>

          {/* Filter controls grid */}
          <div
            className={`${
              mobileFiltersOpen ? 'grid' : 'hidden lg:grid'
            } grid-cols-1 gap-4 border border-[#d5cbb8] bg-[#fffcf7] p-5 sm:grid-cols-2 lg:grid-cols-12`}
          >
            {/* Search Input */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label
                htmlFor="catalog-search"
                className="block text-[11px] font-medium tracking-[0.14em] text-[#4a423d] uppercase"
              >
                Search Keyword / Locality
              </label>
              <div className="relative mt-1.5">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#6e645e]" />
                <input
                  id="catalog-search"
                  type="text"
                  value={draftQuery}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  placeholder="Malabar Hill, Haveli, Teak..."
                  className="h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] pr-8 pl-9 text-sm text-[#282320] placeholder:text-[#6e645e] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                />
                {draftQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setDraftQuery('')
                      commitFilters({ q: '' })
                    }}
                    aria-label="Clear search query"
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 p-1 text-[#6e645e] hover:text-[#282320]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* City Filter */}
            <div className="lg:col-span-2">
              <label
                htmlFor="catalog-city"
                className="block text-[11px] font-medium tracking-[0.14em] text-[#4a423d] uppercase"
              >
                City
              </label>
              <select
                id="catalog-city"
                value={activeCity}
                onChange={(e) => commitFilters({ city: e.target.value })}
                className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
              >
                <option value="all">All Cities</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type Filter */}
            <div className="lg:col-span-2">
              <label
                htmlFor="catalog-type"
                className="block text-[11px] font-medium tracking-[0.14em] text-[#4a423d] uppercase"
              >
                Property Type
              </label>
              <select
                id="catalog-type"
                value={activeType}
                onChange={(e) => commitFilters({ type: e.target.value })}
                className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
              >
                <option value="all">All Typologies</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Range Filter */}
            <div className="lg:col-span-2">
              <label
                htmlFor="catalog-budget"
                className="block text-[11px] font-medium tracking-[0.14em] text-[#4a423d] uppercase"
              >
                Budget Range
              </label>
              <select
                id="catalog-budget"
                value={activeBudget}
                onChange={(e) => commitFilters({ budget: e.target.value })}
                className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
              >
                {BUDGET_BRACKETS.map((bracket) => (
                  <option key={bracket.id} value={bracket.id}>
                    {bracket.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="lg:col-span-3">
              <label
                htmlFor="catalog-sort"
                className="block text-[11px] font-medium tracking-[0.14em] text-[#4a423d] uppercase"
              >
                Sort Order
              </label>
              <div className="relative mt-1.5">
                <ArrowUpDown className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#6e645e]" />
                <select
                  id="catalog-sort"
                  value={activeSort}
                  onChange={(e) =>
                    commitFilters({ sort: e.target.value as SortOption })
                  }
                  className="h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] pr-3 pl-9 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                >
                  <option value="featured">Curated Featured First</option>
                  <option value="price-desc">Price: High to Low (₹ Cr)</option>
                  <option value="price-asc">Price: Low to High (₹ Cr)</option>
                  <option value="area-desc">Largest Area (Sq. Ft.)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active filter bar & Saved filter toggle */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="hidden items-center gap-1.5 text-xs font-medium text-[#4a423d] lg:inline-flex">
                <Filter className="h-3.5 w-3.5 text-[#724532]" />
                <span>
                  Showing <strong>{filteredProperties.length}</strong> of{' '}
                  {PROPERTIES.length} residences
                </span>
              </span>

              {/* Saved only toggle chip */}
              <button
                type="button"
                onClick={() => commitFilters({ saved: !onlySaved })}
                aria-pressed={onlySaved}
                className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium tracking-[0.1em] uppercase transition-colors ${
                  onlySaved
                    ? 'border-[#724532] bg-[#724532] text-[#fffcf7]'
                    : 'border-[#d5cbb8] bg-[#fffcf7] text-[#282320] hover:border-[#724532]'
                }`}
              >
                <Heart
                  className={`h-3.5 w-3.5 ${onlySaved ? 'fill-current' : 'text-[#724532]'}`}
                />
                <span>
                  Saved Only ({isLoaded ? favoriteIds.length : 0})
                </span>
              </button>

              {activeCity !== 'all' && (
                <span className="inline-flex items-center gap-1.5 border border-[#bd916d] bg-[#fffcf7] px-3 py-1.5 text-xs text-[#282320]">
                  <span>City: {activeCity}</span>
                  <button
                    type="button"
                    onClick={() => commitFilters({ city: 'all' })}
                    aria-label={`Remove ${activeCity} filter`}
                    className="text-[#724532] hover:text-[#282320]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}

              {activeType !== 'all' && (
                <span className="inline-flex items-center gap-1.5 border border-[#bd916d] bg-[#fffcf7] px-3 py-1.5 text-xs text-[#282320]">
                  <span>Type: {activeType}</span>
                  <button
                    type="button"
                    onClick={() => commitFilters({ type: 'all' })}
                    aria-label={`Remove ${activeType} filter`}
                    className="text-[#724532] hover:text-[#282320]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}

              {activeBudget !== 'all' && (
                <span className="inline-flex items-center gap-1.5 border border-[#bd916d] bg-[#fffcf7] px-3 py-1.5 text-xs text-[#282320]">
                  <span>
                    Budget:{' '}
                    {BUDGET_BRACKETS.find((b) => b.id === activeBudget)?.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => commitFilters({ budget: 'all' })}
                    aria-label="Remove budget filter"
                    className="text-[#724532] hover:text-[#282320]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 border border-[#282320] bg-[#fffcf7] px-3.5 py-1.5 text-xs font-medium tracking-[0.12em] text-[#282320] uppercase transition-colors hover:bg-[#282320] hover:text-[#fffcf7]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Listings Grid or Empty State */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {filteredProperties.length === 0 ? (
          <div className="mx-auto max-w-xl border border-[#d5cbb8] bg-[#fffcf7] p-10 text-center sm:p-14">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#724532] uppercase">
              No Matching Dossiers
            </p>
            <h2 className="mt-2 font-editorial text-3xl font-normal text-[#282320]">
              No residences match your current filter selection.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4a423d]">
              {onlySaved
                ? 'You currently have no saved residences matching these criteria. Try turning off the "Saved Only" filter or resetting your search criteria.'
                : 'Try expanding your valuation range, selecting "All Cities", or clearing your search keyword to view all 10 curated Indian estates.'}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 bg-[#724532] px-6 py-3.5 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase transition-colors hover:bg-[#5a3526]"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
