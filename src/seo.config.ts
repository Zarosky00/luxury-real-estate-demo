// Search and AI-answer-engine settings for this app, written by MonstarX's SEO/GEO settings.
//
// Change them in Preview → SEO/GEO or through the authorized builder SEO tools, not here: every save replaces this file. The managed helper
// src/lib/monstarx/seo.ts turns them into the <head> of every page, /robots.txt, /sitemap.xml and /llms.txt.

import type { SeoConfig } from '@/lib/monstarx/seo'

export const seo: SeoConfig = {
  "siteUrl": "",
  "siteName": "DEMO",
  "defaultTitle": "DEMO",
  "titleTemplate": "%s · DEMO",
  "defaultDescription": "DEMO is an architectural real estate presentation portfolio featuring curated Indian heritage bungalows, sea-facing sky villas, and courtyard estates.",
  "keywords": [],
  "locale": "en",
  "themeColor": "",
  "image": null,
  "imageAlt": "",
  "twitterSite": "",
  "twitterCard": "summary_large_image",
  "indexable": false,
  "robots": {
    "mode": "allow",
    "disallow": [],
    "aiCrawlers": "allow",
    "custom": ""
  },
  "sitemap": {
    "enabled": true,
    "exclude": [],
    "extra": []
  },
  "llms": {
    "enabled": true,
    "summary": "",
    "notes": ""
  },
  "organization": {
    "name": "DEMO",
    "type": "Organization",
    "logo": null,
    "sameAs": [],
    "email": "",
    "phone": "",
    "address": ""
  },
  "verification": {
    "google": "",
    "bing": "",
    "yandex": "",
    "pinterest": ""
  },
  "faq": [],
  "pages": [
    {
      "path": "/",
      "title": "DEMO — Urban Atelier | Architectural Real Estate Across India",
      "description": "Explore DEMO's curated portfolio of Indian architectural residences across Mumbai, New Delhi, North Goa, Bengaluru, Udaipur, and Chennai."
    },
    {
      "path": "/about",
      "title": "About the Atelier · DEMO",
      "description": "Meet the architectural historians, conservation specialists, and private advisors behind DEMO Urban Atelier."
    },
    {
      "path": "/contact",
      "title": "Private Consultation & Ateliers · DEMO",
      "description": "Schedule a private demo consultation with DEMO's ateliers in Mumbai, New Delhi, and Bengaluru."
    },
    {
      "path": "/llms.txt"
    },
    {
      "path": "/properties",
      "title": "Properties Catalog · DEMO",
      "description": "Filter and sort DEMO's fictional portfolio of 10 Indian luxury residences by city, typology, and valuation."
    },
    {
      "path": "/properties/$propertyId",
      "title": "Residence Dossier · DEMO",
      "description": "Detailed architectural dossier, specifications, and private inquiry modal for a curated DEMO residence."
    },
    {
      "path": "/robots.txt"
    },
    {
      "path": "/sitemap.xml"
    }
  ],
  "paths": [
    "/",
    "/about",
    "/contact",
    "/llms.txt",
    "/properties",
    "/properties/$propertyId",
    "/robots.txt",
    "/sitemap.xml"
  ],
  "privatePaths": [
    "/",
    "/about",
    "/contact",
    "/llms.txt",
    "/properties",
    "/properties/$propertyId",
    "/robots.txt",
    "/sitemap.xml"
  ]
}

export default seo
