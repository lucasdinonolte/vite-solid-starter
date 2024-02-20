# Vite Solid Template

A base template for building simple Solid websites and prototypes with Vite (including simple SSG).

## Scripts

- `npm run dev` - Run the app for local development
- `npm build` - Build the app
- `npm start` - Run the built app in a local server
- `npm run scaffold` - Utility CLI to quickly set up new components and pages

## Get started

Either choose the "Use this template" button on this repo or clone using `degit`.

```bash
npx degit github.com:lucasdinonolte/vite-solid-starter
```

## What's included

This template comes with a solid `vite.config.js` package setup:

- ES6 and Solid compilation with ESBuild (vite)
- File based routing (including next.js style dynamic routes)
- Import aliases for quickly importing components, utils and assets
- CSS with PostCSS and CSS Modules
  - An opinionated style setup providing both structure and utility classes. See [Styles Docs](./docs/Styles.md) for more
- Development server with hot module loading and automatic port allocation
- Production build with minification
- Image resizing and webp-conversion via `import`
- Support for `.env` files that are loading into client side `process.env.VAR_NAME`
	- Only env variables prefixed with `PUBLIC_` will be made available in client side code, to prevent leaking secrets into public code
- Optional testing with Vitest and Testing Library
- Static HTML generation of non-dynamic routes
- Lazy CLI to quickly scaffold new components and pages

## Deploying

We suggest that you use [`@designsystemsinternational/static`](https://www.npmjs.com/package/@designsystemsinternational/static) for deployment.
