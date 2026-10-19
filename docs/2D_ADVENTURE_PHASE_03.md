# SMART PAMANA — Phase 03: Interactive 2D Hometown & Learning Personalization

## Scope
Phase 03 ONLY of the previously approved phased development plan.
GitHub baseline: `f2d3bbc48073b1b8738c41ba5046a6ced5ad3a78`.
This phase reuses the existing Ka-Pamana, vector-only hometown scenery, 15 municipality/city records, four learning modes, avatar IDs, festival palette registry, and unchanged `pamana.profile.v1` storage schema.

## Built
- **Shared hometown selector:** searchable grid for all 14 municipalities and Calapan City; accessible selection, original crisp CSS scenery, festival accent labels, explicit “no hometown” choice, friendly empty-search message. Choosing a hometown is optional and does not restrict access to other chapters.
- **Shared learning-style selector:** four attractive and tap-friendly 2D cards: Little Explorer, Young Discoverer, Heritage Researcher, Lifelong Explorer. Labels explain their *actual existing reading plan* instead of promising an unsupported AI or dynamic adaptive system. Modes are preference-only, not based on demographics/age.
- **Shared avatar selector:** all five current avatar IDs without replacing saved values.
- **Shared festival palette selector:** simple default with recommended hometown palette, Classic, and any current independent selection; opt-in “Browse all themes” reveals every existing palette, including Calapan alternatives. Palette colors remain decorative, NOT endorsed official festival branding.
- **Profile screen:** complete 2D Soft Light overhaul with clear five-section hierarchy, mascot guidance, readable labels, save/discard, saved/unsaved feedback, nickname, hometown, learning preference, festival palette, favorite festival, text size, reduced motion and language preference.
- **Onboarding integration:** stages 2–5 reuse the same working components. Original six-step completion and existing skip/restore rules remain.
- **Responsive CSS:** 320px to tablets, 44px+ controls, visible focus indicators, accessible text scaling via existing `--pamana-text-scale`, passive decorative motion reduction.

## Data & cultural safeguards
No schema change, new permissions, new packages or external requests. `saveProfile` still uses existing `setStored`, `sanitizeProfile` and `applyPersonalization`; prior learning progress, Quest scores, saved stamps, writings, memories and photo history remain separate and untouched. The app still displays full original source-backed lessons and all fifteen chapters; reading preference only determines existing reviewed excerpt depth.

The app **does not currently include a sound-effects library**. Audio controls are deliberately not misrepresented as functional in this phase; optional local sound playback belongs in the later audio/interface polish phase. Filipino remains a preference, not a falsely promised full translation.

No unverified Indigenous imagery, audio, new local heritage claims or incorrect geographical map imagery was added. Current abstract festival graphics are not official festival branding.

## Test checklist
1. All 15 hometowns and 4 learning modes appear and can be selected; none is locked.
2. A nickname, hometown, theme, learning style, avatar and reading preference can be changed and saved together.
3. Changing a hometown does not erase independently selected theme, stamp or learning history.
4. Previously saved preferences load correctly and persist after app restart.
5. Changed preferences are not applied until explicit save on Profile (onboarding saves at completion).
6. Unsuccessful saves show an error; earlier stored values should not be reported as overwritten.
7. Existing onboarding Skip, Back, Continue, and completion behavior still work.
8. Search empty state, keyboard focus, small screens, large text and TalkBack require manual review.
9. CI passes `npm test`, TypeScript and production Vite; Android APK build succeeds after merge.

## Not attempted
Phase 04 Home dashboard redesign; Phase 05 interactive geographic map; Phase 06 town screens; Phase 07+ mini-games; Phase 11 sound. Physical device/TalkBack/airplane-mode validation still requires hands-on testing.
