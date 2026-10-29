import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Bath, BedDouble, Heart, MapPin, Maximize2 } from 'lucide-react'
import type { PropertyListing } from '@/data/properties'
import { useFavorites } from '@/lib/favorites'

interface PropertyCardProps {
  property: PropertyListing
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites()
  const saved = isLoaded && isFavorite(property.id)

  return (
    <article className="group flex flex-col border border-[#e6dfd3] bg-[#fffcf7] transition-colors duration-200 hover:border-[#bd916d]">
      {/* Image container with 3:2 editorial aspect ratio */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#e6dfd3]">
        <Link
          to="/properties/$propertyId"
          params={{ propertyId: property.id }}
          className="block h-full w-full focus:outline-none"
        >
          <img
            src={property.heroImage}
            alt={`${property.title} in ${property.neighborhood}, ${property.city}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Top badges */}
        <div className="pointer-events-none absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-[#282320] px-2.5 py-1 text-[11px] font-medium tracking-[0.14em] text-[#fffcf7] uppercase">
            {property.propertyType}
          </span>
          {property.featured && (
            <span className="bg-[#724532] px-2.5 py-1 text-[11px] font-medium tracking-[0.14em] text-[#fffcf7] uppercase">
              Curated Selection
            </span>
          )}
        </div>

        {/* Favorite toggle button */}
        <button
          type="button"
          onClick={() => toggleFavorite(property.id)}
          aria-label={
            saved
              ? `Remove ${property.title} from saved residences`
              : `Save ${property.title} to shortlist`
          }
          aria-pressed={saved}
          className={`absolute top-3 right-3 flex h-10 w-10 items-center justify-center border transition-colors ${
            saved
              ? 'border-[#724532] bg-[#724532] text-[#fffcf7]'
              : 'border-[#e6dfd3] bg-[#fffcf7]/95 text-[#282320] hover:border-[#724532] hover:bg-[#fffcf7]'
          }`}
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom price bar */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 flex items-end justify-between bg-gradient-to-t from-[#282320]/85 via-[#282320]/40 to-transparent px-4 pt-8 pb-3">
          <span className="font-editorial text-xl font-normal tracking-tight text-[#fffcf7]">
            {property.priceFormatted}
          </span>
          <span className="text-[11px] tracking-[0.12em] text-[#f4f0e9] uppercase">
            {property.possessionStatus}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs tracking-[0.12em] text-[#724532] uppercase">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {property.neighborhood}, {property.city}
            </span>
          </div>

          <h3 className="mt-2 font-editorial text-xl leading-snug font-normal text-[#282320] group-hover:text-[#724532]">
            <Link
              to="/properties/$propertyId"
              params={{ propertyId: property.id }}
              className="focus:underline focus:outline-none"
            >
              {property.title}
            </Link>
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#4a423d]">
            {property.subtitle}
          </p>
        </div>

        <div className="mt-5 border-t border-[#e6dfd3] pt-4">
          {/* Key specs */}
          <div className="grid grid-cols-3 gap-2 text-xs text-[#4a423d]">
            <div className="flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5 text-[#724532]" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-3.5 w-3.5 text-[#724532]" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="h-3.5 w-3.5 text-[#724532]" />
              <span>{property.areaSqFt.toLocaleString('en-IN')} sq.ft.</span>
            </div>
          </div>

          {/* CTA row */}
          <div className="mt-4 flex items-center justify-between border-t border-[#f4f0e9] pt-3">
            <span className="text-[11px] text-[#6e645e]">
              Architect: {property.architectStudio}
            </span>
            <Link
              to="/properties/$propertyId"
              params={{ propertyId: property.id }}
              className="inline-flex items-center gap-1 text-xs font-medium tracking-[0.12em] text-[#724532] uppercase hover:text-[#282320]"
            >
              <span>Dossier</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
