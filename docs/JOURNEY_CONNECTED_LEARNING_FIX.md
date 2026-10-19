# SMART PAMANA — Continuous Hometown Journey Fix

## User-reported defect
Previously, clicking Start Learning opened the general festival directory page. The original program treated opening a page as festival completion and left the user to press Back repeatedly to find the next Matuto lesson. After reading, they again had to navigate Back and find a generic Quest chosen from a province-wide set, so it could ask unrelated questions.

## Implemented end-to-end chapter journey
- Existing decorative 15-level map stays a **selector**, not a geographic road.
- The map's Start/Continue and Journey's three mission buttons now navigate to **/journey/activity?town=<chapter-id>&step=festival|lesson|quest|complete**.
- **Step 1 Discover:** Four clearly labeled source-backed sections about the actual official provincial festival, from its documented public description, local agricultural/cultural context, officially listed highlights and a critical respectful-reading note. Full original words are locally bundled; a public URL is supplied through in-app attribution. Each section has Mark Read & Next. Progress saves to `pamana.journey.v1` after each read and never gets awarded merely because a page was opened. **Finish Discovery → Matuto** completes the step and transitions directly.
- **Step 2 Matuto:** The *complete existing vetted Matuto article* with all section paragraphs, term definitions and source notes (not just the former one-sentence preview). Read sections and see progress; **Finish Matuto → Hometown Challenge** uses the existing global lesson-completion storage key and transitions immediately, maintaining original awards and old Matuto navigation.
- **Step 3 Hometown Challenge:** Six deterministic, offline questions derived directly from **the selected festival’s public name, place, listed highlight** and **the actual linked Matuto lesson question, documented key idea and section topic**. Each presents answer feedback, source notes, retry, and saves correct question identifiers in the chapter record. The challenge is *distinct from the general free-play Quest*, which still exists unchanged under Lakbay → Mga Laro.
- **Finish:** All six questions must be correctly answered before `chapterQuestCompleted` can be written. The existing Heritage Passport, Journey and Home stamp status now recognize the chapter-specific result while retaining the original completed legacy Quest stamps. Users see the earned-stamp screen with a direct next-town button and Passport link. No forced Back navigation.
- All 15 chapters retain their official festivals and lesson IDs. The source links were cross-checked against the provincial tourism festival pages; dates are annual directory references, not live event programs. Do not use copyrighted photos unless their rights are documented.

## Safeguards
- Reads, score and chapter completion live in the *existing v1 Journey record*, adding optional sanitized fields `festivalReadSections`, `lessonReadSections`, `chapterCorrectQuestions`, `chapterQuestCompleted`. No destructive migrations, no new API call or account, no change to community-sensitive cultural text.
- Existing prior festival-opened and lesson-complete state is preserved; previously earned stamps remain valid, even after old Quest session history is rotated. As before, global Matuto lesson completion may count for multiple chapters when those chapters share the same lesson; users can revisit each article.
- Completing another town’s chapter questions cannot earn a stamp here. Completing the new chapter quiz does not create a general free-play Quest record or invent a score.
- The step 1 four-part reader uses original explanatory writing grounded in the public provincial festival listing. It is **not a substitute for primary ethnographic research or community review**. The step 2 articles are existing source-backed originals, not copied full webpages.

## Technical verification
- 15 chapters × four source-backed festival sections and complete article sections; 15 × six chapter-specific questions, source IDs and unique choices.
- Section-by-section persistence, proper finish gating, chapter-specific quiz gating and old status compatibility.
- Full automated tests, TypeScript build, Vite build, and Android debug packaging required before merge.
- Physical Android touch/UI tests, orientation, voice navigation and cultural content review remain outstanding before release.
