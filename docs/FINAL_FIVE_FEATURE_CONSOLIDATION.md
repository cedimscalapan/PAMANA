# SMART PAMANA — Five-feature navigation and usability consolidation

## Scope and design principles
This refactor aligns the already functional offline-first Ionic React application with the approved feature names:

**Simula · Lakbay · Matuto · Sulat · Aking Pamana** (short bottom label **Pamana**).

The objective is usable simplicity without cutting distinctive functions. Reuse original data records, cultural sources, lesson completion, real Quest sessions, chapter stamps, Hanunó’o text and drawing functions, and private collection/storage services. This iteration does not promise pixel-perfect game art and does not turn the conceptual level path into geographic route data.

## Audit decisions (KEEP / CONSOLIDATE / REMOVE DUPLICATE VIEW)
| Existing destination | Decision | Implementation |
|---|---|---|
| Home | Simplify | Replaced repeated mission cards, hometown banner, module grid and duplicate Quick Quest panels with one Continue CTA, three genuine totals, one lesson and four activity shortcuts |
| Heritage Journey | Keep and group | The 15-level map stays functional; Lakbay top-level navigation includes Hometowns, Places & Festivals and Mga Laro |
| Explore | Preserve content, remove repeated chooser | The 15-town art-gallery selector was redundant with the Journey selector and municipality filter; removed this gallery, retained place/festival/map/filter features and deep links |
| Quest | Keep under Lakbay | All existing Quest modes and linked session behavior remain intact. Festival Connections is now an explicitly optional expansion rather than competing with core game choices |
| Matuto | Keep and consolidate learning interactions | Knowledge check remains primary; glossary matching, interactive lesson packs and reveal activities now appear in an optional Practice More expansion; no re-score or new completion rules |
| Sulat Pamana | Keep unique full functionality | Three main tabs: Learn, Write & Practice and My Writings, with small secondary choices retaining Characters, Words, Convert, Practice and Writings content |
| Passport, Stories, Koleksyon | Consolidate | New /my-pamana landing has Passport, Kuwento and personal photo Koleksyon with immediate links to fully functional original editors/galleries; remove duplicated full Passport from the old /collection root |
| More | Remove duplicate menu | Old /more renders the new Aking Pamana page rather than preserving a redundant eight-link directory |
| Profile and Settings | Keep focused | Profile manages identity/theme/hometown/accessibility; Settings manages offline/sound/backup/reset/sources; redundant settings profile advertisement removed |
| Ka-Pamana | Reduce duplication | Journey retains contextual compact guide instead of showing an extra hero mascot at the same time |

## Deep links kept compatible
Original routes /home, /journey?town=..., /learn?lesson=..., /writing, /explore?festival=..., /explore?place=..., /quest?journey=...&mode=..., /stories?memory=..., /collection?folder=...&photo=..., /profile, /settings, /more, /onboarding, /welcome remain routable. New /my-pamana route is additive. Existing query data remains handled by its original source-backed page.

## Data contracts preserved
- Original Journey v1 records remain unchanged; a completed stamp still requires opening the linked festival entry, completing the real associated lesson and finishing the correctly linked Quest session.
- Quest progress and game results retain original persistence and progress service; free-play festival matching never automatically awards town stamps.
- All sixteen sourced Matuto lessons, sources, and completion keys remain unchanged.
- Sulat's verified Unicode and transliteration, canvas, original writing records and storage keys are unchanged.
- Private media library and story relationships remain in their original services; the new landing only reads them and links to the actual editor.
- No schema migrations, database resets, or new network dependencies.
- Native photo/video, writing image and learning-only JSON backup functionality remain separate; learning snapshot does not claim private-media coverage.

## Functional user flows to verify
1. First visit: onboarding → Simula → Lakbay → hometown chapter → Discover → Matuto → linked Quest → Passport stamp. Verify no visit from Simula skips Journey’s real recording.
2. Returning visit: progress totals equal actual stored records; a selected chapter and last unfinished lesson reopen correctly.
3. Lakbay top links open existing Places & Festivals and Quest with retained filters/progress; sources have their actual credit and not invented current travel times.
4. Matuto standard knowledge check appears without requiring optional extra activities; mark completion persists and is reflected in the right hometown chapter.
5. Sulat three main choices expose all five old activities; word conversion and tracing still retain sound-based transliteration vs translation distinction; saved writing still reopens/exports.
6. Aking Pamana passport displays earned states; Kuwento's new/view/edit/delete and Kolkesyon folders/photos work via linked original routes.
7. Profile/theme/accessibility preferences and Settings/sounds/reset/backup persist; legacy /more opens Aking Pamana instead of the original duplicate grid.
8. App remains available in airplane mode on an installed Android device and retains all progress after restart.
9. Screen-reader focus, 320px/360px/430px widths, keyboard, 200% text, bottom tabs, original deep links, and reduced-motion are manually checked.

## Validation boundaries
Automated unit tests, TypeScript and Vite production build prove code and regression behavior; Android Gradle build proves packaging, **not physical-device functional success**. Need hands-on device testing, accessibility review, private-media backup strategy, and community/educator cultural sign-off before signed public release. Game-style chapter map is a decorative selector, not route geography.

## Possible follow-up
After usability testing, progressively move the remaining legacy editors from separate URLs into embedded Aking Pamana tabs **only if this reduces navigation friction without increasing risk to the existing media or SQLite layer**.
