import { useState, type FormEvent } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Compass,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import {
  ADVISORY_SERVICES,
  ARCHITECTURAL_CATEGORIES,
  BUDGET_BRACKETS,
  CITIES,
  HERO_IMAGE_URL,
  PROPERTIES,
  PROPERTY_TYPES,
  STUDIO_IMAGE_URL,
} from '@/data/properties'
import { PropertyCard } from '@/components/PropertyCard'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const navigate = useNavigate()
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedBudget, setSelectedBudget] = useState<string>('all')
  const [keyword, setKeyword] = useState<string>('')

  const featuredProperties = PROPERTIES.filter((p) => p.featured).slice(0, 6)

  const handleHeroSearch = (e: FormEvent) => {
    e.preventDefault()
    const searchParams: Record<string, string> = {}
    if (selectedCity !== 'all') searchParams.city = selectedCity
    if (selectedType !== 'all') searchParams.type = selectedType
    if (selectedBudget !== 'all') searchParams.budget = selectedBudget
    if (keyword.trim()) searchParams.q = keyword.trim()

    navigate({
      to: '/properties',
      search: searchParams,
    })
  }

  return (
    <main>
      {/* 1. Editorial Hero Section */}
      <section className="relative border-b border-[#d5cbb8] bg-[#282320] text-[#fffcf7]">
        {/* Architectural Hero Backdrop */}
        <div className="relative min-h-[620px] w-full overflow-hidden lg:min-h-[680px]">
          <img
            src={HERO_IMAGE_URL}
            alt="Malabar Hill sea-facing architectural penthouse terrace at golden hour"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#282320]/95 via-[#282320]/75 to-[#282320]/35" />

          <div className="relative mx-auto flex max-w-7xl flex-col justify-between px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 border border-[#bd916d]/60 bg-[#282320]/80 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.2em] text-[#bd916d] uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>DEMO · Curated Indian Architectural Portfolio</span>
              </div>

              <h1 className="mt-6 font-editorial text-4xl leading-[1.12] font-normal tracking-tight text-[#fffcf7] sm:text-5xl lg:text-6xl">
                Residences Shaped by Stone, Light & Indian Craft.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#f4f0e9]/90 sm:text-lg">
                DEMO represents India’s rarest architectural homes—from Lutyens’ Delhi sandstone bungalows and Malabar Hill sky villas to Assagao laterite courtyard estates.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/properties"
                  className="inline-flex items-center gap-2.5 bg-[#724532] px-6 py-3.5 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase transition-colors hover:bg-[#5a3526]"
                >
                  <span>Explore All 10 Estates</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 border border-[#f4f0e9]/60 bg-[#282320]/70 px-6 py-3.5 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase transition-colors hover:border-[#fffcf7] hover:bg-[#fffcf7] hover:text-[#282320]"
                >
                  <span>The Atelier Process</span>
                </Link>
              </div>
            </div>

            {/* Search Filter Console */}
            <div className="mt-12 border border-[#d5cbb8] bg-[#fffcf7] p-5 text-[#282320] shadow-xl sm:p-6 lg:mt-16">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#e6dfd3] pb-3">
                <span className="text-xs font-semibold tracking-[0.16em] text-[#724532] uppercase">
                  Search Portfolio Dossiers
                </span>
                <span className="text-xs text-[#6e645e]">
                  Instant local filtering · Mumbai · New Delhi · Goa · Bengaluru · Udaipur
                </span>
              </div>

              <form
                onSubmit={handleHeroSearch}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12"
              >
                {/* Keyword input */}
                <div className="lg:col-span-3">
                  <label
                    htmlFor="hero-keyword"
                    className="block text-[11px] font-medium tracking-[0.14em] text-[#4a423d] uppercase"
                  >
                    Locality or Architect
                  </label>
                  <div className="relative mt-1.5">
                    <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#6e645e]" />
                    <input
                      id="hero-keyword"
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="e.g. Malabar Hill, Laterite..."
                      className="h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] pr-3 pl-9 text-sm text-[#282320] placeholder:text-[#6e645e] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                    />
                  </div>
                </div>

                {/* City selector */}
                <div className="lg:col-span-3">
                  <label
                    htmlFor="hero-city"
                    className="block text-[11px] font-medium tracking-[0.14em] text-[#4a423d] uppercase"
                  >
                    City / Region
                  </label>
                  <select
                    id="hero-city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                  >
                    <option value="all">All Indian Markets (8 Cities)</option>
                    {CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type selector */}
                <div className="lg:col-span-2">
                  <label
                    htmlFor="hero-type"
                    className="block text-[11px] font-medium tracking-[0.14em] text-[#4a423d] uppercase"
                  >
                    Typology
                  </label>
                  <select
                    id="hero-type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
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

                {/* Budget Range selector */}
                <div className="lg:col-span-2">
                  <label
                    htmlFor="hero-budget"
                    className="block text-[11px] font-medium tracking-[0.14em] text-[#4a423d] uppercase"
                  >
                    Valuation (INR)
                  </label>
                  <select
                    id="hero-budget"
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                  >
                    {BUDGET_BRACKETS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit button */}
                <div className="flex items-end lg:col-span-2">
                  <button
                    type="submit"
                    className="flex h-11 w-full items-center justify-center gap-2 bg-[#724532] px-4 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase transition-colors hover:bg-[#5a3526]"
                  >
                    <span>Search</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Portfolio Metrics Strip */}
      <section className="border-b border-[#e6dfd3] bg-[#fffcf7]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-y divide-[#e6dfd3] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          <div className="p-6 sm:p-8">
            <p className="font-editorial text-3xl text-[#282320] sm:text-4xl">₹485 Cr+</p>
            <p className="mt-1 text-xs tracking-[0.14em] text-[#724532] uppercase">
              Curated Portfolio Value
            </p>
          </div>
          <div className="p-6 sm:p-8">
            <p className="font-editorial text-3xl text-[#282320] sm:text-4xl">8 Cities</p>
            <p className="mt-1 text-xs tracking-[0.14em] text-[#724532] uppercase">
              Mumbai · Delhi · Goa · South India
            </p>
          </div>
          <div className="p-6 sm:p-8">
            <p className="font-editorial text-3xl text-[#282320] sm:text-4xl">10 Estates</p>
            <p className="mt-1 text-xs tracking-[0.14em] text-[#724532] uppercase">
              Architect-Signed Residences
            </p>
          </div>
          <div className="p-6 sm:p-8">
            <p className="font-editorial text-3xl text-[#282320] sm:text-4xl">100% Local</p>
            <p className="mt-1 text-xs tracking-[0.14em] text-[#724532] uppercase">
              Zero Backend / Supabase Calls
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Residences Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-[#d5cbb8] pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#724532] uppercase">
              Curated Collection
            </p>
            <h2 className="mt-2 font-editorial text-3xl font-normal text-[#282320] sm:text-4xl">
              Featured Indian Residences
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 border border-[#282320] bg-[#fffcf7] px-5 py-3 text-xs font-medium tracking-[0.14em] text-[#282320] uppercase transition-colors hover:bg-[#282320] hover:text-[#fffcf7]"
            >
              <span>View All 10 Listings</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 4. Architectural Categories Section */}
      <section className="border-y border-[#d5cbb8] bg-[#fffcf7] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#724532] uppercase">
              Architectural Typologies
            </p>
            <h2 className="mt-2 font-editorial text-3xl font-normal text-[#282320] sm:text-4xl">
              Browse by Vernacular & Form
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4a423d] sm:text-base">
              Every listing on DEMO is selected for its architectural pedigree, dialogue with regional climate, and enduring natural materials.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {ARCHITECTURAL_CATEGORIES.map((category) => (
              <Link
                key={category.title}
                to="/properties"
                search={{ type: category.propertyType }}
                className="group grid grid-cols-1 overflow-hidden border border-[#e6dfd3] bg-[#f4f0e9] text-[#282320] transition-colors hover:border-[#724532] sm:grid-cols-12"
              >
                <div className="aspect-[3/2] overflow-hidden bg-[#e6dfd3] sm:col-span-5 sm:aspect-auto">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between p-6 sm:col-span-7">
                  <div>
                    <span className="text-[11px] font-medium tracking-[0.16em] text-[#724532] uppercase">
                      {category.countLabel}
                    </span>
                    <h3 className="mt-1.5 font-editorial text-2xl font-normal text-[#282320] group-hover:text-[#724532]">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4a423d]">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-medium tracking-[0.14em] text-[#724532] uppercase">
                    <span>Filter Typology</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Advisory Services & Urban Atelier Philosophy */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#724532] uppercase">
              Private Brokerage & Stewardship
            </p>
            <h2 className="mt-2 font-editorial text-3xl leading-tight font-normal text-[#282320] sm:text-4xl">
              An Atelier Approach to Extraordinary Indian Homes
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#4a423d] sm:text-base">
              Unlike volume portals, DEMO operates as an architectural consultancy. We assemble complete technical dossiers, conservation histories, and material schedules before presenting a residence to private clients.
            </p>

            <div className="mt-6 overflow-hidden border border-[#d5cbb8] bg-[#fffcf7]">
              <div className="aspect-[3/2] w-full overflow-hidden bg-[#e6dfd3]">
                <img
                  src={STUDIO_IMAGE_URL}
                  alt="DEMO architectural advisory studio and material library in Mumbai"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between px-5 py-3.5 text-xs text-[#4a423d]">
                <span className="flex items-center gap-1.5 font-medium text-[#282320]">
                  <MapPin className="h-3.5 w-3.5 text-[#724532]" />
                  Kala Ghoda Flagship Material Library, Mumbai
                </span>
                <Link
                  to="/about"
                  className="font-medium tracking-[0.12em] text-[#724532] uppercase hover:text-[#282320]"
                >
                  Meet Team →
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-7">
            {ADVISORY_SERVICES.map((service) => (
              <div
                key={service.number}
                className="border border-[#d5cbb8] bg-[#fffcf7] p-6 sm:p-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-editorial text-2xl font-normal text-[#bd916d]">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="font-editorial text-xl font-normal text-[#282320] sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#4a423d]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col items-start justify-between gap-4 border border-[#282320] bg-[#282320] p-6 text-[#f4f0e9] sm:flex-row sm:items-center sm:p-8">
              <div>
                <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-[#bd916d] uppercase">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Interactive Client Pitch Demo</span>
                </div>
                <p className="mt-1 font-editorial text-xl text-[#fffcf7]">
                  Test the full inquiry flow with zero backend calls.
                </p>
              </div>
              <Link
                to="/contact"
                className="shrink-0 bg-[#724532] px-5 py-3 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase transition-colors hover:bg-[#bd916d] hover:text-[#282320]"
              >
                Try Demo Form
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
