import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Award,
  Building2,
  Compass,
  Layers,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import {
  ADVISORY_SERVICES,
  ATELIER_OFFICES,
  DETAIL_COURTYARD_URL,
  STUDIO_IMAGE_URL,
  TEAM_MEMBERS,
} from '@/data/properties'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const STEWARDSHIP_PROCESS = [
  {
    step: 'Stage I',
    title: 'Architectural & Provenance Audit',
    detail:
      'Before accepting any mandate, our conservation architects and legal counsel verify freehold title history, coastal or heritage zoning (CRZ / LBZ), structural integrity, and material provenance.',
  },
  {
    step: 'Stage II',
    title: 'Monograph & Technical Dossier',
    detail:
      'Each residence is documented through tilt-shift architectural photography, measured CAD floor plates, solar-path studies, and a complete schedule of stone, timber, and mechanical engineering.',
  },
  {
    step: 'Stage III',
    title: 'Private Salon Introductions',
    detail:
      'Dossiers are shared discreetly with vetted family offices, diaspora patrons, and architectural collectors across our Mumbai, New Delhi, and Bengaluru salons.',
  },
  {
    step: 'Stage IV',
    title: 'Closing & Conservation Handover',
    detail:
      'We coordinate transaction structuring alongside post-handover introductions to master stone carvers, landscape botanists, and bespoke lighting studios.',
  },
]

function AboutPage() {
  return (
    <main className="bg-[#f4f0e9]">
      {/* 1. Editorial Hero */}
      <section className="border-b border-[#d5cbb8] bg-[#fffcf7] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#724532] uppercase">
                About DEMO · Urban Atelier
              </p>
              <h1 className="mt-3 font-editorial text-4xl leading-tight font-normal text-[#282320] sm:text-5xl">
                Curating Architecture of Enduring Cultural Value Across India.
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[#4a423d] sm:text-lg">
                Founded as an alternative to transactional property portals, DEMO brings the rigor of an architectural monograph to private real estate representation in Mumbai, New Delhi, North Goa, Bengaluru, Udaipur, and Chennai.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#4a423d] sm:text-base">
                We believe a great Indian residence is defined not merely by square footage, but by how its verandas temper the monsoon, how Dholpur sandstone or Goan laterite ages across decades, and how courtyards draw light and breeze into daily life.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/properties"
                  className="inline-flex items-center gap-2 bg-[#724532] px-6 py-3.5 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase hover:bg-[#5a3526]"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-[#282320] bg-[#fffcf7] px-6 py-3.5 text-xs font-medium tracking-[0.16em] text-[#282320] uppercase hover:bg-[#282320] hover:text-[#fffcf7]"
                >
                  <span>Consult an Advisor</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-[#d5cbb8] bg-[#f4f0e9] p-3">
                <div className="aspect-[3/2] overflow-hidden bg-[#e6dfd3]">
                  <img
                    src={STUDIO_IMAGE_URL}
                    alt="DEMO architectural advisory studio and material library in Mumbai"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="font-editorial text-lg text-[#282320]">
                    The Kala Ghoda Material & Archival Library
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#4a423d]">
                    Clients inspect stone samples, measured drawings, and conservation briefs in private before touring residences on-site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Principles */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#724532] uppercase">
            Our Practice
          </p>
          <h2 className="mt-2 font-editorial text-3xl font-normal text-[#282320] sm:text-4xl">
            Three Pillars of the Atelier
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {ADVISORY_SERVICES.map((service) => (
            <div
              key={service.number}
              className="flex flex-col justify-between border border-[#d5cbb8] bg-[#fffcf7] p-8"
            >
              <div>
                <span className="font-editorial text-3xl text-[#bd916d]">
                  {service.number}
                </span>
                <h3 className="mt-4 font-editorial text-2xl font-normal text-[#282320]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4a423d]">
                  {service.description}
                </p>
              </div>
              <div className="mt-6 border-t border-[#e6dfd3] pt-4 text-xs tracking-[0.14em] text-[#724532] uppercase">
                DEMO Standard of Care
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Four-Stage Advisory Process */}
      <section className="border-y border-[#d5cbb8] bg-[#fffcf7] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#724532] uppercase">
                Advisory Methodology
              </p>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-[#282320] sm:text-4xl">
                How We Represent a Residence
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#4a423d]">
                We limit our active portfolio to no more than twelve estates across India at any time, ensuring senior partner involvement from initial valuation to handover.
              </p>

              <div className="mt-8 overflow-hidden border border-[#d5cbb8] bg-[#f4f0e9]">
                <div className="aspect-[3/2] overflow-hidden bg-[#e6dfd3]">
                  <img
                    src={DETAIL_COURTYARD_URL}
                    alt="Sunlit lime-plastered gallery corridor with teak and cane furniture"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="p-4 text-xs text-[#4a423d]">
                  Measured daylight and material studies accompany every DEMO property dossier.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
              {STEWARDSHIP_PROCESS.map((item) => (
                <div
                  key={item.step}
                  className="border border-[#e6dfd3] bg-[#f4f0e9] p-6 sm:p-8"
                >
                  <span className="inline-block bg-[#282320] px-2.5 py-1 text-[11px] font-medium tracking-[0.16em] text-[#bd916d] uppercase">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-editorial text-2xl font-normal text-[#282320]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4a423d]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Leadership & Curatorial Partners */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#724532] uppercase">
            Leadership Partners
          </p>
          <h2 className="mt-2 font-editorial text-3xl font-normal text-[#282320] sm:text-4xl">
            Advisors & Architectural Historians
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4a423d] sm:text-base">
            Our partners bring backgrounds in architectural conservation, urban history, and family-office private banking.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.name}
              className="flex flex-col justify-between border border-[#d5cbb8] bg-[#fffcf7] p-6 sm:p-8"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6dfd3] pb-4">
                  <div>
                    <h3 className="font-editorial text-2xl font-normal text-[#282320]">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium tracking-[0.12em] text-[#724532] uppercase">
                      {member.role}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 bg-[#f4f0e9] px-3 py-1 text-xs text-[#4a423d]">
                    <MapPin className="h-3.5 w-3.5 text-[#724532]" />
                    {member.location}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#4a423d]">
                  {member.bio}
                </p>
              </div>

              <div className="mt-6 border-t border-[#e6dfd3] pt-4">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#6e645e] uppercase">
                  Mandate Specialties
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {member.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="border border-[#d5cbb8] bg-[#f4f0e9] px-2.5 py-1 text-xs text-[#282320]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Regional Desks & Technical Isolation Note */}
      <section className="border-t border-[#d5cbb8] bg-[#282320] py-16 text-[#f4f0e9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-[#bd916d] uppercase">
                <ShieldCheck className="h-4 w-4" />
                <span>Client Presentation Architecture</span>
              </div>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-[#fffcf7]">
                Ready to experience a private consultation workflow?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#d5cbb8]">
                Every page, filter, shortlist action, and inquiry dialog in this DEMO runs 100% locally in your browser without touching Supabase or any backend server.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
              <Link
                to="/contact"
                className="bg-[#724532] px-6 py-3.5 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase hover:bg-[#bd916d] hover:text-[#282320]"
              >
                Visit Contact Page
              </Link>
              <Link
                to="/properties"
                className="border border-[#d5cbb8] bg-transparent px-6 py-3.5 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase hover:bg-[#fffcf7] hover:text-[#282320]"
              >
                View Listings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
