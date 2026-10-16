# SMART PAMANA content and media record

The app bundles source metadata and a small amount of local media so the core learning flows work without a network connection.

## Owner-provided assets

- `src/assets/reference/ka-pamana-icon.png` — supplied by the project owner and used for the Android launcher icon, onboarding guide, avatar, and dashboard mascot.
- `src/assets/reference/ka-pamana-character-board.png` — supplied visual character board.
- `src/assets/reference/smart-pamana-showcase.png` — supplied UI/UX reference board.

## Open-license media

- `src/assets/media/tamaraw-gregg-yan.jpg` — “Bubalus mindorensis by Gregg Yan 02”, Gregg Yan, CC BY-SA 3.0, Wikimedia Commons. Source: https://commons.wikimedia.org/wiki/File:Bubalus_mindorensis_by_Gregg_Yan_02.jpg

## Open-license script font

Additional offline photographs introduced in the four-module redesign:

- `src/assets/media/puerto-galera.jpg` — “PH - Puerto Galera - White Beach - from sea 2”, Eugene Alvin Villar (seav), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). [Original file and attribution](https://commons.wikimedia.org/wiki/File:PH_-_Puerto_Galera_-_White_Beach_-_from_sea_2.jpg).
- `src/assets/media/naujan.jpg` — “Naujan Lake”, Hariboneagle927, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). [Original file and attribution](https://commons.wikimedia.org/wiki/File:Naujan_Lake.jpg).
- `src/assets/media/halcon.jpg` — “Mount Halcon”, Mil Del, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). [Original file and attribution](https://commons.wikimedia.org/wiki/File:Mount_Halcon.jpg).

The photographs were downloaded at display resolutions and may be cropped in cards. Koleksyon displays their full proportions, source links, photographer credits, and license links. Rights metadata was checked through the Wikimedia Commons file records on 17 October 2026. Personal media is kept separately and is never inserted automatically into curated lessons or destination records.

The offline Mindoro coastline is derived from [geoBoundaries gbOpen PHL ADM1, revision 41af8f1](https://github.com/wmgeolab/geoBoundaries/tree/41af8f1/releaseData/gbOpen/PHL/ADM1), licensed [CC BY 3.0 IGO](https://creativecommons.org/licenses/by/3.0/igo/). `scripts/prepare-map.mjs` selects and simplifies the Mindoro coastline from the retained regional source geometry. The map does not invent a provincial boundary. Markers use reference coordinates published on the provincial destination pages; community settlement coordinates are withheld.

## Script font

- `src/assets/fonts/NotoSansHanunoo-Regular.ttf` — Noto Sans Hanunoo, Noto Fonts, SIL Open Font License 1.1. Source: https://github.com/notofonts/noto-fonts

## Text sources

The source URLs and intended use are bundled in `src/data/content.ts` and displayed in Settings. Community-sensitive content remains explicitly marked for educator/community review before publication.

The complete local Hanunó’o character inventory is defined in `src/data/hanunoo.ts`. It contains every assigned character from U+1720 through U+1736: 3 independent vowels, 15 consonants, 2 combining vowel signs, U+1734 pamudpod, and U+1735/U+1736 Philippine punctuation.

The Filipino sound-transliteration rules in `src/data/hanunoo-transliteration.ts` use the modern printed orthography described by Richard Ishida and the Unicode Hanunoo chart:

- Richard Ishida, “Hanunó’o Orthography Notes”: https://r12a.github.io/scripts/hano/hnn
- Unicode Hanunoo chart: https://unicode.org/charts/PDF/U1720.pdf

The common-word list contains Filipino vocabulary and Filipino explanations only. Its Hanunó’o glyph strings are clearly labeled sound transliterations, not translations into the Hanunó’o language. No unreviewed Hanunó’o-language definitions are bundled.

## Pronunciation recordings

No community-verified Hanunó’o speaker recordings were present in the supplied repository, so no artificial or Filipino text-to-speech audio is bundled as a replacement. `src/services/pronunciation.ts` accepts local recordings only when their source and reviewer metadata are documented. Authentic recordings must be added and reviewed with knowledgeable Hanunó’o speakers before the audio catalog can be considered complete.

## Official data review and import

The curated Lakbay and heritage records in `src/data/official-heritage.ts` were prepared from the official [Mangyan Heritage Center](https://mangyanheritage.odoo.com/) and [Travel Oriental Mindoro](https://www.travelorientalmindoro.ph/) portals. The app imports only source-linked public place names, festival calendar entries, and conservative descriptions. User reviews, uploaded photos, accounts, check-ins, dynamic travel operations, unpublished documents, ambahan text/audio, and community-sensitive materials are not copied.

The Mangyan Heritage Center's [project policy](https://mangyanheritage.odoo.com/projects) requires community approval and Free, Prior, and Informed Consent for research and collaboration. Those records remain in a review/permission queue until the appropriate agreement exists. The tourism portal's [terms](https://www.travelorientalmindoro.ph/page/terms-and-conditions) and [privacy policy](https://www.travelorientalmindoro.ph/privacy) are treated as boundaries for user-generated content and personal data.
