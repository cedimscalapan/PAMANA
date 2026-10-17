# SMART PAMANA — Interface refresh (no blurry hometown images)

## What changed

- Removed generated sprite and retired SVG hometown image files from the app.
- Replaced municipality and festival image backgrounds with **resolution-independent CSS scenery**, cheerful accent motifs and real readable labels.
- Kept all 15 hometowns and Calapan City's alternate festival color choices.
- Redesigned the Home screen with a distinct cultural identity banner, lesson progress, two quick starts and six module shortcuts.
- Rebuilt the bottom navigation with five touch-friendly tabs (Home, Matuto, Lakbay, Quest, More).
- Added the **More** hub so Sulat, Kuwento, Koleksyon, Profile and Settings remain easy to reach.
- Unified cards, headings, inputs, buttons, labels, spacing and focus states across existing modules through `src/theme/pamana-refresh.css`.
- Separated theme accents from reading surfaces to improve contrast and dark mode usability.
- Introduced visible onboarding progress, simplified municipality discovery and collapsed metadata sections in Settings.

## Preserved

Existing Matuto lessons, Sulat Hanunó'o data and records, Lakbay factual references, Quest game logic/results, Kuwento memories, Koleksyon personal files and local-first storage were not deleted or migrated. No login, API, or external fonts added.

The app's credited/approved documentary images in learning and cultural discovery have **not** been removed: the complaint concerned blurry generated personalization artwork, not provenance-rich photos.

## User experience

The same interfaces should accommodate people of different ages through clear language, large tap targets, separate optional reading modes, adjustable font size and reduced-motion preference. No user is assigned a learning level based on age.

## Validation and limitations

- Verify the repository's existing automated tests and web build via GitHub Actions.
- Verify Android packaging with the main-branch GitHub Action after merging.
- Physical-device layout/accessibility testing is still required. Automated builds do not prove every screen is usable on each phone.
- The legacy modules are restyled through shared CSS; a full individual per-screen design-and-usability study was not conducted.

No school or DepEd integration is part of this design update.
