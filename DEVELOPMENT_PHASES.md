# SMART PAMANA phase tracker

This is the implementation map for the requested twelve-phase build. A phase is marked complete only when its code path exists in the repository and its relevant build checks pass.

1. **Project setup and architecture** — Ionic React + Vite + Capacitor app shell, strict TypeScript, route structure, and GitHub workflows.
2. **Offline data layer** — Native `smart_pamana` SQLite schema with migration from browser state, plus a browser localStorage fallback.
3. **Branding and visual system** — SMART PAMANA color tokens, responsive cards, Ka-Pamana mascot usage, generated Android icon and splash inputs.
4. **Onboarding and navigation** — Four-step onboarding, guarded first launch, module routing, back actions, and bottom navigation.
5. **Home dashboard** — Welcome hero, Ka-Pamana avatar, continue-learning action, module shortcuts, rotating daily fact, and settings access.
6. **Matuto learning module** — Offline lesson catalog, category filtering, lesson detail, source links, quiz feedback, and persisted completion.
7. **Sulat writing module** — Hanunó’o/Buhid practice selector, Unicode reference glyphs, participation persistence, and reset action.
8. **Lakbay exploration module** — Selectable offline map pins, coordinates, place details, source links, conservation media, and travel-safety messaging.
9. **Pamana Quest** — Multi-question offline quiz, scoring, completion screen, retry flow, and saved score.
10. **Kuwento and Koleksyon** — Private story composer, device-only persistence, collection cards, local collection state, and media attribution.
11. **Quality and Android packaging** — TypeScript check, production Vite build, Capacitor Android build, launcher branding generation, debug APK artifact.
12. **Release handoff** — GitHub Actions download path, install instructions, content attribution record, and cultural-review gates for future additions.

Open review items are deliberately visible in the app: community-sensitive interpretations, translations, and any new cultural media require educator/community approval before a public release.
