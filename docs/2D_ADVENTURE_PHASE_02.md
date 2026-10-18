# SMART PAMANA — Phase 02: Illustrated Splash, Welcome & Onboarding

## Scope
Only **Phase 02** of `SMART PAMANA: 2D Interactive Heritage Adventure` is implemented here. Phase 00–01 shared design components remain intact; Phase 03+ is not started.

### Added
- `BootSplash`: branded, SVG-illustrated **web startup/storage splash** with the existing Ka-Pamana mascot and a progress indication; no artificial minimum time. If storage initialization fails, a clear retry is offered instead of pretending the app is ready.
- `WelcomePage` (`/welcome`): "Discover Our Heritage" hero, scalable offline mountain artwork, Ka-Pamana, four brief cards explaining Discover / Learn / Play / Preserve, a functioning Get Started control and an optional **Explore now — skip setup** action.
- `AdventureIntro`: reusable, locally bundled accessible icons and honest copy describing already-working modules.
- Revised `OnboardingPage`: six steps covering the adventure, optional nickname/avatar, optional hometown, preferred learning experience, festival color palette, and review. The existing data schema and options are preserved.
- Clear Back, Continue, Start Exploring, and Skip Setup interactions. Skip marks onboarding complete **without overwriting** a previously saved profile.
- New `onboarding-flow` data and completion service that retains the original `pamana.onboardingComplete` key. Completion is committed to storage only after successful profile saving.
- First-time `/home` redirect now goes through Welcome; users with an existing completion flag go straight to Home. Root route chooses Welcome/Home after storage initialization. Returning users don't need to repeat onboarding.
- Light, responsive `pamana-welcome.css` for 320px through phone/tablet layouts, minimum 44px button targets, disabled/error states, focus styles, reduced motion.

### Cultural / visual safeguards
Illustrations are *original, abstract landscape art*, not geographic or documentary claims. Existing Ka-Pamana asset is reused; no unverified Indigenous motifs, borrowed AI posters, online image dependencies, new services, or school/DepEd integration are added.

### Existing features preserved
The same Ionic routes, Matuto/Lakbay/Quest/Sulat/Kuwento/Koleksyon/Journey content, 15 locality chapters, profile choices, reading preferences, and SQLite/browser persistence remain in place. This release does not modify achievement rules or stored user data schemas.

### Verification checklist
- `npm test` and `npm run build` pass in GitHub CI.
- New user sees `/welcome`, then may configure or skip; saved completion persists across app restarts.
- Existing returning user reaches `/home` without opening the welcome/onboarding flow.
- The avatar/hometown/learning/festival choices still save using existing APIs.
- Storage write failure shows an error and does **not** falsely claim successful onboarding.
- No dead actions, network-only fonts, accidental background redirects, forced delays, or blurry municipality sprites.
- Android debug APK builds through the existing main-branch GitHub workflow.

### Limitations
- This is a branded **web-app storage splash** that appears after the operating system's own Android launch screen. Android OS-level splash artwork has not been replaced in this phase.
- Device-specific rendering, TalkBack/VoiceOver, font enlargement, airplane-mode testing, and genuine mobile screenshots require physical QA.
- Full changes to learning style/hometown personalization experience beyond existing preferences belong to Phase 03.
- No other journey/game/map module redesign is introduced here.

Next authorized phase: **Phase 03 — Learning Style and Hometown Personalization**, only after a separate explicit request.
