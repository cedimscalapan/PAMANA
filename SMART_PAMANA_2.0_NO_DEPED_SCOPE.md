# SMART PAMANA 2.0 — Offline Personalization

This work enhances the existing Ionic React app without adding DepEd, curriculum mapping, school portals, student databases, teacher dashboards, or related institutional features.

## Implemented in this branch

- Local nickname, avatar, hometown and favorite-festival preferences; no account or personal contact details required.
- Festival-inspired themes for all 14 municipalities and Calapan City, plus additional Calapan themes.
- Hometown remains independent of chosen theme, with a hometown-first discovery panel.
- New six-step onboarding and editable Aking Pamana profile at /profile.
- Four selectable reading experiences showing different portions of existing source-backed content. This is **not** newly authored age-level text.
- Preference storage for light/dark/system appearance, font scaling, reduced motion, and future interface language. Filipino translations are **not** complete; dark styling needs further device verification.
- Lakbay quick municipality filters.
- Confirmation before destructive reset and improved SQLite open failure handling.
- Test coverage for profile validation, hometown palettes, theme selection, reading plans and earned badge criteria.
- Collectible heritage stamps based on saved Matuto and Quest completions, shown in Koleksyon.
- Guided, optional family interview questions in Kuwento (stored as existing private text memories).

## Roadmap — not yet implemented

- Full authored beginner/intermediate/advanced lesson rewrites based on reviewed references and offline narration.
- Hanunó'o stroke order (requires validated sources) and authorized speaker recordings.
- Additional specialized Quest badges, richer festival games, and stamp illustrations.
- Consent-based private audio memories and expanded family interview templates.
- Complete backup/restore with native media, integrity validation and recovery.
- End-to-end Android device verification.

Do not assume this work represents a fully tested APK. The CI workflow validates the test suite and web build on pull requests; the existing Android workflow builds APKs when changes reach main. Community review is required for sensitive cultural depictions and recordings.
