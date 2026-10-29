import { useState, type FormEvent } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react'
import { ATELIER_OFFICES, CITIES, PROPERTIES } from '@/data/properties'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

interface ContactFormValues {
  fullName: string
  email: string
  phone: string
  preferredAtelier: string
  mandateType: string
  residenceOfInterest: string
  budgetBracket: string
  message: string
}

interface ContactFormErrors {
  fullName?: string
  email?: string
  phone?: string
  message?: string
}

function ContactPage() {
  const [values, setValues] = useState<ContactFormValues>({
    fullName: '',
    email: '',
    phone: '',
    preferredAtelier: 'Mumbai (Flagship Atelier)',
    mandateType: 'Acquisition — Private Residence',
    residenceOfInterest: 'General Portfolio Advisory',
    budgetBracket: '₹25 Cr – ₹50 Cr',
    message: '',
  })

  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [submittedTime, setSubmittedTime] = useState<string | null>(null)

  const validate = (): ContactFormErrors => {
    const nextErrors: ContactFormErrors = {}
    if (!values.fullName.trim() || values.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (minimum 2 characters).'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!values.email.trim() || !emailRegex.test(values.email.trim())) {
      nextErrors.email =
        'Please enter a valid email address (for example, patron@atelier.in).'
    }
    const digits = values.phone.replace(/[^\d+]/g, '')
    if (!digits || digits.length < 8) {
      nextErrors.phone =
        'Please provide a valid phone number (minimum 8 digits).'
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      nextErrors.message =
        'Please include a brief note of at least 10 characters describing your requirement.'
    }
    return nextErrors
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }
    // Strictly local frontend state update — zero backend/Supabase calls
    setSubmittedTime(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    )
  }

  const handleReset = () => {
    setSubmittedTime(null)
    setErrors({})
    setValues({
      fullName: '',
      email: '',
      phone: '',
      preferredAtelier: 'Mumbai (Flagship Atelier)',
      mandateType: 'Acquisition — Private Residence',
      residenceOfInterest: 'General Portfolio Advisory',
      budgetBracket: '₹25 Cr – ₹50 Cr',
      message: '',
    })
  }

  const fillSamplePatronData = () => {
    setErrors({})
    setValues({
      fullName: 'Siddharth & Meera Oberoi',
      email: 's.oberoi@oberoifamilyoffice.example',
      phone: '+91 98209 44120',
      preferredAtelier: 'Mumbai (Flagship Atelier)',
      mandateType: 'Acquisition — Private Residence',
      residenceOfInterest: 'The Malabar Crest Sky Villa (Mumbai)',
      budgetBracket: '₹50 Cr – ₹100 Cr',
      message:
        'We would like to review the architectural floor plates and arrange a private late-afternoon viewing next Thursday.',
    })
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <main className="bg-[#f4f0e9] pb-20">
      {/* Page Header */}
      <section className="border-b border-[#d5cbb8] bg-[#fffcf7] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#724532] uppercase">
              Private Consultation · DEMO
            </p>
            <h1 className="mt-3 font-editorial text-4xl font-normal text-[#282320] sm:text-5xl">
              Initiate a Private Mandate or Dossier Request
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#4a423d] sm:text-base">
              Connect with our senior partners in Mumbai, New Delhi, or Bengaluru. As required for this client pitch presentation, this consultation form executes entirely in your browser and never transmits data to any backend or database.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left 7 Columns: Validated Frontend-Only Consultation Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#d5cbb8] bg-[#fffcf7] p-6 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6dfd3] pb-5">
                <div>
                  <h2 className="font-editorial text-2xl font-normal text-[#282320]">
                    Advisory Inquiry Form
                  </h2>
                  <p className="mt-1 text-xs text-[#6e645e]">
                    All fields marked with * are validated locally in the browser.
                  </p>
                </div>

                {!submittedTime && (
                  <button
                    type="button"
                    onClick={fillSamplePatronData}
                    className="border border-[#bd916d] bg-[#f4f0e9] px-3 py-1.5 text-xs font-medium tracking-[0.1em] text-[#724532] uppercase transition-colors hover:bg-[#724532] hover:text-[#fffcf7]"
                  >
                    Fill Sample Client Data
                  </button>
                )}
              </div>

              {submittedTime ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 border border-[#724532] bg-[#f4f0e9] p-6 sm:p-8"
                >
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#724532]" />
                    <div className="flex-1">
                      <span className="inline-block bg-[#282320] px-2.5 py-1 text-[11px] font-medium tracking-[0.16em] text-[#bd916d] uppercase">
                        Demo Isolation Verified · {submittedTime}
                      </span>

                      <h3 className="mt-3 font-editorial text-2xl text-[#282320] sm:text-3xl">
                        Demo inquiry submitted — no information sent.
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-[#4a423d]">
                        Your sample consultation request was validated locally. In accordance with the presentation demo specification, zero network requests were made to Supabase or any external server.
                      </p>

                      <dl className="mt-6 grid grid-cols-1 gap-3 border-y border-[#d5cbb8] py-4 text-xs sm:grid-cols-2">
                        <div>
                          <dt className="text-[#6e645e]">Patron Name</dt>
                          <dd className="mt-0.5 font-medium text-[#282320]">
                            {values.fullName}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[#6e645e]">Contact Coordinates</dt>
                          <dd className="mt-0.5 font-medium text-[#282320]">
                            {values.email} · {values.phone}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[#6e645e]">Selected Atelier Desk</dt>
                          <dd className="mt-0.5 font-medium text-[#282320]">
                            {values.preferredAtelier}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[#6e645e]">Residence / Valuation</dt>
                          <dd className="mt-0.5 font-medium text-[#282320]">
                            {values.residenceOfInterest} ({values.budgetBracket})
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex items-center gap-2 bg-[#724532] px-5 py-3 text-xs font-medium tracking-[0.14em] text-[#fffcf7] uppercase hover:bg-[#5a3526]"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Submit Another Demo Inquiry</span>
                        </button>
                        <Link
                          to="/properties"
                          className="inline-flex items-center border border-[#282320] bg-[#fffcf7] px-5 py-3 text-xs font-medium tracking-[0.14em] text-[#282320] uppercase hover:bg-[#282320] hover:text-[#fffcf7]"
                        >
                          Return to Properties
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  {hasErrors && (
                    <div
                      role="alert"
                      className="border border-[#724532] bg-[#f4f0e9] p-4 text-xs text-[#282320]"
                    >
                      <p className="font-semibold text-[#724532]">
                        Please complete the highlighted fields below to test the demo submission:
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={values.fullName}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        placeholder="e.g. Siddharth Oberoi"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName ? 'contact-name-error' : undefined
                        }
                        className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3.5 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                      />
                      {errors.fullName && (
                        <p
                          id="contact-name-error"
                          className="mt-1 text-xs font-medium text-[#724532]"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={values.email}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="patron@familyoffice.in"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? 'contact-email-error' : undefined
                        }
                        className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3.5 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          className="mt-1 text-xs font-medium text-[#724532]"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                      >
                        Telephone / WhatsApp *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={values.phone}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="+91 98200 00000"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? 'contact-phone-error' : undefined
                        }
                        className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3.5 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                      />
                      {errors.phone && (
                        <p
                          id="contact-phone-error"
                          className="mt-1 text-xs font-medium text-[#724532]"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-atelier"
                        className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                      >
                        Preferred Atelier Desk
                      </label>
                      <select
                        id="contact-atelier"
                        value={values.preferredAtelier}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            preferredAtelier: e.target.value,
                          }))
                        }
                        className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3.5 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                      >
                        {ATELIER_OFFICES.map((office) => (
                          <option key={office.city} value={office.city}>
                            {office.city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-residence"
                        className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                      >
                        Residence of Interest
                      </label>
                      <select
                        id="contact-residence"
                        value={values.residenceOfInterest}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            residenceOfInterest: e.target.value,
                          }))
                        }
                        className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3.5 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                      >
                        <option value="General Portfolio Advisory">
                          General Portfolio Advisory
                        </option>
                        {PROPERTIES.map((prop) => (
                          <option
                            key={prop.id}
                            value={`${prop.title} (${prop.city})`}
                          >
                            {prop.title} — {prop.city} ({prop.priceFormatted})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                      >
                        Indicative Mandate Range
                      </label>
                      <select
                        id="contact-budget"
                        value={values.budgetBracket}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            budgetBracket: e.target.value,
                          }))
                        }
                        className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3.5 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                      >
                        <option value="Up to ₹25 Cr">Up to ₹25 Cr</option>
                        <option value="₹25 Cr – ₹50 Cr">₹25 Cr – ₹50 Cr</option>
                        <option value="₹50 Cr – ₹100 Cr">₹50 Cr – ₹100 Cr</option>
                        <option value="Above ₹100 Cr">Above ₹100 Cr</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                    >
                      Advisory Brief & Viewing Preferences *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={values.message}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Share your preferred cities (e.g., Malabar Hill, Lutyens’ Delhi, Assagao), architectural requirements, or viewing dates..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? 'contact-message-error' : undefined
                      }
                      className="mt-1.5 w-full border border-[#d5cbb8] bg-[#f4f0e9] p-3.5 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        className="mt-1 text-xs font-medium text-[#724532]"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 border-t border-[#e6dfd3] pt-5 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2 text-xs text-[#6e645e]">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-[#724532]" />
                      <span>
                        Demo Mode: No data leaves your browser on submit.
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#724532] px-8 py-3.5 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase transition-colors hover:bg-[#5a3526] sm:w-auto"
                    >
                      Submit Demo Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Atelier Locations & Regional Coverage */}
          <div className="space-y-6 lg:col-span-5">
            <div className="border border-[#d5cbb8] bg-[#fffcf7] p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#724532] uppercase">
                Private Salons
              </p>
              <h2 className="mt-2 font-editorial text-2xl font-normal text-[#282320]">
                Indian Atelier Locations
              </h2>

              <div className="mt-6 space-y-6 divide-y divide-[#e6dfd3]">
                {ATELIER_OFFICES.map((office) => (
                  <div key={office.city} className="pt-6 first:pt-0">
                    <h3 className="font-editorial text-xl font-normal text-[#282320]">
                      {office.city}
                    </h3>
                    <div className="mt-3 space-y-2 text-xs leading-relaxed text-[#4a423d]">
                      <p className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#724532]" />
                        <span>{office.address}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-[#724532]" />
                        <span>{office.hours}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-[#724532]" />
                        <span>{office.phone}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-[#724532]" />
                        <span>{office.email}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#282320] bg-[#282320] p-6 text-[#f4f0e9] sm:p-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#bd916d] uppercase">
                Active Markets
              </p>
              <h3 className="mt-2 font-editorial text-xl text-[#fffcf7]">
                8 Indian Architectural Enclaves
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#d5cbb8]">
                Click any city below to filter the local portfolio directly:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {CITIES.map((city) => (
                  <Link
                    key={city}
                    to="/properties"
                    search={{ city }}
                    className="border border-[#4a423d] bg-[#1e1a18] px-3 py-1.5 text-xs text-[#f4f0e9] transition-colors hover:border-[#bd916d] hover:text-[#bd916d]"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
