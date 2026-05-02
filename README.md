# Alvenco Demo Web

Sito marketing multi-lingua (IT/EN) sviluppato con Next.js App Router per presentare servizi, piani e raccogliere richieste tramite form contatti con invio email.

## Stack

- Next.js 16 (App Router)
- React 19
- `next-intl` per localizzazione IT/EN
- Tailwind CSS 4
- Nodemailer (SMTP Aruba) per invio email da API route e auto-reply al cliente
- Framer Motion per animazioni UI

## Pagine principali

- Home: `app/[locale]/page.tsx`
- Servizi: `app/[locale]/servizi/page.tsx`
- Vision: `app/[locale]/vision/page.tsx`
- Contatti: `app/[locale]/contatti/page.tsx`

## Localizzazione

- Dizionari: `messages/it.json`, `messages/en.json`
- Routing locale: `app/[locale]/...`
- Traduzioni pricing e form allineate in entrambe le lingue

## Form contatti

Componente: `components/contact-form.tsx`  
API: `app/api/contact/route.ts`

Funzionalita principali:

- Argomento obbligatorio, piano opzionale
- Selezione piano condizionale per topic `web`, `mobile`, `ecommerce`
- Blocco messaggio piano precompilato (nome + subtitle + prezzo) quando viene scelto un piano
- Banner riepilogo mostrato solo dopo selezione reale di un argomento
- URL sincronizzata con selezioni correnti (`topic`, `plan`) per coerenza stato
- Supporto prefill da query string in pagina contatti

## Variabili ambiente

Copia `.env.example` in `.env.local` e valorizza:

```bash
SMTP_USER=
SMTP_PASS=
CONTACT_TO_EMAIL=
DEEPL_AUTH_KEY=
```

Note:

- `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL` sono necessarie per l'invio email del form (SMTP Aruba `smtps.aruba.it:465`). Non committare mai `SMTP_PASS`.
- In Vercel i nomi devono combaciare esattamente con quelli sopra. Rimuovi le vecchie variabili Resend se presenti.
- `DEEPL_AUTH_KEY` serve solo per lo script locale di traduzione.

## Script utili

```bash
npm run dev
npm run lint
npm run build
npm run i18n:deepl
```

## Asset brand

- Logo componente: `components/alvenco-logo.tsx`
- Logo full SVG: `public/logo-full.svg` (usato nel sito)
- Simbolo logo SVG: `public/Simbolo-logo-Alvenco_Ltd.svg` (sorgente favicon)
- Simbolo ufficiale PNG legacy: `public/simbolo-alvenco_ltd.png`
- Favicon attuale: `app/favicon.ico`
- Favicon precedente conservato: `app/favicon-old.ico`

## Changelog sintetico (ultimi update)

- i18n completa IT/EN con `next-intl` e switch lingua
- Home aggiornata con nuovo intro pricing localizzato
- Form contatti evoluto: piano opzionale, selezione condizionale, blocco piano nel messaggio
- Query string contatti sincronizzata con topic/piano correnti
- Banner contatti visibile solo dopo selezione reale dell'argomento
- Pagina servizi: rimosso prefill sezione nel form
- Invio email via Nodemailer (SMTP Aruba): mail interna + auto-reply al cliente
- Frase informativa form semplificata (nessun nome provider nel copy utente)
- CTA hero verso sezione prezzi (`#prezzi`) e miglioramenti UX scroll
- Settori servizi aggiunti (Hotel, Ristorazione, Logistica, Professionisti)
- Favicon aggiornato con simbolo Alvenco, con backup del precedente
- Logo sito migrato a SVG full + favicon rigenerata da simbolo SVG
- Logo aumentato su desktop mantenendo scala mobile invariata

## Deploy

Deploy consigliato su Vercel.

Prima del deploy:

1. Configura le environment variables richieste
2. Esegui `npm run lint`
3. Esegui `npm run build`

## SEO & Performance

### File SEO aggiunti
- `app/sitemap.ts` — sitemap dinamica IT/EN con hreflang
- `app/robots.ts` — robots.txt con riferimento sitemap
- `app/opengraph-image.tsx` — OG image dinamica 1200x630
- `components/schema-org.tsx` — Schema.org structured data (LocalBusiness + FAQPage + WebSite)

### Metadata strategy
- Ogni pagina ha `generateMetadata` con title/description localizzati
- Hreflang configurato per IT/EN con x-default su EN
- Open Graph e Twitter Card su tutte le pagine
- Canonical URL su ogni pagina

### Keyword targets
| Mercato | Keyword primarie |
|---|---|
| UK | web agency Hertfordshire, app development UK, web developer Bishop's Stortford |
| IT | agenzia web UK italiani, sviluppo sito web UK, app mobile UK Italia |
| AI Search | digital studio UK Italy, web agency bilingual UK |

### Performance targets (Lighthouse)
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- Score > 90 su tutte le categorie

## Posizionamento brand

**Differenziatore principale**: Unico studio digitale che opera nativamente su mercato UK e mercato italiano.

**Target cliente**:
- Aziende italiane che vogliono espandersi in UK
- Aziende UK che vogliono raggiungere il mercato italiano
- PMI locali Hertfordshire senza sito o con sito obsoleto

**CTA principale**: "Free site audit" (EN) / "Audit gratuito del sito" (IT)

## Changelog SEO (Aprile 2026)
- Aggiunta sitemap dinamica con hreflang IT/EN
- Aggiunto robots.ts
- Aggiunto Schema.org (LocalBusiness + FAQPage + WebSite)
- Aggiornati metadata con keyword strategy duale UK/IT
- Aggiunto OG image dinamico
- Aggiornato copy hero e servizi con posizionamento UK–Italia
- Aggiunto namespace FAQ nei messaggi IT/EN per AI search optimization
- Aggiunta sezione FinalCTA con audit gratuito come lead magnet
- Aggiunti security headers in next.config.ts
