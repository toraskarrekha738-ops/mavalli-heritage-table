<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

<!-- AGENT-MEMORY:BEGIN -->
- Single-page site: `/` composes section components from `src/components/site/`; nav uses in-page anchors via `scrollToId` (user asked for one scrolling page with anchors).
- Content (dishes, contact, gallery) lives in `src/lib/site-data.ts`; booking rules in `src/lib/reservation.ts` with tests in `src/test/` — keep copy/data out of components so it stays testable.
- `.theme-paper` / `.theme-charcoal` re-scope the shadcn tokens per section; use them instead of per-component colours.
- Motion uses framer-motion wrapped in `MotionConfig reducedMotion="user"`; reusable motion primitives (Reveal, Tilt, Marquee, Embers, CursorRing, ScrollProgress) live in `src/components/site/motion.tsx`; CSS keyframes have a reduced-motion override in `src/styles.css` — pointer effects must stay mouse-only.
<!-- AGENT-MEMORY:END -->
