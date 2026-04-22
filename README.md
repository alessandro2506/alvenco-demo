# Alvenco Demo Web

Sito marketing multi-lingua (IT/EN) sviluppato con Next.js App Router per presentare servizi, piani e raccogliere richieste tramite form contatti con invio email.

## Stack

- Next.js 16 (App Router)
- React 19
- `next-intl` per localizzazione IT/EN
- Tailwind CSS 4
- Resend per invio email da API route
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
RESEND_API_KEY=
CONTACT_TO_EMAIL=
RESEND_FROM_EMAIL=
DEEPL_AUTH_KEY=
```

Note:

- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `RESEND_FROM_EMAIL` sono necessarie per l'invio email del form.
- In Vercel i nomi devono combaciare esattamente con quelli sopra.
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
- Simbolo ufficiale PNG: `public/simbolo-alvenco_ltd.png`
- Favicon attuale: `app/favicon.ico`
- Favicon precedente conservato: `app/favicon-old.ico`

## Deploy

Deploy consigliato su Vercel.

Prima del deploy:

1. Configura le environment variables richieste
2. Esegui `npm run lint`
3. Esegui `npm run build`
