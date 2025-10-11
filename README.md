# Gauree Cosmetics

An AI‑enhanced cosmetics storefront built with Next.js 15, Tailwind CSS, and Genkit. It features a product browsing experience and an AI‑powered Virtual Makeup Try‑On that lets users upload a selfie and preview makeup looks before buying.


## Overview

- Framework: Next.js 15 (App Router, TypeScript)
- Styling: Tailwind CSS, Radix UI primitives, shadcn/ui components
- AI: Genkit with Google Gemini models (image preview for virtual try‑on)
- Deployment target: Firebase App Hosting (`apphosting.yaml`)


## Features

- Virtual Makeup Try‑On (AI image generation) — route: `/virtual-try-on`
- Product catalog and pages — route: `/products`
- Cart and checkout — routes: `/cart`, `/checkout`
- Static/marketing pages — routes: `/`, `/about`, `/services`, `/contact`
- Account flows — routes: `/login`, `/signup`, `/account`


## Tech stack

- Next.js 15, React 18, TypeScript
- Tailwind CSS, Radix UI, shadcn/ui, Lucide icons
- Genkit (`@genkit-ai/google-genai`, `@genkit-ai/next`) for AI flows
- Form validation with `react-hook-form` and `zod`
- Extras: Embla carousel, Recharts


## Getting started

Prerequisites:
- Node.js 18+ (recommended) and npm
- A Google AI Studio API key for image generation

1) Install dependencies

```bash
npm install
```

2) Configure environment variables

Create a `.env.local` file in the project root:

```
# Required for Genkit Google GenAI plugin
GOOGLE_GENAI_API_KEY=your_api_key_here
```

3) Run the Next.js dev server (port 9002)

```bash
npm run dev
```

Optional: Start the Genkit developer server (useful for inspecting AI flows during development):

```bash
npm run genkit:dev
```


## Scripts

- `npm run dev` — Next dev with Turbopack on port 9002
- `npm run build` — Production build
- `npm run start` — Start built app
- `npm run lint` — Lint with Next ESLint config
- `npm run typecheck` — TypeScript check (no emit)
- `npm run genkit:dev` — Start Genkit dev server for AI flows
- `npm run genkit:watch` — Genkit dev server with TSX watch


## Virtual Makeup Try‑On

The AI flow lives in `src/ai/flows/virtual-makeup-try-on.ts` and is wired to a server action in `src/app/actions.ts`. The client UI is in `src/app/virtual-try-on/VirtualTryOnClient.tsx`.

How to use:
1) Go to `/virtual-try-on`
2) Upload a selfie (PNG/JPG/WEBP up to 4MB)
3) Choose a makeup look
4) Click “Try it On!” and wait for the generated result

Troubleshooting:
- “AI Generation Failed” or empty image: ensure `GOOGLE_GENAI_API_KEY` is set and valid, and that your account has access to the selected Gemini model.
- Large images: keep uploads under 4MB.


## Project structure (high level)

```
src/
	ai/
		genkit.ts               # Genkit setup (Google GenAI plugin)
		dev.ts                  # Loads flows for Genkit dev server
		flows/
			virtual-makeup-try-on.ts
	app/
		page.tsx, layout.tsx    # App Router entry
		virtual-try-on/         # Virtual try-on page + client
		...other routes         # about, products, cart, checkout, etc.
	components/               # UI components (shadcn/ui)
	lib/                      # data, utils, placeholder images
```


## Deployment

This project includes `apphosting.yaml` for Firebase App Hosting configuration. To deploy, set up Firebase App Hosting in your project and follow the official docs:

- https://firebase.google.com/docs/app-hosting

Notes:
- `next.config.ts` allows remote images from common placeholder providers; data URIs from the AI flow are also supported.
- TypeScript/ESLint errors are ignored during build in `next.config.ts`; use `npm run typecheck` locally to enforce types.


## License

Proprietary — all rights reserved (update this section if you adopt a specific license).
