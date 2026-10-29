import { useEffect, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Calendar,
  Check,
  Compass,
  FileText,
  Heart,
  MapPin,
  Maximize2,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react'
import { PROPERTIES } from '@/data/properties'
import { useFavorites } from '@/lib/favorites'
import { DemoInquiryModal } from '@/components/DemoInquiryModal'
import { PropertyCard } from '@/components/PropertyCard'

export const Route = createFileRoute('/properties/$propertyId')({
  component: PropertyDetailPage,
})

function PropertyDetailPage() {
  const { propertyId } = Route.useParams()
  const property = PROPERTIES.find(
    (p) => p.id === propertyId || p.slug === propertyId,
  )
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites()

  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)

  // Reset photo gallery index when navigating between properties
  useEffect(() => {
    setActivePhotoIndex(0)
    setInquiryModalOpen(false)
  }, [propertyId])

  if (!property) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#724532] uppercase">
          Residence Dossier Not Found
        </p>
        <h1 className="mt-3 font-editorial text-4xl font-normal text-[#282320]">
          We could not locate a residence matching “{propertyId}”.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#4a423d]">
          Return to the DEMO catalog to explore our ten curated architectural properties across India.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/properties"
            className="bg-[#724532] px-6 py-3.5 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase hover:bg-[#5a3526]"
          >
            Back to Properties Catalog
          </Link>
        </div>
      </main>
    )
  }

  const saved = isLoaded && isFavorite(property.id)
  const activeSlide =
    property.gallery[activePhotoIndex] ?? property.gallery[0] ?? {
      url: property.heroImage,
      caption: property.subtitle,
    }

  const relatedProperties = PROPERTIES.filter((p) => p.id !== property.id).slice(
    0,
    3,
  )

  return (
    <main className="bg-[#f4f0e9] pb-20">
      {/* Top Breadcrumb & Action Bar */}
      <div className="border-b border-[#d5cbb8] bg-[#fffcf7]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs">
            <Link
              to="/properties"
              className="inline-flex items-center gap-1.5 font-medium tracking-[0.14em] text-[#724532] uppercase hover:text-[#282320]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>All Properties</span>
            </Link>
            <span className="text-[#d5cbb8]">/</span>
            <Link
              to="/properties"
              search={{ city: property.city }}
              className="tracking-[0.12em] text-[#4a423d] uppercase hover:text-[#724532]"
            >
              {property.city}
            </Link>
            <span className="hidden text-[#d5cbb8] sm:inline">/</span>
            <span className="hidden truncate text-[#6e645e] sm:inline">
              {property.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleFavorite(property.id)}
              aria-pressed={saved}
              className={`inline-flex items-center gap-2 border px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors ${
                saved
                  ? 'border-[#724532] bg-[#724532] text-[#fffcf7]'
                  : 'border-[#d5cbb8] bg-[#f4f0e9] text-[#282320] hover:border-[#724532]'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${saved ? 'fill-current' : ''}`} />
              <span>{saved ? 'Saved in Shortlist' : 'Save Residence'}</span>
            </button>

            <button
              type="button"
              onClick={() => setInquiryModalOpen(true)}
              className="bg-[#282320] px-4 py-2 text-xs font-medium tracking-[0.14em] text-[#fffcf7] uppercase transition-colors hover:bg-[#724532]"
            >
              Request Dossier
            </button>
          </div>
        </div>
      </div>

      {/* Title & Valuation Header */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-6 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#282320] px-2.5 py-1 text-[11px] font-medium tracking-[0.14em] text-[#fffcf7] uppercase">
                {property.propertyType}
              </span>
              <span className="border border-[#bd916d] bg-[#fffcf7] px-2.5 py-1 text-[11px] font-medium tracking-[0.14em] text-[#724532] uppercase">
                {property.possessionStatus}
              </span>
              <span className="text-xs text-[#6e645e]">
                Ref: {property.reraRef}
              </span>
            </div>

            <h1 className="mt-3 font-editorial text-3xl leading-tight font-normal text-[#282320] sm:text-5xl">
              {property.title}
            </h1>

            <p className="mt-2 flex items-center gap-1.5 text-sm text-[#724532]">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>
                {property.neighborhood}, {property.city}, {property.state}
              </span>
            </p>
          </div>

          <div className="border-l-2 border-[#724532] pl-4 lg:text-right lg:border-l-0 lg:pl-0">
            <p className="text-[11px] font-medium tracking-[0.16em] text-[#6e645e] uppercase">
              Guide Valuation
            </p>
            <p className="mt-1 font-editorial text-3xl font-normal text-[#282320] sm:text-4xl">
              {property.priceFormatted}
            </p>
            <p className="mt-0.5 text-xs text-[#4a423d]">
              Approx. ₹
              {Math.round(
                (property.priceCrores * 10000000) / property.areaSqFt,
              ).toLocaleString('en-IN')}{' '}
              per sq. ft.
            </p>
          </div>
        </div>
      </section>

      {/* Architectural Image Gallery */}
      <section
        aria-label="Architectural Photography Gallery"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="border border-[#d5cbb8] bg-[#fffcf7] p-3 sm:p-4">
          {/* Primary Active Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e6dfd3] sm:aspect-[16/9]">
            <img
              src={activeSlide.url}
              alt={activeSlide.caption}
              className="h-full w-full object-cover"
            />
            <div className="absolute right-0 bottom-0 left-0 flex flex-wrap items-center justify-between gap-2 bg-[#282320]/85 px-4 py-3 text-xs text-[#f4f0e9]">
              <span>{activeSlide.caption}</span>
              <span className="font-mono text-[11px] text-[#bd916d]">
                Plate {activePhotoIndex + 1} of {property.gallery.length}
              </span>
            </div>
          </div>

          {/* Thumbnail Selector Strip */}
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {property.gallery.map((item, idx) => {
              const isSelected = idx === activePhotoIndex
              return (
                <button
                  key={`${item.url}-${idx}`}
                  type="button"
                  onClick={() => setActivePhotoIndex(idx)}
                  aria-label={`View architectural plate ${idx + 1}: ${item.caption}`}
                  className={`group relative aspect-[3/2] overflow-hidden border text-left transition-all ${
                    isSelected
                      ? 'border-2 border-[#724532] ring-1 ring-[#724532]'
                      : 'border-[#d5cbb8] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-[#282320]/80 px-1.5 py-0.5 text-[10px] font-medium text-[#fffcf7]">
                    0{idx + 1}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content Grid: Left Dossier & Specs, Right Advisory Card */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left 8 Columns: Specifications, Narrative, Highlights, Amenities, Location */}
          <div className="space-y-10 lg:col-span-8">
            {/* Key Specifications Grid */}
            <div className="border border-[#d5cbb8] bg-[#fffcf7] p-6 sm:p-8">
              <h2 className="text-xs font-semibold tracking-[0.18em] text-[#724532] uppercase">
                Architectural Specifications
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-6 border-t border-[#e6dfd3] pt-5 sm:grid-cols-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6e645e]">
                    <BedDouble className="h-4 w-4 text-[#724532]" />
                    <span>Bedrooms</span>
                  </div>
                  <p className="mt-1 font-editorial text-2xl text-[#282320]">
                    {property.bedrooms} Suites
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6e645e]">
                    <Bath className="h-4 w-4 text-[#724532]" />
                    <span>Bathrooms</span>
                  </div>
                  <p className="mt-1 font-editorial text-2xl text-[#282320]">
                    {property.bathrooms} Baths
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6e645e]">
                    <Maximize2 className="h-4 w-4 text-[#724532]" />
                    <span>Built-Up Area</span>
                  </div>
                  <p className="mt-1 font-editorial text-2xl text-[#282320]">
                    {property.areaSqFt.toLocaleString('en-IN')} sq. ft.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6e645e]">
                    <Building2 className="h-4 w-4 text-[#724532]" />
                    <span>Architect / Atelier</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-[#282320]">
                    {property.architectStudio}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6e645e]">
                    <Compass className="h-4 w-4 text-[#724532]" />
                    <span>Orientation</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-[#282320]">
                    {property.orientation}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6e645e]">
                    <Calendar className="h-4 w-4 text-[#724532]" />
                    <span>Completion / Plot</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-[#282320]">
                    {property.yearCompleted}
                    {property.plotSizeSqFt
                      ? ` · ${property.plotSizeSqFt.toLocaleString('en-IN')} sq.ft. plot`
                      : ' · Single-level plate'}
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Narrative */}
            <div className="border border-[#d5cbb8] bg-[#fffcf7] p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#724532] uppercase">
                Curator’s Monograph
              </p>
              <h2 className="mt-2 font-editorial text-2xl font-normal text-[#282320] sm:text-3xl">
                {property.subtitle}
              </h2>

              <p className="mt-4 border-l-2 border-[#bd916d] pl-4 text-base leading-relaxed font-medium text-[#282320]">
                {property.summary}
              </p>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#4a423d] sm:text-base">
                {property.editorialDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Architectural Highlights */}
              <div className="mt-8 border-t border-[#e6dfd3] pt-6">
                <h3 className="text-xs font-semibold tracking-[0.18em] text-[#724532] uppercase">
                  Distinguishing Architectural Elements
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {property.architecturalHighlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 border border-[#e6dfd3] bg-[#f4f0e9]/60 p-3.5 text-xs leading-relaxed text-[#282320]"
                    >
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#724532]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Amenities & Engineering */}
            <div className="border border-[#d5cbb8] bg-[#fffcf7] p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#724532] uppercase">
                Private Amenities & Services
              </p>
              <h2 className="mt-2 font-editorial text-2xl font-normal text-[#282320]">
                Residence Appointments
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 border border-[#e6dfd3] bg-[#f4f0e9] px-3.5 py-3 text-xs font-medium text-[#282320]"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#724532]" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Neighborhood Context */}
            <div className="border border-[#d5cbb8] bg-[#fffcf7] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#724532] uppercase">
                    Location & Context
                  </p>
                  <h2 className="mt-1 font-editorial text-2xl font-normal text-[#282320]">
                    {property.neighborhood}, {property.city}
                  </h2>
                </div>
                <span className="border border-[#d5cbb8] bg-[#f4f0e9] px-3 py-1.5 font-mono text-xs text-[#4a423d]">
                  {property.locationContext.coordinatesLabel}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#4a423d] sm:text-base">
                {property.locationContext.overview}
              </p>

              <div className="mt-6 border-t border-[#e6dfd3] pt-5">
                <h3 className="text-xs font-semibold tracking-[0.16em] text-[#282320] uppercase">
                  Proximity & Access
                </h3>
                <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {property.locationContext.connectivity.map((line) => (
                    <li
                      key={line}
                      className="flex items-center gap-2 text-xs text-[#4a423d]"
                    >
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#724532]" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Sticky Advisory & Demo Inquiry Console */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="border border-[#282320] bg-[#fffcf7] p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-[#e6dfd3] pb-4">
                  <span className="text-xs font-semibold tracking-[0.16em] text-[#724532] uppercase">
                    Private Representation
                  </span>
                  <span className="bg-[#f4f0e9] px-2 py-0.5 text-[11px] font-medium text-[#282320]">
                    Demo Mode
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-xs text-[#6e645e]">Guide Price</p>
                  <p className="font-editorial text-3xl text-[#282320]">
                    {property.priceFormatted}
                  </p>
                  <p className="mt-1 text-xs text-[#4a423d]">
                    {property.possessionStatus} · Stamp duty & registration additional
                  </p>
                </div>

                {/* Assigned Advisor Card */}
                <div className="mt-6 border border-[#e6dfd3] bg-[#f4f0e9] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#282320] text-[#fffcf7]">
                      <UserCheck className="h-5 w-5 text-[#bd916d]" />
                    </div>
                    <div>
                      <p className="font-editorial text-base font-medium text-[#282320]">
                        {property.advisor.name}
                      </p>
                      <p className="text-xs text-[#724532]">
                        {property.advisor.title}
                      </p>
                      <p className="mt-1 text-[11px] text-[#6e645e]">
                        {property.advisor.desk}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary CTAs */}
                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(true)}
                    className="flex w-full items-center justify-center gap-2 bg-[#724532] px-5 py-3.5 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase transition-colors hover:bg-[#5a3526]"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Request Private Dossier</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(true)}
                    className="flex w-full items-center justify-center gap-2 border border-[#282320] bg-[#fffcf7] px-5 py-3.5 text-xs font-medium tracking-[0.16em] text-[#282320] uppercase transition-colors hover:bg-[#282320] hover:text-[#fffcf7]"
                  >
                    <span>Schedule Accompanied Viewing</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(property.id)}
                    aria-pressed={saved}
                    className="flex w-full items-center justify-center gap-2 border border-[#d5cbb8] bg-[#f4f0e9] px-5 py-3 text-xs font-medium tracking-[0.14em] text-[#282320] uppercase transition-colors hover:border-[#724532]"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        saved ? 'fill-[#724532] text-[#724532]' : ''
                      }`}
                    />
                    <span>
                      {saved ? 'Remove from Shortlist' : 'Add to Browser Shortlist'}
                    </span>
                  </button>
                </div>

                <div className="mt-6 border-t border-[#e6dfd3] pt-4 text-[11px] leading-relaxed text-[#6e645e]">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#724532]" />
                    <span>
                      Clicking “Request Private Dossier” opens our interactive frontend-only modal. No information is sent to any server or Supabase database.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparable Residences Section */}
      <section className="mx-auto mt-16 max-w-7xl border-t border-[#d5cbb8] px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#724532] uppercase">
              Continue Exploring
            </p>
            <h2 className="mt-1 font-editorial text-3xl font-normal text-[#282320]">
              Comparable Residences in the Portfolio
            </h2>
          </div>
          <Link
            to="/properties"
            className="border border-[#282320] bg-[#fffcf7] px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-[#282320] uppercase hover:bg-[#282320] hover:text-[#fffcf7]"
          >
            View All 10 Listings
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {relatedProperties.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      </section>

      {/* Frontend-Only Demo Inquiry Modal */}
      <DemoInquiryModal
        property={property}
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </main>
  )
}
