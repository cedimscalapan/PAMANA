# Illustrated SMART PAMANA hometown themes

There are **15 offline SVG hometown illustrations** in `src/assets/theme-scenes`, plus a neutral SMART PAMANA fallback. They are original stylized scenery, **not** documentary images, official municipal artwork, or Indigenous ceremonial art. The corresponding `src/data/festival-artwork.ts` registry maps all fifteen locality names to Vite-imported static assets.

## Where images appear

1. **Aking Pamana profile:** each theme card shows its hometown illustration.
2. **Onboarding:** theme selection previews the same illustrations.
3. **Home:** the selected theme appears as an illustrated hometown banner.
4. **Lakbay:** horizontally scrollable cards show the 15 town illustrations, with a button to filter festival records from the existing sourced festival directory.

The hometown and selected theme remain independent. Alternate Calapan festival themes reuse the Calapan City artwork but retain their separate color palettes.

### Cultural integrity

- The art is an **original decorative interpretation** rather than a verified depiction of a particular structure or Indigenous tradition.
- Documentary festival images and factual information continue to use the existing credited `official-heritage.ts` and photo provenance records.
- Community-specific sacred imagery and unreviewed Hanunó’o writing are not included in the decorations.

### Technical notes

All SVG assets are statically bundled by Vite and work offline. No network calls, extra dependencies, new permissions, or database migrations are introduced. Text in the cards is rendered as HTML rather than baked into the SVG, so labels remain accessible and translatable.
