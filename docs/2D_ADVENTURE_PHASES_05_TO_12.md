# SMART PAMANA — Integrated Phases 05–12 Delivery Report

## Scope / approach
Continued from main `71542767ca93d8cfc142e4816c53dd95e3745d75` at user's direction to carry the remaining roadmap through the final phase. **Incremental code integrations reuse existing routes and the offline-first Ionic React + Capacitor storage backend; features are not rebuilt or replaced with static screenshots.**

### Phase 05 — Mindoro 2D Adventure Map
- Added `AdventureMap.tsx`: original interactive vector landscape, geoBoundaries-derived Mindoro coastline (`mindoroPaths`, CC BY 3.0 IGO), selectable 15-chapter decorated trail, and independently usable list mode with filtering and completed/in-progress states.
- **Accuracy boundary:** the SVG coastline has a documented source; the trail cards are *not geographic markers* and do not claim to show municipal boundaries or town center positions. For publisher-supplied destination reference coordinates use Lakbay's existing map. Mapping precise municipality centroids requires a reviewed data source before a genuine pin map can replace the concept trail.
- All chapter cards use actual persisted heritage progress, no API calls or geolocation permissions.

### Phase 06 — Hometown Chapters
- Augmented existing 15 journey chapters with the verified festival directory's documented description and source notes; credited festival photograph shown **only** where the existing photo record has creator and a license.
- Preserved three-step **festival reference → reviewed Matuto lesson → linked Quest** with genuine saved completion and no hard chapter locks.
- Detailed protected/Indigenous-community historical claims are never inferred from generic visual motifs. Review original festival sources and ask affected communities for permissions when adding future material.

### Phase 07 — Interactive Learning
- Added `LessonDiscovery`: lightweight one-tap, self-paced reveal cards generated only from each canonical lesson's existing reviewed `points`, with exact existing facts and an unscored completion indicator.
- Preserved the full 16 lesson articles, sections, glossary game, quizzes, citations, reflection and optional three pilot photo/knowledge discovery packs.
- New lesson interface feedback cue is opt-in and only local.

### Phase 08 — Games
- Retained seven existing review-linked Quest modes (Map, Photo Detective, Timeline, Sorting, Word, Memory, Quiz), preserving the real engine, storage, scores, retry rules and chapter-specific linked sessions.
- Added a supplementary `FestivalConnections` activity across 15 towns, drawing exclusively from the official festival directory. Players match festivals and locality names using touch-friendly buttons, hints, source notes and explanations. No separate XP or passport unlock.
- Completion of this mini-activity intentionally does **not** change the existing Quest totals or hometown stamps.

### Phase 09 — Heritage Passport
- Rebuilt `HeritageStamps` presentation to show all 15 chapter slots, live earned/pending stamps and per-chapter direct navigation.
- Derived only from existing `chapterStatus`, Matuto completions and Quest records; no duplicated or invented achievement values.
- Kept the six existing general learning milestones, with clear distinction from the 15 hometown stamps.

### Phase 10 — Ka-Pamana Companion
- Reusable `KaPamanaGuide` offers curated, state-dependent guidance (welcome, discover, learn, play, hint, celebrate), reusing the authorized current Ka-Pamana mascot.
- Available in Journey, Matuto, Quest, and Passport. Static by default; avoids inventing cultural facts or simulating an AI/Indigenous community representative.

### Phase 11 — Integration, Audio, Accessibility
- App-specific, scoped 2D Soft Light CSS for map, locality contexts, activity reveals, Passport, game, and mascot UI, responsive down to 320px.
- Reused existing Ionicons, local images, existing typography and focus/reduced-motion infrastructure.
- Added Settings switch for optional local **Web Audio-generated** feedback; muted by default, no external file, network, ad or permissions. If unsupported by the device, the app remains silent and functional.
- All existing routes, SQLite/localStorage keys, Sulat Hanunó’o practice, private Kuwento and galleries remain available.

### Phase 12 — Testing & Portable Learning Snapshot
- Added automated tests for all festival/location pairs, accessible map rendering, restore data validation; keep existing tests for 15 journeys, Quest result authority, onboarding, learning activities and personal preferences.
- Added a local JSON **learning-only snapshot** export and import/restore in Settings, with explicit confirmation. Includes only selected existing `pamana.` preference/lesson/journey/Quest keys. **Does NOT include private media, SQLite native writing-record tables, private family memories, photographs, handwriting images, or complete device backups.** Keep a separate device backup for these.
- Restore validates file type, size and known keys before writing, but is not an atomic database transaction. A device failure during restore may leave some imported values applied; keep the original backup and re-check afterward.
- CI must pass Vitest, `tsc`, Vite build and Capacitor Android debug APK artifact before reporting a successful release.

## Explicit non-completion / real-world QA
No completed **physical-device** airplane-mode, TalkBack, scaled-font, landscape, battery/memory, or private-backup-restore test is asserted. No cultural-community review, license permissions not already documented, geospatial municipal pin accuracy, audio autoplay on every Android model, or publication-ready signed APK is claimed. Those require actual hardware, editorial approval, real coordinates and/or signing keys.

## Verification and test protocol
1. Install latest GitHub Actions debug APK on an actual low-memory Android device.
2. Airplane mode: open app and all six legacy modules; navigate 15 chapters, verify maps/chapter selectors without network; check fully local images.
3. Change hometown and learning style, confirm Matuto, Sulat and private story records remain.
4. Open festival reference, complete linked Matuto lesson and corresponding saved Quest; return and verify exactly one locality stamp. An unrelated Quest must not count.
5. Play festival pair game on touch and TalkBack; verify 15 source-backed pairs, errors, hints and final message.
6. Use a screen reader, 320px width, 200% text zoom, portrait/landscape, keyboard focus and reduced-motion setting.
7. Toggle Sound in Settings; preview and verify muted by default, no crash on unsupported Web Audio.
8. Export a **learning snapshot** into Files, inspect its clearly limited scope, restore **on a test device/profile** after confirming user consent; compare progress. Private media and writings must not be assumed part of the export.
9. Monitor memory and thermals; confirm Android debug APK installs after updating previous version.

## No new school modules
No DepEd/curriculum integration, multiplayer servers, 3D engines, cloud AI, real-time map services, ads, invasive analytics, or mandatory sign-in were introduced.

## Future enhancements that still need separately sourced work
- Verified municipal polygon shapes and reviewed town center coordinates for accurate pin map.
- Editorially and community-reviewed fully town-specific interactive mini-games for all 15 chapters (three pilot photo lessons exist; the festival pairing provides 15 locality choices).
- Rights-cleared human narration and culturally consented audio; localized Filipino copy beyond existing preference.
- Native media/photo/writing backups and transactional restore, Android accessibility audit, signed release APK and physical-device verification.
