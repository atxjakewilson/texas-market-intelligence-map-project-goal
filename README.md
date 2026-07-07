# Commercial Banking Market Intelligence Heat Map

A production-ready Next.js application for commercial lenders exploring where public economic activity across Texas may translate into commercial lending opportunities.

The app is a market intelligence and prospecting tool. It is not a loan underwriting system. It organizes public-source market signals, evidence, nearby projects, loan-product ideas, and prospecting actions around one interactive Texas map.

## Recommended Hosting

Use Vercel.

This project uses the Next.js App Router, React client components, route handlers under `/app/api`, dynamic Leaflet map rendering, and static bundled market data. Vercel is the best fit because it has first-party Next.js support, GitHub imports, automatic preview deployments, serverless route handling, and no custom server setup.

Render, Railway, and Netlify can also host the app, but they add more configuration for this architecture. Vercel is the simplest and lowest-maintenance production path.

## Requirements

- Node.js 20.18 or newer
- pnpm 11.7.0 for deterministic dependency installation from `pnpm-lock.yaml`
- npm available for the build command

## Environment Variables

No environment variables are required for the app to run.

Optional:

```bash
CENSUS_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

`CENSUS_API_KEY` enables keyed Census API status checks. If it is not provided, the app still runs from the bundled public-source dataset and shows a limited/unavailable status when live checks fail.

`NEXT_PUBLIC_SITE_URL` is reserved for future absolute canonical URLs. The current app does not require it.

## Local Verification

```bash
pnpm install
npm run build
```

Optional local production smoke test:

```bash
npm run start
```

## Deploying From GitHub To Vercel

1. Push this repository to GitHub.
2. Sign in to Vercel and choose **Add New Project**.
3. Import the GitHub repository.
4. Use the **Next.js** framework preset.
5. Confirm these build settings:
   - Install Command: `pnpm install --frozen-lockfile`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Add optional environment variables only if needed:
   - `CENSUS_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`
7. Deploy.
8. Share the Vercel production URL.

## Project Structure

```text
/app
  Next.js routes, metadata, favicon/manifest files, global styles, error handling, and API routes
/components
  Reusable React components for the dashboard, map, selectors, search, and market panel
/data
  Bundled public-source market records, evidence, nearby projects, and source references
/hooks
  Client hooks for public-source status checks
/lib
  Assessment, search, color, source, and recommendation logic
/types
  Shared TypeScript data model
```

## Public Data Sources Used

The app uses transparent seeded public-source records with clickable source links and non-blocking live status checks.

- U.S. Census Bureau Population Estimates and Census APIs
- TxDOT Project Tracker and TxDOT project pages
- Texas Department of Licensing and Regulation TABS
- U.S. Small Business Administration Open Data
- Port Houston Project 11
- Port of Corpus Christi
- Samsung Newsroom
- Texas Instruments newsroom
- Texas Medical Center Helix Park
- Office of the Texas Governor
- U.S. Energy Information Administration
- Local economic development, chamber, airport, port, and company announcements linked from evidence and project cards

## Live Data Behavior

The dashboard is designed to keep working even when live public data checks fail.

- Market records, evidence, source links, projects, and recommendations are bundled with the app.
- `/api/public-data-status` checks Census availability and returns fallback source status if unavailable.
- `/api/refresh-market-data` performs non-blocking public-source checks and leaves cached evidence available if a source times out.
- Live status failures are shown as clear messages instead of breaking the map.

## Deployment Notes

- The app has no hardcoded local file paths.
- The map uses OpenStreetMap tiles from the public tile endpoint.
- Leaflet marker visuals are CSS-based and do not require external marker image assets.
- The favicon, Apple icon, web manifest, robots rules, SEO metadata, and error pages are included in the app bundle.
- Build artifacts and environment files are excluded through `.gitignore`.

## Known Limitations

- County boundaries are represented with metro activity circles rather than full county polygon GeoJSON.
- Most project records are curated public-source records instead of fully automated feeds because many local government and economic development sources do not provide stable keyless APIs.
- Basemap tiles depend on the browser being able to reach OpenStreetMap.
- This is market intelligence and prospecting guidance only. It does not evaluate borrower credit, collateral, repayment capacity, or loan eligibility.

## Future Improvements

- Add Texas county GeoJSON with clickable county polygons.
- Add scheduled ingestion for TxDOT Project Tracker exports and local open-data portals.
- Add Census County Business Patterns and SBA public dataset integrations.
- Add saved lender territories, notes, and exportable prospecting call sheets.
- Add confidence levels per evidence item and a source review workflow.
