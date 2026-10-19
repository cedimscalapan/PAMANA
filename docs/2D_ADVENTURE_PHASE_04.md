# SMART PAMANA — Phase 04: Interactive Home Dashboard

## Scope
Phase 04 ONLY of the approved `SMART PAMANA: 2D Interactive Heritage Adventure` master development prompt.
Base commit `09ca50d4ffb7e7ab6c44a87f16d45bb6379425b5`. Phase 05 geographic adventure map is **not started**.

## Implemented
- **Illustrated welcome hero:** branded Soft Light sunrise SVG, existing Ka-Pamana image, friendly introduction, one-tap link to a real existing hometown journey. No remote assets or fictional Indigenous illustrations.
- **Profile-aware greeting and navigation:** shows the nickname/avatar from `pamana.profile.v1`; the avatar opens the existing Aking Pamana screen.
- **Genuine progress summary:** lessons completed / total reviewed lessons, completed saved Quest attempts, and completed hometown stamps / 15. Derived from existing `pamana.lesson.*` keys, `pamana.quest.games.v2` totals, `pamana.journey.v1` progress, and the current lesson and journey datasets. No XP, streaks, or fake achievement counters.
- **Next-step journey card:** live Discover–Learn–Play statuses from the existing chapter completion checks. Shows the correct actionable next activity (festival -> documented Matuto lesson -> linked source-backed province-wide Quest). Each step is tappable, including completed steps for replay. A completed hometown suggests another unfinished chapter instead of falsely reopening a reward.
- **Useful hometown suggestion:** prioritizes the user's selected unfinished hometown; otherwise continues the most progressed active journey or suggests an available locality, with a clear "Suggested hometown" label. Never claims a suggestion is the user's hometown.
- **Ka-Pamana contextual guidance:** the message is derived only from actual next-activity status; no autonomous AI model or unsupported cultural claims.
- **Continue learning:** opens a real unfinished reviewed Matuto lesson when available; otherwise a previously completed lesson. Shows credited existing cover imagery and actual course progress.
- **Daily cultural fact and six core modules:** existing cited `CulturalFactCard`, Matuto, Sulat, Lakbay, Quest, Kuwento, and Koleksyon remain operational and directly linked. Quick Quest and Sulat actions are available.
- **Reusable pure selector:** `src/data/home-dashboard.ts` centralizes stat and next-action derivation for tests. `src/data/home-dashboard.test.ts` covers no records, 1/2/3 steps, unrelated Quest result, completed hometown switch, no hometown preference and all-15 completion.
- **Scoped responsive interface:** `src/theme/pamana-home-phase04.css`, added after previously approved CSS. Optimized for small phones, orientation changes, text scaling, focus and reduced-motion.

## Preservation
There are **no new storage keys, migrations, database tables, third-party dependencies, permissions, external images, online fonts, or school/DepEd integrations**. All existing user records (stories, Sulat history, stamps, learning, avatars, preferences and media) remain in their original format.

## Verification
- CI: unit tests, TypeScript and production Vite build.
- Merged-main workflow: Android Capacitor debug APK artifact if build passes.
- Physical Android test still needed: navigation, appearance, TalkBack, airplane mode, 320px phones and accessibility with enlarged text.

## Deliberately NOT included
Phase 05 map positioning or inaccurate illustrated geography; Phase 06 locality scene development; Phase 07 mini-game enhancements; Phase 11 audio. Ka-Pamana's text is scripted guidance, not a trained offline LLM. Profile readings do not invoke any external API.

## Acceptance checklist
1. The initial welcome and returning user experience from earlier phases still work.
2. All 15 hometown chapters and all six original modules remain accessible.
3. Home totals reflect actual saved lessons and Quest totals.
4. No town stamp is shown earned because an unrelated Quest was completed.
5. Next activity routes to the selected chapter's actual festival, reviewed lesson, and linked Quest.
6. A user without selected hometown gets a clearly marked suggestion, not a fabricated hometown.
7. A user with completed hometown can continue exploring others without losing the earned stamp.
8. Offline fact cards, existing profile choices, and all current routes remain functional.
9. Small screens do not clip buttons or the tab bar and increased text remains readable.

**Next requested phase:** Phase 05 — Interactive 2D Oriental Mindoro Adventure Map, only after explicit instruction.
