# 🛒 Cartwheel — Roadmap

An American "dopamine store": all the shopping, none of the spending. This file tracks
what's shipped and what's next. Guiding principle: **delight without harm** — we simulate
the *thrill* of buying, never nudge people toward real overspending.

## 📐 Content rules
- **No visible brands in product photos.** Imagery should be brand-neutral — no logos,
  wordmarks, or recognizable trademarked designs. Keeps it parody-safe and original.

---

## ✅ Shipped

- **Core loop** — storefront → product page → cart → fake checkout → live delivery tracker
- **Live delivery map** — animated truck warehouse → home, ETA countdown, step progress
- **Playful brand** — Baloo 2 / Nunito, gradient tiles, confetti + synthesized sounds
- **Persistence** — cart in localStorage, "money saved by not buying" tally
- **Deploy** — GitHub Pages, one-command `npm run deploy`

### Latest drop (v0.2)
- **Sponsored ad slot** — small, clearly-labeled, privacy-first-network-ready, non-predatory
- **Sound & motion polish** — persisted mute, richer audio, fly-to-cart, page transitions, number bumps
- **Thrifted category** — secondhand finds with a ♻️ badge + condition text
- **Delivery windows** — pick your own (30s–3h) or 🎲 random; tracker compresses long windows

---

## 🔜 Planned

### 1. Accounts & "Drops"  _(next big rock)_
- **User accounts** — sign up / sign in; sync cart, haul history, and the savings tally across devices
- **Drops** — limited "new arrival" product releases on a schedule (scarcity is the dopamine)
- **Notifications** — opt-in alerts when a new drop lands:
  - Web push (PWA) + email; per-user "notify me" on individual drops
  - A "Drops" tab with a countdown to the next release
- **Proposed stack:** Supabase (auth + Postgres + Row Level Security) — mirrors the approach
  used on the budgeting app; web push via the Push API + a service worker.
- **Guardrail:** notifications celebrate *browsing*, never shame or "you left items in your cart"
  dark patterns. Easy one-tap unsubscribe.

### 2. Real / AI product imagery  _(in progress)_
- Replace emoji tiles with real photos (Unsplash) or tasteful AI images
- Add an `image` field per product with blur-up loading + emoji fallback
- Note: `source.unsplash.com` (keyword) was retired in 2024 — use the **Unsplash API**
  (free access key) for on-the-fly search, or curated/verified photo IDs

### 3. Monetization, ethically
- Swap the house ad for a real **contextual, privacy-first** network (EthicalAds / Carbon)
- **"Fake sales" data product** — aggregate, anonymized demand signals (what people *almost*
  buy) that real advertisers/brands may find valuable, without tracking individuals

---

## 🚀 Expansion — a family of "dopamine, no consequences" toys
**Goal: expand brands & products.** whim (fake shopping) is the first of a family of
playful sites that deliver the *thrill* of a high-stakes behavior with **zero real-world
harm**. Each shares the ethos, the brand kit, and the accounts/savings backbone.

- **Fake stock market** — "all the trading rush, none of the losses." Buy/sell pretend
  stocks, watch a live ticker + candlestick chart, build a paper portfolio, get the
  green-number dopamine. Tally "money you *didn't* lose day-trading."
- **Fake sports betting** — "all the action, none of the losses." Place pretend bets on
  real or invented matchups, live odds + a bet slip, watch results roll in. Especially
  on-ethos: scratches the gambling itch with **no money at risk** (a genuinely useful,
  harm-reduction angle — never real wagering).

**Shared platform to build once, reuse:** brand system, Supabase accounts + history,
the worldwide live "saved/avoided" tracker, the Sponsored ad slot, drops/notifications.
Open question: one umbrella brand with sub-apps, or distinct brands sharing a backend?

## 💡 Backlog / ideas
- **Humorous one-star reviews** — mix in a few funny, over-dramatic 1★ reviews on product
  pages alongside the glowing ones (e.g. "arrived imaginary, 0 stars — wait, that's the
  point... 1 star for making me feel feelings"). Keeps the parody honest and funnier.
- Wishlist / "saved" tab and shareable hauls
- Seasonal collections & themed drops
- Daily "free dopamine" streaks (browse, don't buy)
- Sound themes; reduced-motion-first toggle in UI
- Leaderboard of "most saved by not buying"
