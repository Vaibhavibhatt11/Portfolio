# Portfolio Platform

Production-ready personal portfolio with a secure admin panel, custom analytics, and a freelance-focused public site.

## Stack Choices (Stability-First)
- Next.js App Router (mature, server-first rendering, stable route handlers)
- TypeScript
- Tailwind CSS
- MongoDB (Atlas recommended)
- Prisma ORM (MongoDB provider)
- NextAuth (Credentials provider, server-side sessions via JWT)
- Cloudinary (server-side uploads)
- Vercel deployment

## Architecture Overview
- Public site renders server-side from Postgres.
- Admin panel protected with NextAuth + middleware.
- Server actions manage all CRUD and Cloudinary uploads.
- Analytics handled by a lightweight `/api/track` endpoint.
- No ORM usage in Edge runtime.
- No DB calls at build time (`dynamic = "force-dynamic"`).

## Folder Structure
- `src/app/(site)` — Public marketing site (DB-driven)
- `src/app/admin` — Admin panel (protected)
- `src/app/api` — Auth, contact, analytics routes
- `src/components` — UI building blocks
- `src/lib` — Prisma, auth, analytics helpers
- `prisma` — Schema and seed data

## Environment Variables
Create `.env` with:
```
DATABASE_URL="mongodb+srv://USER:PASSWORD@HOST/db?retryWrites=true&w=majority"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="use-a-strong-password"
ANALYTICS_SALT="random-string"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-key"
CLOUDINARY_API_SECRET="your-secret"
```

## Setup
1. Install dependencies:
```
npm install
```

2. Generate Prisma client:
```
npm run prisma:generate
```

3. Push schema and seed:
```
npx prisma db push
npm run db:seed
```

4. Start dev server:
```
npm run dev
```

## Admin Authentication
- Credentials stored in Postgres.
- Seed creates the admin user using `ADMIN_EMAIL` + `ADMIN_PASSWORD`.
- Middleware protects `/admin/*`.
- Server actions also check admin session.

## Analytics Logic
- Client sends pageview + CTA events to `/api/track`.
- Server hashes IP + user agent with `ANALYTICS_SALT`.
- Events stored in `AnalyticsEvent`.
- Dashboard aggregates total visits, daily visits, unique visitors, and top pages.

## Freelancing Workflow
- “Open for Freelance” toggle in settings.
- CTA triggers analytics event and points to contact form.
- Contact form writes to `ContactMessage` table.
- Admin panel tags messages (Freelance, Job, General).

## Deployment (Vercel)
1. Push repo to GitHub.
2. Create a MongoDB Atlas cluster.
3. Set environment variables in Vercel.
4. Push schema:
```
npx prisma db push
```
5. Deploy and verify.

## Notes
- Cloudinary uploads happen server-side in admin actions.
- No secrets are exposed to the client.
- Minimal logs in production.
"# Portfolio" 
