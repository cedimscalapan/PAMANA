# SMART PAMANA — Unique Hometown Heritage and Interactive Games v2

## Goal
Replace the repetitive Journey pages with the 19 October 2026 research dataset from the prior research pack. Preserve the original offline Ionic application, accessible UX, available media, saved achievements, and research boundaries.

## Complete published draft dataset
- `src/data/heritage-research-v1.json`: **15** municipality/city locality profiles, **45 distinct municipality-specific reading sections** (history, livelihood/environment, tangible and intangible heritage), **18** separately curated festivals and **62** source references. The research is a **draft** needing local and community review.
- `src/data/journey-research.ts`: read-only typed adapter, source mapping and community-review notice.
- `src/data/content.ts`: source notes resolve the 62 public URLs for the actual respective readings and questions.
- No generic three-paragraph Mangyan block is automatically repeated in all fifteen chapters; community histories should not be generalized to every town. Additional general background is available through independently authored Matuto lessons.

## New two-step reader
Step 1 **Tuklas**: three distinct source-backed full readings about the chosen town's local history, everyday living and environment, and cultural heritage.
Step 2 **Matuto**: each distinct official festival for the selected town (Calapan has **four**), named heritage-place records, and explicitly labelled limits and review/consent requirements.
Step 3 **Hometown Challenge**: research-driven, independently answered factual and comparison questions about that specific town's history, livelihood, cultural places, festivals, and the optional broader Matuto lesson. Correct answers are saved one by one, with Next Question feedback and no unsupported claims as answers.

The **general** Matuto curriculum is *optional*, not reproduced inside each of fifteen town pages. Completing these local researched readings no longer silently completes an unrelated general Matuto lesson.

## Free-play games
- **Knowledge Check**: now samples from the question banks of all fifteen source-linked hometowns, including event-specific questions, and retains session scores/retries/explanations.
- **Sort & Discover**: includes all 18 official public festivals plus documented named cultural place records, grouped by their published municipality/city.
- **Word Builder**: expands existing sourced vocabulary with all fifteen locality names and their original documented clues.
- **Map Explorer**: retains published numeric coordinates from non-protected public destinations, not inferred Indigenous community sites.
- **Photo Detective / Memory Pairs**: retain licensed or documented original images and correct labels; we do not invent or reuse culturally sensitive pictures.
- **Timeline Challenge**: retains documented year-specific historical milestones, not uncertain municipal legends or unsupported founding dates.

The game engine and existing `pamana.quest.games.v2` sessions remain backward compatible. Preexisting completed games and high scores remain saved.

## Legacy progress safety
- Existing `pamana.journey.v1` and all old stamp records remain intact; no reset/migration. `researchEdition=2` and `chapterLessonCompleted` are optional fields within the existing schema.
- Old section-index arrays are **not** reused to mark the completely different new sections read. A resumed old hometown starts the researched pages with fresh per-section checkmarks.
- Previously earned stamps remain valid; the old chapter session and global Matuto completion remain accepted where they earned legacy stamps.
- New hometown challenge progress is chapter-specific and cannot be satisfied by unrelated free-play results.
- This content is entirely bundled offline; links are for source verification when internet is available.

## Verification and editorial status
The compiled app **must** pass Vitest, TypeScript, Vite and Android debug packaging. Testing needs to cover all 15 chapters, 18 festivals, 62 sources, 45 nonrepeated texts, accurate source IDs, no premature stamp, independent question feedback, restored progress, all seven mini-game engines and a mobile airplane-mode session.

**Do not claim this is community-validated cultural knowledge.** The dataset states where oral traditions, contradictory dates, named Indigenous communities and performance rights require checks with appropriate local historians, institutions or Mangyan Peoples Organizations and consent. Annual festival dates are directory references, not a current event schedule. Documents and media are not imported or copied under a presumed free license.
