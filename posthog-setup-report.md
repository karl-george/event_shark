<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into your EventShark Next.js App Router project. Here's a summary of all changes made:

- **`instrumentation-client.ts`** (new): Client-side PostHog initialization using the Next.js 15.3+ recommended approach. Includes error tracking (`capture_exceptions: true`), reverse proxy routing via `/ingest`, and debug mode in development.
- **`next.config.ts`** (updated): Added reverse proxy rewrites routing `/ingest/*` to the PostHog EU host, reducing the chance of events being blocked by ad blockers. Also added `skipTrailingSlashRedirect: true` as required by PostHog.
- **`components/ExploreBtn.tsx`** (updated): Added `posthog.capture('explore_events_clicked')` to the existing `onClick` handler, tracking when users engage with the main CTA.
- **`components/EventCard.tsx`** (updated): Added `'use client'` directive and `posthog.capture('event_card_clicked')` with rich properties (title, slug, location, date) to track which events users are most interested in.
- **`.env.local`** (new): PostHog API key and host configured as environment variables (`NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`).

## Events instrumented

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the 'Explore Events' button to scroll to the events list | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card (includes title, slug, location, date as properties) | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- 📊 **Dashboard — Analytics basics**: https://eu.posthog.com/project/129876/dashboard/534993
- 📈 **Event Engagement Over Time** (trend): https://eu.posthog.com/project/129876/insights/3aD7xkNg
- 🔻 **Event Discovery Funnel** (funnel): https://eu.posthog.com/project/129876/insights/9ed1OmZF
- 🏆 **Most Clicked Events by Title** (breakdown bar): https://eu.posthog.com/project/129876/insights/LxPwNJBE
- 👥 **Daily Active Users**: https://eu.posthog.com/project/129876/insights/6F1aHDI5
- 🔢 **Total Event Card Clicks** (bold number): https://eu.posthog.com/project/129876/insights/0xjBajoS

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
