# SMART PAMANA

Phase 1 foundation for an offline-first Ionic Angular application for learning about Oriental Mindoro's culture and heritage.

## Current implementation

- Angular standalone app shell with Ionic components and route-based navigation.
- SMART PAMANA design tokens based on the supplied visual references.
- Four-step onboarding with locally persisted completion state.
- Functional home dashboard with continue-learning, module shortcuts, daily fact rotation, progress model, and bottom navigation shell.
- Strict TypeScript configuration and no runtime network dependency in the implemented slice.

## Local development

```text
npm install
npm run build
npm start
```

The Android/Capacitor project and SQLite native adapter are next in the foundation sequence. The repository remote could not be contacted from the current environment, so no push or APK build is claimed.

## GitHub Actions

The `Build SMART PAMANA` workflow runs `npm ci` and `npm run build` on pushes and pull requests targeting `main`. The generated web bundle is uploaded as the `smart-pamana-web-build` artifact.

An Android APK workflow will be added after the Capacitor Android platform and Gradle project are committed to the repository.

## Cultural review note

The supplied mascot board is used as a visual reference only. Cultural clothing, script glyphs, translations, stories, and place facts must be backed by cited sources and, where applicable, community or educator review before release.
