# SMART PAMANA Journey — Professional UX Audit and Level-Path Redesign

## Baseline
Current `main` before this revision: `204365e9edcdaa114ff1c46ec4142b637ddc38b4`. The app already had 15 verified hometown chapter records and an offline three-step completion engine. The previous Journey combined an unrelated coastline illustration with a separate 15-button trail, repeated all 15 towns in another grid, and then placed the actual task list far below both selectors. The player had to scroll substantially before seeing how to advance.

## Key user-experience defects identified
1. **Weak action hierarchy:** generic illustration + repeated cards delayed the first actionable Discover–Learn–Play mission.
2. **Duplicate selectors:** coastline panel, 15 chapter trail, and 15 hometown cards competed for attention.
3. **Insufficient game feedback:** small row numbers showed progress but lacked distinctive level nodes, connectors, and earned states.
4. **Interaction distance:** tapping a town updated the query and selected chapter but left the useful chapter actions well below the main map.
5. **Concept art defects:** the separately generated colorful Candy Crush-style image had duplicate level numbers and invented geographical relationships; using it as a static background would not produce accessible buttons, accurate content, or real progress.
6. **Geographic ambiguity:** an arbitrary path should never claim to represent actual town coordinates or a driving route.

## Implemented redesign
- `journey-levels.ts`: exact, unique levels 1–15 mapped to the existing `heritageChapters`, decorative non-geographic positions, and 14 connected cubic Bézier curves.
- `JourneyLevelMap.tsx`: responsive 2D adventure with dotted, winding path, three illustrated trail zones, colorful circular levels, gold earned indicators, selected state, saved-progress display, and one clear contextual **Start/Continue** button.
- On tapping any level, an immediate Ionic dialog offers the appropriate **Start/Continue** and **View chapter missions** actions. There are no locks, artificial XP or new game currencies.
- `Town list` alternative with search and true active-selection indicators; accessible 44px+ inputs, semantic labels and keyboard focus.
- Removed the duplicate old map selector and repeated 15-town cards from `JourneyPage`. The complete official festival source panel, linked Matuto lesson, real Quest session tracking, and Heritage Passport stay below the level path. A **View chapter details** shortcut scrolls directly to the real mission trail.
- `pamana-level-world.css`: crisp CSS/SVG visuals, attractive color rhythm, curved route drawing, reduced-motion, 320px+ layout and an action popup.
- Regression tests validate level count/uniqueness, readable positioning, 14 path connectors, map rendering, actionable controls and no premature completion claims.

## Culture and technical safeguards
This is a casual-game-style **learning-path metaphor**. The path has no actual municipal borders or geographic coordinates. Town names and gameplay links point to the real source-backed records already inside SMART PAMANA. Decorative illustrations are not documentary evidence or official Indigenous symbols. All fifteen chapters remain unlocked. No new permissions, network calls, database schemas, login requirements, or Quest scoring logic were introduced.

## Acceptance checklist
- Open Journey, verify fifteen consecutive level numbers (without repeats).
- Tap each level; the correct town appears immediately in a popup and the selected chapter preview updates.
- Try the popup's **Start discovering**, **Continue learning**, **Play linked Quest**, and **View chapter missions** routes on appropriate real saved states.
- Complete a festival, Matuto lesson, and corresponding Quest; ensure one stamp unlocks and its level turns gold after returning. Unrelated Quest completions must not count.
- Test the list search, screen readers, 320px/360px/430px widths, portrait/landscape, 200% text, bottom tab visibility, reduced-motion setting, and airplane mode.
- Check existing lesson, festival source links, Kuwento, Sulat, Koleksyon, and all profile records have not changed.

Automated CI and Android debug packaging establish code/build correctness, **not** substitute for physical phone and screen-reader validation. The generated decorative image is not a precise geography reference.

## Next optional enhancements
Add individually created professional 2D artwork for the three purely fantasy trail zones as optimized local SVG/PNG layers, or verified locality-specific illustration cards with permission/provenance. Add haptics only with an accessible opt-out. Validate phone-specific UI before publishing a signed production build.
