# SMART PAMANA — INTERACTIVE HERITAGE JOURNEY
## Complete Implementation Prompt and Project Roadmap (No DepEd Integration)

### YOUR ROLE
Act as a senior Ionic React/TypeScript developer, Capacitor Android engineer, offline-first storage engineer, educational interaction designer, accessibility specialist, cultural heritage content reviewer, and QA lead. Continue improving the **existing** `cedimscalapan/PAMANA` repository. Never rebuild from scratch or break existing routes and personal records.

### 1. VISION
Turn SMART PAMANA into a **friendly, interactive, completely offline cultural learning and preservation companion** for Oriental Mindoro. People of different ages can discover documented heritage at their own pace through a playful **Heritage Journey** and can always bypass gameplay to access the original Matuto, Sulat, Lakbay, Quest, Kuwento, and Koleksyon modules directly. Cultural truth, permission and educational value always take priority over entertainment.

**Mission:** Help more people know, appreciate, protect, and preserve Oriental Mindoro's diverse places, festivals, languages, histories, communities, and living traditions without requiring Wi-Fi, accounts or special hardware.

**Product promise:** "Explore a place. Learn its story. Try an activity. Keep the discovery."

### 2. SUCCESS GOALS (MEASURABLE)
G1. A first-time user can pick a hometown and enter a functioning journey in less than about 2 minutes without account creation.
G2. All **14 municipalities and Calapan City** are selectable. Never fake local history: use real, attributed existing `official-heritage.ts` festivals and `learning.ts` lessons.
G3. Every chapter has an operational and accurately labelled three-step loop: **open a documented local festival reference → mark an existing, related lesson complete in Matuto → complete a specific existing, linked Quest session**.
G4. On-device progress survives a cold Android restart; no activity awards completion on a tap alone when the linked lesson or Quest is unfinished.
G5. A user can switch hometown or preferred learning level without deleting achievements.
G6. A person can freely use all six legacy modules and their navigation, without mandatory game gates.
G7. Build and test successfully in CI (`npm test`, `npm run build`, Android debug APK); do not claim physical-device validation without testing.
G8. Soft Light default, generous readable typography, at least 44px touch targets, reduced-motion support, and readable layout on 320px+ screens.
G9. No inaccurate Indigenous script, invented speech, fabricated cultural facts or unsafe community access suggestions.
G10. App remains usable in airplane mode after installation, with no runtime cloud/API requirement.

### 3. CURRENT REPOSITORY / INTEGRATION POINTS
Use **Ionic React, TypeScript, Vite, Capacitor Android, SQLite with browser fallback, existing bundled media, Vitest and GitHub Actions**. Start by inspecting:
- `src/App.tsx`, `src/pages/HomePage.tsx`, `QuestPage.tsx`, `LearnPage.tsx`, `ExplorePage.tsx`, `CollectionPage.tsx`, `WritingPage.tsx`, `StoriesPage.tsx`, `OnboardingPage.tsx`, `ProfilePage.tsx`
- `src/data/official-heritage.ts`, `learning.ts`, `lesson-articles.ts`, `quest-games.ts`, `festival-themes.ts`
- `src/services/storage.ts`, `quest-games.ts`, `personalization.ts`
- `src/theme/pamana-soft-light.css`, `src/theme/pamana-refresh.css`
- Existing `src/components/HeritageStamps.tsx`, app routing and sources/provenance data.
Keep the current 16 structured lessons and seven source-backed game modes; don't rewrite history, migrations or existing records.

### 4. FIRST PLAYABLE RELEASE — CURRENT IMPLEMENTATION BASELINE
This initial incremental implementation adds:
- `src/data/heritage-journey.ts`: 15 locality chapter records, reviewed lesson and official festival pointers, recommended Quest modes and pure eligibility checks.
- `src/services/heritage-journey.ts`: versioned `pamana.journey.v1` progress, saved via the existing SQLite/browser storage interface, defensive reads and exact linked Quest session tracking.
- `src/pages/JourneyPage.tsx`: scrollable hometown card library; selected three-step mission trail; Ka-Pamana guidance; accessibility; offline completion progress.
- `src/theme/pamana-journey.css`: responsive Soft Light activity path design with small CSS decorations, no heavy game assets.
- `/journey` route and entry from the Home screen and More.
- Quest query integration: `/quest?journey=<town>&mode=<mode>` can launch an existing game associated with the selected hometown chapter. A specific completed Quest result, NOT generic points, satisfies the mission.
- Hometown stamp display in the existing Koleksyon Heritage Passport.
- Unit tests for fifteen localities, content links, progress prerequisites and false-unlock prevention.

**Important scope honesty:** This release reuses province-wide Quest modes. It does **not** yet provide 15 unique town-specific mini-games, voice acting, character walking or a complex animated map. A shared lesson, such as the officially sourced festivals overview, can support multiple town journeys without pretending to be a town-specific lesson.

### 5. FULL INTERACTIVE EXPERIENCE
Create a reusable 2D mobile learning experience, NOT a Unity/Godot/3D game.

#### Home
- Soft Light welcoming screen; personalized nickname and chosen hometown.
- A prominent "Continue Heritage Journey" card with current chapter, next real action and saved progress.
- A clear secondary path to browse all lessons and other modules without a game.
- Ka-Pamana communicates short, respectful guidance; no therapist-like or AI-generated cultural claims.
- Avoid noisy neon, heavy gradients, blur, clutter, unreadable typography, constant animation, advertising, or random achievement popups.

#### Journey / Lakbay chapters
- Show all fifteen localities and what is *verified* in the existing directory.
- Distinguish a **source-backed local festival reference**, **regional lesson** and **province-wide Quest** in their labels.
- No lockouts of uncompleted towns; no physical travel requirement.
- Each journey has 3–5 purposeful tasks only. Never represent a town as "fully mastered" after a game.
- Show "In progress", "Completed" and "Not started" based only on saved facts.
- Make an activity's "Back to journey" action work from the actual linked pages.
- Future advanced mode may add illustrated static map outlines and accessible list navigation, not GPS tracking.

#### Matuto (interactive without losing depth)
- Preserve canonical cited lesson texts and source links.
- Add optional, clearly authored and reviewed simplified reading variants only when editorial review is complete. Do not generate facts during runtime.
- Add tappable glossary definitions, photo observations, quick visual questions, short reflection prompts and a "Continue Journey" link for linked missions.
- Keep source-backed detail available for all age stages; difficulty is selectable and never automatically inferred from age or quiz results.
- Completion only when user performs the existing meaningful lesson completion action, not merely opens the page.

#### Quest reusable mini-games
- Preserve existing quiz, memory match, sorting, map selection, photo detective, timelines, and word-building mechanics.
- Build reusable `JourneyActivity` UI wrappers without duplicating answer checking or storing two competing scores.
- Add reviewed curated chapter-specific question packs **only after** relevant, validated local sources are available. Fallback to accurately labelled Mindoro-wide Quest games.
- No mandatory time limits, manipulative streaks or global leaderboards. Hints, retry, reveal-answer and keyboard/touch controls must work.
- Record the exact session ID and completion result, with no duplicates or progress from an unrelated Quest being counted.

#### Sulat
- Keep Unicode-correct Hanunó’o inventory and existing practice history.
- Enhance tracing only after authoritative stroke references are reviewed; geometric shape feedback should never claim to authenticate handwriting.
- Optional symbol matching and character puzzles must use documented orthography.
- Indigenous voice samples only with explicit speaker consent and attribution.

#### Kuwento & Koleksyon
- Family memories optional/private and offline. Never demand real names, school IDs, face photos or contact info.
- Ask permission before recording, sharing or publishing another person's story.
- Connect saved discoveries to a Heritage Passport; award locality stamps only when source-backed tasks are genuinely completed.
- Provide clear provenance for reviewed heritage photos, and distinguish private memories from documentary sources.

### 6. MASCOT AND PLAYFUL VISUAL DESIGN
- Preserve Ka-Pamana mascot identity.
- Use CSS microinteractions for button taps, completed-step checkmarks and gentle progress reveals, respecting reduced-motion.
- Keep loading skeletons minimal; never block content for an animation.
- Use locally bundled SVG icons, small vector patterns, and credited cultural imagery already available. Avoid low-resolution municipality generated-image sprites.
- Palette: existing Soft Light white/off-white surfaces, jade/mint primary accents and controlled pastel highlights; dark backgrounds must not return.
- 44px+ controls, readable captions, text resize, descriptive labels, large scroll/touch regions, portrait phone support and landscape/tablet adaptability.

### 7. OFFLINE DATA MODEL AND VALIDATION
Versioned local records:
```ts
type ChapterProgress = {
  festivalOpened?: boolean;      // A local reference was opened; not proof of mastery
  questSessionId?: string;        // Actual linked Quest session ID
  questCompletedId?: string;      // Saved result ID of successful completion
};
type JourneyProgress = {
  version: 1;
  chapters: Record<string, ChapterProgress>;
};
```
Lesson completion continues to rely on the existing Matuto keys. Quest results continue to rely on the existing `pamana.quest.games.v2` schema. Do not duplicate the lesson or Quest authority in `pamana.journey.v1`.

- Use `setStored` and native SQLite/browser mirror; handle failed writes visibly.
- Never erase previous results when resetting a new attempt.
- Re-read after returning from other modules, and verify result ID + expected Quest mode.
- Validate imported or corrupted data; unknown locality IDs should be ignored safely.
- Keep one local active profile and scoped progress as currently designed. Do not introduce unsupported multi-profile switching.
- Preserve existing resets, export and storage operations.

### 8. AGE-INCLUSIVE UX
**Little Explorer:** icons, short reviewed text, pictures, calm encouragement, optional parent assistance.
**Young Discoverer:** picture comparisons, sorting, accessible short quizzes, hint explanations.
**Heritage Researcher:** sourced references, timelines, critical-thinking questions and explicit provenance.
**Lifelong Explorer:** full articles, independent browsing and optional challenges.
All features remain available regardless of selected learning stage. Avoid patronizing copy, mandatory animation, performance-based labelling, imposed streaks, punishment or fear-of-missing-out mechanics.

### 9. PHASED DELIVERY
**Phase 1 — Working journey loop (first release):** 15 chapters, reliable verified three-step tracking, existing festival/lesson/Quest links, Ka-Pamana support, stamps and soft-light navigation. Test and compile.

**Phase 2 — More interactive Matuto:** one reusable picture-observation challenge and glossary; upgrade three editorially reviewed chapter pathways (Calapan City, Baco, Puerto Galera). Confirm that all game questions and picture labels reflect documented sources. No runtime text invention.

**Phase 3 — Playable chapter mini-games:** one reused picture match, one timeline sequencing challenge, one respectful word/puzzle interaction; source-checked datasets for each. Add offline optional sound and subtle animation with mute/reduced motion. Do not fake cultural details.

**Phase 4 — Full coverage and polish:** replace generic fallback prompts with town-specific reviewed activities only as sources become available; accessibility and landscape/tablet audits, saved-state recovery, asset/provenance optimization, Android offline smoke tests, versioned backup and restore where needed.

### 10. DEFINITION OF DONE / QA
Every increment must:
1. Preserve every existing route and working module; avoid regressions in Sulat, Matuto, Quest, Lakbay, Kuwento and Koleksyon.
2. Keep first-run onboarding, returning-user preferences, and all saved state functional.
3. Confirm tapping every new mission goes to a real, relevant destination; no dead buttons.
4. Test all 15 locality IDs, documented festival/lesson links, chapter ordering and hometown/theme independence.
5. Test lesson and game prerequisites and ensure no badge can be claimed from an unrelated score, from an unfinished game or from an opened-but-not-completed lesson.
6. Verify failed storage writes do not falsely update completion.
7. Run `npm test`, `npm run build` and the existing GitHub Actions Android build; report actual results.
8. Test offline operation on a real Android phone in airplane mode before declaring device validation complete.
9. Inspect at small and enlarged font settings; verify keyboard/focus, VoiceOver/TalkBack where available, disabled controls, and reduced-motion.
10. Review cultural facts, rights, Indigenous language, protected-community media and any new media with appropriate sources/consent. Prefer omission to invented knowledge.

### 11. OUT-OF-SCOPE / NON-NEGOTIABLE
Do **not** add DepEd/curriculum integrations, teacher-assigned activities, mandatory accounts, Firebase/Supabase, runtime LLMs, cloud APIs, multiplayer, 3D avatars, gambling-style incentives, ads, mandatory subscriptions, invasive analytics, location tracking or heavy download-on-demand assets.

### 12. DEVELOPMENT EXECUTION INSTRUCTIONS
Start from the current GitHub `main` and inspect existing code. Use small dedicated branches, meaningful commits and PR-based CI. Build one functioning vertical slice before adding decorative or advanced features. Make no cultural claims or completion claims without evidence. Prefer a smaller fully functional feature to a beautiful nonfunctional mockup. Show a concise change log, tests passed/failed, known limitations, updated APK workflow link, and the next accepted milestone after each phase.
