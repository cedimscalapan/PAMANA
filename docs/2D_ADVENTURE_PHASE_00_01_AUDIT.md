# SMART PAMANA — Phase 00 audit and Phase 01 design foundation

**Source:** latest `cedimscalapan/PAMANA` `main` at `2d2eca990b9e5d5e7cf6a637c303f470376322f6` before changes. This is a code audit, not a physical Android usability test.

## 00 — Inventory and compatibility

| Area | Existing implementation | Protection |
|---|---|---|
| Routing | `src/App.tsx` preserves Home, Journey, Matuto, Writing, Lakbay, Quest, Stories, Collection, Settings, More, Profile, Onboarding | Route URLs unchanged |
| Home | Personalized banner, lesson progress, journey entry, six module cards | No altered persistence rules |
| Heritage Journey | 15 hometown chapters, real festival/lesson/Quest links, offline stamps | Existing three-step completion remains authoritative |
| Matuto | 16 reviewed lessons plus three pilot interactive discoveries and glossary matching | Content/sources unchanged |
| Quest | Existing source-backed game modes, hint/retry and saved sessions | Score checking unchanged |
| Sulat | Hanunó’o transliteration/tracing and existing writing record persistence | Script content and records untouched |
| Lakbay | Festival and place discovery with documented references | Kept existing `/explore` route; added explicit More entry |
| Kuwento & Koleksyon | Private memories/photos, achievement passport | No data change |
| Personalization | Hometown, festival, reading level, light appearance and motion settings | Values and storage keys unchanged |
| Offline storage | `src/services/storage.ts` Capacitor SQLite with browser fallback | No schema migration, new permissions, or runtime APIs |
| Images | Ka-Pamana image and rights/attribution-rich heritage media library | No use of previous blurry generated hometown sprite |
| Android | Existing GitHub Actions debug APK workflow | Verify after CI/merge |

### Current interface risks identified
1. CSS accumulated across `variables.css`, `pamana-personalization.css`, `global.css`, `heritage.css`, `pamana-refresh.css`, `pamana-soft-light.css`, `pamana-journey.css`, and `pamana-discoveries.css`. Specificity and load order can yield inconsistent cards or fonts.
2. Previous five-tab bar still used `Lakbay` despite Heritage Journey becoming the main adventure flow; Journey was shown as Home instead of its own tab.
3. Decorative imagery should not masquerade as documented municipality landmarks, official emblems or Indigenous imagery.
4. Many older modules still have individually styled cards; visual foundations should be introduced incrementally, not by a destructive global CSS replacement.
5. Real small-device/TalkBack/landscape/airplane-mode usability has not been observed in this code audit.

### Safe migration strategy
Create a small dedicated adventure design layer loaded last. Keep existing CSS and components operational. Update the shared navigation only, keep all routes, and introduce opt-in reusable primitives so future screens can be migrated phase by phase. Preserve local data and original photos.

## 01 — Implemented visual foundation
- Centralized light pastel tokens: cream, jade, mint, sky, peach, lavender, soft gold and readable text.
- Reusable offline `AdventureScenery` component with SVG coast/hills/sunrise variations. **Conceptual vector decoration, not a real map or documented photograph.**
- Reusable controls `PamanaButton`, `PamanaBadge`, `PamanaCard`, `PamanaIllustratedCard`, `PamanaProgress`, `PamanaMascot`, `PamanaFeedback`, `PamanaEmptyState`, `PamanaLoadingState`, and `PamanaAdventureCard`.
- Unified data-driven navigation **Home | Journey | Matuto | Quest | More**, with Journey mapped from Lakbay content and More for secondary modules.
- Reused the existing mascot, rather than generating inaccurate character/cultural assets.
- Displayed scalable decorative scenery on Home and Journey, while preserving all real source-backed learning/media.
- Responsive sizing, touch-friendly controls, visible focus, status/disabled states and reduced-motion support.
- Does not modify storage schemas or lesson/Quest achievement rules.

## Acceptance / next steps
- Check tests, TypeScript, Vite production bundle on this PR. Inspect GitHub Android workflow after merge.
- Manually inspect navigation, Home/Journey vector layering, 320–430px layouts, enlarged text, keyboard focus, TalkBack and airplane mode on an actual Android phone.
- Future **Phase 02**: welcome, splash and onboarding artwork. **Do not start it in this PR.**
- Later phases migrate remaining page-specific layouts to the shared components while verifying existing functionality.

## Cultural/rights notes
Design assets are purely abstract landscape motifs (not maps). They include no Hanunó’o text, unofficial ceremonial motifs, sacred imagery or misleading historical details. Existing media credits and source references remain attached to the documented photographs.
