# SMART PAMANA — Image-free hometown personalization

The previously generated 15-panel illustration sprite was removed from the application after feedback that the images were blurry and hard to read. The old low-resolution SVG theme scenes are also retired.

## Current design

- Every hometown and festival theme uses a **resolution-independent, CSS-drawn decorative motif**, plus a crisp emoji symbol and locally defined color palette.
- The municipality name and festival name remain real accessible text, never embedded inside a picture.
- The visual tokens are in `src/data/festival-artwork.ts`, based on the existing curated `festival-themes.ts` registry.
- These appear in the profile theme picker, first-run onboarding, the home hometown banner and Lakbay.
- Hometown and theme remain independent settings. Calapan's additional festival variants remain available.
- All decorations work offline without introducing new image libraries or extra permissions.

**Important:** Festival-inspired palettes are original UI designs, not official logos, community-approved cultural motifs or photographs of heritage locations. Original licensed heritage photographs in Matuto and Lakbay are unaffected.

## Interface improvements

See `src/theme/pamana-refresh.css` and the new More page. The layout preserves every existing learning, writing, memory, map, quiz and collection feature while unifying typography, navigation, card components and responsive spacing.
