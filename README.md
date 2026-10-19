# SMART PAMANA

Offline-first Ionic React application for learning about Oriental Mindoro's culture and heritage.

## Final user-facing feature structure (five tabs)

SMART PAMANA is an **offline-first cultural heritage learning and exploration application**. Its five primary destinations are:

| Tab | Purpose |
| --- | --- |
| **Simula** | Greeting, one Continue Adventure action, accurate saved progress, resume lesson and activity shortcuts |
| **Lakbay** | 15 freely accessible hometown journeys, documentary places/festivals, interactive cultural Quests and real stamp progress |
| **Matuto** | 16 source-backed lessons with one main knowledge check and optional practice activities |
| **Sulat** | Learn Hanunó’o characters and common words, convert/trace/write, reopen saved writings |
| **Pamana** (Aking Pamana) | Hometown stamps, private Kuwento stories, personal photo Koleksyon, profile and settings |

Ka-Pamana guidance, accessibility preferences, offline records and learning-only JSON backups are supporting capabilities, not extra bottom-navigation destinations. Previous routes (`/explore`, `/quest`, `/stories`, `/collection`, `/profile`, `/settings`, `/more`) remain available to keep existing deep links working.

The illustrated chapter path is decorative, **not a geographic map**; no specific 2D production-art promise is required for the user-facing feature description. The published place-map references and credited cultural media are maintained separately. The learning backup **does not include private photos, stories, or handwriting images**. See `docs/FINAL_FIVE_FEATURE_CONSOLIDATION.md` for UI, data-preservation and QA details.

## Current implementation

- Ionic React app shell with Capacitor Android packaging and route-based navigation.
- SMART PAMANA design tokens based on the supplied visual references, including the Ka-Pamana mascot in onboarding and the dashboard.
- Four-step onboarding with locally persisted completion state.
- Functional home dashboard with module shortcuts, daily fact rotation, lesson detail flow, and bottom navigation.
- Offline lesson catalog with category filters, source attribution, lesson detail flow, quiz feedback, lesson completion persistence, quest scoring, writing practice, place details, stories, collection state, and reset controls.
- Native SQLite state database on Android with a localStorage fallback only for the browser preview. Sulat Pamana writing records keep metadata and original stroke vectors in SQLite and store full/thumbnail PNG files in the app's private persistent storage.
- Complete Sulat Pamana workspace with the Unicode character inventory, source-aware Filipino sound transliteration, a searchable 20-word offline vocabulary library, guided/freehand canvas practice, Undo/Clear/Retry/Next controls, and a persistent My Writings gallery with rename, reopen, export, and delete actions.
- Curated official heritage and tourism records from the Mangyan Heritage Center and Travel Oriental Mindoro, including source-linked cultural places, an 18-date festival calendar, and review/permission states for protected cultural material. See [DATA_IMPORT_REPORT.md](DATA_IMPORT_REPORT.md) and [DATA_RIGHTS_REGISTER.md](DATA_RIGHTS_REGISTER.md).
- Verified-audio-only pronunciation architecture with overlap prevention and Play/Replay/Mute controls. No artificial voice is substituted when community-reviewed recordings are unavailable.
- Locally bundled, attributed tamaraw media for the Explore and Collection modules.

## Local development

### Facts, shared imagery, and interactive Quest

- The home card draws from 101 distinct readings with source links, locality, verification date, and reference years for dated claims. A local-calendar-day selector persists the current fact and reading history, cycles the full pool before reuse, and avoids recent semantic topics and categories when possible. “Discover another fact” advances the saved selection without requiring the internet.
- The shared library now has 50 images: 8 licensed photographs, 18 covers from the exact official festival directory requested by the user, and 24 labeled original diagrams/location guides. Every lesson and destination has a subject-specific image or guide. Complete attribution, source URLs, dates, modifications, and unresolved assets are documented in [MEDIA_REGISTER.md](MEDIA_REGISTER.md). The portal’s Salong Dagitab cover visibly names another lantern festival and is labeled as unverified; it is excluded from fact illustrations and image games.
- Quest offers Map Explorer, Photo Detective, Timeline Challenge, Sort & Discover, Word Builder, and Memory Pairs. The original question bank remains available as an untimed Knowledge Check. Both levels support keyboard/touch controls, hints, constructive explanations, retries, guided answers, and links back to learning records. Timeline comparisons use years and accept ties.
- Every game action is saved through one `pamana.quest.games.v2` state record before the UI acknowledges it. Unfinished games resume with the same shuffled items, cards, and letters. Completed results stay separate by game/level; old quiz keys and all lesson/journal/library state are preserved. Unassisted checks earn 10 points, hints/retries/memory mismatches cap the activity at 5, and guided answers earn 2. The local result history retains the latest 100 games.
- Native builds bundle every curated image and reading locally. An ordinary browser development preview requires its local server; no claim is made that a hosted browser site has a service-worker offline cache. The changes do not alter native camera/GPS behavior.
- Focused automated checks cover pool exhaustion/day changes, storage failure recovery, tied timelines, duplicate letters, public map coordinates, scoring, resume data, source IDs, and complete image coverage. Rebuild original artwork with `node scripts/generate-learning-art.cjs` when the source records change.

### Redesigned heritage modules

- Matuto includes sixteen structured lesson articles, key terms, reflections, knowledge checks, and reading times calculated from the material. Reading completion is independent of quiz answers.
- Lakbay separates destinations, a geographic offline map, and the annual festival calendar. Destination backgrounds, addresses, and published reference points link to their official sources; operational travel information still requires current verification.
- Koleksyon is a folder-based shared photo library with credited offline heritage images, personal folders, cover selection, search, zoom, and reference-aware photo management. The same curated media is reused in lessons and destinations.
- Kuwento is a private photo/video journal with capture and import, descriptions, optional location, editable event date/time, multiple entries, and reopening/editing. Android stores original media in private persistent files and metadata through the existing SQLite state layer. Browser previews use IndexedDB for media bytes. Original single-story records are preserved during migration.

The Android workflow runs `node scripts/configure-android.mjs` after generating the platform to declare camera, microphone, and optional location capabilities. Run the same helper after `cap add android` when preparing Android locally. Physical-device camera/video capture and GPS permissions require device validation; browser preview checks do not establish Android hardware behavior.

```text
npm install
npm run test
npm run build
npm start
```

The Android project is generated by the committed Capacitor workflow. Android opens the `smart_pamana` SQLite database through `@capacitor-community/sqlite`, writes practice images with `@capacitor/filesystem`, and exports PNGs through the native share sheet with `@capacitor/share`; the web preview falls back to localStorage while preserving the same flows.

## GitHub Actions

The web workflow runs the automated transliteration/storage tests and builds the Ionic React bundle. The Android workflow runs the same checks, creates and syncs the Capacitor Android project, then builds and uploads the installable `smart-pamana-debug-apk` artifact.

## Android APK

Open GitHub Actions → `Build SMART PAMANA Android APK` → choose a successful run → download `smart-pamana-debug-apk`. Extract `smart-pamana.apk`, copy it to an Android device, enable installation from unknown sources for the file manager, and open the APK to install it.

## Cultural review note

The supplied mascot board is used throughout the interface and generated launcher branding. Cultural clothing, script glyphs, translations, pronunciations, stories, and place facts must be backed by cited sources and, where applicable, community or educator review before release. The current repository intentionally contains no synthetic Hanunó’o pronunciation replacements. See [CONTENT_ATTRIBUTIONS.md](CONTENT_ATTRIBUTIONS.md) for the bundled media record.
