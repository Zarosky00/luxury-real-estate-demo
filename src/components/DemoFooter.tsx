import { Link } from '@tanstack/react-router'
import { Compass, MapPin, ShieldAlert } from 'lucide-react'
import { ATELIER_OFFICES } from '@/data/properties'

export function DemoFooter() {
  return (
    <footer className="border-t border-[#d5cbb8] bg-[#282320] text-[#f4f0e9]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Editorial Statement */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-[#bd916d] bg-[#724532] text-[#fffcf7]">
                <Compass className="h-5 w-5 text-[#fffcf7]" />
              </div>
              <div>
                <span className="block font-editorial text-2xl font-semibold tracking-[0.18em] text-[#fffcf7]">
                  DEMO
                </span>
                <span className="block text-[10px] tracking-[0.2em] text-[#bd916d] uppercase">
                  Urban Atelier · Private Estates
                </span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[#d5cbb8]">
              An architectural real estate house curating heritage bungalows, sea-facing sky villas, and craft-led courtyard estates across Mumbai, New Delhi, North Goa, Bengaluru, Udaipur, and Chennai.
            </p>

            <div className="mt-6 border border-[#4a423d] bg-[#1e1a18] p-4">
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#bd916d]" />
                <p className="text-xs leading-relaxed text-[#d5cbb8]">
                  <strong className="font-semibold text-[#fffcf7]">Presentation Demo Notice:</strong>{' '}
                  All residences, RERA references, and advisors on DEMO are fictional sample data stored locally in the browser. Zero backend or Supabase requests are made.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.18em] text-[#bd916d] uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/" className="text-[#f4f0e9] transition-colors hover:text-[#bd916d]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-[#f4f0e9] transition-colors hover:text-[#bd916d]"
                >
                  All Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#f4f0e9] transition-colors hover:text-[#bd916d]"
                >
                  About DEMO Atelier
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#f4f0e9] transition-colors hover:text-[#bd916d]"
                >
                  Private Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Curated Markets */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.18em] text-[#bd916d] uppercase">
              Indian Portfolios
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#d5cbb8]">
              <li>
                <Link
                  to="/properties"
                  search={{ city: 'Mumbai' }}
                  className="hover:text-[#fffcf7]"
                >
                  Mumbai — Malabar Hill & Worli
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  search={{ city: 'New Delhi' }}
                  className="hover:text-[#fffcf7]"
                >
                  New Delhi — Lutyens’ Bungalow Zone
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  search={{ city: 'North Goa' }}
                  className="hover:text-[#fffcf7]"
                >
                  North Goa — Assagao Courtyards
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  search={{ city: 'Bengaluru' }}
                  className="hover:text-[#fffcf7]"
                >
                  Bengaluru — Indiranagar & Sadashivanagar
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  search={{ city: 'Udaipur' }}
                  className="hover:text-[#fffcf7]"
                >
                  Udaipur & Alibaug Retreats
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Atelier Desks */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.18em] text-[#bd916d] uppercase">
              Atelier Desks
            </h3>
            <ul className="mt-4 space-y-4 text-xs leading-relaxed text-[#d5cbb8]">
              {ATELIER_OFFICES.map((office) => (
                <li key={office.city} className="border-l border-[#724532] pl-3">
                  <p className="flex items-center gap-1.5 font-medium text-[#fffcf7]">
                    <MapPin className="h-3.5 w-3.5 text-[#bd916d]" />
                    {office.city}
                  </p>
                  <p className="mt-1 text-[#d5cbb8]">{office.address}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#4a423d] pt-8 text-xs text-[#d5cbb8] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} DEMO Urban Atelier. Client Pitch Presentation Demo.</p>
          <p className="text-[#bd916d]">
            Frontend-Isolated Architecture · No External API or Database Dependencies
          </p>
        </div>
      </div>
    </footer>
  )
}
