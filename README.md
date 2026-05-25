# ED-Portfolio

A personal portfolio site showcasing projects, work experience, skills, and contact links. 

## What's in this repo

- **`index.html`** - Page structure and content  
- **`styles.css`** - Layout, typography, light/dark theme, responsive layout  
- **`main.js`** - Theme preference, mobile nav, scroll-driven animations, and analytics integration  
- **`assets/`** - Images and logos  
- **`package.json`** - Project dependencies and build scripts

## Development

Install dependencies:
```bash
npm install
```

Run dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Live site

**https://eduran-portfolio.vercel.app/**

The site is built using Vite and deployed to Vercel. The build output (`dist/`) contains optimized static files.

## Web Analytics

This site uses [Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart) for privacy-friendly pageview and outbound-link tracking.

### Implementation

The project uses the official `@vercel/analytics` package with the `inject()` method for analytics tracking:

- **`package.json`** includes `@vercel/analytics` as a dependency
- **`main.js`** imports and calls `inject()` after user consent is granted
- Custom `Outbound click` events track when visitors click external links (projects, GitHub, LinkedIn, etc.)
- User consent is managed through a privacy banner, with preferences stored in localStorage

### Setup (Vercel dashboard)

1. Open the [eduran-portfolio Analytics page](https://vercel.com/eduran04s-projects/eduran-portfolio/analytics?environment=all).
2. Click **Enable** to turn on Web Analytics for the project.
3. Deploy the latest code so Vercel injects the analytics endpoints.

### How it works

- The `inject()` function from `@vercel/analytics` automatically loads the Vercel tracking script
- Analytics only loads after the user accepts via the consent banner
- Local development and non-Vercel hosts gracefully skip tracking when the Vercel endpoints are unavailable

### Verify after deploy

1. Visit https://eduran-portfolio.vercel.app/
2. Accept the analytics consent banner
3. Open DevTools → Network and confirm requests to `/_vercel/insights/view` (pageviews)
4. Click an external link and confirm an `/_vercel/insights/event` request for `Outbound click`
5. Check the Vercel Analytics dashboard (traffic may take a few minutes to appear)
