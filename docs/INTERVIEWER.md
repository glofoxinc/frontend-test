# Interviewer notes — Pokédex hiring test

> **Before sharing this repo with a candidate:** delete this `docs/` folder and squash git history so these notes are not recoverable.

## Setup checklist

1. `npm install && npm run dev` — open the app once so PokeAPI responses warm the CDN.
2. Confirm Network access to `https://pokeapi.co` works on the interview machine.
3. If the list of 151 rows is too heavy, change `PAGE_SIZE` in [`src/lib/pagination.ts`](../src/lib/pagination.ts) to `100`.
4. Confirm `npm test` is green before the session starts.
5. React StrictMode (dev only) double-invokes effects, so Network shows ~2× requests. Amplifies the symptoms; gone in production.

## 60-minute structure

| Time      | Focus |
| --------- | ----- |
| 0–5 min   | Orientation: list → detail → back once together. Point at the README framing. |
| 5–15 min  | Investigation out loud. Let them drive. |
| 15–45 min | Implement one or two fixes. Prefer depth over breadth. |
| 45–60 min | Discussion: what next, trade-offs, how they'd measure success. |

**Do not** hand them the problem list. Slow list + slow detail + bad back-navigation are enough. If stuck after ~8 minutes, nudge toward the Network tab.

## Rubric

Score each independently (strong / partial / weak):

1. **Found a real problem**
2. **Diagnosed the cause**
3. **Proposed a proportionate fix**
4. **Shipped without breaking tests** — noticed `npm test` exists and re-ran after changes
5. **Communication** — prioritised for ~1 hour

Bonus: un-skips the pagination off-by-one test; mentions a11y / layout without prompting.

---

## Planted problems

### Tier 1 — core

#### 1. List remounts and refetches on every back navigation

- **Symptom:** Going back to the list always shows the loading spinner and refetches all 151 items (and then the N+1 row fetches again).
- **Where:** [`src/pages/ListPage.tsx`](../src/pages/ListPage.tsx) — fetch in `useEffect` on mount; page unmounts when leaving the route.
- **Expected fixes:** Keep list state above the router / use an outlet layout that doesn't unmount; add a simple in-memory cache; stale-while-revalidate; React Query / SWR (discussion is fine even if they don't install it).

#### 2. `limit=151`, no pagination UI

- **Symptom:** Huge list, janky scroll. API returns `count` / `next` / `previous` but they are ignored.
- **Where:** [`src/lib/pagination.ts`](../src/lib/pagination.ts) (`PAGE_SIZE = 151`), [`src/pages/ListPage.tsx`](../src/pages/ListPage.tsx)
- **Expected fixes:** Page size ~20 with prev/next or infinite scroll; virtualisation if keeping one long list.

#### 3. N+1 requests on the list

- **Symptom:** Opening the list fires ~151 `GET /pokemon/:name` requests.
- **Where:** [`src/pages/ListRow.tsx`](../src/pages/ListRow.tsx)
- **Cause:** List endpoint only returns `{ name, url }`; each row fetches the full Pokémon for sprite + types.
- **Expected fixes:** Paginate first; `IntersectionObserver`; derive sprite URL from id; concurrency limit.

#### 4. Detail page sequential waterfall

- **Symptom:** Blank loading for several seconds; Network shows requests one after another.
- **Where:** [`src/pages/DetailPage.tsx`](../src/pages/DetailPage.tsx)
- **Cause:** Fully sequential `await` chain behind a single loading gate. Encounters have no dependency but are fetched last.
- **Expected fixes:** `Promise.all` / two-wave loading; per-section loading; lazy-load below-fold sections.

```
pokemon ──► type(s), ability(s), move, form(s), species
species ──► evolution-chain, growth-rate, egg-group(s)
encounters  (independent — can start immediately)
```

### Tier 2 — discussion fodder (don't expect all fixed)

5. **No request caching / dedupe** — [`src/api/client.ts`](../src/api/client.ts)
6. **Race conditions** — no AbortController on detail / row fetches; search has no debounce
7. **`setState` after unmount** — no effect cleanup
8. **No error handling** — one failed section can blank the page
9. **Array index as `key`** while filtering — [`ListPage.tsx`](../src/pages/ListPage.tsx)
10. **Client-side search over one page only** (151 of ~1351)
11. **Lost scroll / search** on back navigation
12. **Eager detail sections** — all 10 render at once after the waterfall
13. **Images without `alt`**, layout shift from spinner replacing content
14. **Over-fetching** — ~290KB JSON per row for a sprite and badges

---

## Unit tests

Just enough to see if the candidate notices and re-runs them after refactoring.

| File | Purpose |
| ---- | ------- |
| `src/lib/format.test.ts` | Name / height / weight / id helpers |
| `src/lib/pagination.test.ts` | Page size + offset. Includes **`it.skip`** for the `Math.floor` off-by-one. |
| `src/pages/ListPage.test.tsx` | Loading → rows; search filters the list (fetch stubbed). |
| `src/pages/DetailPage.test.tsx` | Loading → all 10 sections; back link to `/`. |

## Good enough for 60 minutes

Any of these is a strong session:

- Stops the list refetch-on-back **or** reduces the N+1, and explains the detail waterfall
- Adds pagination and parallelises a couple of detail fetches
- Clear prioritisation + one solid shipped fix + tests still green
