# SMART PAMANA content and media record

The app bundles source metadata and a small amount of local media so the core learning flows work without a network connection.

## Owner-provided assets

- `src/assets/reference/ka-pamana-icon.png` — supplied by the project owner and used for the Android launcher icon, onboarding guide, avatar, and dashboard mascot.
- `src/assets/reference/ka-pamana-character-board.png` — supplied visual character board.
- `src/assets/reference/smart-pamana-showcase.png` — supplied UI/UX reference board.

## Open-license media

- `src/assets/media/tamaraw-gregg-yan.jpg` — “Bubalus mindorensis by Gregg Yan 02”, Gregg Yan, CC BY-SA 3.0, Wikimedia Commons. Source: https://commons.wikimedia.org/wiki/File:Bubalus_mindorensis_by_Gregg_Yan_02.jpg

## Open-license script font

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
