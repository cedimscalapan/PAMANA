# SMART PAMANA — Soft Light display refresh

The interface now uses one gentle **Soft Light** appearance rather than inheriting the phone's dark mode.

### Why this change
Some Android devices previously displayed dark backgrounds because the profile followed the device preference or retained a saved dark mode. Several legacy screens also mixed dark green/brown surfaces and serif fonts with modern layouts.

### What is implemented
- **Default and existing profiles:** `sanitizeProfile` normalizes old `dark`/`system` values to `light`; nickname, hometown, themes, progress and personal media are preserved. No reset or storage migration is required.
- **One consistent bright surface system:** neutral off-white backgrounds, white cards, slate text, calm teal navigation and pastel mint, peach, lilac and sky accents. The Festival theme influences decorative motif colors without darkening reading pages.
- **Readable, familiar fonts:** system sans-serif stacks throughout, modest headings and consistent spacing. Hanunó'o script's dedicated Noto font is preserved.
- **Gentler photographic headings:** credited cultural imagery remains, but hero overlays are light so text stays readable.
- **Controls:** visible focus outlines, large touch areas, calmer game feedback and consistent active states.
- **Saved accessibility settings:** font sizes and reduced-motion preferences still work; the appearance dropdown is replaced with a clear Soft Light display explanation.

### Verification
- GitHub Actions: tests, TypeScript and web production build on PR; Android debug APK on main after merge.
- Real Android device/screen reader testing remains necessary; a passing build is not a guarantee of visual perfection on every device.

No DepEd or school integration is added.
