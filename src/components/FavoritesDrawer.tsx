import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Heart, MapPin, Trash2, X } from 'lucide-react'
import { useFavorites } from '@/lib/favorites'

export function FavoritesDrawer() {
  const {
    favoriteProperties,
    isDrawerOpen,
    closeDrawer,
    removeFavorite,
    clearFavorites,
  } = useFavorites()

  useEffect(() => {
    if (!isDrawerOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isDrawerOpen, closeDrawer])

  if (!isDrawerOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#282320]/60 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="favorites-drawer-title"
    >
      {/* Backdrop click target */}
      <div className="flex-1" onClick={closeDrawer} aria-hidden="true" />

      {/* Drawer panel */}
      <div className="flex h-full w-full max-w-md flex-col border-l border-[#e6dfd3] bg-[#fffcf7] text-[#282320] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e6dfd3] px-6 py-5">
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] text-[#724532] uppercase">
              Browser Shortlist
            </p>
            <h2
              id="favorites-drawer-title"
              className="mt-0.5 font-editorial text-2xl font-normal text-[#282320]"
            >
              Saved Residences ({favoriteProperties.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close saved residences drawer"
            className="flex h-10 w-10 items-center justify-center border border-[#e6dfd3] bg-[#f4f0e9] text-[#282320] hover:border-[#724532]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Notice banner */}
        <div className="border-b border-[#e6dfd3] bg-[#f4f0e9] px-6 py-2.5 text-xs text-[#4a423d]">
          Saved locally in this browser only — no account or server sync.
        </div>

        {/* List or empty state */}
        <div className="flex-1 overflow-y-auto p-6">
          {favoriteProperties.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center border border-dashed border-[#d5cbb8] bg-[#f4f0e9]/50 p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center border border-[#d5cbb8] bg-[#fffcf7] text-[#724532]">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-editorial text-xl text-[#282320]">
                Your Shortlist Is Empty
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4a423d]">
                Select the heart icon on any property card or dossier to compare residences in this browser.
              </p>
              <Link
                to="/properties"
                onClick={closeDrawer}
                className="mt-6 inline-flex items-center gap-2 bg-[#724532] px-5 py-3 text-xs font-medium tracking-[0.14em] text-[#fffcf7] uppercase hover:bg-[#5a3526]"
              >
                <span>Explore Portfolio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {favoriteProperties.map((property) => (
                <li
                  key={property.id}
                  className="flex gap-4 border border-[#e6dfd3] bg-[#f4f0e9]/40 p-3 transition-colors hover:border-[#bd916d]"
                >
                  <Link
                    to="/properties/$propertyId"
                    params={{ propertyId: property.id }}
                    onClick={closeDrawer}
                    className="h-24 w-28 shrink-0 overflow-hidden bg-[#e6dfd3] text-[#282320]"
                  >
                    <img
                      src={property.heroImage}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className=" flex items-center gap-1 truncate text-[11px] tracking-[0.12em] text-[#724532] uppercase">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {property.city}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFavorite(property.id)}
                          aria-label={`Remove ${property.title} from shortlist`}
                          className="p-1 text-[#6e645e] hover:text-[#282320]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <Link
                        to="/properties/$propertyId"
                        params={{ propertyId: property.id }}
                        onClick={closeDrawer}
                        className="mt-0.5 block truncate font-editorial text-base text-[#282320] hover:text-[#724532]"
                      >
                        {property.title}
                      </Link>
                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-[#e6dfd3] pt-2">
                      <span className="font-editorial text-sm font-medium text-[#282320]">
                        {property.priceFormatted}
                      </span>
                      <Link
                        to="/properties/$propertyId"
                        params={{ propertyId: property.id }}
                        onClick={closeDrawer}
                        className="text-[11px] font-medium tracking-[0.12em] text-[#724532] uppercase hover:text-[#282320]"
                      >
                        View Dossier →
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer actions */}
        {favoriteProperties.length > 0 && (
          <div className="border-t border-[#e6dfd3] bg-[#f4f0e9] p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/properties"
                onClick={closeDrawer}
                className="flex flex-1 items-center justify-center bg-[#724532] px-4 py-3 text-xs font-medium tracking-[0.14em] text-[#fffcf7] uppercase hover:bg-[#5a3526]"
              >
                Browse All Properties
              </Link>
              <button
                type="button"
                onClick={clearFavorites}
                className="border border-[#d5cbb8] bg-[#fffcf7] px-4 py-3 text-xs font-medium tracking-[0.14em] text-[#282320] uppercase hover:border-[#282320]"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
