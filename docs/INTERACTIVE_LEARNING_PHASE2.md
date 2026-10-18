# SMART PAMANA — Phase 2: Interactive Matuto (working increment)

## Goal
Make existing cultural lessons active and enjoyable **without a game engine** or an online API. Original reviewed articles, Indigenous cultural boundaries, and all previous app modules remain unchanged.

## Delivered
1. **Three pilot picture/discovery activities:** Calapan City (`l1`), Baco (`l14`), Puerto Galera (`l11`).
2. **Two documented mini challenges per pilot lesson.** Each challenge offers tap-friendly choices, a helpful hint, retry, immediate explanatory feedback, and progress through the two-step activity. No timer or penalties.
3. **Safeguarded images:** Baco uses a credited Mount Halcon photograph and Puerto Galera uses a credited White Beach photograph. Calapan uses a symbolic illustration; the previously researched city hall photograph is not republished without clear reuse rights.
4. **Reusable glossary matching:** `GlossaryMatch` uses the existing Matuto article vocabulary and explanations. It is available when a lesson has at least two documented terms, without new cultural assertions.
5. **Offline saved completion:** Successful two-question discovery completions use versioned `pamana.discovery.<lessonId>.v1` keys through the existing SQLite-backed `setStored` service. Completion is updated in the UI only after the write succeeds.
6. **Connection to Heritage Journey:** Calapan City, Baco and Puerto Galera show an optional activity banner in their journey. The three established mission/stamp prerequisites are unchanged; the pilot challenge cannot falsely unlock a lesson or passport stamp.
7. **Soft Light UI:** Dedicated `pamana-discoveries.css` provides responsive, friendly card design and 44px+ hit targets with reduced-motion behavior.

## Acceptance tests
- A user can load the existing Matuto lesson directly (without a journey).
- The credited imagery has accurate alt text and an existing attribution link, and no Calapan photo without verified rights is introduced.
- A user can choose a wrong answer, read a hint, try again, and proceed after a correct answer.
- A user can complete both prompts, save the discovery, leave the lesson, and return to the completed/replayable state.
- Failing an offline write does not claim saved completion.
- A user can match original glossary terms to their original definitions using buttons, without drag-and-drop.
- All fifteen journey records, traditional six modules, existing Quest modes, private stories and writing histories remain present and functional.
- Automated tests, TypeScript compile, web build and Android packaging should pass before any merge.

## Not implemented or verified yet
- Full independently authored, community-reviewed age-specific text variants; current reading modes still select sections of the original lessons.
- Town-specific mini-games for all 15 localities. Existing province-wide Quests serve as explicitly identified fallbacks.
- New approved Hanunó'o tracing reference/stroke data, new copyrighted recordings, narration, or family interview audio.
- Multi-device synchronization, full native photo/audio backup restoration.
- Hands-on Android device validation, screen-reader auditing, third-party cultural review and field usability testing.

## Future phases
Continue the complete scope documented in `SMART_PAMANA_INTERACTIVE_HERITAGE_JOURNEY_PROMPT.md`:
- Phase 3: More reusable, curated picture-pairing, regional map, timeline and word challenges across verified locality datasets.
- Phase 4: Wider locality coverage; source and community reviews, restore/export reliability, accessibility and offline Android hardware testing.

## Protection rules
No DepEd/curriculum tools, mandatory accounts, cloud AI, unexplained imagery, fictional Indigenous material, compulsory timers or punishment for mistakes. All core features still operate entirely on the device.
