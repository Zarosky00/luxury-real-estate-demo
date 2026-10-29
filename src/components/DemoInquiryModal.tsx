import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2, ShieldCheck, X } from 'lucide-react'
import type { PropertyListing } from '@/data/properties'

interface DemoInquiryModalProps {
  property: PropertyListing
  isOpen: boolean
  onClose: () => void
}

interface InquiryFormValues {
  fullName: string
  email: string
  phone: string
  inquiryType: 'private-viewing' | 'architectural-dossier' | 'valuation-brief'
  preferredWindow: string
  notes: string
}

interface InquiryFieldErrors {
  fullName?: string
  email?: string
  phone?: string
  preferredWindow?: string
}

export function DemoInquiryModal({
  property,
  isOpen,
  onClose,
}: DemoInquiryModalProps) {
  const [values, setValues] = useState<InquiryFormValues>({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'private-viewing',
    preferredWindow: 'Next 7 Days — Morning Slot',
    notes: `Please share the floor plans and conservation dossier for ${property.title} (${property.city}).`,
  })
  const [fieldErrors, setFieldErrors] = useState<InquiryFieldErrors>({})
  const [submittedAt, setSubmittedAt] = useState<string | null>(null)

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      notes: `Please share the floor plans and conservation dossier for ${property.title} (${property.city}).`,
    }))
  }, [property.title, property.city])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const validate = (): InquiryFieldErrors => {
    const errors: InquiryFieldErrors = {}
    if (!values.fullName.trim() || values.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!values.email.trim() || !emailRegex.test(values.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g., name@domain.com).'
    }
    const digitsOnly = values.phone.replace(/[^\d+]/g, '')
    if (!digitsOnly || digitsOnly.length < 8) {
      errors.phone = 'Please enter a valid contact number (at least 8 digits).'
    }
    if (!values.preferredWindow.trim()) {
      errors.preferredWindow = 'Please select or enter a preferred viewing window.'
    }
    return errors
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      return
    }
    // Strictly frontend-only demo confirmation — no network request sent
    setSubmittedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  }

  const resetForAnotherDemo = () => {
    setSubmittedAt(null)
    setFieldErrors({})
  }

  const hasErrors = Object.keys(fieldErrors).length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#282320]/70 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 my-8 w-full max-w-xl border border-[#d5cbb8] bg-[#fffcf7] text-[#282320] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#e6dfd3] bg-[#f4f0e9] px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#724532] uppercase">
              DEMO Private Advisory · {property.city}
            </p>
            <h2
              id="inquiry-modal-title"
              className="mt-1 font-editorial text-2xl font-normal text-[#282320]"
            >
              Inquire About {property.title}
            </h2>
            <p className="mt-0.5 text-xs text-[#4a423d]">
              {property.priceFormatted} · {property.neighborhood} · Ref: {property.reraRef}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry modal"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#d5cbb8] bg-[#fffcf7] text-[#282320] hover:border-[#724532]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Isolation assurance banner */}
        <div className="flex items-center gap-2 border-b border-[#e6dfd3] bg-[#282320] px-6 py-2.5 text-xs text-[#f4f0e9]">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#bd916d]" />
          <span>
            Frontend-Only Presentation Mode: Submitting this form stays 100% in your browser.
          </span>
        </div>

        <div className="p-6 sm:p-8">
          {submittedAt ? (
            <div
              role="status"
              aria-live="polite"
              className="border border-[#724532] bg-[#f4f0e9] p-6"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#724532]" />
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-[#724532] uppercase">
                    Demo Confirmation · {submittedAt}
                  </p>
                  <h3 className="mt-1 font-editorial text-2xl text-[#282320]">
                    Demo inquiry submitted — no information sent.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4a423d]">
                    This is an interactive client pitch demonstration for{' '}
                    <strong>{property.title}</strong>. No network request, database write, or external email was triggered.
                  </p>

                  <dl className="mt-4 space-y-1.5 border-t border-[#d5cbb8] pt-4 text-xs text-[#4a423d]">
                    <div className="flex justify-between gap-2">
                      <dt className="font-medium text-[#282320]">Client Name:</dt>
                      <dd>{values.fullName}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="font-medium text-[#282320]">Contact:</dt>
                      <dd>
                        {values.email} · {values.phone}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="font-medium text-[#282320]">Assigned Advisor:</dt>
                      <dd>{property.advisor.name}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-[#724532] px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-[#fffcf7] uppercase hover:bg-[#5a3526]"
                    >
                      Return to Property Dossier
                    </button>
                    <button
                      type="button"
                      onClick={resetForAnotherDemo}
                      className="border border-[#282320] bg-[#fffcf7] px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-[#282320] uppercase hover:bg-[#282320] hover:text-[#fffcf7]"
                    >
                      Test Form Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {hasErrors && (
                <div
                  role="alert"
                  className="border border-[#724532] bg-[#f4f0e9] p-3.5 text-xs text-[#282320]"
                >
                  <p className="font-semibold text-[#724532]">
                    Please review the highlighted fields before submitting the demo inquiry:
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                  >
                    Full Name *
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    value={values.fullName}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    placeholder="e.g. Devika Singhania"
                    aria-invalid={Boolean(fieldErrors.fullName)}
                    aria-describedby={
                      fieldErrors.fullName ? 'inquiry-name-error' : undefined
                    }
                    className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                  />
                  {fieldErrors.fullName && (
                    <p
                      id="inquiry-name-error"
                      className="mt-1 text-xs font-medium text-[#724532]"
                    >
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                  >
                    Email Address *
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    value={values.email}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="devika@familyoffice.in"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={
                      fieldErrors.email ? 'inquiry-email-error' : undefined
                    }
                    className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                  />
                  {fieldErrors.email && (
                    <p
                      id="inquiry-email-error"
                      className="mt-1 text-xs font-medium text-[#724532]"
                    >
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                  >
                    Telephone / WhatsApp *
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    value={values.phone}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="+91 98201 00000"
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={
                      fieldErrors.phone ? 'inquiry-phone-error' : undefined
                    }
                    className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                  />
                  {fieldErrors.phone && (
                    <p
                      id="inquiry-phone-error"
                      className="mt-1 text-xs font-medium text-[#724532]"
                    >
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-type"
                    className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                  >
                    Request Type
                  </label>
                  <select
                    id="inquiry-type"
                    value={values.inquiryType}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        inquiryType: e.target.value as InquiryFormValues['inquiryType'],
                      }))
                    }
                    className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                  >
                    <option value="private-viewing">Private Accompanied Viewing</option>
                    <option value="architectural-dossier">
                      Full Architectural Floor Plans & Dossier
                    </option>
                    <option value="valuation-brief">
                      Family Office Valuation & Legal Brief
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry-window"
                  className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                >
                  Preferred Consultation Window *
                </label>
                <select
                  id="inquiry-window"
                  value={values.preferredWindow}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      preferredWindow: e.target.value,
                    }))
                  }
                  className="mt-1.5 h-11 w-full border border-[#d5cbb8] bg-[#f4f0e9] px-3 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                >
                  <option value="Next 7 Days — Morning Slot">
                    Next 7 Days — Morning Slot (10:30 AM – 1:00 PM IST)
                  </option>
                  <option value="Next 7 Days — Sunset Slot">
                    Next 7 Days — Golden Hour Viewing (4:30 PM – 6:30 PM IST)
                  </option>
                  <option value="Weekend Private Charter / Visit">
                    Upcoming Weekend — Private Site Inspection
                  </option>
                  <option value="Virtual Dossier Walkthrough">
                    Virtual Architectural Walkthrough First
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="inquiry-notes"
                  className="block text-[11px] font-medium tracking-[0.14em] text-[#282320] uppercase"
                >
                  Bespoke Requirements or Questions
                </label>
                <textarea
                  id="inquiry-notes"
                  rows={3}
                  value={values.notes}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  className="mt-1.5 w-full border border-[#d5cbb8] bg-[#f4f0e9] p-3 text-sm text-[#282320] focus:border-[#724532] focus:bg-[#fffcf7] focus:outline-none"
                />
              </div>

              <div className="flex flex-col-reverse items-center justify-between gap-3 border-t border-[#e6dfd3] pt-4 sm:flex-row">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full border border-[#d5cbb8] bg-[#f4f0e9] px-5 py-3 text-xs font-medium tracking-[0.14em] text-[#282320] uppercase hover:border-[#282320] sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-[#724532] px-6 py-3 text-xs font-medium tracking-[0.16em] text-[#fffcf7] uppercase transition-colors hover:bg-[#5a3526] sm:w-auto"
                >
                  Submit Demo Inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
