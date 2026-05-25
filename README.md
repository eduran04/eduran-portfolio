# ED-Portfolio

A personal portfolio site showcasing projects, work experience, skills, and contact links. 

## What's in this repo

- **`index.html`** - Page structure and content  
- **`styles.css`** - Layout, typography, light/dark theme, responsive layout  
- **`main.js`** - Theme preference, mobile nav, scroll-driven animations  
- **`assets/`** - Images and logos  

## Live site

**https://eduran-portfolio.vercel.app/**

The site is deployed as static files (on Vercel) with the project root as the web root. No install or build command required.

## Web Analytics

This site uses [Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart) for privacy-friendly pageview and outbound-link tracking.

### One-time setup (Vercel dashboard)

1. Open the [eduran-portfolio Analytics page](https://vercel.com/eduran04s-projects/eduran-portfolio/analytics?environment=all).
2. Click **Enable** to turn on Web Analytics for the project.
3. Deploy the latest code so Vercel injects the `/_vercel/insights/*` routes.

No npm packages or build step are required for this static HTML site.

### What the code does

- **`index.html`** loads the Vercel analytics bootstrap and `/_vercel/insights/script.js`.
- **`main.js`** sends a custom `Outbound click` event when visitors open external links (projects, GitHub, LinkedIn, etc.).

Analytics is defensive: local previews and non-Vercel hosts simply skip tracking when the Vercel script is unavailable.

### Verify after deploy

1. Visit https://eduran-portfolio.vercel.app/.
2. Open DevTools → Network and confirm requests to `/_vercel/insights/view` (pageviews) after a page load.
3. Click an external link and confirm an `/_vercel/insights/event` request for `Outbound click`.
4. Check the Vercel Analytics dashboard; traffic may take a few minutes to appear.
