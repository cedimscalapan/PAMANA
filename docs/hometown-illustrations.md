# SMART PAMANA — Actual Generated Hometown Artwork

The app uses the **previously AI-generated 15-hometown concept illustrations** for the theme previews, personalized homepage banner, and Lakbay discovery cards.

## Source and format

- The artwork comes from the generated Oriental Mindoro 3 × 5 concept panel illustrated earlier.
- Scenic sections are cropped to remove embedded text and color samples, then bundled as one optimized `generated-hometown-sprite.avif`.
- `src/components/HometownScene.tsx` displays one crop per locality using the 5-column, 3-row sprite positions.
- The original lightweight SVG hometown scenes remain as **fallbacks** if AVIF decoding is not supported.
- Alternative Calapan festival color themes reuse the same Calapan artwork. All festival theme colors remain selectable independently of hometown.

## Where they appear

1. Profile theme selection and editing.
2. Onboarding festival-theme selection.
3. Hometown banner on Home.
4. The 15-town illustrated gallery in Lakbay.

## Source quality and trade-offs

The bundled sheet is optimized for offline storage and app bundle size, so the illustrated previews are smaller than the downloadable original high-resolution artwork. Use the separate generated image pack for full-size visual assets if higher fidelity is desired.

These are creative AI illustrations **not verified photographs, official municipal branding, or approved representations of Indigenous heritage**. The existing sourced heritage lessons and photo credits remain separate and authoritative.

## Testing

`src/data/festival-artwork.test.ts` checks that all fifteen localities have distinct sprite positions and that unknown hometowns preserve the fallback image.
